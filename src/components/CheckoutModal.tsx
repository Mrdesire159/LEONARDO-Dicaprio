import { useState, useId } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  CreditCard,
  Lock,
  Sparkles,
  CheckCircle2,
  QrCode,
  Download,
  Printer,
  Tag,
  ArrowRight,
  Clock
} from 'lucide-react';
import { CartItem, LuxuryTheme, OrderRecord } from '../types';
import { THEME_CONFIGS } from '../data/diCaprioData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  currentTheme: LuxuryTheme;
  onOrderPlaced?: (order: OrderRecord) => void;
  onViewPurchaseHistory?: () => void;
  defaultAttendeeName?: string;
  defaultAttendeeEmail?: string;
}

export function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentTheme,
  onOrderPlaced,
  onViewPurchaseHistory,
  defaultAttendeeName = 'Godwin Desire',
  defaultAttendeeEmail = 'godwindesire17@gmail.com',
}: CheckoutModalProps) {
  const [step, setStep] = useState<'cart' | 'payment' | 'confirmation'>('cart');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // VIP Attendee details
  const [attendeeName, setAttendeeName] = useState(defaultAttendeeName);
  const [attendeeEmail, setAttendeeEmail] = useState(defaultAttendeeEmail);
  const [attendeeNotes, setAttendeeNotes] = useState('Premier Gala Access — Front Table Preference');

  // Credit Card state
  const [cardNumber, setCardNumber] = useState('4532 8920 1194 7721');
  const [cardHolder, setCardHolder] = useState(defaultAttendeeName.toUpperCase());
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCvv, setCardCvv] = useState('884');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmationOrderNum, setConfirmationOrderNum] = useState('');

  const themeConfig = THEME_CONFIGS[currentTheme];

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const conciergeFee = subtotal > 0 ? 15 : 0; // Reduced VIP concierge white-glove security
  const total = Math.max(0, subtotal - discountAmount + conciergeFee);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'OSCAR2026' || code === 'OSCAR') {
      setDiscountPercent(15);
      setPromoMessage('15% Academy Laureate Patron Discount applied!');
    } else if (code === 'TITANIC') {
      setDiscountPercent(10);
      setPromoMessage('10% Titanic 25th Commemorative Discount applied!');
    } else if (code === 'EARTH') {
      setDiscountPercent(12);
      setPromoMessage('12% Earth Alliance Benefactor Match applied!');
    } else {
      setPromoMessage('Invalid code. Try "OSCAR2026" or "EARTH"');
      setDiscountPercent(0);
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = `LD-2026-VIP-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmationOrderNum(generatedId);

      // Create rich OrderRecord
      if (onOrderPlaced) {
        const orderSummaryItems = cartItems.map((ci) => ({
          itemId: ci.item.id,
          title: ci.item.title,
          subtitle: ci.item.subtitle,
          tier: ci.item.tier,
          image: ci.item.image,
          price: ci.item.price,
          quantity: ci.quantity,
        }));

        const isGold = cartItems.some((ci) => ci.item.tier === 'Gold');

        const newOrder: OrderRecord = {
          id: `ord-${Date.now()}`,
          orderNumber: generatedId,
          date: new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          items: orderSummaryItems,
          subtotal,
          discount: discountAmount,
          conciergeFee,
          totalAmount: total,
          status: 'engraving',
          statusLabel: 'Physical Metal Card Engraving',
          statusDescription: isGold
            ? 'Order verified. 24K pure gold metal card currently in custom precision laser engraving queue. Armored security dispatch scheduled within 24 hours.'
            : 'Order verified. Sterling silver pure metal card in precision CNC engraving queue. Serialized NFC chip minted.',
          trackingNumber: `BRINKS-SECURE-${Math.floor(10000000 + Math.random() * 90000000)}`,
          courier: 'Brinks Armored White-Glove Courier',
          attendeeName,
          attendeeEmail,
          venueEvent: '88th Academy Laureate Gala & Cannes Premiere 2026',
          venueDate: 'May 24, 2026 · Grand Théâtre Lumière & Hotel du Cap',
          seatZone: isGold ? 'Gold Luminary Greenroom & Front Orchestra' : 'Silver Red Carpet Orchestra',
          qrCodeSerial: `NFC-AMPAS-${generatedId}`,
        };

        onOrderPlaced(newOrder);
      }

      setStep('confirmation');
      onClearCart();
    }, 1800);
  };

  const getCardType = (num: string) => {
    const clean = num.replace(/\s+/g, '');
    if (clean.startsWith('4')) return 'VISA SIGNATURE';
    if (clean.startsWith('5')) return 'MASTERCARD BLACK';
    if (clean.startsWith('3')) return 'AMEX CENTURION';
    return 'TITANIUM VAULT';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/20 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
          aria-label="Close Checkout"
        >
          <X className="h-5 w-5" />
        </button>

        {/* STEP 1: CART SUMMARY */}
        {step === 'cart' && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-5 w-5" style={{ color: themeConfig.accent }} />
              <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
                VIP Pass Registry &amp; Allocation
              </span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-white">
              Official VIP Experience Reservation
            </h2>
            <p className="text-xs text-zinc-300 mt-1 mb-6">
              Review your Meet &amp; Greet VIP pass selection and gala credentials before proceeding to white-glove patron registration.
            </p>

            {cartItems.length === 0 ? (
              <div className="py-16 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-zinc-600 mb-3" />
                <p className="font-cinzel text-lg text-zinc-300">No VIP passes selected for reservation yet.</p>
                <p className="text-xs text-zinc-500 mt-1">Explore the Meet & Greet VIP Store to select Silver, Gold, or Platinum credentials.</p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-xl bg-amber-400 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-amber-300"
                >
                  Explore VIP Store
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Cart Items List */}
                <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
                  {cartItems.map(({ item, quantity }) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-16 w-16 rounded-xl object-cover border border-white/10 bg-zinc-800"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase font-bold text-amber-300">
                              {item.tier ? `${item.tier} Tier` : item.badge}
                            </span>
                            <span className="text-zinc-600">·</span>
                            <span className="text-[11px] text-zinc-400">{item.subtitle}</span>
                          </div>
                          <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
                            {item.title}
                          </h4>
                          <span className="font-cinzel text-sm font-semibold text-zinc-200">
                            ${item.price.toLocaleString()} USD
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls & Delete */}
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="flex items-center rounded-xl border border-white/15 bg-white/5 p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-300"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-white">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-zinc-300"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <span className="font-cinzel text-base font-bold text-white min-w-24 text-right">
                          ${(item.price * quantity).toLocaleString()}
                        </span>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-red-400 hover:bg-white/5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code & Summary Calculations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
                      Benefactor / Laureate Promo Code
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="e.g. OSCAR2026, EARTH"
                        className="flex-1 rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="rounded-xl border border-amber-400/50 bg-amber-400/20 px-4 py-2 text-xs font-bold text-amber-300 hover:bg-amber-400/30"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p className={`text-xs mt-2 ${discountPercent > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {promoMessage}
                      </p>
                    )}
                    <span className="text-[10px] text-zinc-500 block mt-2">
                      Official codes: <strong>OSCAR2026</strong> (15% off) or <strong>EARTH</strong> (12% off)
                    </span>
                  </div>

                  {/* Calculations */}
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 space-y-2.5">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Subtotal</span>
                      <span className="font-mono text-zinc-200">${subtotal.toLocaleString()} USD</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-xs text-emerald-400">
                        <span>Patron Discount ({discountPercent}%)</span>
                        <span className="font-mono">-${discountAmount.toLocaleString()} USD</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>White-Glove VIP Concierge & Security</span>
                      <span className="font-mono text-zinc-200">${conciergeFee} USD</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 flex justify-between items-baseline">
                      <span className="font-cinzel text-base font-bold text-white">Grand Total</span>
                      <span className="font-cinzel text-2xl font-extrabold text-amber-300">
                        ${total.toLocaleString()} USD
                      </span>
                    </div>

                    <button
                      onClick={() => setStep('payment')}
                      className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-transform"
                    >
                      <Lock className="h-4 w-4" />
                      <span>Proceed to Encrypted Checkout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: CREDENTIALS & PAYMENT FORM */}
        {step === 'payment' && (
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  Step 2 of 2 · Secure Transaction
                </span>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-white">
                  VIP Attendee Registration & Payment
                </h2>
              </div>
              <button
                onClick={() => setStep('cart')}
                className="text-xs text-zinc-400 hover:text-white underline"
              >
                Back to Selection
              </button>
            </div>

            <form onSubmit={handleProcessPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: 3D Credit Card Preview + Security Guarantee */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-3">
                    Luxury Card Visualizer:
                  </span>

                  {/* 3D CREDIT CARD DISPLAY */}
                  <div className="perspective-1000 mb-6">
                    <div
                      className="relative h-52 w-full rounded-2xl p-6 transition-transform duration-700 transform-style-3d shadow-2xl flex flex-col justify-between overflow-hidden"
                      style={{
                        transform: `rotateY(${isCardFlipped ? 180 : 0}deg)`,
                        background: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #09090b 100%)',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        boxShadow: '0 0 35px rgba(212, 175, 55, 0.25)',
                      }}
                    >
                      {/* Holographic shimmer */}
                      <div className="pointer-events-none absolute inset-0 hologram-shimmer opacity-25" />

                      {/* FRONT OF CARD */}
                      <div className="backface-hidden flex flex-col justify-between h-full">
                        <div className="flex items-center justify-between">
                          <div className="h-8 w-11 rounded-md bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 border border-amber-200/60 shadow-inner flex items-center justify-center">
                            <div className="h-4 w-6 rounded-xs border border-black/40" />
                          </div>
                          <span className="font-mono text-xs font-extrabold tracking-widest text-amber-300">
                            {getCardType(cardNumber)}
                          </span>
                        </div>

                        <div className="font-mono text-lg sm:text-xl font-bold tracking-[0.2em] text-white my-3 drop-shadow">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-zinc-300">
                          <div>
                            <span className="block text-[8px] uppercase tracking-wider text-zinc-500">Cardholder</span>
                            <span className="font-mono font-bold tracking-wider uppercase">{cardHolder || 'ATTENDEE NAME'}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] uppercase tracking-wider text-zinc-500">Expires</span>
                            <span className="font-mono font-bold">{cardExpiry || 'MM/YY'}</span>
                          </div>
                        </div>
                      </div>

                      {/* BACK OF CARD */}
                      <div className="absolute inset-0 p-6 rotate-y-180 backface-hidden flex flex-col justify-between bg-zinc-950">
                        <div className="h-10 w-full bg-black -mx-6 mt-2" />
                        <div className="flex items-center justify-end bg-white/20 px-3 py-1.5 rounded">
                          <span className="text-[10px] text-zinc-400 mr-2">CVV:</span>
                          <span className="font-mono text-sm font-bold text-white">{cardCvv || '•••'}</span>
                        </div>
                        <p className="text-[9px] text-zinc-500 leading-tight">
                          Authorized luxury signature card for Leonardo DiCaprio Official Gala credentials. 256-bit encrypted token.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Security Highlights */}
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2 text-xs text-zinc-400">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <ShieldCheck className="h-4 w-4" />
                      <span>256-Bit SSL Encrypted End-to-End Vault</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      Instant NFC ticket dispatch to your email upon confirmation. Full refund guarantee within 48 hours of reservation.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-xs uppercase text-zinc-400">Total Due:</span>
                  <span className="font-cinzel text-2xl font-black text-amber-300">
                    ${total.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Right Column: Registration & Payment Fields */}
              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block">
                    1. Attendee Pass Credentials
                  </span>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">
                      Full Legal Name (Engraved on Physical Pass):
                    </label>
                    <input
                      type="text"
                      required
                      value={attendeeName}
                      onChange={(e) => {
                        setAttendeeName(e.target.value);
                        setCardHolder(e.target.value.toUpperCase());
                      }}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">
                      VIP Dispatch Email (For NFC Pass & Venue Directions):
                    </label>
                    <input
                      type="email"
                      required
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">
                      Concierge Notes / Dietary Preferences:
                    </label>
                    <input
                      type="text"
                      value={attendeeNotes}
                      onChange={(e) => setAttendeeNotes(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block">
                    2. Payment Details
                  </span>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">Card Number:</label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      onFocus={() => setIsCardFlipped(false)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Expiry Date:</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        onFocus={() => setIsCardFlipped(false)}
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">Security Code (CVV):</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        onFocus={() => setIsCardFlipped(true)}
                        onBlur={() => setIsCardFlipped(false)}
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 py-4 text-xs font-bold uppercase tracking-wider text-black shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>Authenticating Vault Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Complete VIP Reservation (${total.toLocaleString()} USD)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMATION & PRINTABLE PASS */}
        {step === 'confirmation' && (
          <div className="py-6 text-center max-w-2xl mx-auto">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mb-4 animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              Transaction Authenticated · AMPAS Registry
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-black text-white mt-1">
              VIP Credentials Confirmed
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Your official reservation has been logged under reference <strong>{confirmationOrderNum}</strong>. A cryptographic confirmation receipt and venue access pass have been dispatched to <strong>{attendeeEmail}</strong>.
            </p>

            {/* PRINTABLE DIGITAL PASS BADGE */}
            <div className="my-8 rounded-3xl border border-amber-400/40 bg-zinc-950 p-6 shadow-2xl relative overflow-hidden text-left">
              <div className="pointer-events-none absolute inset-0 hologram-shimmer opacity-20" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-400 flex items-center justify-center font-cinzel font-bold text-black text-sm">
                    LD
                  </div>
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-white">LEONARDO DICAPRIO</h4>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Official Gala Pass</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono text-zinc-500 block">SERIAL CODE</span>
                  <span className="font-mono text-xs font-bold text-amber-300">{confirmationOrderNum}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2 text-xs">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Attendee</span>
                  <span className="font-bold text-white text-sm">{attendeeName}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Status</span>
                  <span className="font-bold text-emerald-400">Active VIP Patron</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Provenance</span>
                  <span className="text-zinc-300">NFC Tamper Sealed</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-400 text-xs">
                  <QrCode className="h-8 w-8 text-white" />
                  <span className="text-[10px]">Scan at private security entrance</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-semibold">
                  Valid for 2025/2026 Season
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {onViewPurchaseHistory && (
                <button
                  onClick={() => {
                    onClose();
                    onViewPurchaseHistory();
                  }}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-2.5 text-xs font-bold text-black hover:scale-105 transition-transform uppercase tracking-wider shadow-lg"
                >
                  <Clock className="h-4 w-4" />
                  <span>Track in Purchase History</span>
                </button>
              )}

              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
              >
                <Printer className="h-4 w-4" />
                <span>Print VIP Pass</span>
              </button>

              <button
                onClick={onClose}
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20 uppercase tracking-wider"
              >
                <span>Return to Experience</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
