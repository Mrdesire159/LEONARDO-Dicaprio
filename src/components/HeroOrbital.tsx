import { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Film,
  Award,
  CreditCard,
  Globe,
  Archive,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { LuxuryTheme, PhotoAsset } from '../types';
import { THEME_CONFIGS } from '../data/diCaprioData';

interface HeroOrbitalProps {
  currentTheme: LuxuryTheme;
  reducedMotion?: boolean;
  activeHeroPhoto: PhotoAsset;
  onSelectPhotoModal: (photo: PhotoAsset) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenSocialBall?: () => void;
}

export function HeroOrbital({
  currentTheme,
  activeHeroPhoto,
  onSelectPhotoModal,
  onNavigateSection,
  onOpenSocialBall,
}: HeroOrbitalProps) {
  // Balanced stationary layout for pods
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [hoveredPod, setHoveredPod] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const themeConfig = THEME_CONFIGS[currentTheme];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobileScreen) return; // Don't drag-rotate on phones
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isMobileScreen) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = e.clientX;
    setOrbitAngle((prev) => (prev + dx * 0.12) % 360);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 5 synchronized orbital pods
  const orbitalPods = [
    {
      id: 'film-reel',
      title: 'Film Reel Timeline',
      subtitle: '30+ Years of Masterpieces',
      tag: 'Cerebral Cinema',
      icon: Film,
      angleOffset: 0,
      radius: 260,
      color: '#f59e0b',
      target: '#film-reel',
    },
    {
      id: 'awards',
      title: 'Academy Awards & Honors',
      subtitle: 'Oscar, BAFTA & 3x Globes',
      tag: 'Trophy Gallery',
      icon: Award,
      angleOffset: 72,
      radius: 275,
      color: '#eab308',
      target: '#awards',
    },
    {
      id: 'vip-store',
      title: 'Meet & Greet VIP Store',
      subtitle: 'Gold ($10K), Silver ($5K), Platinum ($1K)',
      tag: 'VIP Cards',
      icon: CreditCard,
      angleOffset: 144,
      radius: 260,
      color: '#38bdf8',
      target: '#vip-store',
    },
    {
      id: 'earth-alliance',
      title: 'Earth Alliance & UN Peace',
      subtitle: '$100M+ Conservation Defense',
      tag: 'Environmental Mission',
      icon: Globe,
      angleOffset: 216,
      radius: 280,
      color: '#10b981',
      target: '#biography',
    },
    {
      id: 'archival-vault',
      title: 'Archival Vault Memorabilia',
      subtitle: 'Signed Scripts & 35mm Cells',
      tag: 'Authentic Rarities',
      icon: Archive,
      angleOffset: 288,
      radius: 265,
      color: '#f43f5e',
      target: '#vip-store',
    },
  ];

  return (
    <section
      id="multiverse"
      className="relative min-h-[92vh] w-full overflow-hidden pt-28 pb-16 flex flex-col justify-center items-center"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Dynamic Ambient Background Illumination */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[650px] w-[650px] -translate-x-1/2 rounded-full blur-[140px] transition-all duration-700 opacity-40"
        style={{ backgroundColor: themeConfig.accent }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#030305_75%)]" />

      {/* Hero Header Typography */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 backdrop-blur-md mb-6">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-200">
            Official Cinema &amp; Humanitarian Monograph
          </span>
        </div>

        <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-none drop-shadow-2xl">
          LEONARDO <span className={`bg-gradient-to-r ${themeConfig.gradientText} bg-clip-text text-transparent`}>DICAPRIO</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
          Academy Award Winner · Environmental Statesman · Cultural Luminary. Explore three decades of legendary cinema, historic accolades, and reserve an exclusive private audience with cinema’s most visionary leading actor.
        </p>
      </div>

      {/* CENTRAL CORE: LEO PORTRAIT */}
      <div className="relative z-20 mt-8 flex flex-col items-center">
        {/* Central Portrait Container */}
        <div
          className="relative h-44 w-44 sm:h-56 sm:w-56 rounded-full p-1.5 transition-transform duration-700 ease-out group shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${themeConfig.accent}, #ffffff33, ${themeConfig.accent})`,
            boxShadow: `0 0 50px -10px ${themeConfig.accent}88`,
          }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-black/80 bg-zinc-900">
            <img
              src={activeHeroPhoto.url}
              alt={activeHeroPhoto.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = activeHeroPhoto.fallbackUrl;
              }}
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
            />

            {/* Holographic light sweep */}
            <div className="pointer-events-none absolute inset-0 hologram-shimmer opacity-40" />

            {/* Quick Inspect Button on Hover/Tap */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectPhotoModal(activeHeroPhoto);
              }}
              title="Inspect High-Res Portrait"
              className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="flex items-center gap-1.5 rounded-full border border-white/30 bg-black/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                <Maximize2 className="h-3.5 w-3.5 text-amber-300" />
                <span>Inspect Portrait</span>
              </div>
            </button>
          </div>

          {/* Central Glow Orb Halo */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-black/90 px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase text-amber-200 shadow-lg backdrop-blur-md"
            style={{ borderColor: themeConfig.accent }}
          >
            Cinematic Centerpiece
          </div>
        </div>
      </div>

      {/* FEATURE PODS (Mobile Grid) */}
      <div className="w-full max-w-4xl px-4 mt-10 lg:hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {orbitalPods.map((pod) => {
            const Icon = pod.icon;
            return (
              <button
                key={pod.id}
                onClick={() => onNavigateSection(pod.target)}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-white/15 bg-zinc-950/90 text-left transition-all active:scale-98 shadow-xl"
                style={{
                  borderLeftColor: pod.color,
                  borderLeftWidth: '4px',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                    style={{
                      backgroundColor: `${pod.color}22`,
                      borderColor: `${pod.color}66`,
                      color: pod.color,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: pod.color }}>
                      {pod.tag}
                    </span>
                    <h3 className="font-cinzel text-sm font-bold text-white">
                      {pod.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400">{pod.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* DESKTOP 3D SYNCHRONIZED ORBITAL STAGE (Desktop Only) */}
      <div
        className="hidden lg:flex relative mt-4 h-[520px] w-full max-w-5xl select-none items-center justify-center cursor-grab active:cursor-grabbing perspective-1500"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        {/* 3D Elliptical Orbital Ring Track */}
        <div
          className="pointer-events-none absolute inset-0 m-auto h-[480px] w-[480px] rounded-full border border-white/10 opacity-60"
          style={{
            transform: 'scaleY(0.72) rotateZ(-12deg)',
            boxShadow: `inset 0 0 40px ${themeConfig.accent}15`,
          }}
        />

        {/* Orbiting Feature Pods */}
        {orbitalPods.map((pod) => {
          const totalAngle = (orbitAngle + pod.angleOffset) * (Math.PI / 180);
          const scaleY = 0.68;
          const x = Math.cos(totalAngle) * pod.radius;
          const y = Math.sin(totalAngle) * (pod.radius * scaleY);
          const zDepth = (Math.sin(totalAngle) + 1) / 2;
          const scale = 0.82 + zDepth * 0.32;
          const zIndex = Math.round(zDepth * 30);
          const Icon = pod.icon;
          const isHovered = hoveredPod === pod.id;

          return (
            <div
              key={pod.id}
              className="absolute transition-transform duration-100 ease-linear cursor-pointer"
              style={{
                transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                zIndex,
              }}
              onMouseEnter={() => setHoveredPod(pod.id)}
              onMouseLeave={() => setHoveredPod(null)}
              onClick={() => onNavigateSection(pod.target)}
            >
              <div
                className={`group relative flex items-center gap-3 rounded-2xl border p-3 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
                  isHovered
                    ? 'border-white/50 bg-zinc-900/95 ring-2 ring-white/30 scale-105'
                    : 'border-white/15 bg-zinc-950/80 hover:border-white/30'
                }`}
                style={{
                  boxShadow: isHovered ? `0 0 30px ${pod.color}66` : '0 10px 30px rgba(0,0,0,0.6)',
                }}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${pod.color}22`,
                    borderColor: `${pod.color}66`,
                    color: pod.color,
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex flex-col pr-2 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: pod.color }}>
                      {pod.tag}
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-[9px] text-zinc-400">Click to enter</span>
                  </div>
                  <h3 className="font-cinzel text-xs sm:text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                    {pod.title}
                  </h3>
                  <p className="text-[10px] text-zinc-400 line-clamp-1">{pod.subtitle}</p>
                </div>

                <ChevronRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-white" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Orbit Footer Quick-Jump Prompts */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-4 px-4 text-xs">
        <button
          onClick={() => onNavigateSection('#vip-store')}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3 font-bold text-black shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ boxShadow: themeConfig.neonShadow }}
        >
          <CreditCard className="h-4 w-4" />
          <span>Gold VIP ($10K) · Silver ($5K) · Platinum ($1K)</span>
        </button>

        <button
          onClick={() => onNavigateSection('#film-reel')}
          className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40"
        >
          <Film className="h-4 w-4 text-amber-300" />
          <span>Explore 35mm Film Reel</span>
        </button>

        {onOpenSocialBall && (
          <button
            onClick={onOpenSocialBall}
            className="flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-950/40 px-6 py-3 font-semibold text-cyan-200 backdrop-blur-md transition-all hover:bg-cyan-900/50 hover:border-cyan-400 shadow-lg"
          >
            <Globe className="h-4 w-4 text-cyan-300" />
            <span>3D Social Ball (3 Handles)</span>
          </button>
        )}
      </div>
    </section>
  );
}
