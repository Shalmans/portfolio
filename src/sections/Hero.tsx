import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Boxes, Code, Database, Download } from 'lucide-react'
import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { Button } from '../components/ui/Button'
import { ProfilePhoto } from '../components/ui/ProfilePhoto'
import { heroChips, profile } from '../data/profile'

const ease = [0.22, 1, 0.36, 1] as const

/** Entrance held back until `ready` (loader gone). */
const fadeUp = (ready: boolean, delay: number) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(6px)' },
  animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
  transition: { duration: 0.8, delay, ease },
})

/** diagonal light streaks from the top-left corner */
const streaks = [
  { top: '-10%', left: '-5%', w: 900, o: 0.5, d: 0 },
  { top: '5%', left: '-12%', w: 1100, o: 0.35, d: -2 },
  { top: '-20%', left: '10%', w: 800, o: 0.3, d: -4 },
  { top: '20%', left: '-20%', w: 1000, o: 0.25, d: -1 },
]

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 140])
  const yText = useTransform(scrollYProgress, [0, 1], [0, 50])

  // subtle cursor glow
  const mx = useSpring(useMotionValue(-999), { stiffness: 80, damping: 20 })
  const my = useSpring(useMotionValue(-999), { stiffness: 80, damping: 20 })
  const glow = useMotionTemplate`radial-gradient(500px circle at ${mx}px ${my}px, rgb(41 52 255 / 0.12), transparent 60%)`
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <section id="home" ref={ref} onMouseMove={onMove} className="relative overflow-hidden pt-36 pb-14 sm:pt-44">
      {/* backdrop */}
      <motion.div aria-hidden style={{ y: yBg }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(80%_45%_at_50%_0%,rgb(3_20_87)_0%,rgb(0_0_0)_100%)]" />
        <div className="lx-grid absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_10%,#000_20%,transparent_75%)]" />
        {streaks.map((s, i) => (
          <div
            key={i}
            className="animate-beam absolute h-24 origin-top-left rotate-[35deg] blur-2xl"
            style={{
              top: s.top,
              left: s.left,
              width: s.w,
              opacity: s.o,
              animationDelay: `${s.d}s`,
              background: 'linear-gradient(90deg, rgb(138 165 255 / 0.55), rgb(41 52 255 / 0.25) 45%, transparent)',
            }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black" />
      </motion.div>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />

      {/* copy */}
      <motion.div style={{ y: yText }} className="relative mx-auto max-w-5xl px-5 text-center">
        <motion.div {...fadeUp(ready, 0.05)} className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <div className="flex -space-x-2">
            <span className="size-7 overflow-hidden rounded-full ring-2 ring-black">
              <ProfilePhoto className="size-full" small />
            </span>
            {[Code, Database, Boxes].map((Icon, i) => (
              <span key={i} className={`size-7 place-items-center rounded-full bg-[#1a1d3a] text-sky ring-2 ring-black grid`}>
                <Icon className="size-3.5" aria-hidden />
              </span>
            ))}
          </div>
          <p className="text-[14px] text-muted sm:text-[15px]">
            <span className="font-medium text-white">3.5+ years</span> building Odoo in UAE
          </p>
        </motion.div>

        <h1 className="mt-6">
          <motion.span
            {...fadeUp(ready, 0.15)}
            className="lx-heading block font-display text-[40px] leading-[1.12] font-medium sm:text-[64px]"
          >
            Hello, I&apos;m {profile.name},
          </motion.span>
          <motion.span
            {...fadeUp(ready, 0.28)}
            className="mt-1 block bg-gradient-to-r from-sky via-[#aabdff] to-iris bg-clip-text font-display text-[22px] leading-[1.25] font-medium text-transparent sm:text-[34px]"
          >
            {profile.title.replace(/-/g, '\u2011')}
          </motion.span>
        </h1>

        <motion.p
          {...fadeUp(ready, 0.4)}
          className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-muted text-pretty"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          {...fadeUp(ready, 0.52)}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button href="#projects" icon={ArrowRight}>
            Explore My Work
          </Button>
          <Button href={profile.cvPath} download={profile.cvFileName} variant="secondary" icon={Download}>
            Download CV
          </Button>
          <Button href="#contact" variant="secondary">
            Let&apos;s Connect
          </Button>
        </motion.div>
      </motion.div>

      {/* "logo" strip — tech instead of client logos */}
      <motion.div
        {...fadeUp(ready, 0.7)}
        className="relative mx-auto mt-14 max-w-[1000px] overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_20%,#000_80%,transparent)]"
      >
        <ul className="animate-marquee flex w-max items-center gap-10 py-2 sm:gap-16">
          {[...heroChips, ...heroChips].map((c, i) => (
            <li
              key={i}
              aria-hidden={i >= heroChips.length}
              className="flex items-center gap-2 text-[20px] font-semibold tracking-[-0.03em] whitespace-nowrap text-white/55 sm:text-[26px]"
            >
              <c.icon className="size-5 sm:size-7" aria-hidden />
              {c.label}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
