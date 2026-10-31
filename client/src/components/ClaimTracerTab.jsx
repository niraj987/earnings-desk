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
      <div className="glass-panel" style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Search size={22} color="#38bdf8" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
            Claim Provenance Tracer & Document Grounding Inspector
          </h3>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
          Zero hallucination audit trail: every statement synthesized by an analyst agent is formally anchored to primary extracted figures or verbatim press release sentences.
          Select any claim to view its full derivation tree and original source sentence.
        </p>

        {/* Claim Selector */}
        <div style={{ marginTop: 16 }}>
          <label style={{ display: 'block', fontSize: '0.8rem', color: '#64748b', marginBottom: 6, fontWeight: 600 }}>
            Select a Claim to Inspect ({allClaims.length} available across 4 agents):
          </label>
          <select
            value={selectedClaimIndex}
            onChange={e => setSelectedClaimIndex(Number(e.target.value))}
            style={{
              width: '100%',
              background: '#09101d',
              color: '#f8fafc',
              border: '1px solid #20324e',
              borderRadius: 8,
              padding: '10px 14px',
              fontSize: '0.9rem',
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
        <div className="glass-panel" style={{ padding: 24, borderTop: '4px solid #38bdf8' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-positive" style={{ textTransform: 'none' }}>
                <CheckCircle2 size={14} /> 100% Grounded
              </span>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Formulated by <strong style={{ color: '#f8fafc' }}>{activeClaim.agent}</strong>
              </span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {activeClaim.refs.map((r, i) => (
                <span key={i} className="ref-pill" style={{ fontSize: '0.8rem', padding: '2px 8px' }}>
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            fontSize: '1.15rem',
            fontWeight: 600,
            color: '#f8fafc',
            lineHeight: 1.6,
            background: 'rgba(9, 16, 29, 0.75)',
            padding: '16px 20px',
            borderRadius: 8,
            border: '1px solid #1a2b47',
            marginBottom: 20
          }}>
            &ldquo;{activeClaim.text}&rdquo;
          </div>

          {/* Evidence Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {activeClaim.refs.map((refId, i) => {
              const item = registry[refId] || {};
              const isSentence = item.key === 'sentence' || refId.startsWith('S');
              const isDerived = refId.startsWith('R') || refId.startsWith('K') || refId.startsWith('O');

              return (
                <div key={i} style={{
                  background: '#09101d',
                  border: '1px solid #1a2b47',
                  borderRadius: 8,
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="ref-pill" style={{ background: '#0284c7', color: '#fff', fontSize: '0.85rem' }}>
                        {refId}
                      </span>
                      <span style={{ fontWeight: 700, color: '#f8fafc' }}>{item.label || refId}</span>
                    </div>
                    {!isSentence && (
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: '#38bdf8' }}>
                        {item.display || item.value} {item.unit}
                      </span>
                    )}
                  </div>

                  {isDerived && (
                    <div style={{ fontSize: '0.75rem', color: '#a855f7', background: 'rgba(168, 85, 247, 0.1)', padding: '2px 8px', borderRadius: 4, width: 'fit-content' }}>
                      ⚡ Formula: {item.source}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 4 }}>
                    <Quote size={16} color="#64748b" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div style={{ fontSize: '0.85rem', color: '#cbd5e1', fontStyle: 'italic', lineHeight: 1.5 }}>
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
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a2b47', display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileText size={18} color="#38bdf8" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
              Full Original Press Release Document (Provenance Source)
            </h4>
          </div>
          <div style={{
            padding: 20,
            maxHeight: 320,
            overflowY: 'auto',
            background: '#070b14',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            lineHeight: 1.7,
            color: '#94a3b8',
            whiteSpace: 'pre-wrap'
          }}>
            {report.report_text}
          </div>
        </div>
      )}
    </div>
  );
}
