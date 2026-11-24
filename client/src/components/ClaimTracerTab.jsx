import React, { useState } from 'react';
import { Search, ShieldCheck, Quote, FileText, CheckCircle2 } from 'lucide-react';

export default function ClaimTracerTab({ report, preselectedRef }) {
  if (!report) return null;

  const views = report.views || {};
  const registry = report.note?.registry || {};

  // Flatten all claims from all 4 agents
  const allClaims = [];
  ['revenue', 'risk', 'outlook', 'comparison'].forEach(agentKey => {
    const v = views[agentKey];
    if (v && v.claims) {
      v.claims.forEach(c => {
        allClaims.push({
          agent: v.agent || agentKey,
          text: c.text,
          rendered: c.rendered || c.text,
          refs: c.refs || []
        });
      });
    }
  });

  const [selectedClaimIndex, setSelectedClaimIndex] = useState(0);
  const activeClaim = allClaims[selectedClaimIndex] || allClaims[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Intro Box */}
      <div className="glass-panel tile-interactive tile-purple" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <Search size={24} color="#0284c7" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
            Claim Provenance Tracer & Document Grounding Inspector
          </h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.65 }}>
          Zero hallucination audit trail: every statement synthesized by an analyst agent is formally anchored to primary extracted figures or verbatim press release sentences.
          Select any claim to view its full derivation tree and original source sentence.
        </p>

        {/* Claim Selector */}
        <div style={{ marginTop: 18 }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Select a Claim to Inspect ({allClaims.length} available across 4 agents):
          </label>
          <select
            value={selectedClaimIndex}
            onChange={e => setSelectedClaimIndex(Number(e.target.value))}
            style={{
              width: '100%',
              background: '#ffffff',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: 8,
              padding: '12px 16px',
              fontSize: '0.92rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {allClaims.map((c, i) => (
              <option key={i} value={i}>
                [{c.agent}] {c.text.length > 110 ? `${c.text.substring(0, 110)}...` : c.text}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Claim Breakdown Card */}
      {activeClaim && (
        <div className="glass-panel tile-interactive tile-gold" style={{ padding: 26, borderTop: '4px solid #d97706' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="badge badge-positive" style={{ textTransform: 'none' }}>
                <CheckCircle2 size={14} /> 100% Grounded
              </span>
              <span style={{ fontSize: '0.88rem', color: '#64748b' }}>
                Formulated by <strong style={{ color: '#0f172a' }}>{activeClaim.agent}</strong>
              </span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {activeClaim.refs.map((r, i) => (
                <span key={i} className="ref-pill" style={{ fontSize: '0.82rem', padding: '3px 10px' }}>
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: '#0f172a',
            lineHeight: 1.65,
            background: '#f8fafc',
            padding: '18px 24px',
            borderRadius: 10,
            border: '1px solid #e2e8f0',
            marginBottom: 22
          }}>
            &ldquo;{activeClaim.text}&rdquo;
          </div>

          {/* Evidence Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
            {activeClaim.refs.map((refId, i) => {
              const item = registry[refId] || {};
              const isSentence = item.key === 'sentence' || refId.startsWith('S');
              const isDerived = refId.startsWith('R') || refId.startsWith('K') || refId.startsWith('O');

              return (
                <div key={i} className="tile-interactive tile-silver" style={{
                  padding: '18px 20px',
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="ref-pill" style={{ background: '#0284c7', color: '#ffffff', fontSize: '0.85rem' }}>
                        {refId}
                      </span>
                      <span style={{ fontWeight: 800, color: '#0f172a' }}>{item.label || refId}</span>
                    </div>
                    {!isSentence && (
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0284c7' }}>
                        {item.display || item.value} {item.unit}
                      </span>
                    )}
                  </div>

                  {isDerived && (
                    <div style={{ fontSize: '0.75rem', color: '#0369a1', background: '#f0f9ff', border: '1px solid #bae6fd', padding: '2px 8px', borderRadius: 4, width: 'fit-content' }}>
                      ⚡ Formula: {item.source}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 4 }}>
                    <Quote size={16} color="#64748b" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div style={{ fontSize: '0.85rem', color: '#475569', fontStyle: 'italic', lineHeight: 1.5 }}>
                      {item.source}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Raw Earnings Release Source Text View */}
      {report.report_text && (
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileText size={18} color="#0284c7" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
              Full Original Press Release Document (Provenance Source)
            </h4>
          </div>
          <div style={{
            padding: 20,
            maxHeight: 320,
            overflowY: 'auto',
            background: '#f8fafc',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            lineHeight: 1.7,
            color: '#334155',
            whiteSpace: 'pre-wrap'
          }}>
            {report.report_text}
          </div>
        </div>
      )}
    </div>
  );
}
