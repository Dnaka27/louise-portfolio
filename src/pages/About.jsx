import data from '../data.json'
import './About.css'

const { sobre, bio_extendida } = data.portfolio_principal

export default function About() {
  return (
    <div className="about">
      <div className="container">

        <header className="about-header">
          <h1 className="about-title">About</h1>
          <p className="about-bio">{bio_extendida}</p>
          <p className="about-bio-sub">{sobre.interesses}</p>
        </header>

        <div className="about-grid">
          <section className="about-section">
            <h2 className="section-label">Experience</h2>
            <ol className="timeline">
              {sobre.experiencia_profissional.map((exp, i) => (
                <li key={i} className="timeline-item">
                  <span className="timeline-period">{exp.periodo}</span>
                  <div>
                    <p className="timeline-role">{exp.cargo}</p>
                    <p className="timeline-company">
                      {exp.empresa}{exp.local ? ` — ${exp.local}` : ''}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="about-sidebar">
            <section className="about-section">
              <h2 className="section-label">Education</h2>
              <ul className="about-list">
                {sobre.formacao.map((f, i) => (
                  <li key={i} className="about-list-item">
                    <p className="list-title">
                      {f.titulo}{f.status ? ` (${f.status})` : ''}
                    </p>
                    <p className="list-sub">{f.instituicao}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="about-section">
              <h2 className="section-label">Recognition</h2>
              <ul className="about-list">
                {sobre.premios.map((p, i) => (
                  <li key={i} className="about-list-item">
                    <p className="list-title">{p}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="about-section">
              <h2 className="section-label">Selected Clients</h2>
              <p className="clients-list">{sobre.clientes.join(' · ')}</p>
            </section>
          </div>
        </div>

      </div>
    </div>
  )
}
