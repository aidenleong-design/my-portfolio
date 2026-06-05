import { motion, useReducedMotion } from 'framer-motion'
import styles from './Skills.module.css'

const categories = [
  {
    title: 'UX Design',
    items: ['End-to-end product design', 'User flows & journey mapping', 'Wireframing & prototyping', 'Usability testing'],
  },
  {
    title: 'Enterprise & B2B SaaS',
    items: ['Multi-stakeholder workflows', 'Complex data dashboards', 'Permission & role systems', 'Customer-facing admin tools'],
  },
  {
    title: 'Illustration',
    items: ['Digital illustration', 'Character design', 'Editorial & conceptual art', 'Brand illustration'],
  },
  {
    title: 'Research & Strategy',
    items: ['User interviews & synthesis', 'Information architecture', 'Design principles & systems', 'Cross-functional facilitation'],
  },
]

/* TODO: Replace tool names with your actual toolkit */
const tools = [
  'Figma', 'Protopie', 'Principle', 'FigJam', 'Framer',
  'Notion', 'Linear', 'Miro', 'Zeplin', 'Storybook',
  'Figma', 'Protopie', 'Principle', 'FigJam', 'Framer',
  'Notion', 'Linear', 'Miro', 'Zeplin', 'Storybook',
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Skills() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className={styles.skills} id="skills">
      <div className={styles.inner}>

        <motion.header
          className={styles.header}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className={`text-caption ${styles.label}`}>Capabilities</span>
          <h2 className={styles.title}>What I bring to the table.</h2>
        </motion.header>

        {/* Category grid */}
        <motion.div
          className={styles.grid}
          variants={shouldReduceMotion ? {} : containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {categories.map(cat => (
            <motion.div
              key={cat.title}
              className={styles.category}
              variants={shouldReduceMotion ? {} : itemVariants}
            >
              <h3 className={styles.categoryTitle}>{cat.title}</h3>
              <ul className={styles.skillList}>
                {cat.items.map(item => (
                  <li key={item} className={styles.skillItem}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools marquee */}
        <div className={styles.marqueeSection} aria-label="Tools">
          <p className={styles.marqueeLabel}>Tools</p>
          <div className={styles.marqueeWrapper}>
            <div className={styles.marqueeTrack} aria-hidden="true">
              {tools.map((tool, i) => (
                <span
                  key={i}
                  className={`${styles.marqueeItem} ${i % 4 === 1 ? styles.marqueeAccent : ''}`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
