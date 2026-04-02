import { useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'

export default function TarotCard({ card, onSparkle, onHover, onClick }) {
  const innerRef = useRef(null)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = useCallback(() => {
    onClick()
    if (isFlipped) {
      gsap.to(innerRef.current, { rotationY: 0, duration: 0.7, ease: 'power2.inOut' })
      setIsFlipped(false)
    } else {
      gsap.to(innerRef.current, { rotationY: 180, duration: 0.8, ease: 'back.out(1.4)' })
      onSparkle(innerRef.current)
      setIsFlipped(true)
    }
  }, [isFlipped, onClick, onSparkle])

  return (
    <div
      ref={innerRef}
      onClick={handleClick}
      onMouseEnter={onHover}
      className="card-inner relative w-full cursor-pointer group"
      style={{ transformStyle: 'preserve-3d', aspectRatio: '2 / 3.2' }}
    >
      {/* Dorso */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden bg-[#110d0f] border border-[#8a7433]
          flex items-center justify-center
          shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_0_60px_rgba(107,29,42,0.1)]
          transition-all duration-300
          group-hover:border-[#c9a84c] group-hover:shadow-[0_8px_40px_rgba(201,168,76,0.15),inset_0_0_60px_rgba(107,29,42,0.15)]"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <div
          className="w-4/5 h-[85%] border border-[#8a7433] rounded-lg flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, rgba(107,29,42,0.08) 0%, transparent 50%, rgba(201,168,76,0.05) 100%)',
          }}
        >
          <div className="absolute inset-1.5 border border-[rgba(201,168,76,0.15)] rounded-md" />
          <div className="absolute inset-3 border border-[rgba(201,168,76,0.15)] rounded-[5px]" />
          <span className="text-4xl opacity-60 z-10 text-[#8a7433]">✦</span>
        </div>
      </div>

      {/* Frente */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden bg-[#110d0f] border border-[#8a7433]
          flex flex-col p-4 md:p-5
          shadow-[0_4px_30px_rgba(0,0,0,0.5),0_0_60px_rgba(201,168,76,0.08)]
          transition-all duration-300
          group-hover:border-[#c9a84c] group-hover:shadow-[0_8px_40px_rgba(201,168,76,0.12),0_0_60px_rgba(201,168,76,0.1)]"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      >
        <div className="font-cinzel text-[11px] tracking-[4px] text-[#8a7433] uppercase mb-1.5">
          {card.numeral}
        </div>
        <div className="font-cinzel-deco text-[16px] md:text-[20px] text-[#c9a84c] mb-1 leading-tight">
          {card.name}
        </div>

        <div className="w-full my-2 rounded border border-[rgba(201,168,76,0.1)] overflow-hidden bg-black/30"
             style={{ aspectRatio: '1 / 1' }}>
          <img
            src={card.imgUrl}
            alt={card.name}
            className="w-full h-full object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
          />
        </div>

        <div
          className="w-10 h-px mx-auto my-2"
          style={{ background: 'linear-gradient(90deg, transparent, #8a2a3a, transparent)' }}
        />
        <div className="font-cinzel text-[10px] tracking-[3px] uppercase text-[#d4707a] mb-2.5">
          {card.keyword}
        </div>
        <div className="font-garamond text-[13px] md:text-[14px] font-light leading-relaxed text-[#a89a82] italic flex-1 flex items-center text-center px-1">
          {card.meaning}
        </div>
        <div className="text-[10px] text-[#8a7433] tracking-[6px] mt-2">✦ ✦ ✦</div>
        <div className="font-cinzel text-[9px] tracking-[2px] text-[rgba(168,154,130,0.3)] uppercase mt-1">
          tocá para cerrar
        </div>
      </div>
    </div>
  )
}
