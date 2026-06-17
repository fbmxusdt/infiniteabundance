import { CheckCircle } from 'lucide-react'

export default function ProductDetails() {
  return (
    <section id="product" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="reveal mb-14 max-w-2xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-gold-600">The Product</p>
        <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">What's inside every Infinite Abundance capsule</h2>
        <p className="mt-4 text-lg text-ink/70">A clean, fruit-forward formula built around Sodium Ascorbate — the buffered, stomach-friendly form of Vitamin C that's gentle on your system.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Spec Card */}
        <div className="reveal rounded-3xl border border-ink/10 bg-white p-7 shadow-sm">
          <h3 className="font-display text-2xl font-bold">Formula at a glance</h3>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between border-b border-dashed border-ink/10 pb-2">
              <dt className="text-ink/60">Active</dt>
              <dd className="font-bold">Sodium Ascorbate (Vitamin C)</dd>
            </div>
            <div className="flex justify-between border-b border-dashed border-ink/10 pb-2">
              <dt className="text-ink/60">Botanicals</dt>
              <dd className="font-bold text-teal-700">Natural Fruit Extracts</dd>
            </div>
            <div className="flex justify-between border-b border-dashed border-ink/10 pb-2">
              <dt className="text-ink/60">Strength</dt>
              <dd className="font-bold">500 mg per capsule</dd>
            </div>
            <div className="flex justify-between border-b border-dashed border-ink/10 pb-2">
              <dt className="text-ink/60">Count</dt>
              <dd className="font-bold">60 capsules (one-month supply)</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/60">Type</dt>
              <dd className="font-bold">Food Supplement</dd>
            </div>
          </dl>
          <p className="mt-5 rounded-xl bg-gold-50 px-3 py-2 text-xs font-semibold text-gold-700">✓ Non-acidic & gentle — easier on the stomach than regular ascorbic acid.</p>
        </div>

        {/* Benefits Card */}
        <div className="reveal rounded-3xl border border-ink/10 bg-gradient-to-br from-teal-500 to-teal-700 p-7 text-cream shadow-lg lg:col-span-2">
          <h3 className="font-display text-2xl font-bold">5 Reasons to Take It Daily</h3>
          <div className="mt-6 space-y-3 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15 font-display font-bold text-lg">1</span>
              <div>
                <p className="font-bold">Boosts Immunity</p>
                <p className="text-sm text-cream/70">Daily support for your natural defenses.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15 font-display font-bold text-lg">2</span>
              <div>
                <p className="font-bold">Supports Skin Health</p>
                <p className="text-sm text-cream/70">Aids normal collagen formation.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15 font-display font-bold text-lg">3</span>
              <div>
                <p className="font-bold">Fights Fatigue</p>
                <p className="text-sm text-cream/70">Helps reduce tiredness and keep you going.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15 font-display font-bold text-lg">4</span>
              <div>
                <p className="font-bold">Antioxidant Protection</p>
                <p className="text-sm text-cream/70">Shields cells from oxidative stress.</p>
              </div>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15 font-display font-bold text-lg">5</span>
              <div>
                <p className="font-bold">Overall Wellness</p>
                <p className="text-sm text-cream/70">A simple daily habit for everyday vitality.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
