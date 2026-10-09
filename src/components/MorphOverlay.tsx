import { useEffect, useRef, useSyncExternalStore } from 'react'
import { animate } from 'motion/react'
import { clearMorph, getMorph, subscribeMorph } from '@/lib/morph'
import { ease } from '@/lib/motion-presets'

/**
 * Flies the clicked project cover from its card to the case-study hero cover.
 * Transform + opacity only (FLIP): the clone sits at the target rect and starts inverted.
 */
export function MorphOverlay() {
  const morph = useSyncExternalStore(subscribeMorph, getMorph, () => null)
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!morph || !el) return
    let cancelled = false
    let target: HTMLElement | null = null
    const from = morph.rect

    // Park the clone exactly over the card while the old page fades out
    Object.assign(el.style, {
      left: `${from.left}px`,
      top: `${from.top}px`,
      width: `${from.width}px`,
      height: `${from.height}px`,
      transform: 'none',
      opacity: '1',
      borderRadius: `${morph.radius}px`,
    })

    const started = performance.now()
    const find = () => {
      if (cancelled) return
      target = document.querySelector<HTMLElement>(`[data-morph-target="${morph.slug}"]`)
      if (!target) {
        if (performance.now() - started < 2500) requestAnimationFrame(find)
        else clearMorph()
        return
      }
      // Wait one more frame so the new page's scroll reset has applied
      requestAnimationFrame(() => {
        if (cancelled || !target) return
        const to = target.getBoundingClientRect()
        target.style.opacity = '0'
        Object.assign(el.style, {
          left: `${to.left}px`,
          top: `${to.top}px`,
          width: `${to.width}px`,
          height: `${to.height}px`,
        })
        const sx = from.width / to.width
        const sy = from.height / to.height
        const dx = from.left - to.left
        const dy = from.top - to.top
        animate(
          el,
          {
            transform: [`translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`, 'translate(0px, 0px) scale(1, 1)'],
            borderRadius: [`${morph.radius}px`, getComputedStyle(target).borderRadius || '28px'],
          },
          { duration: 0.85, ease: ease.outExpo },
        ).then(() => {
          if (target) target.style.opacity = ''
          return animate(el, { opacity: 0 }, { duration: 0.2 })
        }).then(() => !cancelled && clearMorph())
      })
    }
    requestAnimationFrame(find)

    return () => {
      cancelled = true
      if (target) target.style.opacity = ''
    }
  }, [morph])

  if (!morph) return null
  return (
    <img
      ref={ref}
      src={morph.src}
      alt=""
      aria-hidden="true"
      className="pointer-events-none fixed z-[75] origin-top-left object-cover shadow-2xl"
    />
  )
}
