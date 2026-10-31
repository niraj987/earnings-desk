const { spawn } = require('child_process');
const path = require('path');

const BRIDGE_SCRIPT = path.join(__dirname, '..', 'earnings_desk', 'engine_bridge.py');

/**
 * Invoke Python multi-agent pipeline through engine_bridge.py
 * @param {Object} payload 
 * @returns {Promise<Object>}
 */
function callPythonBridge(payload) {
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
        return reject(new Error(`Python bridge process exited with code ${code}: ${stderrData}`));
      }

      try {
        const json = JSON.parse(stdoutData.trim());
        if (json.error) {
          return reject(new Error(`Python error: ${json.error}\n${json.traceback || ''}`));
        }
        resolve(json);
      } catch (err) {
        reject(new Error(`Failed to parse Python JSON output: ${err.message}\nRaw output: ${stdoutData}\nStderr: ${stderrData}`));
      }
    });

    pyProcess.on('error', err => {
      reject(new Error(`Failed to spawn Python process: ${err.message}`));
    });

    // Write input payload and close stdin
    pyProcess.stdin.write(JSON.stringify(payload), 'utf-8');
    pyProcess.stdin.end();
  });
}

module.exports = {
  callPythonBridge
};

