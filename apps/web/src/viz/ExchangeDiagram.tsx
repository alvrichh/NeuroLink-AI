import type { Dictionary } from "@/content";

type Copy = Pick<Dictionary["exchange"], "person" | "ai" | "gate" | "senses" | "out" | "back" | "diagramAlt">;

type Geometry = {
  viewBox: string;
  width: number;
  person: { x: number; y: number; r: number };
  ai: { x: number; y: number; size: number };
  out: string;
  back: string;
  gate: { x: number; y: number };
  senses: { x: number; y: number };
  /** Direction labels; omitted where the layout has no clear space for them. */
  outTag?: { x: number; y: number };
  backTag?: { x: number; y: number };
};

const wide: Geometry = {
  viewBox: "0 0 960 340",
  width: 960,
  person: { x: 96, y: 170, r: 46 },
  ai: { x: 864, y: 170, size: 92 },
  out: "M139 143 C 300 28, 660 28, 815 138",
  back: "M821 197 C 660 312, 300 312, 145 202",
  gate: { x: 480, y: 57 },
  senses: { x: 480, y: 283 },
  outTag: { x: 232, y: 52 },
  backTag: { x: 728, y: 300 },
};

const tall: Geometry = {
  viewBox: "0 0 340 470",
  width: 340,
  person: { x: 170, y: 54, r: 42 },
  ai: { x: 170, y: 412, size: 84 },
  out: "M137 82 C 28 170, 28 290, 124 372",
  back: "M216 372 C 312 290, 312 170, 205 86",
  gate: { x: 62, y: 232 },
  senses: { x: 274, y: 232 },
};

function Variant({ g, copy, id, className }: { g: Geometry; copy: Copy; id: string; className: string }) {
  const half = g.ai.size / 2;
  // Chips size themselves to their label (11px mono ≈ 7.5px per character),
  // so longer translations never collide with the icon or leave the frame.
  const charWidth = 7.5;
  const gateW = 46 + copy.gate.length * charWidth;
  const sensesW = 30 + copy.senses.length * charWidth;
  const clampX = (x: number, w: number) => Math.min(g.width - w / 2 - 2, Math.max(w / 2 + 2, x));
  const gateX = clampX(g.gate.x, gateW);
  const sensesX = clampX(g.senses.x, sensesW);
  return (
    <svg className={`xdiagram ${className}`} viewBox={g.viewBox} aria-hidden="true" focusable="false">
      <defs>
        <marker id={`${id}-out`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1.500 8 5 1 8.500" fill="none" stroke="var(--accent)" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <marker id={`${id}-back`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1.500 8 5 1 8.500" fill="none" stroke="var(--ink)" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Human → AI: dashed, because it is still a research question. */}
      <path className="xdiagram__out" d={g.out} markerEnd={`url(#${id}-out)`} />
      {/* AI → Human: solid, because screen and audio already work. */}
      <path className="xdiagram__back" d={g.back} markerEnd={`url(#${id}-back)`} />

      {[0, 1].map((n) => (
        <circle key={`o${n}`} r="3.500" className="xdiagram__pulse xdiagram__pulse--out" style={{ offsetPath: `path("${g.out}")`, animationDelay: `${n * -3.2}s` }} />
      ))}
      {[0, 1].map((n) => (
        <circle key={`b${n}`} r="3.500" className="xdiagram__pulse xdiagram__pulse--back" style={{ offsetPath: `path("${g.back}")`, animationDelay: `${n * -3.2 - 1.4}s` }} />
      ))}

      {g.outTag ? (
        <text className="xdiagram__tag xdiagram__tag--out" x={g.outTag.x} y={g.outTag.y} textAnchor="middle">
          {copy.out.tag}
        </text>
      ) : null}
      {g.backTag ? (
        <text className="xdiagram__tag" x={g.backTag.x} y={g.backTag.y} textAnchor="middle">
          {copy.back.tag}
        </text>
      ) : null}

      {/* Person */}
      <circle className="xdiagram__node" cx={g.person.x} cy={g.person.y} r={g.person.r} />
      <text className="xdiagram__label" x={g.person.x} y={g.person.y + 5} textAnchor="middle">
        {copy.person}
      </text>

      {/* AI */}
      <rect className="xdiagram__node" x={g.ai.x - half} y={g.ai.y - half} width={g.ai.size} height={g.ai.size} rx={g.ai.size * 0.28} />
      <text className="xdiagram__label" x={g.ai.x} y={g.ai.y + 5} textAnchor="middle">
        {copy.ai}
      </text>

      {/* Consent gate on the outbound path */}
      <g transform={`translate(${gateX - gateW / 2} ${g.gate.y - 17})`}>
        <rect className="xdiagram__chip xdiagram__chip--gate" width={gateW} height="34" rx="17" />
        <g transform="translate(13 8)" fill="none" stroke="var(--accent)" strokeWidth="1.500" strokeLinecap="round">
          <rect x="1.500" y="7.500" width="13" height="9" rx="2.500" />
          <path d="M4.500 7.500V5.500a3.500 3.500 0 0 1 7 0v2" />
        </g>
        <text className="xdiagram__chip-text xdiagram__chip-text--gate" x={(gateW + 22) / 2} y="21.500" textAnchor="middle">
          {copy.gate}
        </text>
      </g>

      {/* Senses on the return path */}
      <g transform={`translate(${sensesX - sensesW / 2} ${g.senses.y - 17})`}>
        <rect className="xdiagram__chip" width={sensesW} height="34" rx="17" />
        <text className="xdiagram__chip-text" x={sensesW / 2} y="21.500" textAnchor="middle">
          {copy.senses}
        </text>
      </g>
    </svg>
  );
}

/**
 * Two pathways between a person and an AI — CONCEPTUAL.
 * Rendered twice (wide and tall) so labels stay legible on phones; the pair
 * is exposed to assistive technology as one described image.
 */
export function ExchangeDiagram({ copy }: { copy: Copy }) {
  return (
    <div role="img" aria-label={copy.diagramAlt} className="xdiagram-host">
      <Variant g={wide} copy={copy} id="xw" className="xdiagram--wide" />
      <Variant g={tall} copy={copy} id="xt" className="xdiagram--tall" />
    </div>
  );
}
