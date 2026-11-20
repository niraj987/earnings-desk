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
          <GitBranch size={24} color="#c084fc" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
            Multi-Agent Fan-Out / Fan-In Graph Architecture
          </h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
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
              borderRadius: 12
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>📄</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>Earnings Report</div>
              <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Press release text</div>
            </div>
          </div>

          <ArrowRight size={22} color="#c084fc" />

          {/* 2. Extraction Node */}
          <div style={{ textAlign: 'center', width: 165 }}>
            <div
              onClick={() => setSelectedAgentNode('Extraction')}
              className="tile-interactive tile-purple"
              style={{
                padding: '18px 14px',
                borderRadius: 12,
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                <CheckCircle2 size={16} color="#c084fc" />
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>Extraction</span>
              </div>
              <div style={{
                background: 'rgba(0,0,0,0.4)',
                padding: '3px 8px',
                borderRadius: 6,
                fontSize: '0.74rem',
                color: '#e9d5ff',
                marginBottom: 6,
                fontWeight: 700
              }}>
                ⏱ {getTimingText('Extraction')}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                {getHeadline('Extraction')}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fan-Out</span>
            <div style={{ width: 32, height: 2, background: 'linear-gradient(90deg, #c084fc, #fbbf24)' }} />
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
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fbbf24' }}>📈 Revenue Analyst</div>
                <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>YoY, Margins, FCF</div>
              </div>
              <span className="ref-pill" style={{ background: '#78350f', color: '#fef08a' }}>
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
                borderColor: 'rgba(244, 63, 94, 0.4)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fb7185' }}>⚠️ Risk Analyst</div>
                <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>Leverage, Red flags</div>
              </div>
              <span className="ref-pill" style={{ background: '#4c0519', color: '#fda4af' }}>
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
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#c084fc' }}>🔭 Outlook Analyst</div>
                <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>Guidance, Sequential</div>
              </div>
              <span className="ref-pill" style={{ background: '#3b0764', color: '#e9d5ff' }}>
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
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>🔄 Comparison Agent</div>
                <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>QoQ deltas & trends</div>
              </div>
              <span className="ref-pill" style={{ background: '#334155', color: '#ffffff' }}>
                {getTimingText('Comparison')}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fan-In</span>
            <div style={{ width: 32, height: 2, background: 'linear-gradient(90deg, #fbbf24, #c084fc)' }} />
          </div>

          {/* 4. Editor Node */}
          <div style={{ textAlign: 'center', width: 175 }}>
            <div
              onClick={() => setSelectedAgentNode('Editor')}
              className="tile-interactive tile-gold"
              style={{
                padding: '18px 14px',
                borderRadius: 12,
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: '1.25rem' }}>🧑‍💼</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>Editor Manager</span>
              </div>
              <div style={{
                background: 'rgba(0,0,0,0.4)',
                padding: '3px 8px',
                borderRadius: 6,
                fontSize: '0.74rem',
                color: '#fef08a',
                marginBottom: 6,
                fontWeight: 700
              }}>
                ⏱ {getTimingText('Editor')}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                {getHeadline('Editor')}
              </div>
            </div>
          </div>

          <ArrowRight size={22} color="#fbbf24" />

          {/* 5. Grounded Note Output */}
          <div style={{ textAlign: 'center', width: 145 }}>
            <div className="tile-interactive tile-gold" style={{
              padding: '18px 14px',
              borderRadius: 12
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>📝</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#ffffff' }}>Analyst Note</div>
              <div style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 800 }}>100% Provenance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Agent Inspector Drawer / Modal */}
      {selectedAgentNode && agentDetails[selectedAgentNode] && (
        <div className="glass-panel tile-interactive tile-gold" style={{
          padding: 24,
          background: 'rgba(15, 18, 38, 0.96)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Cpu size={22} color="#fbbf24" />
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
                {agentDetails[selectedAgentNode].title}
              </h4>
              <span className="ref-pill" style={{ background: '#7e22ce', color: '#ffffff' }}>
                {agentDetails[selectedAgentNode].fanMode}
              </span>
            </div>
            <button
              onClick={() => setSelectedAgentNode(null)}
              style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: '1.3rem' }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.9rem', color: '#ffffff' }}>
            <div>
              <strong style={{ color: '#fbbf24' }}>Core Responsibility:</strong> {agentDetails[selectedAgentNode].role}
            </div>
            <div>
              <strong style={{ color: '#c084fc' }}>Execution Logic:</strong> {agentDetails[selectedAgentNode].mechanism}
            </div>
          </div>
        </div>
      )}

      {/* Execution Trace Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(168, 85, 247, 0.25)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Clock size={19} color="#c084fc" />
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
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
