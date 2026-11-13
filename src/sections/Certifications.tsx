import { motion } from 'framer-motion'
import { ArrowUpRight, Award, BadgeCheck, Keyboard, Palette } from 'lucide-react'
import type { ReactNode } from 'react'
import { Backdrop } from '../components/layout/Beams'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { certifications, contact } from '../data/profile'
import type { Certification } from '../data/profile'

const LINKEDIN_CERTS = `${contact.linkedin}/details/certifications/`

const badges: Record<Certification['badge'], { node: ReactNode; className: string; area: string }> = {
  anthropic: {
    node: <span className="font-display text-[17px] font-bold tracking-[-0.06em]">A\</span>,
    className: 'bg-[#F0EEE6] text-[#141413]',
    area: 'AI & Automation',
  },
  dff: {
    node: <span className="text-[11px] font-bold tracking-[0.04em]">DFF</span>,
    className: 'bg-[linear-gradient(145deg,#2a2d3a,#08090d)] text-white',
    area: 'AI & Automation',
  },
  besant: {
    node: <span className="text-[13px] font-bold">BT</span>,
    className: 'bg-[linear-gradient(145deg,#3b82f6,#1e3a8a)] text-white',
    area: 'Development',
  },
  typing: {
    node: <Keyboard className="size-5" aria-hidden />,
    className: 'bg-[linear-gradient(145deg,#34d399,#065f46)] text-white',
    area: 'Professional Skills',
  },
  photoshop: {
    node: <Palette className="size-5" aria-hidden />,
    className: 'bg-[linear-gradient(145deg,#0b2a4a,#001e36)] text-[#31A8FF]',
    area: 'Design',
  },
}

/** Spinning two-faced seal above the heading (pure CSS 3D). */
function Seal() {
  const face =
    'backface-hidden absolute inset-0 grid place-items-center rounded-full border-2 border-sky/60 shadow-[inset_0_0_24px_rgb(255_255_255/0.25),0_0_40px_rgb(41_52_255/0.7)]'
  return (
    <div className="relative mx-auto size-20 [perspective:800px] sm:size-24" aria-hidden>
      <div className="animate-coin preserve-3d relative size-full">
        <div className={`${face} bg-[radial-gradient(circle_at_35%_30%,#8AA5FF,#2934FF_55%,#031457)]`}>
          <div className="text-center leading-none">
            <p className="text-[26px] font-bold sm:text-[30px]">{certifications.length}</p>
            <p className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-white/80">CERTS</p>
          </div>
        </div>
        <div className={`${face} [transform:rotateY(180deg)] bg-[radial-gradient(circle_at_35%_30%,#ffd76a,#f5b301_50%,#7a4b00)]`}>
          <Award className="size-9 text-black/80" />
        </div>
      </div>
      <div className="absolute -bottom-5 left-1/2 h-3 w-16 -translate-x-1/2 rounded-full bg-brand/60 blur-md" />
    </div>
  )
}

function CertCard({ c }: { c: Certification }) {
  const b = badges[c.badge]
  const href = c.url ?? (c.onLinkedIn ? LINKEDIN_CERTS : undefined)
  return (
    <Card className="h-full" innerClassName="flex flex-col p-5 sm:p-6" max={15} lift={1.04}>
      {/* decorations clipped in their own layer — overflow-hidden on the card itself would flatten the 3D depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
        {/* holographic top edge */}
        <span className="animate-flow absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#8aa5ff,#854dff,#2934ff,transparent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
        {/* foil sheen that follows the pointer */}
        <span className="absolute inset-0 bg-[linear-gradient(115deg,transparent_25%,rgb(138_165_255/0.22)_40%,rgb(133_77_255/0.2)_48%,rgb(52_211_153/0.14)_56%,transparent_70%)] bg-[length:250%_250%] [background-position:var(--mx,50%)_var(--my,50%)] opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100" />
        <Award className="absolute -right-6 -bottom-6 size-32 text-white/[0.025] transition-colors duration-500 group-hover:text-sky/[0.08]" />
      </div>
      {/* soft floor shadow — sells the lift */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -bottom-3 h-6 rounded-full bg-brand/0 blur-xl transition-colors duration-500 group-hover:bg-brand/50"
      />

      <div className="depth-3 flex items-start justify-between gap-3">
        <span
          className={`lx-key grid size-12 shrink-0 place-items-center rounded-xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${b.className}`}
        >
          {b.node}
        </span>
        {c.issued && (
          <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[12px] text-muted shadow-[0_0_0_1px_rgb(255_255_255/0.08)]">
            {c.issued}
          </span>
        )}
      </div>

      <div className="depth-2 mt-5">
        <h3 className="text-[17px] leading-snug font-medium text-balance">{c.title}</h3>
        <p className="mt-1.5 text-[12px] font-medium tracking-[0.08em] text-sky/80 uppercase">{c.issuer}</p>
      </div>

      {c.skills && (
        <ul className="depth-1 mt-4 flex flex-wrap gap-1.5">
          {c.skills.map((s) => (
            <li key={s} className="rounded-md bg-brand/10 px-2 py-0.5 text-[12px] text-sky shadow-[0_0_0_1px_rgb(41_52_255/0.3)]">
              {s}
            </li>
          ))}
        </ul>
      )}

      <div aria-hidden className="min-h-5 flex-1" />
      <div className="depth-1 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
        <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-white/45">
          <BadgeCheck className="size-3.5 text-sky/70" aria-hidden /> {b.area}
        </span>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-8 items-center gap-1 rounded-full px-3 py-1.5 text-[12px] text-sky shadow-[0_0_0_1px_rgb(138_165_255/0.3)] transition-colors hover:bg-brand/20 hover:text-white"
          >
            {/* direct credential link vs the general LinkedIn certifications page */}
            {c.url ? 'Show credential' : 'View on LinkedIn'} <ArrowUpRight className="size-3.5" aria-hidden />
            <span className="sr-only">: {c.title}</span>
          </a>
        )}
      </div>
    </Card>
  )
}

export function Certifications() {
  return (
    <section id="certifications" className="relative overflow-hidden px-5 py-24 sm:py-28">
      <Backdrop variant="beams" />
      <div className="relative mx-auto max-w-[1200px]">
        <Reveal className="mb-8">
          <Seal />
        </Reveal>
        <SectionHeading
          eyebrow="Certifications"
          title="Licenses & certifications"
          subtitle="Industry-recognised credentials in AI, development and professional skills — earned alongside day-to-day Odoo project work."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <motion.div
              key={c.title}
              className="h-full"
              initial={{ opacity: 0, rotateX: -40, y: 70, transformPerspective: 1200 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 90, damping: 15, delay: (i % 3) * 0.1 }}
              style={{ transformOrigin: '50% 100%' }}
            >
              <CertCard c={c} />
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button href={LINKEDIN_CERTS} target="_blank" rel="noopener noreferrer" variant="secondary" icon={ArrowUpRight}>
            View all on LinkedIn
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
