import type { SkillGroup } from '@/types/content'

export const skills: SkillGroup[] = [
  { name: 'Languages', items: ['Python', 'PHP', 'JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'] },
  {
    name: 'Backend and APIs',
    items: ['REST APIs', 'JSON and AJAX endpoints', 'Laravel', 'discord.py', 'PHP sessions'],
  },
  { name: 'Databases', items: ['MySQL', 'MariaDB', 'SQLite', 'Relational modelling'] },
  {
    name: 'AI and ML',
    items: ['AI-assisted development', 'Regression', 'Classification', 'Neural networks'],
  },
  {
    name: 'Practices',
    items: ['Role-based access', 'Secure coding', 'Code review', 'Git and GitHub', 'SDLC'],
  },
  { name: 'CMS', items: ['WordPress', 'WooCommerce'] },
  { name: 'Learning now', items: ['Node.js', 'Express', 'Deep learning'] },
]

/** Flat list for the tech marquee */
export const marquee = [
  'Python',
  'PHP',
  'Laravel',
  'MySQL',
  'SQLite',
  'JavaScript',
  'TypeScript',
  'React',
  'REST APIs',
  'discord.py',
  'Trello API',
  'Chart.js',
  'Tailwind CSS',
  'WordPress',
  'WooCommerce',
  'Git',
]
