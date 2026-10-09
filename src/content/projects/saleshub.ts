import type { Project } from '@/types/content'

export const saleshub: Project = {
  slug: 'saleshub',
  title: 'SalesHub',
  tagline:
    'A sales operations platform where every sensitive change is reviewed by a second person before it goes live.',
  outcome: 'Replaced shared spreadsheets and Google Forms for about 50 sales staff across 4 roles.',
  year: '2023–2026',
  role: 'Sole developer: requirements, database design, build, review',
  type: 'Internal sales operations platform',
  stack: [
    'Laravel 13',
    'PHP 8.4',
    'React 19',
    'TypeScript',
    'TanStack Query',
    'Tailwind 4',
    'MySQL 8',
    'Pest and Playwright',
  ],
  links: {
    github: 'https://github.com/NazimAli28/SalesHub-PHP-Account-Client-Management-System',
    live: 'https://nazimali28.github.io/SalesHub-PHP-Account-Client-Management-System/',
  },
  accent: 'violet',
  cover: {
    src: '/projects/saleshub/dashboard-dark.webp',
    thumb: '/projects/saleshub/dashboard-dark-thumb.webp',
    alt: 'SalesHub dashboard in dark theme with KPIs, revenue chart, lead funnel and leaderboard',
    w: 1440,
    h: 900,
  },
  stats: [
    { value: 50, label: 'staff using it' },
    { value: 4, label: 'user roles' },
    { value: 920, label: 'automated tests (632 + 215 + 73)' },
    { value: 71, label: 'permissions' },
  ],
  problem: [
    'The sales team tracked leads, clients, orders and shared platform accounts in spreadsheets and Google Forms. Edits went straight in, with no clear record of who changed a price or a client detail.',
    'Sensitive changes had no review step, and access was all or nothing. The team needed one controlled system with roles and an approval on every sensitive change.',
  ],
  goals: [
    'Give each of the 4 roles access to only the records they need.',
    'Review every sensitive change before it goes live.',
    'Keep a trace of who changed what, and who viewed shared credentials.',
    'Replace the spreadsheets without slowing down daily sales work.',
  ],
  solution: [
    'Version 1 was a PHP and MySQL web app with 6 data modules, session-based role access and a maker-checker approval workflow. About 50 staff used it in place of the spreadsheets.',
    'Version 2 is a rebuild that fixes the weak spots I found in v1: a Laravel API with typed contracts, server-enforced permissions, encrypted credentials, automated tests and CI, with a React single-page app on top.',
  ],
  features: [
    {
      title: 'Maker-checker approvals',
      body: 'Users who may only request changes get a pending request. A team lead or support user sees a before and after diff, then approves or rejects. Nobody approves their own request.',
    },
    {
      title: 'Stale-data protection',
      body: 'Each request stores a snapshot of the record. If the record changed since, the approval is rejected instead of overwriting newer work.',
    },
    {
      title: 'Encrypted credentials',
      body: 'Shared platform logins are encrypted at rest and write-only in the UI. A reveal is audited and hides again after 30 seconds.',
    },
    {
      title: 'Leads board and Client 360',
      body: 'Leads work as a table or a drag-and-drop board with keyboard moves. Client 360 puts orders, payments, notes and activity on one page.',
    },
    {
      title: 'CSV import wizard',
      body: 'Upload a file, map columns, preview row-level errors, then run the import in the background. A downloadable report lists rows that failed.',
    },
    {
      title: 'Security and speed tools',
      body: 'Optional TOTP two-factor sign-in with recovery codes, an audit log with redacted diffs, and a Ctrl+K command palette that never returns credentials.',
    },
  ],
  gallery: [
    {
      src: '/projects/saleshub/leads-board.webp',
      thumb: '/projects/saleshub/leads-board-thumb.webp',
      alt: 'Kanban board of sales leads grouped by stage with a pending approval badge on one card',
      w: 1440,
      h: 900,
      caption: 'Leads board. Drag cards between stages; changes that need approval show a pending badge.',
    },
    {
      src: '/projects/saleshub/client-360.webp',
      thumb: '/projects/saleshub/client-360-thumb.webp',
      alt: 'Client 360 page showing orders, payments, leads, pinned notes and an activity timeline',
      w: 1440,
      h: 900,
      caption: 'Client 360. Orders, payments, notes and activity for one client in one place.',
    },
    {
      src: '/projects/saleshub/approval-diff.webp',
      thumb: '/projects/saleshub/approval-diff-thumb.webp',
      alt: 'Approval request screen with a before and after comparison of changed fields and a timeline',
      w: 1440,
      h: 900,
      caption: 'Approval review. The reviewer sees what changed, who asked and the full timeline.',
    },
    {
      src: '/projects/saleshub/import-wizard.webp',
      thumb: '/projects/saleshub/import-wizard-thumb.webp',
      alt: 'CSV import wizard with column mapping and a preview table showing row-level errors',
      w: 1440,
      h: 900,
      caption: 'CSV import wizard. Map columns, preview errors, then run in the background.',
    },
    {
      src: '/projects/saleshub/command-palette.webp',
      thumb: '/projects/saleshub/command-palette-thumb.webp',
      alt: 'Command palette overlay searching clients, leads, orders and platform accounts',
      w: 1440,
      h: 900,
      caption: 'Command palette (Ctrl+K). Searches records across modules without exposing credentials.',
    },
    {
      src: '/projects/saleshub/dashboard-light.webp',
      thumb: '/projects/saleshub/dashboard-light-thumb.webp',
      alt: 'SalesHub dashboard in light theme with KPI cards, revenue over time and account health',
      w: 1440,
      h: 900,
      caption: 'Dashboard in light theme. Numbers are scoped to what the signed-in role may see.',
    },
    {
      src: '/projects/saleshub/mobile-today.webp',
      thumb: '/projects/saleshub/mobile-today-thumb.webp',
      alt: 'Phone screen of the Today page listing due payments and follow-ups for a sales executive',
      w: 780,
      h: 1688,
      caption: 'Today page on a phone. A sales executive sees due payments and follow-ups.',
    },
  ],
  architecture: {
    summary:
      'A React single-page app talks to a Laravel API over one origin with a session cookie and CSRF protection. The API checks policies, runs the approval engine, and stores data in MySQL with an activity log.',
    layers: [
      {
        name: 'Browser',
        nodes: [
          { id: 'spa', label: 'React SPA', detail: 'React Router, URL-driven tables' },
          { id: 'query', label: 'TanStack Query', detail: 'Caching and optimistic updates' },
          { id: 'types', label: 'Generated types', detail: 'From the OpenAPI spec' },
        ],
      },
      {
        name: 'Laravel API',
        nodes: [
          { id: 'auth', label: 'Sanctum auth', detail: 'Cookie session, CSRF, optional TOTP' },
          { id: 'policies', label: 'Policies', detail: 'Permission check plus row-level scoping' },
          {
            id: 'approvals',
            label: 'Approval engine',
            detail: 'Snapshots, diffs, one applier per module',
          },
        ],
      },
      {
        name: 'Background work',
        nodes: [
          { id: 'queue', label: 'Queue worker', detail: 'CSV imports and reminders' },
          { id: 'sched', label: 'Scheduler', detail: 'Payment reminders' },
        ],
      },
      {
        name: 'Data',
        nodes: [
          { id: 'mysql', label: 'MySQL 8', detail: 'Money stored as cents, foreign keys' },
          { id: 'audit', label: 'Activity log', detail: 'Audit trail with redacted diffs' },
        ],
      },
    ],
  },
  decisions: [
    {
      title: 'Cookie auth instead of tokens',
      problem: 'The app needed safe sign-in for a browser-only client.',
      choice:
        'Sanctum session cookies (httpOnly, SameSite) with CSRF checks, served from the same origin as the API.',
      tradeoff:
        'It suits one first-party SPA. A mobile app or third-party client would need tokens added.',
    },
    {
      title: 'Snapshot check on approval',
      problem: 'A request can sit in a queue while the record changes underneath it.',
      choice:
        'Store a snapshot with each request and compare it on approval. Reject the request if the record moved.',
      tradeoff:
        'Requesters sometimes have to resubmit, which is slower but never overwrites newer work.',
    },
    {
      title: 'One permission matrix, no admin bypass',
      problem: 'In v1, role checks were scattered across page files.',
      choice:
        'A single matrix of 71 permissions over 4 roles, enforced by policies with a visibleTo scope on every list.',
      tradeoff: 'Even admins need an explicit permission, so new features take a little more setup.',
    },
    {
      title: 'Generated API types',
      problem: 'A backend change could silently break the frontend.',
      choice: 'Generate an OpenAPI spec from the Laravel code and turn it into TypeScript types.',
      tradeoff: 'The build has one more step, but breaking changes fail the type check.',
    },
  ],
  versions: [
    {
      label: 'v1',
      title: 'In-house PHP app',
      summary:
        'Built for the sales team at Quixotic Creatives. It replaced spreadsheets and Google Forms and was used by about 50 staff.',
      stack: ['PHP', 'MySQL', 'Sessions'],
      points: [
        '4 user roles and 6 data modules',
        'Maker-checker approval before sensitive changes go live',
        'Prepared statements, bcrypt passwords, session-based role access',
        'Known gaps I later fixed: no CSRF protection, plain-text shared credentials, money as free text, no foreign keys',
      ],
    },
    {
      label: 'v2',
      title: 'Laravel and React rebuild',
      summary:
        'A ground-up rebuild with a documented API, typed contracts, automated tests and CI. The public demo runs on fictional data.',
      stack: ['Laravel 13', 'PHP 8.4', 'React 19', 'TypeScript', 'Tailwind 4', 'MySQL 8'],
      points: [
        '71 permissions with policies and row-level scoping',
        'Approval engine that rejects stale snapshots',
        'Encrypted credentials with audited reveal',
        '632 Pest, 215 Vitest and 73 Playwright tests, including 50 accessibility scans',
      ],
    },
  ],
  results: [
    'v1 replaced the shared spreadsheets and Google Forms for about 50 staff across 4 roles.',
    'Every sensitive change now has a named requester, a named reviewer and an audit entry.',
    'v2 closes the v1 gaps: CSRF protection, encrypted credentials, money in cents and foreign keys.',
    'v2 has 920 automated tests and CI checks on every change. I have not measured time saved, so I make no claim about it.',
  ],
  lessons: [
    'Approval flows are mostly about edge cases: stale data, double decisions and self-approval. Test those first.',
    'A single permission matrix is easier to review and test than checks spread across screens.',
    'Rebuilding my own v1 showed how much cheaper security and tests are when added from the start.',
  ],
  aiNote:
    'I built v2 with Generative AI coding assistants, which sped up delivery of boilerplate and tests. I wrote the requirements, designed the database and permissions, reviewed every change, and checked behavior through the test suites.',
}
