# Infinite Abundance — Vitamin C Landing Page

**Project:** Premium wellness e-commerce landing page for Vitamin C supplements  
**Stack:** React 19 + Vite + Tailwind CSS 4 + Wagmi (Web3)  
**Status:** Landing Page Built  
**Last Updated:** 2026-06-02

---

## Quick Start

```bash
# Install dependencies
npm install

# Development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
infinite-abundance/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx          # Fixed navbar with wallet connect
│   │   ├── Footer.jsx               # Footer with links and legal
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx      # Hero with product visual
│   │   │   ├── ProductDetails.jsx   # Formula specs & benefits
│   │   │   ├── WhyVitaminC.jsx      # Science & benefits grid
│   │   │   ├── Testimonials.jsx     # Customer reviews
│   │   │   └── CallToAction.jsx     # Final CTA + wallet button
│   │   └── web3/
│   │       └── ConnectWallet.jsx    # MetaMask/WalletConnect integration
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Tailwind + global styles
├── index.html                       # HTML entry point
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind theme config
├── postcss.config.js                # PostCSS config
├── package.json                     # Dependencies & scripts
└── .gitignore                       # Git ignore rules
```

---

## Key Components

### 1. **HeroSection** (Landing hero with product visual)
- Headline: "Abundance starts within."
- Large product bottle SVG animation
- Key stats: 500mg, 60 caps, 4 benefits
- CTA buttons: Shop Now, Learn About Benefits
- Floating decorative elements

### 2. **ProductDetails** (What's in the capsule)
- Formula specs (active, botanical, strength, count)
- Non-acidic benefit highlight
- 4 key reasons card (energy, immunity, beauty, clarity)

### 3. **WhyVitaminC** (Educational section)
- Science-backed benefits grid
- 4 benefit cards with icons (heart, sparkles, zap, shield)
- Hover animations and color transitions

### 4. **Testimonials** (Social proof)
- 3-column grid of customer reviews
- 5-star ratings
- User avatars with initials
- Location-based testimonials

### 5. **CallToAction** (Final conversion)
- Headline: "Start your wellness journey."
- "Order Now" button
- "Connect Wallet" button (Web3 payment ready)
- Payment method badge

---

## Design System

### Colors
- **Gold:** #D4A574 (primary, wealth, prosperity)
- **Teal:** #2B8A8A (secondary, vitality, growth)
- **Cream:** #FFF9F5 (background)
- **Ink:** #1A2B1F (text, structure)
- **Purple:** #6B5B95 (mental clarity accent)
- **Green:** #52A552 (wellness accent)

### Typography
- **Display:** Fraunces (serif, bold headlines)
- **Body:** Manrope (sans-serif, readable text)
- **Mono:** Courier/mono for data (optional)

### Animations
- `float`: Gentle up/down + rotation
- `floatSlow`: Slower floating effect
- `rise`: Fade-in + slide-up on scroll
- `spinSlow`: Slow 360° rotation
- `shine`: Shimmer effect on hover

---

## Web3 Integration

### ConnectWallet Component
- **Wallets Supported:** MetaMask, WalletConnect, others
- **Network:** BNB Smart Chain (chainId: 0x38)
- **Auto-Switch:** Detects network and switches/adds BSC if needed
- **Account Display:** Shows shortened wallet address when connected

### Setup for Smart Contract Payments
When ready for Phase 2 (checkout):
1. Replace order buttons with smart contract calls
2. Import `fbmxdao_v2.sol` ABI and contract address
3. Use Wagmi hooks for transaction handling
4. Integrate with Web3 payment flow

---

## Styling Approach

**Tailwind CSS 4** with:
- Custom color palette (Infinite Abundance brand)
- Extended animations (float, rise, shine, spin)
- Glass morphism effects (backdrop blur)
- Scroll reveal animations via JS

**No external UI libraries** — All components built with Tailwind + Lucide icons for maximum control and customization.

---

## Scroll Animations

Every section with `.reveal` class:
1. Starts invisible (opacity 0, translateY +30px)
2. Triggers when 12% visible in viewport
3. Fades in + slides up smoothly
4. Gets `.in` class permanently

---

## Responsive Design

- **Mobile (320px):** Single column, stacked layout
- **Tablet (768px):** 2 columns, larger spacing
- **Desktop (1024px+):** Full grid layout, side-by-side sections
- **Hero:** Grid switches from 1→1 col (mobile) to 1→2 cols (lg)
- **Product Details:** 1 col (mobile) → 3 cols (desktop)
- **Benefits Grid:** 1 col (mobile) → 2 cols (tablet) → 4 cols (desktop)

---

## Development Notes

### Adding New Sections
1. Create component in `src/components/sections/[Name].jsx`
2. Import in `App.jsx`
3. Add section with `id` for nav links
4. Wrap content in `.reveal` divs for animations
5. Use Tailwind classes from config

### Updating Colors
Edit `tailwind.config.js` color palette to change brand colors globally.

### Updating Typography
Edit `tailwind.config.js` fontFamily section to change fonts.

### Web3 Wallet Connect
Edit `src/components/web3/ConnectWallet.jsx` to:
- Change network (update `BSC` object)
- Add different wallet providers
- Modify connection flow

---

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## Next Steps (Phase 2)

When ready for shopping cart + checkout:
1. Add product data/catalog
2. Integrate smart contract payment flow
3. Add order confirmation page
4. Build user account dashboard
5. Implement cart functionality

---

## References

- **Tailwind Docs:** https://tailwindcss.com
- **React 19 Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **Wagmi Docs:** https://wagmi.sh
- **Lucide Icons:** https://lucide.dev

---

## Session Memory

See `sessions/MILESTONES.md` for project history and roadmap.
