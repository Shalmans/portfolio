import { Heart } from 'lucide-react'
import { contact, profile } from '../../data/profile'
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from '../ui/BrandIcons'
import { Logo } from '../ui/Logo'

const year = new Date().getFullYear()

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'LinkedIn', href: contact.linkedin, icon: <LinkedInIcon className="size-4" /> },
  { label: 'GitHub', href: contact.github, icon: <GitHubIcon className="size-4" /> },
  { label: 'WhatsApp', href: `https://wa.me/${contact.whatsapp}`, icon: <WhatsAppIcon className="size-4" /> },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(55%_100%_at_50%_100%,rgb(41_52_255/0.28),transparent)]"
      />

      {/* bottom bar */}
      <div className="relative border-t border-white/[0.08] px-5 py-7">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 lg:flex-row lg:justify-between">
          <a href="#home" aria-label={`${profile.name} — back to top`}>
            <Logo />
          </a>

          <p className="flex items-center gap-1.5 text-[14px] text-muted">
            © {year} Made with
            <Heart className="size-4 animate-pulse fill-rose-500 text-rose-500" aria-label="love" />
            in {profile.location}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <nav aria-label="Footer" className="flex items-center gap-6">
              {links.map((l) => (
                <a key={l.label} href={l.href} className="inline-block py-1.5 text-[14px] text-muted transition-colors hover:text-white">
                  {l.label}
                </a>
              ))}
            </nav>
            <span aria-hidden className="hidden h-5 w-px bg-white/10 sm:block" />
            <ul className="flex items-center gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="lx-key grid size-9 place-items-center rounded-lg bg-[#0c0f24] text-muted transition-[transform,color,box-shadow] duration-200 hover:-translate-y-0.5 hover:text-white hover:shadow-[0_0_0_1px_rgb(138_165_255/0.6),0_4px_0_0_rgb(14_22_140),0_10px_22px_-6px_rgb(41_52_255/0.7)] active:translate-y-0.5"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
