import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Search, Trophy, Gamepad2, Heart, Check, Play, X, Star, Maximize, ArrowRight, Trash2, Crown, Flame, LoaderCircle, Plus } from 'lucide-react'
import { DEMO, GTA6_DEMO, GTA6_IMAGE, GTA_RELEASE_DATE } from './data.js'
import Quiz from './Quiz.jsx'
import { listGames, searchGames, getGame, getBySlug, countGames } from './igdb.js'

export const year = g => (g?.released || '').slice(0, 4) || '—'
export const genres = g => (g?.genres || []).map(x => x.name).slice(0, 2).join(' · ')
const small = u => u.replace('/t_1080p/', '/t_screenshot_big/')
export function imgs(g, sm) {
  if (!g) return []
  const l = g.images || [g.background_image, g.background_image_additional, ...(g.short_screenshots || []).map(s => s.image)]
  const list = l.filter(Boolean)
  return sm ? list.flatMap(u => [small(u), u]) : list
}
export function Img({ game, sm, className = '' }) {
  const list = useMemo(() => imgs(game, sm), [game?.id, sm])
  const [i, setI] = useState(0)
  useEffect(() => setI(0), [game?.id])
  if (i >= list.length) return <div className={`ph ${className}`}><b>{game?.name}</b></div>
  return <div className={`fit ${className}`}><img className="fit-bg" src={list[i]} alt="" aria-hidden="true" referrerPolicy="no-referrer" /><img className="fit-fg" src={list[i]} alt={game?.name} loading="lazy" referrerPolicy="no-referrer" onError={() => setI(i + 1)} /></div>
}
const Stars = ({ v = 0, set, size = 16 }) => <span className="stars">{[1, 2, 3, 4, 5].map(n => <Star key={n} size={size} className={n <= v ? 'on' : ''} onClick={set ? () => set(n) : undefined} />)}</span>
const slim = (g, extra = {}) => ({ id: g.id, name: g.name, released: g.released, yearOnly: g.yearOnly, metacritic: g.metacritic, genres: g.genres, images: imgs(g).slice(0, 4), description_raw: g.description_raw, ...extra })

function load() { try { return JSON.parse(localStorage.getItem(STORE)) || {} } catch { return {} } }

export default function App() {
  const [page, setPage] = useState('home')
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [total, setTotal] = useState(0)
  const [apiPage, setApiPage] = useState(2)
  const [busy, setBusy] = useState(false)
  const [sel, setSel] = useState(null)
  const [results, setResults] = useState(null)
  const [saved, setSaved] = useState(() => ({ completed: [], playing: [], wishlist: [], best: {}, ...load() }))
  const [cd, setCd] = useState(0)

  useEffect(() => { try { localStorage.setItem(STORE, JSON.stringify(saved)) } catch {} }, [saved])
  useEffect(() => { const t = () => setCd(Math.max(0, GTA_RELEASE_DATE - Date.now())); t(); const id = setInterval(t, 1000); return () => clearInterval(id) }, [])
  useEffect(() => { catalog() }, [])

  async function catalog() {
    setLoading(true)
    try {
      const [a, b, gta, count] = await Promise.all([listGames(1, 40), listGames(2, 40), getBySlug('grand-theft-auto-vi').catch(() => null), countGames().catch(() => 0)])
      const seen = new Set()
      const pinnedNames = new Set(DEMO.map(g => g.name.toLowerCase()))
      const list = [...a, ...b].filter(g => g.images.length && g.slug !== 'grand-theft-auto-vi' && !pinnedNames.has(g.name.toLowerCase()) && !seen.has(g.id) && seen.add(g.id))
      const g6 = gta ? { ...gta, images: [...(gta.images || [])] } : GTA6_DEMO
      setGames([g6, ...DEMO, ...list]); setTotal(count)
    } catch (e) {
      setGames([GTA6_DEMO, ...DEMO])
      setNotice('Modo demonstração: configure IGDB_CLIENT_ID e IGDB_CLIENT_SECRET no arquivo .env e reinicie o npm run dev para carregar a API.')
    } finally { setLoading(false) }
  }

  async function more() {
    setBusy(true)
    try {
      const n = apiPage + 1, r = await listGames(n, 40)
      setGames(p => { const s = new Set(p.map(g => g.name.toLowerCase())); return [...p, ...r.filter(g => g.images.length && !s.has(g.name.toLowerCase()) && g.slug !== 'grand-theft-auto-vi')] })
      setApiPage(n)
    } catch {}
    setBusy(false)
  }
  const gta = games[0]
  const catalogGames = games.slice(1)
  const genreList = useMemo(() => {
    const c = {}; catalogGames.forEach(g => (g.genres || []).forEach(x => c[x.name] = (c[x.name] || 0) + 1))
    return ['Todos', ...Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 9).map(x => x[0])]
  }, [games])
  const filtered = genre === 'Todos' ? catalogGames : catalogGames.filter(g => (g.genres || []).some(x => x.name === genre))

  const shelfOf = g => ['completed', 'playing', 'wishlist'].find(k => saved[k].some(x => x.id === g?.id)) || ''
  function setShelf(g, shelf, extra) {
    setSaved(p => {
      const n = { ...p }
      ;['completed', 'playing', 'wishlist'].forEach(k => n[k] = p[k].filter(x => x.id !== g.id))
      if (shelf) n[shelf] = [slim(g, shelf === 'completed' ? { rating: 4, review: '', doneAt: Date.now(), ...extra } : extra), ...n[shelf]]
      return n
    })
  }
  const go = p => { setPage(p); setResults(null); window.scrollTo(0, 0) }
  const ctx = { open: setSel, shelfOf }

  return <div className="app">
    <Header page={page} go={go} onOpen={setSel} onSubmit={async q => { setPage('explore'); setResults({ q, list: null }); setResults({ q, list: await search(q, 40) }) }} />
    {notice && <div className="notice"><span>{notice}</span><button onClick={() => setNotice('')}><X size={14} /></button></div>}
    {page === 'home' && <>
      {gta && <Hero g={gta} cd={cd} {...ctx} onWish={() => setShelf(gta, 'wishlist')} />}
      <section className="wrap">
        {catalogGames.length > 0 && <><div className="sec-head"><div><span className="eyebrow">EM ALTA AGORA</span><h2>30 jogos em destaque</h2></div></div>
          <div className="feat">{catalogGames.slice(0, 8).map(g => <button key={g.id} onClick={() => setSel(g)}><Img game={g} /><div className="feat-info"><b>{g.name}</b><small>{year(g)} · {genres(g)}</small></div></button>)}</div></>}
        <div className="sec-head"><div><span className="eyebrow">CATÁLOGO PRINCIPAL + API</span><h2>{filtered.length} jogos carregados{total ? ` de ${total.toLocaleString('pt-BR')} na API` : ''}</h2></div></div>
        <div className="chips">{genreList.map(x => <button key={x} className={x === genre ? 'on' : ''} onClick={() => setGenre(x)}>{x}</button>)}</div>
        <Grid list={filtered} loading={loading} {...ctx} />
        {total > 0 && <button className="btn ghost center" disabled={busy} onClick={more}>{busy ? <LoaderCircle size={16} className="spin" /> : <Plus size={16} />} Carregar mais jogos da API</button>}
      </section>
    </>}
    {page === 'explore' && <section className="wrap pt">
      <span className="eyebrow">BUSCA</span><h1 className="big">{results ? <>Resultados para “{results.q}”</> : 'Explorar'}</h1>
      {results ? (results.list ? <Grid list={results.list} {...ctx} /> : <div className="center-msg"><LoaderCircle className="spin" /> Buscando na API…</div>) : <Grid list={catalogGames} {...ctx} />}
    </section>}
    {page === 'quiz' && <Quiz pool={[...(gta ? [gta] : []), ...catalogGames].filter(g => imgs(g).length)} best={saved.best} onBest={(m, s) => setSaved(p => ({ ...p, best: { ...p.best, [m]: Math.max(s, p.best?.[m] || 0) } }))} />}
    {page === 'gallery' && <Gallery list={saved.completed} onOpen={setSel} onRemove={g => setShelf(g, '')} onSeed={() => setSaved(p => ({ ...p, completed: DEMO.slice(0, 6).map((g, i) => slim(g, { rating: [5, 5, 4, 5, 4, 3][i], doneAt: Date.now() - i * 864e5, review: ['Um marco absoluto.', 'História e mundo inesquecíveis.', 'Muito divertido do início ao fim.', 'Obra-prima narrativa.', 'Desafiador e viciante.', 'Bom, mas teve altos e baixos.'][i] })) }))} go={go} />}
    {page === 'list' && <MyList saved={saved} {...ctx} go={go} />}
    <footer className="foot"><span>© 2026 AllGames</span><span>Dados e imagens: IGDB</span></footer>
    {sel && <Modal g={sel} onClose={() => setSel(null)} shelf={shelfOf(sel)} done={saved.completed.find(x => x.id === sel.id)} setShelf={setShelf} />}
  </div>
}

async function search(q, size) {
  try { return (await searchGames(q, size)).filter(g => g.images.length) }
  catch { return DEMO.filter(g => g.name.toLowerCase().includes(q.toLowerCase())).slice(0, size) }
}

function Header({ page, go, onOpen, onSubmit }) {
  const [q, setQ] = useState(''); const [res, setRes] = useState([]); const [busy, setBusy] = useState(false); const [openBox, setOpen] = useState(false); const [hi, setHi] = useState(-1)
  const box = useRef()
  useEffect(() => {
    if (q.trim().length < 2) { setRes([]); return }
    setBusy(true)
    const t = setTimeout(async () => { setRes(await search(q.trim(), 8)); setBusy(false); setHi(-1) }, 320)
    return () => clearTimeout(t)
  }, [q])
  useEffect(() => { const f = e => { if (!box.current?.contains(e.target)) setOpen(false) }; document.addEventListener('mousedown', f); return () => document.removeEventListener('mousedown', f) }, [])
  const pick = g => { onOpen(g); setOpen(false); setQ('') }
  const key = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi(h => Math.min(res.length - 1, h + 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHi(h => Math.max(0, h - 1)) }
    if (e.key === 'Enter') { if (hi >= 0 && res[hi]) pick(res[hi]); else if (q.trim()) { onSubmit(q.trim()); setOpen(false) } }
    if (e.key === 'Escape') setOpen(false)
  }
  const nav = [['home', 'Início'], ['explore', 'Explorar'], ['quiz', 'Quizzes'], ['gallery', 'Galeria'], ['list', 'Minha lista']]
  return <header className="top">
    <button className="logo" onClick={() => go('home')}><Gamepad2 size={20} />ALL<i>GAMES</i></button>
    <div className="search" ref={box}>
      <Search size={17} />
      <input value={q} onChange={e => { setQ(e.target.value); setOpen(true) }} onFocus={() => setOpen(true)} onKeyDown={key} placeholder="Pesquise qualquer jogo da API…" />
      {busy && <LoaderCircle size={16} className="spin" />}
      {openBox && q.trim().length >= 2 && <div className="drop">
        {res.length === 0 && !busy && <div className="drop-empty">Nenhum jogo encontrado.</div>}
        {res.map((g, i) => <button key={g.id} className={i === hi ? 'hi' : ''} onMouseEnter={() => setHi(i)} onClick={() => pick(g)}>
          <Img game={g} sm /><span><b>{g.name}</b><small>{year(g)} · {genres(g) || 'Jogo'}</small></span>{g.metacritic && <em>{g.metacritic}</em>}
        </button>)}
        {res.length > 0 && <button className="drop-all" onClick={() => { onSubmit(q.trim()); setOpen(false) }}>Ver todos os resultados <ArrowRight size={14} /></button>}
      </div>}
    </div>
    <nav>{nav.map(([k, l]) => <button key={k} className={page === k ? 'on' : ''} onClick={() => go(k)}>{l}</button>)}</nav>
  </header>
}

function Hero({ g, cd, open, onWish, shelfOf }) {
  const d = Math.floor(cd / 864e5), h = Math.floor(cd / 36e5) % 24, m = Math.floor(cd / 6e4) % 60, s = Math.floor(cd / 1e3) % 60
  return <section className="hero">
    <div className="hero-glow" />
    <div className="wrap hero-grid">
      <div className="hero-text">
        <span className="kicker"><i className="dot" /> O JOGO MAIS AGUARDADO · 19 NOV 2026</span>
        <h1>GRAND THEFT AUTO <em>VI</em></h1>
        <p>Vice City e o estado de Leonida voltam em um novo capítulo da Rockstar Games. PlayStation 5 e Xbox Series X|S.</p>
        <div className="count">{cd > 0 ? [[d, 'dias'], [h, 'horas'], [m, 'min'], [s, 'seg']].map(([v, l]) => <div key={l}><b>{String(v).padStart(2, '0')}</b><small>{l}</small></div>) : <b className="live">JÁ DISPONÍVEL!</b>}</div>
        <div className="row"><button className="btn" onClick={() => open(g)}><Play size={16} /> Ver detalhes</button>
          <button className="btn ghost" onClick={onWish}><Heart size={16} fill={shelfOf(g) === 'wishlist' ? 'currentColor' : 'none'} /> Quero jogar</button></div>
      </div>
      <button className="hero-art" onClick={() => open(g)} aria-label="Ver GTA VI"><Img game={g} /><span className="tag">GTA VI</span></button>
    </div>
  </section>
}

function Grid({ list, loading, open, shelfOf }) {
  if (loading) return <div className="grid">{Array.from({ length: 12 }, (_, i) => <div key={i} className="card sk" />)}</div>
  if (!list.length) return <div className="center-msg">Nenhum jogo encontrado.</div>
  return <div className="grid">{list.map((g, i) => {
    const sh = shelfOf(g)
    return <button key={g.id} className="card" style={{ '--d': `${(i % 12) * 30}ms` }} onClick={() => open(g)}>
      <Img game={g} sm />
      <div className="card-info"><b>{g.name}</b><small>{year(g)} · {genres(g) || 'Jogo'}</small></div>
      {g.metacritic > 0 && <em className="score">{g.metacritic}</em>}
      {sh && <span className="shelf-tag">{sh === 'completed' ? <Check size={12} /> : sh === 'wishlist' ? <Heart size={12} /> : <Play size={12} />}</span>}
    </button>
  })}</div>
}

function Modal({ g, onClose, shelf, done, setShelf }) {
  const [d, setD] = useState(g)
  const [rating, setRating] = useState(done?.rating || 4); const [review, setReview] = useState(done?.review || '')
  useEffect(() => {
    setD(g)
    if (typeof g.id !== 'number') return
    getGame(g.id).then(x => x && setD({ ...g, ...x })).catch(() => {})
  }, [g.id])
  useEffect(() => { const f = e => e.key === 'Escape' && onClose(); window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f) }, [])
  const shots = imgs(d).slice(1, 5)
  const dev = (d.developers || []).map(x => x.name).join(', ')
  return <div className="backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <div className="modal">
      <button className="x" onClick={onClose}><X size={18} /></button>
      <div className="m-hero"><Img game={d} /><div className="m-shade" /><div className="m-title"><span className="eyebrow">{year(d)} · {genres(d)}</span><h2>{d.name}</h2></div></div>
      <div className="m-body">
        <div className="facts">{d.metacritic > 0 && <span><b>{d.metacritic}</b> Nota</span>}{dev && <span>{dev}</span>}</div>
        <p className="desc">{(d.description_raw || 'Sem descrição disponível.').slice(0, 520)}{(d.description_raw || '').length > 520 ? '…' : ''}</p>
        {shots.length > 0 && <><h3 className="shots-title">Galeria de imagens</h3><div className="shots">{shots.map((u, i) => <img key={`${u}-${i}`} src={u.replace('t_1080p', 't_screenshot_big')} alt={`${d.name} — imagem ${i + 2}`} loading="lazy" referrerPolicy="no-referrer" onError={e => { e.currentTarget.style.display = 'none' }} />)}</div></>}
        <div className="actions">
          <button className={`btn ${shelf === 'playing' ? '' : 'ghost'}`} onClick={() => setShelf(d, shelf === 'playing' ? '' : 'playing')}><Play size={15} /> Jogando</button>
          <button className={`btn ${shelf === 'wishlist' ? '' : 'ghost'}`} onClick={() => setShelf(d, shelf === 'wishlist' ? '' : 'wishlist')}><Heart size={15} /> Desejo</button>
        </div>
        <div className="zerei">
          <div><b><Trophy size={15} /> {shelf === 'completed' ? 'Você zerou este jogo' : 'Zerou este jogo?'}</b><Stars v={rating} set={setRating} size={22} /></div>
          <textarea value={review} onChange={e => setReview(e.target.value)} placeholder="Escreva uma frase sobre a sua experiência (aparece na galeria)…" />
          <div className="row"><button className="btn" onClick={() => setShelf(d, 'completed', { rating, review, doneAt: done?.doneAt || Date.now() })}><Check size={15} /> {shelf === 'completed' ? 'Atualizar' : 'Marcar como zerado'}</button>
            {shelf && <button className="btn ghost" onClick={() => setShelf(d, '')}><Trash2 size={15} /> Remover</button>}</div>
        </div>
      </div>
    </div>
  </div>
}

function Gallery({ list, onOpen, onRemove, onSeed, go }) {
  const box = useRef()
  const ranked = useMemo(() => [...list].sort((a, b) => b.rating - a.rating || a.doneAt - b.doneAt), [list])
  const top = ranked.slice(0, 3)
  const order = [top[1], top[0], top[2]]
  const rankOf = g => ranked.indexOf(g) + 1
  useEffect(() => {
    const f = e => {
      if (!box.current || !['ArrowDown', 'ArrowUp'].includes(e.key) || !(document.fullscreenElement === box.current)) return
      e.preventDefault(); box.current.scrollBy({ top: (e.key === 'ArrowDown' ? 1 : -1) * box.current.clientHeight, behavior: 'smooth' })
    }
    window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f)
  }, [])
  if (!list.length) return <section className="wrap pt empty-gal"><Trophy size={44} /><h1 className="big">Sua galeria está vazia</h1><p>Marque jogos como “zerado” (com nota) para expô-los aqui em tela cheia e montar o seu pódio.</p>
    <div className="row"><button className="btn" onClick={() => go('home')}>Escolher jogos</button><button className="btn ghost" onClick={onSeed}>Preencher com exemplos</button></div></section>
  return <>
    <section className="wrap pt podium-sec">
      <span className="eyebrow">HALL DA FAMA</span><h1 className="big">Pódio dos melhores jogos</h1>
      <div className="podium">{order.map((g, i) => g ? <button key={g.id} className={`pod p${[2, 1, 3][i]}`} onClick={() => onOpen(g)}>
        <div className="pod-art"><Img game={g} /><span className="medal">{[2, 1, 3][i] === 1 ? <Crown size={18} /> : [2, 1, 3][i]}</span></div>
        <div className="pod-base"><b>{g.name}</b><Stars v={g.rating} size={14} /><i>{[2, 1, 3][i]}º</i></div>
      </button> : <div key={i} className="pod empty" />)}</div>
    </section>
    <div className="gal-bar wrap"><div><span className="eyebrow">GALERIA · {list.length} ZERADOS</span><h2>Exposição em tela cheia</h2></div>
      <button className="btn" onClick={() => box.current?.requestFullscreen?.()}><Maximize size={16} /> Tela cheia</button></div>
    <div className="showcase" ref={box}>
      {ranked.map((g, i) => <article className="slide" key={g.id}>
        <Img game={g} className="slide-bg" /><div className="slide-shade" />
        <div className="slide-body">
          <span className="eyebrow">{String(i + 1).padStart(2, '0')} / {String(ranked.length).padStart(2, '0')} · {year(g)} · {genres(g)}</span>
          <h2>{g.name}</h2><Stars v={g.rating} size={26} />
          {g.review && <p>“{g.review}”</p>}
          <small>Zerado em {new Date(g.doneAt).toLocaleDateString('pt-BR')}</small>
          <div className="row"><button className="btn ghost" onClick={() => onOpen(g)}>Detalhes</button><button className="btn ghost" onClick={() => onRemove(g)}><Trash2 size={15} /></button></div>
        </div>
        {rankOf(g) <= 3 && <span className="slide-rank">#{rankOf(g)}</span>}
      </article>)}
    </div>
  </>
}

function MyList({ saved, open, shelfOf, go }) {
  const groups = [['playing', 'Jogando agora', Play], ['wishlist', 'Lista de desejos', Heart], ['completed', 'Zerados', Check]]
  const total = groups.reduce((n, [k]) => n + saved[k].length, 0)
  return <section className="wrap pt"><span className="eyebrow">SUA COLEÇÃO</span><h1 className="big">Minha lista</h1>
    {!total && <div className="center-msg">Nada por aqui ainda. <button className="btn ghost" onClick={() => go('home')}>Explorar jogos</button></div>}
    {groups.map(([k, t, I]) => saved[k].length > 0 && <div key={k} className="shelf"><h3><I size={16} /> {t} <small>{saved[k].length}</small></h3><Grid list={saved[k]} open={open} shelfOf={shelfOf} /></div>)}
  </section>
}
