import { motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react'
import { useRef, useState, useSyncExternalStore } from 'react'
import { Backdrop } from '../components/layout/Beams'
import { Card } from '../components/ui/Card'
import { SectionHeading } from '../components/ui/SectionHeading'
import { experience } from '../data/profile'
import type { Experience as Role } from '../data/profile'

const NOW = new Date()
const nowYm = `${NOW.getFullYear()}-${String(NOW.getMonth() + 1).padStart(2, '0')}`

const parse = (ym: string) => ym.split('-').map(Number) as [number, number]
const fmtDate = (ym: string) => {
  const [y, m] = parse(ym)
  return new Date(y, m - 1).toLocaleString('en-US', { month: 'short', year: 'numeric' })
}

/** inclusive month count, LinkedIn-style */
function duration(start: string, end: string | null) {
  const [ay, am] = parse(start)
  const [by, bm] = parse(end ?? nowYm)
  const months = (by - ay) * 12 + (bm - am) + 1
  const y = Math.floor(months / 12)
  const m = months % 12
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ')
}

const initials = (company: string) =>
  company
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

const N = experience.length
/** node i sits at the centre of column i */
const nodeAt = (i: number) => (i + 0.5) / N

const desktopMq = '(min-width: 1024px)'
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(desktopMq)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(desktopMq).matches,
  )
}

const listV = { off: {}, on: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } } }
const itemV = { off: { opacity: 0, x: -14 }, on: { opacity: 1, x: 0 } }

function RoleCard({ r, active: railActive }: { r: Role; active: boolean }) {
  const current = r.end === null
  // desktop follows the rail; stacked layouts switch each card on as it scrolls into view
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '0px 0px -25% 0px' })
  const isDesktop = useIsDesktop()
  const active = isDesktop ? railActive : inView
  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={
        active
          ? { opacity: 1, rotateX: 0, y: 0, scale: 1, filter: 'grayscale(0) brightness(1)' }
          : { opacity: 0.45, rotateX: 18, y: 36, scale: 0.94, filter: 'grayscale(0.7) brightness(0.7)' }
      }
      transition={{ type: 'spring', stiffness: 120, damping: 16 }}
      style={{ transformPerspective: 1200, transformOrigin: 'center top' }}
      className={`h-full rounded-2xl ${current && active ? 'lx-spin-border' : ''}`}
    >
      <Card
        max={5}
        className={`h-full transition-shadow duration-700 ${
          active
            ? current
              ? 'shadow-[0_0_0_1px_rgb(41_52_255/0.6),0_30px_90px_-25px_rgb(41_52_255/0.9)]'
              : 'shadow-[0_0_0_1px_rgb(41_52_255/0.35),0_24px_70px_-30px_rgb(41_52_255/0.6)]'
            : ''
        }`}
        innerClassName="flex flex-col p-6 sm:p-7"
      >
        {/* dates */}
        <div className="depth-1 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[15px] font-medium text-white">
            {fmtDate(r.start)} – {r.end ? fmtDate(r.end) : 'Present'}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[13px] font-medium ${
              current
                ? 'bg-emerald-400/15 text-emerald-300 shadow-[0_0_0_1px_rgb(52_211_153/0.35)]'
                : r.type === 'Internship'
                  ? 'bg-iris/15 text-[#c4b0ff] shadow-[0_0_0_1px_rgb(133_77_255/0.4)]'
                  : 'bg-white/[0.06] text-white/80 shadow-[0_0_0_1px_rgb(255_255_255/0.1)]'
            }`}
          >
            {current ? '● Current' : r.type === 'Internship' ? 'Internship' : duration(r.start, r.end)}
          </span>
        </div>

        {/* identity */}
        <div className="depth-2 mt-6 flex items-center gap-4">
          <motion.span
            animate={active ? { rotateY: 0, scale: 1 } : { rotateY: -70, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 140, damping: 14, delay: active ? 0.15 : 0 }}
            className={`grid size-14 shrink-0 place-items-center rounded-2xl text-[17px] font-bold transition-colors duration-500 ${
              active && current ? 'lx-key-on bg-brand text-white' : 'lx-key bg-[#11142a] text-sky'
            }`}
          >
            {initials(r.company)}
          </motion.span>
          <div className="min-w-0">
            <h3 className="text-[21px] leading-tight font-semibold">{r.role}</h3>
            <p className="mt-1 text-[15px] font-medium text-white/85">{r.company}</p>
          </div>
        </div>

        <div className="depth-1 mt-3 flex flex-wrap items-center gap-2 text-[14px] text-white/65">
          <span className="flex items-center gap-1">
            <MapPin className="size-4" aria-hidden /> {r.location}
          </span>
          {r.companyTag && (
            <span className="rounded-md bg-[#f5b301]/12 px-2 py-0.5 text-[13px] font-medium text-[#ffd76a] shadow-[0_0_0_1px_rgb(245_179_1/0.35)]">
              {r.companyTag}
            </span>
          )}
          {current && (
            <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[13px]">{duration(r.start, null)}</span>
          )}
        </div>

        {/* highlights slide in when the card switches on */}
        <motion.ul
          variants={listV}
          initial={false}
          animate={active ? 'on' : 'off'}
          className="depth-1 mt-6 space-y-3 border-t border-white/[0.08] pt-5"
        >
          {r.highlights.map((h) => (
            <motion.li key={h} variants={itemV} className="flex gap-3 text-[15px] leading-snug text-white/85">
              <ArrowRight className="mt-0.5 size-4 shrink-0 text-sky" aria-hidden />
              {h}
            </motion.li>
          ))}
        </motion.ul>

        <ul className="depth-1 mt-auto flex flex-wrap gap-2 pt-6" aria-label="Technologies">
          {r.tech.map((t) => (
            <li key={t} className="rounded-full bg-white/[0.07] px-3 py-1 text-[13px] text-white/80">
              {t}
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  )
}

/** Horizontal rail with a travelling comet; nodes ignite as it passes (desktop). */
function Rail({ fill, active }: { fill: MotionValue<number>; active: boolean[] }) {
  const left = useTransform(fill, (v) => `${v * 100}%`)
  return (
    <div className="relative hidden h-16 lg:block" aria-hidden>
      {/* years */}
      {experience.map((r, i) => (
        <span
          key={r.company}
          className={`absolute top-0 -translate-x-1/2 font-hand text-[22px] transition-colors duration-500 ${
            active[i] ? 'text-sky' : 'text-white/25'
          }`}
          style={{ left: `${nodeAt(i) * 100}%` }}
        >
          {r.start.slice(0, 4)}
        </span>
      ))}
      <span
        className={`absolute top-0 right-0 font-hand text-[22px] transition-colors duration-500 ${
          active[N - 1] ? 'text-emerald-300' : 'text-white/25'
        }`}
      >
        Now
      </span>

      <div className="absolute inset-x-0 top-12 h-px bg-white/10">
        <motion.div
          style={{ scaleX: fill }}
          className="h-full origin-left bg-gradient-to-r from-iris via-brand to-sky shadow-[0_0_14px_rgb(41_52_255)]"
        />
        {/* comet */}
        <motion.span style={{ left }} className="absolute top-1/2 -translate-1/2">
          <span className="absolute top-1/2 right-0 h-1 w-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent to-sky/80 blur-[2px]" />
          <span className="relative block size-3 rounded-full bg-white shadow-[0_0_10px_#fff,0_0_24px_#8AA5FF,0_0_44px_#2934FF]" />
        </motion.span>
      </div>

      {/* nodes + drop beams */}
      {experience.map((r, i) => (
        <div key={r.company} className="absolute top-12" style={{ left: `${nodeAt(i) * 100}%` }}>
          <span
            className={`absolute top-0 left-0 grid size-6 -translate-1/2 place-items-center rounded-full bg-black transition-shadow duration-500 ${
              active[i]
                ? 'shadow-[0_0_0_2px_rgb(41_52_255),0_0_26px_rgb(41_52_255)]'
                : 'shadow-[0_0_0_1px_rgb(255_255_255/0.2)]'
            }`}
          >
            <span
              className={`size-2.5 rounded-full transition-colors duration-500 ${active[i] ? 'bg-sky' : 'bg-white/20'}`}
            />
            {active[i] && (
              <motion.span
                key="ripple"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 3.2, opacity: 0 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full border-2 border-sky"
              />
            )}
          </span>
          <motion.span
            initial={false}
            animate={{ scaleY: active[i] ? 1 : 0, opacity: active[i] ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute top-3 left-0 h-7 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-sky to-transparent"
          />
        </div>
      ))}
    </div>
  )
}

/** "keep scrolling" cue for the pinned stage; fades once every role is lit */
function ScrollHint({ fill }: { fill: MotionValue<number> }) {
  const opacity = useTransform(fill, [0.7, 0.95], [1, 0])
  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 flex-col items-center gap-3 pin:xl:flex 2xl:right-8"
    >
      <span className="flex h-10 w-[26px] justify-center rounded-full border-2 border-sky/70 bg-black/40 pt-2 shadow-[0_0_18px_rgb(41_52_255/0.7)]">
        <motion.span
          animate={{ y: [0, 10, 0], opacity: [1, 0.15, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="h-2 w-1 rounded-full bg-white"
        />
      </span>
      <span className="text-[11px] font-medium tracking-[0.3em] text-sky uppercase [writing-mode:vertical-rl]">Scroll</span>
      <motion.span
        animate={{ y: [0, 5, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="text-sky"
      >
        <ChevronDown className="size-5" />
      </motion.span>
    </motion.div>
  )
}

export function Experience() {
  const track = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 60%', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  // rail fills over most of the scroll, leaving a short hold at the end
  const fill = useTransform(smooth, [0.05, 0.8], [0, 1], { clamp: true })

  const [active, setActive] = useState<boolean[]>(() => experience.map(() => false))
  useMotionValueEvent(fill, 'change', (v) => {
    const next = experience.map((_, i) => v >= nodeAt(i) - 0.03)
    setActive((prev) => (prev.every((p, i) => p === next[i]) ? prev : next))
  })

  const careerStart = experience.map((r) => r.start).sort()[0]

  return (
    <section id="experience" className="relative">
      {/* tall track gives the pinned stage room to play while scrolling */}
      <div ref={track} className="relative pin:h-[230vh]">
        <div className="relative overflow-hidden px-5 py-24 pin:sticky pin:top-0 pin:flex pin:h-screen pin:flex-col pin:justify-center pin:py-0 sm:py-28">
          <Backdrop />
          <div className="relative mx-auto w-full max-w-[1200px]">
            <SectionHeading
              eyebrow="Experience"
              title="Professional Experience"
              subtitle={`${duration(careerStart, null)} in development — from a Python internship to an Odoo Gold Partner.`}
            />

            <div className="mt-10">
              <Rail fill={fill} active={active} />
            </div>

            <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-3 lg:grid-cols-3">
              {experience.map((r, i) => (
                <li key={r.company} className={i === N - 1 ? 'md:col-span-2 lg:col-span-1' : ''}>
                  <RoleCard r={r} active={active[i]} />
                </li>
              ))}
            </ol>
          </div>
          <ScrollHint fill={fill} />
        </div>
      </div>
    </section>
  )
}
