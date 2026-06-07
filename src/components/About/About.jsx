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
