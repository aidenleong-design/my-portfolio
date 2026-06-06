import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'
import CustomCursor from './components/CustomCursor/CustomCursor'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Contact from './components/Contact/Contact'
import About from './components/About/About'

function HomePage() {
  return (
    <main>
      <Hero />
      <Projects />
      <Experience />
      <Contact />
    </main>
  )
}

function AboutPage() {
  return (
    <main>
      <About />
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}
