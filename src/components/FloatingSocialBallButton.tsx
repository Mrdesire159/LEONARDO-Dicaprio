import { Globe, Sparkles } from 'lucide-react';
import { LuxuryTheme } from '../types';
import { THEME_CONFIGS } from '../data/diCaprioData';

interface FloatingSocialBallButtonProps {
  onClick: () => void;
  currentTheme: LuxuryTheme;
}

export function FloatingSocialBallButton({
  onClick,
  currentTheme,
}: FloatingSocialBallButtonProps) {
  const themeConfig = THEME_CONFIGS[currentTheme];

  return (
    <aside aria-label="Official Social Media Ball Navigation" className="fixed bottom-6 right-6 z-40 flex items-center">
      <button
        onClick={onClick}
        title="Open 3D Social Media Ball (Instagram, Telegram, Facebook)"
        className="group relative flex items-center gap-3 rounded-2xl border border-white/20 bg-black/85 p-2 sm:px-4 sm:py-2.5 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-amber-400/50 hover:bg-zinc-950 active:scale-95"
        style={{
          boxShadow: `0 8px 30px rgba(0, 0, 0, 0.7), 0 0 25px ${themeConfig.accent}30`,
        }}
        aria-label="Display 3D Social Media Ball with all 3 official handles"
      >
        {/* Animated 3D Mini Celestial Ball Icon */}
        <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/30 bg-gradient-to-tr from-zinc-900 via-black to-zinc-800 shadow-inner overflow-hidden">
          {/* Internal rotating glow */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.4)_0%,_transparent_60%)] pointer-events-none" />

          {/* 3 Orbiting dots for the 3 handles (Instagram, Telegram, Facebook) */}
          <span className="absolute top-1 left-2 h-2 w-2 rounded-full bg-[#E4405F] shadow-[0_0_8px_#E4405F]" />
          <span className="absolute bottom-1 right-2 h-2 w-2 rounded-full bg-[#229ED9] shadow-[0_0_8px_#229ED9]" />
          <span className="absolute top-3 right-1 h-2 w-2 rounded-full bg-[#1877F2] shadow-[0_0_8px_#1877F2]" />

          <Globe className="h-5 w-5 text-amber-300 relative z-10 transition-transform duration-700 group-hover:rotate-180" />
        </div>

        {/* Text Details (Responsive) */}
        <div className="hidden sm:flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-cinzel text-xs font-bold tracking-wider text-white group-hover:text-amber-200 transition-colors">
              Social Media Ball
            </span>
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-[10px] font-mono text-zinc-400">
            3 Official Handles in 3D Orb
          </span>
        </div>

        {/* Pulsing Accent Ring */}
        <span
          className="pointer-events-none absolute -inset-1 rounded-2xl opacity-20 transition-opacity group-hover:opacity-40 animate-pulse"
          style={{
            border: `1.5px solid ${themeConfig.accent}`,
          }}
        />
      </button>
    </aside>
  );
}
