import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Hero.module.css'

const ROTATING_WORDS = ['ambiguous', 'undefined', 'contested']

export default function Hero() {
  const rootRef = useRef(null)
  const wordRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('[data-reveal]', { opacity: 1, y: 0 })
        return
      }

      gsap.from('[data-reveal]', {
        y: 22,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
      })

      const el = wordRef.current
      let i = 0
      const cycle = () => {
        i = (i + 1) % ROTATING_WORDS.length
        gsap.timeline()
          .to(el, { yPercent: -110, opacity: 0, duration: 0.32, ease: 'power2.in' })
          .add(() => { el.textContent = ROTATING_WORDS[i] })
          .fromTo(el,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.42, ease: 'power3.out' })
      }
      const id = setInterval(cycle, 2400)
      return () => clearInterval(id)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.hero} id="hero" ref={rootRef}>
      <div className={styles.body}>
        <div className={styles.main}>
          <h1 className={styles.headline} data-reveal>
            I&apos;m Aiden, a product designer who takes{' '}
            <span className={styles.wordSlot} aria-hidden="true">
              <span ref={wordRef} className={styles.word}>{ROTATING_WORDS[0]}</span>
            </span>
            <span className={styles.srOnly}>ambiguous</span>{' '}
            enterprise problems and turns them into decisions{' '}
            <b><em>someone can stand behind</em></b>.
          </h1>
          <p className={styles.subhead} data-reveal>
            Product Designer specializing in B2B SaaS and enterprise software.
            I don&apos;t guess my way through dense, multi-stakeholder problems —
            I map them, test the assumptions, and design a rationale that holds
            up when compliance, engineering, and legal all ask why.
          </p>
        </div>
      </div>
    </section>
  )
}
