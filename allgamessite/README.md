# AllGames

React + Vite com catálogo da **IGDB** (Twitch).

## Rodar
1. `npm install`
2. Em https://dev.twitch.tv/console crie um aplicativo e copie o **Client ID** e gere um **Client Secret**.
3. Copie `.env.example` para `.env` e preencha `IGDB_CLIENT_ID` e `IGDB_CLIENT_SECRET`.
4. `npm run dev` (reinicie sempre que alterar o `.env`).

## Como funciona
- A IGDB não aceita chamadas diretas do navegador (CORS) e exige token OAuth. O `vite.config.js` traz um proxy em `/api/igdb` que gera o token e guarda o Secret só no servidor.
- Isso funciona em `npm run dev` e `npm run preview`. Para publicar na internet, leve esse proxy para um backend (Node, Vercel/Netlify function etc.).
- Sem credenciais o site abre em modo demonstração.
- GTA VI: a arte vem da IGDB; para forçar uma imagem oficial, use `GTA6_IMAGE` em `src/data.js`.
- Siga os termos de uso da IGDB/Twitch.
