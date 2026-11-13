import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { softSkills } from '../data/profile'

const CYCLE_MS = 3200

/**
 * Compact soft-skills strip: keycap chips that auto-cycle (paused on hover/focus);
 * the active chip pops up and its one-line description shows below with a progress bar.
 */
export function SoftSkills() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setActive((i) => (i + 1) % softSkills.length), CYCLE_MS)
    return () => clearTimeout(t)
  }, [active, paused])

  const cur = softSkills[active]

  return (
    <section id="soft-skills" className="relative overflow-hidden px-5 py-12 sm:py-14">
      <div className="relative mx-auto max-w-[1000px]">
        <SectionHeading eyebrow="Core competencies" title="Professional soft skills" />

        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <ul className="mt-7 flex flex-wrap justify-center gap-2.5" aria-label="Soft skills">
            {softSkills.map((s, i) => {
              const on = i === active
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => {
                      setActive(i)
                      setPaused(true)
                    }}
                    onBlur={() => setPaused(false)}
                    onClick={() => setActive(i)}
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-[14px] transition-[transform,background-color,color,box-shadow] duration-300 ${
                      on
                        ? 'lx-key-on -translate-y-1 bg-brand text-white'
                        : 'lx-key bg-[#0c0f24] text-muted hover:-translate-y-0.5 hover:text-white'
                    }`}
                  >
                    <s.icon className={`size-4 ${on ? 'text-white' : 'text-sky'}`} aria-hidden />
                    {s.title}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* active description */}
          <div className="relative mx-auto mt-6 max-w-xl text-center" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="min-h-[2lh] text-[15px] text-muted sm:min-h-0"
              >
                <span className="font-medium text-white">{cur.title}</span> — {cur.text}
              </motion.p>
            </AnimatePresence>
            <div className="mx-auto mt-4 h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                key={`${active}-${paused}`}
                className="h-full origin-left bg-gradient-to-r from-brand to-sky"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: paused ? 0.2 : CYCLE_MS / 1000, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
