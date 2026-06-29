import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import data from '../data.json'
import { getSlug } from '../utils'
import './ArteDetail.css'

const allArtWorks = [
  ...data.portfolio_arte.projetos_desenho,
  ...data.portfolio_arte.projetos_performance,
]

const principalArtProjects = data.portfolio_principal.projetos.filter(
  p => p.categorias?.some(c => /art project|fine art|drawing|performance/i.test(c))
)

export default function ArteDetail() {
  const { slug }  = useParams()
  const navigate  = useNavigate()

  const artWork       = allArtWorks.find(w => getSlug(w.url) === slug)
  const principalMatch= principalArtProjects.find(p => getSlug(p.url) === slug)
  const work          = { ...(principalMatch || {}), ...(artWork || {}) }

  const currentIndex = allArtWorks.findIndex(w => getSlug(w.url) === slug)
  const prevWork     = currentIndex > 0 ? allArtWorks[currentIndex - 1] : null
  const nextWork     = currentIndex < allArtWorks.length - 1 ? allArtWorks[currentIndex + 1] : null

  useEffect(() => {
    if (!artWork) navigate('/arte', { replace: true })
    window.scrollTo(0, 0)
  }, [slug])

  if (!artWork) return null

  const inferType = () => {
    if (work.tipo)   return work.tipo
    if (work.tecnica) return 'Drawing'
    return 'Performance'
  }

  return (
    <div className="arte-detail">
      <div className="container">

        <div className="arte-detail-header">
          <Link to="/arte" className="back-link">← Art</Link>
          <div className="arte-type">{inferType()}</div>
          <h1 className="arte-detail-title">{work.titulo}</h1>
          {work.titulo_en && (
            <p className="arte-detail-title-en">{work.titulo_en}</p>
          )}
        </div>

        {work.cover ? (
          <img className="arte-detail-image" src={work.cover} alt={work.titulo} />
        ) : (
          <div className="arte-detail-image" aria-hidden="true" />
        )}

        <div className="arte-detail-body">
          <div className="arte-detail-content">
            {work.descricao && (
              <section className="arte-block">
                <h2 className="arte-block-label">About the Work</h2>
                <p className="arte-block-text">{work.descricao}</p>
              </section>
            )}
            {work.conceito && (
              <section className="arte-block">
                <h2 className="arte-block-label">Concept</h2>
                <p className="arte-block-text">{work.conceito}</p>
              </section>
            )}
            {work.contexto && (
              <section className="arte-block">
                <h2 className="arte-block-label">Context</h2>
                <p className="arte-block-text">{work.contexto}</p>
              </section>
            )}
            {work.texto_critico && (
              <section className="arte-block">
                <h2 className="arte-block-label">Critical Text</h2>
                <blockquote className="arte-quote">{work.texto_critico}</blockquote>
              </section>
            )}
            {work.obras && (
              <section className="arte-block">
                <h2 className="arte-block-label">Works in Series</h2>
                {typeof work.obras[0] === 'object' ? (
                  <ul className="obras-list">
                    {work.obras.map((obra, i) => (
                      <li key={i} className="obras-item">
                        <span className="obras-title">{obra.titulo}</span>
                        <span className="obras-meta">
                          {[obra.ano, obra.tecnica, obra.dimensoes].filter(Boolean).join(' · ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="obras-strings">
                    {work.obras.map((obra, i) => <li key={i}>{obra}</li>)}
                  </ul>
                )}
              </section>
            )}
          </div>

          <aside className="arte-detail-sidebar">
            {work.ano && (
              <div className="arte-sidebar-item">
                <p className="arte-sidebar-label">Year</p>
                <p className="arte-sidebar-value">{work.ano}</p>
              </div>
            )}
            {work.tecnica && (
              <div className="arte-sidebar-item">
                <p className="arte-sidebar-label">Medium</p>
                <p className="arte-sidebar-value">{work.tecnica}</p>
              </div>
            )}
            {work.tecnicas && (
              <div className="arte-sidebar-item">
                <p className="arte-sidebar-label">Materials</p>
                <p className="arte-sidebar-value">{work.tecnicas.join(', ')}</p>
              </div>
            )}
            {work.dimensoes && (
              <div className="arte-sidebar-item">
                <p className="arte-sidebar-label">Dimensions</p>
                {Array.isArray(work.dimensoes) ? (
                  <ul className="arte-sidebar-list">
                    {work.dimensoes.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                ) : (
                  <p className="arte-sidebar-value">{work.dimensoes}</p>
                )}
              </div>
            )}
            {work.exposicao && (
              <div className="arte-sidebar-item">
                <p className="arte-sidebar-label">Exhibition</p>
                <p className="arte-sidebar-value">{work.exposicao}</p>
              </div>
            )}
            {work.localizacoes && (
              <div className="arte-sidebar-item">
                <p className="arte-sidebar-label">Locations</p>
                <ul className="arte-sidebar-list">
                  {work.localizacoes.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
            )}
            {work.reconhecimentos && (
              <div className="arte-sidebar-item">
                <p className="arte-sidebar-label">Recognition</p>
                <ul className="arte-sidebar-list">
                  {work.reconhecimentos.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}
            {work.exposicoes_publicacoes && (
              <div className="arte-sidebar-item">
                <p className="arte-sidebar-label">Exhibitions & Publications</p>
                <ul className="arte-sidebar-list">
                  {work.exposicoes_publicacoes.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <nav className="arte-nav" aria-label="Art navigation">
          {prevWork ? (
            <Link to={`/arte/${getSlug(prevWork.url)}`} className="arte-nav-link">
              <span className="nav-dir">← Previous</span>
              <span className="nav-title">{prevWork.titulo}</span>
            </Link>
          ) : <div />}
          {nextWork && (
            <Link to={`/arte/${getSlug(nextWork.url)}`} className="arte-nav-link arte-nav-link--next">
              <span className="nav-dir">Next →</span>
              <span className="nav-title">{nextWork.titulo}</span>
            </Link>
          )}
        </nav>

      </div>
    </div>
  )
}
