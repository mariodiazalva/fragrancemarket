import {
  acquaDiGioProfondo,
  acquaDiGioProfondoDecantSizes,
  acquaDiGioProfondoPerfumeSizes,
  acquaDiGioProfondoSlugs,
} from "@/data/acqua-di-gio-profondo";
import {
  odysseyAqua,
  odysseyAquaDecantSizes,
  odysseyAquaPerfumeSizes,
  odysseyAquaSlugs,
} from "@/data/odyssey-aqua";
import {
  khamrahQahwa,
  khamrahQahwaDecantSizes,
  khamrahQahwaPerfumeSizes,
  khamrahQahwaSlugs,
} from "@/data/khamrah-qahwa";
import {
  strongerWithYouDecantSizes,
  strongerWithYouIntensely,
  strongerWithYouPerfumeSizes,
  strongerWithYouSlugs,
} from "@/data/stronger-with-you";
import {
  valentinoBornInRoma,
  valentinoBornInRomaDecantSizes,
  valentinoBornInRomaPerfumeSizes,
  valentinoBornInRomaSlugs,
} from "@/data/valentino-born-in-roma";
import {
  lattafaYara,
  lattafaYaraDecantSizes,
  lattafaYaraPerfumeSizes,
  lattafaYaraSlugs,
} from "@/data/lattafa-yara";
import {
  afnan9pmNightOut,
  afnan9pmNightOutDecantSizes,
  afnan9pmNightOutPerfumeSizes,
  afnan9pmNightOutSlugs,
} from "@/data/afnan-9pm-night-out";
import {
  leMale,
  leMaleDecantSizes,
  leMalePerfumeSizes,
  leMaleSlugs,
} from "@/data/le-male";
import {
  xerjoffErbaPura,
  xerjoffErbaPuraDecantSizes,
  xerjoffErbaPuraPerfumeSizes,
  xerjoffErbaPuraSlugs,
} from "@/data/xerjoff-erba-pura";
import {
  carolinaHerrera212VipBlack,
  carolinaHerrera212VipBlackDecantSizes,
  carolinaHerrera212VipBlackPerfumeSizes,
  carolinaHerrera212VipBlackSlugs,
} from "@/data/carolina-herrera-212-vip-black";
import {
  frenchAvenueLiquidBrun,
  frenchAvenueLiquidBrunDecantSizes,
  frenchAvenueLiquidBrunPerfumeSizes,
  frenchAvenueLiquidBrunSlugs,
} from "@/data/french-avenue-liquid-brun";
import {
  alHaramainAmberOudGold,
  alHaramainAmberOudGoldDecantSizes,
  alHaramainAmberOudGoldPerfumeSizes,
  alHaramainAmberOudGoldSlugs,
} from "@/data/al-haramain-amber-oud-gold";
import {
  xerjoffNaxos,
  xerjoffNaxosDecantSizes,
  xerjoffNaxosPerfumeSizes,
  xerjoffNaxosSlugs,
} from "@/data/xerjoff-naxos";
import {
  strongerWithYouAbsolutely,
  strongerWithYouAbsolutelyDecantSizes,
  strongerWithYouAbsolutelyPerfumeSizes,
  strongerWithYouAbsolutelySlugs,
} from "@/data/stronger-with-you-absolutely";
import {
  valentinoBornInRomaExtradose,
  valentinoBornInRomaExtradoseDecantSizes,
  valentinoBornInRomaExtradosePerfumeSizes,
  valentinoBornInRomaExtradoseSlugs,
} from "@/data/valentino-born-in-roma-extradose";
import {
  valentinoBornInRomaCoralFantasy,
  valentinoBornInRomaCoralFantasyDecantSizes,
  valentinoBornInRomaCoralFantasyPerfumeSizes,
  valentinoBornInRomaCoralFantasySlugs,
} from "@/data/valentino-born-in-roma-coral-fantasy";
import {
  leBeauLeParfum,
  leBeauLeParfumDecantSizes,
  leBeauLeParfumPerfumeSizes,
  leBeauLeParfumSlugs,
} from "@/data/le-beau-le-parfum";
import {
  leMaleElixir,
  leMaleElixirDecantSizes,
  leMaleElixirPerfumeSizes,
  leMaleElixirSlugs,
} from "@/data/le-male-elixir";
import {
  odysseyMandarinSky,
  odysseyMandarinSkyDecantSizes,
  odysseyMandarinSkyPerfumeSizes,
  odysseyMandarinSkySlugs,
} from "@/data/odyssey-mandarin-sky";
import {
  lattafaKhamrah,
  lattafaKhamrahDecantSizes,
  lattafaKhamrahPerfumeSizes,
  lattafaKhamrahSlugs,
} from "@/data/lattafa-khamrah";
import type { Product, ProductSize } from "@/types";
import type { SetItem } from "@/types/content";

type CatalogReplacement = {
  legacyPerfumeKeys: Set<string>;
  legacyDecantKeys: Set<string>;
  perfumeSlug: string;
  decantSlug: string;
  content: Omit<
    Product,
    "id" | "slug" | "type" | "price" | "sizes" | "featured" | "bestseller" | "stock"
  > & {
    name: string;
    brand: string;
  };
  perfumeSizes: ProductSize[];
  decantSizes: ProductSize[];
  perfumePrice: number;
  decantPrice: number;
  perfumeStock: number;
  decantStock: number;
  injectDecantId?: string;
};

const replacements: CatalogReplacement[] = [
  {
    legacyPerfumeKeys: new Set([
      "oud-sable",
      "prod-oud",
      "c0000000-0000-4000-8000-000000000003",
    ]),
    legacyDecantKeys: new Set([
      "oud-sable-decant",
      "decant-oud-sable",
      "c0000000-0000-4000-8000-000000000012",
    ]),
    perfumeSlug: valentinoBornInRomaSlugs.perfume,
    decantSlug: valentinoBornInRomaSlugs.decant,
    content: valentinoBornInRoma,
    perfumeSizes: valentinoBornInRomaPerfumeSizes,
    decantSizes: valentinoBornInRomaDecantSizes,
    perfumePrice: 650,
    decantPrice: 45,
    perfumeStock: 6,
    decantStock: 18,
  },
  {
    legacyPerfumeKeys: new Set([
      "nocturne-absolu",
      "prod-nocturne",
      "c0000000-0000-4000-8000-000000000001",
    ]),
    legacyDecantKeys: new Set([
      "nocturne-absolu-decant",
      "decant-nocturne-absolu",
      "c0000000-0000-4000-8000-000000000009",
    ]),
    perfumeSlug: strongerWithYouSlugs.perfume,
    decantSlug: strongerWithYouSlugs.decant,
    content: strongerWithYouIntensely,
    perfumeSizes: strongerWithYouPerfumeSizes,
    decantSizes: strongerWithYouDecantSizes,
    perfumePrice: 515,
    decantPrice: 35,
    perfumeStock: 8,
    decantStock: 18,
  },
  {
    legacyPerfumeKeys: new Set([
      "velvet-ember",
      "prod-ember",
      "c0000000-0000-4000-8000-000000000006",
    ]),
    legacyDecantKeys: new Set([
      "velvet-ember-decant",
      "decant-velvet-ember",
      "c0000000-0000-4000-8000-000000000015",
    ]),
    perfumeSlug: khamrahQahwaSlugs.perfume,
    decantSlug: khamrahQahwaSlugs.decant,
    content: khamrahQahwa,
    perfumeSizes: khamrahQahwaPerfumeSizes,
    decantSizes: khamrahQahwaDecantSizes,
    perfumePrice: 165,
    decantPrice: 18,
    perfumeStock: 9,
    decantStock: 18,
  },
  {
    legacyPerfumeKeys: new Set([
      "amber-veil",
      "prod-amber",
      "c0000000-0000-4000-8000-000000000002",
    ]),
    legacyDecantKeys: new Set([
      "amber-veil-decant",
      "decant-amber-veil",
      "c0000000-0000-4000-8000-000000000011",
    ]),
    perfumeSlug: odysseyAquaSlugs.perfume,
    decantSlug: odysseyAquaSlugs.decant,
    content: odysseyAqua,
    perfumeSizes: odysseyAquaPerfumeSizes,
    decantSizes: odysseyAquaDecantSizes,
    perfumePrice: 170,
    decantPrice: 18,
    perfumeStock: 12,
    decantStock: 18,
  },
  {
    legacyPerfumeKeys: new Set([
      "rose-silence",
      "prod-rose",
      "c0000000-0000-4000-8000-000000000008",
    ]),
    legacyDecantKeys: new Set([
      "rose-silence-decant",
      "decant-rose-silence",
      "c0000000-0000-4000-8000-000000000016",
    ]),
    perfumeSlug: lattafaYaraSlugs.perfume,
    decantSlug: lattafaYaraSlugs.decant,
    content: lattafaYara,
    perfumeSizes: lattafaYaraPerfumeSizes,
    decantSizes: lattafaYaraDecantSizes,
    perfumePrice: 165,
    decantPrice: 30,
    perfumeStock: 7,
    decantStock: 18,
  },
  {
    legacyPerfumeKeys: new Set([
      "iris-quiet",
      "prod-iris",
      "c0000000-0000-4000-8000-000000000004",
    ]),
    legacyDecantKeys: new Set([
      "iris-quiet-decant",
      "decant-iris-quiet",
      "c0000000-0000-4000-8000-000000000013",
    ]),
    perfumeSlug: acquaDiGioProfondoSlugs.perfume,
    decantSlug: acquaDiGioProfondoSlugs.decant,
    content: acquaDiGioProfondo,
    perfumeSizes: acquaDiGioProfondoPerfumeSizes,
    decantSizes: acquaDiGioProfondoDecantSizes,
    perfumePrice: 550,
    decantPrice: 52,
    perfumeStock: 10,
    decantStock: 18,
  },
  {
    legacyPerfumeKeys: new Set([
      "citrus-atlas",
      "prod-citrus",
      "c0000000-0000-4000-8000-000000000005",
    ]),
    legacyDecantKeys: new Set([
      "citrus-atlas-decant",
      "decant-citrus-atlas",
      "c0000000-0000-4000-8000-000000000014",
    ]),
    perfumeSlug: afnan9pmNightOutSlugs.perfume,
    decantSlug: afnan9pmNightOutSlugs.decant,
    content: afnan9pmNightOut,
    perfumeSizes: afnan9pmNightOutPerfumeSizes,
    decantSizes: afnan9pmNightOutDecantSizes,
    perfumePrice: 230,
    decantPrice: 25,
    perfumeStock: 14,
    decantStock: 18,
  },
  {
    legacyPerfumeKeys: new Set([
      "salt-and-cedar",
      "prod-cedar",
      "c0000000-0000-4000-8000-000000000007",
    ]),
    legacyDecantKeys: new Set([
      "salt-and-cedar-decant",
      "decant-salt-and-cedar",
      "decant-le-male",
      "c0000000-0000-4000-8000-000000000022",
    ]),
    perfumeSlug: leMaleSlugs.perfume,
    decantSlug: leMaleSlugs.decant,
    content: leMale,
    perfumeSizes: leMalePerfumeSizes,
    decantSizes: leMaleDecantSizes,
    perfumePrice: 470,
    decantPrice: 30,
    perfumeStock: 11,
    decantStock: 18,
    injectDecantId: "c0000000-0000-4000-8000-000000000022",
  },
  {
    legacyPerfumeKeys: new Set([
      "bakhoor-night",
      "prod-bakhoor",
      "c0000000-0000-4000-8000-000000000010",
    ]),
    legacyDecantKeys: new Set([
      "bakhoor-night-decant",
      "decant-bakhoor-night",
      "c0000000-0000-4000-8000-000000000017",
    ]),
    perfumeSlug: xerjoffErbaPuraSlugs.perfume,
    decantSlug: xerjoffErbaPuraSlugs.decant,
    content: xerjoffErbaPura,
    perfumeSizes: xerjoffErbaPuraPerfumeSizes,
    decantSizes: xerjoffErbaPuraDecantSizes,
    perfumePrice: 960,
    decantPrice: 76,
    perfumeStock: 5,
    decantStock: 18,
  },
  {
    legacyPerfumeKeys: new Set([
      "212-vip-black",
      "prod-212-vip-black",
      "c0000000-0000-4000-8000-000000000023",
    ]),
    legacyDecantKeys: new Set([
      "212-vip-black-decant",
      "decant-212-vip-black",
      "c0000000-0000-4000-8000-000000000024",
    ]),
    perfumeSlug: carolinaHerrera212VipBlackSlugs.perfume,
    decantSlug: carolinaHerrera212VipBlackSlugs.decant,
    content: carolinaHerrera212VipBlack,
    perfumeSizes: carolinaHerrera212VipBlackPerfumeSizes,
    decantSizes: carolinaHerrera212VipBlackDecantSizes,
    perfumePrice: 430,
    decantPrice: 50,
    perfumeStock: 10,
    decantStock: 18,
    injectDecantId: "c0000000-0000-4000-8000-000000000024",
  },
  {
    legacyPerfumeKeys: new Set([
      "liquid-brun",
      "prod-liquid-brun",
      "c0000000-0000-4000-8000-000000000025",
    ]),
    legacyDecantKeys: new Set([
      "liquid-brun-decant",
      "decant-liquid-brun",
      "c0000000-0000-4000-8000-000000000026",
    ]),
    perfumeSlug: frenchAvenueLiquidBrunSlugs.perfume,
    decantSlug: frenchAvenueLiquidBrunSlugs.decant,
    content: frenchAvenueLiquidBrun,
    perfumeSizes: frenchAvenueLiquidBrunPerfumeSizes,
    decantSizes: frenchAvenueLiquidBrunDecantSizes,
    perfumePrice: 250,
    decantPrice: 32,
    perfumeStock: 10,
    decantStock: 18,
    injectDecantId: "c0000000-0000-4000-8000-000000000026",
  },
  {
    legacyPerfumeKeys: new Set([
      "amber-oud-gold-edition",
      "prod-amber-oud-gold",
      "c0000000-0000-4000-8000-000000000027",
    ]),
    legacyDecantKeys: new Set([
      "amber-oud-gold-edition-decant",
      "decant-amber-oud-gold-edition",
      "c0000000-0000-4000-8000-000000000028",
    ]),
    perfumeSlug: alHaramainAmberOudGoldSlugs.perfume,
    decantSlug: alHaramainAmberOudGoldSlugs.decant,
    content: alHaramainAmberOudGold,
    perfumeSizes: alHaramainAmberOudGoldPerfumeSizes,
    decantSizes: alHaramainAmberOudGoldDecantSizes,
    perfumePrice: 260,
    decantPrice: 35,
    perfumeStock: 10,
    decantStock: 18,
    injectDecantId: "c0000000-0000-4000-8000-000000000028",
  },
  {
    legacyPerfumeKeys: new Set([
      "naxos",
      "prod-naxos",
      "c0000000-0000-4000-8000-000000000029",
    ]),
    legacyDecantKeys: new Set([
      "naxos-decant",
      "decant-naxos",
      "c0000000-0000-4000-8000-000000000030",
    ]),
    perfumeSlug: xerjoffNaxosSlugs.perfume,
    decantSlug: xerjoffNaxosSlugs.decant,
    content: xerjoffNaxos,
    perfumeSizes: xerjoffNaxosPerfumeSizes,
    decantSizes: xerjoffNaxosDecantSizes,
    perfumePrice: 970,
    decantPrice: 63,
    perfumeStock: 10,
    decantStock: 18,
    injectDecantId: "c0000000-0000-4000-8000-000000000030",
  },
  {
    legacyPerfumeKeys: new Set([
      "stronger-with-you-absolutely",
      "prod-stronger-with-you-absolutely",
      "c0000000-0000-4000-8000-000000000031",
    ]),
    legacyDecantKeys: new Set([
      "stronger-with-you-absolutely-decant",
      "decant-stronger-with-you-absolutely",
      "c0000000-0000-4000-8000-000000000032",
    ]),
    perfumeSlug: strongerWithYouAbsolutelySlugs.perfume,
    decantSlug: strongerWithYouAbsolutelySlugs.decant,
    content: strongerWithYouAbsolutely,
    perfumeSizes: strongerWithYouAbsolutelyPerfumeSizes,
    decantSizes: strongerWithYouAbsolutelyDecantSizes,
    perfumePrice: 535,
    decantPrice: 37,
    perfumeStock: 10,
    decantStock: 18,
    injectDecantId: "c0000000-0000-4000-8000-000000000032",
  },
  {
    legacyPerfumeKeys: new Set([
      "born-in-roma-extradose",
      "prod-born-in-roma-extradose",
      "c0000000-0000-4000-8000-000000000033",
    ]),
    legacyDecantKeys: new Set([
      "born-in-roma-extradose-decant",
      "decant-born-in-roma-extradose",
      "c0000000-0000-4000-8000-000000000034",
    ]),
    perfumeSlug: valentinoBornInRomaExtradoseSlugs.perfume,
    decantSlug: valentinoBornInRomaExtradoseSlugs.decant,
    content: valentinoBornInRomaExtradose,
    perfumeSizes: valentinoBornInRomaExtradosePerfumeSizes,
    decantSizes: valentinoBornInRomaExtradoseDecantSizes,
    perfumePrice: 670,
    decantPrice: 45,
    perfumeStock: 10,
    decantStock: 18,
    injectDecantId: "c0000000-0000-4000-8000-000000000034",
  },
  {
    legacyPerfumeKeys: new Set([
      "born-in-roma-coral-fantasy",
      "prod-born-in-roma-coral-fantasy",
      "c0000000-0000-4000-8000-000000000035",
    ]),
    legacyDecantKeys: new Set([
      "born-in-roma-coral-fantasy-decant",
      "decant-born-in-roma-coral-fantasy",
      "c0000000-0000-4000-8000-000000000036",
    ]),
    perfumeSlug: valentinoBornInRomaCoralFantasySlugs.perfume,
    decantSlug: valentinoBornInRomaCoralFantasySlugs.decant,
    content: valentinoBornInRomaCoralFantasy,
    perfumeSizes: valentinoBornInRomaCoralFantasyPerfumeSizes,
    decantSizes: valentinoBornInRomaCoralFantasyDecantSizes,
    perfumePrice: 502,
    decantPrice: 35,
    perfumeStock: 10,
    decantStock: 18,
    injectDecantId: "c0000000-0000-4000-8000-000000000036",
  },
  {
    legacyPerfumeKeys: new Set([
      "le-beau-le-parfum",
      "prod-le-beau-le-parfum",
      "c0000000-0000-4000-8000-000000000037",
    ]),
    legacyDecantKeys: new Set([
      "le-beau-le-parfum-decant",
      "decant-le-beau-le-parfum",
      "c0000000-0000-4000-8000-000000000038",
    ]),
    perfumeSlug: leBeauLeParfumSlugs.perfume,
    decantSlug: leBeauLeParfumSlugs.decant,
    content: leBeauLeParfum,
    perfumeSizes: leBeauLeParfumPerfumeSizes,
    decantSizes: leBeauLeParfumDecantSizes,
    perfumePrice: 560,
    decantPrice: 35,
    perfumeStock: 10,
    decantStock: 18,
    injectDecantId: "c0000000-0000-4000-8000-000000000038",
  },
  {
    legacyPerfumeKeys: new Set([
      "le-male-elixir",
      "prod-le-male-elixir",
      "c0000000-0000-4000-8000-000000000039",
    ]),
    legacyDecantKeys: new Set([
      "le-male-elixir-decant",
      "decant-le-male-elixir",
      "c0000000-0000-4000-8000-000000000040",
    ]),
    perfumeSlug: leMaleElixirSlugs.perfume,
    decantSlug: leMaleElixirSlugs.decant,
    content: leMaleElixir,
    perfumeSizes: leMaleElixirPerfumeSizes,
    decantSizes: leMaleElixirDecantSizes,
    perfumePrice: 541,
    decantPrice: 34,
    perfumeStock: 10,
    decantStock: 18,
    injectDecantId: "c0000000-0000-4000-8000-000000000040",
  },
  {
    legacyPerfumeKeys: new Set([
      "odyssey-mandarin-sky",
      "prod-odyssey-mandarin-sky",
      "c0000000-0000-4000-8000-000000000041",
    ]),
    legacyDecantKeys: new Set([
      "odyssey-mandarin-sky-decant",
      "decant-odyssey-mandarin-sky",
      "c0000000-0000-4000-8000-000000000042",
    ]),
    perfumeSlug: odysseyMandarinSkySlugs.perfume,
    decantSlug: odysseyMandarinSkySlugs.decant,
    content: odysseyMandarinSky,
    perfumeSizes: odysseyMandarinSkyPerfumeSizes,
    decantSizes: odysseyMandarinSkyDecantSizes,
    perfumePrice: 155,
    decantPrice: 18,
    perfumeStock: 10,
    decantStock: 18,
    injectDecantId: "c0000000-0000-4000-8000-000000000042",
  },
  {
    legacyPerfumeKeys: new Set([
      "khamrah",
      "prod-khamrah",
      "c0000000-0000-4000-8000-000000000043",
    ]),
    legacyDecantKeys: new Set([
      "khamrah-decant",
      "decant-khamrah",
      "c0000000-0000-4000-8000-000000000044",
    ]),
    perfumeSlug: lattafaKhamrahSlugs.perfume,
    decantSlug: lattafaKhamrahSlugs.decant,
    content: lattafaKhamrah,
    perfumeSizes: lattafaKhamrahPerfumeSizes,
    decantSizes: lattafaKhamrahDecantSizes,
    perfumePrice: 130,
    decantPrice: 32,
    perfumeStock: 10,
    decantStock: 18,
    injectDecantId: "c0000000-0000-4000-8000-000000000044",
  },
];

export const productSlugAliases: Record<string, string> = Object.fromEntries(
  replacements.flatMap((replacement) => [
    ...[...replacement.legacyPerfumeKeys]
      .filter((key) => !key.startsWith("prod-") && !key.startsWith("c000"))
      .map((key) => [key, replacement.perfumeSlug]),
    ...[...replacement.legacyDecantKeys]
      .filter((key) => !key.startsWith("decant-") && !key.startsWith("c000"))
      .map((key) => [key, replacement.decantSlug]),
  ]),
);

export function applySetItemOverride(item: SetItem): SetItem {
  for (const replacement of replacements) {
    if (
      replacement.legacyDecantKeys.has(item.slug) ||
      replacement.legacyDecantKeys.has(item.productId)
    ) {
      return {
        ...item,
        slug: replacement.decantSlug,
        name: replacement.content.name,
        brand: replacement.content.brand,
        individualPrice: replacement.decantPrice,
      };
    }
  }

  return item;
}

export function injectMissingDecants(products: Product[]): Product[] {
  const slugs = new Set(products.map((product) => product.slug));
  const extras: Product[] = [];

  for (const replacement of replacements) {
    if (!replacement.injectDecantId) {
      continue;
    }

    if (slugs.has(replacement.decantSlug) || !slugs.has(replacement.perfumeSlug)) {
      continue;
    }

    extras.push({
      id: replacement.injectDecantId,
      ...replacement.content,
      slug: replacement.decantSlug,
      type: "decant",
      price: replacement.decantPrice,
      compareAtPrice: undefined,
      sizes: replacement.decantSizes,
      featured: false,
      bestseller: false,
      stock: replacement.decantStock,
    });
  }

  return extras.length ? [...products, ...extras] : products;
}

export function applyProductOverride(product: Product): Product {
  for (const replacement of replacements) {
    if (
      product.slug === replacement.perfumeSlug ||
      replacement.legacyPerfumeKeys.has(product.slug) ||
      replacement.legacyPerfumeKeys.has(product.id)
    ) {
      return {
        ...product,
        ...replacement.content,
        slug: replacement.perfumeSlug,
        type: "perfume",
        price: replacement.perfumePrice,
        compareAtPrice: undefined,
        sizes: replacement.perfumeSizes,
        stock: replacement.perfumeStock,
      };
    }

    if (
      product.slug === replacement.decantSlug ||
      replacement.legacyDecantKeys.has(product.slug) ||
      replacement.legacyDecantKeys.has(product.id)
    ) {
      return {
        ...product,
        ...replacement.content,
        slug: replacement.decantSlug,
        type: "decant",
        price: replacement.decantPrice,
        compareAtPrice: undefined,
        sizes: replacement.decantSizes,
        featured: false,
        stock: replacement.decantStock,
      };
    }
  }

  return product;
}
