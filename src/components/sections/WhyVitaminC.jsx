import { Heart, Shield, Zap, Sparkles } from 'lucide-react'

export default function WhyVitaminC() {
  const benefits = [
    {
      icon: Heart,
      title: 'Immune Support',
      description: 'Contributes to the normal function of the immune system, especially during stressful seasons.',
      color: 'text-gold-600 bg-gold-100',
    },
    {
      icon: Sparkles,
      title: 'Radiant Skin',
      description: 'Plays a part in normal collagen formation for skin, helping you look and feel fresh.',
      color: 'text-teal-600 bg-teal-100',
    },
    {
      icon: Zap,
      title: 'Energy & Stamina',
      description: 'Helps reduce tiredness and fatigue so you can power through busy days.',
      color: 'text-gold-600 bg-gold-100',
    },
    {
      icon: Shield,
      title: 'Antioxidant Shield',
      description: 'Helps protect cells from oxidative stress caused by free radicals.',
      color: 'text-teal-600 bg-teal-100',
    },
  ]

  return (
    <section id="why" className="relative overflow-hidden bg-gold-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-teal-600">The Science</p>
          <h2 className="font-display text-4xl font-black leading-tight sm:text-5xl">Why Vitamin C Matters Every Single Day</h2>
          <p className="mt-4 text-lg text-ink/70">Your body can't make or store Vitamin C — so it needs a steady supply. Here's the role it plays.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <article
                key={idx}
                className="reveal group rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`mb-4 grid h-12 w-12 place-items-center rounded-xl ${benefit.color} transition group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{benefit.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
