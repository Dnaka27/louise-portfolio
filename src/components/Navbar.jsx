import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__logo">
          Louise Kanefuku
        </NavLink>
        <nav className="navbar__nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            Work
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            About
          </NavLink>
          <NavLink to="/arte" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
            Art
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
