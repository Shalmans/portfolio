import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { PointerEvent } from 'react'
import { Award, BadgeCheck, Briefcase, Layers } from 'lucide-react'
import { Backdrop } from '../components/layout/Beams'
import { Counter } from '../components/ui/Counter'
import { ProfilePhoto } from '../components/ui/ProfilePhoto'
import { Reveal } from '../components/ui/Reveal'
import { Pill } from '../components/ui/SectionHeading'
import { techIcons } from '../components/ui/techIconData'
import { TechIcon } from '../components/ui/TechIcons'
import { about, certifications, experience, profile, stats } from '../data/profile'
import type { Stat } from '../data/profile'

const PIVOT = '50% -112px'
const THICK = 14 // card thickness in px (stacked edge layers)
const spring = { stiffness: 170, damping: 14, mass: 0.6 }
/** each time the badge scrolls into view it flips once (front → back → front), AUTO_FLIP_MS per side */
const AUTO_FLIP_MS = 3000
/** tech logos printed along the lanyard (same set as the tile grid) */
const STRAP_LOGOS = about.tech.filter((t) => techIcons[t])
/** words woven into the strap, one after every STRAP_WORD_EVERY logos */
const STRAP_WORDS = ['SHALMAN S', 'ODOO DEV']
const STRAP_WORD_EVERY = 6

/** lanyard strap: woven fabric with stitched edges, printed tech logos and a light pulse running up it */
function Strap({ reduce }: { reduce: boolean }) {
  return (
    <div className="absolute bottom-0 -left-[18px] h-full w-9 [perspective:260px]">
      {/* fabric twists gently in time with the pendulum sway */}
      <motion.div
        initial={{ rotateY: -14 }}
        animate={reduce ? undefined : { rotateY: [-20, -6, -20] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative h-full overflow-hidden rounded-[3px] bg-[linear-gradient(90deg,#070f7a,#1f2ae6_22%,#6676ff_48%,#2934ff_64%,#0a138f)] shadow-[0_0_22px_-2px_rgb(41_52_255/0.75)] [mask-image:linear-gradient(180deg,transparent,#000_30%)]"
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(255_255_255/0.07)_0_1px,transparent_1px_3px)]" />
        {/* light catching the left edge, shade on the right */}
        <div className="absolute inset-y-0 left-0 w-px bg-white/60" />
        <div className="absolute inset-y-0 right-0 w-[3px] bg-black/30" />
        <div className="absolute inset-y-0 left-[3px] border-l border-dashed border-white/40" />
        <div className="absolute inset-y-0 right-[3px] border-l border-dashed border-white/40" />

        {/* printed tech logos, scrolling along the strap */}
        <motion.div
          className="absolute inset-x-0 top-0 flex flex-col items-center"
          animate={reduce ? undefined : { y: ['-50%', '0%'] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 1].map((k) => (
            <div key={k} className="flex flex-col items-center gap-2.5 py-[5px]">
              {STRAP_LOGOS.map((t, i) => (
                <span key={t} className="flex flex-col items-center gap-2.5">
                  {techIcons[t].text ? (
                    <span className="text-[8px] leading-none font-black tracking-tight text-white/90">{techIcons[t].text}</span>
                  ) : (
                    <svg viewBox="0 0 24 24" className="size-4 fill-white/90 drop-shadow-[0_0_4px_rgb(138_165_255/0.9)]">
                      <path d={techIcons[t].path} />
                    </svg>
                  )}
                  <span className="h-px w-3 bg-white/30" />
                  {/* woven name between every few logos */}
                  {(i + 1) % STRAP_WORD_EVERY === 0 && (
                    <>
                      <span className="text-[7.5px] leading-none font-bold tracking-[0.32em] whitespace-nowrap text-white/85 [writing-mode:vertical-rl]">
                        {STRAP_WORDS[((i + 1) / STRAP_WORD_EVERY - 1) % STRAP_WORDS.length]}
                      </span>
                      <span className="h-px w-3 bg-white/30" />
                    </>
                  )}
                </span>
              ))}
            </div>
          ))}
        </motion.div>

        {/* fabric sheen + data pulse travelling up */}
        <div className="absolute inset-y-0 left-[30%] w-[6px] bg-white/25 blur-[2px]" />
        {!reduce && (
          <motion.div
            className="absolute inset-x-0 h-10 bg-[linear-gradient(180deg,transparent,rgb(138_165_255/0.4),transparent)]"
            animate={{ top: ['110%', '-30%'] }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
          />
        )}
      </motion.div>
    </div>
  )
}

/**
 * ID badge hanging from a lanyard — a real 3D slab:
 * tilts hard under the mouse, can be dragged in any direction (it twists while it swings
 * and springs back), flips on click to show the back, with a pointer-tracked glare,
 * angle-driven holographic foil, photo parallax and a floor shadow that follows it.
 */
function HangingBadge() {
  const current = experience.find((r) => r.end === null)
  const [flipped, setFlipped] = useState(false)
  const [hovering, setHovering] = useState(false)
  const reduce = useReducedMotion()
  // automatic flips left in this visit: 2 = show back, then return to front
  const [autoLeft, setAutoLeft] = useState(0)
  const auto = !hovering && !reduce && autoLeft > 0

  // drag offset
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // pointer tilt (-1..1)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, spring)
  const sy = useSpring(py, spring)
  const flip = useSpring(0, { stiffness: 90, damping: 14 })

  const swing = useSpring(useTransform(x, [-120, 120], [16, -16]), { stiffness: 120, damping: 8 })
  const rotateY = useTransform([sx, x, flip], ([a, dx, f]: number[]) => a * 22 + dx * 0.28 + f)
  const rotateX = useTransform([sy, y], ([a, dy]: number[]) => -a * 18 - dy * 0.3)

  // light + foil follow the tilt
  const glareX = useTransform(sx, [-1, 1], [15, 85])
  const glareY = useTransform(sy, [-1, 1], [10, 90])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.28), transparent 45%)`
  const foilPos = useTransform(rotateY, (v) => `${50 + (v % 360) * 1.4}% 50%`)
  const photoX = useTransform(sx, [-1, 1], [10, -10])
  const photoY = useTransform(sy, [-1, 1], [8, -8])

  // floor shadow
  const shadowX = useTransform(x, (v) => v * 0.7)
  const shadowScale = useTransform(y, [-80, 80], [0.75, 1.15])

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
    setHovering(false)
  }
  const toggle = () => {
    const next = !flipped
    setFlipped(next)
    flip.set(next ? 180 : 0)
    setAutoLeft(0) // visitor took over: stop the automatic flip for this visit
  }

  // entering view arms one flip cycle; leaving resets to the front (off-screen, so unseen)
  const onEnter = () => setAutoLeft(2)
  const onExit = () => {
    setAutoLeft(0)
    setFlipped(false)
    flip.set(0)
  }

  // run the armed cycle: back after AUTO_FLIP_MS, front again after another; hovering pauses it
  useEffect(() => {
    if (!auto) return
    const t = setTimeout(() => {
      setFlipped(!flipped)
      flip.set(flipped ? 0 : 180)
      setAutoLeft((n) => n - 1)
    }, AUTO_FLIP_MS)
    return () => clearTimeout(t)
  }, [auto, flipped, flip])

  const face =
    'absolute inset-0 rounded-[26px] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-[linear-gradient(160deg,#1b1f3a,#0b0d1a_60%)] p-3 shadow-[0_0_0_1px_rgb(138_165_255/0.3),inset_0_1px_0_rgb(255_255_255/0.08)]'

  return (
    <motion.div
      viewport={{ amount: 0.5 }}
      onViewportEnter={onEnter}
      onViewportLeave={onExit}
      className="relative mx-auto w-[270px] pt-28 sm:w-[300px]"
    >
      {/* floor shadow (doesn't rotate with the card) */}
      <motion.div
        aria-hidden
        style={{ x: shadowX, scaleX: shadowScale }}
        className="pointer-events-none absolute -bottom-4 left-1/2 h-8 w-56 -translate-x-1/2 rounded-[50%] bg-brand/50 blur-2xl"
      />

      {/* idle pendulum sway, pivoting at the lanyard top */}
      <motion.div
        animate={{ rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: PIVOT }}
      >
        <motion.div
          drag
          dragConstraints={{ left: -120, right: 120, top: -60, bottom: 60 }}
          dragElastic={0.25}
          dragSnapToOrigin
          dragTransition={{ bounceStiffness: 220, bounceDamping: 9 }}
          onTap={toggle}
          onPointerMove={onMove}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHovering(true)}
          onPointerLeave={onLeave}
          style={{ x, y, rotate: swing, transformOrigin: PIVOT, perspective: 1100 }}
          whileDrag={{ cursor: 'grabbing' }}
          className="relative cursor-grab touch-pan-y"
        >
          {/* lanyard strap */}
          <div aria-hidden className="pointer-events-none absolute -top-[172px] left-1/2 h-[152px] w-0">
            <Strap reduce={!!reduce} />
          </div>
          {/* folded loop where the strap passes through the ring */}
          <div aria-hidden className="absolute -top-[34px] left-1/2 h-4 w-9 -translate-x-1/2 rounded-b-lg bg-[linear-gradient(180deg,#141cb8,#050a5c)] shadow-[0_3px_5px_rgb(0_0_0/0.6),inset_0_1px_0_rgb(138_165_255/0.4)]" />

          {/* swivel ring */}
          <div aria-hidden className="absolute -top-[30px] left-1/2 z-10 h-4 w-6 -translate-x-1/2 rounded-full border-[3px] border-[#c9cfdc] shadow-[0_2px_3px_rgb(0_0_0/0.6),inset_0_1px_1px_rgb(0_0_0/0.4)] [border-top-color:#f6f8fc] [border-bottom-color:#7c8499]" />

          {/* metal clamp: bevelled body + thickness edge + rivets + moving glint */}
          <div aria-hidden className="absolute -top-5 left-1/2 z-10 h-10 w-14 -translate-x-1/2">
            <div className="absolute inset-x-0 top-[3px] bottom-[-3px] rounded-lg bg-[#4b5263]" />
            <div className="absolute inset-0 overflow-hidden rounded-lg bg-[linear-gradient(180deg,#ffffff,#c3c9d6_35%,#8a93a8_60%,#dfe3ec)] shadow-[0_8px_14px_-4px_rgb(0_0_0/0.7),inset_0_1px_0_#fff,inset_0_-2px_3px_rgb(0_0_0/0.25)]">
              <span className="absolute top-2 left-1/2 h-2 w-8 -translate-x-1/2 rounded-full bg-[#3c4356] shadow-[inset_0_2px_3px_rgb(0_0_0/0.7),0_1px_0_rgb(255_255_255/0.8)]" />
              <span className="absolute bottom-1.5 left-2 size-1.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff,#7c8499)]" />
              <span className="absolute right-2 bottom-1.5 size-1.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fff,#7c8499)]" />
              <motion.span
                className="absolute inset-y-0 w-4 -skew-x-12 bg-white/70 blur-[3px]"
                animate={reduce ? undefined : { left: ['-30%', '130%'] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
              />
            </div>
          </div>

          {/* the 3D slab */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="relative w-full rounded-[26px] shadow-[0_40px_80px_-30px_rgb(41_52_255/0.8)]"
          >
            {/* edge: stacked layers give the card real thickness */}
            {Array.from({ length: THICK }, (_, i) => (
              <span
                key={i}
                aria-hidden
                className="absolute inset-0 rounded-[26px] bg-[linear-gradient(135deg,#7d8cff,#2934ff_30%,#121650_60%,#4b57d6)]"
                style={{ transform: `translateZ(${i - THICK / 2 + 0.5}px)` }}
              />
            ))}

            {/* front */}
            <div className={face.replace('absolute inset-0', 'relative')} style={{ transform: `translateZ(${THICK / 2 + 0.5}px)` }}>
              <span aria-hidden className="mx-auto mb-3 block h-2 w-14 rounded-full bg-black shadow-[inset_0_1px_2px_rgb(0_0_0/0.9)]" />
              <div className="relative overflow-hidden rounded-[18px] ring-1 ring-white/10">
                <motion.div style={{ x: photoX, y: photoY, scale: 1.1 }}>
                  <ProfilePhoto className="aspect-[4/5] w-full" />
                </motion.div>
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-50 mix-blend-color-dodge"
                  style={{
                    backgroundImage:
                      'linear-gradient(115deg, transparent 20%, rgb(133 77 255 / 0.35) 35%, rgb(34 211 238 / 0.3) 45%, rgb(245 179 1 / 0.25) 55%, transparent 70%)',
                    backgroundSize: '250% 100%',
                    backgroundPosition: foilPos,
                  }}
                />
              </div>
              <div className="px-2 pt-4 pb-2">
                <p className="flex items-center gap-1.5 text-[20px] font-semibold">
                  {profile.name}
                  <BadgeCheck className="size-5 fill-[#f5b301] text-black" aria-hidden />
                </p>
                <p className="mt-0.5 text-[13px] text-white/65">{profile.title}</p>
                {current && (
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-brand/15 px-3 py-2 text-[12px] shadow-[0_0_0_1px_rgb(41_52_255/0.4)]">
                    <span className="font-medium text-white/90">{current.company}</span>
                    <span className="flex items-center gap-1.5 text-emerald-300">
                      <span className="size-1.5 rounded-full bg-emerald-400" /> Current
                    </span>
                  </div>
                )}
              </div>
              <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[26px]" style={{ background: glare }} />
            </div>

            {/* back */}
            <div
              className={`${face} flex flex-col`}
              style={{ transform: `rotateY(180deg) translateZ(${THICK / 2 + 0.5}px)` }}
            >
              <span aria-hidden className="mx-auto mb-3 block h-2 w-14 rounded-full bg-black shadow-[inset_0_1px_2px_rgb(0_0_0/0.9)]" />
              <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_50%_30%,rgb(41_52_255/0.45),transparent_65%),repeating-linear-gradient(45deg,rgb(255_255_255/0.03)_0_2px,transparent_2px_10px)] px-5 text-center ring-1 ring-white/10">
                <span className="lx-key-on grid size-20 place-items-center rounded-2xl bg-[radial-gradient(circle_at_30%_25%,#8aa5ff,#2934ff_55%,#0a1a8a)] text-[28px] font-bold">
                  SS
                </span>
                <p className="mt-5 text-[18px] font-semibold">{profile.name}</p>
                <p className="mt-1 text-[12px] text-white/60">{profile.title}</p>
                <dl className="mt-6 grid w-full grid-cols-2 gap-2 text-left text-[11px]">
                  {[
                    ['Experience', `${stats[0].value}${stats[0].suffix ?? ''} yrs`],
                    ['Odoo', 'v10 → v19'],
                    ['Based in', profile.location],
                    ['Status', 'Available'],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-lg bg-white/[0.04] px-2.5 py-2 shadow-[0_0_0_1px_rgb(255_255_255/0.06)]">
                      <dt className="text-white/45">{k}</dt>
                      <dd className="mt-0.5 font-medium text-white/90">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div
                aria-hidden
                className="mx-2 mt-3 mb-1 h-8 rounded bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.75)_0_2px,transparent_2px_4px,rgb(255_255_255/0.75)_4px_5px,transparent_5px_8px,rgb(255_255_255/0.75)_8px_11px,transparent_11px_13px)] opacity-70"
              />
              <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[26px]" style={{ background: glare }} />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

    </motion.div>
  )
}

const numbers: (Stat & { icon: typeof Award })[] = [
  ...stats.filter((s) => !s.text).map((s, i) => ({ ...s, icon: [Briefcase, Layers][i] ?? Layers })),
  { value: certifications.length, label: 'Certifications', hint: 'AI, development & more', icon: Award },
].slice(0, 3)

const tileV = {
  hidden: { opacity: 0, y: 18, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 18 } },
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden px-5 py-24 sm:py-28">
      <Backdrop />
      <div className="relative mx-auto grid max-w-[1140px] items-center gap-14 lg:grid-cols-[340px_1fr] lg:gap-20">
        <Reveal>
          <HangingBadge />
        </Reveal>

        <div>
          <Reveal>
            <Pill>About me</Pill>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-[34px] leading-[1.1] font-medium tracking-[-0.02em] sm:text-[46px]">
              About <span className="text-sky">{profile.name}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 text-[16px] leading-[1.75] text-white/75 sm:text-[17px]">
              Hi, I&apos;m{' '}
              <span className="rounded-md bg-brand/25 px-2 py-0.5 font-semibold tracking-wide text-white uppercase shadow-[0_0_0_1px_rgb(41_52_255/0.5)]">
                {profile.name}
              </span>
              , {about.intro}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-[16px] leading-[1.75] text-white/65 sm:text-[17px]">{about.body}</p>
          </Reveal>

          {/* numbers */}
          <Reveal delay={0.2}>
            <dl className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-4">
              {numbers.map(({ icon: Icon, ...s }) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#141833,#0a0c18_70%)] p-3.5 shadow-[0_0_0_1px_rgb(138_165_255/0.14),inset_0_1px_0_rgb(255_255_255/0.06),0_18px_40px_-20px_rgb(0_0_0/0.9)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgb(138_165_255/0.45),inset_0_1px_0_rgb(255_255_255/0.1),0_18px_40px_-14px_rgb(41_52_255/0.6)] sm:p-5"
                >
                  {/* accent edge + corner glow */}
                  <span aria-hidden className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-sky/70 to-transparent" />
                  <span aria-hidden className="absolute -top-10 -right-10 size-24 rounded-full bg-brand/25 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:opacity-60" />
                  <span className="relative grid size-8 place-items-center rounded-lg bg-brand/20 text-sky shadow-[0_0_0_1px_rgb(41_52_255/0.45)] sm:size-9">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <dd className="relative order-2 mt-4 bg-gradient-to-r from-white to-sky bg-clip-text text-[24px] leading-none font-semibold tracking-tight text-transparent sm:text-[34px]">
                    <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                  </dd>
                  <dt className="relative order-3 mt-2 text-[12px] font-medium text-white/85 sm:text-[14px]">{s.label}</dt>
                  <dd className="relative order-4 mt-0.5 hidden text-[12px] text-white/45 sm:block">{s.hint}</dd>
                </motion.div>
              ))}
            </dl>
          </Reveal>

          {/* tech logo tiles */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ staggerChildren: 0.05 }}
            className="mt-8 grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-6"
            aria-label="Technologies"
          >
            {about.tech
              .filter((t) => techIcons[t])
              .map((t) => (
                <motion.li key={t} variants={tileV} className="group flex flex-col items-center gap-2">
                  <motion.span
                    whileHover={{ y: -6, rotate: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                    className="lx-key relative grid size-14 place-items-center rounded-2xl bg-[#0f1222] transition-shadow duration-300 sm:size-16"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ boxShadow: `0 0 0 1px ${techIcons[t].color}99, 0 10px 30px -6px ${techIcons[t].color}` }}
                    />
                    <TechIcon name={t} className="size-7 sm:size-8" />
                  </motion.span>
                  <span className="text-[11.5px] font-semibold tracking-[0.08em] text-white/60 uppercase transition-colors group-hover:text-white">
                    {t}
                  </span>
                </motion.li>
              ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
