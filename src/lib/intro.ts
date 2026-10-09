import { useSyncExternalStore } from 'react'

/**
 * "Intro done" signal: the hero's load sequence waits for the preloader to finish.
 * The preloader shows once per browser session and never under reduced motion.
 */
const KEY = 'preloaded'
let done = false
const subs = new Set<() => void>()

export function shouldShowPreloader() {
  try {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    // Home only (base-aware: '/' locally, '/My-Portfolio/' on GitHub Pages)
    const trim = (s: string) => s.replace(/\/$/, '')
    if (trim(location.pathname) !== trim(import.meta.env.BASE_URL)) return false
    return sessionStorage.getItem(KEY) !== '1'
  } catch {
    return false
  }
}

export function finishIntro() {
  done = true
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    // ignore
  }
  subs.forEach((cb) => cb())
}

export function useIntroDone() {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb)
      return () => subs.delete(cb)
    },
    () => done,
  )
}
