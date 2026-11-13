let cachedToken = null
let tokenExpiresAt = 0

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken
  }

  const clientId = process.env.IGDB_CLIENT_ID
  const clientSecret = process.env.IGDB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('Credenciais IGDB não configuradas nas variáveis de ambiente do Vercel.')
  }

  const tokenResponse = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&grant_type=client_credentials`,
    { method: 'POST' }
  )

  const tokenData = await tokenResponse.json()

  if (!tokenResponse.ok || !tokenData.access_token) {
    throw new Error(tokenData.message || 'Falha ao autenticar com a API da Twitch/IGDB.')
  }

  cachedToken = tokenData.access_token
  tokenExpiresAt = Date.now() + (tokenData.expires_in - 60) * 1000

  return cachedToken
}

export default async function handler(req, res) {
  // Permite CORS se necessário
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

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

    // Trata o corpo da requisição independentemente de vir como string ou objeto JSON
    let requestBody = ''
    if (typeof req.body === 'string') {
      requestBody = req.body
    } else if (req.body && typeof req.body === 'object') {
      requestBody = JSON.stringify(req.body)
    }

    const igdbResponse = await fetch(
      `https://api.igdb.com/v4/${path}`,
      {
        method: 'POST',
        headers: {
          'Client-ID': process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/plain'
        },
        body: requestBody
      }
    )

    const resultText = await igdbResponse.text()
    return res.status(igdbResponse.status).send(resultText)

  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Erro interno ao processar requisição IGDB.'
    })
  }
}
