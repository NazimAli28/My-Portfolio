import { useRef, type ComponentProps, type ReactNode } from 'react'
import { Link } from 'react-router'
import clsx from 'clsx'
import { m, useMotionValue, useSpring } from 'motion/react'
import { usePointerFine } from '@/hooks/useMedia'
import { spring } from '@/lib/motion-presets'

type Variant = 'primary' | 'ghost'

const styles: Record<Variant, string> = {
  primary:
    'bg-violet text-white hover:shadow-[var(--glow-violet)] focus-visible:shadow-[var(--glow-violet)]',
  ghost:
    'border border-line text-text hover:border-cyan hover:text-cyan bg-surface/40 backdrop-blur-sm',
}

type Common = { variant?: Variant; children: ReactNode; className?: string; magnetic?: boolean }
type AsLink = Common & { to: string } & Omit<ComponentProps<typeof Link>, 'to' | 'className' | 'children'>
type AsAnchor = Common & { href: string } & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'>
type AsButton = Common & { onClick: () => void } & Omit<ComponentProps<'button'>, 'className' | 'children' | 'onClick'>

/**
 * Pill button. Router link (`to`), anchor (`href`) or button (`onClick`).
 * Magnetic pull on fine pointers.
 */
export function Button(props: AsLink | AsAnchor | AsButton) {
  const { variant = 'primary', children, className, magnetic = true } = props
  const fine = usePointerFine()
  const ref = useRef<HTMLSpanElement>(null)
  const x = useSpring(useMotionValue(0), spring.magnetic)
  const y = useSpring(useMotionValue(0), spring.magnetic)

  const onMove = (e: React.PointerEvent) => {
    if (!fine || !magnetic || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const cls = clsx(
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold whitespace-nowrap transition-[color,border-color,box-shadow] duration-300',
    styles[variant],
    className,
  )

  let inner: ReactNode
  if ('to' in props) {
    const { to, variant: _v, children: _c, className: _cn, magnetic: _m, ...rest } = props
    inner = (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  } else if ('href' in props) {
    const { href, variant: _v, children: _c, className: _cn, magnetic: _m, ...rest } = props
    inner = (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  } else {
    const { onClick, variant: _v, children: _c, className: _cn, magnetic: _m, ...rest } = props
    inner = (
      <button type="button" onClick={onClick} className={cls} {...rest}>
        {children}
      </button>
    )
  }

  return (
    <m.span
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      data-cursor="hover"
    >
      {inner}
    </m.span>
  )
}
