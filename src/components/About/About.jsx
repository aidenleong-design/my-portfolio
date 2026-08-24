import { motion, useReducedMotion } from 'framer-motion'
import styles from './About.module.css'

export default function About() {
  const shouldReduceMotion = useReducedMotion()

  const textGroup = shouldReduceMotion
    ? {}
    : {
        initial:     'hidden',
        whileInView: 'visible',
        viewport:    { once: true, margin: '-100px' },
        variants:    { visible: { transition: { staggerChildren: 0.1 } } },
      }

  const textItem = shouldReduceMotion
    ? {}
    : {
        variants: {
          hidden:  { opacity: 0, y: 28 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
        },
      }

  const fadeUpDelayed = shouldReduceMotion
    ? {}
    : {
        initial:     { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        transition:  { duration: 0.6, ease: 'easeOut', delay: 0.2 },
        viewport:    { once: true, margin: '-100px' },
      }

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>

        {/* Text column */}
        <motion.div className={styles.textCol} {...textGroup}>
          <motion.span className={`text-caption ${styles.label}`} {...textItem}>
            About
          </motion.span>

          <motion.h2 className={styles.heading} {...textItem}>
            Designing for<br />
            <em>people, not screens.</em>
          </motion.h2>

          <motion.div className={styles.bio} {...textItem}>
            <p className="text-body">
              I'm a Product Designer based in the San Francisco Bay Area with 3+ years
              designing B2B SaaS and enterprise software — the kind of products with
              five stakeholders, three permission levels, and a compliance officer who
              has to sign off before anything ships. I'm at my best in that mess: mapping
              who actually needs what, then building a case for the decision that survives
              contact with legal, security, and an engineering team with opinions of
              their own.
            </p>
            <p className="text-body">
              Right now I volunteer as a Product Designer for{' '}
              <a
                href="https://www.respondcrisistranslation.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={`cursor-hover ${styles.inlineLink}`}
              >
                Respond Crisis Translation
              </a>
              , a volunteer network that gets interpreters to people in crisis. Outside
              of client work, I illustrate — it's where I think looser and more
              instinctively, and it keeps my eye for composition sharp for everything
              else I design.
            </p>
          </motion.div>
        </motion.div>

        {/* Photo column */}
        <motion.div className={styles.imageCol} {...fadeUpDelayed}>
          {/* TODO: Replace this placeholder with an <img> of your actual photo */}
          <div className={styles.imagePlaceholder}>
            <span className="text-caption">[Photo of Aiden]</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
