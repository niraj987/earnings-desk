const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const engine = require('./engine');

const BRIDGE_SCRIPT = path.join(__dirname, '..', 'earnings_desk', 'engine_bridge.py');

/**
 * Native JS execution when Python is unavailable (e.g. on Vercel Serverless)
 */
function runJsFallback(payload) {
  const action = payload.action || 'analyze';

  if (action === 'analyze') {
    return Promise.resolve(engine.runPipeline({
      reportText: payload.report_text,
      priorText: payload.prior_text,
      useLlm: payload.use_llm
    }));
  }

  if (action === 'what_if') {
    const figs = (payload.figures || []).map(f => new engine.Figure(f.id, f.key, f.label, f.value, f.unit, f.source, f.period));
    const priorFigs = (payload.prior_figures || []).map(f => new engine.Figure(f.id, f.key, f.label, f.value, f.unit, f.source, f.period));
    return Promise.resolve(engine.runPipeline({
      figures: figs,
      priorFigures: priorFigs,
      sentences: payload.sentences || [],
      company: payload.company || 'Company',
      period: payload.period || ''
    }));
  }

  if (action === 'qa') {
    const answers = engine.runQA(payload.question, payload.registry, payload.views);
    return Promise.resolve({ question: payload.question, answers });
  }

  if (action === 'samples') {
    const sampleDir = path.join(__dirname, '..', 'earnings_desk', 'sample_data');
    const read = f => {
      const p = path.join(sampleDir, f);
      return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
    };

    const presets = [
      {
        id: 'acme',
        name: 'Acme Technologies (Balanced / Mixed)',
        description: '+12% YoY revenue, high customer concentration (38%), patent litigation, and 1.62x leverage.',
        current_name: 'Acme Technologies Q3 FY2026',
        current_file: 'acme_q3_2026.txt',
        prior_name: 'Acme Technologies Q2 FY2026',
        prior_file: 'acme_q2_2026.txt',
        expected_verdict: 'Balanced / Mixed',
        current_text: read('acme_q3_2026.txt'),
        prior_text: read('acme_q2_2026.txt')
      },
      {
        id: 'cloudscale',
        name: 'CloudScale AI Systems (Bullish Hypergrowth)',
        description: '+36% YoY revenue, 74.5% gross margin, zero leverage, surging free cash flow and raised guidance.',
        current_name: 'CloudScale AI Systems Q3 FY2026',
        current_file: 'cloudscale_q3_2026.txt',
        prior_name: 'CloudScale AI Systems Q2 FY2026',
        prior_file: 'cloudscale_q2_2026.txt',
        expected_verdict: 'Positive / Bullish',
        current_text: read('cloudscale_q3_2026.txt'),
        prior_text: read('cloudscale_q2_2026.txt')
      },
      {
        id: 'novaretail',
        name: 'NovaRetail Group (High Risk / Margin Squeeze)',
        description: '-2% YoY revenue, high debt ($4.6B vs $1.1B cash), freight logistics headwinds, and cautious outlook.',
        current_name: 'NovaRetail Group Q3 FY2026',
        current_file: 'novaretail_q3_2026.txt',
        prior_name: 'NovaRetail Group Q2 FY2026',
        prior_file: 'novaretail_q2_2026.txt',
        expected_verdict: 'High Risk',
        current_text: read('novaretail_q3_2026.txt'),
        prior_text: read('novaretail_q2_2026.txt')
      }
    ];

    return Promise.resolve({
      presets,
      current_name: presets[0].current_name,
      current_text: presets[0].current_text,
      prior_name: presets[0].prior_name,
      prior_text: presets[0].prior_text
    });
  }

  return Promise.reject(new Error(`Unknown action: ${action}`));
}

/**
 * Invoke Python multi-agent pipeline through engine_bridge.py with JS fallback
 * @param {Object} payload 
 * @returns {Promise<Object>}
 */
function callPythonBridge(payload) {
  // If running in Vercel or cloud serverless with no Python, use fast JS engine directly
  if (process.env.VERCEL || process.env.USE_JS_ENGINE === 'true') {
    return runJsFallback(payload);
  }

  return new Promise((resolve, reject) => {
    const pythonCmd = process.env.PYTHON_PATH || 'python';
    const pyProcess = spawn(pythonCmd, [BRIDGE_SCRIPT], {
      cwd: path.join(__dirname, '..', 'earnings_desk'),
      env: {
        ...process.env,
        PYTHONIOENCODING: 'utf-8',
        PYTHONUTF8: '1'
      }
    });

    let stdoutData = '';
    let stderrData = '';

    pyProcess.stdout.setEncoding('utf-8');
    pyProcess.stderr.setEncoding('utf-8');

    pyProcess.stdout.on('data', chunk => {
      stdoutData += chunk;
    });

    pyProcess.stderr.on('data', chunk => {
      stderrData += chunk;
    });

    pyProcess.on('close', code => {
      if (code !== 0 && !stdoutData.trim()) {
        console.warn(`Python process exited with code ${code}, falling back to native JS engine...`);
        return runJsFallback(payload).then(resolve).catch(reject);
      }

      try {
        const json = JSON.parse(stdoutData.trim());
        if (json.error) {
          console.warn(`Python returned error: ${json.error}, falling back to native JS engine...`);
          return runJsFallback(payload).then(resolve).catch(reject);
        }
        resolve(json);
      } catch (err) {
        console.warn('Failed to parse Python JSON output, falling back to native JS engine...');
        runJsFallback(payload).then(resolve).catch(reject);
      }
    });

    pyProcess.on('error', err => {
      console.warn(`Python spawn failed (${err.message}), falling back to native JS engine...`);
      runJsFallback(payload).then(resolve).catch(reject);
    });

    // Write input payload and close stdin
    pyProcess.stdin.write(JSON.stringify(payload), 'utf-8');
    pyProcess.stdin.end();
  });
}

module.exports = {
  callPythonBridge
};

