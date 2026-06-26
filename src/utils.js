export const getSlug = (url) => url ? url.split('/').pop() : ''

export const getClient = (project) => {
  if (project.clientes) {
    return Array.isArray(project.clientes)
      ? project.clientes.join(' + ')
      : project.clientes
  }
  return project.cliente ?? null
}

export const isWideProject = (project) => {
  const WIDE = ['Editorial', 'Report', 'Data Visualization', 'Digital Marketing', 'Campaign']
  return project.categorias?.some(c => WIDE.some(w => c.includes(w)))
}

const PALETTE = {
  editorial:    { start: '#C5CDD6', end: '#D2CEC8' },
  data:         { start: '#C0C9D2', end: '#CEC9C3' },
  brand:        { start: '#C8D1C5', end: '#D2CCC5' },
  illustration: { start: '#CEC9C0', end: '#D6CFC5' },
  digital:      { start: '#C3CBD6', end: '#D0CCC7' },
  art:          { start: '#C9C5D2', end: '#D2C8C8' },
  default:      { start: '#CCCAC5', end: '#D2CFCB' },
}

export const getCategoryColor = (categorias = []) => {
  const first = categorias[0] || ''
  if (/editorial|report/i.test(first))                          return PALETTE.editorial
  if (/data visualization|infographic|facilitation/i.test(first)) return PALETTE.data
  if (/brand|visual identity|logo|rebranding/i.test(first))    return PALETTE.brand
  if (/illustration|promotional/i.test(first))                 return PALETTE.illustration
  if (/digital|campaign|key art/i.test(first))                 return PALETTE.digital
  if (/art project|drawing|fine art|performance/i.test(first)) return PALETTE.art
  return PALETTE.default
}

export const formatCategorias = (categorias = []) =>
  categorias.slice(0, 2).join(' · ')
