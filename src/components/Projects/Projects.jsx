import { motion, useReducedMotion } from 'framer-motion'
import styles from './Projects.module.css'

/* TODO: Replace each project entry with your real project data.
   - title: project name
   - role: short descriptor shown on right (e.g. "UX Design · B2B SaaS")
   - bg: placeholder background colour — remove once you add a real image
   - desc: kept for accessibility / future use
*/
const projects = [
  {
    id: 1,
    title: 'Enterprise Data Platform',
    role: 'UX Design · B2B SaaS',
    bg: '#C8BFB5',
    desc: 'Redesigning a complex analytics workspace for 200+ B2B clients',
  },
  {
    id: 2,
    title: 'Design System 2.0',
    role: 'Design Systems · Figma',
    bg: '#1E1D1B',
    desc: 'A unified component library that cut design debt by 40%',
  },
  {
    id: 3,
    title: 'Onboarding Revamp',
    role: 'Information Architecture',
    bg: '#D0D7DF',
    desc: 'Reducing time-to-value from 14 days to under 3 for new enterprise users',
  },
  {
    id: 4,
    title: 'Mobile Companion App',
    role: 'Mobile UX · Enterprise',
    bg: '#3558BF',
    desc: 'Extending a desktop-first platform to mobile without losing power',
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

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.inner}>

        {/* Editorial section marker */}
        <div className={styles.marker}>
          <span className={styles.markerNum}>§ 01</span>
          <span className={styles.markerLabel}>Selected Work</span>
          <span className={styles.markerNote}>Four projects, 2022—2026</span>
        </div>

        <motion.div
          className={styles.grid}
          variants={shouldReduceMotion ? {} : containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              className={styles.card}
              variants={shouldReduceMotion ? {} : itemVariants}
              data-cursor="project"
            >
              {/* TODO: Replace this div with a real <img src="..." alt="..." className={styles.projectImage} /> */}
              <div
                className={styles.imageWrap}
                style={{ backgroundColor: project.bg }}
                aria-label={project.title}
              >
                <span className={styles.cardIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className={styles.meta}>
                <div className={styles.metaText}>
                  {/* TODO: Replace project title */}
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <span className={styles.cardRule} aria-hidden="true" />
                </div>
                {/* TODO: Replace role label */}
                <span className={styles.cardRole}>{project.role}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
