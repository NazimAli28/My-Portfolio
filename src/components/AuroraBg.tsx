/** Fixed aurora gradient + noise layer behind all content. Styles live in index.css (.aurora, .noise). */
export function AuroraBg() {
  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
    </>
  )
}
