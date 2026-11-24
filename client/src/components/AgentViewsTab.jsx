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
        <div className="glass-panel tile-interactive tile-gold" style={{ overflow: 'hidden', borderLeft: '5px solid #d97706' }}>
          <div
            onClick={() => toggle('revenue')}
            style={{
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'rgba(217, 119, 6, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <TrendingUp size={22} color="#d97706" />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  Revenue Analyst
                </h3>
                <span style={{ fontSize: '0.84rem', color: '#475569' }}>{views.revenue.headline}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-gold">Stance: {views.revenue.stance} ({views.revenue.score > 0 ? `+${views.revenue.score}` : views.revenue.score})</span>
              {expanded.revenue ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
            </div>
          </div>

          {expanded.revenue && (
            <div style={{ padding: 22, borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', marginBottom: 10 }}>
                  Formulated Claims & Provenance
                </h4>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(views.revenue.claims || []).map((c, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: '#0f172a', lineHeight: 1.6 }}>
                      {c.text} {renderRefs(c.refs)}
                    </li>
                  ))}
                </ul>
              </div>

              {views.revenue.derived && views.revenue.derived.length > 0 && (
                <div style={{ background: '#f8fafc', padding: 14, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <h5 style={{ fontSize: '0.82rem', color: '#d97706', marginBottom: 8, fontWeight: 800 }}>Derived Ratios:</h5>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {views.revenue.derived.map((d, i) => (
                      <div key={i} style={{ fontSize: '0.82rem', color: '#0f172a' }}>
                        <span className="ref-pill">{d.id}</span> <strong>{d.label}:</strong> <span style={{ color: '#d97706', fontWeight: 800 }}>{d.display}</span> <span style={{ color: '#64748b' }}>({d.source})</span>
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
        <div className="glass-panel tile-interactive tile-silver" style={{ overflow: 'hidden', borderLeft: '5px solid #f43f5e' }}>
          <div
            onClick={() => toggle('risk')}
            style={{
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'rgba(244, 63, 94, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <AlertTriangle size={22} color="#f43f5e" />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  Risk Analyst
                </h3>
                <span style={{ fontSize: '0.84rem', color: '#475569' }}>{views.risk.headline}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-negative">Risk: {views.risk.stance} (Weighted score: {views.risk.score})</span>
              {expanded.risk ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
            </div>
          </div>

          {expanded.risk && (
            <div style={{ padding: 22, borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f43f5e', textTransform: 'uppercase', marginBottom: 10 }}>
                  Flagged Red Flags & Exposure Triggers
                </h4>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(views.risk.claims || []).map((c, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: '#0f172a', lineHeight: 1.6 }}>
                      {c.text} {renderRefs(c.refs)}
                    </li>
                  ))}
                </ul>
              </div>

              {views.risk.derived && views.risk.derived.length > 0 && (
                <div style={{ background: '#f8fafc', padding: 14, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <h5 style={{ fontSize: '0.82rem', color: '#f43f5e', marginBottom: 8, fontWeight: 800 }}>Derived Leverage Metric:</h5>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {views.risk.derived.map((d, i) => (
                      <div key={i} style={{ fontSize: '0.82rem', color: '#0f172a' }}>
                        <span className="ref-pill">{d.id}</span> <strong>{d.label}:</strong> <span style={{ color: '#f43f5e', fontWeight: 800 }}>{d.display}</span> <span style={{ color: '#64748b' }}>({d.source})</span>
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
        <div className="glass-panel tile-interactive tile-purple" style={{ overflow: 'hidden', borderLeft: '5px solid #0284c7' }}>
          <div
            onClick={() => toggle('outlook')}
            style={{
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'rgba(2, 132, 199, 0.08)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Compass size={22} color="#0284c7" />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  Outlook Analyst
                </h3>
                <span style={{ fontSize: '0.84rem', color: '#475569' }}>{views.outlook.headline}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-purple">Stance: {views.outlook.stance} ({views.outlook.score > 0 ? `+${views.outlook.score}` : views.outlook.score})</span>
              {expanded.outlook ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
            </div>
          </div>

          {expanded.outlook && (
            <div style={{ padding: 22, borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', marginBottom: 10 }}>
                  Forward Guidance Analysis
                </h4>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(views.outlook.claims || []).map((c, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: '#0f172a', lineHeight: 1.6 }}>
                      {c.text} {renderRefs(c.refs)}
                    </li>
                  ))}
                </ul>
              </div>

              {views.outlook.derived && views.outlook.derived.length > 0 && (
                <div style={{ background: '#f8fafc', padding: 14, borderRadius: 10, border: '1px solid #e2e8f0' }}>
                  <h5 style={{ fontSize: '0.82rem', color: '#0284c7', marginBottom: 8, fontWeight: 800 }}>Derived Guidance Metrics:</h5>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    {views.outlook.derived.map((d, i) => (
                      <div key={i} style={{ fontSize: '0.82rem', color: '#0f172a' }}>
                        <span className="ref-pill">{d.id}</span> <strong>{d.label}:</strong> <span style={{ color: '#0284c7', fontWeight: 800 }}>{d.display}</span> <span style={{ color: '#64748b' }}>({d.source})</span>
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
        <div className="glass-panel tile-interactive tile-silver" style={{ overflow: 'hidden', borderLeft: '5px solid #0284c7' }}>
          <div
            onClick={() => toggle('comparison')}
            style={{
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              background: 'rgba(2, 132, 199, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ArrowUpDown size={22} color="#0284c7" />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                  Comparison Agent (QoQ Delta)
                </h3>
                <span style={{ fontSize: '0.84rem', color: '#475569' }}>{views.comparison.headline}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-silver">Delta: {views.comparison.stance}</span>
              {expanded.comparison ? <ChevronUp size={18} color="#64748b" /> : <ChevronDown size={18} color="#64748b" />}
            </div>
          </div>

          {expanded.comparison && (
            <div style={{ padding: 22, borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', marginBottom: 10 }}>
                  Quarter-over-Quarter Variance Claims
                </h4>
                <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {(views.comparison.claims || []).map((c, i) => (
                    <li key={i} style={{ fontSize: '0.9rem', color: '#0f172a', lineHeight: 1.6 }}>
                      {c.text} {renderRefs(c.refs)}
                    </li>
                  ))}
                </ul>
              </div>

              {views.comparison.table && views.comparison.table.length > 0 && (
                <div style={{ overflowX: 'auto', marginTop: 8 }}>
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
                      {views.comparison.table.map((row, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 700, color: '#0f172a' }}>{row.metric}</td>
                          <td style={{ color: '#475569' }}>{row.prior}</td>
                          <td style={{ fontWeight: 800, color: '#0f172a' }}>{row.current}</td>
                          <td style={{ fontWeight: 700, color: row.change?.startsWith('+') ? '#059669' : row.change?.startsWith('-') ? '#e11d48' : '#475569' }}>
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
      )}
    </div>
  );
}

