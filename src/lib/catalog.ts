import type {
  CatalogQuery,
  ProductCategory,
  ProductGender,
  ProductSort,
  ProductType,
} from "@/types";

export type CatalogRouteId =
  | "perfumes"
  | "decants"
  | "hombre"
  | "mujer"
  | "unisex"
  | "arabes"
  | "disenador"
  | "nicho"
  | "combos";

export const occasionSlugs = [
  "diario",
  "cita",
  "fiesta",
  "formal",
  "noche",
] as const;

export type OccasionSlug = (typeof occasionSlugs)[number];

export type CatalogFilterGroup =
  | "gender"
  | "brand"
  | "price"
  | "type"
  | "category"
  | "family"
  | "occasion"
  | "size";

export type CatalogPageConfig = {
  title: string;
  description: string;
  preset: CatalogQuery;
  locked: Array<keyof CatalogQuery>;
  filterGroups?: CatalogFilterGroup[];
};

export const defaultFilterGroups: CatalogFilterGroup[] = [
  "gender",
  "brand",
  "price",
  "type",
  "family",
  "occasion",
  "size",
];

export const categoryLabels: Partial<Record<ProductCategory, string>> = {
  arabian: "Árabe",
  designer: "Diseñador",
  niche: "Nicho",
};

export const styleCategories = ["arabian", "designer", "niche"] as const;

export const catalogPages: Record<CatalogRouteId, CatalogPageConfig> = {
  perfumes: {
    title: "Perfumes",
    description: "Frascos completos seleccionados para Fragrance Market.",
    preset: { type: "perfume" },
    locked: ["type"],
  },
  decants: {
    title: "Decants",
    description:
      "Conoce el aroma antes del frasco. Prueba una fragancia en 3 ml, 5 ml o 10 ml.",
    preset: { type: "decant" },
    locked: ["type"],
    filterGroups: ["gender", "category", "price", "family", "occasion"],
  },
  hombre: {
    title: "Hombre",
    description: "Composiciones con carácter, de diario a noche.",
    preset: { gender: "masculine", type: "perfume" },
    locked: ["gender", "type"],
  },
  mujer: {
    title: "Mujer",
    description: "Florales, suaves o intensas, según el momento.",
    preset: { gender: "feminine", type: "perfume" },
    locked: ["gender", "type"],
  },
  unisex: {
    title: "Unisex",
    description: "Piezas que no se definen por género.",
    preset: { gender: "unisex", type: "perfume" },
    locked: ["gender", "type"],
  },
  arabes: {
    title: "Árabes",
    description: "Ouds, resinas y firmas de Oriente.",
    preset: { category: "arabian", type: "perfume" },
    locked: ["category", "type"],
  },
  disenador: {
    title: "Diseñador",
    description: "Firmas de diseñador en la selección Fragrance Market.",
    preset: { category: "designer", type: "perfume" },
    locked: ["category", "type"],
  },
  nicho: {
    title: "Nicho",
    description: "Composiciones de autor en la selección Fragrance Market.",
    preset: { category: "niche", type: "perfume" },
    locked: ["category", "type"],
  },
  combos: {
    title: "Sets",
    description:
      "Combos de decants Date Night, Daily, Signature y Arabian. Más aromas, mejor precio que comprarlos sueltos.",
    preset: { type: "set" },
    locked: ["type"],
  },
};

export const sortOptions: Array<{ value: ProductSort; label: string }> = [
  { value: "recommended", label: "Recomendados" },
  { value: "bestsellers", label: "Más vendidos" },
  { value: "newest", label: "Novedades" },
  { value: "price-asc", label: "Precio menor" },
  { value: "price-desc", label: "Precio mayor" },
];

export const genderLabels: Record<ProductGender, string> = {
  masculine: "Hombre",
  feminine: "Mujer",
  unisex: "Unisex",
};

const occasionFilterGroups: CatalogFilterGroup[] = [
  "gender",
  "brand",
  "price",
  "type",
  "family",
  "size",
];

export const occasionPages: Record<OccasionSlug, CatalogPageConfig> = {
  diario: {
    title: "Diario",
    description: "Fragancias para el ritmo de cada día.",
    preset: { occasion: "diario" },
    locked: ["occasion"],
    filterGroups: occasionFilterGroups,
  },
  cita: {
    title: "Cita",
    description: "Composiciones pensadas para un encuentro.",
    preset: { occasion: "cita" },
    locked: ["occasion"],
    filterGroups: occasionFilterGroups,
  },
  fiesta: {
    title: "Fiesta",
    description: "Piezas con más presencia para salir.",
    preset: { occasion: "fiesta" },
    locked: ["occasion"],
    filterGroups: occasionFilterGroups,
  },
  formal: {
    title: "Formal",
    description: "Firmas para ocasiones formales.",
    preset: { occasion: "formal" },
    locked: ["occasion"],
    filterGroups: occasionFilterGroups,
  },
  noche: {
    title: "Noche",
    description: "Aromas para después del día.",
    preset: { occasion: "noche" },
    locked: ["occasion"],
    filterGroups: occasionFilterGroups,
  },
};

export const occasionLabels: Record<OccasionSlug, string> = {
  diario: "Diario",
  cita: "Cita",
  fiesta: "Fiesta",
  formal: "Formal",
  noche: "Noche",
};

export function isOccasionSlug(value: string): value is OccasionSlug {
  return (occasionSlugs as readonly string[]).includes(value);
}

export const typeLabels: Record<ProductType, string> = {
  perfume: "Perfume",
  decant: "Decant",
  set: "Set",
};

type SearchParamRecord = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function toNumber(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function parseCatalogParams(params: SearchParamRecord): CatalogQuery {
  const sort = firstValue(params.sort);
  const gender = firstValue(params.gender);
  const type = firstValue(params.type);
  const category = firstValue(params.category);

  return {
    query: firstValue(params.q)?.trim() || undefined,
    gender: isGender(gender) ? gender : undefined,
    brand: firstValue(params.brand) || undefined,
    minPrice: toNumber(firstValue(params.min)),
    maxPrice: toNumber(firstValue(params.max)),
    type: isType(type) ? type : undefined,
    fragranceFamily: firstValue(params.family) || undefined,
    occasion: firstValue(params.occasion) || undefined,
    size: toNumber(firstValue(params.size)),
    sort: isSort(sort) ? sort : "recommended",
    category: isCategory(category) ? category : undefined,
  };
}

export function catalogQueryToSearchParams(
  query: CatalogQuery,
  locked: Array<keyof CatalogQuery> = [],
): URLSearchParams {
  const params = new URLSearchParams();

  const entries: Array<[string, string | number | undefined, keyof CatalogQuery]> = [
    ["q", query.query, "query"],
    ["gender", query.gender, "gender"],
    ["brand", query.brand, "brand"],
    ["min", query.minPrice, "minPrice"],
    ["max", query.maxPrice, "maxPrice"],
    ["type", query.type, "type"],
    ["family", query.fragranceFamily, "fragranceFamily"],
    ["occasion", query.occasion, "occasion"],
    ["size", query.size, "size"],
    ["category", query.category, "category"],
    ["sort", query.sort === "recommended" ? undefined : query.sort, "sort"],
  ];

  for (const [key, value, field] of entries) {
    if (locked.includes(field) || value === undefined || value === "") {
      continue;
    }

    params.set(key, String(value));
  }

  return params;
}

export function countActiveFilters(
  query: CatalogQuery,
  locked: Array<keyof CatalogQuery> = [],
): number {
  const fields: Array<keyof CatalogQuery> = [
    "query",
    "gender",
    "brand",
    "minPrice",
    "maxPrice",
    "type",
    "fragranceFamily",
    "occasion",
    "size",
    "category",
  ];

  return fields.filter((field) => {
    if (locked.includes(field)) {
      return false;
    }

    return query[field] !== undefined && query[field] !== "";
  }).length;
}

function isGender(value?: string): value is ProductGender {
  return value === "masculine" || value === "feminine" || value === "unisex";
}

function isType(value?: string): value is ProductType {
  return value === "perfume" || value === "decant" || value === "set";
}

function isCategory(value?: string): value is ProductCategory {
  return (
    value === "full-bottle" ||
    value === "decant" ||
    value === "arabian" ||
    value === "designer" ||
    value === "niche" ||
    value === "decant-set"
  );
}

function isSort(value?: string): value is ProductSort {
  return (
    value === "recommended" ||
    value === "bestsellers" ||
    value === "newest" ||
    value === "price-asc" ||
    value === "price-desc"
  );
}
