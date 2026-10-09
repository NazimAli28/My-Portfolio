import type { ComponentProps } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { scrollToTarget } from '@/lib/lenis'
import { BASE } from '@/lib/asset'

type Props = Omit<ComponentProps<'a'>, 'href'> & { to: string; onNavigate?: () => void }

/** Link to a home-page section. Glides with Lenis on the home page, routes home first elsewhere. */
export function SectionLink({ to, onNavigate, onClick, ...rest }: Props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <a
      href={`${BASE}#${to}`}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        onNavigate?.()
        if (pathname === '/') {
          // A closing menu holds the scroll lock until its effect cleans up, so wait a beat
          if (onNavigate) window.setTimeout(() => scrollToTarget(`#${to}`), 80)
          else scrollToTarget(`#${to}`)
          history.replaceState(history.state, '', `${BASE}#${to}`)
        } else {
          navigate(`/#${to}`)
        }
      }}
      {...rest}
    />
  )
}
