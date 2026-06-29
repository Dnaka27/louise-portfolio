import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import data from '../data.json'
import { getSlug, getClient, formatCategorias, getCategoryColor } from '../utils'
import './ProjectDetail.css'

const projects = data.portfolio_principal.projetos

const renderCollaborators = (collab) => {
  if (!collab) return null
  if (Array.isArray(collab)) return collab.join(', ')
  if (typeof collab === 'object') {
    return Object.entries(collab)
      .map(([key, vals]) => `${key.replace(/_/g, ' ')}: ${vals.join(', ')}`)
      .join(' / ')
  }
  return String(collab)
}

export default function ProjectDetail() {
  const { slug }   = useParams()
  const navigate   = useNavigate()
  const index      = projects.findIndex(p => getSlug(p.url) === slug)
  const project    = projects[index]
  const prevProject = index > 0 ? projects[index - 1] : null
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null

  useEffect(() => {
    if (!project) navigate('/', { replace: true })
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) return null

  const client = getClient(project)
  const colors = getCategoryColor(project.categorias)

  return (
    <div className="project-detail">
      <div className="container">

        <div className="detail-header">
          <Link to="/" className="back-link">← Work</Link>
          <div className="detail-meta">
            <span className="detail-category">{formatCategorias(project.categorias)}</span>
            {client && <span className="detail-client">{client}</span>}
          </div>
          <h1 className="detail-title">{project.titulo}</h1>
        </div>

        {project.cover ? (
          <img
            className="detail-image"
            src={project.cover}
            alt={project.titulo}
          />
        ) : (
          <div
            className="detail-image"
            style={{ background: `linear-gradient(135deg, ${colors.start} 0%, ${colors.end} 100%)` }}
            aria-hidden="true"
          />
        )}

        <div className="detail-body">
          <div className="detail-content">
            {project.descricao && (
              <section className="detail-section">
                <h2 className="detail-section-label">About the Project</h2>
                <p className="detail-text">{project.descricao}</p>
              </section>
            )}
            {project.abordagem_visual && (
              <section className="detail-section">
                <h2 className="detail-section-label">Visual Approach</h2>
                <p className="detail-text">{project.abordagem_visual}</p>
              </section>
            )}
            {project.processo && (
              <section className="detail-section">
                <h2 className="detail-section-label">Process</h2>
                {Array.isArray(project.processo) ? (
                  <ol className="detail-process">
                    {project.processo.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                ) : (
                  <p className="detail-text">{project.processo}</p>
                )}
              </section>
            )}
          </div>

          <aside className="detail-sidebar">
            {project.papel && (
              <div className="sidebar-item">
                <p className="sidebar-label">Role</p>
                <p className="sidebar-value">{project.papel}</p>
              </div>
            )}
            {client && (
              <div className="sidebar-item">
                <p className="sidebar-label">Client</p>
                <p className="sidebar-value">{client}</p>
              </div>
            )}
            {project.colaboradores && (
              <div className="sidebar-item">
                <p className="sidebar-label">Team</p>
                <p className="sidebar-value">{renderCollaborators(project.colaboradores)}</p>
              </div>
            )}
            {project.ferramentas && (
              <div className="sidebar-item">
                <p className="sidebar-label">Tools</p>
                <p className="sidebar-value">{project.ferramentas.join(', ')}</p>
              </div>
            )}
            {project.entregas && (
              <div className="sidebar-item">
                <p className="sidebar-label">Deliverables</p>
                {Array.isArray(project.entregas) ? (
                  <ul className="sidebar-list">
                    {project.entregas.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                ) : (
                  <p className="sidebar-value">{project.entregas}</p>
                )}
              </div>
            )}
            {project.reconhecimentos && (
              <div className="sidebar-item">
                <p className="sidebar-label">Recognition</p>
                <ul className="sidebar-list">
                  {project.reconhecimentos.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <nav className="detail-nav" aria-label="Project navigation">
          {prevProject ? (
            <Link to={`/projeto/${getSlug(prevProject.url)}`} className="detail-nav-link">
              <span className="nav-dir">← Previous</span>
              <span className="nav-title">{prevProject.titulo}</span>
            </Link>
          ) : <div />}
          {nextProject && (
            <Link to={`/projeto/${getSlug(nextProject.url)}`} className="detail-nav-link detail-nav-link--next">
              <span className="nav-dir">Next →</span>
              <span className="nav-title">{nextProject.titulo}</span>
            </Link>
          )}
        </nav>

      </div>
    </div>
  )
}
