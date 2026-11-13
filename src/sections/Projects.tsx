import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, ExternalLink, MessageCircle, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Backdrop } from '../components/layout/Beams'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { ProjectMockup } from '../components/ui/ProjectMockup'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { projects } from '../data/profile'
import type { Project } from '../data/profile'

function ProjectCard({
  p,
  index,
  featured,
  onOpen,
}: {
  p: Project
  index: number
  featured: boolean
  onOpen: () => void
}) {
  return (
    <Card max={featured ? 5 : 7} className="h-full" innerClassName="flex flex-col">
      {/* screen stage — fixed height so every title lines up; the screen sinks into the card at the bottom */}
      <div
        className={`relative overflow-hidden rounded-t-2xl border-b border-white/[0.06] bg-[radial-gradient(90%_80%_at_50%_100%,rgb(41_52_255/0.28),transparent_70%)] ${featured ? 'h-[240px] sm:h-[280px]' : 'h-[210px]'}`}
      >
        <div
          aria-hidden
          className="lx-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_70%_at_50%_40%,#000,transparent)]"
        />
        <span className="absolute top-4 left-4 z-10 font-display text-[12px] font-semibold tracking-wider text-white/35 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute top-3.5 right-4 z-10 rounded-full border border-sky/20 bg-deep/70 px-2.5 py-1 text-[11.5px] font-medium text-sky backdrop-blur">
          {p.category}
        </span>
        <div
          className={`absolute inset-x-0 top-14 mx-auto [mask-image:linear-gradient(#000_70%,transparent)] transition-transform duration-700 ease-out [transform:perspective(1000px)_rotateX(14deg)] group-hover:[transform:perspective(1000px)_rotateX(0deg)_translateY(-10px)] ${featured ? 'w-[min(78%,440px)]' : 'w-[84%]'}`}
        >
          <ProjectMockup kind={p.mockup} />
        </div>
      </div>

      <div className="depth-1 flex flex-1 flex-col p-5 sm:p-6">
        <h3 className={`leading-snug font-medium ${featured ? 'text-[21px]' : 'text-[18px]'}`}>{p.name}</h3>
        <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-muted">{p.description}</p>
        <ul className={`mt-4 gap-x-4 gap-y-1.5 ${featured ? 'grid sm:grid-cols-2' : 'space-y-1.5'}`}>
          {p.features.slice(0, 2).map((f) => (
            <li key={f} className="flex gap-2 text-[13px] leading-snug text-white/75">
              <Check className="mt-0.5 size-3.5 shrink-0 text-sky" strokeWidth={2.5} aria-hidden /> {f}
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.tech.slice(0, 3).map((t) => (
            <li
              key={t}
              className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 text-[12px] text-white/70"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            aria-label={`View project: ${p.name}`}
            className="flex min-h-10 w-full items-center justify-between rounded-lg bg-deep/80 px-4 py-2 text-[13.5px] font-medium shadow-[0_0_0_1px_rgb(0_85_255/0.3)] transition group-hover:bg-brand hover:bg-brand focus-visible:bg-brand"
          >
            View project details
            <ArrowUpRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </button>
        </div>
      </div>
    </Card>
  )
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="lx-card relative w-full max-w-3xl overflow-hidden"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-lg bg-deep text-white/80 hover:text-white"
        >
          <X className="size-4" />
        </button>

        <div className="bg-[radial-gradient(80%_100%_at_50%_0%,rgb(3_20_87),transparent)] px-6 pt-10 pb-6 sm:px-12">
          <div className="mx-auto max-w-lg">
            <ProjectMockup kind={p.mockup} />
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:grid-cols-[1.3fr_1fr] sm:p-8">
          <div>
            <span className="text-[13px] text-sky">{p.category}</span>
            <h3 id="project-title" className="mt-1 text-[24px] font-medium">
              {p.name}
            </h3>
            <p className="mt-3 text-[15px] text-muted">{p.description}</p>
            <h4 className="mt-6 text-[12px] font-medium tracking-wider text-white/50 uppercase">Key functionality</h4>
            <ul className="mt-3 space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2 text-[15px] text-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-sky" strokeWidth={2.5} aria-hidden /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-medium tracking-wider text-white/50 uppercase">Technologies</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <li key={t} className="rounded-full bg-white/[0.05] px-3 py-1 text-[13px] text-muted">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-2">
              {p.url ? (
                <Button href={p.url} target="_blank" rel="noopener noreferrer" icon={ExternalLink} magnetic={false}>
                  Open project
                </Button>
              ) : (
                <p className="text-[13px] text-muted">Walkthrough and demo available on request.</p>
              )}
              <Button href="#contact" variant="secondary" icon={MessageCircle} magnetic={false} onClick={onClose}>
                Discuss a similar project
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const FEATURED = 2

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const close = useCallback(() => setOpen(null), [])

  return (
    <section id="projects" className="relative overflow-hidden px-5 py-24 sm:py-28">
      <Backdrop variant="grid" />
      <div className="relative mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Projects"
          subtitle="Custom Odoo modules and customizations across healthcare, education, sales, inventory, HR, finance and web."
        />
        {/* bento: two featured projects on top, the rest three per row */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {projects.map((p, i) => {
            const featured = i < FEATURED
            return (
              <Reveal
                key={p.name}
                delay={(featured ? i : (i - FEATURED) % 3) * 0.07}
                className={`h-full ${featured ? 'sm:col-span-2 lg:col-span-3' : 'lg:col-span-2'}`}
              >
                <ProjectCard p={p} index={i} featured={featured} onOpen={() => setOpen(p)} />
              </Reveal>
            )
          })}
        </div>
      </div>
      <AnimatePresence>{open && <ProjectModal p={open} onClose={close} />}</AnimatePresence>
    </section>
  )
}
