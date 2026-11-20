import React from 'react';
import { ShieldCheck, BarChart3, Database, Globe } from 'lucide-react';

export default function Footer({ onNavigate, currentPage }) {
  return (
    <footer className="no-print" style={{
      marginTop: 'auto',
      background: 'rgba(8, 14, 28, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(56, 189, 248, 0.15)',
      padding: '40px 24px 28px',
      color: '#94a3b8'
    }}>
      <div style={{
        maxWidth: 1600,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 32
      }}>
        {/* Main Footer Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 32
        }}>
          {/* Brand & Mission */}
          <div style={{ maxWidth: 440 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18
              }}>
                📊
              </div>
              <div>
                <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
                  Earnings Desk
                </span>
                <span style={{ marginLeft: 8, fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  JH Analytics
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Precision institutional financial analysis desk by JH Analytics.
              Every claim formulated across specialist agents strictly traces to extracted figures with 100% provenance verification.
            </p>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                Navigation
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: currentPage === 'home' ? '#38bdf8' : '#94a3b8',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: currentPage === 'home' ? 600 : 400
                    }}
                  >
                    Home Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate('desk')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: currentPage === 'desk' ? '#38bdf8' : '#94a3b8',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: currentPage === 'desk' ? 600 : 400
                    }}
                  >
                    Analysis Desk
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate('about')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: currentPage === 'about' ? '#38bdf8' : '#94a3b8',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: currentPage === 'about' ? 600 : 400
                    }}
                  >
                    About JH Analytics
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                Core Capabilities
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem', color: '#94a3b8' }}>
                <li>Zero-Hallucination Gate (100% Provenance)</li>
                <li>Fan-Out / Fan-In Multi-Agent Architecture</li>
                <li>What-If Sensitivity Stress Testing</li>
                <li>Grounded Natural-Language Q&A</li>
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                Deployment Status
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                  <span>Vercel Serverless Ready</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#38bdf8' }}>
                  <Database size={14} />
                  <span>SQLite Embedded Database</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255, 255, 255, 0.08)' }} />

        {/* Bottom Copyright & Disclaimer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: '0.8rem'
        }}>
          <div style={{ color: '#cbd5e1' }}>
            © {new Date().getFullYear()} <strong>JH Analytics</strong>. All rights reserved.
          </div>
          <div style={{ color: '#64748b' }}>
            Confidential institutional financial intelligence. All claims mathematically validated against primary report filings.
          </div>
        </div>
      </div>
    </footer>
  );
}
