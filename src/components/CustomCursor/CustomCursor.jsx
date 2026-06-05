import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const label = labelRef.current

    // Centre cursor on pointer using GSAP percentages + absolute position
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 })

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3.out' })

    let revealed = false

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      if (!revealed) {
        gsap.to(cursor, { opacity: 1, duration: 0.3 })
        revealed = true
      }
    }

    const expand = (showLabel) => {
      gsap.to(cursor, { width: 52, height: 52, duration: 0.35, ease: 'power2.out' })
      if (showLabel) {
        gsap.to(label, { opacity: 1, duration: 0.2, delay: 0.1 })
      }
    }

    const contract = () => {
      gsap.to(cursor, { width: 10, height: 10, duration: 0.35, ease: 'power2.out' })
      gsap.to(label, { opacity: 0, duration: 0.15 })
    }

    const onOver = (e) => {
      const projectCard = e.target.closest('[data-cursor="project"]')
      const interactive = e.target.closest('a, button, .cursor-hover')
      if (projectCard) {
        expand(true)
      } else if (interactive) {
        expand(false)
      }
    }

    const onOut = (e) => {
      const stillInside =
        e.relatedTarget &&
        (e.relatedTarget.closest('a, button, .cursor-hover, [data-cursor="project"]'))
      if (!stillInside) {
        contract()
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
      <span ref={labelRef} className={styles.label}>View</span>
    </div>
  )
}
