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
      <div className="glass-panel" style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <GitBranch size={22} color="#38bdf8" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
            LangGraph Fan-Out / Fan-In Multi-Agent Architecture
          </h3>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
          Rather than relying on a single monolithic LLM prone to mathematical hallucinations, the desk uses an orchestrated graph of specialist agents.
          Click on any agent node below to inspect its internal logic, role, and coordination protocol.
        </p>
      </div>

      {/* Interactive Visual Graph */}
      <div className="glass-panel" style={{ padding: '36px 24px', overflowX: 'auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minWidth: 960,
          gap: 16
        }}>
          {/* 1. Input Report */}
          <div style={{ textAlign: 'center', width: 140 }}>
            <div style={{
              padding: '16px 12px',
              borderRadius: 8,
              background: '#0a1220',
              border: '1px solid #1a2b47',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)'
            }}>
              <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>📄</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>Earnings Report</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Press release text</div>
            </div>
          </div>

          <ArrowRight size={22} color="#38bdf8" />

          {/* 2. Extraction Node */}
          <div style={{ textAlign: 'center', width: 160 }}>
            <div
              onClick={() => setSelectedAgentNode('Extraction')}
              style={{
                padding: '16px 12px',
                borderRadius: 8,
                background: '#042f2e',
                border: '1px solid #14b8a6',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(20, 184, 166, 0.25)',
                transition: 'all 0.2s ease'
              }}
              className="hover:scale-105"
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                <CheckCircle2 size={16} color="#2dd4bf" />
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>Extraction</span>
              </div>
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '2px 6px',
                borderRadius: 4,
                fontSize: '0.72rem',
                color: '#5eead4',
                marginBottom: 6
              }}>
                ⏱ {getTimingText('Extraction')}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#99f6e4' }}>
                {getHeadline('Extraction')}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>Fan-Out</span>
            <div style={{ width: 28, height: 2, background: '#38bdf8' }} />
          </div>

          {/* 3. 4 Parallel Analysts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 230 }}>
            {/* Revenue */}
            <div
              onClick={() => setSelectedAgentNode('Revenue')}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                background: '#064e3b',
                border: '1px solid #10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6ee7b7' }}>📈 Revenue Analyst</div>
                <div style={{ fontSize: '0.68rem', color: '#a7f3d0' }}>YoY, Margins, FCF</div>
              </div>
              <span className="ref-pill" style={{ background: '#022c22', color: '#6ee7b7' }}>
                {getTimingText('Revenue')}
              </span>
            </div>

            {/* Risk */}
            <div
              onClick={() => setSelectedAgentNode('Risk')}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                background: '#4c0519',
                border: '1px solid #f43f5e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fda4af' }}>⚠️ Risk Analyst</div>
                <div style={{ fontSize: '0.68rem', color: '#fecdd3' }}>Leverage, Red flags</div>
              </div>
              <span className="ref-pill" style={{ background: '#200108', color: '#fda4af' }}>
                {getTimingText('Risk')}
              </span>
            </div>

            {/* Outlook */}
            <div
              onClick={() => setSelectedAgentNode('Outlook')}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                background: '#082f49',
                border: '1px solid #0ea5e9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#7dd3fc' }}>🔭 Outlook Analyst</div>
                <div style={{ fontSize: '0.68rem', color: '#bae6fd' }}>Guidance, Sequential</div>
              </div>
              <span className="ref-pill" style={{ background: '#02182b', color: '#7dd3fc' }}>
                {getTimingText('Outlook')}
              </span>
            </div>

            {/* Comparison */}
            <div
              onClick={() => setSelectedAgentNode('Comparison')}
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                background: '#3b0764',
                border: '1px solid #a855f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#d8b4fe' }}>🔄 Comparison Agent</div>
                <div style={{ fontSize: '0.68rem', color: '#e9d5ff' }}>QoQ deltas & trends</div>
              </div>
              <span className="ref-pill" style={{ background: '#1c0330', color: '#d8b4fe' }}>
                {getTimingText('Comparison')}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>Fan-In</span>
            <div style={{ width: 28, height: 2, background: '#38bdf8' }} />
          </div>

          {/* 4. Editor Node */}
          <div style={{ textAlign: 'center', width: 170 }}>
            <div
              onClick={() => setSelectedAgentNode('Editor')}
              style={{
                padding: '16px 12px',
                borderRadius: 8,
                background: '#451a03',
                border: '1px solid #f59e0b',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: '1.2rem' }}>🧑‍💼</span>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fef3c7' }}>Editor Manager</span>
              </div>
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '2px 6px',
                borderRadius: 4,
                fontSize: '0.72rem',
                color: '#fde68a',
                marginBottom: 6
              }}>
                ⏱ {getTimingText('Editor')}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#fcd34d' }}>
                {getHeadline('Editor')}
              </div>
            </div>
          </div>

          <ArrowRight size={22} color="#10b981" />

          {/* 5. Grounded Note Output */}
          <div style={{ textAlign: 'center', width: 140 }}>
            <div style={{
              padding: '16px 12px',
              borderRadius: 8,
              background: '#0a1220',
              border: '1px solid #10b981',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.2)'
            }}>
              <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>📝</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>Analyst Note</div>
              <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>100% Provenance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Agent Inspector Drawer / Modal */}
      {selectedAgentNode && agentDetails[selectedAgentNode] && (
        <div className="glass-panel" style={{
          padding: 22,
          border: '1px solid #38bdf8',
          background: 'rgba(9, 16, 29, 0.95)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Cpu size={20} color="#38bdf8" />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
                {agentDetails[selectedAgentNode].title}
              </h4>
              <span className="ref-pill" style={{ background: '#0284c7', color: '#fff' }}>
                {agentDetails[selectedAgentNode].fanMode}
              </span>
            </div>
            <button
              onClick={() => setSelectedAgentNode(null)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.875rem', color: '#cbd5e1' }}>
            <div>
              <strong style={{ color: '#38bdf8' }}>Core Responsibility:</strong> {agentDetails[selectedAgentNode].role}
            </div>
            <div>
              <strong style={{ color: '#38bdf8' }}>Execution Logic:</strong> {agentDetails[selectedAgentNode].mechanism}
            </div>
          </div>
        </div>
      )}

      {/* Execution Trace Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a2b47', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clock size={18} color="#38bdf8" />
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
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
