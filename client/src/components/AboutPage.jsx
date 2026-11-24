import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Cpu, Database, Layers } from 'lucide-react';

export default function AboutPage({ onOpenDesk }) {
  return (
    <div style={{ maxWidth: 1160, margin: '0 auto', width: '100%', padding: '24px 20px 80px', display: 'flex', flexDirection: 'column', gap: 64 }}>
      {/* Header Section - Unboxed, Directly on Webpage */}
      <div>
        <div style={{
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#38bdf8',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 12
        }}>
          JH Analytics · Research Methodology
        </div>

        <h1 style={{
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: 20
        }}>
          Mathematical Provenance{' '}
          <span style={{ color: 'rgba(224, 242, 254, 0.55)', fontWeight: 400 }}>
            in Equity Research.
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(1.1rem, 1.8vw, 1.25rem)',
          color: '#cbd5e1',
          lineHeight: 1.75,
          maxWidth: 820
        }}>
          JH Analytics was engineered on a single foundational mandate: in equity research, credit analysis,
          and investment decisions, generative hallucination is fundamentally intolerable.
          Every metric, variance, and analytical inference must be strictly verifiable against primary regulatory disclosures.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(56, 189, 248, 0.15)' }} />

      {/* Core Comparison: The Industry Problem vs. JH Analytics Architecture - Unboxed */}
      <div>
        <div style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#fbbf24',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 10
        }}>
          The Structural Contrast
        </div>

        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.025em',
          marginBottom: 36
        }}>
          Why Probabilistic LLMs Fail in Finance
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 48
        }}>
          {/* Column 1: The Problem */}
          <div style={{ borderLeft: '3px solid #f43f5e', paddingLeft: 24 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              Generic Language Models
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 12 }}>
              Probabilistic Hallucinations
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: 16 }}>
              Standard LLMs optimize for next-token probability rather than factual truth.
              When summarizing complex 10-Q releases, they frequently invent non-existent sequential growth rates,
              conflate gross profit with operating income, and cite forward guidance ranges without mathematical anchors.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.65 }}>
              In professional asset allocation, trusting probabilistic guesses introduces severe fiduciary and operational risk.
            </p>
          </div>

          {/* Column 2: The Solution */}
          <div style={{ borderLeft: '3px solid #10b981', paddingLeft: 24 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              JH Analytics Architecture
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: 12 }}>
              Deterministic Grounding Gate
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: 16 }}>
              We decouple financial data extraction from narrative synthesis. Specialist agents compute over an
              immutable registry of parsed figures (<code style={{ color: '#38bdf8' }}>F1..Fn</code>) and verified sentence anchors.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
              The Editor enforces a zero-tolerance Grounding Gate: any statement or claim that cannot cite a primary
              evidence token in the registry is automatically purged before the research note is published.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(56, 189, 248, 0.15)' }} />

      {/* 3-Stage Pipeline Breakdown - Unboxed */}
      <div>
        <div style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#38bdf8',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 10
        }}>
          System Execution
        </div>

        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.025em',
          marginBottom: 36
        }}>
          The 3-Stage Verification Pipeline
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 40
        }}>
          {/* Stage 0 */}
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#38bdf8',
              letterSpacing: '-0.04em',
              marginBottom: 8
            }}>
              01
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: 10 }}>
              Primary Data Ingestion
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.7 }}>
              Extracts revenue, margin rates, net income, EPS, cash reserves, total debt, and forward guidance intervals directly
              from SEC press releases. Every single figure receives an immutable identifier linked to the verbatim source sentence.
            </p>
          </div>

          {/* Stage 1 */}
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#60a5fa',
              letterSpacing: '-0.04em',
              marginBottom: 8
            }}>
              02
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: 10 }}>
              Specialist Agent Concurrency
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.7 }}>
              Four specialist agents analyze disclosures simultaneously: Revenue Analyst evaluates top-line momentum, Risk Analyst scans 40+ risk clauses,
              Outlook Forecaster evaluates forward ranges, and the QoQ Comparison Engine computes sequential deltas.
            </p>
          </div>

          {/* Stage 2 */}
          <div>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#10b981',
              letterSpacing: '-0.04em',
              marginBottom: 8
            }}>
              03
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: 10 }}>
              Editor Grounding Gate
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.7 }}>
              The Editor synthesizes agent findings into an executive note. It enforces the Grounding Gate,
              drops ungrounded statements, resolves stance conflicts between agents, and compiles the final note.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(56, 189, 248, 0.15)' }} />

      {/* Technical Infrastructure - Unboxed */}
      <div>
        <div style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#fbbf24',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 10
        }}>
          Technology Stack
        </div>

        <h2 style={{
          fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.025em',
          marginBottom: 28
        }}>
          Built for Speed, Auditability & Scale
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 32
        }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>
              Node.js & Express API
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
              High-throughput backend handling multi-part report parsing, streaming responses, and scenario execution.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>
              React 18 & Vite Frontend
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Hardware-accelerated rendering with real-time parameter sensitivity recalculation in milliseconds.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>
              Embedded SQLite Database
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Persistent storage of reports, agent deliberation traces, what-if scenarios, and Q&A audits.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>
              Dual Orchestration Engine
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Zero-latency serverless JS engine paired with Python LangGraph multi-agent graph executor.
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => onOpenDesk && onOpenDesk()}
          className="btn btn-primary"
          style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: 8 }}
        >
          <span>Launch Analysis Desk</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
