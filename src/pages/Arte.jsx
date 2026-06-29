import { Link } from 'react-router-dom'
import data from '../data.json'
import { getSlug } from '../utils'
import './Arte.css'

const { projetos_desenho, projetos_performance, bio } = data.portfolio_arte

export default function Arte() {
  return (
    <div className="arte">
      <div className="container">

        <header className="arte-header">
          <h1 className="arte-title">Art</h1>
          <p className="arte-bio">{bio}</p>
        </header>

        <section className="arte-section">
          <h2 className="arte-section-label">Drawing</h2>
          <div className="arte-grid">
            {projetos_desenho.map((work, i) => (
              <ArtCard key={i} work={work} index={i} />
            ))}
          </div>
        </section>

        <section className="arte-section">
          <h2 className="arte-section-label">Performance</h2>
          <div className="arte-grid">
            {projetos_performance.map((work, i) => (
              <ArtCard key={i} work={work} index={i} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

function ArtCard({ work, index }) {
  const slug = getSlug(work.url)
  return (
    <Link
      to={`/arte/${slug}`}
      className="art-card"
      style={{ '--card-i': index }}
    >
      {work.cover ? (
        <img className="art-card__image" src={work.cover} alt="" loading="lazy" />
      ) : (
        <div className="art-card__image" aria-hidden="true" />
      )}
      <div className="art-card__body">
        <p className="art-card__title">{work.titulo}</p>
        {work.titulo_en && (
          <p className="art-card__title-en">{work.titulo_en}</p>
        )}
        <div className="art-card__meta">
          {work.ano    && <span>{work.ano}</span>}
          {work.tecnica && <span>{work.tecnica}</span>}
          {work.tipo   && <span>{work.tipo}</span>}
        </div>
      </div>
    </Link>
  )
}
