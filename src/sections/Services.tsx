import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { Backdrop } from '../components/layout/Beams'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { services } from '../data/profile'

/** One accent per service ring (cycles if more services are added). */
const accents = ['#38bdf8', '#a855f7', '#22c55e', '#f97316', '#f43f5e', '#22d3ee', '#f59e0b', '#818cf8']
const PER_ROW = 4

const rows = Array.from({ length: Math.ceil(services.length / PER_ROW) }, (_, r) =>
  services.slice(r * PER_ROW, r * PER_ROW + PER_ROW),
)

/** Numbered steps: coloured icon rings joined by an animated dashed line, 3D tilt cards below. */
export function Services() {
  return (
    <section id="services" className="relative overflow-hidden px-5 py-20 sm:py-24">
      <Backdrop variant="grid" />
      <div className="relative mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="Services"
          title="What I Do"
          subtitle="End-to-end Odoo services — from requirement gathering to go-live and support."
        />

        <div className="mt-14 space-y-12">
          {rows.map((row, r) => (
            <div key={r} className="relative">
              {/* dashed connector through the ring centres (desktop) */}
              <div aria-hidden className="absolute top-12 right-[12.5%] left-[12.5%] hidden lg:block">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-0 origin-left border-t-2 border-dashed border-white/15"
                />
                <motion.span
                  className="absolute -top-[4px] size-1.5 rounded-full bg-sky shadow-[0_0_12px_3px_rgb(138_165_255/0.8)]"
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: r * 0.8 }}
                />
              </div>

              <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
                {row.map((s, i) => {
                  const n = r * PER_ROW + i
                  const c = accents[n % accents.length]
                  return (
                    <motion.li
                      key={s.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6, delay: i * 0.12 }}
                      className="group/step flex flex-col items-center"
                      style={{ '--c': c } as CSSProperties}
                    >
                      {/* ring */}
                      <motion.div
                        initial={{ scale: 0.6 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 + i * 0.12 }}
                        className="relative z-10 [perspective:600px]"
                      >
                        <div className="grid size-20 place-items-center rounded-full border-2 border-[var(--c)] bg-[#070915] text-[var(--c)] shadow-[0_0_0_6px_rgb(7_9_21),0_0_28px_-4px_var(--c),inset_0_0_18px_-6px_var(--c)] transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/step:[transform:rotateY(360deg)] group-hover/step:shadow-[0_0_0_6px_rgb(7_9_21),0_0_44px_0_var(--c),inset_0_0_24px_-4px_var(--c)] sm:size-24">
                          <s.icon className="size-7 sm:size-8" aria-hidden strokeWidth={1.8} />
                        </div>
                        <span className="lx-key absolute -top-1 -right-1 grid size-8 place-items-center rounded-full bg-[#11142b] text-[13px] font-semibold text-white">
                          {n + 1}
                        </span>
                      </motion.div>

                      {/* card */}
                      <Card max={8} className="mt-6 h-full w-full" innerClassName="px-4 py-5 text-center sm:px-5 sm:py-6">
                        <span
                          aria-hidden
                          className="absolute inset-x-10 top-0 h-px opacity-60 transition-opacity duration-500 group-hover/step:opacity-100"
                          style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }}
                        />
                        <h3 className="depth-2 text-[15px] leading-snug font-semibold sm:text-[17px]">{s.title}</h3>
                        <p className="depth-1 mt-2 text-[12.5px] leading-relaxed text-muted sm:text-[14px]">{s.description}</p>
                      </Card>
                    </motion.li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
