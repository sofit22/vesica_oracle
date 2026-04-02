import { useMemo } from 'react'

export default function StarsBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dur: 2 + Math.random() * 4,
      maxOp: 0.3 + Math.random() * 0.5,
      delay: Math.random() * 3,
      big: Math.random() > 0.7,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star absolute rounded-full bg-[#8a7433]"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.big ? '3px' : '2px',
            height: s.big ? '3px' : '2px',
            '--dur': `${s.dur}s`,
            '--max-op': s.maxOp,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
