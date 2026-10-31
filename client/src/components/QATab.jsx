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
      <div className="glass-panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <MessageSquare size={22} color="#38bdf8" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f8fafc' }}>
            Grounded Q&A Assistant (&ldquo;Ask the Desk&rdquo;)
          </h3>
        </div>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
          Ask natural-language questions about this earnings release. Answers are retrieved via token-overlap matching strictly over verified figures and agent claims.
          Zero hallucinations — every response comes with the exact source sentence and evidence ID, and conversations are logged to the SQLite database.
        </p>

        {/* Quick query chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
            Try asking:
          </span>
          {sampleQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleQuickAsk(q)}
              disabled={loading}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.75rem', padding: '3px 10px' }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Query Input Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <input
            type="text"
            placeholder="Type your question about the report..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
            disabled={loading}
            style={{
              flex: 1,
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid #334155',
              borderRadius: 8,
              padding: '12px 16px',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="btn btn-primary"
            style={{ minWidth: 100 }}
          >
            {loading ? <span className="animate-spin">⏳</span> : <Send size={16} />}
            Ask
          </button>
        </form>
      </div>

      {/* Q&A Responses Stream (Stored in SQLite) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={18} color="#38bdf8" />
          Recent Queries & Verified Responses ({qaHistory.length})
        </h4>

        {qaHistory.length === 0 ? (
          <div className="glass-panel" style={{ padding: 32, textAlign: 'center', color: '#64748b' }}>
            <HelpCircle size={36} color="#334155" style={{ margin: '0 auto 10px' }} />
            <div>No questions asked yet for this report.</div>
            <div style={{ fontSize: '0.8rem', marginTop: 4 }}>Select a suggestion above or enter your question.</div>
          </div>
        ) : (
          qaHistory.map((qa, i) => (
            <div key={qa.id || i} className="glass-panel" style={{ padding: 20, borderLeft: '4px solid #38bdf8' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#f8fafc' }}>
                  Q: &ldquo;{qa.question}&rdquo;
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  {qa.created_at ? new Date(qa.created_at).toLocaleTimeString() : 'Just now'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(qa.answers || []).map((ans, ansIdx) => (
                  <div
                    key={ansIdx}
                    style={{
                      background: '#0f172a',
                      padding: '12px 16px',
                      borderRadius: 6,
                      border: '1px solid #1e293b',
                      fontSize: '0.875rem',
                      color: '#e2e8f0',
                      lineHeight: 1.6
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

