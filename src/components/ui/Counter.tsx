import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type Props = { to: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }

/** Counts from 0 to `to` once visible. */
export function Counter({ to, duration = 2, prefix = '', suffix = '', decimals = 0 }: Props) {
  const fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controls.stop()
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {fmt.format(reduce && inView ? to : val)}
      {suffix}
    </span>
  )
}
