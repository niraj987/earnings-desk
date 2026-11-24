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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top action toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        paddingBottom: 14,
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            {report.company} — <span style={{ color: '#fbbf24' }}>{report.period}</span> Research Note
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Specialist Multi-Agent Synthesis · Deterministic Provenance Grounding
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="no-print">
          {/* Executive Audio Briefing Player */}
          <button
            onClick={handleToggleAudio}
            className="btn btn-secondary btn-sm"
            style={{
              borderColor: isPlayingAudio ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.12)',
              color: isPlayingAudio ? '#10b981' : '#cbd5e1'
            }}
          >
            {isPlayingAudio ? <VolumeX size={14} /> : <Volume2 size={14} color="#818cf8" />}
            <span style={{ fontWeight: 600 }}>{isPlayingAudio ? 'Stop Briefing' : 'Audio Briefing'}</span>
            {isPlayingAudio && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: 4 }}>
                <span className="wave-bar" style={{ animationDelay: '0s' }} />
                <span className="wave-bar" style={{ animationDelay: '0.2s' }} />
                <span className="wave-bar" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </button>

          <button onClick={handleCopy} className="btn btn-silver btn-sm">
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button onClick={handleDownload} className="btn btn-primary btn-sm">
            <Download size={14} />
            <span>Download Note</span>
          </button>
        </div>
      </div>

      {/* Floating Ref Preview Card */}
      {activeRefInfo && (
        <div className="glass-panel no-print" style={{
          background: 'rgba(15, 18, 38, 0.95)',
          border: '1px solid #fbbf24',
          borderRadius: 10,
          padding: '14px 20px',
          boxShadow: '0 8px 25px rgba(245, 158, 11, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span className="ref-pill" style={{ background: '#7e22ce', color: '#fff', fontSize: '0.85rem' }}>
                {activeRefInfo.id}
              </span>
              <span style={{ fontWeight: 800, color: '#ffffff' }}>{activeRefInfo.label}</span>
              <span style={{ color: '#fbbf24', fontWeight: 800 }}>
                {activeRefInfo.display || activeRefInfo.value} {activeRefInfo.unit}
              </span>
            </div>
            <div style={{ fontSize: '0.84rem', color: '#cbd5e1', fontStyle: 'italic' }}>
              &ldquo;{activeRefInfo.source}&rdquo;
            </div>
          </div>
          <button
            onClick={() => setActiveRefInfo(null)}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.3rem', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Executive Summary Card */}
      <div className="glass-panel tile-interactive" style={{ padding: 26, borderLeft: '5px solid #fbbf24' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Executive Summary
          </h3>
          <span className={`badge ${note.verdict?.toLowerCase().includes('positive') ? 'badge-positive' : note.verdict?.toLowerCase().includes('negative') ? 'badge-negative' : 'badge-gold'}`}>
            Stance: {note.verdict}
          </span>
        </div>
        <div style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#ffffff' }}>
          {renderTextWithRefs(note.summary)}
        </div>
      </div>

      {/* Specialist Views Grid: Revenue, Risk, Outlook (3 Interactive Tiles) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 22 }}>
        {/* 1. Revenue Analyst */}
        {views.revenue && (
          <div className="glass-panel tile-interactive tile-gold" style={{ padding: 24, borderTop: '4px solid #fbbf24' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.3rem' }}>📈</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>1. Revenue Analyst</h4>
              </div>
              <span className="badge badge-gold">Positive</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: 14, fontStyle: 'italic' }}>
              {views.revenue.headline}
            </div>
            <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(views.revenue.claims || []).map((c, i) => (
                <li key={i} style={{ fontSize: '0.88rem', color: '#ffffff', lineHeight: 1.55 }}>
                  {renderTextWithRefs(c.rendered || c.text)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 2. Risk Analyst */}
        {views.risk && (
          <div className="glass-panel tile-interactive tile-silver" style={{ padding: 24, borderTop: '4px solid #f43f5e' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.3rem' }}>⚠️</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>2. Risk Analyst</h4>
              </div>
              <span className="badge badge-negative">{views.risk.stance === 'negative' ? 'High Risk' : views.risk.stance}</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: 14, fontStyle: 'italic' }}>
              {views.risk.headline}
            </div>
            <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(views.risk.claims || []).map((c, i) => (
                <li key={i} style={{ fontSize: '0.88rem', color: '#ffffff', lineHeight: 1.55 }}>
                  {renderTextWithRefs(c.rendered || c.text)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 3. Outlook Analyst */}
        {views.outlook && (
          <div className="glass-panel tile-interactive tile-purple" style={{ padding: 24, borderTop: '4px solid #c084fc' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.3rem' }}>🔭</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>3. Outlook Analyst</h4>
              </div>
              <span className="badge badge-purple">Positive</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: 14, fontStyle: 'italic' }}>
              {views.outlook.headline}
            </div>
            <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(views.outlook.claims || []).map((c, i) => (
                <li key={i} style={{ fontSize: '0.88rem', color: '#ffffff', lineHeight: 1.55 }}>
                  {renderTextWithRefs(c.rendered || c.text)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 4. Quarter-over-quarter Comparison Table */}
      {views.comparison && views.comparison.table && views.comparison.table.length > 0 && (
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(168, 85, 247, 0.25)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <FileSpreadsheet size={19} color="#fbbf24" />
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
              4. Quarter-over-Quarter Trend Analysis
            </h4>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="desk-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Prior Quarter</th>
                  <th>Current Quarter</th>
                  <th>Change</th>
                  <th>Direction</th>
                  <th>Provenance Refs</th>
                </tr>
              </thead>
              <tbody>
                {views.comparison.table.map((row, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, color: '#ffffff' }}>{row.metric}</td>
                    <td style={{ color: '#cbd5e1' }}>{row.prior}</td>
                    <td style={{ fontWeight: 800, color: '#ffffff' }}>{row.current}</td>
                    <td style={{ fontWeight: 700, color: row.change?.startsWith('+') ? '#34d399' : row.change?.startsWith('-') ? '#fb7185' : '#cbd5e1' }}>
                      {row.change}
                    </td>
                    <td>
                      <span style={{ fontSize: '1.1rem' }}>{row.dir}</span>
                    </td>
                    <td>
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
        <div className="glass-panel tile-interactive tile-gold" style={{
          padding: 24,
          background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.12) 0%, rgba(13, 19, 38, 0.85) 100%)',
          border: '1px solid rgba(251, 191, 36, 0.45)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <AlertCircle size={22} color="#fbbf24" />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24' }}>
              Specialist Agent Disagreements Flagged by Editor
            </h4>
          </div>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {note.disagreements.map((d, i) => (
              <li key={i} style={{ fontSize: '0.9rem', color: '#fffbeb', lineHeight: 1.65 }}>
                {renderTextWithRefs(d)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 6. Provenance Sources Registry */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(168, 85, 247, 0.25)' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
            Sources & Fact Registry (100% Provenance Audit Trail)
          </h4>
          <p style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
            All claims reference one or more verified IDs from this table
          </p>
        </div>
        <div style={{ overflowX: 'auto', maxHeight: 440 }}>
          <table className="desk-table">
            <thead>
              <tr>
                <th style={{ width: 85 }}>ID</th>
                <th>Metric / Item</th>
                <th>Extracted Value</th>
                <th>Verbatim Source Sentence or Formula</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(registry).map((item, i) => (
                <tr key={i}>
                  <td>
                    <span className="ref-pill" onClick={() => handleRefClick(item.id)}>
                      {item.id}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#ffffff' }}>{item.label}</td>
                  <td style={{ color: '#fbbf24', fontWeight: 800 }}>{item.display || item.value}</td>
                  <td style={{ fontSize: '0.83rem', color: '#cbd5e1', fontStyle: 'italic' }}>
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
