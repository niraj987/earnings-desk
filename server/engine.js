/**
 * Native JavaScript Multi-Agent Earnings Analysis Engine.
 * Provides 100% parity with Python agents for zero-dependency execution
 * on serverless platforms (Vercel, AWS Lambda, Cloudflare Workers, etc.).
 */

class Figure {
  constructor(id, key, label, value, unit, source = '', period = 'current') {
    this.id = id;
    this.key = key;
    this.label = label;
    this.value = Number(value);
    this.unit = unit;
    this.source = source;
    this.period = period;
  }

  get display() {
    if (this.key === 'sentence') return 'quote';
    if (this.unit === 'USD_M') {
      return Math.abs(this.value) >= 1000
        ? `$${(this.value / 1000).toFixed(2)}B`
        : `$${Math.round(this.value)}M`;
    }
    if (this.unit === '%') return `${this.value.toFixed(1)}%`;
    if (this.unit === 'pp') return `${this.value >= 0 ? '+' : ''}${this.value.toFixed(1)}pp`;
    if (this.unit === 'USD/sh') return `$${this.value.toFixed(2)}`;
    if (this.unit === 'x') return `${this.value.toFixed(2)}x`;
    return `${this.value}`;
  }

  toJSON() {
    return {
      id: this.id,
      key: this.key,
      label: this.label,
      value: this.value,
      unit: this.unit,
      display: this.display,
      source: this.source,
      period: this.period
    };
  }
}

class Claim {
  constructor(text, refs = []) {
    this.text = text;
    this.refs = refs;
  }

  render() {
    return this.refs.length ? `${this.text} [${this.refs.join(', ')}]` : this.text;
  }

  toJSON() {
    return {
      text: this.text,
      refs: this.refs,
      rendered: this.render()
    };
  }
}

class Deriver {
  constructor(prefix) {
    this.prefix = prefix;
    this.items = [];
  }

  add(key, label, value, unit, formula) {
    const f = new Figure(
      `${this.prefix}${this.items.length + 1}`,
      key,
      label,
      value,
      unit,
      `derived: ${formula}`
    );
    this.items.push(f);
    return f;
  }
}

function stanceFrom(score) {
  return score >= 1 ? 'positive' : score <= -0.5 ? 'negative' : 'neutral';
}

function byKey(figs) {
  const map = {};
  for (const f of figs) {
    map[f.key] = f;
  }
  return map;
}

function splitSentences(text) {
  const out = [];
  for (const line of (text || '').split('\n')) {
    const trimmed = line.trim().replace(/^[•\-\*]\s*/, '');
    if (trimmed) {
      // Split on sentence boundary
      const sents = trimmed.split(/(?<=[.!?])\s+(?=[A-Z"$])/);
      for (const s of sents) {
        if (s.trim()) out.push(s.trim());
      }
    }
  }
  return out;
}

function moneyToM(match) {
  const v = parseFloat(match[1].replace(/,/g, ''));
  const u = (match[2] || 'm').toLowerCase();
  return u.startsWith('b') ? v * 1000 : v;
}

// -----------------------------------------------------------------------------
// 1. EXTRACTION AGENT
// -----------------------------------------------------------------------------
function runExtraction(text, prefix = 'F') {
  const sentences = splitSentences(text);
  const figs = [];
  const found = new Set();

  function add(key, label, value, unit, src) {
    if (found.has(key)) return;
    found.add(key);
    figs.push(new Figure(`${prefix}${figs.length + 1}`, key, label, value, unit, src));
  }

  const head = sentences[0] || '';
  const periodMatch = head.match(/\bQ[1-4]\s*(?:FY)?\s*\d{4}/i);
  const company = (head.split(/\s+Q[1-4]\b/i)[0] || 'Company').trim();
  const period = periodMatch ? periodMatch[0].toUpperCase() : 'Unknown period';

  const MONEY_RE = /\$\s?([\d,]+(?:\.\d+)?)\s*(billion|million|bn|mn|b|m)?\b/gi;
  const PCT_RE = /(-?\d+(?:\.\d+)?)\s?%/;
  const GUID_RE = /\b(expects?|expected|guidance|outlook|forecast|projects?|anticipates?)\b/i;
  const NEG_RE = /down|declin|decreas|fell|lower|drop/i;

  const SPECS = [
    { key: 'revenue', label: 'Total revenue', kind: 'money', kw: /\b(?:total |net )?(?:revenues?|net sales)\b/i, excl: /accounted for|of (?:total |net )?revenue/i },
    { key: 'gross_margin', label: 'Gross margin', kind: 'pct', kw: /gross margin/i },
    { key: 'operating_margin', label: 'Operating margin', kind: 'pct', kw: /operating margin/i },
    { key: 'net_income', label: 'Net income', kind: 'money', kw: /net (?:income|profit|earnings)/i },
    { key: 'fcf', label: 'Free cash flow', kind: 'money', kw: /free cash flow/i },
    { key: 'cash', label: 'Cash & equivalents', kind: 'money', kw: /cash and cash equivalents/i },
    { key: 'debt', label: 'Total debt', kind: 'money', kw: /total debt|long-term debt/i }
  ];

  for (const s of sentences) {
    if (GUID_RE.test(s)) {
      if (/revenue|sales/i.test(s)) {
        const matches = [...s.matchAll(MONEY_RE)];
        if (matches.length) {
          const vals = matches.map(m => moneyToM(m));
          const lo = Math.min(vals[0], vals[1] != null ? vals[1] : vals[0]);
          const hi = Math.max(vals[0], vals[1] != null ? vals[1] : vals[0]);
          add('guidance_rev_low', 'Guidance revenue (low)', lo, 'USD_M', s);
          add('guidance_rev_high', 'Guidance revenue (high)', hi, 'USD_M', s);
        }
      }
      const gm = s.match(/margin[^%]*?(-?\d+(?:\.\d+)?)\s?%/i);
      if (gm) {
        add('guidance_margin', 'Guidance operating margin', parseFloat(gm[1]), '%', s);
      }
      continue;
    }

    const concMatch = s.match(/accounted for\s+(\d+(?:\.\d+)?)\s?%/i);
    if (concMatch) {
      add('customer_concentration', 'Top-customer concentration', parseFloat(concMatch[1]), '%', s);
    }

    for (const spec of SPECS) {
      if (found.has(spec.key) || (spec.excl && spec.excl.test(s))) continue;
      const m = s.match(spec.kw);
      if (!m) continue;
      const tail = s.substring(m.index + m[0].length);

      if (spec.kind === 'money') {
        const mm = [...tail.matchAll(MONEY_RE)];
        if (mm.length) {
          add(spec.key, spec.label, moneyToM(mm[0]), 'USD_M', s);
          if (spec.key === 'revenue') {
            const after = tail.substring(mm[0].index + mm[0][0].length);
            const pc = after.match(PCT_RE);
            if (pc) {
              let v = parseFloat(pc[1]);
              if (NEG_RE.test(after.substring(0, pc.index))) v = -Math.abs(v);
              add('revenue_growth', 'Revenue growth (YoY)', v, '%', s);
            }
          }
        }
      } else {
        const pc = tail.match(PCT_RE);
        if (pc) {
          add(spec.key, spec.label, parseFloat(pc[1]), '%', s);
        }
      }
    }

    // EPS check
    const epsMatch = s.match(/\$\s?(-?\d+(?:\.\d+)?)\s+per\s+(?:diluted\s+|basic\s+)?share/i);
    if (epsMatch && !found.has('eps')) {
      add('eps', 'Diluted EPS', parseFloat(epsMatch[1]), 'USD/sh', s);
    }
  }

  return { company, period, sentences, figures: figs };
}

// -----------------------------------------------------------------------------
// 2. REVENUE ANALYST
// -----------------------------------------------------------------------------
function runRevenueAnalyst(figures) {
  const f = byKey(figures);
  const d = new Deriver('R');
  const claims = [];
  let score = 0.0;

  const rev = f['revenue'];
  const g = f['revenue_growth'];

  if (!rev) {
    return {
      agent: 'Revenue Analyst',
      section: 'Revenue',
      stance: 'neutral',
      score: 0,
      headline: 'Revenue not found in report.',
      claims: [new Claim('Revenue could not be extracted from the report.', [])],
      derived: [],
      table: []
    };
  }

  if (g) {
    claims.push(new Claim(`Revenue of ${rev.display} grew ${g.value >= 0 ? '+' : ''}${g.value.toFixed(1)}% year over year.`, [rev.id, g.id]));
    score += g.value >= 8 ? 1 : g.value >= 3 ? 0.5 : g.value < 0 ? -1 : 0;
  } else {
    claims.push(new Claim(`Revenue was ${rev.display}; YoY growth not disclosed.`, [rev.id]));
  }

  const gm = f['gross_margin'];
  const om = f['operating_margin'];
  if (gm && om) {
    claims.push(new Claim(`Gross margin ${gm.display} and operating margin ${om.display}.`, [gm.id, om.id]));
  } else if (om) {
    claims.push(new Claim(`Operating margin was ${om.display}.`, [om.id]));
  }

  if (om) {
    score += om.value >= 15 ? 0.5 : om.value < 5 ? -0.5 : 0;
  }

  const ni = f['net_income'];
  if (ni) {
    const nm = d.add('net_margin', 'Net margin', (ni.value / rev.value) * 100, '%', `${ni.id} / ${rev.id}`);
    const eps = f['eps'];
    let t = `Net income of ${ni.display} implies a ${nm.display} net margin`;
    const refs = [ni.id, rev.id, nm.id];
    if (eps) {
      t += `, EPS ${eps.display}`;
      refs.push(eps.id);
    }
    claims.push(new Claim(`${t}.`, refs));
  }

  const fcf = f['fcf'];
  if (fcf) {
    const refs = [fcf.id];
    let t = `Free cash flow was ${fcf.display}`;
    if (ni && ni.value > 0) {
      const cv = d.add('fcf_conversion', 'FCF conversion', fcf.value / ni.value, 'x', `${fcf.id} / ${ni.id}`);
      t += `, a ${cv.display} conversion of net income`;
      refs.push(ni.id, cv.id);
    }
    claims.push(new Claim(`${t}.`, refs));
    score += fcf.value > 0 ? 0.5 : -0.5;
  }

  const stance = stanceFrom(score);
  const head = `Revenue ${rev.display}` + (g ? `, ${g.value >= 0 ? '+' : ''}${g.value.toFixed(1)}% YoY` : '') + ` -> ${stance}.`;

  return {
    agent: 'Revenue Analyst',
    section: 'Revenue',
    stance,
    score,
    headline: head,
    claims,
    derived: d.items,
    table: []
  };
}

// -----------------------------------------------------------------------------
// 3. RISK ANALYST
// -----------------------------------------------------------------------------
function runRiskAnalyst(figures, sentences) {
  const f = byKey(figures);
  const d = new Deriver('K');
  const src2id = {};
  for (const x of figures) {
    src2id[x.source] = x.id;
  }

  const LEXICON = [
    { rx: /going concern|restatement|material weakness|investigation|subpoena/i, cat: 'Governance / accounting', w: 3 },
    { rx: /litigation|lawsuit|legal proceeding|patent dispute|regulatory action/i, cat: 'Legal / regulatory', w: 2 },
    { rx: /supply[- ]chain|shortage/i, cat: 'Supply chain', w: 2 },
    { rx: /foreign exchange|currency|\bfx\b/i, cat: 'FX exposure', w: 1 },
    { rx: /headwind|slowdown|softness|weak demand|decline in demand/i, cat: 'Demand', w: 2 },
    { rx: /competition|competitive pressure|pricing pressure/i, cat: 'Competition', w: 1.5 },
    { rx: /impairment|write[- ]?down|restructuring|layoff/i, cat: 'One-off charges', w: 2 },
    { rx: /inflation|tariff|cost pressure/i, cat: 'Cost pressure', w: 1.5 }
  ];

  const claims = [];
  let weight = 0.0;
  const seen = {};

  for (let i = 1; i < sentences.length; i++) {
    const s = sentences[i];
    for (const item of LEXICON) {
      if (item.rx.test(s)) {
        if (!seen[item.cat]) {
          seen[item.cat] = true;
          const refs = [`S${i + 1}`];
          if (src2id[s]) refs.push(src2id[s]);
          claims.push(new Claim(`${item.cat} (weight ${item.w}): "${s.replace(/\.$/, '')}"`, refs));
          weight += item.w;
        }
        break;
      }
    }
  }

  const conc = f['customer_concentration'];
  if (conc && conc.value >= 25) {
    claims.push(new Claim(`Customer concentration: top customers = ${conc.display} of revenue (>=25% threshold).`, [conc.id]));
    weight += 2;
  }

  const debt = f['debt'];
  const cash = f['cash'];
  if (debt && cash && cash.value > 0) {
    const r = d.add('debt_cash', 'Debt / cash', debt.value / cash.value, 'x', `${debt.id} / ${cash.id}`);
    if (r.value > 1.25) {
      claims.push(new Claim(`Leverage: debt ${debt.display} vs cash ${cash.display} (${r.display}).`, [debt.id, cash.id, r.id]));
      weight += 2;
    }
  }

  const ni = f['net_income'];
  const fcf = f['fcf'];
  if (ni && ni.value < 0) {
    claims.push(new Claim(`Net loss of ${ni.display}.`, [ni.id]));
    weight += 3;
  } else if (ni && fcf && fcf.value < 0.8 * ni.value) {
    claims.push(new Claim(`Weak cash conversion: FCF ${fcf.display} vs net income ${ni.display}.`, [fcf.id, ni.id]));
    weight += 1.5;
  }

  const om = f['operating_margin'];
  if (om && om.value < 10) {
    claims.push(new Claim(`Thin operating margin of ${om.display}.`, [om.id]));
    weight += 1.5;
  }

  const level = weight >= 6 ? 'High' : weight >= 3 ? 'Medium' : 'Low';
  const stance = { High: 'negative', Medium: 'neutral', Low: 'positive' }[level];
  const score = { High: -1.5, Medium: -0.25, Low: 0.75 }[level];

  if (!claims.length) {
    claims.push(new Claim('No material risk language or numeric red flags detected.', []));
  }

  return {
    agent: 'Risk Analyst',
    section: 'Risk',
    stance,
    score,
    headline: `Risk level ${level} (weighted score ${weight}) -> ${stance}.`,
    claims,
    derived: d.items,
    table: []
  };
}

// -----------------------------------------------------------------------------
// 4. OUTLOOK ANALYST
// -----------------------------------------------------------------------------
function runOutlookAnalyst(figures, sentences) {
  const f = byKey(figures);
  const d = new Deriver('O');
  const claims = [];
  let score = 0.0;

  const lo = f['guidance_rev_low'];
  const hi = f['guidance_rev_high'];
  const rev = f['revenue'];

  if (lo && hi && rev) {
    const mid = d.add('guid_mid', 'Guidance midpoint', (lo.value + hi.value) / 2, 'USD_M', `avg(${lo.id}, ${hi.id})`);
    const imp = d.add('implied_qoq', 'Implied sequential growth', ((mid.value / rev.value) - 1) * 100, '%', `${mid.id} / ${rev.id} - 1`);
    claims.push(new Claim(
      `Guidance of ${lo.display}-${hi.display} (midpoint ${mid.display}) implies ${imp.value >= 0 ? '+' : ''}${imp.value.toFixed(1)}% sequential growth vs ${rev.display}.`,
      [lo.id, hi.id, rev.id, mid.id, imp.id]
    ));
    score += imp.value >= 4 ? 1 : imp.value >= 0 ? 0.5 : -1;

    const gmar = f['guidance_margin'];
    const om = f['operating_margin'];
    if (gmar && om) {
      const dm = d.add('margin_delta', 'Guided margin vs current', gmar.value - om.value, 'pp', `${gmar.id} - ${om.id}`);
      claims.push(new Claim(`Guided operating margin ${gmar.display} vs ${om.display} today (${dm.display}).`, [gmar.id, om.id, dm.id]));
      score += dm.value >= 0.5 ? 0.5 : dm.value <= -0.5 ? -0.5 : 0;
    }
  } else {
    claims.push(new Claim('No quantitative revenue guidance found; outlook cannot be sized.', []));
  }

  const GUID = /\b(expects?|guidance|outlook|forecast|anticipates?)\b/i;
  const POS = /confident|momentum|strong|accelerat|robust|record|raise[ds]?|optimis/gi;
  const NEGW = /cautio|uncertain|visibility|conservative|softness|headwind|macro/gi;

  let pos = 0;
  let neg = 0;
  let refs = [];

  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    if (GUID.test(s)) {
      const pMatches = s.match(POS);
      const nMatches = s.match(NEGW);
      const pCount = pMatches ? pMatches.length : 0;
      const nCount = nMatches ? nMatches.length : 0;
      if (pCount || nCount) {
        pos += pCount;
        neg += nCount;
        refs.push(`S${i + 1}`);
      }
    }
  }

  if (refs.length) {
    const tone = pos > neg ? 'confident' : neg > pos ? 'cautious' : 'balanced';
    claims.push(new Claim(`Management tone is ${tone} (${pos} confident vs ${neg} cautious cue words in guidance text).`, refs));
    score += pos - neg >= 1 ? 0.5 : neg - pos >= 1 ? -0.5 : 0;
  }

  const stance = stanceFrom(score);
  return {
    agent: 'Outlook Analyst',
    section: 'Outlook',
    stance,
    score,
    headline: `Forward guidance assessed as ${stance}.`,
    claims,
    derived: d.items,
    table: []
  };
}

// -----------------------------------------------------------------------------
// 5. COMPARISON AGENT
// -----------------------------------------------------------------------------
function runComparisonAgent(figures, priorFigures) {
  if (!priorFigures || !priorFigures.length) {
    return {
      agent: 'Comparison Agent',
      section: 'Quarter-over-quarter',
      stance: 'neutral',
      score: 0,
      headline: 'No previous quarter supplied.',
      claims: [new Claim('No prior-quarter report supplied; comparison skipped.', [])],
      derived: [],
      table: []
    };
  }

  const cur = byKey(figures);
  const prv = byKey(priorFigures);
  const rows = [];
  const claims = [];
  let fav = 0;
  let unf = 0;

  const METRICS = [
    { key: 'revenue', upGood: true },
    { key: 'revenue_growth', upGood: true },
    { key: 'gross_margin', upGood: true },
    { key: 'operating_margin', upGood: true },
    { key: 'net_income', upGood: true },
    { key: 'eps', upGood: true },
    { key: 'fcf', upGood: true },
    { key: 'cash', upGood: true },
    { key: 'debt', upGood: false }
  ];

  for (const { key, upGood } of METRICS) {
    if (cur[key] && prv[key]) {
      const c = cur[key];
      const p = prv[key];
      const delta = c.value - p.value;
      const pct = p.value ? (delta / Math.abs(p.value)) * 100 : 0.0;
      const arrow = delta > 1e-9 ? '▲' : delta < -1e-9 ? '▼' : '▬';
      const good = arrow === '▬' ? null : (delta > 0) === upGood;
      if (good === true) fav++;
      if (good === false) unf++;

      const dtxt = c.unit === '%' ? `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}pp` : `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
      const verdict = good === true ? 'favorable' : good === false ? 'unfavorable' : 'flat';
      rows.push({
        metric: c.label,
        prior: p.display,
        current: c.display,
        change: dtxt,
        direction: arrow,
        favorable: verdict,
        refs: [c.id, p.id]
      });
      claims.push(new Claim(`${c.label}: ${p.display} -> ${c.display} (${dtxt}) ${arrow}, ${verdict}.`, [c.id, p.id]));
    }
  }

  const n = Math.max(fav + unf, 1);
  const score = ((fav - unf) / n) * 2;
  const stance = score >= 1 ? 'positive' : score <= -0.5 ? 'negative' : 'neutral';

  return {
    agent: 'Comparison Agent',
    section: 'Quarter-over-quarter',
    stance,
    score,
    headline: `${fav} metrics improved, ${unf} deteriorated vs prior quarter.`,
    claims,
    derived: [],
    table: rows
  };
}

// -----------------------------------------------------------------------------
// 6. EDITOR MANAGER
// -----------------------------------------------------------------------------
function buildRegistry(figures, prior, sentences, views) {
  const reg = {};
  for (const f of [...figures, ...(prior || [])]) {
    reg[f.id] = f;
  }
  for (const v of views) {
    if (v.derived) {
      for (const d of v.derived) {
        reg[d.id] = d;
      }
    }
  }
  for (let i = 0; i < (sentences || []).length; i++) {
    reg[`S${i + 1}`] = new Figure(`S${i + 1}`, 'sentence', 'Report text', 0, '', sentences[i]);
  }
  return reg;
}

function runEditorManager(views, figures, prior, sentences, company, period, llmSummary = null) {
  const rev = views.revenue;
  const risk = views.risk;
  const out = views.outlook;
  const cmp = views.comparison;
  const reg = buildRegistry(figures, prior, sentences, Object.values(views));

  const SIGN = { positive: 1, neutral: 0, negative: -1 };
  const ICON = { positive: '🟢', neutral: '🟡', negative: '🔴' };

  // Disagreements check
  const dis = [];
  const pairs = [
    [rev, risk, 'Revenue momentum vs. risk profile'],
    [out, risk, 'Guidance vs. risk profile'],
    [rev, out, 'Current results vs. forward guidance']
  ];
  if (cmp && cmp.table && cmp.table.length) {
    pairs.push([rev, cmp, 'Revenue view vs. quarter-over-quarter trend']);
  }
  for (const [a, b, title] of pairs) {
    if (SIGN[a.stance] * SIGN[b.stance] < 0) {
      dis.push({
        title,
        between: [a.agent, b.agent],
        text: `${a.agent} is ${a.stance} (${a.headline}) but ${b.agent} is ${b.stance} (${b.headline})`
      });
    }
  }

  // Grounding gate
  let total = 0;
  let ok = 0;
  const ungrounded = [];
  const kept = {};

  for (const [k, v] of Object.entries(views)) {
    kept[k] = [];
    for (const c of v.claims) {
      total++;
      if (c.refs && c.refs.length && c.refs.every(r => r in reg)) {
        ok++;
        kept[k].push(c);
      } else if (!c.refs.length && (c.text.startsWith('No ') || c.text.includes('could not'))) {
        kept[k].push(c);
      } else {
        ungrounded.push(`${v.agent}: ${c.text}`);
      }
    }
  }

  const coverage = Math.round((100 * ok) / Math.max(total, 1) * 10) / 10;

  // Composite verdict
  const scores = [rev.score, risk.score, out.score];
  if (cmp && cmp.table && cmp.table.length) scores.push(cmp.score);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const verdict = avg >= 0.6 ? 'Constructive' : avg <= -0.3 ? 'Cautious' : 'Balanced / Mixed';

  const f = byKey(figures);
  const r = f['revenue'];
  const g = f['revenue_growth'];

  let summary = '';
  if (r) {
    summary = `${company} reported ${period} revenue of ${r.display}` +
      (g ? ` (${g.value >= 0 ? '+' : ''}${g.value.toFixed(1)}% YoY)` : '') +
      ` [${r.id}${g ? ', ' + g.id : ''}]. Revenue view is ${rev.stance}, risk view is ${risk.stance}, and outlook is ${out.stance}; overall stance: ${verdict}.`;
  } else {
    summary = `${company} ${period}: key figures could not be extracted. Overall stance: ${verdict}.`;
  }

  if (llmSummary) summary = llmSummary;

  // Markdown note creation
  const L = [
    `# ${company} — ${period} Analyst Note`,
    `**Overall stance: ${verdict}**  |  Grounding coverage: **${coverage}%** (${ok}/${total} claims traced to figures)`,
    '',
    `> ${summary}`,
    ''
  ];

  const sections = [
    { title: 'Revenue', key: 'revenue', lim: 4 },
    { title: 'Risk', key: 'risk', lim: 5 },
    { title: 'Outlook', key: 'outlook', lim: 3 }
  ];

  sections.forEach(({ title, key, lim }, n) => {
    const v = views[key];
    L.push(`## ${n + 1}. ${title}  ${ICON[v.stance]} ${v.stance.charAt(0).toUpperCase() + v.stance.slice(1)}`);
    L.push(`_${v.headline}_`);
    kept[key].slice(0, lim).forEach(c => L.push(`- ${c.render()}`));
    L.push('');
  });

  if (cmp && cmp.table && cmp.table.length) {
    L.push('## 4. Quarter-over-quarter');
    L.push('| Metric | Prior | Current | Change | Dir | Refs |');
    L.push('|---|---|---|---|---|---|');
    for (const t of cmp.table) {
      const favIcon = t.favorable === 'favorable' ? '✅' : t.favorable === 'unfavorable' ? '⚠️' : '➖';
      L.push(`| ${t.metric} | ${t.prior} | ${t.current} | ${t.change} | ${t.direction} ${favIcon} | ${t.refs.join(', ')} |`);
    }
    L.push('');
  }

  L.push('## Analyst disagreements');
  if (dis.length) {
    dis.forEach(x => L.push(`- ⚠️ **${x.title}** — ${x.text}.`));
  } else {
    L.push('- None: analysts broadly agree.');
  }
  L.push('');

  const body = L.join('\n');
  const usedMatches = [...body.matchAll(/\b([FPRKOS]\d+)\b/g)].map(m => m[1]);
  const used = Array.from(new Set(usedMatches)).sort((a, b) => {
    const cA = a.charAt(0);
    const cB = b.charAt(0);
    if (cA !== cB) return cA.localeCompare(cB);
    return parseInt(a.slice(1)) - parseInt(b.slice(1));
  });

  L.push('## Sources');
  L.push('| ID | Item | Value | Source |');
  L.push('|---|---|---|---|');
  for (const id of used) {
    if (reg[id]) {
      const x = reg[id];
      const src = x.source.replace(/\|/g, '/');
      L.push(`| ${id} | ${x.label} | ${x.display} | ${src.length > 110 ? src.slice(0, 110) + '…' : src} |`);
    }
  }

  return {
    markdown: L.join('\n'),
    coverage,
    verdict,
    summary,
    disagreements: dis,
    ungrounded,
    registry: reg,
    used_ids: used
  };
}

// -----------------------------------------------------------------------------
// 7. PIPELINE COORDINATOR
// -----------------------------------------------------------------------------
function runPipeline({ reportText = '', priorText = '', figures = null, priorFigures = null, sentences = null, company = 'Company', period = '', useLlm = false }) {
  const t0 = Date.now();
  const trace = [];

  let curFigures = figures;
  let curPrior = priorFigures || [];
  let curSentences = sentences || [];
  let curCompany = company;
  let curPeriod = period;

  if (!curFigures) {
    const tExtract = Date.now();
    const curExt = runExtraction(reportText, 'F');
    const priorExt = priorText ? runExtraction(priorText, 'P') : null;

    curFigures = curExt.figures;
    curPrior = priorExt ? priorExt.figures : [];
    curSentences = curExt.sentences;
    curCompany = curExt.company;
    curPeriod = curExt.period;

    trace.push({
      agent: 'Extraction',
      seconds: Math.max((Date.now() - tExtract) / 1000, 0.001),
      info: `${curFigures.length} figures` + (curPrior.length ? ` + ${curPrior.length} prior` : '')
    });
  } else {
    trace.push({
      agent: 'Extraction',
      seconds: 0.0005,
      info: 'reused supplied figures'
    });
  }

  // Fan-out: 4 parallel analyst runs
  const tRev = Date.now();
  const revenueView = runRevenueAnalyst(curFigures);
  trace.push({ agent: 'Revenue', seconds: Math.max((Date.now() - tRev) / 1000, 0.0001), info: revenueView.headline });

  const tRisk = Date.now();
  const riskView = runRiskAnalyst(curFigures, curSentences);
  trace.push({ agent: 'Risk', seconds: Math.max((Date.now() - tRisk) / 1000, 0.0001), info: riskView.headline });

  const tOut = Date.now();
  const outlookView = runOutlookAnalyst(curFigures, curSentences);
  trace.push({ agent: 'Outlook', seconds: Math.max((Date.now() - tOut) / 1000, 0.0001), info: outlookView.headline });

  const tCmp = Date.now();
  const comparisonView = runComparisonAgent(curFigures, curPrior);
  trace.push({ agent: 'Comparison', seconds: Math.max((Date.now() - tCmp) / 1000, 0.0001), info: comparisonView.headline });

  const views = {
    revenue: revenueView,
    risk: riskView,
    outlook: outlookView,
    comparison: comparisonView
  };

  // Fan-in: Editor Manager
  const tEd = Date.now();
  const note = runEditorManager(views, curFigures, curPrior, curSentences, curCompany, curPeriod);
  trace.push({
    agent: 'Editor',
    seconds: Math.max((Date.now() - tEd) / 1000, 0.0005),
    info: `${note.verdict} | coverage ${note.coverage}%`
  });

  return {
    company: curCompany,
    period: curPeriod,
    figures: curFigures.map(f => (f.toJSON ? f.toJSON() : f)),
    prior_figures: curPrior.map(f => (f.toJSON ? f.toJSON() : f)),
    sentences: curSentences,
    views: {
      revenue: serializeView(revenueView),
      risk: serializeView(riskView),
      outlook: serializeView(outlookView),
      comparison: serializeView(comparisonView)
    },
    note: {
      markdown: note.markdown,
      verdict: note.verdict,
      coverage: note.coverage,
      summary: note.summary,
      disagreements: note.disagreements,
      ungrounded: note.ungrounded,
      used_ids: note.used_ids,
      llm_used: false,
      registry: serializeRegistry(note.registry)
    },
    trace
  };
}

function serializeView(v) {
  return {
    agent: v.agent,
    section: v.section,
    stance: v.stance,
    score: v.score,
    headline: v.headline,
    claims: (v.claims || []).map(c => (c.toJSON ? c.toJSON() : c)),
    derived: (v.derived || []).map(d => (d.toJSON ? d.toJSON() : d)),
    table: v.table || []
  };
}

function serializeRegistry(reg) {
  const out = {};
  for (const [k, v] of Object.entries(reg || {})) {
    out[k] = v.toJSON ? v.toJSON() : v;
  }
  return out;
}

// -----------------------------------------------------------------------------
// 8. GROUNDED QA ("ASK THE DESK")
// -----------------------------------------------------------------------------
const STOP_WORDS = new Set(['the', 'a', 'of', 'is', 'what', 'was', 'how', 'much', 'did', 'do', 'and', 'to', 'in', 'for', 'on', 'are', 'were', 'its', 'it']);

function tokenize(s) {
  const matches = (s || '').toLowerCase().match(/[a-z]+/g) || [];
  return new Set(matches.filter(w => !STOP_WORDS.has(w) && w.length > 2));
}

function runQA(question, registry, views, k = 4) {
  const qToks = tokenize(question);
  const scored = [];

  for (const [id, f] of Object.entries(registry || {})) {
    if (f.key === 'sentence') continue;
    const fToks = tokenize(`${f.label} ${(f.key || '').replace(/_/g, ' ')} ${f.source}`);
    const overlap = [...qToks].filter(x => fToks.has(x)).length;
    if (overlap > 0) {
      scored.push({
        score: overlap + 0.5,
        text: `<strong>${f.label}</strong> = ${f.display || f.value} <br/><sub style="color:#94a3b8">${id}: ${f.source}</sub>`
      });
    }
  }

  for (const v of Object.values(views || {})) {
    for (const c of v.claims || []) {
      const cToks = tokenize(c.text);
      const overlap = [...qToks].filter(x => cToks.has(x)).length;
      if (overlap > 0) {
        scored.push({
          score: overlap,
          text: `${c.rendered || c.text} <br/><sub style="color:#38bdf8">from ${v.agent}</sub>`
        });
      }
    }
  }

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, k).map(x => x.text);

  return top.length ? top : ['No grounded evidence found for that question in this report.'];
}

module.exports = {
  Figure,
  Claim,
  runExtraction,
  runRevenueAnalyst,
  runRiskAnalyst,
  runOutlookAnalyst,
  runComparisonAgent,
  runEditorManager,
  runPipeline,
  runQA
};
