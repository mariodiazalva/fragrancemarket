export const decantHero = {
  eyebrow: "Decants",
  title: "Conoce el aroma antes del frasco.",
  text: "Prueba una fragancia antes de decidir si quieres el frasco completo.",
  image: "/images/home/discover-decants.png",
} as const;

export const decantExplain = [
  {
    id: "que",
    title: "Qué es un decant",
    text: "Es una porción más pequeña de la misma fragancia, pasada a un vial. Hueles en tu piel lo que después podría ser el frasco.",
  },
  {
    id: "por-que",
    title: "Por qué comprarlo",
    text: "Evitas comprar a ciegas. Pruebas persistencia, secado y si el aroma te acompaña varios días.",
  },
  {
    id: "como",
    title: "Cómo elegirlo",
    text: "Filtra por género, estilo u ocasión. Empieza por 3 ml si no lo conoces; sube de tamaño si ya te interesa.",
  },
] as const;

export const decantSizeGuides = [
  {
    id: "3",
    volumeMl: 3,
    label: "3 ML",
    text: "Para conocerlo.",
  },
  {
    id: "5",
    volumeMl: 5,
    label: "5 ML",
    text: "Para probarlo varios días.",
  },
  {
    id: "10",
    volumeMl: 10,
    label: "10 ML",
    text: "Para disfrutarlo durante más tiempo.",
  },
] as const;
