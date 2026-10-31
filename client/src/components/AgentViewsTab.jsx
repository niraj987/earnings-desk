import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, Compass, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';

export default function AgentViewsTab({ report, onSelectRef }) {
  if (!report || !report.views) return null;

  const views = report.views;
  const [expanded, setExpanded] = useState({
    revenue: true,
    risk: true,
    outlook: true,
    comparison: true
  });

  const toggle = (k) => {
    setExpanded(prev => ({ ...prev, [k]: !prev[k] }));
  };

  const renderRefs = (refs) => {
    if (!refs || refs.length === 0) return null;
    return refs.map((r, i) => (
      <button key={i} className="ref-pill" onClick={() => onSelectRef && onSelectRef(r)}>
        {r}
      </button>
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* 1. Revenue Analyst View */}
      {views.revenue && (
        <div className="glass-panel" style={{ overflow: 'hidden', borderLeft: '4px solid #10b981' }}>
          <div
            onClick={() => toggle('revenue')}
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'rgba(16, 185, 129, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <TrendingUp size={20} color="#10b981" />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc' }}>
                  Revenue Analyst
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{views.revenue.headline}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-positive">Stance: {views.revenue.stance} ({views.revenue.score > 0 ? `+${views.revenue.score}` : views.revenue.score})</span>
              {expanded.revenue ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
            </div>
          </div>

          {expanded.revenue && (
            <div style={{ padding: 20, borderTop: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>
                  Formulated Claims & Provenance
                </h4>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(views.revenue.claims || []).map((c, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>
                      {c.text} {renderRefs(c.refs)}
                    </li>
                  ))}
                </ul>
              </div>

              {views.revenue.derived && views.revenue.derived.length > 0 && (
                <div style={{ background: '#0f172a', padding: 12, borderRadius: 6, border: '1px solid #1e293b' }}>
                  <h5 style={{ fontSize: '0.8rem', color: '#38bdf8', marginBottom: 6, fontWeight: 600 }}>Derived Ratios:</h5>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {views.revenue.derived.map((d, i) => (
                      <div key={i} style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                        <span className="ref-pill">{d.id}</span> <strong>{d.label}:</strong> {d.display} <span style={{ color: '#64748b' }}>({d.source})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. Risk Analyst View */}
      {views.risk && (
        <div className="glass-panel" style={{ overflow: 'hidden', borderLeft: '4px solid #f43f5e' }}>
          <div
            onClick={() => toggle('risk')}
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'rgba(244, 63, 94, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <AlertTriangle size={20} color="#f43f5e" />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc' }}>
                  Risk Analyst
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{views.risk.headline}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-negative">Risk: {views.risk.stance} (Weighted score: {views.risk.score})</span>
              {expanded.risk ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
            </div>
          </div>

          {expanded.risk && (
            <div style={{ padding: 20, borderTop: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>
                  Flagged Red Flags & Exposure Triggers
                </h4>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(views.risk.claims || []).map((c, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>
                      {c.text} {renderRefs(c.refs)}
                    </li>
                  ))}
                </ul>
              </div>

              {views.risk.derived && views.risk.derived.length > 0 && (
                <div style={{ background: '#0f172a', padding: 12, borderRadius: 6, border: '1px solid #1e293b' }}>
                  <h5 style={{ fontSize: '0.8rem', color: '#f43f5e', marginBottom: 6, fontWeight: 600 }}>Derived Leverage Metric:</h5>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {views.risk.derived.map((d, i) => (
                      <div key={i} style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                        <span className="ref-pill">{d.id}</span> <strong>{d.label}:</strong> {d.display} <span style={{ color: '#64748b' }}>({d.source})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. Outlook Analyst View */}
      {views.outlook && (
        <div className="glass-panel" style={{ overflow: 'hidden', borderLeft: '4px solid #0ea5e9' }}>
          <div
            onClick={() => toggle('outlook')}
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'rgba(14, 165, 233, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Compass size={20} color="#0ea5e9" />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc' }}>
                  Outlook Analyst
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{views.outlook.headline}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-positive">Stance: {views.outlook.stance} ({views.outlook.score > 0 ? `+${views.outlook.score}` : views.outlook.score})</span>
              {expanded.outlook ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
            </div>
          </div>

          {expanded.outlook && (
            <div style={{ padding: 20, borderTop: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>
                  Forward Guidance Analysis
                </h4>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(views.outlook.claims || []).map((c, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', color: '#e2e8f0' }}>
                      {c.text} {renderRefs(c.refs)}
                    </li>
                  ))}
                </ul>
              </div>

              {views.outlook.derived && views.outlook.derived.length > 0 && (
                <div style={{ background: '#0f172a', padding: 12, borderRadius: 6, border: '1px solid #1e293b' }}>
                  <h5 style={{ fontSize: '0.8rem', color: '#38bdf8', marginBottom: 6, fontWeight: 600 }}>Derived Guidance Metrics:</h5>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {views.outlook.derived.map((d, i) => (
                      <div key={i} style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                        <span className="ref-pill">{d.id}</span> <strong>{d.label}:</strong> {d.display} <span style={{ color: '#64748b' }}>({d.source})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. Comparison Agent View */}
      {views.comparison && (
        <div className="glass-panel" style={{ overflow: 'hidden', borderLeft: '4px solid #a855f7' }}>
          <div
            onClick={() => toggle('comparison')}
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'rgba(168, 85, 247, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ArrowUpDown size={20} color="#a855f7" />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc' }}>
                  Comparison Agent (QoQ Trends)
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{views.comparison.headline}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-mixed">Stance: {views.comparison.stance}</span>
              {expanded.comparison ? <ChevronUp size={18} color="#94a3b8" /> : <ChevronDown size={18} color="#94a3b8" />}
            </div>
          </div>

          {expanded.comparison && (
            <div style={{ padding: 20, borderTop: '1px solid #1e293b' }}>
              <table className="desk-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Prior Quarter</th>
                    <th>Current Quarter</th>
                    <th>Delta</th>
                    <th>Trend</th>
                    <th>Refs</th>
                  </tr>
                </thead>
                <tbody>
                  {(views.comparison.table || []).map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>{row.metric}</td>
                      <td>{row.prior}</td>
                      <td style={{ fontWeight: 600 }}>{row.current}</td>
                      <td style={{ color: row.change?.startsWith('+') ? '#10b981' : row.change?.startsWith('-') ? '#f43f5e' : '#94a3b8' }}>
                        {row.change}
                      </td>
                      <td>{row.dir}</td>
                      <td>
                        {Array.isArray(row.refs) ? renderRefs(row.refs) : renderRefs(row.refs ? [row.refs] : [])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

