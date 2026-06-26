import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const ref = useRef(null)

  useEffect(() => {
    const dot = ref.current
    if (!dot) return

    const onMove = (e) => {
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
      dot.classList.toggle('cursor--hover', !!e.target.closest('a, button'))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return <div ref={ref} className="cursor" aria-hidden="true" />
}
