import { useState } from 'react'
import data from '../data.json'
import ProjectCard from '../components/ProjectCard'
import './Home.css'

const FILTERS = ['All', 'Brand', 'Editorial', 'Illustration', 'Data Viz', 'Digital', 'Art']

const matchesFilter = (project, filter) => {
  if (filter === 'All') return true
  const cats = project.categorias || []
  if (filter === 'Brand')        return cats.some(c => /brand|visual identity|logo|rebranding/i.test(c))
  if (filter === 'Editorial')    return cats.some(c => /editorial|report/i.test(c))
  if (filter === 'Illustration') return cats.some(c => /illustration/i.test(c))
  if (filter === 'Data Viz')     return cats.some(c => /data visualization|infographic|facilitation/i.test(c))
  if (filter === 'Digital')      return cats.some(c => /digital marketing|campaign|key art|promotional/i.test(c))
  if (filter === 'Art')          return cats.some(c => /art project|fine art|drawing|performance/i.test(c))
  return false
}

export default function Home() {
  const [activeFilter, setActiveFilter]       = useState('All')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const allProjects = data.portfolio_principal.projetos

  const handleFilter = (f) => {
    if (f === activeFilter) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveFilter(f)
      setIsTransitioning(false)
    }, 180)
  }

  const filtered = allProjects.filter(p => matchesFilter(p, activeFilter))

  return (
    <div className="home">
      <div className="container">

        <section className="hero">
          <h1 className="hero__name">
            <span>Louise</span>
            <span>Kanefuku</span>
          </h1>
          <p className="hero__tagline">
            Multidisciplinary designer &amp; visual storyteller —<br />
            connecting brands and people through meaningful design.
          </p>
          <p className="hero__meta">Porto Alegre · Porto</p>
        </section>

        <section className="work-section">
          <div className="filter-bar" role="navigation" aria-label="Filter projects by category">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-btn${activeFilter === f ? ' filter-btn--active' : ''}`}
                onClick={() => handleFilter(f)}
                aria-pressed={activeFilter === f}
              >
                {f}
              </button>
            ))}
          </div>

          <div className={`projects-grid${isTransitioning ? ' projects-grid--fading' : ''}`}>
            {filtered.map((project, i) => (
              <ProjectCard
                key={`${activeFilter}-${project.url}`}
                project={project}
                index={allProjects.indexOf(project)}
                animDelay={i}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="no-results">No projects in this category.</p>
          )}
        </section>

      </div>
    </div>
  )
}
