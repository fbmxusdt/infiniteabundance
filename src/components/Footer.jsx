export default function Footer() {
  return (
    <footer className="bg-ink py-12 text-cream/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold-500 to-teal-500 font-display font-black text-cream">
                ∞
              </span>
              <span className="font-display text-2xl font-black text-cream">INFINITE</span>
            </div>
            <p className="mt-3 max-w-xs text-sm">Sodium Ascorbate with natural extracts. A daily food supplement for wellness and vitality.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="mb-2 font-bold text-cream">Explore</p>
              <ul className="space-y-1.5">
                <li><a href="#product" className="hover:text-gold-300 transition">Product</a></li>
                <li><a href="#why" className="hover:text-gold-300 transition">Why Vitamin C</a></li>
                <li><a href="#reviews" className="hover:text-gold-300 transition">Reviews</a></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-bold text-cream">Company</p>
              <ul className="space-y-1.5">
                <li><a href="#" className="hover:text-gold-300 transition">About Us</a></li>
                <li><a href="#" className="hover:text-gold-300 transition">Contact</a></li>
                <li><a href="#" className="hover:text-gold-300 transition">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-cream/50">
          <p className="font-bold text-cream/70">No Approved Therapeutic Claims.</p>
          <p className="mt-1">This product is a food supplement and is not intended to diagnose, treat, cure, or prevent any disease. Consult a physician before use, especially if pregnant, nursing, or taking medication.</p>
          <p className="mt-3">© 2026 Infinite Abundance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
