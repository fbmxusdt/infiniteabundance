import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ConnectWallet from '../web3/ConnectWallet'

export default function CallToAction() {
  return (
    <section id="cta" className="relative overflow-hidden mesh py-24">
      {/* Floating decor */}
      <svg className="absolute left-[6%] top-[20%] h-14 w-14 animate-float text-teal-500/50" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C7 6 4 9 4 14a8 8 0 0 0 16 0c0-5-3-8-8-12Z" />
      </svg>

      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="reveal rounded-[2.5rem] border border-white/60 bg-white/70 glass p-10 shadow-2xl sm:p-14">
          <h2 className="font-display text-4xl font-black leading-tight sm:text-6xl">
            Start your<br />
            <span className="bg-gradient-to-r from-gold-600 to-teal-600 bg-clip-text text-transparent">wellness journey.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-ink/70">One bottle. 60 capsules. A full month of non-acidic Vitamin C with real fruit power.</p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#" className="group inline-flex items-center gap-2 rounded-xl bg-gold-500 px-8 py-4 text-lg font-bold text-white shadow-[0_14px_34px_-8px_rgba(212,165,116,.65)] transition hover:bg-gold-600 active:scale-95">
              Order Now
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl border-2 border-teal-600 px-8 py-4 text-lg font-bold text-teal-600 transition hover:bg-teal-600/10">
              Dashboard
            </Link>
          </div>

          <p className="mt-4 text-sm font-semibold text-teal-700">✓ Secure checkout with crypto or card</p>
        </div>
      </div>
    </section>
  )
}
