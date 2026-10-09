import { useSyncExternalStore } from 'react'
import { getTheme, subscribeTheme, toggleTheme } from '@/lib/theme'

export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => 'dark' as const)
  return { theme, toggle: toggleTheme }
}
