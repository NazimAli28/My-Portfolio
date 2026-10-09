/** Content model. All copy lives in src/content/*.ts. */

export interface Link {
  label: string
  href: string
}

export interface Profile {
  name: string
  shortName: string
  role: string
  headline: string
  intro: string
  location: string
  timeZone: string
  email: string
  phone: string
  phoneHref: string
  availability: string
  resume: string
  socials: { github: string; linkedin: string }
}

export interface Stat {
  value: number
  suffix?: string
  label: string
}

export interface Experience {
  company: string
  role: string
  start: string
  end: string | null
  location: string
  summary: string
  highlights: string[]
}

export interface Education {
  school: string
  degree: string
  start: string
  end: string
  location: string
}

export interface Course {
  title: string
  provider: string
  date: string
  items: string[]
  url?: string
}

export interface SkillGroup {
  name: string
  items: string[]
}

export interface Image {
  src: string
  thumb: string
  alt: string
  w: number
  h: number
  caption?: string
}

export interface Feature {
  title: string
  body: string
}

export interface Decision {
  title: string
  problem: string
  choice: string
  tradeoff: string
}

export interface ArchNode {
  id: string
  label: string
  detail?: string
}

export interface Architecture {
  summary: string
  /** Rendered left-to-right as connected layers, e.g. Browser → API → DB */
  layers: { name: string; nodes: ArchNode[] }[]
}

export interface ProjectVersion {
  label: 'v1' | 'v2'
  title: string
  summary: string
  stack: string[]
  points: string[]
}

export interface Project {
  slug: 'saleshub' | 'teamhub' | 'opsbot'
  title: string
  tagline: string
  /** One-line outcome shown on cards */
  outcome: string
  year: string
  role: string
  type: string
  stack: string[]
  links: { github: string; live?: string }
  cover: Image
  stats: Stat[]
  problem: string[]
  goals: string[]
  solution: string[]
  features: Feature[]
  gallery: Image[]
  architecture: Architecture
  decisions: Decision[]
  results: string[]
  lessons: string[]
  aiNote: string
  versions?: ProjectVersion[]
  /** Accent used for the card glow + case-study highlights */
  accent: 'cyan' | 'violet'
}

export interface WPSite {
  slug: string
  name: string
  url?: string
  thumb?: string
  fullShot?: string
  industry: string
  summary: string
  features: string[]
  stack: string[]
  year: string
  placeholder: boolean
}
