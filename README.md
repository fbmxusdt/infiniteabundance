# Infinite Abundance — Premium Vitamin C Supplement Landing Page

A modern, high-performance landing page for a Vitamin C supplement brand built with React 19, Vite, Tailwind CSS, and Web3 integration (MetaMask/WalletConnect).

## Features

✨ **Beautiful Design**
- Premium aesthetic with gold & teal color scheme
- Smooth scroll animations & floating elements
- Glass morphism effects
- Fully responsive (mobile, tablet, desktop)

⚡ **High Performance**
- Vite build tool for instant HMR
- Optimized React 19 components
- CSS-only animations (no extra dependencies)
- Fast page load times

🔗 **Web3 Ready**
- MetaMask wallet integration
- WalletConnect support
- BNB Smart Chain (BSC) configured
- Ready for smart contract payment integration

📱 **Mobile-First**
- Responsive grid layouts
- Touch-friendly buttons (44px+)
- Optimized for all screen sizes

## Tech Stack

- **Frontend:** React 19
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 4
- **Web3:** Wagmi 2 + ethers.js
- **Icons:** Lucide React
- **Fonts:** Fraunces (display) + Manrope (body)

## Installation

```bash
# Clone or navigate to project
cd infinite-abundance

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx          # Fixed navbar
│   ├── Footer.jsx              # Footer
│   ├── sections/               # Page sections
│   │   ├── HeroSection.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── WhyVitaminC.jsx
│   │   ├── Testimonials.jsx
│   │   └── CallToAction.jsx
│   └── web3/
│       └── ConnectWallet.jsx   # Wallet integration
├── App.jsx                     # Main app
├── main.jsx                    # React entry
└── index.css                   # Global styles
```

## Key Sections

### 1. Hero Section
- Large product bottle visualization
- Headline: "Abundance starts within."
- Key stats and CTA buttons
- Floating animated elements

### 2. Product Details
- Formula specifications
- Non-acidic benefit callout
- 4 key reasons grid

### 3. Why Vitamin C
- Educational benefits section
- 4-card grid with icons
- Science-backed claims

### 4. Testimonials
- Customer reviews with 5-star ratings
- User avatars and locations
- Social proof section

### 5. Call to Action
- Final conversion section
- "Order Now" button
- Web3 wallet connect button

## Design Highlights

### Color Palette
- **Gold:** #D4A574 — Prosperity, wealth
- **Teal:** #2B8A8A — Vitality, growth
- **Cream:** #FFF9F5 — Clean background
- **Ink:** #1A2B1F — Text/structure

### Animations
- Scroll reveal animations
- Floating elements
- Hover effects
- Smooth transitions

### Web3 Integration
- One-click MetaMask connect
- Auto-switch to BNB Smart Chain
- Wallet status display
- Ready for payment contracts

## Getting Started

1. **Install:** `npm install`
2. **Develop:** `npm run dev`
3. **Build:** `npm run build`

## Future Enhancements

- Product catalog (Phase 2)
- Shopping cart & checkout (Phase 3)
- Smart contract payments (fbmxdao_v2.sol)
- User accounts & order history
- Email/SMS notifications

## Customization

### Change Brand Colors
Edit `tailwind.config.js` → `colors` section

### Update Product Info
Edit section components in `src/components/sections/`

### Modify Fonts
Edit `tailwind.config.js` → `fontFamily` section

### Change Network
Edit `src/components/web3/ConnectWallet.jsx` → `BSC` object

## Performance

- Fully responsive
- Mobile-optimized
- No external JS frameworks
- Tailwind CSS purging
- Optimized SVG assets

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

© 2026 Infinite Abundance. All rights reserved.

## Disclaimer

This is a food supplement. No approved therapeutic claims. Consult a physician before use, especially if pregnant, nursing, or taking medication.

---

**Ready to launch?** Build with `npm run build` and deploy to Vercel, Netlify, or your hosting provider.
