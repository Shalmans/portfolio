import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  className?: string
}

/** Centered pill + Inter 44px heading + muted subtitle (LanderX section header). */
export function SectionHeading({ eyebrow, title, subtitle, className = '' }: Props) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      <Reveal>
        <Pill>{eyebrow}</Pill>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-4 text-[32px] leading-[1.15] font-medium tracking-[-0.01em] text-balance sm:text-[44px]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-muted text-pretty">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}

export function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-[13px] font-medium tracking-[0.02em] text-sky uppercase shadow-[0_0_0_1px_rgb(41_52_255/0.6),inset_0_0_12px_rgb(41_52_255/0.35)] ${className}`}
    >
      {children}
    </span>
  )
}
