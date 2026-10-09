import type { Course, Education, Experience } from '@/types/content'

export const experience: Experience[] = [
  {
    company: 'Quixotic Creatives',
    role: 'Web developer',
    start: '2023-01',
    end: null,
    location: 'Karachi, Pakistan',
    summary:
      'I own requirements, database design, development and code review for the internal tools the company runs on.',
    highlights: [
      'Built SalesHub, replacing shared spreadsheets and Google Forms for 50 staff across 4 roles, with a maker-checker approval on every sensitive change.',
      'Built TeamHub, which scores 12 designers the moment a task is completed, with live timers and Chart.js dashboards.',
      'Built OpsBot, a Python Discord bot with 9 slash commands that turns Trello order look-ups into one chat command.',
      'Protected employee and client data with prepared statements, bcrypt password hashing and session-based role access.',
      'Delivered and maintained 20 WordPress and WooCommerce sites.',
    ],
  },
]

export const education: Education[] = [
  {
    school: 'Ilma University',
    degree: "Bachelor's in Software Engineering",
    start: '2021-08',
    end: '2025-06',
    location: 'Karachi, Pakistan',
  },
]

export const courses: Course[] = [
  {
    title: 'Machine Learning Specialization',
    provider: 'Stanford Online and DeepLearning.AI on Coursera',
    date: 'Nov 2024 to Jan 2025',
    items: [
      'Supervised learning: regression and classification',
      'Advanced learning algorithms: neural networks and decision trees',
      'Unsupervised learning, recommenders and reinforcement learning',
    ],
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
  },
  {
    title: 'Kaggle Learn',
    provider: 'Kaggle',
    date: 'Nov 2024',
    items: ['Intro to Machine Learning', 'Intro to Deep Learning', 'Computer Vision'],
    url: 'https://www.kaggle.com/learn',
  },
]
