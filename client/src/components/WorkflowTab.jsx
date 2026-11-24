import React, { useState } from 'react';
import { GitBranch, Clock, ArrowRight, CheckCircle2, Cpu, Eye, X } from 'lucide-react';

export default function WorkflowTab({ report }) {
  const [selectedAgentNode, setSelectedAgentNode] = useState(null);

  if (!report) return null;

  const traceMap = {};
  (report.trace || []).forEach(t => {
    traceMap[t.agent] = t;
  });

  const getTimingText = (agentName) => {
    const t = traceMap[agentName];
    if (!t) return 'Ready';
    const ms = (t.seconds * 1000).toFixed(1);
    return `${ms} ms`;
  };

  const getHeadline = (agentName) => {
    const t = traceMap[agentName];
    return t ? t.info : 'Awaiting input';
  };

  const agentDetails = {
    Extraction: {
      title: 'Extraction Agent (Module: agents/extraction.py)',
      role: 'Structured extraction of revenue, margins, net income, EPS, cash, debt, concentration, and guidance intervals.',
      mechanism: 'Performs deterministic sentence tokenization and regex pattern matching. Assigns persistent F1..Fn IDs and links every single number to its exact verbatim source sentence.',
      fanMode: 'Sequential Stage 0 (Root Producer)'
    },
    Revenue: {
      title: 'Revenue Analyst (Module: agents/revenue_analyst.py)',
      role: 'Evaluates top-line growth trajectory, operating leverage, and cash conversion.',
      mechanism: 'Analyzes YoY revenue expansion, gross/operating margins, derives net margin (F5/F1) and FCF conversion (F7/F5). Formulates grounded claims citing F-series IDs.',
      fanMode: 'Parallel Fan-Out Branch 1'
    },
    Risk: {
      title: 'Risk Analyst (Module: agents/risk_analyst.py)',
      role: 'Detects legal, operational, FX, leverage, and customer concentration vulnerabilities.',
      mechanism: 'Scans text with a curated risk lexicon (litigation, supply-chain, regulatory) with custom weighting, and checks numeric triggers (customer concentration >= 25%, leverage debt/cash >= 1.5x).',
      fanMode: 'Parallel Fan-Out Branch 2'
    },
    Outlook: {
      title: 'Outlook Analyst (Module: agents/outlook_analyst.py)',
      role: 'Assesses forward guidance intervals, sequential momentum, and management sentiment.',
      mechanism: 'Computes midpoint of guided revenue (avg(F11, F12)), implied sequential growth vs current quarter, margin delta, and cue-word tone sentiment.',
      fanMode: 'Parallel Fan-Out Branch 3'
    },
    Comparison: {
      title: 'Comparison Agent (Module: agents/comparison_agent.py)',
      role: 'Performs metric-by-metric quarter-over-quarter (QoQ) delta analysis.',
      mechanism: 'Matches current F# figures with prior quarter P# figures, calculating percentage and basis-point changes with directional favorable/unfavorable arrows.',
      fanMode: 'Parallel Fan-Out Branch 4'
    },
    Editor: {
      title: 'Editor Manager (Module: agents/editor_manager.py)',
      role: 'Fan-In aggregation manager, grounding gatekeeper, and disagreement auditor.',
      mechanism: 'Receives the 4 analyst views, enforces the strict 100% provenance verification rule (drops ungrounded claims), cross-examines stances to flag contradictory signals (e.g. bullish revenue vs high risk), and synthesizes the final note.',
      fanMode: 'Fan-In Synchronization Stage'
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Overview Card */}
      <div className="glass-panel tile-interactive tile-purple" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <GitBranch size={24} color="#0284c7" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
            Multi-Agent Fan-Out / Fan-In Graph Architecture
          </h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.65 }}>
          Rather than relying on a single monolithic LLM prone to mathematical hallucinations, the desk uses an orchestrated graph of specialist agents.
          Click on any agent node below to inspect its internal logic, role, and coordination protocol.
        </p>
      </div>

      {/* Interactive Visual Graph with Glowing Tiles */}
      <div className="glass-panel" style={{ padding: '38px 26px', overflowX: 'auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minWidth: 980,
          gap: 16
        }}>
          {/* 1. Input Report */}
          <div style={{ textAlign: 'center', width: 145 }}>
            <div className="tile-interactive tile-silver" style={{
              padding: '18px 14px',
              borderRadius: 12,
              background: '#f8fafc',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>📄</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>Earnings Report</div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Press release text</div>
            </div>
          </div>

          <ArrowRight size={22} color="#0284c7" />

          {/* 2. Extraction Node */}
          <div style={{ textAlign: 'center', width: 165 }}>
            <div
              onClick={() => setSelectedAgentNode('Extraction')}
              className="tile-interactive tile-purple"
              style={{
                padding: '18px 14px',
                borderRadius: 12,
                cursor: 'pointer',
                background: '#f0f9ff',
                border: '1px solid #bae6fd'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                <CheckCircle2 size={16} color="#0284c7" />
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Extraction</span>
              </div>
              <div style={{
                background: '#e0f2fe',
                padding: '3px 8px',
                borderRadius: 6,
                fontSize: '0.74rem',
                color: '#0369a1',
                marginBottom: 6,
                fontWeight: 700
              }}>
                ⏱ {getTimingText('Extraction')}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                {getHeadline('Extraction')}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: '#d97706', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fan-Out</span>
            <div style={{ width: 32, height: 2, background: 'linear-gradient(90deg, #0284c7, #d97706)' }} />
          </div>

          {/* 3. 4 Parallel Analysts (Tiles) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 240 }}>
            {/* Revenue */}
            <div
              onClick={() => setSelectedAgentNode('Revenue')}
              className="tile-interactive tile-gold"
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                background: '#fffbeb',
                border: '1px solid rgba(217, 119, 6, 0.25)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#b45309' }}>📈 Revenue Analyst</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>YoY, Margins, FCF</div>
              </div>
              <span className="ref-pill" style={{ background: '#fef3c7', color: '#b45309' }}>
                {getTimingText('Revenue')}
              </span>
            </div>

            {/* Risk */}
            <div
              onClick={() => setSelectedAgentNode('Risk')}
              className="tile-interactive tile-silver"
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                background: '#fff1f2',
                border: '1px solid rgba(244, 63, 94, 0.25)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#e11d48' }}>⚠️ Risk Analyst</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Leverage, Red flags</div>
              </div>
              <span className="ref-pill" style={{ background: '#ffe4e6', color: '#e11d48' }}>
                {getTimingText('Risk')}
              </span>
            </div>

            {/* Outlook */}
            <div
              onClick={() => setSelectedAgentNode('Outlook')}
              className="tile-interactive tile-purple"
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                background: '#f0f9ff',
                border: '1px solid rgba(2, 132, 199, 0.25)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0369a1' }}>🔭 Outlook Analyst</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Guidance, Sequential</div>
              </div>
              <span className="ref-pill" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                {getTimingText('Outlook')}
              </span>
            </div>

            {/* Comparison */}
            <div
              onClick={() => setSelectedAgentNode('Comparison')}
              className="tile-interactive tile-silver"
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                background: '#f8fafc',
                border: '1px solid #e2e8f0'
              }}
            >
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>🔄 Comparison Agent</div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>QoQ deltas & trends</div>
              </div>
              <span className="ref-pill" style={{ background: '#e2e8f0', color: '#334155' }}>
                {getTimingText('Comparison')}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: '#d97706', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fan-In</span>
            <div style={{ width: 32, height: 2, background: 'linear-gradient(90deg, #d97706, #0284c7)' }} />
          </div>

          {/* 4. Editor Node */}
          <div style={{ textAlign: 'center', width: 175 }}>
            <div
              onClick={() => setSelectedAgentNode('Editor')}
              className="tile-interactive tile-gold"
              style={{
                padding: '18px 14px',
                borderRadius: 12,
                cursor: 'pointer',
                background: '#fffbeb',
                border: '1px solid rgba(217, 119, 6, 0.25)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: '1.25rem' }}>🧑‍💼</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Editor Manager</span>
              </div>
              <div style={{
                background: '#fef3c7',
                padding: '3px 8px',
                borderRadius: 6,
                fontSize: '0.74rem',
                color: '#b45309',
                marginBottom: 6,
                fontWeight: 700
              }}>
                ⏱ {getTimingText('Editor')}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                {getHeadline('Editor')}
              </div>
            </div>
          </div>

          <ArrowRight size={22} color="#d97706" />

          {/* 5. Grounded Note Output */}
          <div style={{ textAlign: 'center', width: 145 }}>
            <div className="tile-interactive tile-gold" style={{
              padding: '18px 14px',
              borderRadius: 12,
              background: '#fffbeb',
              border: '1px solid rgba(217, 119, 6, 0.25)'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>📝</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a' }}>Analyst Note</div>
              <div style={{ fontSize: '0.72rem', color: '#d97706', fontWeight: 800 }}>100% Provenance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Agent Inspector Drawer / Modal */}
      {selectedAgentNode && agentDetails[selectedAgentNode] && (
        <div className="glass-panel tile-interactive" style={{
          padding: 24,
          background: '#ffffff',
          border: '1px solid #d97706'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Cpu size={22} color="#d97706" />
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                {agentDetails[selectedAgentNode].title}
              </h4>
              <span className="ref-pill" style={{ background: '#0284c7', color: '#ffffff' }}>
                {agentDetails[selectedAgentNode].fanMode}
              </span>
            </div>
            <button
              onClick={() => setSelectedAgentNode(null)}
              style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.3rem' }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9rem', color: '#0f172a' }}>
            <div>
              <strong style={{ color: '#d97706' }}>Core Responsibility:</strong> <span style={{ color: '#475569' }}>{agentDetails[selectedAgentNode].role}</span>
            </div>
            <div>
              <strong style={{ color: '#0284c7' }}>Execution Logic:</strong> <span style={{ color: '#475569' }}>{agentDetails[selectedAgentNode].mechanism}</span>
            </div>
          </div>
        </div>
      )}

      {/* Execution Trace Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Clock size={19} color="#0284c7" />
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
            Multi-Agent Node Execution Log & Timings
          </h4>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="desk-table">
            <thead>
              <tr>
                <th style={{ width: 140 }}>Agent Node</th>
                <th style={{ width: 130 }}>Latency</th>
                <th>Output Payload / Evaluation Verdict</th>
              </tr>
            </thead>
            <tbody>
              {(report.trace || []).map((t, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 700, color: '#38bdf8' }}>{t.agent}</td>
                  <td style={{ fontFamily: 'monospace', color: '#10b981', fontWeight: 600 }}>
                    {(t.seconds * 1000).toFixed(2)} ms
                  </td>
                  <td style={{ color: '#f1f5f9' }}>{t.info}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
