import { useState } from 'react';
import {
  Sparkles,
  Film,
  Award,
  CreditCard,
  Image,
  User,
  Globe,
  Menu,
  X
} from 'lucide-react';
import { LuxuryTheme } from '../types';
import { THEME_CONFIGS } from '../data/diCaprioData';

interface NavbarProps {
  currentTheme: LuxuryTheme;
  onSelectTheme?: (theme: LuxuryTheme) => void;
  reducedMotion?: boolean;
  onToggleReducedMotion?: () => void;
  ambientAudioPlaying?: boolean;
  onToggleAmbientAudio?: () => void;
  onOpenProfile: () => void;
  onOpenSocialBall: () => void;
  orderCount: number;
}

export function Navbar({
  currentTheme,
  onOpenProfile,
  onOpenSocialBall,
  orderCount,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const themeConfig = THEME_CONFIGS[currentTheme];

  const navLinks = [
    { label: 'Biography', href: '#biography', icon: User },
    { label: 'Film Reel', href: '#film-reel', icon: Film },
    { label: 'VIP Experience', href: '#vip-store', icon: CreditCard },
    { label: 'Honors', href: '#awards', icon: Award },
    { label: 'Portraits', href: '#gallery', icon: Image },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur-xl transition-colors duration-500">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Header */}
        <a
          href="#top"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold tracking-widest font-cinzel transition-all duration-300"
            style={{
              borderColor: themeConfig.accent,
              boxShadow: themeConfig.neonShadow,
              color: themeConfig.accent,
              background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.8) 100%)',
            }}
          >
            LD
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-base font-bold tracking-[0.2em] text-white group-hover:text-amber-200 transition-colors sm:text-lg">
              LEONARDO DICAPRIO
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400">
              The Official Experience
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 text-xs font-medium tracking-wider uppercase">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="group relative flex items-center gap-1.5 py-2 text-zinc-300 transition-colors hover:text-white"
              >
                <Icon className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: themeConfig.accent }} />
                <span>{link.label}</span>
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: themeConfig.accent }}
                />
              </button>
            );
          })}
        </nav>

        {/* Controls: Social Ball + Patron Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Separate Button to Display Social Media Handles in 3D Ball Form */}
          <button
            onClick={onOpenSocialBall}
            title="Display 3D Social Media Ball (Instagram, Telegram, Facebook)"
            className="relative flex h-10 items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 sm:px-3.5 text-xs font-semibold tracking-wide text-zinc-200 transition-all hover:border-amber-400/50 hover:bg-white/10 hover:text-white shadow-lg"
            aria-label="Display Social Media Handles in Ball Form"
          >
            <Globe className="h-4 w-4 text-amber-300" />
            <span className="hidden md:inline font-cinzel">Social Ball</span>
            <div className="flex items-center -space-x-1">
              <span className="h-2 w-2 rounded-full bg-[#E4405F]" title="Instagram" />
              <span className="h-2 w-2 rounded-full bg-[#229ED9]" title="Telegram" />
              <span className="h-2 w-2 rounded-full bg-[#1877F2]" title="Facebook" />
            </div>
          </button>

          {/* User Profile & Purchase History Button */}
          <button
            onClick={onOpenProfile}
            className="relative flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 text-xs font-semibold tracking-wide text-white transition-all hover:border-amber-400/40 hover:bg-white/10"
            aria-label="Open Patron Profile and Purchase History"
          >
            <User className="h-4 w-4 text-amber-300" />
            <span className="hidden sm:inline">VIP Purchases</span>
            {orderCount > 0 && (
              <span
                className="flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-black font-mono"
                style={{ backgroundColor: themeConfig.accent }}
              >
                {orderCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-300 xl:hidden hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-black/95 px-6 py-6 backdrop-blur-2xl xl:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {/* Mobile Social Ball Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSocialBall();
              }}
              className="flex items-center justify-between rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-3.5 py-3 text-left text-sm font-bold text-cyan-200"
            >
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-cyan-300" />
                <span>3D Social Media Ball (3 Handles)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-[#E4405F]" />
                <span className="h-2 w-2 rounded-full bg-[#229ED9]" />
                <span className="h-2 w-2 rounded-full bg-[#1877F2]" />
              </div>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="flex items-center gap-3 rounded-xl border border-amber-400/40 bg-amber-400/10 px-3.5 py-3 text-left text-sm font-bold text-amber-200"
            >
              <User className="h-4 w-4 text-amber-300" />
              <span>Patron Profile &amp; Purchase History ({orderCount})</span>
            </button>

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-zinc-300 hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" style={{ color: themeConfig.accent }} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
