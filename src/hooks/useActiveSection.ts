import { useEffect, useState } from 'react'

/**
 * Returns the id of the section crossing the upper-middle of the viewport, if it is one of
 * `ids` (the nav links). Every <main> section is observed, so while you are inside a section
 * that has no nav link (Process, Services, …) nothing is highlighted instead of a neighbour.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0])

  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('main > section')]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const id = (e.target as HTMLElement).id
          setActive(ids.includes(id) ? id : '')
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}
