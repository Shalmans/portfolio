import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ChevronDown, Code2, Mail, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { contact, navLinks, profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { WhatsAppIcon } from '../ui/BrandIcons'
import { Tilt } from '../ui/Tilt'

/** "Hire Me" opens a choice of channels */
const hireOptions = [
  {
    label: 'WhatsApp',
    hint: contact.phoneDisplay,
    href: `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(`Hi ${profile.firstName}, I'd like to discuss an Odoo opportunity.`)}`,
    icon: WhatsAppIcon,
    tint: 'bg-[#25D366]/15 text-[#25D366]',
    external: true,
  },
  {
    label: 'Email',
    hint: contact.email,
    href: `mailto:${contact.email}?subject=${encodeURIComponent('Hiring enquiry — Odoo Developer')}`,
    icon: Mail,
    tint: 'bg-brand/20 text-sky',
    external: false,
  },
]

const ids = navLinks.map((l) => l.id)

export function Navbar() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hireOpen, setHireOpen] = useState(false)
  const hireRef = useRef<HTMLDivElement>(null)

  // close the Hire Me menu on outside click / Escape
  useEffect(() => {
    if (!hireOpen) return
    const onDown = (e: PointerEvent) => {
      if (!hireRef.current?.contains(e.target as Node)) setHireOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setHireOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [hireOpen])
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 20))

  // Body scroll is locked while the menu is open, so close first, then scroll.
  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      history.replaceState(null, '', `#${id}`)
    }, 50)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <Tilt
        max={3}
        className={`mx-auto h-14 rounded-2xl transition-[max-width] duration-500 ease-out ${
          scrolled || open ? 'max-w-[1080px]' : 'max-w-[1200px]'
        }`}
      >
        {/* glass slab: blur lives on this flat layer so the nav above can keep preserve-3d */}
        <span
          aria-hidden
          className={`absolute inset-0 rounded-2xl backdrop-blur-xl transition-[background-color,box-shadow] duration-500 ${
            scrolled || open
              ? 'bg-[rgb(8_10_24/0.8)] shadow-[0_0_0_1px_rgb(138_165_255/0.18),inset_0_1px_0_rgb(255_255_255/0.08),0_5px_0_-1px_rgb(5_7_28),0_5px_0_0_rgb(138_165_255/0.12),0_22px_50px_-12px_rgb(0_0_0/0.95),0_0_44px_-10px_rgb(41_52_255/0.5)]'
              : 'bg-[rgb(8_10_24/0.45)] shadow-[0_0_0_1px_rgb(138_165_255/0.12),inset_0_1px_0_rgb(255_255_255/0.06),0_5px_0_-1px_rgb(5_7_28/0.8),0_5px_0_0_rgb(138_165_255/0.08),0_18px_40px_-14px_rgb(0_0_0/0.8)]'
          }`}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-sky/80 to-transparent"
        />

        <nav aria-label="Primary" className="preserve-3d relative flex h-full items-center justify-between pr-2 pl-2.5">
          <a href="#home" aria-label={`${profile.name} — back to top`} className="depth-nav group/logo block [perspective:600px]">
            <span className="preserve-3d relative block size-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/logo:[transform:rotateY(180deg)]">
              <span className="lx-key-on backface-hidden absolute inset-0 grid place-items-center rounded-xl bg-[radial-gradient(circle_at_30%_25%,#8aa5ff,#2934ff_55%,#0a1a8a)] text-[13px] font-bold tracking-[-0.02em] text-white">
                SS
              </span>
              <span className="lx-key-on backface-hidden absolute inset-0 grid place-items-center rounded-xl bg-[radial-gradient(circle_at_30%_25%,#ffffff,#c9d4ff_60%,#8aa5ff)] text-brand [transform:rotateY(180deg)]">
                <Code2 className="size-5" strokeWidth={2.5} aria-hidden />
              </span>
            </span>
          </a>

          <ul className="depth-nav hidden items-center gap-0.5 rounded-xl bg-black/30 p-1 shadow-[inset_0_2px_6px_rgb(0_0_0/0.6),0_0_0_1px_rgb(255_255_255/0.06),0_1px_0_rgb(138_165_255/0.1)] lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`relative block rounded-lg px-3.5 py-1.5 text-[14px] transition-[color,transform] duration-200 ${
                    active === l.id ? '-translate-y-px text-white' : 'text-muted hover:-translate-y-px hover:text-white'
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-lg bg-[linear-gradient(180deg,#3a45ff,#1a22c4)] shadow-[0_0_0_1px_rgb(138_165_255/0.55),inset_0_1px_0_rgb(255_255_255/0.3),0_3px_0_0_rgb(10_14_110),0_8px_18px_-4px_rgb(41_52_255/0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="depth-nav flex items-center gap-1">
            <div ref={hireRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setHireOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={hireOpen}
                className="group items-center gap-1.5 rounded-full bg-[linear-gradient(180deg,#3a45ff,#2934ff)] px-5 py-2 text-[14px] font-medium shadow-[0_0_0_1px_rgb(138_165_255/0.6),inset_0_1px_0_rgb(255_255_255/0.3),0_4px_0_0_rgb(14_22_140),0_10px_26px_-6px_rgb(41_52_255/0.75)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgb(138_165_255/0.9),inset_0_1px_0_rgb(255_255_255/0.35),0_6px_0_0_rgb(14_22_140),0_14px_32px_-6px_rgb(41_52_255/0.9)] active:translate-y-[3px] active:shadow-[0_0_0_1px_rgb(138_165_255/0.6),inset_0_1px_0_rgb(255_255_255/0.2),0_1px_0_0_rgb(14_22_140),0_4px_12px_-4px_rgb(41_52_255/0.6)] inline-flex"
              >
                Hire Me
                <ChevronDown
                  className={`size-4 transition-transform duration-300 ${hireOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              <AnimatePresence>
                {hireOpen && (
                  <motion.ul
                    role="menu"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full right-0 mt-3 w-64 origin-top-right space-y-1 rounded-2xl bg-[rgb(8_10_24/0.95)] p-1.5 shadow-[0_0_0_1px_rgb(138_165_255/0.2),0_24px_50px_-12px_rgb(0_0_0/0.95),0_0_40px_-10px_rgb(41_52_255/0.5)] backdrop-blur-xl"
                  >
                    {hireOptions.map(({ label, hint, href, icon: Icon, tint, external }) => (
                      <li key={label} role="none">
                        <a
                          role="menuitem"
                          href={href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          onClick={() => setHireOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                        >
                          <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${tint}`}>
                            <Icon className="size-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[14px] font-medium">{label}</span>
                            <span className="block truncate text-[12px] text-muted">{hint}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-xl text-white/90 transition-colors hover:bg-white/[0.06] lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </Tilt>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-[1120px] origin-top rounded-2xl bg-[rgb(8_10_24/0.95)] shadow-[0_0_0_1px_rgb(138_165_255/0.16),0_18px_50px_-12px_rgb(0_0_0/0.9)] backdrop-blur-xl lg:hidden"
          >
            <ul className="grid gap-1 p-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={(e) => go(e, l.id)}
                    aria-current={active === l.id ? 'true' : undefined}
                    className={`flex items-center justify-between rounded-xl px-3 py-3 text-base ${
                      active === l.id ? 'bg-deep/60 text-white' : 'text-muted'
                    }`}
                  >
                    {l.label}
                    {active === l.id && <span className="size-1.5 rounded-full bg-sky" />}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <p className="pb-2 text-center text-[12px] tracking-[0.2em] text-muted uppercase">Hire Me</p>
                <div className="grid grid-cols-2 gap-2">
                  {hireOptions.map(({ label, href, icon: Icon, external }) => (
                    <a
                      key={label}
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-brand py-3 font-medium shadow-[0_8px_40px_rgb(17_0_255/0.45)]"
                    >
                      <Icon className="size-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
