import type { ReactNode } from 'react'
import { Tilt } from './Tilt'

type Props = {
  children: ReactNode
  className?: string
  innerClassName?: string
  tilt?: boolean
  max?: number
  lift?: number
}

/** LanderX-style card with 3D mouse tilt; inner content keeps preserve-3d for depth layers. */
export function Card({ children, className = '', innerClassName = '', tilt = true, max, lift }: Props) {
  const inner = <div className={`preserve-3d relative h-full ${innerClassName}`}>{children}</div>
  if (!tilt) return <div className={`lx-card group relative ${className}`}>{inner}</div>
  return (
    <Tilt max={max} lift={lift} className={`lx-card lx-card-hover group ${className}`}>
      {inner}
    </Tilt>
  )
}

export function IconBox({ children, className = 'size-11' }: { children: ReactNode; className?: string }) {
  return <span className={`lx-icon shrink-0 ${className}`}>{children}</span>
}
