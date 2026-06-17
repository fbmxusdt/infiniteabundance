export default function AwardsMarquee() {
  return (
    <section className="border-y border-ink/10 bg-ink py-4 text-cream">
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-12 whitespace-nowrap pr-12 text-sm font-bold uppercase tracking-wider">
          <span>★ Premium Wellness Brand 2026</span>
          <span className="text-gold-300">Global Excellence Award</span>
          <span>★ Best Non-Acidic Vitamin C</span>
          <span className="text-teal-300">Customer Choice Award 2026</span>
          <span>★ Outstanding Health & Wellness</span>
          <span className="text-gold-300">Natural & Clean Formula ✓</span>
        </div>
        <div className="animate-marquee flex shrink-0 items-center gap-12 whitespace-nowrap pr-12 text-sm font-bold uppercase tracking-wider" aria-hidden="true">
          <span>★ Premium Wellness Brand 2026</span>
          <span className="text-gold-300">Global Excellence Award</span>
          <span>★ Best Non-Acidic Vitamin C</span>
          <span className="text-teal-300">Customer Choice Award 2026</span>
          <span>★ Outstanding Health & Wellness</span>
          <span className="text-gold-300">Natural & Clean Formula ✓</span>
        </div>
      </div>
    </section>
  )
}
