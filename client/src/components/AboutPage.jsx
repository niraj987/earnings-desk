import React from 'react';
import { ShieldCheck, GitBranch, Database, FileText, CheckCircle2, Cpu, Lock, Award } from 'lucide-react';

export default function AboutPage({ onOpenDesk }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: '24px 0 60px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header Banner */}
      <section className="glass-panel" style={{
        padding: '56px 48px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(10, 16, 31, 0.9) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.25)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: 9999,
          background: 'rgba(56, 189, 248, 0.12)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          color: '#38bdf8',
          fontSize: '0.85rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 18
        }}>
          <Award size={16} />
          About JH Analytics
        </div>

        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Pioneering Mathematical Provenance in Financial AI
        </h2>

        <p style={{ fontSize: '1.1rem', color: '#94a3b8', lineHeight: 1.7, maxWidth: 840, margin: '0 auto' }}>
          JH Analytics was built on a single, uncompromising principle: in institutional equity research and financial decision-making, <strong style={{ color: '#f8fafc' }}>hallucination is intolerable</strong>.
        </p>
      </section>

      {/* The Core Challenge vs The JH Analytics Solution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
        <div className="glass-panel" style={{ padding: '36px 30px', borderLeft: '4px solid #f43f5e' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fb7185', marginBottom: 14 }}>
            The Industry Problem
          </h3>
          <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: 14 }}>
            Standard Large Language Models (LLMs) used in finance suffer from subtle, dangerous numerical hallucinations.
            They confuse gross margins with operating margins, invent non-existent sequential growth rates, and summarize forward guidance without reference to actual quantitative disclosures.
          </p>
          <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.7 }}>
            When multi-billion-dollar allocation decisions depend on precision, probabilistic guessing cannot be relied upon.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '36px 30px', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399', marginBottom: 14 }}>
            The JH Analytics Solution
          </h3>
          <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: 14 }}>
            JH Analytics decouples financial extraction from narrative generation through a multi-agent orchestration architecture.
            Analyst agents reason exclusively over structured figures, formulas, and verified sentence references.
          </p>
          <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.7 }}>
            The Editor Manager enforces a strict Grounding Gate: any formulated claim that cannot point to a verifiable evidence ID in the registry is immediately dropped.
          </p>
        </div>
      </div>

      {/* 3-Stage Pipeline Breakdown */}
      <section className="glass-panel" style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc' }}>
            The 3-Stage Verification Pipeline
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: 4 }}>
            How reports are processed, decomposed, verified, and synthesized.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {/* Stage 1 */}
          <div style={{
            background: 'rgba(10, 16, 31, 0.7)',
            padding: 24,
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 6 }}>
              Stage 0: Extraction
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: 10 }}>
              Structured Data Extraction
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Extracts revenue, growth %, gross/operating margins, net income, EPS, cash, debt, and guidance ranges.
              Each figure receives an immutable ID (<code>F1..Fn</code>) and retains the exact sentence it originated from.
            </p>
          </div>

          {/* Stage 2 */}
          <div style={{
            background: 'rgba(10, 16, 31, 0.7)',
            padding: 24,
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginBottom: 6 }}>
              Stage 1: Fan-Out Reasoning
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: 10 }}>
              Specialist Parallel Agents
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              4 specialist agents execute concurrently: Revenue Analyst, Risk Analyst (lexicon red flags + leverage triggers), Outlook Analyst, and Comparison Agent (QoQ deltas).
              Each agent derives new formulas and assigns scores.
            </p>
          </div>

          {/* Stage 3 */}
          <div style={{
            background: 'rgba(10, 16, 31, 0.7)',
            padding: 24,
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', marginBottom: 6 }}>
              Stage 2: Fan-In Synthesis
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: 10 }}>
              Editor Manager Gatekeeper
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Enforces the Grounding Gate, computes overall stance (Positive, Balanced, High Risk), cross-examines stances to flag disagreements (e.g. bullish revenue vs high risk), and builds the one-page note.
            </p>
          </div>
        </div>
      </section>

      {/* Technology & Compliance Card */}
      <section className="glass-panel" style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc' }}>
          Technical Architecture & Infrastructure
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16
        }}>
          <div style={{ padding: 18, background: 'rgba(10, 16, 31, 0.6)', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: 4 }}>Backend API</div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Node.js & Express REST architecture with streaming JSON endpoints.</div>
          </div>

          <div style={{ padding: 18, background: 'rgba(10, 16, 31, 0.6)', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontWeight: 700, color: '#10b981', marginBottom: 4 }}>Frontend UI</div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>React (Vite) institutional terminal with frosted glassmorphism and Lucide icons.</div>
          </div>

          <div style={{ padding: 18, background: 'rgba(10, 16, 31, 0.6)', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontWeight: 700, color: '#a855f7', marginBottom: 4 }}>Persistent Database</div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Embedded SQLite (<code>node:sqlite</code>) with full audit history and scenario storage.</div>
          </div>

          <div style={{ padding: 18, background: 'rgba(10, 16, 31, 0.6)', borderRadius: 10, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>Dual Engine</div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Serverless native JavaScript engine + Python LangGraph graph orchestration.</div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <button
          onClick={() => onOpenDesk && onOpenDesk()}
          className="btn btn-primary"
          style={{ padding: '14px 36px', fontSize: '1rem', borderRadius: 10 }}
        >
          <span>Open Live Analysis Desk</span>
        </button>
      </div>
    </div>
  );
}
