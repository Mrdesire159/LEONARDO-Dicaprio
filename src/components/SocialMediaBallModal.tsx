import { useState, useEffect, useRef } from 'react';
import {
  Globe,
  X,
  ExternalLink,
  ShieldCheck,
  Send,
  Sparkles,
  RotateCw,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { LuxuryTheme } from '../types';
import { THEME_CONFIGS, SOCIAL_MEDIA_HANDLES } from '../data/diCaprioData';

interface SocialMediaBallModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: LuxuryTheme;
}

type HandleKey = 'instagram' | 'telegram' | 'facebook';

export function SocialMediaBallModal({
  isOpen,
  onClose,
  currentTheme,
}: SocialMediaBallModalProps) {
  const themeConfig = THEME_CONFIGS[currentTheme];

  // 3D Ball Rotation State
  const [rotationX, setRotationX] = useState<number>(-12);
  const [rotationY, setRotationY] = useState<number>(35);
  const [isAutoOrbiting, setIsAutoOrbiting] = useState<boolean>(true);
  const [activeHandle, setActiveHandle] = useState<HandleKey>('instagram');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number }>({
    x: 0,
    y: 0,
    rotX: -12,
    rotY: 35,
  });

  // Auto-orbit animation loop
  useEffect(() => {
    if (!isOpen || !isAutoOrbiting || isDragging) return;

    const interval = setInterval(() => {
      setRotationY((prev) => (prev + 0.65) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, [isOpen, isAutoOrbiting, isDragging]);

  // Handle Drag / Touch rotation of the Ball
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotationX,
      rotY: rotationY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    setRotationY(dragStartRef.current.rotY + deltaX * 0.5);
    setRotationX(Math.max(-60, Math.min(60, dragStartRef.current.rotX - deltaY * 0.4)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      rotX: rotationX,
      rotY: rotationY,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartRef.current.x;
    const deltaY = touch.clientY - dragStartRef.current.y;
    setRotationY(dragStartRef.current.rotY + deltaX * 0.6);
    setRotationX(Math.max(-60, Math.min(60, dragStartRef.current.rotX - deltaY * 0.5)));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Smoothly rotate the ball to focus directly on a handle
  const focusHandle = (handleKey: HandleKey) => {
    setActiveHandle(handleKey);
    setIsAutoOrbiting(false);
    if (handleKey === 'instagram') {
      setRotationY(0);
      setRotationX(-10);
    } else if (handleKey === 'telegram') {
      setRotationY(-120);
      setRotationX(-10);
    } else if (handleKey === 'facebook') {
      setRotationY(-240);
      setRotationX(-10);
    }
  };

  if (!isOpen) return null;

  const currentHandleData = SOCIAL_MEDIA_HANDLES[activeHandle];

  // Specific data for the 3 handles
  const handlesConfig: Record<
    HandleKey,
    {
      angle: number;
      name: string;
      handle: string;
      platform: string;
      followers: string;
      verified: string;
      url: string;
      color: string;
      badgeGradient: string;
      description: string;
      iconType: 'ig' | 'telegram' | 'facebook';
    }
  > = {
    instagram: {
      angle: 0,
      name: 'Instagram Verified',
      handle: '@leonardodicaprio',
      platform: 'Instagram',
      followers: '62.1M+ Followers',
      verified: 'Meta Verified · Official Public Figure',
      url: SOCIAL_MEDIA_HANDLES.instagram.url,
      color: '#E4405F',
      badgeGradient: 'from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
      description:
        'The primary official portal for planetary environmental initiatives, wildlife protection, and cinema project announcements.',
      iconType: 'ig',
    },
    telegram: {
      angle: 120,
      name: 'Telegram Channel',
      handle: '@leonardodicap1974',
      platform: 'Telegram',
      followers: 'Verified Broadcast',
      verified: 'Official Channel Broadcast',
      url: SOCIAL_MEDIA_HANDLES.telegram.url,
      color: '#229ED9',
      badgeGradient: 'from-[#0088cc] via-[#229ED9] to-[#54c4f8]',
      description:
        'Direct, instant dispatches, urgent climate actions, and exclusive behind-the-scenes cinema chronicles from Leonardo.',
      iconType: 'telegram',
    },
    facebook: {
      angle: 240,
      name: 'Facebook Official',
      handle: '@LeonardoDiCaprio',
      platform: 'Facebook',
      followers: '19.2M+ Followers',
      verified: 'Blue Badge Verified Community',
      url: SOCIAL_MEDIA_HANDLES.facebook.url,
      color: '#1877F2',
      badgeGradient: 'from-[#1877F2] via-[#0d65d9] to-[#2583ff]',
      description:
        'Official press tour updates, red carpet galleries, Earth Alliance grants, and historic cinema retrospects.',
      iconType: 'facebook',
    },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/20 bg-zinc-950/95 p-6 sm:p-8 shadow-2xl text-white"
        style={{
          boxShadow: `0 0 80px ${themeConfig.accent}20, 0 25px 50px -12px rgba(0, 0, 0, 0.9)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 hover:bg-white/15 hover:text-white transition-colors"
          aria-label="Close Social Ball Modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Globe className="h-4 w-4" />
              <span>Celestial Ball Form · 3 Official Handles</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-white mt-1">
              The Leonardo DiCaprio <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Social Sphere</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Interactive 3D celestial ball showcasing all 3 verified digital channels. Drag the sphere to rotate 360° or tap any satellite handle.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              3 Verified Channels
            </span>
          </div>
        </div>

        {/* 3D BALL FORM DISPLAY CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT: THE INTERACTIVE 3D CELESTIAL BALL */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            {/* Interactive 3D Sphere Stage */}
            <div
              className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none perspective-1000"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* External Ambient Halo */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-40 transition-colors duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${handlesConfig[activeHandle].color}60 0%, transparent 70%)`,
                }}
              />

              {/* Equator & Celestial Orbit Rings */}
              <div
                className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-white/20 pointer-events-none transition-transform duration-700"
                style={{
                  transform: `rotateX(65deg) rotateZ(${rotationY}deg)`,
                }}
              />
              <div
                className="absolute w-[290px] h-[290px] sm:w-[350px] sm:h-[350px] rounded-full border border-amber-400/25 pointer-events-none transition-transform duration-700"
                style={{
                  transform: `rotateY(55deg) rotateX(${rotationX}deg)`,
                }}
              />

              {/* THE 3D BALL BODY */}
              <div
                className="relative w-[210px] h-[210px] sm:w-[250px] sm:h-[250px] rounded-full shadow-2xl transition-transform ease-out flex items-center justify-center"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                  background: 'radial-gradient(circle at 30% 30%, #27272a 0%, #09090b 60%, #000000 100%)',
                  boxShadow: `inset -15px -15px 40px rgba(0, 0, 0, 0.9), inset 10px 10px 25px rgba(255, 255, 255, 0.25), 0 0 50px ${handlesConfig[activeHandle].color}40`,
                }}
              >
                {/* Frosted Glass Longitudinal / Latitudinal Sphere Grid lines */}
                <div className="absolute inset-2 rounded-full border border-white/15 opacity-60 pointer-events-none" />
                <div className="absolute inset-6 rounded-full border border-white/10 opacity-40 pointer-events-none" />

                {/* Sphere Specular Glare Reflection */}
                <div
                  className="absolute top-3 left-6 h-14 w-24 rounded-full opacity-35 blur-[2px] pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, transparent 80%)',
                    transform: 'rotate(-30deg)',
                  }}
                />

                {/* Core Monogram Center of the Ball */}
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/80 font-cinzel text-lg font-bold tracking-widest text-amber-200 shadow-xl backdrop-blur-md"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  LD
                </div>

                {/* THE THREE SATELLITE HANDLES ON THE BALL FORM */}
                {(['instagram', 'telegram', 'facebook'] as HandleKey[]).map((key) => {
                  const cfg = handlesConfig[key];
                  const angleRad = ((cfg.angle + rotationY) * Math.PI) / 180;
                  const radius = 125; // Distance from center of sphere
                  const x = Math.sin(angleRad) * radius;
                  const z = Math.cos(angleRad) * radius;
                  const isFront = z > 0;
                  const isSelected = activeHandle === key;

                  return (
                    <div
                      key={key}
                      onClick={(e) => {
                        e.stopPropagation();
                        focusHandle(key);
                      }}
                      className="absolute flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
                      style={{
                        transform: `translateX(${x}px) translateZ(${z}px) scale(${isSelected ? 1.15 : isFront ? 1.0 : 0.8})`,
                        opacity: isFront ? 1 : 0.45,
                        zIndex: isFront ? 20 : 5,
                      }}
                    >
                      {/* Satellite Node Orb */}
                      <div
                        className={`relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border-2 p-1 shadow-2xl transition-all duration-300 ${
                          isSelected
                            ? 'ring-4 ring-white/50 scale-110'
                            : 'hover:scale-105'
                        }`}
                        style={{
                          borderColor: cfg.color,
                          backgroundColor: '#09090b',
                          boxShadow: `0 0 25px ${cfg.color}`,
                        }}
                      >
                        {/* Inner Gradient Core */}
                        <div
                          className={`flex h-full w-full items-center justify-center rounded-full font-bold text-white shadow-inner ${
                            cfg.iconType === 'ig'
                              ? 'bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737]'
                              : cfg.iconType === 'telegram'
                              ? 'bg-[#229ED9]'
                              : 'bg-[#1877F2]'
                          }`}
                        >
                          {cfg.iconType === 'ig' && <span className="font-sans font-black text-sm">IG</span>}
                          {cfg.iconType === 'telegram' && <Send className="h-6 w-6 text-white ml-0.5" />}
                          {cfg.iconType === 'facebook' && <span className="font-sans font-bold text-xl">f</span>}
                        </div>

                        {/* Orbiting Ring Indicator if Active */}
                        {isSelected && (
                          <span
                            className="absolute -inset-1 rounded-full animate-ping opacity-30"
                            style={{ backgroundColor: cfg.color }}
                          />
                        )}
                      </div>

                      {/* Floating Label Under Node */}
                      <div
                        className="mt-2 whitespace-nowrap rounded-lg border border-white/20 bg-black/90 px-2.5 py-0.5 text-[11px] font-bold tracking-wider backdrop-blur-md shadow-lg"
                        style={{ color: isSelected ? cfg.color : '#e2e8f0' }}
                      >
                        {cfg.handle}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ball Interactive Controls & Quick Switchers */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setIsAutoOrbiting(!isAutoOrbiting)}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                  isAutoOrbiting
                    ? 'border-amber-400/40 bg-amber-400/10 text-amber-300'
                    : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                <RotateCw className={`h-3.5 w-3.5 ${isAutoOrbiting ? 'animate-spin' : ''}`} />
                <span>{isAutoOrbiting ? 'Auto-Orbiting' : 'Orbit Paused'}</span>
              </button>

              <button
                onClick={() => {
                  setRotationX(-12);
                  setRotationY(35);
                  setIsAutoOrbiting(true);
                }}
                className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-all"
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Reset Sphere</span>
              </button>
            </div>
          </div>

          {/* RIGHT: ACTIVE HANDLE CREDENTIALS & DIRECT VISIT LAUNCHER */}
          <div className="lg:col-span-5 space-y-4">
            {/* Quick 3-Handle Tab Switcher */}
            <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
              {(['instagram', 'telegram', 'facebook'] as HandleKey[]).map((key) => {
                const cfg = handlesConfig[key];
                const isActive = activeHandle === key;
                return (
                  <button
                    key={key}
                    onClick={() => focusHandle(key)}
                    className={`rounded-xl py-2 px-1 text-center text-xs font-bold transition-all capitalize ${
                      isActive
                        ? 'bg-white text-black shadow-lg scale-102'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>

            {/* Detailed Handle Card */}
            <div
              className="rounded-3xl border p-6 transition-all duration-500 relative overflow-hidden"
              style={{
                borderColor: `${handlesConfig[activeHandle].color}60`,
                background: `linear-gradient(135deg, ${handlesConfig[activeHandle].color}12 0%, rgba(9, 9, 11, 0.95) 100%)`,
                boxShadow: `0 10px 30px ${handlesConfig[activeHandle].color}25`,
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white font-bold text-lg shadow-lg"
                    style={{ backgroundColor: handlesConfig[activeHandle].color }}
                  >
                    {activeHandle === 'instagram' && 'IG'}
                    {activeHandle === 'telegram' && <Send className="h-6 w-6 text-white ml-0.5" />}
                    {activeHandle === 'facebook' && 'f'}
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-white">
                      {handlesConfig[activeHandle].name}
                    </h3>
                    <p
                      className="text-xs font-mono font-bold"
                      style={{ color: handlesConfig[activeHandle].color }}
                    >
                      {handlesConfig[activeHandle].handle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </div>
              </div>

              {/* Follower Stats */}
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/50 p-3 mb-4">
                <span className="text-xs text-zinc-400">Audience & Reach:</span>
                <span className="font-cinzel text-sm font-extrabold text-white">
                  {handlesConfig[activeHandle].followers}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300 leading-relaxed font-light mb-6">
                {handlesConfig[activeHandle].description}
              </p>

              {/* Direct Launch Button */}
              <a
                href={handlesConfig[activeHandle].url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl transition-all hover:scale-102 active:scale-98"
                style={{
                  backgroundColor: handlesConfig[activeHandle].color,
                  boxShadow: `0 8px 20px ${handlesConfig[activeHandle].color}40`,
                }}
              >
                <span>Visit {handlesConfig[activeHandle].platform} ({handlesConfig[activeHandle].handle})</span>
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Quick All 3 Handles List */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
                All 3 Official Handles in the Ball:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['instagram', 'telegram', 'facebook'] as HandleKey[]).map((key) => {
                  const cfg = handlesConfig[key];
                  return (
                    <a
                      key={key}
                      href={cfg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-zinc-300 hover:bg-white/10 hover:border-white/20 transition-all group"
                    >
                      <span className="font-mono text-[11px] truncate">{cfg.handle}</span>
                      <ExternalLink className="h-3 w-3 text-zinc-500 group-hover:text-white shrink-0 ml-1" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
