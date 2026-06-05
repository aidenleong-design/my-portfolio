import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import styles from './Fun.module.css'

/* TODO: Replace illustration placeholders with real <img> elements or background images.
   Swap the [Illustration N] labels for your actual artwork titles.
*/
const illustrations = [
  { id: 1, label: 'Illustration I'   },
  { id: 2, label: 'Illustration II'  },
  { id: 3, label: 'Illustration III' },
  { id: 4, label: 'Illustration IV'  },
  { id: 5, label: 'Illustration V'   },
  { id: 6, label: 'Illustration VI'  },
]

/* TODO: Replace with your actual interests */
const likes = [
  'Ramen at 11pm', 'City cycling', 'Dim sum sundays',
  'Lo-fi hip-hop', 'Independent bookshops', 'Studio Ghibli marathons',
  'Matcha anything', 'Early morning runs', 'Analog photography',
  'Typography nerd', 'Farmer\'s markets', 'Slow travel',
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Fun() {
  const gridRef         = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  // GSAP spring hover on illustration cards
  useEffect(() => {
    if (shouldReduceMotion) return
    const grid = gridRef.current
    if (!grid) return

    const cards = Array.from(grid.querySelectorAll(`.${styles.illustrationCard}`))
    const cleanups = []

    cards.forEach(card => {
      const onEnter = () => {
        const dir = Math.random() > 0.5 ? 1 : -1
        gsap.to(card, { rotation: dir * 3, scale: 1.05, duration: 0.3, ease: 'back.out(2)' })
      }
      const onLeave = () => {
        gsap.to(card, { rotation: 0, scale: 1, duration: 0.55, ease: 'elastic.out(1, 0.4)' })
      }
      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach(fn => fn())
  }, [shouldReduceMotion])

  return (
    <section className={styles.fun} id="fun">
      <div className={styles.inner}>

        <motion.header
          className={styles.header}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className={`text-caption ${styles.label}`}>Side Quests</span>
          <h2 className={styles.sectionTitle}>
            The fun stuff.
            <span className={styles.accentLine} aria-hidden="true" />
          </h2>
        </motion.header>

        {/* Illustration grid */}
        <motion.div
          ref={gridRef}
          className={styles.grid}
          variants={shouldReduceMotion ? {} : containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {illustrations.map(ill => (
            <motion.div
              key={ill.id}
              className={styles.illustrationCard}
              variants={shouldReduceMotion ? {} : cardVariants}
            >
              {/* TODO: Replace with <img src="..." alt="..." /> for your actual illustration */}
              <span className="text-caption">[{ill.label}]</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Things I like */}
        <motion.div
          className={styles.likes}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <h3 className={styles.likesTitle}>Things I love —</h3>
          <div className={styles.likesList}>
            {/* TODO: Replace with your actual interests */}
            {likes.map(item => (
              <span key={item} className={`cursor-hover ${styles.likeItem}`}>{item}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
