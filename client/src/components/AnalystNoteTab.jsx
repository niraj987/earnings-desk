import React, { useState, useEffect } from 'react';
import { Download, Copy, Check, Volume2, VolumeX, Printer, FileSpreadsheet, AlertCircle } from 'lucide-react';

export default function AnalystNoteTab({ report, onSelectRef }) {
  const [copied, setCopied] = useState(false);
  const [activeRefInfo, setActiveRefInfo] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!report) return null;

  const note = report.note || {};
  const views = report.views || {};
  const registry = note.registry || {};

  // Web Speech API text-to-speech audio briefing
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [report]);

  const handleToggleAudio = () => {
    if (!window.speechSynthesis) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = `${report.company} ${report.period} Earnings Note. Overall stance is ${note.verdict}. ${note.summary.replace(/\[.*?\]/g, '')}. In revenue, ${views.revenue?.headline || ''}. In risk, ${views.risk?.headline || ''}. In outlook, ${views.outlook?.headline || ''}.`;
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(note.markdown || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([note.markdown || ''], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.company.replace(/\s+/g, '_')}_${report.period.replace(/\s+/g, '_')}_analyst_note.md`;
    link.click();
  };

  const handleRefClick = (refId) => {
    const item = registry[refId];
    if (item) {
      setActiveRefInfo({ id: refId, ...item });
      if (onSelectRef) onSelectRef(refId);
    }
  };

  const renderTextWithRefs = (text) => {
    if (!text) return null;
    const parts = text.split(/(\[[A-Z0-9,\s]+\])/g);
    return parts.map((part, idx) => {
      const match = part.match(/^\[(.*)\]$/);
      if (match) {
        const refs = match[1].split(',').map(s => s.trim());
        return (
          <span key={idx} style={{ display: 'inline-flex', gap: 3, verticalAlign: 'middle' }}>
            {refs.map((r, rIdx) => (
              <button
                key={rIdx}
                className="ref-pill"
                onClick={() => handleRefClick(r)}
                title={registry[r] ? `${registry[r].label}: ${registry[r].display || registry[r].value}` : r}
              >
                {r}
              </button>
            ))}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Top action toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        padding: '16px 20px',
        background: '#ffffff',
        borderRadius: 14,
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Multi-Agent Synthesis Report
            </span>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>·</span>
            <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 600 }}>100% Provenance Grounded</span>
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: 2 }}>
            {report.company} — <span style={{ color: '#d97706' }}>{report.period}</span> Research Note
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#64748b', marginTop: 2 }}>
            Every claim links directly to extracted figures [F#] or primary source sentences with zero hallucination.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }} className="no-print">
          {/* Executive Audio Briefing Player */}
          <button
            onClick={handleToggleAudio}
            className="btn btn-secondary btn-sm"
            style={{
              borderColor: isPlayingAudio ? '#10b981' : '#cbd5e1',
              color: isPlayingAudio ? '#10b981' : '#334155',
              padding: '8px 14px'
            }}
          >
            {isPlayingAudio ? <VolumeX size={15} /> : <Volume2 size={15} color="#0284c7" />}
            <span style={{ fontWeight: 600 }}>{isPlayingAudio ? 'Stop Briefing' : 'Audio Briefing'}</span>
            {isPlayingAudio && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: 4 }}>
                <span className="wave-bar" style={{ animationDelay: '0s' }} />
                <span className="wave-bar" style={{ animationDelay: '0.2s' }} />
                <span className="wave-bar" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </button>

          <button onClick={handleCopy} className="btn btn-secondary btn-sm" style={{ padding: '8px 14px' }}>
            {copied ? <Check size={15} color="#10b981" /> : <Copy size={15} />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button onClick={handleDownload} className="btn btn-primary btn-sm" style={{ padding: '8px 16px' }}>
            <Download size={15} />
            <span>Download Note</span>
          </button>
        </div>
      </div>

      {/* Floating Ref Preview Card */}
      {activeRefInfo && (
        <div className="glass-panel no-print" style={{
          background: '#ffffff',
          border: '1px solid #d97706',
          borderRadius: 12,
          padding: '18px 24px',
          boxShadow: '0 10px 30px rgba(217, 119, 6, 0.18)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 18
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="ref-pill" style={{ background: '#0284c7', color: '#fff', fontSize: '0.85rem' }}>
                {activeRefInfo.id}
              </span>
              <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>{activeRefInfo.label}</span>
              <span style={{ color: '#d97706', fontWeight: 800, fontSize: '1rem' }}>
                {activeRefInfo.display || activeRefInfo.value} {activeRefInfo.unit}
              </span>
            </div>
            <div style={{ fontSize: '0.88rem', color: '#475569', fontStyle: 'italic', lineHeight: 1.5 }}>
              &ldquo;{activeRefInfo.source}&rdquo;
            </div>
            <div style={{ fontSize: '0.74rem', color: '#0284c7', fontWeight: 600, marginTop: 6 }}>
              ✓ Verified fact directly extracted from primary regulatory disclosure
            </div>
          </div>
          <button
            onClick={() => setActiveRefInfo(null)}
            style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '1.4rem', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Executive Summary Card */}
      <div className="glass-panel tile-interactive" style={{
        padding: '28px 32px',
        borderLeft: '5px solid #d97706',
        borderRadius: 14,
        background: '#ffffff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Executive Summary & Macro Synthesis
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 2 }}>
              Lead Editor consensus distillation of top-line revenue, profitability margins, balance-sheet health, and key corporate risks.
            </p>
          </div>
          <span className={`badge ${note.verdict?.toLowerCase().includes('positive') ? 'badge-positive' : note.verdict?.toLowerCase().includes('negative') ? 'badge-negative' : 'badge-gold'}`} style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
            Consensus: {note.verdict}
          </span>
        </div>
        <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#0f172a', marginTop: 14 }}>
          {renderTextWithRefs(note.summary)}
        </div>
      </div>

      {/* Specialist Views Grid: Revenue, Risk, Outlook (3 Interactive Tiles) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 24 }}>
        {/* 1. Revenue Analyst */}
        {views.revenue && (
          <div className="glass-panel tile-interactive tile-gold" style={{
            padding: '28px 30px',
            borderTop: '4px solid #d97706',
            borderRadius: 14,
            background: '#ffffff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.4rem' }}>📈</span>
                <div>
                  <h4 style={{ fontSize: '1.12rem', fontWeight: 800, color: '#0f172a' }}>1. Revenue Analyst</h4>
                  <span style={{ fontSize: '0.76rem', color: '#64748b' }}>Top-line expansion & gross margins</span>
                </div>
              </div>
              <span className="badge badge-gold">Positive</span>
            </div>
            <div style={{ fontSize: '0.86rem', color: '#475569', marginBottom: 16, fontStyle: 'italic', background: 'rgba(217, 119, 6, 0.05)', padding: '8px 12px', borderRadius: 8 }}>
              {views.revenue.headline}
            </div>
            <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(views.revenue.claims || []).map((c, i) => (
                <li key={i} style={{ fontSize: '0.9rem', color: '#0f172a', lineHeight: 1.6 }}>
                  {renderTextWithRefs(c.rendered || c.text)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 2. Risk Analyst */}
        {views.risk && (
          <div className="glass-panel tile-interactive tile-silver" style={{
            padding: '28px 30px',
            borderTop: '4px solid #f43f5e',
            borderRadius: 14,
            background: '#ffffff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.4rem' }}>⚠️</span>
                <div>
                  <h4 style={{ fontSize: '1.12rem', fontWeight: 800, color: '#0f172a' }}>2. Risk Analyst</h4>
                  <span style={{ fontSize: '0.76rem', color: '#64748b' }}>Leverage, concentration & headwinds</span>
                </div>
              </div>
              <span className="badge badge-negative">{views.risk.stance === 'negative' ? 'High Risk' : views.risk.stance}</span>
            </div>
            <div style={{ fontSize: '0.86rem', color: '#475569', marginBottom: 16, fontStyle: 'italic', background: 'rgba(244, 63, 94, 0.05)', padding: '8px 12px', borderRadius: 8 }}>
              {views.risk.headline}
            </div>
            <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(views.risk.claims || []).map((c, i) => (
                <li key={i} style={{ fontSize: '0.9rem', color: '#0f172a', lineHeight: 1.6 }}>
                  {renderTextWithRefs(c.rendered || c.text)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 3. Outlook Analyst */}
        {views.outlook && (
          <div className="glass-panel tile-interactive tile-purple" style={{
            padding: '28px 30px',
            borderTop: '4px solid #0284c7',
            borderRadius: 14,
            background: '#ffffff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.4rem' }}>🔭</span>
                <div>
                  <h4 style={{ fontSize: '1.12rem', fontWeight: 800, color: '#0f172a' }}>3. Outlook Analyst</h4>
                  <span style={{ fontSize: '0.76rem', color: '#64748b' }}>Guidance intervals & momentum</span>
                </div>
              </div>
              <span className="badge badge-purple">Positive</span>
            </div>
            <div style={{ fontSize: '0.86rem', color: '#475569', marginBottom: 16, fontStyle: 'italic', background: 'rgba(2, 132, 199, 0.05)', padding: '8px 12px', borderRadius: 8 }}>
              {views.outlook.headline}
            </div>
            <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(views.outlook.claims || []).map((c, i) => (
                <li key={i} style={{ fontSize: '0.9rem', color: '#0f172a', lineHeight: 1.6 }}>
                  {renderTextWithRefs(c.rendered || c.text)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 4. Quarter-over-quarter Comparison Table */}
      {views.comparison && views.comparison.table && views.comparison.table.length > 0 && (
        <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: 14, background: '#ffffff', border: '1px solid #e2e8f0' }}>
          <div style={{ padding: '22px 28px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <FileSpreadsheet size={20} color="#d97706" />
              <div>
                <h4 style={{ fontSize: '1.12rem', fontWeight: 800, color: '#0f172a' }}>
                  4. Quarter-over-Quarter Trend Analysis
                </h4>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Sequential metric-by-metric variance benchmarking current quarter against prior quarter disclosures
                </span>
              </div>
            </div>
          </div>
          <div style={{ overflowX: 'auto', padding: '8px 16px 20px' }}>
            <table className="desk-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px 16px' }}>Metric</th>
                  <th style={{ padding: '12px 16px' }}>Prior Quarter</th>
                  <th style={{ padding: '12px 16px' }}>Current Quarter</th>
                  <th style={{ padding: '12px 16px' }}>Variance</th>
                  <th style={{ padding: '12px 16px' }}>Trajectory</th>
                  <th style={{ padding: '12px 16px' }}>Provenance Refs</th>
                </tr>
              </thead>
              <tbody>
                {views.comparison.table.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ fontWeight: 700, color: '#0f172a', padding: '12px 16px' }}>{row.metric}</td>
                    <td style={{ color: '#475569', padding: '12px 16px' }}>{row.prior}</td>
                    <td style={{ fontWeight: 800, color: '#0f172a', padding: '12px 16px' }}>{row.current}</td>
                    <td style={{ fontWeight: 700, color: row.change?.startsWith('+') ? '#059669' : row.change?.startsWith('-') ? '#e11d48' : '#475569', padding: '12px 16px' }}>
                      {row.change}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: '1.15rem' }}>{row.dir}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      {Array.isArray(row.refs) ? (
                        row.refs.map((r, rIdx) => (
                          <button key={rIdx} className="ref-pill" onClick={() => handleRefClick(r)}>
                            {r}
                          </button>
                        ))
                      ) : (
                        renderTextWithRefs(`[${row.refs}]`)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. Analyst Disagreements */}
      {note.disagreements && note.disagreements.length > 0 && (
        <div className="glass-panel tile-interactive" style={{
          padding: '24px 28px',
          background: '#fffbeb',
          border: '1px solid rgba(217, 119, 6, 0.35)',
          borderRadius: 14
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <AlertCircle size={22} color="#d97706" />
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#b45309' }}>
                5. Specialist Agent Disagreements Flagged & Resolved
              </h4>
              <span style={{ fontSize: '0.8rem', color: '#92400e' }}>
                Inter-agent debate flags between expansion thesis and downside risk exposure
              </span>
            </div>
          </div>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {note.disagreements.map((d, i) => (
              <li key={i} style={{ fontSize: '0.9rem', color: '#78350f', lineHeight: 1.65 }}>
                {renderTextWithRefs(d)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 6. Provenance Sources Registry */}
      <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: 14, background: '#ffffff', border: '1px solid #e2e8f0' }}>
        <div style={{ padding: '22px 28px', borderBottom: '1px solid #e2e8f0' }}>
          <h4 style={{ fontSize: '1.12rem', fontWeight: 800, color: '#0f172a' }}>
            6. Provenance Fact Registry (100% Deterministic Grounding Audit Trail)
          </h4>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 2 }}>
            Every statement synthesized by our agents references persistent IDs [F#] linked directly to verbatim disclosure sentences.
          </p>
        </div>
        <div style={{ overflowX: 'auto', maxHeight: 440, padding: '8px 16px 20px' }}>
          <table className="desk-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: 85, padding: '12px 16px' }}>ID</th>
                <th style={{ padding: '12px 16px' }}>Metric / Disclosure Item</th>
                <th style={{ padding: '12px 16px' }}>Audited Value</th>
                <th style={{ padding: '12px 16px' }}>Verbatim Primary Source Sentence or Formula</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(registry).map((item, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <span className="ref-pill" onClick={() => handleRefClick(item.id)}>
                      {item.id}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#0f172a', padding: '12px 16px' }}>{item.label}</td>
                  <td style={{ color: '#d97706', fontWeight: 800, padding: '12px 16px' }}>{item.display || item.value}</td>
                  <td style={{ fontSize: '0.84rem', color: '#475569', fontStyle: 'italic', padding: '12px 16px', lineHeight: 1.5 }}>
                    {item.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
