import type { Architecture } from '@/types/content'

const css = `
@keyframes arch-travel-x { from { transform: translate3d(0,0,0); opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } to { transform: translate3d(2rem,0,0); opacity: 0 } }
@keyframes arch-travel-y { from { transform: translate3d(0,0,0); opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } to { transform: translate3d(0,2rem,0); opacity: 0 } }
.arch-dot { animation: arch-travel-y 1.6s linear infinite; }
@media (min-width: 48rem) { .arch-dot { animation-name: arch-travel-x; } }
@media (prefers-reduced-motion: reduce) { .arch-dot { animation: none; opacity: 1; transform: none; } }
`

function Connector() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-8 w-px shrink-0 border-l border-dashed border-cyan/50 md:mx-0 md:h-px md:w-8 md:self-center md:border-t md:border-l-0"
    >
      <span className="arch-dot absolute top-0 left-0 size-2 -translate-x-1/2 rounded-full bg-cyan shadow-[var(--glow-cyan)] md:-translate-x-0 md:-translate-y-1/2" />
    </div>
  )
}

export function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const { summary, layers } = architecture
  return (
    <div>
      <style>{css}</style>
      <p className="measure text-lg">{summary}</p>
      <ol className="mt-10 flex flex-col md:flex-row md:items-stretch">
        {layers.map((layer, i) => (
          <li key={layer.name} className="flex min-w-0 flex-col md:flex-1 md:flex-row">
            <div className="min-w-0 flex-1">
              <h3 className="mb-3 text-lg font-semibold">{layer.name}</h3>
              <ul className="space-y-3">
                {layer.nodes.map((n) => (
                  <li key={n.id} className="rounded-input border border-line bg-surface p-3">
                    <p className="font-bold">{n.label}</p>
                    {n.detail && <p className="mt-1 text-sm text-muted">{n.detail}</p>}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 && (
              <div className="py-1 md:px-1 md:py-0 md:pt-10 md:flex md:items-start">
                <Connector />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
