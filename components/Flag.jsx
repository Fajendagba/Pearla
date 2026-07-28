// Small inline SVG flags. Flag emojis show as plain letters on Windows,
// so real SVGs are the only way everyone sees an actual flag.
const FLAGS = {
  ng: (
    <svg viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="16" fill="#fff" />
      <rect width="8" height="16" fill="#008751" />
      <rect x="16" width="8" height="16" fill="#008751" />
    </svg>
  ),
  gh: (
    <svg viewBox="0 0 24 16" aria-hidden="true">
      <rect width="24" height="5.33" fill="#CE1126" />
      <rect y="5.33" width="24" height="5.33" fill="#FCD116" />
      <rect y="10.66" width="24" height="5.34" fill="#006B3F" />
      <path d="M12 5.4l.9 2.7h2.8l-2.3 1.7.9 2.7-2.3-1.7-2.3 1.7.9-2.7-2.3-1.7h2.8z" fill="#000" />
    </svg>
  ),
  sn: (
    <svg viewBox="0 0 24 16" aria-hidden="true">
      <rect width="8" height="16" fill="#00853F" />
      <rect x="8" width="8" height="16" fill="#FDEF42" />
      <rect x="16" width="8" height="16" fill="#E31B23" />
      <path d="M12 5l.9 2.7h2.8l-2.3 1.7.9 2.7-2.3-1.7-2.3 1.7.9-2.7-2.3-1.7h2.8z" fill="#00853F" />
    </svg>
  ),
  world: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#2D6A4F" />
      <path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20zm0 2c1.5 2.2 2.5 4.9 2.5 8s-1 5.8-2.5 8c-1.5-2.2-2.5-4.9-2.5-8s1-5.8 2.5-8z" fill="#52B788" opacity=".7" />
      <path d="M3 9h18M3 15h18" stroke="#52B788" strokeWidth="1.2" opacity=".7" />
    </svg>
  ),
};

export default function Flag({ code }) {
  return <span className="flag">{FLAGS[code] ?? FLAGS.world}</span>;
}
