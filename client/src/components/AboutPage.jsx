import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Cpu, Database, Layers } from 'lucide-react';

export default function AboutPage({ onOpenDesk }) {
  return (
    <div style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '36px 20px 100px', display: 'flex', flexDirection: 'column', gap: 92 }}>
      {/* Header Section - Unboxed, Directly on Webpage */}
      <div className="section-transition animate-fade-in-up">
        <div style={{
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#0284c7',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 12
        }}>
          JH Analytics · Research Methodology
        </div>

        <h1 style={{
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: 20
        }}>
          Mathematical Provenance{' '}
          <span style={{ color: '#64748b', fontWeight: 400 }}>
            in Equity Research.
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(1.1rem, 1.8vw, 1.25rem)',
          color: '#475569',
          lineHeight: 1.75,
          maxWidth: 820
        }}>
          JH Analytics was engineered on a single foundational mandate: in equity research, credit analysis,
          and investment decisions, generative hallucination is fundamentally intolerable.
          Every metric, variance, and analytical inference must be strictly verifiable against primary regulatory disclosures.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#e2e8f0' }} />

      {/* Core Comparison: The Industry Problem vs. JH Analytics Architecture - Unboxed */}
      <div className="section-transition animate-fade-in-up animate-delay-1">
        <div style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#d97706',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 10
        }}>
          The Structural Contrast
        </div>

        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.025em',
          marginBottom: 36
        }}>
          Why Probabilistic LLMs Fail in Finance
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 52
        }}>
          {/* Column 1: The Problem */}
          <div style={{ borderLeft: '3px solid #e11d48', paddingLeft: 26 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Generic Language Models
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
              Probabilistic Hallucinations
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              Standard LLMs optimize for next-token probability rather than factual truth.
              When summarizing complex 10-Q releases, they frequently invent non-existent sequential growth rates,
              conflate gross profit with operating income, and cite forward guidance ranges without mathematical anchors.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.65 }}>
              In professional asset allocation, trusting probabilistic guesses introduces severe fiduciary and operational risk.
            </p>
          </div>

          {/* Column 2: The Solution */}
          <div style={{ borderLeft: '3px solid #059669', paddingLeft: 26 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              JH Analytics Architecture
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>
              Deterministic Grounding Gate
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
              We decouple financial data extraction from narrative synthesis. Specialist agents compute over an
              immutable registry of parsed figures (<code style={{ color: '#0284c7' }}>F1..Fn</code>) and verified sentence anchors.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.65 }}>
              The Editor enforces a zero-tolerance Grounding Gate: any statement or claim that cannot cite a primary
              evidence token in the registry is automatically purged before the research note is published.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#e2e8f0' }} />

      {/* 3-Stage Pipeline Breakdown - Unboxed */}
      <div className="section-transition animate-fade-in-up animate-delay-2">
        <div style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#0284c7',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 10
        }}>
          System Execution
        </div>

        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.025em',
          marginBottom: 36
        }}>
          The 3-Stage Verification Pipeline
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 48
        }}>
          {/* Stage 0 */}
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#0284c7',
              letterSpacing: '-0.04em',
              marginBottom: 8
            }}>
              01
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
              Primary Data Ingestion
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.7 }}>
              Extracts revenue, margin rates, net income, EPS, cash reserves, total debt, and forward guidance intervals directly
              from SEC press releases. Every single figure receives an immutable identifier linked to the verbatim source sentence.
            </p>
          </div>

          {/* Stage 1 */}
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#2563eb',
              letterSpacing: '-0.04em',
              marginBottom: 8
            }}>
              02
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
              Specialist Agent Concurrency
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.7 }}>
              Four specialist agents analyze disclosures simultaneously: Revenue Analyst evaluates top-line momentum, Risk Analyst scans 40+ risk clauses,
              Outlook Forecaster evaluates forward ranges, and the QoQ Comparison Engine computes sequential deltas.
            </p>
          </div>

          {/* Stage 2 */}
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#059669',
              letterSpacing: '-0.04em',
              marginBottom: 8
            }}>
              03
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
              Editor Grounding Gate
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.7 }}>
              The Editor synthesizes agent findings into an executive note. It enforces the Grounding Gate,
              drops ungrounded statements, resolves stance conflicts between agents, and compiles the final note.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: '#e2e8f0' }} />

      {/* Technical Infrastructure - Unboxed */}
      <div className="section-transition animate-fade-in-up animate-delay-3">
        <div style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#d97706',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 10
        }}>
          Technology Stack
        </div>

        <h2 style={{
          fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.025em',
          marginBottom: 28
        }}>
          Built for Speed, Auditability & Scale
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 36
        }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
              Node.js & Express API
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
              High-throughput backend handling multi-part report parsing, streaming responses, and scenario execution.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
              React 18 & Vite Frontend
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
              Hardware-accelerated rendering with real-time parameter sensitivity recalculation in milliseconds.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
              Embedded SQLite Database
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
              Persistent storage of reports, agent deliberation traces, what-if scenarios, and Q&A audits.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
              Dual Orchestration Engine
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>
              Zero-latency serverless JS engine paired with Python LangGraph multi-agent graph executor.
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="section-transition animate-fade-in-up animate-delay-4" style={{ marginTop: 16 }}>
        <button
          onClick={() => onOpenDesk && onOpenDesk()}
          className="btn btn-primary"
          style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: 10, color: '#ffffff' }}
        >
          <span>Launch Analysis Desk</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
