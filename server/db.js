const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'earnings_desk.db');
const db = new DatabaseSync(DB_PATH);

// Enable foreign keys and initialize schema
db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT,
    period TEXT,
    report_text TEXT,
    prior_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id INTEGER NOT NULL,
    verdict TEXT,
    coverage REAL,
    summary TEXT,
    markdown TEXT,
    disagreements_json TEXT,
    ungrounded_json TEXT,
    trace_json TEXT,
    llm_used INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(report_id) REFERENCES reports(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS figures (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id INTEGER NOT NULL,
    figure_id TEXT,
    key TEXT,
    label TEXT,
    value REAL,
    unit TEXT,
    display TEXT,
    source TEXT,
    period_type TEXT,
    FOREIGN KEY(report_id) REFERENCES reports(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS agent_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id INTEGER NOT NULL,
    agent_key TEXT,
    agent_name TEXT,
    section TEXT,
    stance TEXT,
    score REAL,
    headline TEXT,
    claims_json TEXT,
    derived_json TEXT,
    table_json TEXT,
    FOREIGN KEY(report_id) REFERENCES reports(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS scenarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id INTEGER NOT NULL,
    name TEXT,
    figures_json TEXT,
    verdict TEXT,
    coverage REAL,
    markdown TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(report_id) REFERENCES reports(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS qa_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id INTEGER NOT NULL,
    question TEXT,
    answers_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(report_id) REFERENCES reports(id) ON DELETE CASCADE
  );
`);

/**
 * Save complete analysis state to database
 */
function saveReportAnalysis(state, reportText, priorText) {
  // Insert report
  const insertReport = db.prepare(`
    INSERT INTO reports (company, period, report_text, prior_text)
    VALUES (?, ?, ?, ?)
  `);
  const reportRes = insertReport.run(state.company, state.period, reportText, priorText || '');
  const reportId = Number(reportRes.lastInsertRowid);

  // Insert analysis
  const insertAnalysis = db.prepare(`
    INSERT INTO analyses (report_id, verdict, coverage, summary, markdown, disagreements_json, ungrounded_json, trace_json, llm_used)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertAnalysis.run(
    reportId,
    state.note?.verdict || 'Neutral',
    state.note?.coverage || 100,
    state.note?.summary || '',
    state.note?.markdown || '',
    JSON.stringify(state.note?.disagreements || []),
    JSON.stringify(state.note?.ungrounded || []),
    JSON.stringify(state.trace || []),
    state.note?.llm_used ? 1 : 0
  );

  // Insert figures
  const insertFigure = db.prepare(`
    INSERT INTO figures (report_id, figure_id, key, label, value, unit, display, source, period_type)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  if (Array.isArray(state.figures)) {
    for (const f of state.figures) {
      insertFigure.run(reportId, f.id, f.key, f.label, f.value, f.unit, f.display, f.source, 'current');
    }
  }

  if (Array.isArray(state.prior_figures)) {
    for (const f of state.prior_figures) {
      insertFigure.run(reportId, f.id, f.key, f.label, f.value, f.unit, f.display, f.source, 'prior');
    }
  }

  // Insert agent views
  const insertView = db.prepare(`
    INSERT INTO agent_views (report_id, agent_key, agent_name, section, stance, score, headline, claims_json, derived_json, table_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  if (state.views) {
    for (const [key, v] of Object.entries(state.views)) {
      insertView.run(
        reportId,
        key,
        v.agent || key,
        v.section || '',
        v.stance || 'neutral',
        v.score || 0,
        v.headline || '',
        JSON.stringify(v.claims || []),
        JSON.stringify(v.derived || []),
        JSON.stringify(v.table || [])
      );
    }
  }

  return getReportById(reportId);
}

/**
 * Retrieve all reports summary
 */
function getAllReports() {
  const query = db.prepare(`
    SELECT r.id, r.company, r.period, r.created_at,
           a.verdict, a.coverage, a.summary, a.llm_used,
           (SELECT COUNT(*) FROM figures WHERE report_id = r.id) as figure_count,
           (SELECT COUNT(*) FROM scenarios WHERE report_id = r.id) as scenario_count
    FROM reports r
    LEFT JOIN analyses a ON a.report_id = r.id
    ORDER BY r.created_at DESC
  `);
  return query.all();
}

/**
 * Retrieve full report details by id
 */
function getReportById(id) {
  const reportQuery = db.prepare(`SELECT * FROM reports WHERE id = ?`);
  const report = reportQuery.get(id);
  if (!report) return null;

  const analysisQuery = db.prepare(`SELECT * FROM analyses WHERE report_id = ? ORDER BY id DESC LIMIT 1`);
  const analysis = analysisQuery.get(id) || {};

  const figuresQuery = db.prepare(`SELECT * FROM figures WHERE report_id = ? ORDER BY id ASC`);
  const allFigs = figuresQuery.all(id);
  const figures = allFigs.filter(f => f.period_type === 'current');
  const prior_figures = allFigs.filter(f => f.period_type === 'prior');

  const viewsQuery = db.prepare(`SELECT * FROM agent_views WHERE report_id = ?`);
  const rawViews = viewsQuery.all(id);
  const views = {};
  for (const v of rawViews) {
    views[v.agent_key] = {
      agent: v.agent_name,
      section: v.section,
      stance: v.stance,
      score: v.score,
      headline: v.headline,
      claims: JSON.parse(v.claims_json || '[]'),
      derived: JSON.parse(v.derived_json || '[]'),
      table: JSON.parse(v.table_json || '[]')
    };
  }

  const scenariosQuery = db.prepare(`SELECT * FROM scenarios WHERE report_id = ? ORDER BY created_at DESC`);
  const scenarios = scenariosQuery.all(id).map(s => ({
    ...s,
    figures: JSON.parse(s.figures_json || '[]')
  }));

  const qaQuery = db.prepare(`SELECT * FROM qa_history WHERE report_id = ? ORDER BY created_at DESC LIMIT 20`);
  const qa_history = qaQuery.all(id).map(q => ({
    ...q,
    answers: JSON.parse(q.answers_json || '[]')
  }));

  let disagreements = [];
  let ungrounded = [];
  let trace = [];
  try { disagreements = JSON.parse(analysis.disagreements_json || '[]'); } catch (e) {}
  try { ungrounded = JSON.parse(analysis.ungrounded_json || '[]'); } catch (e) {}
  try { trace = JSON.parse(analysis.trace_json || '[]'); } catch (e) {}

  // Build registry map
  const registry = {};
  for (const f of allFigs) {
    registry[f.figure_id] = {
      id: f.figure_id,
      key: f.key,
      label: f.label,
      value: f.value,
      unit: f.unit,
      display: f.display,
      source: f.source
    };
  }

  // Also include derived in registry
  for (const v of Object.values(views)) {
    if (Array.isArray(v.derived)) {
      for (const d of v.derived) {
        registry[d.id] = d;
      }
    }
  }

  return {
    id: report.id,
    company: report.company,
    period: report.period,
    report_text: report.report_text,
    prior_text: report.prior_text,
    created_at: report.created_at,
    figures,
    prior_figures,
    views,
    note: {
      markdown: analysis.markdown || '',
      verdict: analysis.verdict || 'Neutral',
      coverage: analysis.coverage || 100,
      summary: analysis.summary || '',
      disagreements,
      ungrounded,
      llm_used: Boolean(analysis.llm_used),
      registry
    },
    trace,
    scenarios,
    qa_history
  };
}

/**
 * Save what-if scenario
 */
function saveScenario(reportId, name, figures, verdict, coverage, markdown) {
  const insert = db.prepare(`
    INSERT INTO scenarios (report_id, name, figures_json, verdict, coverage, markdown)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const res = insert.run(
    reportId,
    name || `Scenario ${new Date().toLocaleTimeString()}`,
    JSON.stringify(figures),
    verdict,
    coverage,
    markdown
  );
  return Number(res.lastInsertRowid);
}

/**
 * Save Q&A entry
 */
function saveQA(reportId, question, answers) {
  const insert = db.prepare(`
    INSERT INTO qa_history (report_id, question, answers_json)
    VALUES (?, ?, ?)
  `);
  const res = insert.run(reportId, question, JSON.stringify(answers));
  return Number(res.lastInsertRowid);
}

/**
 * Delete report
 */
function deleteReport(id) {
  const del = db.prepare(`DELETE FROM reports WHERE id = ?`);
  return del.run(id);
}

module.exports = {
  db,
  saveReportAnalysis,
  getAllReports,
  getReportById,
  saveScenario,
  saveQA,
  deleteReport
};
