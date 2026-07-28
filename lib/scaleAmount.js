// Scales ingredient amounts like "3 cups", "1½ tsp", "2–3 (to taste)" by a factor.
// Amounts with no leading number ("to taste", "optional") are returned unchanged.

const FRACTIONS = {
  '¼': 0.25, '½': 0.5, '¾': 0.75,
  '⅓': 1 / 3, '⅔': 2 / 3,
  '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875,
};

const SINGULARS = { cups: 'cup', cubes: 'cube', leaves: 'leaf', plantains: 'plantain', tomatoes: 'tomato' };

const NUM_TOKEN = '(?:\\d+(?:\\.\\d+)?(?:\\s*[¼½¾⅓⅔⅛⅜⅝⅞])?|[¼½¾⅓⅔⅛⅜⅝⅞])';
const RANGE_RE = new RegExp(`^(${NUM_TOKEN})\\s*[–-]\\s*(${NUM_TOKEN})(.*)$`);
const SINGLE_RE = new RegExp(`^(${NUM_TOKEN})(.*)$`);

function parseNumber(str) {
  const s = str.replace(/\s+/g, '');
  const m = s.match(/^(\d+(?:\.\d+)?)?([¼½¾⅓⅔⅛⅜⅝⅞])?$/);
  if (!m || (!m[1] && !m[2])) return null;
  return (m[1] ? parseFloat(m[1]) : 0) + (m[2] ? FRACTIONS[m[2]] : 0);
}

function formatNumber(value) {
  if (value >= 10) return String(Math.round(value));
  const whole = Math.floor(value + 1e-9);
  const frac = value - whole;
  const NICE = [[0, ''], [0.25, '¼'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [0.75, '¾'], [1, '']];
  let best = NICE[0];
  let bestDist = Infinity;
  for (const opt of NICE) {
    const d = Math.abs(frac - opt[0]);
    if (d < bestDist) { bestDist = d; best = opt; }
  }
  let w = whole;
  let f = best[1];
  if (best[0] === 1) { w += 1; f = ''; }
  if (w === 0 && f) return f;
  if (w === 0 && !f) return '0';
  return `${w}${f}`;
}

function singularize(rest, value) {
  if (value > 1) return rest;
  let out = rest;
  for (const [plural, singular] of Object.entries(SINGULARS)) {
    out = out.replace(new RegExp(`^(\\s*)${plural}\\b`), `$1${singular}`);
  }
  return out;
}

export function scaleAmount(amount, factor) {
  if (factor === 1 || typeof amount !== 'string') return amount;

  const range = amount.match(RANGE_RE);
  if (range) {
    const a = parseNumber(range[1]);
    const b = parseNumber(range[2]);
    if (a == null || b == null) return amount;
    const bScaled = b * factor;
    return `${formatNumber(a * factor)}–${formatNumber(bScaled)}${singularize(range[3], bScaled)}`;
  }

  const single = amount.match(SINGLE_RE);
  if (single) {
    const a = parseNumber(single[1]);
    if (a == null) return amount;
    const scaled = a * factor;
    return `${formatNumber(scaled)}${singularize(single[2], scaled)}`;
  }

  return amount;
}
