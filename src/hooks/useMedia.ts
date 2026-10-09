import { useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query. SSR-safe default is false. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mql = matchMedia(query)
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    () => matchMedia(query).matches,
    () => false,
  )
}

/** Mouse/trackpad devices: cursor follower + magnetic buttons only mount here */
export const usePointerFine = () => useMedia('(hover: hover) and (pointer: fine)')
export const useReducedMotion = () => useMedia('(prefers-reduced-motion: reduce)')
