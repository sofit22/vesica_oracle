export const TAROT_DECK = [
  {
    numeral: '0',
    name: 'El Loco',
    emoji: '🌬️',
    keyword: 'Salto de Fe',
    imgUrl: 'https://loremflickr.com/g/300/300/tarot,0?random=1',
    meaning:
      'El amor te pide que sueltes el control. Algo nuevo y emocionante espera si te animás a saltar sin calcular la caída. Confiá en lo que sentís.',
  },
  {
    numeral: 'I',
    name: 'El Mago',
    emoji: '✨',
    keyword: 'Manifestación',
    imgUrl: 'https://loremflickr.com/g/300/300/tarot,magic?random=2',
    meaning:
      'Tenés todo lo que necesitás para crear el amor que deseás. Es momento de ser intencional: cada gesto pequeño es un acto de magia.',
  },
  {
    numeral: 'II',
    name: 'La Sacerdotisa',
    emoji: '🌙',
    keyword: 'Intuición',
    imgUrl: 'https://loremflickr.com/g/300/300/tarot,moon?random=3',
    meaning:
      'Tu intuición sabe cosas que tu mente todavía no procesó. Hacé silencio interior y escuchá lo que tu cuerpo te dice sobre esta persona o situación.',
  },
  {
    numeral: 'III',
    name: 'La Emperatriz',
    emoji: '🌺',
    keyword: 'Abundancia',
    imgUrl: 'https://loremflickr.com/g/300/300/tarot,queen?random=4',
    meaning:
      'El amor florece a tu alrededor. Es tiempo de nutrirte, de recibir sin culpa, de dejarte querer. La abundancia emocional empieza por vos.',
  },
  {
    numeral: 'IV',
    name: 'El Emperador',
    emoji: '🏛️',
    keyword: 'Estructura',
    imgUrl: 'https://loremflickr.com/g/300/300/tarot,king?random=5',
    meaning:
      'El amor necesita bases firmes. Revisá si estás construyendo sobre terreno sólido o sobre promesas vacías. La estabilidad no es aburrimiento, es cuidado.',
  },
  {
    numeral: 'VI',
    name: 'Los Enamorados',
    emoji: '💞',
    keyword: 'Elección',
    imgUrl: 'https://loremflickr.com/g/300/300/tarot,love?random=6',
    meaning:
      'Una decisión del corazón te espera. No se trata de perfección sino de autenticidad. Elegí lo que te haga sentir más vos, no lo que se vea bien desde afuera.',
  },
  {
    numeral: 'XVII',
    name: 'La Estrella',
    emoji: '⭐',
    keyword: 'Esperanza',
    imgUrl: 'https://loremflickr.com/g/300/300/tarot,star?random=7',
    meaning:
      'Después de la tormenta, la calma. El universo te recuerda que el amor genuino existe y está más cerca de lo que pensás. No pierdas la fe.',
  },
  {
    numeral: 'XVIII',
    name: 'La Luna',
    emoji: '🌑',
    keyword: 'Misterio',
    imgUrl: 'https://loremflickr.com/g/300/300/tarot,night?random=8',
    meaning:
      'No todo es lo que parece. Hay emociones ocultas —tuyas o de alguien más— que necesitan salir a la luz. Navegá la incertidumbre sin perder tu centro.',
  },
  {
    numeral: 'As',
    name: 'As de Copas',
    emoji: '🏆',
    keyword: 'Nuevo Amor',
    imgUrl: 'https://loremflickr.com/g/300/300/tarot,cup?random=9',
    meaning:
      'Una nueva emoción está naciendo. Puede ser una persona, un sentimiento renovado, o un amor propio que por fin se desborda. Abrí las manos para recibir.',
  },
]

export function getRandomCards(count = 6) {
  return [...TAROT_DECK].sort(() => Math.random() - 0.5).slice(0, count)
}
