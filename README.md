# AllGames

Catálogo gamer em React + Vite.

## Executar
1. Instale o Node.js LTS.
2. Na pasta do projeto, execute `npm install`.
3. Copie `.env.example` para `.env` e preencha `IGDB_CLIENT_ID` e `IGDB_CLIENT_SECRET` (opcional, mas recomendado).
4. Execute `npm run dev`.

## Catálogo e imagens
- A página inicial sempre começa com GTA VI em destaque e uma seleção fixa de 30 jogos populares.
- Os jogos da seleção principal usam imagens específicas por AppID do Steam CDN; não são imagens aleatórias.
- GTA VI usa a arte oficial de capa disponibilizada pela Rockstar Games.
- Quando a IGDB estiver configurada, ela complementa a seleção com detalhes e mais jogos. A ordem dos 30 destaques não é substituída pela API.
- O quiz mistura perguntas de cultura gamer e anos de lançamento, com perguntas sobre franquias variadas.

## API
A IGDB exige autenticação OAuth e não aceita chamadas diretas do navegador. O proxy em `vite.config.js` atende o desenvolvimento local. Para publicar, mova esse proxy para uma função/backend seguro e não exponha o Client Secret.
