import { chapters } from '../content'

export function StoryOverlay() {
  return <div className="story-overlays">
    {chapters.map((chapter, index) => <article className="story-copy" key={chapter.id} aria-hidden={index !== 0}>
      <p className="story-eyebrow">{chapter.detail}</p>
      <h2>{chapter.title}</h2>
      <p className="story-description">{chapter.description}</p>
      <ul className="story-examples">{chapter.examples.map(example => <li key={example}>{example}</li>)}</ul>
    </article>)}
  </div>
}
