import { useRef, useImperativeHandle, forwardRef } from 'react'
import { gsap } from 'gsap'

const STAR_EMOJIS = ['✨', '⭐', '🌟']

const SparkleLayer = forwardRef(function SparkleLayer(_, ref) {
  const containerRef = useRef(null)

  useImperativeHandle(ref, () => ({
    burst(cardElement) {
      const container = containerRef.current
      if (!container || !cardElement) return
      const rect = cardElement.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2

      for (let i = 0; i < 15; i++) {
        const el = document.createElement('div')
        el.className = 'absolute text-xl pointer-events-none select-none'
        el.textContent = STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)]
        el.style.left = cx + 'px'
        el.style.top = cy + 'px'
        el.style.color = '#e8c55a'
        container.appendChild(el)

        const angle = Math.random() * Math.PI * 2
        const velocity = 80 + Math.random() * 120
        const duration = 0.8 + Math.random() * 0.7

        gsap.to(el, {
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity,
          rotation: Math.random() * 720 - 360,
          opacity: 0,
          scale: 0.2 + Math.random() * 0.5,
          ease: 'power2.out',
          duration,
          onComplete: () => el.remove(),
        })
      }
    },
  }))

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50" />
})

export default SparkleLayer
