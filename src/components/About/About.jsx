import { motion, useReducedMotion } from 'framer-motion'
import styles from './About.module.css'

export default function About() {
  const shouldReduceMotion = useReducedMotion()

  const fadeUp = shouldReduceMotion
    ? {}
    : {
        initial:     { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition:  { duration: 0.6, ease: 'easeOut' },
        viewport:    { once: true, margin: '-100px' },
      }

  const fadeUpDelayed = shouldReduceMotion
    ? {}
    : {
        initial:     { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition:  { duration: 0.6, ease: 'easeOut', delay: 0.18 },
        viewport:    { once: true, margin: '-100px' },
      }

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>

        {/* Text column */}
        <motion.div className={styles.textCol} {...fadeUp}>
          <span className={`text-caption ${styles.label}`}>About</span>

          <h2 className={styles.heading}>
            Designing for<br />
            <em>people, not screens.</em>
          </h2>

          <div className={styles.bio}>
            {/* TODO: Replace with your actual bio paragraph 1 */}
            <p className="text-body">
              I'm a Product Designer based in San Francisco, specialising in B2B SaaS and
              enterprise software. My work lives at the intersection of complex systems and
              human clarity — turning sprawling workflows, data-dense dashboards, and
              multi-stakeholder processes into experiences that feel almost obvious.
            </p>
            {/* TODO: Replace with your actual bio paragraph 2 */}
            <p className="text-body">
              When I'm not wrestling with information architecture or running usability
              studies, I'm illustrating. Drawing is where I think differently — looser,
              more instinctive. It keeps my eye for composition sharp and reminds me that
              design, at its heart, is about making things feel just right.
            </p>
          </div>
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
