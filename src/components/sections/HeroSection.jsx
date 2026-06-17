import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section id="hero" className="relative mesh overflow-hidden pt-32 pb-20 sm:pt-40">
      {/* Floating decorative elements */}
      <svg className="absolute left-[4%] top-[22%] h-16 w-16 animate-float text-teal-500/70" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C7 6 4 9 4 14a8 8 0 0 0 16 0c0-5-3-8-8-12Z" />
      </svg>
      <svg className="absolute right-[8%] top-[16%] h-12 w-12 animate-floatSlow text-gold-500/80" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
      <div className="absolute right-[20%] bottom-[12%] h-24 w-24 animate-spinSlow rounded-full border-[3px] border-dashed border-gold-300/60"></div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        {/* Copy */}
        <div className="reveal">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-300 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-teal-700">
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
            Non-Acidic Vitamin C · Made for Daily Wellness
          </div>

          <h1 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Daily defense,<br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-gold-600 via-gold-500 to-teal-500 bg-clip-text text-transparent">naturally fueled.</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="14" viewBox="0 0 300 14" fill="none">
                <path d="M2 9C70 3 230 3 298 8" stroke="#D4A574" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg text-ink/70">
            <strong className="text-ink">Infinite Abundance</strong> blends Sodium Ascorbate — a gentle, non-acidic form of Vitamin C — with <strong className="text-teal-700">natural fruit extracts</strong> for everyday immunity, skin health, energy, and mental clarity support.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#product" className="group inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 font-bold text-white shadow-[0_12px_30px_-8px_rgba(212,165,116,.6)] transition hover:bg-gold-600 active:scale-95">
              Shop Now
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href="#why" className="inline-flex items-center gap-2 rounded-xl border-2 border-ink/15 bg-white/60 px-6 py-3.5 font-bold text-ink transition hover:border-teal-500 hover:text-teal-700">
              Learn About Benefits
            </a>
          </div>

          <div className="mt-9 flex items-center gap-6 text-sm">
            <div>
              <span className="font-display text-2xl font-black text-gold-600">500</span>
              <span className="font-bold">mg</span>
              <p className="text-ink/60">per capsule</p>
            </div>
            <div className="h-9 w-px bg-ink/15"></div>
            <div>
              <span className="font-display text-2xl font-black text-teal-600">60</span>
              <span className="font-bold">caps</span>
              <p className="text-ink/60">one-month supply</p>
            </div>
            <div className="h-9 w-px bg-ink/15"></div>
            <div>
              <span className="font-display text-2xl font-black text-gold-600">4×</span>
              <span className="font-bold">benefits</span>
              <p className="text-ink/60">energy, immunity, beauty, clarity</p>
            </div>
          </div>
        </div>

        {/* Product Visual */}
        <div className="reveal relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 -z-10 mx-auto my-auto h-72 w-72 rounded-full bg-gradient-to-br from-gold-300 to-teal-300 blur-3xl opacity-50"></div>
          <div className="relative animate-floatSlow">
            {/* SVG Bottle */}
            <svg viewBox="0 0 320 420" className="mx-auto w-72 drop-shadow-2xl">
              <defs>
                <linearGradient id="bottle" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#EDEFEA" />
                </linearGradient>
                <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#D4A574" />
                  <stop offset="1" stopColor="#9E7745" />
                </linearGradient>
              </defs>
              <rect x="120" y="20" width="80" height="40" rx="8" fill="url(#cap)" />
              <rect x="112" y="54" width="96" height="18" rx="6" fill="#d9dcd6" />
              <rect x="96" y="70" width="128" height="320" rx="26" fill="url(#bottle)" stroke="#d6d9d2" strokeWidth="2" />
              <rect x="108" y="120" width="104" height="210" rx="14" fill="#FFFDF7" stroke="#eceee8" />
              <text x="160" y="175" textAnchor="middle" fontFamily="Fraunces, serif" fontWeight="900" fontSize="34" fill="#D4A574">
                ∞
              </text>
              <text x="160" y="200" textAnchor="middle" fontFamily="Manrope" fontWeight="700" fontSize="11" fill="#2B8A8A">
                VITAMIN C
              </text>
              <text x="160" y="216" textAnchor="middle" fontFamily="Manrope" fontSize="9" fill="#1A2B1F">
                SODIUM ASCORBATE
              </text>
              <rect x="126" y="232" width="68" height="2" fill="#e6e8e2" />
              <text x="160" y="256" textAnchor="middle" fontFamily="Manrope" fontWeight="700" fontSize="13" fill="#1A2B1F">
                FOOD SUPPLEMENT
              </text>
              <text x="160" y="276" textAnchor="middle" fontFamily="Manrope" fontWeight="800" fontSize="16" fill="#D4A574">
                500mg
              </text>
              <text x="160" y="300" textAnchor="middle" fontFamily="Manrope" fontSize="8" fill="#94978f">
                No Approved Therapeutic Claims
              </text>
              <rect x="128" y="92" width="64" height="20" rx="10" fill="#EBFAF9" />
              <text x="160" y="106" textAnchor="middle" fontFamily="Manrope" fontWeight="800" fontSize="11" fill="#2B8A8A">
                60 Capsules
              </text>
            </svg>

            {/* Leaf accents */}
            <svg className="absolute -left-6 bottom-6 h-20 w-20 animate-float text-gold-500" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="44" fill="#D4A574" opacity="0.8" />
              <circle cx="50" cy="50" r="34" fill="#F5C99F" />
              <g stroke="#D4A574" strokeWidth="3">
                <line x1="50" y1="20" x2="50" y2="80" />
                <line x1="20" y1="50" x2="80" y2="50" />
                <line x1="29" y1="29" x2="71" y2="71" />
                <line x1="71" y1="29" x2="29" y2="71" />
              </g>
            </svg>
            <svg className="absolute -right-4 top-10 h-16 w-16 animate-floatSlow text-teal-500" viewBox="0 0 100 100">
              <path d="M50 6C24 26 12 40 12 62a38 38 0 0 0 76 0C88 40 76 26 50 6Z" fill="#2B8A8A" opacity="0.8" />
              <path d="M50 18v60" stroke="#154D4F" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
