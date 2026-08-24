import { motion, useReducedMotion } from 'framer-motion'
import styles from './Experience.module.css'

/* TODO: Add earlier roles here if you have more work history to include —
   same shape: { id, company, role, dates, bullets }.
*/
const jobs = [
  {
    id: 1,
    company: 'Respond Crisis Translation',
    role: 'Volunteer Product Designer',
    dates: 'Ongoing',
    bullets: [
      'Design for a volunteer network that connects interpreters to people in crisis in real time.',
      'Work independently across a distributed, mission-driven team with no dedicated design org.',
    ],
  },
  {
    id: 2,
    company: 'Amazon Web Services',
    role: 'Product Designer — Managed Service for Apache Flink',
    dates: 'Q4 2024 · 3 months',
    bullets: [
      'Sole UX lead on a customer-managed encryption workflow spanning three personas and a dependency on Amazon KMS — built to retain a regulated-industry enterprise client.',
      'Designed progressive disclosure for key selection and a scalable browse modal, aligning with the KMS design team\'s existing patterns rather than fragmenting the cross-service experience.',
      'Authored an error-handling system built for persona handoff; the pattern was reviewed and adopted into the AWS design system.',
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
          {/* TODO: Swap this href for your resume file/link once it's ready.
              Pointing at LinkedIn in the meantime so this isn't a dead link. */}
          <a
            href="https://linkedin.com/in/aidenleong"
            target="_blank"
            rel="noopener noreferrer"
            className={`cursor-hover ${styles.resumeBtn}`}
          >
            More on LinkedIn ↗
          </a>
        </div>

      </div>
    </section>
  )
}
