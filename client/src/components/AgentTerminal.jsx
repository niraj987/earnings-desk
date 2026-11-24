import React, { useState, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Copy, Check, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export default function AgentTerminal({ onOpenDesk }) {
  const [activeCompany, setActiveCompany] = useState('acme');
  const [copied, setCopied] = useState(false);
  const [streamIndex, setStreamIndex] = useState(0);
  const [isStreaming, setIsStreaming] = useState(true);

  const logsByCompany = {
    acme: [
      { tag: 'SYS', color: '#94a3b8', text: 'Initializing Multi-Agent Execution Environment on port 5000...' },
      { tag: 'INGEST', color: '#38bdf8', text: 'Loading Acme Technologies Q3 FY2026 10-Q filing (42 pages, 18,400 words)...' },
      { tag: 'FACTS', color: '#fbbf24', text: 'Extracted 14 primary figures into immutable Fact Registry [F1..F14]' },
      { tag: 'FACTS', color: '#bae6fd', text: '  -> F1: Revenue $4,820M | F2: Net Income $492M | F3: Gross Margin 41.5% | F4: Debt $1.2B' },
      { tag: 'FAN_OUT', color: '#60a5fa', text: 'Forking 4 specialist analytical subagents concurrently...' },
      { tag: 'REVENUE', color: '#10b981', text: '[Revenue Analyst] Top-line evaluated: $4.82B (+12.0% YoY). Core software recurring rev: 72%.' },
      { tag: 'RISK', color: '#f43f5e', text: '[Risk Analyst] Covenants scanned. 1.62x leverage trigger. 38% customer concentration flagged.' },
      { tag: 'OUTLOOK', color: '#fbbf24', text: '[Outlook Analyst] Q4 guidance interval parsed: $4.9B - $5.1B. Forward momentum positive.' },
      { tag: 'COMPARISON', color: '#38bdf8', text: '[Sequential Engine] Operating income +8.4% QoQ. Free cash flow conversion +14.2%.' },
      { tag: 'GATE', color: '#a855f7', text: '[Editor Grounding Gate] Cross-examining 26 formulated statements against evidence registry...' },
      { tag: 'GATE', color: '#10b981', text: '  -> 100.0% Claims Mathematically Anchored. 0 ungrounded claims dropped.' },
      { tag: 'COMPLETE', color: '#ffffff', text: 'Executive Research Note compiled successfully. Overall Stance: BALANCED.' }
    ],
    cloudscale: [
      { tag: 'SYS', color: '#94a3b8', text: 'Initializing Multi-Agent Execution Environment on port 5000...' },
      { tag: 'INGEST', color: '#38bdf8', text: 'Loading CloudScale AI Systems Q3 FY2026 press release (28 pages)...' },
      { tag: 'FACTS', color: '#fbbf24', text: 'Extracted 16 primary figures into immutable Fact Registry [F1..F16]' },
      { tag: 'FACTS', color: '#bae6fd', text: '  -> F1: Revenue $2,400M | F2: Growth +36.0% YoY | F3: Gross Margin 74.5% | F4: Debt $0' },
      { tag: 'FAN_OUT', color: '#60a5fa', text: 'Forking 4 specialist analytical subagents concurrently...' },
      { tag: 'REVENUE', color: '#10b981', text: '[Revenue Analyst] Strong enterprise cloud AI adoption. RPO expanded to $6.8B (+48% YoY).' },
      { tag: 'RISK', color: '#10b981', text: '[Risk Analyst] Pristine balance sheet. Zero long-term debt. Cash & equivalents $1.85B.' },
      { tag: 'OUTLOOK', color: '#10b981', text: '[Outlook Analyst] Q4 revenue guide raised to $2.6B-$2.7B. Gross margins expanding toward 76%.' },
      { tag: 'COMPARISON', color: '#38bdf8', text: '[Sequential Engine] Sequential operating margin widened by +320 bps QoQ.' },
      { tag: 'GATE', color: '#a855f7', text: '[Editor Grounding Gate] Cross-examining 31 formulated statements against evidence registry...' },
      { tag: 'GATE', color: '#10b981', text: '  -> 100.0% Claims Mathematically Anchored. 0 ungrounded claims dropped.' },
      { tag: 'COMPLETE', color: '#ffffff', text: 'Executive Research Note compiled successfully. Overall Stance: BULLISH.' }
    ],
    novaretail: [
      { tag: 'SYS', color: '#94a3b8', text: 'Initializing Multi-Agent Execution Environment on port 5000...' },
      { tag: 'INGEST', color: '#38bdf8', text: 'Loading NovaRetail Group Q3 FY2026 disclosures (36 pages)...' },
      { tag: 'FACTS', color: '#fbbf24', text: 'Extracted 12 primary figures into immutable Fact Registry [F1..F12]' },
      { tag: 'FACTS', color: '#bae6fd', text: '  -> F1: Revenue $6,100M | F2: Growth -2.0% YoY | F3: Gross Margin 31.5% | F4: Debt $4.2B' },
      { tag: 'FAN_OUT', color: '#60a5fa', text: 'Forking 4 specialist analytical subagents concurrently...' },
      { tag: 'REVENUE', color: '#f43f5e', text: '[Revenue Analyst] Same-store sales contracted -3.4%. Discretionary basket sizes down -6.1%.' },
      { tag: 'RISK', color: '#f43f5e', text: '[Risk Analyst] Critical debt load: 4.1x Debt/Cash ratio. Freight headwinds compressing margins.' },
      { tag: 'OUTLOOK', color: '#f43f5e', text: '[Outlook Analyst] Full-year guidance revised downward. Q4 promotional activity expected to peak.' },
      { tag: 'COMPARISON', color: '#f43f5e', text: '[Sequential Engine] Operating income -18.2% QoQ. Working capital constrained.' },
      { tag: 'GATE', color: '#a855f7', text: '[Editor Grounding Gate] Cross-examining 22 formulated statements against evidence registry...' },
      { tag: 'GATE', color: '#10b981', text: '  -> 100.0% Claims Mathematically Anchored. 0 ungrounded claims dropped.' },
      { tag: 'COMPLETE', color: '#ffffff', text: 'Executive Research Note compiled successfully. Overall Stance: HIGH RISK.' }
    ]
  };

  const currentLogs = logsByCompany[activeCompany] || logsByCompany.acme;

  // Stream logs line by line
  useEffect(() => {
    setStreamIndex(1);
    setIsStreaming(true);
  }, [activeCompany]);

  useEffect(() => {
    if (!isStreaming) return;
    if (streamIndex < currentLogs.length) {
      const timer = setTimeout(() => {
        setStreamIndex(prev => prev + 1);
      }, 220);
      return () => clearTimeout(timer);
    } else {
      setIsStreaming(false);
    }
  }, [streamIndex, isStreaming, currentLogs.length]);

  const handleRestart = () => {
    setStreamIndex(1);
    setIsStreaming(true);
  };

  const handleCopyLogs = () => {
    const text = currentLogs.map(l => `[${l.tag}] ${l.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '0 12px' }}>
      {/* Section Header - Unboxed */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <div style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#38bdf8',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 8
          }}>
            Live Multi-Agent Orchestration
          </div>
          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.025em'
          }}>
            Agent Execution Terminal
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginTop: 4 }}>
            Observe specialist agents deliberating, deriving formulas, and enforcing the Grounding Gate in real time.
          </p>
        </div>

        {/* Company Filter Selector */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveCompany('acme')}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              fontSize: '0.8rem',
              fontWeight: 600,
              background: activeCompany === 'acme' ? '#0284c7' : 'rgba(15, 23, 42, 0.7)',
              color: '#ffffff',
              border: `1px solid ${activeCompany === 'acme' ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'}`,
              cursor: 'pointer'
            }}
          >
            Acme Tech ($4.82B)
          </button>
          <button
            onClick={() => setActiveCompany('cloudscale')}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              fontSize: '0.8rem',
              fontWeight: 600,
              background: activeCompany === 'cloudscale' ? '#0284c7' : 'rgba(15, 23, 42, 0.7)',
              color: '#ffffff',
              border: `1px solid ${activeCompany === 'cloudscale' ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'}`,
              cursor: 'pointer'
            }}
          >
            CloudScale AI (+36% YoY)
          </button>
          <button
            onClick={() => setActiveCompany('novaretail')}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              fontSize: '0.8rem',
              fontWeight: 600,
              background: activeCompany === 'novaretail' ? '#0284c7' : 'rgba(15, 23, 42, 0.7)',
              color: '#ffffff',
              border: `1px solid ${activeCompany === 'novaretail' ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'}`,
              cursor: 'pointer'
            }}
          >
            NovaRetail (-2% YoY)
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div
        style={{
          background: 'rgba(3, 7, 18, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: 12,
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.1)',
          overflow: 'hidden',
          fontFamily: "'JetBrains Mono', Consolas, Monaco, monospace"
        }}
      >
        {/* Terminal Header Bar */}
        <div style={{
          padding: '12px 18px',
          background: 'rgba(8, 16, 36, 0.9)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          {/* macOS window dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#f43f5e' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#fbbf24' }} />
            <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginLeft: 8 }}>
              earnings-desk-agent-orchestrator.sh · PID: 5000
            </span>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={handleRestart}
              className="btn btn-silver btn-sm"
              style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <RotateCcw size={12} />
              <span>Replay Stream</span>
            </button>

            <button
              onClick={handleCopyLogs}
              className="btn btn-silver btn-sm"
              style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 5 }}
            >
              {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy Log'}</span>
            </button>
          </div>
        </div>

        {/* Terminal Output Body */}
        <div style={{
          padding: '24px 22px',
          minHeight: 340,
          maxHeight: 460,
          overflowY: 'auto',
          fontSize: '0.85rem',
          lineHeight: 1.8,
          color: '#cbd5e1'
        }}>
          {currentLogs.slice(0, streamIndex).map((log, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 6 }}>
              <span style={{
                color: log.color,
                fontWeight: 700,
                fontSize: '0.75rem',
                minWidth: 95,
                userSelect: 'none',
                letterSpacing: '0.04em'
              }}>
                [{log.tag}]
              </span>
              <span style={{ color: log.color === '#ffffff' ? '#ffffff' : '#cbd5e1', fontWeight: log.color === '#ffffff' ? 700 : 400 }}>
                {log.text}
              </span>
            </div>
          ))}

          {isStreaming && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#38bdf8', marginTop: 8 }}>
              <span style={{ animation: 'pulse 1s infinite' }}>●</span>
              <span style={{ fontSize: '0.78rem' }}>Agent thread running...</span>
            </div>
          )}
        </div>

        {/* Terminal Footer Bar */}
        <div style={{
          padding: '12px 20px',
          background: 'rgba(8, 16, 36, 0.75)',
          borderTop: '1px solid rgba(56, 189, 248, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          fontSize: '0.78rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10b981' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span>4 Agents Synchronized · 100% Provenance Verification Active</span>
          </div>

          <button
            onClick={() => onOpenDesk && onOpenDesk()}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#38bdf8',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer'
            }}
          >
            <span>Inspect Full Trace in Analysis Desk</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
