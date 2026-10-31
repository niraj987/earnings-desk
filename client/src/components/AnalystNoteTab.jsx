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
        paddingBottom: 16,
        borderBottom: '1px solid #1a2b47'
      }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            {report.company} — {report.period} Analyst Research Note
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
            Institutional Fan-Out / Fan-In Synthesis · Zero-Hallucination Provenance Guarantee
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }} className="no-print">
          {/* Executive Audio Briefing Player */}
          <button
            onClick={handleToggleAudio}
            className="btn btn-secondary btn-sm"
            style={{
              borderColor: isPlayingAudio ? '#10b981' : '#38bdf8',
              color: isPlayingAudio ? '#10b981' : '#38bdf8',
              background: isPlayingAudio ? 'rgba(16, 185, 129, 0.1)' : '#121c2e'
            }}
          >
            {isPlayingAudio ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isPlayingAudio ? 'Stop Briefing' : 'Audio Briefing'}</span>
            {isPlayingAudio && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 4 }}>
                <span className="wave-bar" style={{ animationDelay: '0s' }} />
                <span className="wave-bar" style={{ animationDelay: '0.2s' }} />
                <span className="wave-bar" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </button>

          <button onClick={handleCopy} className="btn btn-secondary btn-sm">
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy MD'}
          </button>

          <button onClick={handleDownload} className="btn btn-primary btn-sm">
            <Download size={14} />
            Download (.md)
          </button>
        </div>
      </div>

      {/* Floating Ref Preview Card */}
      {activeRefInfo && (
        <div style={{
          background: '#09101d',
          border: '1px solid #38bdf8',
          borderRadius: 8,
          padding: '12px 18px',
          boxShadow: '0 6px 20px rgba(56, 189, 248, 0.25)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16
        }} className="no-print">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className="ref-pill" style={{ background: '#0284c7', color: '#fff', fontSize: '0.85rem' }}>
                {activeRefInfo.id}
              </span>
              <span style={{ fontWeight: 700, color: '#f8fafc' }}>{activeRefInfo.label}</span>
              <span style={{ color: '#38bdf8', fontWeight: 800 }}>
                {activeRefInfo.display || activeRefInfo.value} {activeRefInfo.unit}
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic' }}>
              &ldquo;{activeRefInfo.source}&rdquo;
            </div>
          </div>
          <button
            onClick={() => setActiveRefInfo(null)}
            style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>
      )}

      {/* Executive Summary Card */}
      <div className="glass-panel" style={{ padding: 24, borderLeft: '5px solid #38bdf8' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Executive Summary
          </h3>
          <span className={`badge ${note.verdict?.toLowerCase().includes('positive') ? 'badge-positive' : note.verdict?.toLowerCase().includes('negative') ? 'badge-negative' : 'badge-mixed'}`}>
            Stance: {note.verdict}
          </span>
        </div>
        <div style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#e2e8f0' }}>
          {renderTextWithRefs(note.summary)}
        </div>
      </div>

      {/* Specialist Views Grid: Revenue, Risk, Outlook */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        {/* 1. Revenue Analyst */}
        {views.revenue && (
          <div className="glass-panel" style={{ padding: 22, borderTop: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.2rem' }}>📈</span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>1. Revenue</h4>
              </div>
              <span className="badge badge-positive">Positive</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: 14, fontStyle: 'italic' }}>
              {views.revenue.headline}
            </div>
            <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(views.revenue.claims || []).map((c, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {renderTextWithRefs(c.rendered || c.text)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 2. Risk Analyst */}
        {views.risk && (
          <div className="glass-panel" style={{ padding: 22, borderTop: '4px solid #f43f5e' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>2. Risk</h4>
              </div>
              <span className="badge badge-negative">{views.risk.stance === 'negative' ? 'High Risk' : views.risk.stance}</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: 14, fontStyle: 'italic' }}>
              {views.risk.headline}
            </div>
            <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(views.risk.claims || []).map((c, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  {renderTextWithRefs(c.rendered || c.text)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 3. Outlook Analyst */}
        {views.outlook && (
          <div className="glass-panel" style={{ padding: 22, borderTop: '4px solid #0ea5e9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.2rem' }}>🔭</span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>3. Outlook</h4>
              </div>
              <span className="badge badge-positive">Positive</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: 14, fontStyle: 'italic' }}>
              {views.outlook.headline}
            </div>
            <ul style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(views.outlook.claims || []).map((c, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: 1.5 }}>
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
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a2b47', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileSpreadsheet size={18} color="#38bdf8" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
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
                    <td style={{ fontWeight: 600 }}>{row.metric}</td>
                    <td>{row.prior}</td>
                    <td style={{ fontWeight: 700, color: '#f8fafc' }}>{row.current}</td>
                    <td style={{ fontWeight: 600, color: row.change?.startsWith('+') ? '#10b981' : row.change?.startsWith('-') ? '#f43f5e' : '#94a3b8' }}>
                      {row.change}
                    </td>
                    <td>
                      <span style={{ fontSize: '1rem' }}>{row.dir}</span>
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
        <div className="glass-panel" style={{
          padding: 22,
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.35)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <AlertCircle size={20} color="#f59e0b" />
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f59e0b' }}>
              Specialist Agent Disagreements Flagged by Editor
            </h4>
          </div>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {note.disagreements.map((d, i) => (
              <li key={i} style={{ fontSize: '0.875rem', color: '#fef3c7', lineHeight: 1.6 }}>
                {renderTextWithRefs(d)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 6. Provenance Sources Registry */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a2b47' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
            Sources & Fact Registry (100% Provenance Audit Trail)
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            All claims reference one or more verified IDs from this table
          </p>
        </div>
        <div style={{ overflowX: 'auto', maxHeight: 420 }}>
          <table className="desk-table">
            <thead>
              <tr>
                <th style={{ width: 80 }}>ID</th>
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
                  <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{item.label}</td>
                  <td style={{ color: '#38bdf8', fontWeight: 700 }}>{item.display || item.value}</td>
                  <td style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
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
