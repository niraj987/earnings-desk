import React, { useState, useEffect } from 'react';
import { Sliders, RotateCcw, Play, Check, Zap, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export default function WhatIfTab({ report, onRunWhatIf, onResetFigures, loading }) {
  if (!report) return null;

  const [figures, setFigures] = useState(
    (report.figures || []).map(f => ({ ...f }))
  );
  const [scenarioName, setScenarioName] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setFigures((report.figures || []).map(f => ({ ...f })));
  }, [report.figures]);

  const handleValueChange = (id, newVal) => {
    setFigures(prev =>
      prev.map(f => (f.id === id ? { ...f, value: Number(newVal) } : f))
    );
  };

  const applyPreset = (presetType) => {
    if (presetType === 'stress') {
      // Stress test: decrease revenue guidance, double debt
      setFigures(prev => prev.map(f => {
        if (f.key === 'guidance_rev_low') return { ...f, value: Math.round(f.value * 0.9) };
        if (f.key === 'guidance_rev_high') return { ...f, value: Math.round(f.value * 0.9) };
        if (f.key === 'debt') return { ...f, value: Math.round(f.value * 1.6) };
        if (f.key === 'operating_margin') return { ...f, value: Math.max(1, Number((f.value - 3).toFixed(1))) };
        return f;
      }));
      setScenarioName('Bear Case: Reduced Guidance & Elevated Debt');
    } else if (presetType === 'bull') {
      // Bull case: boost guidance, increase cash
      setFigures(prev => prev.map(f => {
        if (f.key === 'guidance_rev_low') return { ...f, value: Math.round(f.value * 1.1) };
        if (f.key === 'guidance_rev_high') return { ...f, value: Math.round(f.value * 1.12) };
        if (f.key === 'cash') return { ...f, value: Math.round(f.value * 1.3) };
        if (f.key === 'operating_margin') return { ...f, value: Number((f.value + 2.5).toFixed(1)) };
        return f;
      }));
      setScenarioName('Bull Case: Accelerated Expansion & Margin Lift');
    }
  };

  const handleRunSimulation = () => {
    onRunWhatIf(figures, scenarioName);
    if (scenarioName.trim()) {
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setScenarioName('');
      }, 2500);
    }
  };

  const scenarios = report.scenarios || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Intro Box */}
      <div className="glass-panel" style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Sliders size={22} color="#38bdf8" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              Interactive What-If Sensitivity Simulator
            </h3>
          </div>

          {/* Quick preset stress testing buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => applyPreset('stress')}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: '#f43f5e', color: '#fb7185' }}
            >
              <TrendingDown size={14} />
              Stress Test (Bear Case)
            </button>
            <button
              onClick={() => applyPreset('bull')}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: '#10b981', color: '#34d399' }}
            >
              <TrendingUp size={14} />
              Expansion (Bull Case)
            </button>
          </div>
        </div>

        <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6 }}>
          Modify extracted inputs below to observe how the multi-agent system responds in real time.
          All 4 analyst agents will re-evaluate their mathematical formulas, re-rate their stances, and generate a new synthesized note.
        </p>

        {/* Action bar */}
        <div style={{
          marginTop: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Scenario name (e.g. 'Guidance Cut 10%')"
              value={scenarioName}
              onChange={e => setScenarioName(e.target.value)}
              style={{
                background: '#09101d',
                color: '#f8fafc',
                border: '1px solid #20324e',
                borderRadius: 6,
                padding: '8px 14px',
                fontSize: '0.85rem',
                minWidth: 260,
                outline: 'none'
              }}
            />
            <button
              onClick={handleRunSimulation}
              disabled={loading}
              className="btn btn-primary btn-sm"
            >
              <Play size={14} />
              {loading ? 'Recalculating...' : 'Re-run Analysts with Edited Figures'}
            </button>
            {saveSuccess && (
              <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Check size={14} /> Scenario saved to SQLite!
              </span>
            )}
          </div>

          <button
            onClick={onResetFigures}
            className="btn btn-secondary btn-sm"
          >
            <RotateCcw size={14} />
            Reset to Original Facts
          </button>
        </div>
      </div>

      {/* Editable Figures Grid Table */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a2b47' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
            Extracted Figure Inputs (Live Editable)
          </h4>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="desk-table">
            <thead>
              <tr>
                <th style={{ width: 80 }}>ID</th>
                <th style={{ width: 220 }}>Metric</th>
                <th style={{ width: 190 }}>Value (Edit Live)</th>
                <th style={{ width: 100 }}>Unit</th>
                <th>Source Sentence from Press Release</th>
              </tr>
            </thead>
            <tbody>
              {figures.map(f => (
                <tr key={f.id}>
                  <td>
                    <span className="ref-pill">{f.id}</span>
                  </td>
                  <td style={{ fontWeight: 600, color: '#f8fafc' }}>{f.label}</td>
                  <td>
                    <input
                      type="number"
                      step="any"
                      value={f.value}
                      onChange={e => handleValueChange(f.id, e.target.value)}
                      style={{
                        background: '#080d1a',
                        color: '#38bdf8',
                        fontWeight: 700,
                        border: '1px solid #20324e',
                        borderRadius: 6,
                        padding: '6px 10px',
                        width: '100%',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                  </td>
                  <td style={{ color: '#94a3b8' }}>{f.unit}</td>
                  <td style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                    {f.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Saved Scenarios in SQLite */}
      {scenarios.length > 0 && (
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1a2b47' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>
              Scenario History in SQLite ({scenarios.length})
            </h4>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="desk-table">
              <thead>
                <tr>
                  <th>Scenario Name</th>
                  <th>Verdict</th>
                  <th>Coverage</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 600, color: '#f8fafc' }}>{s.name}</td>
                    <td>
                      <span className={`badge ${s.verdict?.toLowerCase().includes('positive') ? 'badge-positive' : s.verdict?.toLowerCase().includes('negative') ? 'badge-negative' : 'badge-mixed'}`}>
                        {s.verdict}
                      </span>
                    </td>
                    <td style={{ color: '#10b981', fontWeight: 700 }}>{s.coverage}%</td>
                    <td style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      {new Date(s.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
