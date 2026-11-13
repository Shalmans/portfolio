/**
 * Section backdrops so every section shares the hero's atmosphere.
 *  - "grid":  navy top glow + blue tile grid + soft diagonal streaks (hero look)
 *  - "beams": navy top glow + vertical blue light shafts (LanderX section look)
 */
export function Backdrop({ variant = 'grid', className = '' }: { variant?: 'grid' | 'beams'; className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_70%,transparent)] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_18%,rgb(3_20_87/0.8),transparent_75%)]" />
      {variant === 'grid' ? <GridLayer /> : <ShaftLayer />}
    </div>
  )
}

function GridLayer() {
  const streaks = [
    { top: '-6%', left: '-8%', w: 800, o: 0.28, d: 0 },
    { top: '8%', left: '-16%', w: 950, o: 0.18, d: -3 },
  ]
  return (
    <>
      <div className="lx-grid absolute inset-0 opacity-80 [mask-image:radial-gradient(60%_50%_at_50%_20%,#000_15%,transparent_75%)]" />
      {streaks.map((s, i) => (
        <div
          key={i}
          className="animate-beam absolute h-20 origin-top-left rotate-[35deg] blur-2xl"
          style={{
            top: s.top,
            left: s.left,
            width: s.w,
            opacity: s.o,
            animationDelay: `${s.d}s`,
            background: 'linear-gradient(90deg, rgb(138 165 255 / 0.55), rgb(41 52 255 / 0.2) 45%, transparent)',
          }}
        />
      ))}
    </>
  )
}

function ShaftLayer() {
  const shafts = [
    { left: '16%', w: 90, o: 0.3 },
    { left: '31%', w: 60, o: 0.2 },
    { left: '46%', w: 120, o: 0.32 },
    { left: '61%', w: 70, o: 0.2 },
    { left: '77%', w: 100, o: 0.28 },
  ]
  return (
    <>
      {shafts.map((s, i) => (
        <div
          key={i}
          className="animate-beam absolute top-0 h-[65%] blur-2xl"
          style={{
            left: s.left,
            width: s.w,
            opacity: s.o,
            animationDelay: `${-i * 1.3}s`,
            background: 'linear-gradient(180deg, rgb(41 52 255 / 0.5), rgb(41 52 255 / 0) 90%)',
          }}
        />
      ))}
    </>
  )
}

export function Divider() {
  return <div aria-hidden className="lx-divider mx-auto max-w-[1200px]" />
}
