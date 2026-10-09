import type { Profile, Stat } from '@/types/content'
import { asset } from '@/lib/asset'

export const profile: Profile = {
  name: 'Muhammad Nazim Ali',
  shortName: 'Nazim Ali',
  role: 'Software developer',
  headline: 'I build the tools that run the business.',
  intro:
    'Software developer in Karachi. I design and ship internal systems in Python, PHP and SQL: approval workflows, task tracking and chat bots that real teams use every day. Now growing into AI-driven software engineering.',
  location: 'Karachi, Pakistan',
  timeZone: 'Asia/Karachi',
  email: 'nazimalionline@gmail.com',
  phone: '+92 347 8399828',
  phoneHref: 'tel:+923478399828',
  availability: 'Open to AI and R&D trainee roles',
  resume: asset('/resume/Muhammad-Nazim-Ali-Resume.pdf'),
  socials: {
    github: 'https://github.com/NazimAli28',
    linkedin: 'https://www.linkedin.com/in/mnazimali',
  },
}

/** Count-up stats under the hero. Sources: resume + SalesHub README test counts. */
export const stats: Stat[] = [
  { value: 3, suffix: '+', label: 'years building for a real business' },
  { value: 50, label: 'staff using SalesHub' },
  { value: 12, label: 'designers scored live by TeamHub' },
  { value: 920, label: 'automated tests in SalesHub v2' },
  { value: 20, label: 'WordPress and WooCommerce sites delivered' },
]

/** Words cycled by the scrambled line in the hero */
export const roles = ['Python', 'PHP', 'SQL', 'REST APIs', 'AI-assisted development']
