import { motion, useReducedMotion } from 'framer-motion'
import styles from './Projects.module.css'

/* TODO: Replace each project entry with your real project data.
   - title: project name
   - desc: one-line descriptor
   - tags: array of category strings
   - size: 'full' (spans both columns) or 'half' (single column)
*/
const projects = [
  {
    id: 1,
    title: 'Enterprise Data Platform',
    desc: 'Redesigning a complex analytics workspace for 200+ B2B clients',
    tags: ['UX Design', 'B2B SaaS', 'User Research'],
    size: 'full',
  },
  {
    id: 2,
    title: 'Design System 2.0',
    desc: 'A unified component library that cut design debt by 40%',
    tags: ['Design Systems', 'Figma', 'Documentation'],
    size: 'half',
  },
  {
    id: 3,
    title: 'Onboarding Revamp',
    desc: 'Reducing time-to-value from 14 days to under 3 for new enterprise users',
    tags: ['Information Architecture', 'Prototyping'],
    size: 'half',
  },
  {
    id: 4,
    title: 'Mobile Companion App',
    desc: 'Extending a desktop-first platform to mobile without losing power',
    tags: ['Mobile UX', 'Enterprise', 'Cross-platform'],
    size: 'full',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden:   { opacity: 0, y: 44 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.inner}>

        <motion.header
          className={styles.header}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className={`text-caption ${styles.label}`}>Selected Work</span>
          <h2 className={styles.title}>Projects that mattered.</h2>
        </motion.header>

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
              className={`${styles.card} ${styles[project.size]}`}
              variants={shouldReduceMotion ? {} : itemVariants}
              data-cursor="project"
            >
              {/* TODO: Replace this placeholder div with a real <img> or background-image */}
              <div className={styles.imageWrap}>
                <div className={styles.imagePlaceholder}>
                  <span className="text-caption">[{project.title}]</span>
                </div>
                <div className={styles.overlay} aria-hidden="true" />
              </div>

              <div className={styles.cardContent}>
                {/* TODO: Replace project title */}
                <h3 className={styles.cardTitle}>{project.title}</h3>
                {/* TODO: Replace project description */}
                <p className={styles.cardDesc}>{project.desc}</p>
                <div className={styles.tags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
