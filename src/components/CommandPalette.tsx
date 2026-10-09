import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Command } from 'cmdk'
import { Modal } from '@/components/ui/Modal'
import { sections } from '@/content/nav'
import { projects } from '@/content/projects'
import { profile } from '@/content/profile'
import { useCopy } from '@/hooks/useCopy'
import { PALETTE_OPEN } from '@/lib/events'
import { scrollToTarget } from '@/lib/lenis'
import { toggleTheme } from '@/lib/theme'

/** Ctrl/Cmd + K menu: jump to sections and case studies, copy email, resume, theme. */
export function CommandPalette({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { copied, copy } = useCopy()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(PALETTE_OPEN, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(PALETTE_OPEN, onOpen)
    }
  }, [])

  const close = useCallback(() => setOpen(false), [])

  const run = (fn: () => void) => () => {
    setOpen(false)
    // Let the modal release scroll lock before moving
    window.setTimeout(fn, 60)
  }

  const goSection = (id: string) =>
    run(() => (pathname === '/' ? scrollToTarget(`#${id}`) : navigate(`/#${id}`)))

  return (
    <Modal open={open} onClose={close} label="Command menu" className="max-w-xl">
      <Command label="Command menu" loop className="flex max-h-[70dvh] flex-col">
        <div className="flex items-center gap-3 border-b border-line px-5 py-4 pr-16">
          <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <Command.Input
            autoFocus
            placeholder="Search pages and actions"
            className="w-full bg-transparent text-lg text-text outline-none placeholder:text-muted"
          />
        </div>
        <Command.List className="overflow-y-auto p-2" data-lenis-prevent>
          <Command.Empty className="px-4 py-8 text-center text-muted">No matches. Try a project name.</Command.Empty>

          <Group heading="Go to">
            {sections.map((s) => (
              <Item key={s.id} onSelect={goSection(s.id)} hint="Section">
                {s.label}
              </Item>
            ))}
          </Group>

          <Group heading="Case studies">
            {projects.map((p) => (
              <Item key={p.slug} value={`${p.title} ${p.tagline}`} onSelect={run(() => navigate(`/projects/${p.slug}`))} hint={p.type}>
                {p.title}
              </Item>
            ))}
          </Group>

          <Group heading="Actions">
            <Item onSelect={() => copy(profile.email)} hint={copied ? 'Copied' : profile.email}>
              {copied ? 'Email copied' : 'Copy email'}
            </Item>
            <Item onSelect={run(() => window.open(profile.resume, '_blank', 'noopener'))} hint="PDF">
              Download resume
            </Item>
            <Item onSelect={run(toggleTheme)} hint="Light or dark">
              Switch theme
            </Item>
            <Item onSelect={run(() => window.open(profile.socials.github, '_blank', 'noopener'))} hint="NazimAli28">
              Open GitHub
            </Item>
            <Item onSelect={run(() => window.open(profile.socials.linkedin, '_blank', 'noopener'))} hint="mnazimali">
              Open LinkedIn
            </Item>
          </Group>
        </Command.List>
        <p className="border-t border-line px-5 py-3 text-xs text-muted">
          Use arrow keys to move, Enter to open, Esc to close.
        </p>
      </Command>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email copied to clipboard' : ''}
      </span>
    </Modal>
  )
}

function Group({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <Command.Group
      heading={heading}
      className="mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted"
    >
      {children}
    </Command.Group>
  )
}

function Item({
  children,
  hint,
  onSelect,
  value,
}: {
  children: ReactNode
  hint?: string
  onSelect: () => void
  value?: string
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-input px-3 py-2.5 text-text data-[selected=true]:bg-cyan/10 data-[selected=true]:text-cyan"
    >
      <span className="font-medium">{children}</span>
      {hint && <span className="truncate text-sm text-muted">{hint}</span>}
    </Command.Item>
  )
}
