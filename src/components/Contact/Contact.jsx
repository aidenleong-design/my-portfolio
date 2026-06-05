import { motion, useReducedMotion } from 'framer-motion'
import styles from './Contact.module.css'

export default function Contact() {
  const shouldReduceMotion = useReducedMotion()

  const fadeUp = shouldReduceMotion
    ? {}
    : {
        initial:     { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition:  { duration: 0.6, ease: 'easeOut' },
        viewport:    { once: true, margin: '-80px' },
      }

  const year = new Date().getFullYear()

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.inner}>

        <motion.div className={styles.content} {...fadeUp}>
          <span className={`text-caption ${styles.label}`}>Get in touch</span>

          {/* TODO: Replace headline if you want different wording */}
          <h2 className={styles.headline}>
            Let's work<br />
            <em>together.</em>
          </h2>

          {/* TODO: Replace copy with your preferred message */}
          <p className={styles.subtext}>
            Whether it's an enterprise product challenge, an illustration commission,
            or just a great conversation — I'd love to hear from you.
          </p>

          <div className={styles.links}>
            {/* Email */}
            <a
              href="mailto:aidenleong.design@gmail.com"
              className={`cursor-hover ${styles.contactLink}`}
            >
              aidenleong.design@gmail.com
            </a>

            {/* TODO: Replace "#linkedin" with your LinkedIn profile URL */}
            <a
              href="#linkedin"
              className={`cursor-hover ${styles.contactLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </motion.div>

      </div>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © {year} Aiden Leong &nbsp;·&nbsp; Designed & built by Aiden
        </p>
      </footer>
    </section>
  )
}
