const F = 'name,slug,summary,first_release_date,total_rating,aggregated_rating,cover.image_id,artworks.image_id,screenshots.image_id,genres.name,involved_companies.developer,involved_companies.company.name'
const WHERE = 'total_rating_count > 60 & (screenshots != null | artworks != null)'
const img = (id, t) => `https://images.igdb.com/igdb/image/upload/t_${t}/${id}.jpg`
async function q(ep, body) {
  const r = await fetch('/api/igdb/' + ep, { method: 'POST', body })
  if (!r.ok) throw new Error('IGDB ' + r.status)
  return r.json()
}
// converte o formato da IGDB para o formato usado pelo site (artes horizontais primeiro, capa vertical só como reserva)
function norm(g) {
  const wide = [...(g.artworks || []), ...(g.screenshots || [])].map(x => img(x.image_id, '1080p'))
  const sc = g.aggregated_rating || g.total_rating
  return {
    id: g.id, name: g.name, slug: g.slug, description_raw: g.summary, metacritic: sc ? Math.round(sc) : null,
    released: g.first_release_date ? new Date(g.first_release_date * 1000).toISOString().slice(0, 10) : '',
    images: [...wide, g.cover && img(g.cover.image_id, 'cover_big')].filter(Boolean),
    genres: (g.genres || []).map(x => ({ name: x.name })),
    developers: (g.involved_companies || []).filter(c => c.developer && c.company).map(c => c.company),
  }
}
export const listGames = async (page, size) => (await q('games', `fields ${F}; where ${WHERE}; sort total_rating_count desc; limit ${size}; offset ${(page - 1) * size};`)).map(norm)
export const countGames = async () => (await q('games/count', `where ${WHERE};`)).count
export const searchGames = async (t, size) => (await q('games', `search "${t.replace(/["\\]/g, '')}"; fields ${F}; where screenshots != null | artworks != null | cover != null; limit ${size};`)).map(norm)
export const getGame = async id => (await q('games', `fields ${F}; where id = ${id};`)).map(norm)[0]
export const getBySlug = async slug => (await q('games', `fields ${F}; where slug = "${slug}";`)).map(norm)[0]
