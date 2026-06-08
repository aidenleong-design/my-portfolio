import { motion, useReducedMotion } from 'framer-motion'
import styles from './Projects.module.css'

/* TODO: Replace each project entry with your real project data.
   - title: project name
   - year: year shown in the badge next to the title
   - challenge / services / role: the three meta columns
   - bg: placeholder background colour — remove once you add a real image/video
*/
const projects = [
  {
    id: 1,
    title: 'Improved Encrypted Data Applications',
    year: '2024',
    challenge: 'Ship a complex encryption workflow for B2B clients without breaking trust in a high-stakes enterprise deal.',
    services: ['Product Design', 'Design Systems'],
    role: 'Led the end-to-end workflow design and partnered with engineering to land it inside the AWS design system.',
    bg: '#C8BFB5',
  },
  {
    id: 2,
    title: 'Design System 2.0',
    year: '2023',
    challenge: 'Unify a fractured component library across five product teams without slowing active roadmaps.',
    services: ['Design Systems', 'Figma', 'Documentation'],
    role: 'Audited the existing library, defined new tokens and components, and rolled it out — cutting design debt by 40%.',
    bg: '#1E1D1B',
  },
  {
    id: 3,
    title: 'Onboarding Revamp',
    year: '2023',
    challenge: 'New enterprise users were taking 14 days to reach their first meaningful outcome.',
    services: ['Information Architecture', 'Interaction Design'],
    role: 'Restructured the activation flow end to end, bringing time-to-value down to under three days.',
    bg: '#D0D7DF',
  },
  {
    id: 4,
    title: 'Mobile Companion App',
    year: '2022',
    challenge: 'Extend a desktop-first platform to mobile for field teams without losing the power users relied on.',
    services: ['Mobile UX', 'Prototyping'],
    role: 'Defined the mobile interaction model and shipped the first release with the platform team.',
    bg: '#3558BF',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion()

  const labelReveal = shouldReduceMotion
    ? {}
    : {
        initial:     { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        transition:  { duration: 0.55, ease: 'easeOut' },
        viewport:    { once: true, margin: '-60px' },
      }

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.inner}>

        <motion.div className={styles.sectionLabel} {...labelReveal}>
          <span className={styles.label}>Work</span>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={shouldReduceMotion ? {} : containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projects.map(project => (
            <motion.article
              key={project.id}
              className={styles.card}
              variants={shouldReduceMotion ? {} : itemVariants}
              style={{ '--accent': project.bg }}
            >
              <header className={styles.cardHeader}>
                <div className={styles.intro}>
                  <span className={styles.yearBadge}>
                    <span className={styles.accentDot} />
                    {project.year}
                  </span>
                  {/* TODO: Replace project title */}
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                </div>

                <div className={styles.metaGrid}>
                  <div className={styles.metaCol}>
                    <span className={styles.metaLabel}>Challenge</span>
                    {/* TODO: Replace challenge description */}
                    <p className={styles.metaText}>{project.challenge}</p>
                  </div>

                  <div className={styles.metaCol}>
                    <span className={styles.metaLabel}>Services</span>
                    <div className={styles.tagList}>
                      {/* TODO: Replace service tags */}
                      {project.services.map(service => (
                        <span key={service} className={styles.tag}>{service}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.metaCol}>
                    <span className={styles.metaLabel}>Role</span>
                    {/* TODO: Replace role description */}
                    <p className={styles.metaText}>{project.role}</p>
                  </div>
                </div>
              </header>

              <div className={styles.imageWrap} data-cursor="project">
                {/* TODO: Replace this div with a real <video muted loop playsInline className={styles.media} /> (or <img>) */}
                <div
                  className={styles.media}
                  style={{ backgroundColor: project.bg }}
                  aria-label={project.title}
                />
                <div className={styles.tint} />
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
