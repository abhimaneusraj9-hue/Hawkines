// SVG path and decorations for the roadmap.
// Coordinate space: 600 x 580
// Node centers: Row1 y=80, Row2 y=220, Row3 y=360, Row4 y=500
// Columns: x=80 (left), x=300 (center), x=520 (right)
const PATH_D =
  'M 80 80 L 300 80 L 520 80 ' +
  'C 575 80 575 220 520 220 ' +
  'L 300 220 L 80 220 ' +
  'C 25 220 25 360 80 360 ' +
  'L 300 360 L 520 360 ' +
  'C 575 360 575 500 520 500 ' +
  'L 300 500 L 80 500';

export function LevelPath() {
  return (
    <svg
      viewBox="0 0 600 580"
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Soft glow track behind the dashed path */}
      <path
        d={PATH_D}
        fill="none"
        stroke="white"
        strokeWidth="22"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />

      {/* Main winding dotted path */}
      <path
        d={PATH_D}
        fill="none"
        stroke="#c4b5fd"
        strokeWidth="7"
        strokeDasharray="14 9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Clouds ── */}
      {/* Top-middle area */}
      <ellipse cx="195" cy="38" rx="28" ry="14" fill="white" opacity="0.75" />
      <ellipse cx="178" cy="38" rx="18" ry="10" fill="white" opacity="0.75" />
      <ellipse cx="212" cy="38" rx="20" ry="10" fill="white" opacity="0.75" />

      {/* Right connector area */}
      <ellipse cx="558" cy="150" rx="26" ry="13" fill="white" opacity="0.7" />
      <ellipse cx="543" cy="150" rx="17" ry="9"  fill="white" opacity="0.7" />
      <ellipse cx="571" cy="150" rx="19" ry="9"  fill="white" opacity="0.7" />

      {/* Between row2 and row3 left */}
      <ellipse cx="42"  cy="290" rx="24" ry="12" fill="white" opacity="0.65" />
      <ellipse cx="28"  cy="290" rx="16" ry="8"  fill="white" opacity="0.65" />
      <ellipse cx="56"  cy="290" rx="18" ry="8"  fill="white" opacity="0.65" />

      {/* Right connector row3→row4 */}
      <ellipse cx="558" cy="430" rx="26" ry="13" fill="white" opacity="0.7" />
      <ellipse cx="543" cy="430" rx="17" ry="9"  fill="white" opacity="0.7" />
      <ellipse cx="571" cy="430" rx="19" ry="9"  fill="white" opacity="0.7" />

      {/* ── Sparkle / star accents ── */}
      <text x="390" y="52"  fontSize="18" opacity="0.45" textAnchor="middle">✦</text>
      <text x="130" y="165" fontSize="14" opacity="0.40" textAnchor="middle">✦</text>
      <text x="470" y="300" fontSize="16" opacity="0.40" textAnchor="middle">✦</text>
      <text x="200" y="410" fontSize="14" opacity="0.38" textAnchor="middle">✦</text>
      <text x="550" y="55"  fontSize="10" opacity="0.30" textAnchor="middle">✦</text>
      <text x="50"  cy="510" fontSize="10" opacity="0.30" textAnchor="middle">✦</text>

      {/* ── Decorative cyber icons (faint) ── */}
      <text x="340" y="155" fontSize="22" opacity="0.15" textAnchor="middle">🛡️</text>
      <text x="155" y="305" fontSize="20" opacity="0.15" textAnchor="middle">🔑</text>
      <text x="455" y="445" fontSize="20" opacity="0.15" textAnchor="middle">⚡</text>
      <text x="390" y="390" fontSize="18" opacity="0.12" textAnchor="middle">🌐</text>

      {/* ── Soft circuit dots in corners ── */}
      <circle cx="18"  cy="18"  r="4" fill="#a78bfa" opacity="0.25" />
      <circle cx="582" cy="18"  r="4" fill="#60a5fa" opacity="0.25" />
      <circle cx="18"  cy="562" r="4" fill="#60a5fa" opacity="0.25" />
      <circle cx="582" cy="562" r="4" fill="#a78bfa" opacity="0.25" />
      <circle cx="300" cy="18"  r="3" fill="#f9a8d4" opacity="0.20" />
      <circle cx="300" cy="562" r="3" fill="#f9a8d4" opacity="0.20" />

      {/* ── Connector lines from corner dots (circuit feel) ── */}
      <line x1="18"  y1="18"  x2="50"  y2="18"  stroke="#a78bfa" strokeWidth="1.5" opacity="0.15" />
      <line x1="18"  y1="18"  x2="18"  y2="50"  stroke="#a78bfa" strokeWidth="1.5" opacity="0.15" />
      <line x1="582" y1="18"  x2="550" y2="18"  stroke="#60a5fa" strokeWidth="1.5" opacity="0.15" />
      <line x1="582" y1="18"  x2="582" y2="50"  stroke="#60a5fa" strokeWidth="1.5" opacity="0.15" />
    </svg>
  );
}
