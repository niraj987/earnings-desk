import React from 'react';
import { ShieldCheck, ArrowRight, Layers, Cpu, Database, CheckCircle2, Lock } from 'lucide-react';

export default function AboutPage({ onOpenDesk }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, padding: '16px 0 48px', maxWidth: 1040, margin: '0 auto' }}>
      {/* Header Banner */}
      <section className="glass-panel" style={{
        padding: '48px 36px',
        textAlign: 'center',
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '5px 14px',
          borderRadius: 9999,
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#c7d2fe',
          marginBottom: 16
        }}>
          <span style={{ color: '#fbbf24', fontWeight: 700 }}>JH Analytics</span>
          <span style={{ color: '#64748b' }}>·</span>
          <span>Methodology & Architecture</span>
        </div>

        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 800,
          color: '#f8fafc',
          letterSpacing: '-0.025em',
          marginBottom: 14,
          lineHeight: 1.25
        }}>
          Mathematical Provenance in Financial Research
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: '#94a3b8',
          lineHeight: 1.65,
          maxWidth: 720,
          margin: '0 auto'
        }}>
          JH Analytics was built on a foundational principle: in financial analysis and investment decisions,
          generative hallucination cannot be tolerated. Every statement must be anchored to verifiable filings.
        </p>
      </section>

      {/* Comparison: Standard LLMs vs. JH Analytics Architecture */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {/* The Problem with Generic AI */}
        <div className="glass-panel" style={{
          padding: '28px',
          borderLeft: '4px solid #f43f5e'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            The Industry Problem
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginBottom: 12 }}>
            Unreliable LLM Hallucinations
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: 12 }}>
            Standard Large Language Models generate plausible-sounding text, but frequently invent growth rates,
            confuse gross margins with operating margins, and misattribute sequential changes without source evidence.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
            Probabilistic guesses cannot be relied upon when precision is critical to risk management.
          </p>
        </div>

        {/* The JH Analytics Solution */}
        <div className="glass-panel" style={{
          padding: '28px',
          borderLeft: '4px solid #10b981'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            The JH Analytics Architecture
          </div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginBottom: 12 }}>
            Deterministic Grounding Gate
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.65, marginBottom: 12 }}>
            We decouple financial extraction from narrative generation. Specialist agents reason exclusively over
            a structured registry of verified figures, formulas, and verbatim excerpts.
          </p>
          <p style={{ fontSize: '0.875rem', color: '#e2e8f0', lineHeight: 1.6 }}>
            The Grounding Gate automatically rejects any sentence or claim that does not trace directly to an
            extracted evidence ID in the primary SEC disclosure.
          </p>
        </div>
      </div>

      {/* 3-Stage Pipeline Breakdown */}
      <section className="glass-panel" style={{ padding: '36px 30px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc' }}>
            The 3-Stage Verification Pipeline
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: 4 }}>
            How raw filings are processed, analyzed by specialist agents, and validated into research notes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
          {/* Stage 0 */}
          <div className="glass-panel-subtle" style={{ padding: '20px', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Stage 0: Extraction
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
              Structured Data Extraction
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Extracts core metrics (revenue, margins, net income, EPS, cash, debt, guidance).
              Each figure receives an immutable ID (<code>F1..Fn</code>) linked to its exact source sentence.
            </p>
          </div>

          {/* Stage 1 */}
          <div className="glass-panel-subtle" style={{ padding: '20px', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Stage 1: Parallel Reasoning
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
              Specialist Agent Evaluation
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Four specialist agents execute in parallel: Revenue, Risk, Outlook, and QoQ Comparison.
              Each computes analytical scores, flags discrepancies, and derives calculated ratios.
            </p>
          </div>

          {/* Stage 2 */}
          <div className="glass-panel-subtle" style={{ padding: '20px', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Stage 2: Synthesis & Gate
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
              Editor Grounding Gate
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              The Editor synthesizes agent findings into an executive note. It enforces the Grounding Gate,
              drops ungrounded statements, resolves stance conflicts, and compiles the final note.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="glass-panel" style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
          Technical Stack & Architecture
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16
        }}>
          <div className="glass-panel-subtle" style={{ padding: '16px', borderRadius: 8 }}>
            <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: 4, fontSize: '0.9rem' }}>
              Backend API
            </div>
            <div style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.55 }}>
              Node.js and Express REST architecture with streaming JSON endpoints.
            </div>
          </div>

          <div className="glass-panel-subtle" style={{ padding: '16px', borderRadius: 8 }}>
            <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: 4, fontSize: '0.9rem' }}>
              Frontend UI
            </div>
            <div style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.55 }}>
              React 18 with Vite, clean dark theme, and responsive layouts.
            </div>
          </div>

          <div className="glass-panel-subtle" style={{ padding: '16px', borderRadius: 8 }}>
            <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: 4, fontSize: '0.9rem' }}>
              Persistent Storage
            </div>
            <div style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.55 }}>
              SQLite embedded database for report histories, scenarios, and Q&A audits.
            </div>
          </div>

          <div className="glass-panel-subtle" style={{ padding: '16px', borderRadius: 8 }}>
            <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: 4, fontSize: '0.9rem' }}>
              Multi-Agent Engine
            </div>
            <div style={{ fontSize: '0.825rem', color: '#94a3b8', lineHeight: 1.55 }}>
              Dual execution mode: serverless JavaScript engine + Python LangGraph graph.
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <button
          onClick={() => onOpenDesk && onOpenDesk()}
          className="btn btn-primary"
          style={{ padding: '12px 28px', fontSize: '0.95rem' }}
        >
          <span>Launch Analysis Desk</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
