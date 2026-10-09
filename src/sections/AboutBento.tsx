import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, m, useInView, useReducedMotion } from 'motion/react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ease, spring } from '@/lib/motion-presets'

/** Shared: true while the card is on screen and motion is allowed. Loops stop otherwise. */
function useLoopActive(ref: React.RefObject<HTMLElement | null>) {
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  return { active: inView && !reduce, reduce: !!reduce }
}

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M3 8.5l3.2 3L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Card({
  className = '',
  large,
  title,
  text,
  children,
  cardRef,
}: {
  className?: string
  large?: boolean
  title: string
  text: string
  children: ReactNode
  cardRef?: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={cardRef}
      className={`flex flex-col gap-5 border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-300 hover:border-cyan/40 hover:shadow-[var(--glow-cyan)] sm:p-6 ${
        large ? 'rounded-[28px]' : 'rounded-[20px]'
      } ${className}`}
    >
      <div aria-hidden="true" className="relative h-44 overflow-hidden rounded-[14px] bg-bg/60 p-4">
        {children}
      </div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-1.5 text-muted">{text}</p>
      </div>
    </div>
  )
}

/* a) SalesHub approvals */
const steps = [
  { label: 'Pending', cls: 'border-violet/40 bg-violet/15 text-violet-ink' },
  { label: 'Reviewing', cls: 'border-line bg-surface text-text' },
  { label: 'Approved', cls: 'border-cyan/40 bg-cyan/15 text-cyan' },
]
const logText = ['Change requested by Sana', 'Review started by Bilal', 'Approved by Bilal']

function ApprovalsUI() {
  const ref = useRef<HTMLDivElement>(null)
  const { active, reduce } = useLoopActive(ref)
  const [tick, setTick] = useState(2)
  const tickRef = useRef(2)
  const [log, setLog] = useState([
    { id: 0, t: logText[0] },
    { id: 1, t: logText[1] },
    { id: 2, t: logText[2] },
  ].reverse())

  useEffect(() => {
    if (!active) return
    let n = tickRef.current
    const id = setInterval(() => {
      n += 1
      tickRef.current = n
      setTick(n)
      setLog((l) => [{ id: n, t: logText[n % 3] }, ...l].slice(0, 3))
    }, 2500)
    return () => clearInterval(id)
  }, [active])

  const step = reduce ? 2 : tick % 3
  const s = steps[step]
  return (
    <div ref={ref} className="flex h-full flex-col justify-between gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-surface px-3 py-2.5 text-sm">
        <span className="text-text">Price change: Client #482, Rs 45,000 to Rs 52,000</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={step}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={spring.snappy}
            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-sm font-medium ${s.cls}`}
          >
            {step === 2 && <CheckIcon className="h-3.5 w-3.5" />}
            {s.label}
          </m.span>
        </AnimatePresence>
      </div>
      <ul className="flex flex-col gap-1.5 text-sm text-muted">
        <AnimatePresence initial={false}>
          {log.map((e) => (
            <m.li
              key={e.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: ease.outExpo }}
              className="flex items-center gap-2 rounded-lg bg-surface/70 px-3 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              {e.t}
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}

/* b) TeamHub ring + timer */
const CYCLE = 8
function TimerUI() {
  const ref = useRef<HTMLDivElement>(null)
  const { active, reduce } = useLoopActive(ref)
  const [t, setT] = useState(0)

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setT((v) => (v + 1) % (CYCLE + 2)), 1000)
    return () => clearInterval(id)
  }, [active])

  const done = reduce || t >= CYCLE
  const elapsed = 134 + Math.min(t, CYCLE)
  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')
  return (
    <div ref={ref} className="flex h-full items-center justify-center gap-4">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" strokeWidth="6" className="stroke-line" />
          <m.circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            className="stroke-cyan"
            initial={false}
            animate={{ pathLength: reduce ? 1 : Math.min(t, CYCLE) / CYCLE }}
            transition={{ duration: t === 0 ? 0.3 : 1, ease: 'linear' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-semibold tabular-nums text-text">
          {mm}:{ss}
        </span>
      </div>
      <div className="h-8 w-20">
        <AnimatePresence>
          {done && (
            <m.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={spring.snappy}
              className="inline-block rounded-full bg-violet px-3 py-1 text-sm font-semibold text-white"
            >
              +12 pts
            </m.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* c) OpsBot chat stack */
const script = [
  { who: 'user', text: '/order_status 1042' },
  { who: 'bot', text: 'Order 1042: In production, due Friday' },
  { who: 'user', text: '/order_status 1043' },
  { who: 'bot', text: 'Order 1043: Packed, ships Monday' },
]

function ChatUI() {
  const ref = useRef<HTMLDivElement>(null)
  const { active, reduce } = useLoopActive(ref)
  const [n, setN] = useState(2)

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setN((v) => v + 1), 2200)
    return () => clearInterval(id)
  }, [active])

  const count = reduce ? 2 : n
  const visible = [count - 3, count - 2, count - 1].filter((i) => i >= 0).map((i) => ({ i, ...script[i % script.length] }))
  return (
    <div ref={ref} className="flex h-full flex-col justify-end gap-2 overflow-hidden text-sm">
      <AnimatePresence initial={false}>
        {visible.map((msg, pos) => {
          const age = visible.length - 1 - pos
          return (
            <m.div
              key={msg.i}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1 - age * 0.35, y: 0, scale: 1 - age * 0.05 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.45, ease: ease.outExpo }}
              className={
                msg.who === 'user'
                  ? 'self-start rounded-xl bg-surface px-3 py-1.5 text-text'
                  : 'self-start rounded-xl border-l-2 border-cyan bg-surface px-3 py-1.5 text-text'
              }
            >
              {msg.text}
            </m.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

/* d) SQL console */
const lines = [
  'SELECT employee, SUM(points) AS score',
  'FROM designer_points',
  'GROUP BY employee',
  'ORDER BY score DESC LIMIT 3;',
]
const fullSql = lines.join('\n')
const rowsSql = [
  ['Areeba', '184'],
  ['Hamza', '171'],
  ['Maryam', '165'],
]
const HOLD = 120

function SqlUI() {
  const ref = useRef<HTMLDivElement>(null)
  const { active, reduce } = useLoopActive(ref)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setN((v) => (v + 1) % (fullSql.length + HOLD)), 32)
    return () => clearInterval(id)
  }, [active])

  const count = reduce ? fullSql.length + 20 : n
  const typed = fullSql.slice(0, Math.min(count, fullSql.length))
  const showResult = count >= fullSql.length + 8
  return (
    <div ref={ref} className="h-full overflow-hidden font-mono text-[12px] leading-5 text-text">
      <pre className="whitespace-pre-wrap">
        <span className="text-cyan">sql&gt; </span>
        {typed}
        {!showResult && <span className="ml-px inline-block h-3.5 w-1.5 translate-y-0.5 bg-cyan" />}
      </pre>
      <m.table
        initial={false}
        animate={{ opacity: showResult ? 1 : 0, y: showResult ? 0 : 6 }}
        transition={{ duration: 0.4, ease: ease.outExpo }}
        className="mt-2 w-full max-w-xs text-left text-muted"
      >
        <tbody>
          {rowsSql.map(([name, score]) => (
            <tr key={name}>
              <td className="pr-4">{name}</td>
              <td className="text-violet-ink">{score}</td>
            </tr>
          ))}
        </tbody>
      </m.table>
    </div>
  )
}

const secure = ['Prepared statements', 'bcrypt password hashing', 'Role-based access', 'Audited changes']

export function AboutBento() {
  return (
    <section id="about" aria-labelledby="about-title" className="container-page py-24 sm:py-32">
      <SectionHeading
        id="about-title"
        title="What I build, and how"
        intro="Internal systems in Python, PHP and SQL that real teams use every day: approvals, task tracking and chat bots."
      />
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
        <Card
          large
          className="md:col-span-4"
          title="Approvals that protect the data"
          text="SalesHub sends every sensitive change to a second person for review. About 50 staff use it."
        >
          <ApprovalsUI />
        </Card>
        <Card
          className="md:col-span-2"
          title="Live timers and scoring"
          text="TeamHub times each task and scores 12 designers the moment it is completed."
        >
          <TimerUI />
        </Card>
        <Card
          className="md:col-span-2"
          title="Work from chat"
          text="OpsBot runs 9 slash commands on Trello's REST API with SQLite behind it."
        >
          <ChatUI />
        </Card>
        <Card
          large
          className="md:col-span-4"
          title="Databases that hold up"
          text="Relational models in MySQL and SQLite, with queries built for reporting."
        >
          <SqlUI />
        </Card>

        <div className="rounded-[20px] border border-line bg-surface p-5 transition-[border-color,box-shadow] duration-300 hover:border-cyan/40 hover:shadow-[var(--glow-cyan)] sm:p-6 md:col-span-3">
          <h3 className="text-xl font-semibold">Secure by default</h3>
          <ul className="mt-4 grid gap-2.5">
            {secure.map((s, i) => (
              <m.li
                key={s}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: ease.outExpo }}
                className="flex items-center gap-3 text-text"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                  <CheckIcon />
                </span>
                {s}
              </m.li>
            ))}
          </ul>
        </div>

        <div className="conic-spin relative overflow-hidden rounded-[20px] p-px md:col-span-3">
          <div className="relative flex h-full flex-col rounded-[19px] bg-surface p-5 sm:p-6">
            <h3 className="text-xl font-semibold">AI-assisted, human-reviewed</h3>
            <p className="mt-4 text-muted">
              I use Generative AI coding assistants to ship faster, and I stay responsible for the requirements,
              database design, code review and testing.
            </p>
            <p className="mt-3 text-muted">
              I also completed the Stanford and DeepLearning.AI Machine Learning Specialization.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
