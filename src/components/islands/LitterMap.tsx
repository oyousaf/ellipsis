import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// A stylised town that demonstrates the three Ellipsis tools on synthetic data.
// Everything is generated from a fixed seed, so the server render and hydration agree.

type Mode = "detect" | "grade" | "predict";
type LitterType = "cigarette" | "wrapper" | "bottle" | "cup" | "can";
type Point = { id: number; x: number; y: number; type: LitterType; confidence: number };
type Street = { id: string; name: string; a: [number, number]; b: [number, number] };
type Zone = { name: string; x: number; y: number; weight: number; peaks: number[] };

const W = 800;
const H = 500;

const TYPES: { type: LitterType; label: string; color: string; share: number }[] = [
  { type: "cigarette", label: "Cigarette butts", color: "#b23a1e", share: 0.66 },
  { type: "wrapper", label: "Food wrappers", color: "#d9801e", share: 0.12 },
  { type: "cup", label: "Coffee cups", color: "#7a5c3e", share: 0.09 },
  { type: "bottle", label: "Plastic bottles", color: "#2f6f8f", share: 0.08 },
  { type: "can", label: "Drinks cans", color: "#5b7f3a", share: 0.05 },
];

const STREETS: Street[] = [
  { id: "high", name: "High Street", a: [60, 300], b: [740, 220] },
  { id: "station", name: "Station Road", a: [620, 40], b: [620, 460] },
  { id: "market", name: "Market Lane", a: [380, 40], b: [380, 460] },
  { id: "school", name: "School Road", a: [160, 120], b: [160, 460] },
  { id: "north", name: "North Parade", a: [60, 120], b: [740, 120] },
  { id: "south", name: "South Terrace", a: [60, 420], b: [740, 420] },
  { id: "mill", name: "Mill Street", a: [480, 260], b: [740, 460] },
];

const ZONES: Zone[] = [
  { name: "Station Road", x: 620, y: 140, weight: 1, peaks: [8, 17] },
  { name: "High Street", x: 400, y: 258, weight: 1.3, peaks: [13, 22] },
  { name: "School Road", x: 160, y: 360, weight: 0.8, peaks: [8, 15] },
  { name: "Riverside Park", x: 560, y: 380, weight: 0.7, peaks: [14] },
];

const GRADES = [
  { grade: "A", color: "#5b7f3a", label: "Clean" },
  { grade: "B", color: "#c9a10f", label: "Light litter" },
  { grade: "C", color: "#d9801e", label: "Littered" },
  { grade: "D", color: "#b23a1e", label: "Heavily littered" },
] as const;

const MODES: { id: Mode; label: string; blurb: string }[] = [
  {
    id: "detect",
    label: "Detect",
    blurb: "Every item in the imagery is located and classified by type, with a confidence score.",
  },
  {
    id: "grade",
    label: "Grade",
    blurb: "Each street gets an objective A–D cleanliness grade, aligned with DEFRA standards.",
  },
  {
    id: "predict",
    label: "Predict",
    blurb: "Hotspots are forecast hour by hour, so crews and bins go where litter will be.",
  },
];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function distToSegment(px: number, py: number, [ax, ay]: [number, number], [bx, by]: [number, number]) {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function generatePoints(): Point[] {
  const rand = mulberry32(2019);
  const pickType = () => {
    let r = rand();
    for (const t of TYPES) {
      if ((r -= t.share) <= 0) return t.type;
    }
    return "cigarette";
  };
  const points: Point[] = [];
  for (let i = 0; i < 170; i++) {
    // Most litter collects near busy zones, the rest scatters along streets.
    let x: number;
    let y: number;
    if (rand() < 0.6) {
      const z = ZONES[Math.floor(rand() * ZONES.length)];
      const r = 70 * Math.sqrt(rand()) * z.weight;
      const a = rand() * Math.PI * 2;
      x = z.x + Math.cos(a) * r;
      y = z.y + Math.sin(a) * r * 0.7;
    } else {
      const s = STREETS[Math.floor(rand() * STREETS.length)];
      const t = rand();
      x = s.a[0] + (s.b[0] - s.a[0]) * t + (rand() - 0.5) * 14;
      y = s.a[1] + (s.b[1] - s.a[1]) * t + (rand() - 0.5) * 14;
    }
    points.push({
      id: i,
      x: Math.max(12, Math.min(W - 12, x)),
      y: Math.max(12, Math.min(H - 12, y)),
      type: pickType(),
      confidence: 0.88 + rand() * 0.11,
    });
  }
  return points;
}

// Intensity of a zone at an hour: gaussian bumps around each peak.
function zoneIntensity(z: Zone, hour: number) {
  return z.weight * Math.min(1, z.peaks.reduce((sum, p) => sum + Math.exp(-((hour - p) ** 2) / 4.5), 0.08));
}

const typeMeta = Object.fromEntries(TYPES.map((t) => [t.type, t])) as Record<LitterType, (typeof TYPES)[number]>;

export default function LitterMap() {
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<Mode>("detect");
  const [hour, setHour] = useState(8);
  const [playing, setPlaying] = useState(false);
  const [focused, setFocused] = useState<number | null>(null);

  const points = useMemo(generatePoints, []);

  const counts = useMemo(() => {
    const c = Object.fromEntries(TYPES.map((t) => [t.type, 0])) as Record<LitterType, number>;
    points.forEach((p) => c[p.type]++);
    return c;
  }, [points]);

  const streetGrades = useMemo(
    () =>
      STREETS.map((s) => {
        const length = Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1]);
        const near = points.filter((p) => distToSegment(p.x, p.y, s.a, s.b) < 16).length;
        const density = (near / length) * 100;
        const g = density < 2.5 ? 0 : density < 5 ? 1 : density < 8 ? 2 : 3;
        return { ...s, length, grade: GRADES[g] };
      }),
    [points]
  );

  // Cycle the highlighted detection so the demo feels live without interaction.
  useEffect(() => {
    if (mode !== "detect" || reduceMotion) return;
    const rand = mulberry32(7);
    const id = window.setInterval(() => setFocused(Math.floor(rand() * points.length)), 1800);
    return () => window.clearInterval(id);
  }, [mode, points.length, reduceMotion]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setHour((h) => (h >= 23 ? 6 : h + 1)), 700);
    return () => window.clearInterval(id);
  }, [playing]);

  const ranked = ZONES.map((z) => ({ zone: z, value: zoneIntensity(z, hour) })).sort((a, b) => b.value - a.value);
  const focusedPoint = focused === null ? null : points[focused];
  const activeMode = MODES.find((m) => m.id === mode)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-fg px-4 py-3">
          <div role="tablist" aria-label="Platform tools" className="relative flex rounded-lg border-[1.5px] border-fg p-1">
            {MODES.map((m) => (
              <button
                key={m.id}
                role="tab"
                type="button"
                aria-selected={mode === m.id}
                aria-controls="litter-map-panel"
                onClick={() => {
                  setMode(m.id);
                  setPlaying(false);
                }}
                className="relative rounded-md px-4 py-1.5 text-sm font-semibold transition-colors aria-selected:text-bg"
              >
                {mode === m.id && (
                  <motion.span
                    layoutId="litter-tab"
                    className="absolute inset-0 rounded-md bg-fg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{m.label}</span>
              </button>
            ))}
          </div>
          <p className="font-mono text-xs text-muted">survey_0427 · 10.2 km · 1,284 images</p>
        </div>

        <div id="litter-map-panel" role="tabpanel" className="relative aspect-[8/5]">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" role="img" aria-label={`${activeMode.label} view of a sample town`}>
            <defs>
              {ZONES.map((z, i) => (
                <radialGradient key={z.name} id={`heat-${i}`}>
                  <stop offset="0%" stopColor="#b23a1e" stopOpacity="0.85" />
                  <stop offset="45%" stopColor="#d9801e" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#e2b714" stopOpacity="0" />
                </radialGradient>
              ))}
              <pattern id="map-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
              </pattern>
            </defs>

            <rect width={W} height={H} fill="url(#map-dots)" className="text-fg" />
            <rect x="470" y="300" width="220" height="150" rx="28" fill="#5b7f3a" opacity="0.22" />
            <path d="M-20 470 C 180 400, 260 470, 430 440 S 700 330, 820 360" fill="none" stroke="#2f6f8f" strokeWidth="26" opacity="0.25" strokeLinecap="round" />

            {streetGrades.map((s) => (
              <motion.line
                key={s.id}
                x1={s.a[0]}
                y1={s.a[1]}
                x2={s.b[0]}
                y2={s.b[1]}
                strokeLinecap="round"
                animate={{
                  stroke: mode === "grade" ? s.grade.color : "currentColor",
                  strokeWidth: mode === "grade" ? 10 : 12,
                  opacity: mode === "grade" ? 0.95 : 0.16,
                }}
                transition={{ duration: reduceMotion ? 0 : 0.6 }}
                className="text-fg"
              />
            ))}

            <AnimatePresence>
              {mode === "predict" &&
                ZONES.map((z, i) => {
                  const v = zoneIntensity(z, hour);
                  return (
                    <motion.ellipse
                      key={z.name}
                      cx={z.x}
                      cy={z.y}
                      fill={`url(#heat-${i})`}
                      initial={{ rx: 0, ry: 0, opacity: 0 }}
                      animate={{ rx: 60 + v * 110, ry: 45 + v * 80, opacity: 0.25 + v * 0.75 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  );
                })}
            </AnimatePresence>

            <g>
              {points.map((p, i) => (
                <motion.circle
                  key={p.id}
                  cx={p.x}
                  cy={p.y}
                  fill={typeMeta[p.type].color}
                  initial={false}
                  animate={{
                    r: mode === "detect" ? 3.6 : 2.2,
                    opacity: mode === "detect" ? 0.95 : mode === "grade" ? 0.35 : 0,
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion || mode !== "detect" ? 0 : (i % 40) * 0.008 }}
                  onPointerEnter={() => mode === "detect" && setFocused(p.id)}
                />
              ))}
            </g>

            {mode === "detect" && !reduceMotion && (
              <motion.line
                y1={0}
                y2={H}
                stroke="var(--color-mark)"
                strokeWidth="1.5"
                initial={{ x1: 0, x2: 0, opacity: 0 }}
                animate={{ x1: [0, W], x2: [0, W], opacity: [0, 0.7, 0.7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            )}

            <AnimatePresence>
              {mode === "detect" && focusedPoint && (
                <motion.g
                  key={focusedPoint.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ transformOrigin: `${focusedPoint.x}px ${focusedPoint.y}px` }}
                >
                  <rect x={focusedPoint.x - 12} y={focusedPoint.y - 12} width="24" height="24" rx="3" fill="none" stroke="var(--color-mark)" strokeWidth="2" />
                  <g transform={`translate(${Math.min(focusedPoint.x + 16, W - 190)} ${Math.max(focusedPoint.y - 34, 8)})`}>
                    <rect width="180" height="26" rx="4" fill="var(--color-fg)" />
                    <text x="12" y="17" fill="var(--color-page)" fontSize="12" fontFamily="var(--font-mono)">
                      {typeMeta[focusedPoint.type].label.replace(/s$/, "").toLowerCase()} · {Math.round(focusedPoint.confidence * 100)}%
                    </text>
                  </g>
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </div>

        {mode === "predict" && (
          <div className="flex items-center gap-4 border-t-[1.5px] border-fg px-4 py-3">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="grid size-9 shrink-0 place-items-center rounded-md bg-fg text-bg"
              aria-label={playing ? "Pause forecast" : "Play forecast through the day"}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            <label className="flex flex-1 items-center gap-3">
              <span className="sr-only">Hour of day</span>
              <input
                type="range"
                min={6}
                max={23}
                value={hour}
                onChange={(e) => {
                  setPlaying(false);
                  setHour(Number(e.target.value));
                }}
                className="w-full accent-[#b23a1e]"
              />
            </label>
            <output className="w-14 text-right font-mono text-sm tabular-nums">{String(hour).padStart(2, "0")}:00</output>
          </div>
        )}
      </div>

      <aside className="card flex flex-col gap-5 p-6" aria-live="polite">
        <div>
          <p className="label text-mark">{activeMode.label}</p>
          <p className="mt-2 text-muted">{activeMode.blurb}</p>
        </div>

        {mode === "detect" && (
          <ul className="space-y-3">
            {TYPES.map((t) => (
              <li key={t.type}>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: t.color }} />
                    {t.label}
                  </span>
                  <span className="font-mono tabular-nums text-muted">{counts[t.type]}</span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-fg/10">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: t.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(counts[t.type] / points.length) * 100}%` }}
                    transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        {mode === "grade" && (
          <ul className="space-y-2">
            {streetGrades
              .slice()
              .sort((a, b) => b.grade.grade.localeCompare(a.grade.grade))
              .map((s) => (
                <li key={s.id} className="flex items-center justify-between text-sm">
                  <span>{s.name}</span>
                  <span
                    className="grid size-7 place-items-center rounded-md font-mono text-xs font-semibold text-cream"
                    style={{ background: s.grade.color }}
                    title={s.grade.label}
                  >
                    {s.grade.grade}
                  </span>
                </li>
              ))}
          </ul>
        )}

        {mode === "predict" && (
          <div>
            <p className="hand text-4xl">{ranked[0].zone.name}</p>
            <p className="mt-1 text-sm text-muted">forecast hotspot at {String(hour).padStart(2, "0")}:00</p>
            <ul className="mt-5 space-y-2">
              {ranked.map(({ zone, value }) => (
                <li key={zone.name} className="text-sm">
                  <div className="flex justify-between">
                    <span>{zone.name}</span>
                    <span className="font-mono tabular-nums text-muted">{Math.round(value * 100)}</span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-fg/10">
                    <motion.div className="h-full rounded-full bg-mark" animate={{ width: `${Math.min(100, value * 100)}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-auto border-t border-line pt-4 font-mono text-[10px] leading-relaxed text-muted">
          Illustrative data. Real surveys classify 50+ litter types across thousands of geotagged images.
        </p>
      </aside>
    </div>
  );
}
