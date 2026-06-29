import { Link } from 'react-router-dom'
import { getSlug, getClient, getCategoryColor, formatCategorias, isWideProject } from '../utils'
import './ProjectCard.css'

export default function ProjectCard({ project, index, animDelay = 0 }) {
  const slug   = getSlug(project.url)
  const client = getClient(project)
  const colors = getCategoryColor(project.categorias)
  const wide   = isWideProject(project)

  return (
    <Link
      to={`/projeto/${slug}`}
      className={`project-card${wide ? ' project-card--wide' : ''}`}
      style={{ '--delay': `${animDelay * 0.06}s` }}
    >
      {project.cover ? (
        <img
          className="project-card__image"
          src={project.cover}
          alt=""
          loading="lazy"
        />
      ) : (
        <div
          className="project-card__image"
          style={{ background: `linear-gradient(135deg, ${colors.start} 0%, ${colors.end} 100%)` }}
          aria-hidden="true"
        />
      )}
      <div className="project-card__body">
        <span className="project-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="project-card__meta">
          <span className="project-card__category">{formatCategorias(project.categorias)}</span>
          {client && <span className="project-card__client">{client}</span>}
        </div>
        <h3 className="project-card__title">{project.titulo}</h3>
      </div>
    </Link>
  )
}
