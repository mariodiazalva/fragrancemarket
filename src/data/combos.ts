/** Set to false to restore the live combos catalog and set products. */
export const combosComingSoon = true;

export function withoutHiddenSetProducts<T extends { type: string }>(
  products: T[],
): T[] {
  if (!combosComingSoon) {
    return products;
  }

  return products.filter((product) => product.type !== "set");
}

export function withoutHiddenComboLinks<T extends { id: string }>(items: T[]): T[] {
  if (!combosComingSoon) {
    return items;
  }

  return items.filter((item) => item.id !== "combos");
}

export const combosComingSoonCopy = {
  eyebrow: "Próximamente",
  title: "Combos",
  description:
    "Estamos preparando los sets de decants. Vuelve pronto para comparar aromas con un mejor precio que comprarlos sueltos.",
} as const;

export const combosHero = {
  eyebrow: "Sets",
  title: "Tres aromas. Una decisión más clara.",
  text: "Combos de decants para comparar, rotar y llevar más de una fragancia — con un precio menor que comprarlos sueltos.",
  image: "/images/home/discover-combos.png",
} as const;

export const combosExplain = [
  {
    id: "varios",
    title: "Varios decants",
    text: "Cada set reúne tres piezas listas para probar en la piel, sin armar el pedido una por una.",
  },
  {
    id: "ahorro",
    title: "Mejor que sueltos",
    text: "El precio del set es menor que la suma de los viales. El ahorro aparece en cada card.",
  },
  {
    id: "ticket",
    title: "Una sola elección",
    text: "Date Night, Daily, Signature o Arabian: eliges un momento y sales con más de un aroma.",
  },
] as const;
