import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Features from "./components/Features"
import Stats from "./components/Stats"
import Footer from "./components/Footer"
import AnimatedBackground from "./components/AnimatedBackground"
import Testimonials from "./components/Testimonials"
import AdminPanel from "./components/admin/AdminPanel"

function PublicSite() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-gradient-koz min-h-screen overflow-hidden">
      <AnimatedBackground scrollY={scrollY} />
      <Navbar />

      <main className="relative z-10 page-container">
        <section className="hero-section">
          <Hero />
        </section>

        <hr className="section-divider" />

        <Stats />
        <Features />
        <Testimonials />
      </main>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  )
}
