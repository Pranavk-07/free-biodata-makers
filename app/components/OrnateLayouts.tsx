import { Biodata } from '../biodata/page';

export function GaneshaIcon({ className = "h-12 w-12", color = "#9a3412" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill={color} aria-hidden="true">
      <path d="M50 5 C35 5 25 15 25 30 C25 40 30 48 38 52 C32 58 28 66 28 76 C28 84 34 90 42 90 C48 90 50 84 50 78 C50 84 52 90 58 90 C66 90 72 84 72 76 C72 66 68 58 62 52 C70 48 75 40 75 30 C75 15 65 5 50 5 Z M50 16 C58 16 63 21 63 28 C63 35 58 40 50 40 C42 40 37 35 37 28 C37 21 42 16 50 16 Z M50 48 C42 48 36 41 36 33 C36 25 42 19 50 19 C58 19 64 25 64 33 C64 41 58 48 50 48 Z" />
      <circle cx="50" cy="12" r="3" />
      <path d="M30 35 C20 35 15 45 22 55" stroke={color} strokeWidth="3" fill="none" />
      <path d="M70 35 C80 35 85 45 78 55" stroke={color} strokeWidth="3" fill="none" />
    </svg>
  );
}

export function PersonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
    </svg>
  );
}

export type OrnateTheme = {
  id: string;
  names: Record<string, string>;
  bg: string;
  frame: string;
  frame2: string;
  ink: string;
  label: string;
  title: string;
  headInk: string;
  panel: string;
  top: "amber" | "marigold" | "magenta" | "arch" | "crimson" | "sapphire" | "emerald" | "blush";
  headFill?: string;
  bismillah?: boolean;
};

export const ORNATE_THEMES: OrnateTheme[] = [
  { id: "o-amber", names: { en: "Amber Classic" }, bg: "#fffcf7", frame: "#9a3412", frame2: "#d97706", ink: "#3b1a0e", label: "#9a3412", title: "#7c2d12", headInk: "#7c2d12", panel: "rgba(255, 253, 248, 0.95)", top: "amber" },
  { id: "o-marigold", names: { en: "Marigold Garland" }, bg: "#fffdf0", frame: "#b45309", frame2: "#f59e0b", ink: "#3a2008", label: "#b45309", title: "#92400e", headInk: "#78350F", panel: "rgba(255, 254, 245, 0.95)", top: "marigold" },
  { id: "o-magenta", names: { en: "Magenta Royal" }, bg: "#fff8fa", frame: "#831843", frame2: "#d4af37", ink: "#4a042e", label: "#831843", title: "#831843", headInk: "#f3e5ab", panel: "#ffffff", top: "magenta", headFill: "#701a45" },
  { id: "o-arch", names: { en: "Royal Red Arch" }, bg: "#fffbfb", frame: "#991b1b", frame2: "#d4af37", ink: "#450a0a", label: "#991b1b", title: "#7f1d1d", headInk: "#f3e5ab", panel: "#ffffff", top: "arch", headFill: "#881337" },
  { id: "o-crimson", names: { en: "Crimson Gold" }, bg: "#5c0612", frame: "#d4af37", frame2: "#f3e5ab", ink: "#fff5f5", label: "#f3e5ab", title: "#f3e5ab", headInk: "#f3e5ab", panel: "rgba(0,0,0,0.35)", top: "crimson" },
  { id: "o-sapphire", names: { en: "Sapphire Blue" }, bg: "#f8fafc", frame: "#1e3a8a", frame2: "#d4af37", ink: "#0f172a", label: "#1e3a8a", title: "#1e3a8a", headInk: "#1e3a8a", panel: "#ffffff", top: "sapphire" },
  { id: "o-emerald", names: { en: "Emerald Vine" }, bg: "#f0fdf4", frame: "#14532d", frame2: "#d4af37", ink: "#052e16", label: "#14532d", title: "#14532d", headInk: "#f3e5ab", panel: "rgba(255,255,255,0.92)", top: "emerald", headFill: "#14532d", bismillah: true },
  { id: "o-blush", names: { en: "Blush Rose" }, bg: "#fff5f7", frame: "#be185d", frame2: "#f472b6", ink: "#4c0519", label: "#be185d", title: "#9d174d", headInk: "#be185d", panel: "#ffffff", top: "blush" },
];

export function renderOrnate(th: OrnateTheme, data: Biodata) {
  return (
    <div className="relative h-full w-full p-11" style={{ background: th.bg, color: th.ink }}>
      <div className="text-center pt-2 pb-3">
        <div className="flex justify-center mb-1">
          <GaneshaIcon className="h-10 w-10" />
        </div>
        <h1 className="mt-1 text-[26px] font-black tracking-widest uppercase">
          {data.name || "Your Name"}
        </h1>
      </div>
    </div>
  );
}