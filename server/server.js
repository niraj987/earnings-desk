const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const {
  db,
  saveReportAnalysis,
  getAllReports,
  getReportById,
  saveScenario,
  saveQA,
  deleteReport
} = require('./db');
const { callPythonBridge } = require('./pythonBridge');

const app = express();
const PORT = process.env.PORT || 5000;

// Setup upload parser
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB max
});

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: 'SQLite (Antigravity Embedded)',
    timestamp: new Date().toISOString()
  });
});

// Get Bundled Sample Earnings Reports
app.get('/api/samples', async (req, res) => {
  try {
    const samples = await callPythonBridge({ action: 'samples' });
    res.json(samples);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List All Reports in Database
app.get('/api/reports', (req, res) => {
  try {
    const reports = getAllReports();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Report Details
app.get('/api/reports/:id', (req, res) => {
  try {
    const report = getReportById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Run Multi-Agent Analysis and Save to SQLite
app.post('/api/reports/analyze', async (req, res) => {
  try {
    const { report_text, prior_text, use_llm } = req.body;
    if (!report_text || !report_text.trim()) {
      return res.status(400).json({ error: 'Report text is required.' });
    }

    const state = await callPythonBridge({
      action: 'analyze',
      report_text: report_text.trim(),
      prior_text: (prior_text || '').trim(),
      use_llm: Boolean(use_llm)
    });

    // Save to SQLite database
    const saved = saveReportAnalysis(state, report_text, prior_text);
    res.json(saved);
  } catch (err) {
    console.error('Analyze error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Run What-If Simulation
app.post('/api/reports/:id/what-if', async (req, res) => {
  try {
    const report = getReportById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const { figures, prior_figures, scenario_name } = req.body;
    if (!Array.isArray(figures) || figures.length === 0) {
      return res.status(400).json({ error: 'Figures array is required for what-if simulation.' });
    }

    const state = await callPythonBridge({
      action: 'what_if',
      figures,
      prior_figures: prior_figures || report.prior_figures || [],
      sentences: report.report_text.split(/(?<=[.!?])\s+/),
      company: report.company,
      period: report.period
    });

    // Save scenario if name provided or as a scenario snapshot
    const scenarioId = saveScenario(
      report.id,
      scenario_name || `What-If ${new Date().toLocaleTimeString()}`,
      figures,
      state.note?.verdict || 'Mixed',
      state.note?.coverage || 100,
      state.note?.markdown || ''
    );

    res.json({
      scenario_id: scenarioId,
      ...state
    });
  } catch (err) {
    console.error('What-if error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Grounded Q&A ("Ask the Desk")
app.post('/api/reports/:id/qa', async (req, res) => {
  try {
    const report = getReportById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const { question } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const qaRes = await callPythonBridge({
      action: 'qa',
      question: question.trim(),
      registry: report.note?.registry || {},
      views: report.views || {}
    });

    // Save to SQLite QA history
    saveQA(report.id, question.trim(), qaRes.answers || []);

    res.json(qaRes);
  } catch (err) {
    console.error('QA error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete Report
app.delete('/api/reports/:id', (req, res) => {
  try {
    deleteReport(req.params.id);
    res.json({ success: true, message: 'Report deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// File Upload helper (TXT or PDF)
app.post('/api/reports/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filename = req.file.originalname.toLowerCase();
    let text = '';

    if (filename.endsWith('.txt') || filename.endsWith('.md')) {
      text = req.file.buffer.toString('utf-8');
      return res.json({ text, filename: req.file.originalname });
    }

    // For other files, attempt UTF-8 conversion
    text = req.file.buffer.toString('utf-8');
    res.json({ text, filename: req.file.originalname });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve frontend build if exists
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Auto-seed initial sample reports if database is empty or has fewer than presets
async function initDatabase() {
  try {
    const existing = getAllReports();
    if (existing.length < 3) {
      console.log('Seeding portfolio companies into SQLite database...');
      const samples = await callPythonBridge({ action: 'samples' });
      const presets = samples.presets || [
        {
          current_name: samples.current_name,
          current_text: samples.current_text,
          prior_text: samples.prior_text
        }
      ];

      for (const preset of presets) {
        const alreadyExists = existing.some(r => r.company && preset.current_name && r.company.toLowerCase().includes(preset.current_name.split(' ')[0].toLowerCase()));
        if (!alreadyExists && preset.current_text) {
          console.log(`Analyzing and storing ${preset.name || preset.current_name}...`);
          const state = await callPythonBridge({
            action: 'analyze',
            report_text: preset.current_text,
            prior_text: preset.prior_text || '',
            use_llm: false
          });
          saveReportAnalysis(state, preset.current_text, preset.prior_text || '');
        }
      }
      console.log('Database portfolio initialization complete!');
    }
  } catch (err) {
    console.warn('Initial seed skipped or deferred:', err.message);
  }
}

app.listen(PORT, async () => {
  console.log(`====================================================`);
  console.log(` Earnings Desk Full-Stack Server running on port ${PORT}`);
  console.log(` SQLite Database: ${path.join(__dirname, 'earnings_desk.db')}`);
  console.log(`====================================================`);
  await initDatabase();
});

