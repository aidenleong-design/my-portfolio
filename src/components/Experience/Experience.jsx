import { motion, useReducedMotion } from 'framer-motion'
import styles from './Experience.module.css'

/* TODO: Replace each job entry with your real work history.
   Fields: company, role, dates, bullets (array of strings)
*/
const jobs = [
  {
    id: 1,
    company: 'Acme Corp',
    role: 'Senior Product Designer',
    dates: '2022 — Present',
    bullets: [
      'Led end-to-end design for a multi-stakeholder data platform serving 200+ enterprise clients across APAC.',
      'Established a shared design system that reduced component-build time by 40% and eliminated cross-team inconsistency.',
      'Facilitated weekly design reviews and cross-functional workshops to align product, engineering, and customer success.',
    ],
  },
  {
    id: 2,
    company: 'Studio Somewhere',
    role: 'Product Designer',
    dates: '2020 — 2022',
    bullets: [
      'Owned the redesign of a core admin dashboard used daily by 3,000+ operations managers.',
      'Conducted 60+ user interviews across three countries to surface unmet needs in the onboarding flow.',
      'Collaborated with front-end engineers to build a reusable pattern library in Storybook.',
    ],
  },
  {
    id: 3,
    company: 'Freelance',
    role: 'UX Designer & Illustrator',
    dates: '2018 — 2020',
    bullets: [
      'Designed web and mobile products for early-stage startups in fintech, health, and e-commerce.',
      'Created editorial illustrations for publications and brand campaigns.',
    ],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const entryVariants = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Experience() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className={styles.experience} id="experience">
      <div className={styles.inner}>

        <motion.header
          className={styles.header}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className={`text-caption ${styles.label}`}>Experience</span>
          <h2 className={styles.title}>Where I've worked.</h2>
        </motion.header>

        <motion.div
          className={styles.timeline}
          variants={shouldReduceMotion ? {} : containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {jobs.map(job => (
            <motion.div
              key={job.id}
              className={styles.entry}
              variants={shouldReduceMotion ? {} : entryVariants}
            >
              <div className={styles.dot} aria-hidden="true" />

              {/* TODO: Replace company name */}
              <p className={styles.company}>{job.company}</p>
              {/* TODO: Replace role title */}
              <p className={styles.role}>{job.role}</p>
              {/* TODO: Replace date range */}
              <p className={`text-caption ${styles.dates}`}>{job.dates}</p>

              <ul className={styles.bullets}>
                {/* TODO: Replace bullet points */}
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className={styles.cta}>
          {/* TODO: Replace "#resume" with your Google Drive resume link */}
          <a href="#resume" className={`cursor-hover ${styles.resumeBtn}`}>
            View Full Resume ↗
          </a>
        </div>

      </div>
    </section>
  )
}
