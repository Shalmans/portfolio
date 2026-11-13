import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { MoveDownLeft } from 'lucide-react'
import { useRef, useState } from 'react'
import { Backdrop } from '../components/layout/Beams'
import { Reveal } from '../components/ui/Reveal'
import { Pill } from '../components/ui/SectionHeading'
import { processSteps } from '../data/profile'

/*
 * Desktop layout lives in a 1200 x 1500 design space. The SVG uses the same
 * viewBox (stretched horizontally only), and cards are positioned with
 * left = x / 1200 (%) and top = y (px), so the path endpoints stay glued to the cards.
 */
const W = 1200
const H = 1500
const cardPos = [
  { x: 780, y: 40, rotate: 4 },
  { x: 120, y: 430, rotate: -5 },
  { x: 760, y: 720, rotate: 3 },
  { x: 260, y: 1080, rotate: -4 },
]
const PATH = [
  'M 780 150 C 600 170, 330 250, 290 432', // 01 → 02
  'M 420 560 C 560 600, 640 760, 762 810', // 02 → 03
  'M 900 945 C 890 1050, 700 1120, 562 1170', // 03 → 04
  'M 420 1310 C 450 1410, 700 1430, 830 1395', // 04 → "Production Ready!"
].join(' ')

/** scroll progress at which each card is reached (progress p = the 60% viewport line sits at y = p * H) */
const DESK_AT = cardPos.map((c) => (c.y + 80) / H)
/** mobile list: cards are roughly evenly spaced */
const MOB_AT = cardPos.map((_, i) => (i + 0.15) / cardPos.length)

/** index of the furthest card reached so far (-1 = none); follows the scroll both ways */
function useReached(progress: MotionValue<number>, at: number[]) {
  const count = (v: number) => at.filter((a) => v >= a).length - 1
  const [reached, setReached] = useState(() => count(progress.get()))
  useMotionValueEvent(progress, 'change', (v) => setReached(count(v)))
  return reached
}

/** true once the scroll progress passes `at` (follows the scroll both ways) */
function usePassed(progress: MotionValue<number>, at: number) {
  const [passed, setPassed] = useState(() => progress.get() >= at)
  useMotionValueEvent(progress, 'change', (v) => setPassed(v >= at))
  return passed
}

/** desktop: the route ends at y≈1395 → stamp lands when the drawn path arrives there */
const DESK_DONE = 1380 / H
const MOB_DONE = 0.97
const SPARKS = Array.from({ length: 10 }, (_, k) => (k / 10) * Math.PI * 2)

type StepState = 'hidden' | 'past' | 'current'

type StepProps = { i: number; title: string; text: string; rotate?: number; state: StepState }

function StepCard({ i, title, text, rotate = 0, state }: StepProps) {
  const active = state === 'current'

  return (
    <motion.div
      initial={false}
      animate={
        state === 'current'
          ? { rotate: rotate * 1.1, scale: 1.03, y: -6, opacity: 1, filter: 'blur(0px)' }
          : state === 'past'
            ? { rotate, scale: 0.95, y: 0, opacity: 0.45, filter: 'blur(0px)' }
            : { rotate: rotate * 3, scale: 0.85, y: 60, opacity: 0, filter: 'blur(8px)' }
      }
      transition={{ type: 'spring', stiffness: 160, damping: 16 }}
      className={`relative rounded-2xl p-2 transition-[background-color,box-shadow] duration-500 ${
        active
          ? 'bg-brand shadow-[0_0_0_1px_rgb(138_165_255/0.7),0_24px_70px_-12px_rgb(41_52_255/0.85)]'
          : 'bg-[#0d0f1c] shadow-[0_0_0_1px_rgb(255_255_255/0.08),0_20px_40px_-20px_rgb(0_0_0/0.9)]'
      }`}
    >
      {/* pin */}
      <span
        aria-hidden
        className="absolute top-2.5 left-1/2 z-10 size-3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff,#9aa3c7_60%,#4b5375)] shadow-[0_2px_4px_rgb(0_0_0/0.6)]"
      />
      <div
        className={`rounded-xl px-5 pt-7 pb-5 transition-colors duration-500 ${
          active ? 'bg-[#1f28e0]' : 'bg-white/[0.03]'
        }`}
      >
        <p className={`font-hand text-[18px] ${active ? 'text-white/70' : 'text-muted'}`}>
          {String(i + 1).padStart(2, '0')}
        </p>
        <h3 className="mt-1 text-[19px] leading-snug font-semibold">{title}</h3>
        <p className={`mt-3 text-[13.5px] leading-relaxed ${active ? 'text-white/85' : 'text-muted'}`}>{text}</p>
      </div>
    </motion.div>
  )
}

function Heading() {
  return (
    <div className="max-w-md">
      <Reveal>
        <Pill>How I work</Pill>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="mt-5 text-[34px] leading-[1.1] font-medium tracking-[-0.02em] sm:text-[48px]">
          How I deliver Odoo solutions that <span className="text-sky">scale</span>
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          A structured, techno-functional workflow — from the first requirement workshop to a stable system in
          production.
        </p>
      </Reveal>
    </div>
  )
}

/** "Production Ready!" — hidden until the route reaches it, then stamps in with a burst + drawn underline */
function ProductionReady({ show, className = '' }: { show: boolean; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence>
        {show && !reduce && (
          <motion.span key="fx" aria-hidden className="pointer-events-none absolute inset-0" exit={{ opacity: 0 }}>
            {/* shock ring */}
            <motion.span
              className="absolute inset-[-12px] rounded-[50%] border-2 border-sky/80"
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
            />
            {/* sparks */}
            {SPARKS.map((a, k) => (
              <motion.span
                key={k}
                className="absolute top-1/2 left-1/2 size-1.5 rounded-full bg-sky shadow-[0_0_10px_2px_rgb(138_165_255/0.9)]"
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{ x: Math.cos(a) * 170, y: Math.sin(a) * 70, scale: 0, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              />
            ))}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.p
        initial={false}
        animate={
          show
            ? { opacity: 1, scale: 1, rotate: 4, filter: 'blur(0px)' }
            : { opacity: 0, scale: 2, rotate: -12, filter: 'blur(8px)' }
        }
        transition={show ? { type: 'spring', stiffness: 320, damping: 14 } : { duration: 0.25 }}
        className="relative font-hand text-[34px] whitespace-nowrap text-sky drop-shadow-[0_0_18px_rgb(41_52_255/0.8)]"
      >
        Production Ready!
        {/* hand-drawn underline */}
        <svg aria-hidden viewBox="0 0 220 14" className="absolute -bottom-2 left-0 h-3.5 w-full overflow-visible">
          <motion.path
            d="M 4 9 C 60 3, 140 3, 216 8"
            fill="none"
            stroke="#8AA5FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
            transition={{ duration: 0.6, delay: show ? 0.35 : 0 }}
          />
        </svg>
      </motion.p>
    </div>
  )
}

export function Process() {
  const stage = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start 60%', 'end 60%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  const mobile = useRef<HTMLOListElement>(null)
  const { scrollYProgress: mProg } = useScroll({ target: mobile, offset: ['start 60%', 'end 60%'] })
  const mDraw = useSpring(mProg, { stiffness: 90, damping: 24 })

  const reached = useReached(scrollYProgress, DESK_AT)
  const mReached = useReached(mProg, MOB_AT)
  const done = usePassed(scrollYProgress, DESK_DONE)
  const mDone = usePassed(mProg, MOB_DONE)
  const stateOf = (i: number, r: number): StepState => (i > r ? 'hidden' : i === r ? 'current' : 'past')

  return (
    <section id="process" className="relative overflow-hidden px-5 pt-24 pb-8 sm:pt-28">
      <Backdrop />
      <div className="relative mx-auto max-w-[1200px]">
        {/* ── desktop: zig-zag pinned cards joined by a scroll-drawn path ── */}
        <div ref={stage} className="relative hidden lg:block" style={{ height: H }}>
          <div className="absolute top-0 left-0">
            <Heading />
          </div>

          <svg
            aria-hidden
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <mask id="process-reveal" maskUnits="userSpaceOnUse">
                <motion.path
                  d={PATH}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="16"
                  style={{ pathLength: draw }}
                />
              </mask>
            </defs>
            {/* remaining route */}
            <path
              d={PATH}
              fill="none"
              stroke="rgb(255 255 255 / 0.18)"
              strokeWidth="1.5"
              strokeDasharray="6 7"
              vectorEffect="non-scaling-stroke"
            />
            {/* travelled route */}
            <path
              d={PATH}
              mask="url(#process-reveal)"
              fill="none"
              stroke="#8AA5FF"
              strokeWidth="2"
              strokeDasharray="6 7"
              vectorEffect="non-scaling-stroke"
              style={{ filter: 'drop-shadow(0 0 6px rgb(41 52 255))' }}
            />
          </svg>

          <MoveDownLeft aria-hidden className="absolute size-6 text-white/70" style={{ left: `${(560 / W) * 100}%`, top: 205 }} />

          <ol>
            {processSteps.map((s, i) => (
              <li
                key={s.title}
                className="absolute w-[25%]"
                style={{ left: `${(cardPos[i].x / W) * 100}%`, top: cardPos[i].y }}
              >
                <StepCard i={i} title={s.title} text={s.text} rotate={cardPos[i].rotate} state={stateOf(i, reached)} />
              </li>
            ))}
          </ol>

          {/* arrival pulse at the end of the route */}
          <span
            aria-hidden
            className={`absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky shadow-[0_0_14px_4px_rgb(41_52_255/0.9)] transition-[opacity,scale] duration-500 ${done ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            style={{ left: `${(830 / W) * 100}%`, top: 1395 }}
          >
            {done && <span className="absolute inset-0 animate-ping rounded-full bg-sky" />}
          </span>

          <div className="absolute" style={{ left: `${(840 / W) * 100}%`, top: 1360 }}>
            <ProductionReady show={done} />
          </div>
        </div>

        {/* ── mobile / tablet: vertical route ── */}
        <div className="lg:hidden">
          <Heading />
          <ol ref={mobile} className="relative mt-12 space-y-10 pl-10">
            <span aria-hidden className="absolute top-0 bottom-0 left-3 border-l-2 border-dashed border-white/15" />
            <motion.span
              aria-hidden
              style={{ scaleY: mDraw }}
              className="absolute top-0 bottom-0 left-3 origin-top border-l-2 border-dashed border-sky drop-shadow-[0_0_6px_rgb(41_52_255)]"
            />
            {processSteps.map((s, i) => (
              <li key={s.title} className={i % 2 ? 'sm:ml-16' : 'sm:mr-16'}>
                <StepCard i={i} title={s.title} text={s.text} rotate={i % 2 ? 2 : -2} state={stateOf(i, mReached)} />
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <ProductionReady show={mDone} />
          </div>
        </div>
      </div>
    </section>
  )
}
