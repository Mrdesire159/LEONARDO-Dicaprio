import { useState, useRef } from 'react';
import { Info, ArrowRight, ShieldCheck, QrCode, Sparkles, CreditCard } from 'lucide-react';
import { StoreItem, LuxuryTheme } from '../types';
import { THEME_CONFIGS } from '../data/diCaprioData';

interface PhysicalMetalCardProps {
  type: 'gold' | 'silver';
  item: StoreItem;
  currentTheme: LuxuryTheme;
  onAddToCart?: (item: StoreItem) => void;
  onInstantBuy: (item: StoreItem) => void;
}

export function PhysicalMetalCard({
  type,
  item,
  currentTheme,
  onInstantBuy,
}: PhysicalMetalCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ rotateX: 0, rotateY: 0, sheenX: 50, sheenY: 50 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  const isGold = type === 'gold';
  const themeConfig = THEME_CONFIGS[currentTheme];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable 3D tilt tracking on touch/mobile devices or narrow viewports to avoid jitter & scroll interference
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = -((y - centerY) / centerY) * 12;
    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;

    setMouseTilt({ rotateX, rotateY, sheenX, sheenY });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ rotateX: 0, rotateY: 0, sheenX: 50, sheenY: 50 });
  };

  const handleFlipToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-full rounded-3xl border border-white/15 bg-zinc-950/80 p-6 sm:p-7 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-amber-400/40">
      {/* Top Header of the Listing */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-lg px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider ${
              isGold
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/30'
                : 'bg-slate-200 text-slate-900 shadow-lg shadow-slate-200/20'
            }`}
          >
            {isGold ? 'Gold VIP Card' : 'Silver Card'}
          </span>
          <span className="text-xs font-semibold text-zinc-400">Pure Metal Series</span>
        </div>

        {/* Card Flip Tool */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleFlipToggle}
            title="Flip to back for NFC & authentication serial"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 h-8 text-xs font-semibold text-zinc-300 hover:text-white hover:border-amber-400/40 transition-all"
          >
            <Info className="h-3.5 w-3.5 text-amber-300" />
            <span>{isFlipped ? 'Show Front Face' : 'Flip to Inspect NFC'}</span>
          </button>
        </div>
      </div>

      {/* 3D PURE METAL CARD DISPLAY CONTAINER */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="perspective-1500 my-2 w-full flex items-center justify-center select-none cursor-pointer"
        onClick={handleFlipToggle}
      >
        <div
          className="relative w-full max-w-[340px] aspect-[1/1.5] rounded-3xl transition-transform duration-700 transform-style-3d shadow-2xl"
          style={{
            transform: `rotateX(${mouseTilt.rotateX}deg) rotateY(${
              (isFlipped ? 180 : 0) + mouseTilt.rotateY
            }deg)`,
            boxShadow: isGold
              ? '0 20px 45px -10px rgba(212, 175, 55, 0.4)'
              : '0 20px 45px -10px rgba(160, 174, 192, 0.35)',
          }}
        >
          {/* FRONT FACE: THE EXACT BRUSHED PURE METAL CARD FROM USER IMAGE */}
          <div
            className="absolute inset-0 w-full h-full rounded-3xl p-5 sm:p-6 flex flex-col justify-between backface-hidden overflow-hidden border-4"
            style={{
              borderColor: isGold ? '#aa8210' : '#64748b',
              background: isGold
                ? `radial-gradient(circle at ${mouseTilt.sheenX}% ${mouseTilt.sheenY}%, #fff3be 0%, #e8c464 25%, #d4af37 55%, #946f0f 100%)`
                : `radial-gradient(circle at ${mouseTilt.sheenX}% ${mouseTilt.sheenY}%, #ffffff 0%, #e2e8f0 25%, #cbd5e1 55%, #64748b 100%)`,
            }}
          >
            {/* Dynamic Specular Metallic Sheen Glare */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay transition-opacity"
              style={{
                background: `linear-gradient(${mouseTilt.sheenX * 3.6}deg, transparent 20%, rgba(255,255,255,0.9) 50%, transparent 80%)`,
              }}
            />

            {/* Inner Debossed Bezel Frame Line */}
            <div
              className="absolute inset-3.5 rounded-2xl border-2 pointer-events-none"
              style={{
                borderColor: isGold ? 'rgba(74, 50, 4, 0.7)' : 'rgba(30, 41, 59, 0.65)',
                boxShadow: isGold
                  ? 'inset 0 0 10px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,248,204,0.4)'
                  : 'inset 0 0 10px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.6)',
              }}
            />

            {/* 1. TOP ENGRAVED TEXT: LEONARDO DICAPRIO */}
            <div className="relative z-10 text-center pt-2">
              <h4
                className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.24em] leading-tight"
                style={{
                  color: isGold ? '#3d2902' : '#0f172a',
                  textShadow: isGold
                    ? '1px 1px 1px #fff8cc, -0.5px -0.5px 1px #221501'
                    : '1px 1px 1px #ffffff, -0.5px -0.5px 1px #1e293b',
                }}
              >
                LEONARDO
              </h4>
              <h4
                className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.24em] leading-tight"
                style={{
                  color: isGold ? '#3d2902' : '#0f172a',
                  textShadow: isGold
                    ? '1px 1px 1px #fff8cc, -0.5px -0.5px 1px #221501'
                    : '1px 1px 1px #ffffff, -0.5px -0.5px 1px #1e293b',
                }}
              >
                DiCAPRIO
              </h4>
            </div>

            {/* 2. DUAL CIRCULAR EMBLEM: FILM REEL + CONSERVATION TREE */}
            <div className="relative z-10 flex flex-col items-center my-auto">
              <div
                className="h-14 w-14 rounded-full border-2 flex items-center justify-center p-1.5 shadow-sm"
                style={{
                  borderColor: isGold ? '#3d2902' : '#0f172a',
                  boxShadow: isGold
                    ? 'inset 1px 1px 2px rgba(0,0,0,0.3), 0.5px 0.5px 0 #fff8cc'
                    : 'inset 1px 1px 2px rgba(0,0,0,0.3), 0.5px 0.5px 0 #ffffff',
                }}
              >
                <div className="flex items-center gap-1">
                  {/* Film reel mini symbol */}
                  <div
                    className="h-6 w-6 rounded-full border flex items-center justify-center"
                    style={{ borderColor: isGold ? '#3d2902' : '#0f172a' }}
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: isGold ? '#3d2902' : '#0f172a' }}
                    />
                  </div>
                  {/* Earth conservation tree mini symbol */}
                  <div
                    className="text-xs font-bold"
                    style={{ color: isGold ? '#3d2902' : '#0f172a' }}
                  >
                    🌳
                  </div>
                </div>
              </div>

              {/* 3. CARD TITLE WRITTEN ON CARD:
                  Gold: "EXCLUSIVE VIP GREET & MEET EXPERIENCE"
                  Silver: "EXCLUSIVE GREET & MEET EXPERIENCE" */}
              <div className="text-center mt-3 font-cinzel">
                <p
                  className="text-[11px] font-bold tracking-[0.28em] uppercase"
                  style={{
                    color: isGold ? '#3d2902' : '#0f172a',
                    textShadow: isGold ? '0.5px 0.5px 0 #fff8cc' : '0.5px 0.5px 0 #ffffff',
                  }}
                >
                  EXCLUSIVE
                </p>
                <p
                  className="text-sm font-extrabold tracking-[0.22em] uppercase my-0.5"
                  style={{
                    color: isGold ? '#3d2902' : '#0f172a',
                    textShadow: isGold ? '0.5px 0.5px 0 #fff8cc' : '0.5px 0.5px 0 #ffffff',
                  }}
                >
                  {isGold ? 'VIP GREET & MEET' : 'GREET & MEET'}
                </p>
                <p
                  className="text-[11px] font-bold tracking-[0.28em] uppercase"
                  style={{
                    color: isGold ? '#3d2902' : '#0f172a',
                    textShadow: isGold ? '0.5px 0.5px 0 #fff8cc' : '0.5px 0.5px 0 #ffffff',
                  }}
                >
                  EXPERIENCE
                </p>
              </div>
            </div>

            {/* 4. BOTTOM ENGRAVED CAMEO PROFILE OF LEONARDO DICAPRIO */}
            <div className="relative z-10 flex flex-col items-center pb-2">
              <div
                className="h-24 w-24 rounded-full border-2 overflow-hidden flex items-center justify-center p-1 relative shadow-inner"
                style={{
                  borderColor: isGold ? '#4a3204' : '#1e293b',
                  backgroundColor: isGold ? 'rgba(74, 50, 4, 0.08)' : 'rgba(30, 41, 59, 0.06)',
                }}
              >
                {/* SVG profile etching */}
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full"
                  style={{ fill: isGold ? '#3d2902' : '#0f172a' }}
                >
                  <path d="M 28,82 C 32,68 35,52 30,38 C 26,24 22,12 32,-2 C 38,-10 50,-16 64,-14 C 76,-13 86,-4 90,8 C 94,16 92,24 88,28 C 94,30 98,36 100,42 C 102,48 96,54 90,56 C 96,60 98,66 96,70 C 94,76 88,80 82,82 C 86,88 82,94 74,100 C 66,106 54,108 44,106 C 36,104 26,104 20,102 Z" />
                </svg>
              </div>
              <span
                className="mt-1 font-mono text-[9px] font-bold uppercase tracking-widest"
                style={{ color: isGold ? '#553a04' : '#334155' }}
              >
                {isGold ? 'VIP 24K METAL' : 'STERLING METAL'}
              </span>
            </div>
          </div>

          {/* BACK FACE (Flipped 180°): NFC Smart Chip & Serial Details */}
          <div
            className="absolute inset-0 w-full h-full rounded-3xl p-6 flex flex-col justify-between rotate-y-180 backface-hidden bg-zinc-950 border-4 shadow-2xl"
            style={{
              borderColor: isGold ? '#d4af37' : '#cbd5e1',
            }}
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <QrCode className="h-4 w-4" style={{ color: isGold ? '#f59e0b' : '#38bdf8' }} />
                  <span className="font-mono text-xs font-bold text-white tracking-widest">
                    {isGold ? 'VIP-NFC-CHIP' : 'SLV-NFC-CHIP'}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400">
                  {isGold ? '#LD-GOLD-VIP-042' : '#LD-SLV-EXP-118'}
                </span>
              </div>

              {/* Metallic Magnetic Band & Hologram */}
              <div className="h-9 w-full bg-black -mx-6 mb-4 flex items-center px-6">
                <span className="font-mono text-[9px] text-zinc-600 tracking-widest">
                  //////////////////// ENCRYPTED VAULT TRACK ////////////////////
                </span>
              </div>

              <div className="space-y-2 text-xs text-zinc-300">
                <p className="font-cinzel text-sm font-bold text-white">
                  {isGold ? 'Gold VIP Greet & Meet Experience' : 'Silver Exclusive Experience'}
                </p>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                  {isGold
                    ? 'Grants access to intimate greenroom reception, 1-on-1 private portrait moment with Leonardo DiCaprio, and engraved commemorative 24K gold pure metal card.'
                    : 'Grants red carpet fan zone entry, reserved premiere orchestra seat, and serialized sterling silver pure metal commemorative card.'}
                </p>

                <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-300">Card Specifications:</span>
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>Dimensions:</span>
                    <span className="text-zinc-200">85.6mm × 53.98mm (CR80)</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>Weight & Composition:</span>
                    <span className="text-zinc-200">{isGold ? '45g / Brass & 24K Gold Plated' : '42g / Brushed Stainless Steel'}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>Security:</span>
                    <span className="text-emerald-400">NFC Encrypted & Tamper-Proof</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-300">
                Tap card to return front
              </span>
              <span className="text-xs font-bold text-white">${item.price.toLocaleString()} USD</span>
            </div>
          </div>
        </div>
      </div>

      {/* LISTING PRICE & PRODUCT DETAILS SECTION */}
      <div className="mt-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-white">
                {isGold ? 'Gold VIP Card' : 'Silver Card'}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">{item.subtitle}</p>
            </div>
            {/* Listing Price Tag */}
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Listing Price</span>
              <span className="font-cinzel text-2xl sm:text-3xl font-black text-white">
                ${item.price.toLocaleString()}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 block">USD / Physical Pass</span>
            </div>
          </div>

          {/* Key Perks */}
          <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3">
            {item.perks.slice(0, 3).map((perk, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3">
          <button
            onClick={() => onInstantBuy(item)}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold uppercase tracking-wider shadow-xl transition-all hover:scale-[1.02] active:scale-98 ${
              isGold
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black shadow-amber-500/20'
                : 'bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 text-black shadow-slate-300/20'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            <span>Reserve {isGold ? 'Gold VIP Pass ($10,000)' : 'Silver Card ($5,000)'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
