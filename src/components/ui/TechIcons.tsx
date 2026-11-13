import { techIcons } from './techIconData'

export function TechIcon({ name, className = 'size-7' }: { name: string; className?: string }) {
  const t = techIcons[name]
  if (!t) return null
  if (t.text)
    return (
      <span className="text-[13px] font-black tracking-tight" style={{ color: t.color }} aria-hidden>
        {t.text}
      </span>
    )
  return (
    <svg viewBox="0 0 24 24" className={className} fill={t.color} aria-hidden>
      <path d={t.path} />
    </svg>
  )
}
