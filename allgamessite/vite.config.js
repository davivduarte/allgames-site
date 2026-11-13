import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy da IGDB: guarda Client ID/Secret só no servidor, gera o token da Twitch e evita o bloqueio de CORS.
function igdbProxy(env) {
  let token = null, exp = 0
  async function getToken() {
    if (token && Date.now() < exp) return token
    const r = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${env.IGDB_CLIENT_ID}&client_secret=${env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`, { method: 'POST' })
    const j = await r.json()
    if (!j.access_token) throw new Error(j.message || 'Falha ao gerar token da Twitch (confira Client ID e Secret no .env)')
    token = j.access_token; exp = Date.now() + (j.expires_in - 60) * 1000
    return token
  }
  const handler = async (req, res) => {
    let body = ''
    for await (const c of req) body += c
    res.setHeader('Content-Type', 'application/json')
    try {
      const r = await fetch('https://api.igdb.com/v4' + req.url, { method: 'POST', headers: { 'Client-ID': env.IGDB_CLIENT_ID, Authorization: `Bearer ${await getToken()}`, 'Content-Type': 'text/plain' }, body })
      res.statusCode = r.status; res.end(await r.text())
    } catch (e) { res.statusCode = 500; res.end(JSON.stringify({ error: e.message })) }
  }
  return { name: 'igdb-proxy', configureServer(s) { s.middlewares.use('/api/igdb', handler) }, configurePreviewServer(s) { s.middlewares.use('/api/igdb', handler) } }
}

export default defineConfig(({ mode }) => ({ plugins: [react(), igdbProxy(loadEnv(mode, process.cwd(), ''))] }))
