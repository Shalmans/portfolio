import { profile } from '../../data/profile'

/** Monogram tile + name, sized like the LanderX wordmark. */
export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const lg = size === 'lg'
  return (
    <span className="flex items-center gap-2">
      <span
        className={`grid place-items-center rounded-md bg-brand font-bold text-white shadow-[inset_0_0_8px_rgb(255_255_255/0.3),0_0_16px_rgb(41_52_255/0.6)] ${
          lg ? 'size-8 text-[12px]' : 'size-7 text-[11px]'
        }`}
      >
        SS
      </span>
      <span className={`font-medium tracking-[-0.02em] text-white/90 ${lg ? 'text-2xl' : 'text-xl'}`}>
        {profile.name}
      </span>
    </span>
  )
}
