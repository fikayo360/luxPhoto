import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import HeroSection from './hero/hero'
import AboutSection from './about/about'
import ServicesSection from './services/services'
import FeaturedWorkGallery from './works/works'
import ExperienceStatsSection from './stats/stats'
import TestimonialsSection from './reviews/reviews'
import ProcessSection from './process/process'
import InstagramGridSection from './contact/contact'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <FeaturedWorkGallery />
      <ExperienceStatsSection />
      <TestimonialsSection />
      <ProcessSection />
      <InstagramGridSection />
    </>
  )
}

export default App
