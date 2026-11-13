import { type MotionStyle, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'

type Props = { children: ReactNode; className?: string; max?: number; glare?: boolean; lift?: number }

/**
 * Mouse-driven 3D tilt with a moving light sheen.
 * Children marked .depth-1/.depth-2 float above the surface (preserve-3d).
 * Mouse only — touch devices and reduced-motion users get a flat card.
 */
export function Tilt({ children, className = '', max = 7, glare = true, lift = 1 }: Props) {
  const reduce = useReducedMotion()
  const rx = useSpring(0, { stiffness: 160, damping: 16 })
  const ry = useSpring(0, { stiffness: 160, damping: 16 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const go = useSpring(0, { stiffness: 120, damping: 20 })
  const scale = useSpring(1, { stiffness: 220, damping: 18 })
  // pointer position as CSS vars, for children that react to the light (e.g. foil)
  const mx = useMotionTemplate`${gx}%`
  const my = useMotionTemplate`${gy}%`
  const sheen = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(138 165 255 / 0.16), transparent 55%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * max * 2)
    rx.set(-(py - 0.5) * max * 2)
    gx.set(px * 100)
    gy.set(py * 100)
    go.set(1)
    scale.set(lift)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
    go.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={
        { rotateX: rx, rotateY: ry, scale, transformPerspective: 1100, transformStyle: 'preserve-3d', '--mx': mx, '--my': my } as MotionStyle
      }
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: sheen, opacity: go }}
        />
      )}
    </motion.div>
  )
}
