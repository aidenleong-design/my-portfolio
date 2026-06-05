import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Work',       id: 'projects'   },
  { label: 'About',      id: 'about'      },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact'    },
]

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const scrollTo = (e, id) => {
    e.preventDefault()
    setIsOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>

      {/* TODO: Replace "AL" with your actual logo mark or monogram SVG */}
      <a href="/" className={styles.logo} aria-label="Aiden Leong — Home">AL</a>

      <ul className={styles.desktopLinks}>
        {navLinks.map(link => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={styles.navLink}
              onClick={(e) => scrollTo(e, link.id)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`${styles.mobileOverlay} ${isOpen ? styles.mobileOverlayOpen : ''}`} aria-hidden={!isOpen}>
        <ul className={styles.mobileLinks}>
          {navLinks.map((link, i) => (
            <li key={link.id} style={{ '--delay': `${i * 0.06}s` }}>
              <a
                href={`#${link.id}`}
                className={styles.mobileLink}
                onClick={(e) => scrollTo(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
