
let cachedToken = null
let tokenExpiresAt = 0

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken
  }

  const clientId = process.env.IGDB_CLIENT_ID
  const clientSecret = process.env.IGDB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Credenciais IGDB não configuradas.')
  }

  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&grant_type=client_credentials`,
    { method: 'POST' }
  )

  const data = await response.json()

  if (!response.ok || !data.access_token) {
    throw new Error(data.message || 'Falha na autenticação IGDB.')
  }

  cachedToken = data.access_token
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000

  return cachedToken
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  try {
    const path = Array.isArray(req.query.path)
      ? req.query.path.join('/')
      : req.query.path

    if (!path || !/^[a-z0-9_/-]+$/i.test(path)) {
      return res.status(400).json({ error: 'Endpoint inválido.' })
    }

    const token = await getToken()

    const response = await fetch(
      `https://api.igdb.com/v4/${path}`,
      {
        method: 'POST',
        headers: {
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/plain'
        },
        body: typeof req.body === 'string' ? req.body : ''
      }
    )

    const result = await response.text()
    return res.status(response.status).send(result)

  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Erro na API IGDB.'
    })
  }
}
