import { chapters } from '../content'

export function ExperienceFallback() {
  return <ol className="story-reading">
    {chapters.map((chapter, index) => <li key={chapter.id}>
      <div className="reading-glyph" aria-hidden="true"><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
      <article><p className="story-eyebrow">{chapter.detail}</p><h2>{chapter.title}</h2><p className="story-description">{chapter.description}</p><ul className="story-examples">{chapter.examples.map(example => <li key={example}>{example}</li>)}</ul></article>
    </li>)}
  </ol>
}
