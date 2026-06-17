import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { config } from './config/wagmi'
import ReferralCapture from './components/ReferralCapture'
import Navigation from './components/Navigation'
import HeroSection from './components/sections/HeroSection'
import AwardsMarquee from './components/sections/AwardsMarquee'
import ProductDetails from './components/sections/ProductDetails'
import PHScience from './components/sections/PHScience'
import WhyVitaminC from './components/sections/WhyVitaminC'
import Testimonials from './components/sections/Testimonials'
import CallToAction from './components/sections/CallToAction'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'

const queryClient = new QueryClient()

function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
  }, [])

  return (
    <div className="grain bg-cream min-h-screen">
      <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <HeroSection />
      <AwardsMarquee />
      <ProductDetails />
      <PHScience />
      <WhyVitaminC />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ReferralCapture />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
