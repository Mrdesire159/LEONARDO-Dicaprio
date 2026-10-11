import { useState } from 'react';
import {
  Award,
  Globe,
  Star,
  CheckCircle2,
  ShieldCheck,
  Quote,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { LuxuryTheme } from '../types';
import { THEME_CONFIGS, TESTIMONIALS, SOCIAL_PROOF_BADGES } from '../data/diCaprioData';

interface TestimonialsSocialProofProps {
  currentTheme: LuxuryTheme;
}

export function TestimonialsSocialProof({ currentTheme }: TestimonialsSocialProofProps) {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const themeConfig = THEME_CONFIGS[currentTheme];
  const activeTestimonial = TESTIMONIALS[activeTestimonialIdx];

  const handlePrev = () => {
    setActiveTestimonialIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black/80">
      <div className="mx-auto max-w-7xl">
        {/* SOCIAL PROOF BADGES ROW */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: themeConfig.accent }}>
            <ShieldCheck className="h-4 w-4" />
            <span>Integrity, Provenance & Prestige</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Social Proof & <span className={`bg-gradient-to-r ${themeConfig.gradientText} bg-clip-text text-transparent`}>Institutional Laurels</span>
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Backed by the world’s most venerable artistic academies, conservation consortiums, and verified collector patrons.
          </p>
        </div>

        {/* 4 Official Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {SOCIAL_PROOF_BADGES.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-white/15 bg-zinc-950/80 p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between hover:border-amber-400/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                    {b.issuer}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
                    <Award className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="font-cinzel text-base font-bold text-white mb-1">
                  {b.title}
                </h3>
                <span className="text-xs text-amber-200/90 font-medium block mb-3">
                  {b.year}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {b.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Verified Historical Distinction</span>
              </div>
            </div>
          ))}
        </div>

        {/* TESTIMONIALS CAROUSEL & REVIEWS */}
        <div className="rounded-3xl border border-white/15 bg-zinc-950/90 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[100px] opacity-20" style={{ backgroundColor: themeConfig.accent }} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Quote block */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
                <span className="ml-2 text-xs font-bold text-zinc-300">5.0 / 5.0 Provenance Rating</span>
              </div>

              <Quote className="h-10 w-10 text-amber-400/30 mb-3" />
              <p className="font-cinzel text-lg sm:text-2xl text-white font-light italic leading-relaxed">
                "{activeTestimonial.quote}"
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-amber-400/60 bg-zinc-900 shrink-0">
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.author}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-base">{activeTestimonial.author}</h4>
                    {activeTestimonial.verified && (
                      <span className="flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-amber-300/90">{activeTestimonial.role}</p>
                  <p className="text-[11px] text-zinc-500">{activeTestimonial.context}</p>
                </div>
              </div>
            </div>

            {/* Selector list & controls */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between h-full">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-zinc-400 block mb-3">
                  Direct Perspectives:
                </span>
                <div className="space-y-2">
                  {TESTIMONIALS.map((t, idx) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTestimonialIdx(idx)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                        activeTestimonialIdx === idx
                          ? 'bg-white/15 border border-white/20 text-white font-semibold'
                          : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                      }`}
                    >
                      <span className="text-xs">{t.author}</span>
                      <span className="text-[10px] text-zinc-500 font-mono">{t.role.split(',')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center justify-end gap-2 mt-6">
                <button
                  onClick={handlePrev}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
