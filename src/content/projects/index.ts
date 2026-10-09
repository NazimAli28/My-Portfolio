import type { Image, Project } from '@/types/content'
import { asset } from '@/lib/asset'
import { saleshub } from './saleshub'
import { teamhub } from './teamhub'
import { opsbot } from './opsbot'

const withBase = (img: Image): Image => ({ ...img, src: asset(img.src), thumb: asset(img.thumb) })

/** Display order on the home page and for "next project" links. Image paths get the deploy base. */
export const projects: Project[] = [saleshub, teamhub, opsbot].map((p) => ({
  ...p,
  cover: withBase(p.cover),
  gallery: p.gallery.map(withBase),
}))

export function getProject(slug: string | undefined) {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
