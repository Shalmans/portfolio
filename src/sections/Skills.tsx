import { motion } from 'framer-motion'
import { Backdrop } from '../components/layout/Beams'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { skillGroups } from '../data/profile'

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden px-5 py-24 sm:py-28">
      <Backdrop variant="beams" />
      <div className="relative mx-auto max-w-[1040px]">
        <SectionHeading
          eyebrow="Technical stack"
          title="My Skillset"
          subtitle="Languages, frameworks, Odoo modules and delivery practices I use every day."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, gi) => (
            <Reveal key={g.title} delay={(gi % 3) * 0.07} className="h-full">
              <Card max={6} className="h-full" innerClassName="p-5 sm:p-6">
                <h3 className="depth-2 border-b border-white/[0.08] pb-4 text-[14px] font-semibold tracking-[0.06em] text-white uppercase">
                  {g.title}
                </h3>
                <ul className="depth-1 mt-5 space-y-[18px]">
                  {g.skills.map((s, si) => (
                    <li key={s.name}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[14px] font-medium text-white/90">{s.name}</span>
                        <span className="shrink-0 text-[12px] font-semibold text-sky tabular-nums">{s.level}%</span>
                      </div>
                      <div
                        className="mt-2 h-[3px] overflow-hidden rounded-full bg-white/[0.08]"
                        role="meter"
                        aria-label={`${s.name} proficiency`}
                        aria-valuenow={s.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-brand to-sky shadow-[0_0_8px_rgb(41_52_255/0.8)]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.1 + si * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
