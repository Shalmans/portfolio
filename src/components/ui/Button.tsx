import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import type { ComponentProps, MouseEvent, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-5 py-2.5 text-[15px] font-medium tracking-[-0.01em] transition-[box-shadow,background-color,color] duration-300 select-none disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-[0_0_0_1px_rgb(138_165_255/0.55),0_8px_40px_0_rgb(17_0_255/0.45),inset_0_0_10px_1px_rgb(255_255_255/0.18)] hover:shadow-[0_0_0_1px_rgb(138_165_255/0.9),0_8px_48px_0_rgb(17_0_255/0.75),inset_0_0_12px_1px_rgb(255_255_255/0.25)]',
  secondary:
    'bg-deep text-white shadow-[0_0_0_1px_rgb(0_85_255/0.2),inset_0_1px_0_rgb(138_165_255/0.15)] hover:bg-[#0a1f7a] hover:shadow-[0_0_0_1px_rgb(0_85_255/0.45),0_1px_25px_0_rgb(41_52_255/0.35)]',
  ghost: 'text-muted hover:text-white',
}

type Common = {
  children: ReactNode
  variant?: Variant
  icon?: LucideIcon
  iconLeft?: boolean
  className?: string
  /** Magnetic pull towards the cursor (desktop pointers only) */
  magnetic?: boolean
}

type AnchorProps = Common & Omit<ComponentProps<'a'>, keyof Common | 'ref'> & { href: string }
type ButtonProps = Common & Omit<ComponentProps<'button'>, keyof Common | 'ref'> & { href?: undefined }

function useMagnet(enabled: boolean) {
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.3 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.3 })
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!enabled) return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.15)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2)
  }
  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  return { style: { x, y }, onMouseMove, onMouseLeave }
}

function Inner({ children, icon: Icon, iconLeft, variant }: Common) {
  const iconEl = Icon && (
    <Icon
      aria-hidden
      className={`size-4 transition-transform duration-300 ${iconLeft ? '' : 'group-hover:translate-x-0.5'}`}
    />
  )
  return (
    <>
      {variant === 'primary' && (
        // sheen sweep on hover
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
        />
      )}
      {iconLeft && iconEl}
      <span className="relative">{children}</span>
      {!iconLeft && iconEl}
    </>
  )
}

export function Button(props: AnchorProps | ButtonProps) {
  const { children, variant = 'primary', icon, iconLeft, className = '', magnetic = true, ...rest } = props
  const magnet = useMagnet(magnetic)
  const cls = `${base} ${variants[variant]} ${className}`
  const inner = (
    <Inner icon={icon} iconLeft={iconLeft} variant={variant}>
      {children}
    </Inner>
  )

  if (rest.href !== undefined) {
    const anchorRest = rest as Omit<AnchorProps, keyof Common>
    return (
      <motion.a
        {...(anchorRest as object)}
        className={cls}
        style={magnet.style}
        onMouseMove={magnet.onMouseMove}
        onMouseLeave={magnet.onMouseLeave}
        whileTap={{ scale: 0.97 }}
      >
        {inner}
      </motion.a>
    )
  }

  const buttonRest = rest as Omit<ButtonProps, keyof Common>
  return (
    <motion.button
      {...(buttonRest as object)}
      className={cls}
      style={magnet.style}
      onMouseMove={magnet.onMouseMove}
      onMouseLeave={magnet.onMouseLeave}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  )
}
