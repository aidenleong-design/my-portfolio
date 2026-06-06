import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Work',       type: 'scroll', id: 'projects'   },
  { label: 'About',      type: 'route',  href: '/about'   },
  { label: 'Experience', type: 'scroll', id: 'experience' },
  { label: 'Contact',    type: 'scroll', id: 'contact'    },
]

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

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
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const renderLink = (link, className) => {
    if (link.type === 'route') {
      return (
        <Link
          to={link.href}
          className={className}
          onClick={() => setIsOpen(false)}
        >
          {link.label}
        </Link>
      )
    }
    return (
      <a
        href={`#${link.id}`}
        className={className}
        onClick={(e) => scrollTo(e, link.id)}
      >
        {link.label}
      </a>
    )
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>

      {/* TODO: Replace "AL" with your actual logo mark or monogram SVG */}
      <Link to="/" className={styles.logo} aria-label="Aiden Leong — Home">AL</Link>

      <ul className={styles.desktopLinks}>
        {navLinks.map(link => (
          <li key={link.label}>
            {renderLink(link, styles.navLink)}
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
            <li key={link.label} style={{ '--delay': `${i * 0.06}s` }}>
              {renderLink(link, styles.mobileLink)}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
