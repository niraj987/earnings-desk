import React from 'react';
import { ShieldCheck, GitBranch, Database, FileText, CheckCircle2, Cpu, Lock, Award, Sparkles, Layers, ArrowRight } from 'lucide-react';

export default function AboutPage({ onOpenDesk }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: '24px 0 60px', maxWidth: 1200, margin: '0 auto' }}>
      {/* Header Banner - Purple, Gold & Silver Aura */}
      <section className="glass-panel" style={{
        padding: '58px 48px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(22, 16, 48, 0.85) 0%, rgba(10, 14, 30, 0.95) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.35)',
        boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.65), 0 0 35px rgba(168, 85, 247, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow ambient background lights */}
        <div style={{
          position: 'absolute',
          top: '-30%',
          left: '25%',
          width: '50%',
          height: '160%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, rgba(245, 158, 11, 0.1) 50%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 18px',
            borderRadius: 9999,
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(245, 158, 11, 0.15) 100%)',
            border: '1px solid rgba(251, 191, 36, 0.45)',
            boxShadow: '0 0 16px rgba(245, 158, 11, 0.25)',
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 20
          }}>
            <Sparkles size={16} color="#fbbf24" />
            <span className="text-gold-gradient">JH Analytics Mission</span>
          </div>

          <h2 style={{
            fontSize: '2.6rem',
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: 18,
            lineHeight: 1.25
          }}>
            Pioneering <span className="text-gold-gradient">Mathematical Provenance</span> in Financial AI
          </h2>

          <p style={{
            fontSize: '1.15rem',
            color: '#e2e8f0',
            lineHeight: 1.75,
            maxWidth: 860,
            margin: '0 auto'
          }}>
            JH Analytics was built on a single, uncompromising principle: in equity research and financial decision-making, <strong style={{ color: '#ffffff', textShadow: '0 0 10px rgba(255,255,255,0.4)' }}>hallucination is intolerable</strong>.
          </p>
        </div>
      </section>

      {/* The Core Challenge vs The JH Analytics Solution (2 Interactive Tiles) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
        {/* Industry Problem Tile */}
        <div className="glass-panel tile-interactive tile-silver" style={{
          padding: '36px 32px',
          borderLeft: '5px solid #f43f5e'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fb7185', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
            The Industry Vulnerability
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: 14 }}>
            Unreliable LLM Guesswork
          </h3>
          <p style={{ fontSize: '0.94rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: 14 }}>
            Standard Large Language Models (LLMs) used in finance suffer from subtle, dangerous numerical hallucinations.
            They confuse gross margins with operating margins, invent non-existent sequential growth rates, and summarize forward guidance without reference to actual quantitative disclosures.
          </p>
          <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.7 }}>
            When multi-billion-dollar allocation decisions depend on precision, probabilistic guessing cannot be relied upon.
          </p>
        </div>

        {/* JH Analytics Solution Tile */}
        <div className="glass-panel tile-interactive tile-gold" style={{
          padding: '36px 32px',
          borderLeft: '5px solid #fbbf24'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
            The JH Analytics Architecture
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: 14 }}>
            Deterministic Grounding Gate
          </h3>
          <p style={{ fontSize: '0.94rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: 14 }}>
            JH Analytics decouples financial extraction from narrative generation through a multi-agent orchestration architecture.
            Analyst agents reason exclusively over structured figures, formulas, and verified sentence references.
          </p>
          <p style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.7 }}>
            The Editor Manager enforces a strict Grounding Gate: any formulated claim that cannot point to a verifiable evidence ID in the registry is immediately dropped.
          </p>
        </div>
      </div>

      {/* 3-Stage Pipeline Breakdown (3 Distinct Tiles: Silver, Purple, Gold) */}
      <section className="glass-panel" style={{ padding: '42px 36px', display: 'flex', flexDirection: 'column', gap: 30 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              ✦ Multi-Stage Execution
            </span>
          </div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
            The 3-Stage Verification Pipeline
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginTop: 4 }}>
            How raw earnings filings are decomposed, verified, and synthesized into executive notes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 22 }}>
          {/* Stage 0 - Silver Tile */}
          <div className="glass-panel tile-interactive tile-silver" style={{
            padding: 26,
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Stage 0: Extraction
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
              Structured Data Extraction
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.65 }}>
              Extracts revenue, growth %, gross/operating margins, net income, EPS, cash, debt, and guidance ranges.
              Each figure receives an immutable ID (<code>F1..Fn</code>) and retains the exact sentence it originated from.
            </p>
          </div>

          {/* Stage 1 - Purple Tile */}
          <div className="glass-panel tile-interactive tile-purple" style={{
            padding: 26,
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Stage 1: Fan-Out Reasoning
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
              Specialist Parallel Agents
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.65 }}>
              4 specialist agents execute concurrently: Revenue Analyst, Risk Analyst (lexicon red flags + leverage triggers), Outlook Analyst, and Comparison Agent (QoQ deltas).
              Each agent derives new formulas and assigns scores.
            </p>
          </div>

          {/* Stage 2 - Gold Tile */}
          <div className="glass-panel tile-interactive tile-gold" style={{
            padding: 26,
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Stage 2: Fan-In Synthesis
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
              Editor Manager Gatekeeper
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.65 }}>
              Enforces the Grounding Gate, computes overall stance (Positive, Balanced, High Risk), cross-examines stances to flag disagreements (e.g. bullish revenue vs high risk), and builds the one-page note.
            </p>
          </div>
        </div>
      </section>

      {/* Technology & Compliance Card (4 Micro-Tiles) */}
      <section className="glass-panel" style={{ padding: '38px 34px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
          Technical Architecture & Infrastructure
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: 18
        }}>
          {/* Tile 1: Backend */}
          <div className="tile-interactive tile-silver" style={{ padding: 20, borderRadius: 12 }}>
            <div style={{ fontWeight: 800, color: '#ffffff', marginBottom: 6, fontSize: '0.95rem' }}>
              Backend API
            </div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              Node.js & Express REST architecture with streaming JSON endpoints and health checks.
            </div>
          </div>

          {/* Tile 2: Frontend */}
          <div className="tile-interactive tile-purple" style={{ padding: 20, borderRadius: 12 }}>
            <div style={{ fontWeight: 800, color: '#c084fc', marginBottom: 6, fontSize: '0.95rem' }}>
              Frontend UI
            </div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              React (Vite) financial terminal with frosted glassmorphism, gold/purple tiles, and Lucide icons.
            </div>
          </div>

          {/* Tile 3: Persistent Database */}
          <div className="tile-interactive tile-gold" style={{ padding: 20, borderRadius: 12 }}>
            <div style={{ fontWeight: 800, color: '#fbbf24', marginBottom: 6, fontSize: '0.95rem' }}>
              Persistent Database
            </div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              Embedded SQLite (<code>node:sqlite</code>) with full audit history and scenario storage.
            </div>
          </div>

          {/* Tile 4: Dual Engine */}
          <div className="tile-interactive tile-purple" style={{ padding: 20, borderRadius: 12 }}>
            <div style={{ fontWeight: 800, color: '#ffffff', marginBottom: 6, fontSize: '0.95rem' }}>
              Dual Engine
            </div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              Serverless native JavaScript engine + Python LangGraph graph orchestration.
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <button
          onClick={() => onOpenDesk && onOpenDesk()}
          className="btn btn-gold"
          style={{ padding: '16px 42px', fontSize: '1.05rem', borderRadius: 12 }}
        >
          <span>Open Live Analysis Desk</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
