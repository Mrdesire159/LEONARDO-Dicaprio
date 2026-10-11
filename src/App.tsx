/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { LuxuryTheme, PhotoAsset, StoreItem, CartItem, OrderRecord, UserProfile } from './types';
import { THEME_CONFIGS, USER_PHOTOS, DEFAULT_USER_PROFILE, INITIAL_PURCHASE_HISTORY } from './data/diCaprioData';
import { ParticleBackground } from './components/ParticleBackground';
import { CursorGlow } from './components/CursorGlow';
import { Navbar } from './components/Navbar';
import { HeroOrbital } from './components/HeroOrbital';
import { FilmReelTimeline } from './components/FilmReelTimeline';
import { OrbitingAwards } from './components/OrbitingAwards';
import { MeetAndGreetStore } from './components/MeetAndGreetStore';
import { PhotoGallery360 } from './components/PhotoGallery360';
import { BiographySection } from './components/BiographySection';
import { TestimonialsSocialProof } from './components/TestimonialsSocialProof';
import { CheckoutModal } from './components/CheckoutModal';
import { UserProfileModal } from './components/UserProfileModal';
import { SocialMediaBallModal } from './components/SocialMediaBallModal';
import { FloatingSocialBallButton } from './components/FloatingSocialBallButton';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<LuxuryTheme>('gold');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeBgPhoto, setActiveBgPhoto] = useState<PhotoAsset>(USER_PHOTOS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSocialBallOpen, setIsSocialBallOpen] = useState(false);
  const [ambientAudioPlaying, setAmbientAudioPlaying] = useState(false);

  // User Profile & Purchase History State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('ld_user_profile');
      return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ld_orders_history');
      return saved ? JSON.parse(saved) : INITIAL_PURCHASE_HISTORY;
    } catch {
      return INITIAL_PURCHASE_HISTORY;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ld_orders_history', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('ld_user_profile', JSON.stringify(userProfile));
    } catch {
      // ignore
    }
  }, [userProfile]);

  const handleOrderPlaced = (newOrder: OrderRecord) => {
    setOrders((prev) => [newOrder, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      totalSpend: prev.totalSpend + newOrder.totalAmount,
      loyaltyPoints: prev.loyaltyPoints + Math.round(newOrder.totalAmount * 5),
    }));
  };

  // Audio synthesis reference
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }
    }
  }, []);

  // Web Audio Cinematic Drone Synthesizer
  const toggleAmbientAudio = () => {
    if (ambientAudioPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.4);
      }
      setAmbientAudioPlaying(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Filter for warm cinematic noir drone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, ctx.currentTime);
      filter.connect(masterGain);

      // Low celestial harmonic frequencies (Hans Zimmer style)
      const freqs = [108, 162, 216, 324];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        osc.connect(filter);
        osc.start();
      });

      setAmbientAudioPlaying(true);
    } catch {
      // Audio autoplay policy fallback
      setAmbientAudioPlaying(false);
    }
  };

  // Cart operations
  const handleAddToCart = (item: StoreItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleInstantBuy = (item: StoreItem) => {
    handleAddToCart(item);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const nextQ = ci.quantity + delta;
            return nextQ > 0 ? { ...ci, quantity: nextQ } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.querySelector(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const themeConfig = THEME_CONFIGS[currentTheme];

  return (
    <div
      className={`relative min-h-screen w-full bg-[#030305] text-slate-100 ${
        reducedMotion ? 'reduced-motion' : ''
      }`}
    >
      {/* Dynamic Ambient Background Layer using the User's Active Selected Photo */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20 mix-blend-screen transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, ${themeConfig.accent}25 0%, transparent 70%), url(${activeBgPhoto.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          filter: 'blur(30px) saturate(1.4) brightness(0.6)',
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_transparent_10%,_#030305_85%)]" />

      {/* Floating Canvas Particles */}
      <ParticleBackground theme={currentTheme} reducedMotion={reducedMotion} />

      {/* Trailing Cursor Glow */}
      <CursorGlow theme={currentTheme} reducedMotion={reducedMotion} />

      {/* Luxury Navigation Header */}
      <Navbar
        currentTheme={currentTheme}
        ambientAudioPlaying={ambientAudioPlaying}
        onToggleAmbientAudio={toggleAmbientAudio}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSocialBall={() => setIsSocialBallOpen(true)}
        orderCount={orders.length}
      />

      {/* Main Experience Flow */}
      <main className="relative z-10 flex flex-col items-center w-full">
        {/* 1. Centerpiece Hero Showcase */}
        <HeroOrbital
          currentTheme={currentTheme}
          activeHeroPhoto={activeBgPhoto}
          onSelectPhotoModal={(photo) => setActiveBgPhoto(photo)}
          onNavigateSection={handleNavigateSection}
          onOpenSocialBall={() => setIsSocialBallOpen(true)}
        />

        {/* 2. Comprehensive Biography with Rich Background */}
        <BiographySection
          currentTheme={currentTheme}
        />

        {/* 3. 35mm Celluloid Film Reel Timeline */}
        <FilmReelTimeline
          currentTheme={currentTheme}
        />

        {/* 4. Meet & Greet VIP Cards (Gold $10K, Silver $5K, Platinum $1K) */}
        <MeetAndGreetStore
          currentTheme={currentTheme}
          onAddToCart={handleAddToCart}
          onInstantBuy={handleInstantBuy}
        />

        {/* 5. Major Medals & Academy Awards Accolades */}
        <OrbitingAwards
          currentTheme={currentTheme}
        />

        {/* 6. Curated Archival Portrait Gallery */}
        <PhotoGallery360
          currentTheme={currentTheme}
        />

        {/* 7. Institutional Laurels, Testimonials & Provenance Badges */}
        <TestimonialsSocialProof
          currentTheme={currentTheme}
        />
      </main>

      {/* Secure Checkout & VIP Reservation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currentTheme={currentTheme}
        onOrderPlaced={handleOrderPlaced}
        onViewPurchaseHistory={() => setIsProfileOpen(true)}
        defaultAttendeeName={userProfile.name}
        defaultAttendeeEmail={userProfile.email}
      />

      {/* User Profile & Purchase History Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userProfile={userProfile}
        orders={orders}
        currentTheme={currentTheme}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Luxury Footer with Specific Social Media Branding */}
      <Footer
        currentTheme={currentTheme}
        onOpenSocialBall={() => setIsSocialBallOpen(true)}
      />

      {/* Floating 3D Social Media Ball Action Button */}
      <FloatingSocialBallButton
        onClick={() => setIsSocialBallOpen(true)}
        currentTheme={currentTheme}
      />

      {/* 3D Celestial Social Media Ball Modal (Displays All 3 Handles in 3D Ball Form) */}
      <SocialMediaBallModal
        isOpen={isSocialBallOpen}
        onClose={() => setIsSocialBallOpen(false)}
        currentTheme={currentTheme}
      />
    </div>
  );
}
