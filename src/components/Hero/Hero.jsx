import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Hero.module.css'

export default function Hero() {
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const scrollRef   = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(headlineRef.current, { y: 24, opacity: 0, duration: 0.9 }, 0.1)
      .from(subtitleRef.current, { y: 16, opacity: 0, duration: 0.7 }, '-=0.5')
      .from(scrollRef.current,   { opacity: 0, duration: 0.6 },        '-=0.3')
  }, [])

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.content}>

        {/* TODO: Replace headline copy with your preferred wording */}
        <h1 ref={headlineRef} className={styles.headline}>
          I'm Aiden, a product designer who turns{' '}
          <em>complex</em> enterprise software into something
          people actually want to use.
        </h1>

        {/* TODO: Replace tagline */}
        <p ref={subtitleRef} className={styles.subtitle}>
          Specialising in B2B SaaS &amp; enterprise products · Also an illustrator.
        </p>

      </div>

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
