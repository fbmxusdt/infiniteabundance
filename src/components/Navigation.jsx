import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Wallet } from 'lucide-react'
import ConnectWallet from './web3/ConnectWallet'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 mt-3">
        <div className={`flex items-center justify-between rounded-2xl border ${isScrolled ? 'border-gold-100 bg-white/70' : 'border-white/60 bg-cream/70'} glass px-4 py-3 shadow-[0_8px_30px_-12px_rgba(212,165,116,.35)]`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold-500 to-teal-500 text-cream font-display font-black text-lg shadow-inner">
              ∞
            </span>
            <span className="font-display text-2xl font-black tracking-tight">INFINITE</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#product" className="hover:text-gold-600 transition">Product</a>
            <a href="#why" className="hover:text-gold-600 transition">Why Vitamin C</a>
            <a href="#reviews" className="hover:text-gold-600 transition">Reviews</a>
            <Link to="/dashboard" className="hover:text-gold-600 transition">Dashboard</Link>
          </div>

          {/* Connect Wallet Button */}
          <ConnectWallet />
        </div>
      </nav>
    </header>
  )
}
