import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'About',      id: 'about'      },
  { label: 'Work',       id: 'projects'   },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Experience', id: 'experience' },
  { label: 'Fun',        id: 'fun'        },
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

  // Close mobile nav on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll while mobile nav is open
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
      <a href="/" className={styles.logo}>Aiden Leong</a>

      {/* Desktop navigation */}
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

      {/* Hamburger button — CSS only, no library */}
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

      {/* Mobile overlay */}
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
