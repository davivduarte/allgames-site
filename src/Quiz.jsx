import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Brain, Eye, Swords, TrendingUp, Timer, Flame, Trophy, ArrowRight, Check, X } from 'lucide-react'
import { BANK } from './data.js'
import { Img, year } from './App.jsx'

const shuffle = a => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]] } return r }
const MODES = [
  { id: 'classic', icon: Brain, title: 'Clássico Turbo', desc: '10 perguntas com tempo: curiosidades, estúdios, personagens e anos de lançamento.' },
  { id: 'guess', icon: Eye, title: 'Adivinhe pela imagem', desc: 'A arte real do jogo começa borrada e ampliada — quanto antes acertar, mais pontos.' },
  { id: 'first', icon: Swords, title: 'Qual veio primeiro?', desc: 'Dois jogos, um duelo: escolha o mais antigo e mantenha a sequência.' },
  { id: 'rate', icon: TrendingUp, title: 'Maior ou menor nota?', desc: 'A nota do próximo jogo é maior ou menor? Sequência até errar.' },
]

function useClock(key, on) {
  const [t, setT] = useState(0)
  useEffect(() => { if (!on) return; const s = Date.now(); setT(0); const id = setInterval(() => setT((Date.now() - s) / 1000), 100); return () => clearInterval(id) }, [key, on])
  return t
}

export default function Quiz({ pool, best, onBest }) {
  const [mode, setMode] = useState(null)
  const [run, setRun] = useState(0)
  const m = MODES.find(x => x.id === mode)
  if (!m) return <section className="wrap pt"><span className="eyebrow">DESAFIOS</span><h1 className="big">Quizzes gamer</h1>
    <div className="modes">{MODES.map(x => <button key={x.id} className="mode" onClick={() => setMode(x.id)}>
      <x.icon size={30} /><h3>{x.title}</h3><p>{x.desc}</p><span className="rec"><Trophy size={13} /> Recorde: {best?.[x.id] || 0}</span></button>)}</div></section>
  const back = () => setMode(null)
  return <section className="wrap pt"><button className="link" onClick={back}>← Todos os quizzes</button><h1 className="big">{m.title}</h1>
    {mode === 'classic' || mode === 'guess'
      ? <Rounds key={run} mode={mode} pool={pool} onEnd={s => onBest(mode, s)} again={() => setRun(r => r + 1)} />
      : <Duel key={run} kind={mode} pool={pool} onEnd={s => onBest(mode, s)} again={() => setRun(r => r + 1)} />}
  </section>
}

function Rounds({ mode, pool, onEnd, again }) {
  const qs = useMemo(() => {
    const withYear = pool.filter(g => /^\d{4}/.test(g.released || ''))
    if (mode === 'guess') return shuffle(pool).slice(0, 8).map(g => ({ game: g, ans: g.name, opts: shuffle([g.name, ...shuffle(pool.filter(x => x.id !== g.id)).slice(0, 3).map(x => x.name)]), time: 15, fact: `${g.name} · ${year(g)}` }))
    const bank = shuffle(BANK).slice(0, 6).map(([q, o, a, fact]) => ({ q, ans: o[a], opts: shuffle(o), fact, time: 20 }))
    const gen = shuffle(withYear).slice(0, 4).map(g => {
      const y = +year(g); const ys = new Set([y]); while (ys.size < 4) ys.add(y + Math.round((Math.random() * 2 - 1) * 6) || y + 1)
      return { q: `Em que ano ${g.name} foi lançado?`, game: g, ans: String(y), opts: shuffle([...ys].map(String)), fact: `${g.name} foi lançado em ${y}.`, time: 20 }
    })
    return shuffle([...bank, ...gen])
  }, [])
  const [i, setI] = useState(0); const [pick, setPick] = useState(null); const [score, setScore] = useState(0); const [streak, setStreak] = useState(0); const [hits, setHits] = useState(0)
  const q = qs[i]; const done = i >= qs.length
  const t = useClock(i, !pick && !done)
  const left = q ? Math.max(0, q.time - t) : 0
  useEffect(() => { if (q && !pick && left <= 0) answer('') }, [left])
  useEffect(() => { if (done) onEnd(score) }, [done])
  function answer(o) {
    if (pick !== null) return
    setPick(o)
    if (o === q.ans) { setScore(s => s + 100 + Math.round((left / q.time) * 100) + streak * 20); setStreak(s => s + 1); setHits(h => h + 1) } else setStreak(0)
  }
  if (done) return <Result score={score} sub={`${hits} de ${qs.length} acertos`} again={again} />
  const blur = mode === 'guess' && !pick ? Math.max(0, 20 - t * 1.6) : 0
  const zoom = mode === 'guess' && !pick ? Math.max(1, 3 - t * 0.14) : 1
  return <div className="qbox">
    <div className="qtop"><span><Timer size={15} /> {left.toFixed(1)}s</span><span>{i + 1}/{qs.length}</span><span><Flame size={15} /> x{streak}</span><span><Trophy size={15} /> {score}</span></div>
    <div className="bar"><i style={{ width: `${(left / q.time) * 100}%` }} /></div>
    {q.game && <div className="qimg"><div style={{ filter: `blur(${blur}px)`, transform: `scale(${zoom})` }}><Img game={q.game} /></div></div>}
    <h2 className="qq">{mode === 'guess' ? 'Que jogo é este?' : q.q}</h2>
    <div className="opts">{q.opts.map(o => <button key={o} disabled={pick !== null} className={pick !== null ? (o === q.ans ? 'ok' : o === pick ? 'bad' : '') : ''} onClick={() => answer(o)}>{o}{pick !== null && o === q.ans && <Check size={16} />}{pick === o && o !== q.ans && <X size={16} />}</button>)}</div>
    {pick !== null && <div className="fb"><b>{pick === q.ans ? 'Acertou!' : pick === '' ? 'Tempo esgotado!' : 'Errou!'}</b> {q.fact}<button className="btn" onClick={() => { setPick(null); setI(i + 1) }}>{i + 1 === qs.length ? 'Resultado' : 'Próxima'} <ArrowRight size={15} /></button></div>}
  </div>
}

function Duel({ kind, pool, onEnd, again }) {
  const valid = useMemo(() => pool.filter(g => kind === 'rate' ? g.metacritic > 0 : /^\d{4}/.test(g.released || '')), [])
  const pair = prev => { const a = prev || shuffle(valid)[0]; let b; do { b = shuffle(valid)[0] } while (b.id === a.id || (kind === 'first' && year(a) === year(b)) || (kind === 'rate' && a.metacritic === b.metacritic)); return [a, b] }
  const [[a, b], setP] = useState(() => pair()); const [rev, setRev] = useState(null); const [streak, setStreak] = useState(0); const [over, setOver] = useState(false)
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => { if (over) onEnd(streak) }, [over])
  function choose(side) {
    if (rev) return
    const ok = kind === 'first' ? (side === 'a' ? +year(a) < +year(b) : +year(b) < +year(a)) : (side === 'higher' ? b.metacritic >= a.metacritic : b.metacritic <= a.metacritic)
    setRev({ ok, side })
    timer.current = setTimeout(() => { if (ok) { setStreak(s => s + 1); setRev(null); setP(kind === 'rate' ? pair(b) : pair()) } else setOver(true) }, 1500)
  }
  if (over) return <Result score={streak} sub={`sequência de ${streak} acerto${streak === 1 ? '' : 's'}`} again={again} />
  const Card = ({ g, side, show, mark }) => <button className={`duel-card ${mark || ''}`} disabled={kind === 'rate' || !!rev} onClick={() => choose(side)}>
    <Img game={g} /><div className="duel-info"><b>{g.name}</b>{show && <em>{kind === 'first' ? year(g) : g.metacritic}</em>}</div></button>
  return <div className="qbox"><div className="qtop"><span><Flame size={15} /> Sequência {streak}</span><span>{rev ? (rev.ok ? '✔ Correto!' : '✘ Errou!') : kind === 'first' ? 'Qual foi lançado primeiro?' : 'A nota do segundo é…'}</span></div>
    <div className="duel">
      <Card g={a} side="a" show={kind === 'rate' || !!rev} mark={rev && kind === 'first' && +year(a) < +year(b) ? 'win' : ''} />
      <span className="vs">VS</span>
      <Card g={b} side="b" show={!!rev} mark={rev && kind === 'first' && +year(b) < +year(a) ? 'win' : ''} />
    </div>
    {kind === 'rate' && <div className="row center"><button className="btn" disabled={!!rev} onClick={() => choose('higher')}>▲ Maior</button><button className="btn ghost" disabled={!!rev} onClick={() => choose('lower')}>▼ Menor</button></div>}
  </div>
}

const Result = ({ score, sub, again }) => <div className="qbox result"><Trophy size={48} /><span className="eyebrow">FIM DE JOGO</span><h2>{score} pontos</h2><p>{sub}</p><button className="btn" onClick={again}>Jogar de novo</button></div>
