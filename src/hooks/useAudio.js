import { useRef, useCallback } from 'react'

export function useAudio() {
  const ctxRef = useRef(null)

  const init = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
  }, [])

  const playKeyClick = useCallback(() => {
    const ctx = ctxRef.current
    if (!ctx) return
    const now = ctx.currentTime
    const len = Math.floor(ctx.sampleRate * 0.012)
    const buf = ctx.createBuffer(1, len, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 8)
    const src = ctx.createBufferSource()
    src.buffer = buf
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = 3500 + Math.random() * 1500
    bp.Q.value = 2.5
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.22, now)
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.025)
    src.connect(bp)
    bp.connect(g)
    g.connect(ctx.destination)
    src.start(now)
    src.stop(now + 0.03)
  }, [])

  const playFlip = useCallback(() => {
    const ctx = ctxRef.current
    if (!ctx) return
    const now = ctx.currentTime
    ;[523.25, 659.25, 783.99].forEach((f, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      const fl = ctx.createBiquadFilter()
      o.type = 'sine'
      o.frequency.value = f
      fl.type = 'lowpass'
      fl.frequency.value = 3000
      g.gain.setValueAtTime(0, now + i * 0.08)
      g.gain.linearRampToValueAtTime(0.06, now + i * 0.08 + 0.05)
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
      o.connect(fl)
      fl.connect(g)
      g.connect(ctx.destination)
      o.start(now + i * 0.08)
      o.stop(now + 1)
    })
  }, [])

  const playUnflip = useCallback(() => {
    const ctx = ctxRef.current
    if (!ctx) return
    const now = ctx.currentTime
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(600, now)
    o.frequency.exponentialRampToValueAtTime(350, now + 0.25)
    g.gain.setValueAtTime(0.05, now)
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
    o.connect(g)
    g.connect(ctx.destination)
    o.start(now)
    o.stop(now + 0.35)
  }, [])

  const playReset = useCallback(() => {
    for (let i = 0; i < 5; i++) setTimeout(() => playKeyClick(), i * 55)
  }, [playKeyClick])

  return { init, playKeyClick, playFlip, playUnflip, playReset }
}
