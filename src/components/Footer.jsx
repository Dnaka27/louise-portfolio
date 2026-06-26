import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__name">Louise Kanefuku</p>
        <div className="footer__links">
          <a href="mailto:louise.kanefuku@gmail.com" className="footer__link">
            louise.kanefuku@gmail.com
          </a>
          <a
            href="https://art.louisekanefuku.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            art.louisekanefuku.com ↗
          </a>
        </div>
        <p className="footer__copy">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}
