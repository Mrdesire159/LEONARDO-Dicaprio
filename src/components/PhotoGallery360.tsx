import { useState } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  Maximize2,
  X
} from 'lucide-react';
import { LuxuryTheme, PhotoAsset } from '../types';
import { THEME_CONFIGS, USER_PHOTOS } from '../data/diCaprioData';

interface PhotoGallery360Props {
  currentTheme: LuxuryTheme;
  onSelectTheme?: (theme: LuxuryTheme) => void;
  reducedMotion?: boolean;
  activeBgPhoto?: PhotoAsset;
  onSelectBgPhoto?: (photo: PhotoAsset) => void;
}

export function PhotoGallery360({
  currentTheme,
}: PhotoGallery360Props) {
  const [activeModalPhoto, setActiveModalPhoto] = useState<PhotoAsset | null>(null);

  const themeConfig = THEME_CONFIGS[currentTheme];

  return (
    <section id="gallery" className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black/75">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: themeConfig.accent }}>
              <ImageIcon className="h-4 w-4" />
              <span>The Curated Portrait Salon</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Archival <span className={`bg-gradient-to-r ${themeConfig.gradientText} bg-clip-text text-transparent`}>Portrait Gallery</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-300 font-light max-w-2xl leading-relaxed">
              Original high-resolution portraits and cinema chronicles of Leonardo DiCaprio. Select any portrait to inspect fine archival cinematography and historic production details.
            </p>
          </div>
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {USER_PHOTOS.map((photo) => {
            return (
              <div
                key={photo.id}
                className="group relative rounded-3xl border border-white/15 bg-zinc-950/80 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-amber-400/40 hover:bg-zinc-900/90 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Frame */}
                  <div
                    className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden mb-5 border border-white/10 bg-zinc-900 cursor-pointer shadow-lg"
                    onClick={() => setActiveModalPhoto(photo)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = photo.fallbackUrl;
                      }}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Holographic light reflection */}
                    <div className="pointer-events-none absolute inset-0 hologram-shimmer opacity-25" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 rounded-lg border border-white/20 bg-black/80 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md">
                      {photo.badgeText}
                    </div>

                    {/* Hover Prompt */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-1.5 rounded-full border border-white/30 bg-black/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                        <Maximize2 className="h-3.5 w-3.5 text-amber-300" />
                        <span>Inspect High-Res Portrait</span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                    <span className="font-mono text-amber-300/90">{photo.year}</span>
                    <span>{photo.filmOrEvent}</span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                    {photo.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-light line-clamp-2">
                    {photo.description}
                  </p>
                </div>

                {/* Inspect Action */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setActiveModalPhoto(photo)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 text-xs font-semibold border border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10 hover:border-amber-400/50 hover:text-white transition-all"
                  >
                    <Maximize2 className="h-3.5 w-3.5 text-amber-300" />
                    <span>Inspect Archival Portrait</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL-SCREEN INSPECTION MODAL */}
      {activeModalPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-4xl rounded-3xl border border-white/20 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setActiveModalPhoto(null)}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Title */}
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                Archival Masterpiece · {activeModalPhoto.year}
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white">
                {activeModalPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">{activeModalPhoto.filmOrEvent}</p>
            </div>

            {/* Photo Canvas Area */}
            <div
              className="relative h-96 sm:h-[450px] w-full rounded-2xl overflow-hidden border border-white/15 bg-black flex items-center justify-center select-none shadow-2xl"
            >
              <div
                className="relative h-80 sm:h-96 w-64 sm:w-80 rounded-2xl overflow-hidden shadow-2xl border border-amber-400/50"
              >
                <img
                  src={activeModalPhoto.url}
                  alt={activeModalPhoto.title}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 hologram-shimmer opacity-35" />
              </div>
            </div>

            {/* Controls Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
              <p className="text-xs text-zinc-400 max-w-md">
                {activeModalPhoto.description}
              </p>

              <button
                onClick={() => setActiveModalPhoto(null)}
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all"
              >
                Close Viewport
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
