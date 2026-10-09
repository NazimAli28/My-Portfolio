import type { Project } from '@/types/content'

const img = (name: string, alt: string, caption: string, w = 1440, h = 900) => ({
  src: `/projects/teamhub/${name}.webp`,
  thumb: `/projects/teamhub/${name}-thumb.webp`,
  alt,
  w,
  h,
  caption,
})

export const teamhub: Project = {
  slug: 'teamhub',
  title: 'TeamHub',
  tagline: 'A task tracker that scores a design team on speed, automatically.',
  outcome: 'Replaced manual order tracking and points counting for 12 designers.',
  year: '2024',
  role: 'Designer and developer (requirements, database design, review), built with AI coding assistants',
  type: 'Task tracking and performance scoring for a design team',
  stack: ['PHP', 'MySQL / MariaDB', 'mysqli', 'JavaScript', 'Chart.js', 'Apache (XAMPP)'],
  links: {
    github: 'https://github.com/NazimAli28/TeamHub-PHP-Task-Management-System',
  },
  cover: img(
    'admin-dashboard',
    'TeamHub admin dashboard with a form to assign a task to a designer',
    'Admin dashboard: assign a task with work type, amount and allotted time.',
  ),
  stats: [
    { value: 12, label: 'Designers tracked' },
    { value: 8, label: 'JSON API endpoints' },
    { value: 5, label: 'Database tables' },
    { value: 2, label: 'User roles' },
  ],
  problem: [
    "The design agency I work at tracked design orders by hand. Managers assigned work in chat and spreadsheets, and someone had to work out each designer's performance afterwards.",
    'That took time, and the numbers were easy to get wrong. Designers also had no clear view of how they were doing, and managers could not see who was working on what right now.',
  ],
  goals: [
    'Give admins one place to assign tasks and see the status of all work.',
    'Time every task and calculate points the moment it is completed.',
    'Show each designer their own daily and monthly performance.',
    'Show a live leaderboard on an office TV.',
  ],
  solution: [
    'TeamHub is a role-based web app. Admins assign tasks with a work type, amount and allotted time. Designers work against a live timer and mark the task complete. Points are calculated on the server at that moment.',
    'Admins get live records, employee analytics, bonus points with an audit log, and CSV export. Designers get a personal dashboard with charts. A full-screen leaderboard runs on the office TV.',
  ],
  features: [
    {
      title: 'Live timers with pause and resume',
      body: 'Each task counts down against its allotted time. Designers can pause and resume, and paused time is not counted against them. Admins see the same timers in the records table.',
    },
    {
      title: 'Automatic points scoring',
      body: 'Allotted points are the allotted minutes divided by 10. Finishing early adds 0.1 point per minute saved. Finishing late removes 0.1 point per minute over. The score never goes below zero.',
    },
    {
      title: 'Bonus points with an audit log',
      body: 'Admins can award extra points with a written reason. Every award is stored in its own log table, so a total can be traced back to what was given and why.',
    },
    {
      title: 'Employee analytics and CSV export',
      body: 'Admins see completion rate, allotted versus gained points and last activity for each designer, with date-range filters. Task records export to CSV for reporting outside the app.',
    },
    {
      title: 'Office TV leaderboard',
      body: 'A full-screen page ranks designers by points for today and for the month. When an admin awards bonus points, the display shows a pop-up and plays a sound.',
    },
    {
      title: 'Admin and employee roles',
      body: "Every page checks the session and role. Employees only see their own tasks and charts. Passwords are hashed with PHP's password_hash. Admins can add, edit and remove employees.",
    },
  ],
  gallery: [
    img(
      'records',
      'Task records table with live countdown timers and pause and resume buttons',
      'Task records: live timers, pause and resume, filters by designer, date and work.',
    ),
    img(
      'employees-overview',
      'Employee overview table showing completion rate and points for each designer',
      'Employee overview: completion rate, allotted versus gained points, last activity.',
    ),
    img(
      'employee-detail',
      'Per-employee analytics page with charts and a date range filter',
      'Employee detail: performance charts with date-range filters.',
    ),
    img(
      'manage-employees',
      'Manage employees page with a list of designers and edit controls',
      'Manage employees: add, edit and remove accounts, including profile pictures.',
    ),
    img(
      'employee-dashboard',
      'Employee dashboard with today and monthly stats and weekly charts',
      'Employee dashboard: today and this month, with weekly and monthly charts.',
    ),
    img(
      'employee-tasks',
      'Employee task list grouped by today, last 7 days and older, with timers',
      'My tasks: grouped by date, with live timers and a complete button.',
    ),
    img(
      'progress-display',
      'Full-screen leaderboard ranking designers by points for an office TV',
      'Progress display: daily and monthly leaderboard built for a wall-mounted TV.',
      1600,
      900,
    ),
  ],
  architecture: {
    summary:
      'A plain PHP app with no framework. Browser pages call small JSON endpoints, which read and write five MySQL tables. Timers run in the browser and the server calculates the final score.',
    layers: [
      {
        name: 'Browser',
        nodes: [
          { id: 'admin', label: 'Admin pages', detail: 'Assign tasks, live records, analytics, employee management.' },
          { id: 'employee', label: 'Employee pages', detail: 'Personal dashboard, task list, live timers.' },
          { id: 'tv', label: 'TV display', detail: 'Full-screen leaderboard with bonus pop-up and sound.' },
        ],
      },
      {
        name: 'PHP pages',
        nodes: [
          { id: 'guard', label: 'Session guard', detail: 'Checks login and role on every page.' },
          { id: 'pages', label: 'Server-rendered pages', detail: 'Procedural PHP with vanilla JS and Chart.js.' },
        ],
      },
      {
        name: 'JSON API',
        nodes: [
          { id: 'tasks', label: 'Task endpoints', detail: 'Add, complete, pause and resume, task status.' },
          { id: 'bonus', label: 'Bonus and polling', detail: 'Bonus points, last-update check, completed tasks, session check.' },
          { id: 'export', label: 'CSV export', detail: 'Downloads task records.' },
        ],
      },
      {
        name: 'MySQL',
        nodes: [
          { id: 'users', label: 'users', detail: 'Accounts with admin or employee role.' },
          { id: 'points', label: 'designer_points', detail: 'One row per task, with times and points.' },
          { id: 'logs', label: 'pause_logs, bonus_logs', detail: 'Pause history and bonus audit trail.' },
          { id: 'plan', label: 'auto_points_plan', detail: 'Reference data for work types and points.' },
        ],
      },
    ],
  },
  decisions: [
    {
      title: 'Plain PHP and mysqli instead of a framework',
      problem: "The tool had to run on the agency's existing XAMPP setup, and I wanted to ship quickly.",
      choice: 'Procedural PHP with mysqli, vanilla JavaScript and Chart.js. No build step and no dependencies to install.',
      tradeoff: 'Deployment is simple, but there is no shared routing, templating or validation layer, so some code is repeated across pages.',
    },
    {
      title: 'Calculate points on the server',
      problem: 'If the browser calculated points, a designer could change the number.',
      choice: 'The browser only shows the timer. When a task is completed, the server reads the stored times and works out the points.',
      tradeoff: 'Scoring logic lives in one place, but the timer on screen and the final score can differ slightly on a slow connection.',
    },
    {
      title: 'AJAX polling instead of WebSockets',
      problem: 'Admins and the TV needed to see changes without reloading.',
      choice: 'Pages poll a light endpoint for the last update, and use localStorage events to sync open tabs.',
      tradeoff: 'Updates are near real time rather than instant, but it works on basic Apache hosting with no extra services.',
    },
    {
      title: 'Separate log tables for pauses and bonuses',
      problem: 'Points need to be explainable when a designer asks how a score was reached.',
      choice: 'Pauses and bonus awards each get their own table with a timestamp, rather than only updating a total.',
      tradeoff: 'More tables and joins, but every adjustment can be traced.',
    },
  ],
  results: [
    'Used in place of manual tracking for 12 designers at the agency, with points calculated the moment a task is completed.',
    'Admins can see current work, per-employee performance and CSV exports without building reports by hand.',
    'The office TV leaderboard gives the team a shared, live view of daily and monthly progress.',
    'I have not measured time saved. Removing the manual points calculation is the clear gain, but I have no figure for it.',
  ],
  lessons: [
    'Add CSRF protection to every form and API call. The app checks sessions and roles, but it does not use CSRF tokens.',
    'Use prepared statements everywhere. Most task queries use them, but some older pages still build SQL directly.',
    'Add automated tests for the scoring formula. The repo has only manual test pages, and scoring is the part that matters most.',
  ],
  aiNote:
    'I built TeamHub with AI coding assistants to speed up writing, refactoring and documentation. I owned the requirements, the database design, the scoring rules and the final review of the code. The public repository uses fictional demo data.',
  accent: 'cyan',
}
