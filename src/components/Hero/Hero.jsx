import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './Hero.module.css'

/* The headline verb cycles — keeps the hero alive without feeling gimmicky.
   TODO: tweak these words to match how you talk about your work. */
const ROTATING_WORDS = ['complex', 'tangled', 'unwieldy', 'overbuilt']

/* Editorial table-of-contents — mirrors the real page sections. */
const INDEX = [
  { num: '01', label: 'Work',       id: 'projects'   },
  { num: '02', label: 'About',      id: 'about'      },
  { num: '03', label: 'Experience', id: 'experience' },
  { num: '04', label: 'Contact',    id: 'contact'    },
]

/* Discipline marquee — repeated in markup so the loop is seamless. */
const DISCIPLINES = [
  'Product Design', 'Enterprise UX', 'Design Systems',
  'Illustration', 'Prototyping', 'B2B SaaS',
]

export default function Hero() {
  const rootRef = useRef(null)
  const wordRef = useRef(null)

  const scrollTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('[data-reveal]', { opacity: 1, y: 0 })
        return
      }

      // Staggered entrance — one beat at a time, top to bottom.
      gsap.from('[data-reveal]', {
        y: 22,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
      })

      // Word-cycle: swap the headline verb on a vertical flip.
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
      {/* Signature: print registration / crop marks at each corner */}
      <span className={`${styles.reg} ${styles.regTL}`} aria-hidden="true" />
      <span className={`${styles.reg} ${styles.regTR}`} aria-hidden="true" />
      <span className={`${styles.reg} ${styles.regBL}`} aria-hidden="true" />
      <span className={`${styles.reg} ${styles.regBR}`} aria-hidden="true" />

      {/* Masthead */}
      <header className={styles.masthead}>
        <span data-reveal>Portfolio — Vol. 01</span>
        <span data-reveal className={styles.mastheadMid}>Product Designer / Illustrator</span>
        {/* TODO: update location if you'd like */}
        <span data-reveal>Available for work · 2026</span>
      </header>

      <div className={styles.body}>
        {/* Left — the cover headline */}
        <div className={styles.main}>
          <p className={styles.kicker} data-reveal>
            <span className={styles.kickerDot} aria-hidden="true" />
            Selected work &amp; experiments
          </p>

          {/* TODO: Replace headline copy with your preferred wording */}
          <h1 className={styles.headline} data-reveal>
            I&apos;m Aiden, a product designer who turns{' '}
            <span className={styles.wordSlot} aria-hidden="true">
              <span ref={wordRef} className={styles.word}>{ROTATING_WORDS[0]}</span>
            </span>
            <span className={styles.srOnly}>{ROTATING_WORDS[0]}</span>{' '}
            enterprise software into something people{' '}
            <em>actually</em> want to use.
          </h1>
        </div>

        {/* Right — magazine contents index */}
        <nav className={styles.index} aria-label="Page sections" data-reveal>
          <span className={styles.indexTitle}>Contents</span>
          <ul>
            {INDEX.map(item => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={(e) => scrollTo(e, item.id)}>
                  <span className={styles.indexNum}>{item.num}</span>
                  <span className={styles.indexLabel}>{item.label}</span>
                  <span className={styles.indexRule} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Discipline marquee — the kinetic footer band */}
      <div className={styles.marquee} data-reveal aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[0, 1].map(dup => (
            <span className={styles.marqueeGroup} key={dup}>
              {DISCIPLINES.map(d => (
                <span className={styles.marqueeItem} key={d}>
                  {d}
                  <span className={styles.marqueeStar}>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
