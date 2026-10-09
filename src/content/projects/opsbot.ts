import type { Project } from '@/types/content'

export const opsbot: Project = {
  slug: 'opsbot',
  title: 'OpsBot',
  tagline: 'A Discord bot that puts team reminders and Trello order tracking into one chat.',
  outcome: 'Cut order look-ups to a single slash command for the operations team.',
  year: '2024',
  role: 'Designer and developer (in-house tool at Quixotic Creatives)',
  type: 'Discord bot for reminders and Trello order tracking',
  stack: ['Python', 'discord.py', 'Trello REST API', 'SQLite', 'python-dotenv'],
  links: {
    github: 'https://github.com/NazimAli28/OpsBot-Discord-Reminders-Trello-Orders',
  },
  cover: {
    src: '/projects/opsbot/reminders.webp',
    thumb: '/projects/opsbot/reminders-thumb.webp',
    alt: 'Discord chat showing OpsBot creating a reminder and listing active reminders',
    w: 1000,
    h: 510,
  },
  stats: [
    { value: 9, label: 'slash commands' },
    { value: 10, suffix: 's', label: 'reminder check loop' },
    { value: 3, label: 'Python modules' },
    { value: 1074, suffix: '', label: 'lines of Python' },
  ],
  problem: [
    'The operations team tracked every customer order on a Trello board and coordinated in Discord. Checking an order meant leaving Discord, searching the board, and copying details back into the chat.',
    'Reminders had the same gap. People set them in separate tools, so a due follow-up rarely landed in the channel where the team was already talking.',
  ],
  goals: [
    'Look up an order from Discord with one command.',
    'Move, comment on and set due dates for orders without opening Trello.',
    'Ping the right person in the right channel when a reminder is due.',
    'Never lose a reminder because the bot was offline.',
  ],
  solution: [
    'OpsBot is a Python bot built on discord.py. Each order action is a slash command that calls the Trello REST API. It finds a card by the order number in its name and returns the result in the channel.',
    'Reminders live in SQLite. A background loop checks for due items every 10 seconds. On startup, the bot sends any reminder that came due while it was offline and marks it as missed.',
  ],
  features: [
    {
      title: 'Reminders with flexible dates',
      body: '/reminder takes a date such as 27 Sep or Sep 27 2025 (the year is optional), a HH:MM time and a message. The bot mentions you in the channel where you created it.',
    },
    {
      title: 'Manage reminders',
      body: '/reminders_list shows active, past or both. /reminder_edit changes the date, time or message by ID. /reminder_remove deletes one by ID.',
    },
    {
      title: 'Order status',
      body: '/order_status finds a card by order number across every list on the board and shows its details.',
    },
    {
      title: 'Move orders between lists',
      body: '/order_move shows a private dropdown of the board\'s other lists. The result posts to the channel so the team sees the change.',
    },
    {
      title: 'Comments and attachments',
      body: '/order_comments shows the 3 latest comments and re-uploads attachments added around the same time. /add_order_comment posts a comment and an optional file of up to 10 MB.',
    },
    {
      title: 'Due dates',
      body: '/set_order_due_date sets or changes a card\'s due date from a date and a time, so deadlines stay on the board.',
    },
  ],
  gallery: [
    {
      src: '/projects/opsbot/reminders.webp',
      thumb: '/projects/opsbot/reminders-thumb.webp',
      alt: 'Discord chat showing the reminder command and a list of active reminders',
      w: 1000,
      h: 510,
      caption: 'Setting and listing reminders. Screenshots use fictional demo data.',
    },
    {
      src: '/projects/opsbot/reminder-ping.webp',
      thumb: '/projects/opsbot/reminder-ping-thumb.webp',
      alt: 'Discord message where OpsBot mentions a user with a due reminder',
      w: 1000,
      h: 215,
      caption: 'A due reminder pings the user in the channel where it was created.',
    },
    {
      src: '/projects/opsbot/order-status.webp',
      thumb: '/projects/opsbot/order-status-thumb.webp',
      alt: 'Discord embed showing the status and details of a Trello order card',
      w: 1000,
      h: 155,
      caption: 'Looking up an order by number.',
    },
    {
      src: '/projects/opsbot/order-move.webp',
      thumb: '/projects/opsbot/order-move-thumb.webp',
      alt: 'Discord dropdown for moving a Trello order to another list',
      w: 1000,
      h: 395,
      caption: 'Moving an order to another Trello list from a dropdown.',
    },
    {
      src: '/projects/opsbot/order-comments.webp',
      thumb: '/projects/opsbot/order-comments-thumb.webp',
      alt: 'Discord message listing recent Trello comments, attachments and a due date for an order',
      w: 1000,
      h: 480,
      caption: 'Comments, attachments and due dates for an order.',
    },
  ],
  architecture: {
    summary:
      'A single discord.py process handles slash commands and runs the reminder loop. It reads and writes SQLite for reminders and calls the Trello REST API for orders.',
    layers: [
      {
        name: 'Discord',
        nodes: [
          { id: 'users', label: 'Team members', detail: 'Run slash commands and receive reminder pings.' },
        ],
      },
      {
        name: 'Bot',
        nodes: [
          { id: 'main', label: 'main.py', detail: 'discord.py client, command tree and the 10 second reminder loop.' },
          { id: 'startup', label: 'Startup catch-up', detail: 'Sends reminders missed while offline, marked as missed.' },
        ],
      },
      {
        name: 'Modules',
        nodes: [
          { id: 'reminders', label: 'reminder_commands.py', detail: 'Date parsing and reminder storage.' },
          { id: 'trello', label: 'trello_commands.py', detail: 'Search, move, comment, attach and due-date helpers.' },
        ],
      },
      {
        name: 'Data and services',
        nodes: [
          { id: 'sqlite', label: 'SQLite', detail: 'Active and past reminders, stored in UTC.' },
          { id: 'trello-api', label: 'Trello REST API', detail: 'Board lists, cards, comments, attachments and due dates.' },
        ],
      },
    ],
  },
  decisions: [
    {
      title: 'Persist reminders in SQLite',
      problem: 'In-memory timers vanish when the bot restarts, so reminders could be lost.',
      choice: 'Store reminders in SQLite and send any overdue ones on startup, labelled as missed.',
      tradeoff: 'A missed reminder arrives late, but nothing is dropped. It adds a small database to maintain.',
    },
    {
      title: 'Poll every 10 seconds',
      problem: 'The bot needs to fire reminders close to their due time.',
      choice: 'Use a discord.py tasks.loop that checks for due reminders every 10 seconds.',
      tradeoff: 'A reminder can be up to 10 seconds late, but the loop is simple and easy to debug.',
    },
    {
      title: 'Store UTC, show local time',
      problem: 'The team enters times in its local timezone, while servers and databases need one stable reference.',
      choice: 'Parse input as Asia/Karachi time and store everything in UTC.',
      tradeoff: 'The timezone is fixed in code, so other regions would need a setting.',
    },
    {
      title: 'Match orders by number in the card name',
      problem: 'Trello cards have their own IDs, but the team refers to orders by number.',
      choice: 'Find the card whose name contains #<number>, across every list on the board.',
      tradeoff: 'It relies on a naming convention. Cards without the number cannot be found.',
    },
  ],
  results: [
    'The operations team looks up, moves and comments on orders from Discord without opening Trello.',
    'Reminders survive restarts, and missed ones are sent on startup.',
    'The bot runs as a single small Python process with six dependencies and secrets kept in a git-ignored credentials.env file.',
    'It is an internal tool with a small user base, so I have no usage metrics to share.',
  ],
  lessons: [
    'The project has no automated tests. I would add tests for date parsing and the Trello helpers first, since they hold the most logic.',
    'The timezone and the card-naming rule are hard-coded. Moving them to configuration would make the bot easier to reuse.',
    'Splitting reminders and Trello into their own modules kept main.py focused on Discord, which made changes easier to reason about.',
  ],
  aiNote:
    'I built OpsBot with generative AI coding assistants to speed up writing, refactoring and documenting. I owned the requirements, the design, the Trello workflow and the final review of every change.',
  accent: 'cyan',
}
