export type Theme = 'light' | 'dark'

const EVENT = 'themechange'

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

/** Applies a theme and persists it. The inline script in index.html reads the same key before paint. */
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#F5F7FA' : '#0B0C10')
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // storage blocked: theme still applies for this visit
  }
  window.dispatchEvent(new Event(EVENT))
}

export function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark')
}

export function subscribeTheme(cb: () => void) {
  window.addEventListener(EVENT, cb)
  return () => window.removeEventListener(EVENT, cb)
}
