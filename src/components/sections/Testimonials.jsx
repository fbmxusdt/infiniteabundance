import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      text: "Finally have a Vitamin C that doesn't upset my stomach. I take it every morning and feel noticeably sharper throughout the day.",
      author: 'Maricel D.',
      location: 'Quezon City',
      initials: 'M',
      color: 'bg-gold-500',
    },
    {
      text: "The non-acidic formula was a game-changer. My skin looks clearer, I'm sick way less often, and the energy boost is real.",
      author: 'Johnpaul R.',
      location: 'Cebu',
      initials: 'J',
      color: 'bg-teal-500',
    },
    {
      text: "Whole family is on it now. Easy to swallow, no acidic aftertaste, and a genuine energy lift by midday. Best wellness supplement I've tried.",
      author: 'Aiza T.',
      location: 'Davao',
      initials: 'A',
      color: 'bg-gold-500',
    },
  ]

  return (
    <section id="reviews" className="bg-teal-700 py-24 text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-gold-300">Loved Daily</p>
          <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">What our community says</h2>
          <p className="mt-4 text-lg text-cream/70">Join thousands of people who've made Infinite Abundance part of their daily wellness routine.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <figure key={idx} className="reveal rounded-3xl bg-white/10 p-7 glass transition hover:-translate-y-1 hover:bg-white/15">
              <div className="mb-3 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-300 text-gold-300" />
                ))}
              </div>
              <blockquote className="text-base leading-relaxed">"{testimonial.text}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-full ${testimonial.color} font-display font-black`}>
                  {testimonial.initials}
                </span>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-cream/60">{testimonial.location}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
