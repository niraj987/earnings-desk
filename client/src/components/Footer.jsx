import React from 'react';
import { Database, TrendingUp } from 'lucide-react';

export default function Footer({ onNavigate, currentPage }) {
  return (
    <footer className="no-print" style={{
      marginTop: 'auto',
      background: '#f1f5f9',
      borderTop: '1px solid #e2e8f0',
      padding: '40px 24px 28px',
      color: '#64748b'
    }}>
      <div style={{
        maxWidth: 1280,
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
          <div style={{ maxWidth: 420 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                background: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)'
              }}>
                <TrendingUp size={16} color="#ffffff" />
              </div>
              <div>
                <span className="font-grelify" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
                  Earnings Desk
                </span>
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#d97706',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  JH Analytics
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>
              Autonomous financial intelligence platform. Every claim formulated across specialist agents
              strictly traces to primary figures with deterministic provenance.
            </p>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
                Navigation
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
                <li>
                  <button
                    onClick={() => onNavigate && onNavigate('home')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: currentPage === 'home' ? '#0284c7' : '#64748b',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: currentPage === 'home' ? 700 : 400
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
                      color: currentPage === 'desk' ? '#0284c7' : '#64748b',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: currentPage === 'desk' ? 700 : 400
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
                      color: currentPage === 'about' ? '#0284c7' : '#64748b',
                      cursor: 'pointer',
                      padding: 0,
                      fontWeight: currentPage === 'about' ? 700 : 400
                    }}
                  >
                    About Methodology
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
                System Architecture
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem', color: '#64748b' }}>
                <li>Deterministic Grounding Gate (100% Provenance)</li>
                <li>Multi-Agent Concurrency (Revenue, Risk, Outlook)</li>
                <li>What-If Parameter Stress Testing</li>
                <li>Natural-Language Grounded Inquiry</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: '#e2e8f0'
        }} />

        {/* Bottom Copyright & Disclaimer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          fontSize: '0.8rem'
        }}>
          <div style={{ color: '#64748b' }}>
            © {new Date().getFullYear()} <strong style={{ color: '#0f172a' }}>JH Analytics</strong>. All rights reserved.
          </div>
          <div style={{ color: '#94a3b8' }}>
            All claims mathematically validated against primary disclosures.
          </div>
        </div>
      </div>
    </footer>
  );
}
