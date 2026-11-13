import { ArrowUpRight, Check, Copy, Mail, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Backdrop } from '../components/layout/Beams'
import { LinkedInIcon, WhatsAppIcon } from '../components/ui/BrandIcons'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { Pill } from '../components/ui/SectionHeading'
import { contact, profile } from '../data/profile'

/**
 * mailto: does nothing for visitors without a desktop mail app (e.g. Gmail in the browser),
 * so the email tile also offers a one-click copy.
 */
function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked: fall back to selecting nothing — the address is visible on the tile
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      title={copied ? 'Copied!' : 'Copy email address'}
      className={`absolute top-1/2 right-3 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-lg shadow-[0_0_0_1px_rgb(255_255_255/0.1)] transition ${
        copied ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/[0.06] text-white/80 hover:bg-brand/30 hover:text-white'
      }`}
    >
      {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : 'Copy email address'}
      </span>
    </button>
  )
}

export function Contact() {
  const methods = [
    {
      icon: <Mail className="size-5" aria-hidden />,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      copy: true,
    },
    {
      icon: <WhatsAppIcon className="size-5" />,
      label: 'WhatsApp',
      value: contact.phoneDisplay,
      href: `https://wa.me/${contact.whatsapp}`,
      external: true,
    },
    { icon: <LinkedInIcon className="size-5" />, label: 'LinkedIn', value: 'Connect with me', href: contact.linkedin, external: true },
  ]

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24 sm:py-28">
      <Backdrop variant="beams" />
      <div className="relative mx-auto max-w-[1000px] text-center">
        <div>
          <Reveal>
            <Pill>Contact</Pill>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-[34px] leading-[1.1] font-medium tracking-[-0.02em] text-balance sm:text-[48px]">
              Have an Odoo project{' '}
              <span className="bg-gradient-to-r from-sky via-white to-sky bg-clip-text text-transparent">in mind?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-md text-[16px] text-muted">
              Implementation, customization or a version upgrade — tell me what you need and let&apos;s build it together.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
            <p className="inline-flex items-center gap-2.5 rounded-full bg-emerald-400/10 px-3.5 py-1.5 text-[13px] text-emerald-300 shadow-[0_0_0_1px_rgb(52_211_153/0.25)]">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative size-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability} · replies within a day
            </p>
            <p className="inline-flex items-center gap-1.5 text-[13px] text-muted">
              <MapPin className="size-4 text-sky" aria-hidden /> {profile.location}
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-4 text-left md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            {methods.map((m, i) => {
              const body = (
                <Card max={9} className="h-full" innerClassName={`flex items-center gap-3.5 p-4 ${m.copy ? 'pr-14' : ''}`}>
                  <span className="lx-key-on depth-2 grid size-11 shrink-0 place-items-center rounded-xl bg-[radial-gradient(circle_at_30%_25%,#8aa5ff,#2934ff_55%,#0a1a8a)] text-white">
                    {m.icon}
                  </span>
                  <span className="depth-1 min-w-0 flex-1">
                    <span className="block text-[12px] tracking-wide text-muted uppercase">{m.label}</span>
                    <span className="block truncate text-[14px] font-medium sm:text-[15px]">{m.value}</span>
                  </span>
                  {m.href && !m.copy && (
                    <ArrowUpRight
                      aria-hidden
                      className="depth-2 size-4 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  )}
                </Card>
              )
              return (
                <li key={m.label} className={m.copy ? 'md:col-span-2 lg:col-span-1' : undefined}>
                  <Reveal delay={0.2 + i * 0.06} className="relative h-full">
                    {m.copy && <CopyEmail />}
                    {m.href ? (
                      <a
                        href={m.href}
                        {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="block h-full rounded-2xl"
                      >
                        {body}
                      </a>
                    ) : (
                      body
                    )}
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

