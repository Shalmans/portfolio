import { Backdrop } from '../components/layout/Beams'
import { Card } from '../components/ui/Card'
import { ProfilePhoto } from '../components/ui/ProfilePhoto'
import { Reveal } from '../components/ui/Reveal'
import { Pill } from '../components/ui/SectionHeading'
import { profile } from '../data/profile'

/** "Founder's note"-style statement on a floating 3D card. */
export function Quote() {
  return (
    <section aria-label="Personal note" className="relative overflow-hidden px-5 py-24 sm:py-28">
      <Backdrop variant="beams" />
      <Reveal className="relative mx-auto max-w-4xl">
        <Card max={5} className="px-6 py-12 text-center shadow-[0_0_0_1px_rgb(41_52_255/0.3),0_40px_120px_-30px_rgb(41_52_255/0.55)] sm:px-14 sm:py-16">
          <div className="depth-2">
            <Pill>My approach</Pill>
          </div>
          <blockquote className="depth-3 mt-6 text-[26px] leading-[1.3] font-medium tracking-[-0.02em] text-balance sm:text-[34px]">
            “ I enjoy <span className="text-sky">understanding business requirements</span> and translating them into{' '}
            <span className="text-sky">efficient technical solutions</span> on Odoo „
          </blockquote>
          <div className="depth-1 mt-7 flex items-center justify-center gap-3 text-[15px] text-muted">
            <span className="size-9 overflow-hidden rounded-full ring-2 ring-brand/60">
              <ProfilePhoto className="size-full" small />
            </span>
            {profile.name} — {profile.shortTitle}
          </div>
        </Card>
      </Reveal>
    </section>
  )
}
