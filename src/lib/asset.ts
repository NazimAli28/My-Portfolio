/**
 * Prefix a public/ file path with the deploy base (e.g. '/My-Portfolio/' on GitHub Pages, '/' locally).
 * Use for every image/PDF path stored in content. Router <Link>s don't need it (basename handles them).
 */
export const BASE = import.meta.env.BASE_URL

export function asset(path: string) {
  return BASE + path.replace(/^\//, '')
}
