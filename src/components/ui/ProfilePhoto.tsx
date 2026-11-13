import { useState } from 'react'
import { profile } from '../../data/profile'

/** Shows profile.photo if it loads, otherwise an initials monogram. */
export function ProfilePhoto({ className = '', small = false }: { className?: string; small?: boolean }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`grid place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(138_165_255/0.6),rgb(41_52_255/0.7)_45%,rgb(3_20_87))] ${className}`}
        role="img"
        aria-label={`${profile.name} — photo placeholder`}
      >
        <span className={`font-semibold text-white ${small ? 'text-[9px]' : 'text-xl'}`}>SS</span>
      </div>
    )
  }

  return (
    <img
      src={profile.photo}
      alt={`Portrait of ${profile.name}`}
      width={400}
      height={400}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${small ? 'object-top origin-[56%_6%] scale-[1.45]' : ''} ${className}`}
    />
  )
}
