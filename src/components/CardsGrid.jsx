import { useState, useRef, useCallback, useEffect } from 'react'
import { gsap } from 'gsap'
import TarotCard from './TarotCard'
import SparkleLayer from './SparkleLayer'
import { getRandomCards } from '../data/deck'
import { useAudio } from '../hooks/useAudio'

export default function CardsGrid() {
  const [cards, setCards] = useState(() => getRandomCards())
  const gridRef = useRef(null)
  const sparkleRef = useRef(null)
  const { init, playKeyClick, playFlip, playUnflip, playReset } = useAudio()

  // Animación de entrada al montar y al resetear
  useEffect(() => {
    const slots = gridRef.current?.querySelectorAll('.card-slot')
    if (!slots) return
    gsap.fromTo(
      slots,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: 'power3.out', delay: 0.1 }
    )
  }, [cards])

  const handleReset = useCallback(() => {
    init()
    playReset()
    gsap.to(gridRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      onComplete: () => {
        setCards(getRandomCards())
        gsap.to(gridRef.current, { opacity: 1, y: 0, duration: 0.4 })
      },
    })
  }, [init, playReset])

  const handleSparkle = useCallback((el) => {
    sparkleRef.current?.burst(el)
  }, [])

  const handleCardClick = useCallback(() => {
    init()
    // playFlip / playUnflip se llaman desde TarotCard via prop separada
  }, [init])

  return (
    <>
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 max-w-[780px] mx-auto perspective-[1200px]"
      >
        {cards.map((card) => (
          <div key={card.numeral + card.name} className="card-slot opacity-0">
            <TarotCard
              card={card}
              onSparkle={handleSparkle}
              onHover={() => { init(); playKeyClick() }}
              onClick={() => { init(); playFlip() }}
              onClose={playUnflip}
            />
          </div>
        ))}
      </div>

      <div className="mt-12">
        <button
          onClick={handleReset}
          className="bg-transparent border border-[#8a7433] text-[#8a7433]
            font-cinzel text-[12px] tracking-[4px] uppercase
            px-9 py-3.5 cursor-pointer rounded-sm
            transition-all duration-300
            hover:border-[#c9a84c] hover:text-[#c9a84c]
            hover:shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:bg-[rgba(201,168,76,0.05)]
            active:scale-[0.97]"
        >
          ✦&ensp;Nueva tirada&ensp;✦
        </button>
      </div>

      <SparkleLayer ref={sparkleRef} />
    </>
  )
}
