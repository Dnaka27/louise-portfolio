import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import About from './pages/About'
import ProjectDetail from './pages/ProjectDetail'
import Arte from './pages/Arte'
import ArteDetail from './pages/ArteDetail'

export default function App() {
  const location = useLocation()

  return (
    <>
      <Cursor />
      <Navbar />
      <main key={location.pathname} className="page-enter">
        <Routes location={location}>
          <Route path="/"              element={<Home />} />
          <Route path="/about"         element={<About />} />
          <Route path="/projeto/:slug" element={<ProjectDetail />} />
          <Route path="/arte"          element={<Arte />} />
          <Route path="/arte/:slug"    element={<ArteDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
