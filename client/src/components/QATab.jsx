import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, HelpCircle, CheckCircle } from 'lucide-react';

export default function QATab({ report, onAskQuestion, loading }) {
  if (!report) return null;

  const [question, setQuestion] = useState('');
  const qaHistory = report.qa_history || [];

  const sampleQuestions = [
    'What was free cash flow?',
    'What are the debt and cash levels?',
    'What is the customer concentration risk?',
    'What is the forward guidance for Q4?',
    'Are there any litigation or supply chain issues?',
    'How did operating margin change QoQ?'
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!question.trim() || loading) return;
    onAskQuestion(question.trim());
    setQuestion('');
  };

  const handleQuickAsk = (q) => {
    setQuestion(q);
    onAskQuestion(q);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Intro Box */}
      <div className="glass-panel tile-interactive tile-purple" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <MessageSquare size={24} color="#c084fc" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
            Grounded Q&A Assistant (&ldquo;Ask the Desk&rdquo;)
          </h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.65 }}>
          Ask natural-language questions about this earnings release. Answers are retrieved via token-overlap matching strictly over verified figures and agent claims.
          Zero hallucinations — every response comes with the exact source sentence and evidence ID, and conversations are logged to the SQLite database.
        </p>

        {/* Quick query chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
          <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            ★ Try asking:
          </span>
          {sampleQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleQuickAsk(q)}
              disabled={loading}
              className="btn btn-silver btn-sm"
              style={{ fontSize: '0.75rem', padding: '4px 12px' }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Query Input Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, marginTop: 18 }}>
          <input
            type="text"
            placeholder="Type your question about the report..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
            disabled={loading}
            style={{
              flex: 1,
              background: 'rgba(9, 13, 28, 0.9)',
              color: '#ffffff',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              borderRadius: 8,
              padding: '12px 18px',
              fontSize: '0.92rem',
              outline: 'none',
              boxShadow: '0 0 14px rgba(168, 85, 247, 0.15)'
            }}
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="btn btn-gold"
            style={{ minWidth: 110, padding: '12px 20px' }}
          >
            {loading ? <span>⏳</span> : <Send size={16} />}
            <span>Ask</span>
          </button>
        </form>
      </div>

      {/* Q&A Responses Stream (Stored in SQLite) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={18} color="#fbbf24" />
          Recent Queries & Verified Responses ({qaHistory.length})
        </h4>

        {qaHistory.length === 0 ? (
          <div className="glass-panel" style={{ padding: 36, textAlign: 'center', color: '#94a3b8' }}>
            <HelpCircle size={40} color="#a855f7" style={{ margin: '0 auto 12px', opacity: 0.6 }} />
            <div style={{ color: '#ffffff', fontWeight: 600 }}>No questions asked yet for this report.</div>
            <div style={{ fontSize: '0.85rem', marginTop: 4, color: '#cbd5e1' }}>Select a suggestion above or enter your question.</div>
          </div>
        ) : (
          qaHistory.map((qa, i) => (
            <div key={qa.id || i} className="glass-panel tile-interactive tile-gold" style={{ padding: 22, borderLeft: '5px solid #fbbf24' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff' }}>
                  Q: &ldquo;{qa.question}&rdquo;
                </div>
                <span style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                  {qa.created_at ? new Date(qa.created_at).toLocaleTimeString() : 'Just now'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(qa.answers || []).map((ans, ansIdx) => (
                  <div
                    key={ansIdx}
                    style={{
                      background: 'rgba(9, 13, 28, 0.85)',
                      padding: '14px 18px',
                      borderRadius: 8,
                      border: '1px solid rgba(251, 191, 36, 0.25)',
                      fontSize: '0.9rem',
                      color: '#ffffff',
                      lineHeight: 1.65
                    }}
                    dangerouslySetInnerHTML={{ __html: ans }}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

