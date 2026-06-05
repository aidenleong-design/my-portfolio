import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Hero.module.css'

export default function Hero() {
  const line1Ref    = useRef(null)
  const line2Ref    = useRef(null)
  const line3Ref    = useRef(null)
  const subtitleRef = useRef(null)
  const scrollRef   = useRef(null)
  const shapeRef    = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Stagger lines up from clip mask
    tl.from(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      { y: 80, opacity: 0, duration: 1, stagger: 0.14 },
      0.2
    )
    .from(subtitleRef.current, { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
    .from(scrollRef.current,   { opacity: 0, duration: 0.6 },        '-=0.3')
    .from(shapeRef.current,    { opacity: 0, scale: 0.85, duration: 1.2, ease: 'power2.out' }, 0.4)
  }, [])

  return (
    <section className={styles.hero} id="hero">

      {/* Decorative accent mark */}
      <div ref={shapeRef} className={styles.accentShape} aria-hidden="true">
        <svg viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="110" r="98"  stroke="var(--color-accent)" strokeWidth="1.2" />
          <circle cx="110" cy="110" r="62"  stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.45" />
          <circle cx="110" cy="110" r="6"   fill="var(--color-accent)" />
          <line x1="110" y1="12"  x2="110" y2="208" stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.3" />
          <line x1="12"  y1="110" x2="208" y2="110" stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.3" />
        </svg>
      </div>

      <div className={styles.content}>
        {/* TODO: Replace headline copy with your preferred wording */}
        <h1 className={styles.headline} aria-label="Aiden Leong — Product Designer & Illustrator">
          <div className={styles.lineWrap}>
            <span ref={line1Ref} className={`${styles.line} ${styles.lineLight}`}>
              Aiden Leong —
            </span>
          </div>
          <div className={styles.lineWrap}>
            <span ref={line2Ref} className={`${styles.line} ${styles.lineBoldItalic}`}>
              Product Designer
            </span>
          </div>
          <div className={styles.lineWrap}>
            <span ref={line3Ref} className={`${styles.line} ${styles.lineLight}`}>
              & Illustrator
            </span>
          </div>
        </h1>

        {/* TODO: Replace subtitle with your preferred tagline */}
        <p ref={subtitleRef} className={styles.subtitle}>
          Making complex enterprise workflows feel intuitive — and helping users make
          faster, more confident decisions.
        </p>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLabel}>scroll</span>
        <div className={styles.scrollArrow}>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 4v16m0 0l-5.5-5.5M12 20l5.5-5.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
