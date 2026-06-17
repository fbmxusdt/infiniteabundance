export default function PHScience() {
  return (
    <section id="ph" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="reveal grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-gold-600">Gentle by Design</p>
          <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">Non-acidic. Stomach-friendly.</h2>
          <p className="mt-4 text-lg text-ink/70">Unlike ordinary ascorbic acid, Infinite Abundance uses <strong>Sodium Ascorbate</strong> — a buffered form of Vitamin C that sits gently in your system. Take it daily without the acidic irritation.</p>
          <ul className="mt-6 space-y-3 text-sm font-semibold">
            <li className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-teal-500 text-cream">✓</span>
              Buffered, non-acidic Vitamin C
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-teal-500 text-cream">✓</span>
              Easier on sensitive stomachs
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-teal-500 text-cream">✓</span>
              Pairs naturally with fruit extracts
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-teal-500 text-cream">✓</span>
              Perfect for daily wellness routines
            </li>
          </ul>
        </div>

        {/* pH Scale */}
        <div className="reveal rounded-3xl border border-ink/10 bg-white p-7 shadow-lg">
          <p className="mb-4 text-center font-display text-2xl font-black">The pH Scale</p>
          <div className="flex overflow-hidden rounded-xl mb-2">
            <div className="flex-1 py-3 text-center text-xs font-bold text-white" style={{ background: '#E11D48' }}>0</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-white" style={{ background: '#F97316' }}>1</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-white" style={{ background: '#FB923C' }}>2</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-ink" style={{ background: '#FACC15' }}>3</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-ink" style={{ background: '#A3E635' }}>4</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-ink" style={{ background: '#84CC16' }}>5</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-white" style={{ background: '#4ADE80' }}>6</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-white" style={{ background: '#16A34A' }}>7</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-white" style={{ background: '#14B8A6' }}>8</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-white" style={{ background: '#06B6D4' }}>9</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-white" style={{ background: '#3B82F6' }}>10</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-white" style={{ background: '#6366F1' }}>11</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-white" style={{ background: '#8B5CF6' }}>12</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-white" style={{ background: '#A855F7' }}>13</div>
            <div className="flex-1 py-3 text-center text-xs font-bold text-white" style={{ background: '#9333EA' }}>14</div>
          </div>
          <div className="flex justify-between text-xs font-bold uppercase tracking-wide text-ink/60 mb-5">
            <span className="text-orange-600">◀ Acidic</span>
            <span className="text-teal-600">Neutral</span>
            <span className="text-teal-700">Alkaline ▶</span>
          </div>
          <p className="text-center text-sm text-ink/70">
            Infinite Abundance's <strong>Sodium Ascorbate</strong> sits on the gentle side —
            <strong className="text-teal-700"> no harshness</strong> like low-pH ascorbic acid. Your stomach will thank you.
          </p>
        </div>
      </div>
    </section>
  )
}
