import type { PeruDepartment } from "@/lib/shipping";
import { normalizeSearch } from "@/lib/utils";

export const TRUJILLO_CITY = "Trujillo";
export const TRUJILLO_DEPARTMENT: PeruDepartment = "La Libertad";

export const TRUJILLO_DISTRICTS = [
  "Trujillo",
  "Víctor Larco Herrera",
  "Florencia de Mora",
  "La Esperanza",
  "El Porvenir",
  "Moche",
  "Huanchaco",
  "Salaverry",
  "Laredo",
  "Poroto",
  "Simbal",
] as const;

export type TrujilloDistrict = (typeof TRUJILLO_DISTRICTS)[number];
export type TrujilloDeliveryAmount = 5 | 8 | 10;
export type TrujilloZone = "center" | "mid" | "far";

export type TrujilloDeliveryQuote = {
  amount: TrujilloDeliveryAmount;
  zone: TrujilloZone;
  label: string;
};

/**
 * Distances from Plaza de Armas de Trujillo (~-8.116, -79.030):
 * centro / Víctor Larco / Florencia de Mora ≈ 0–4 km
 * La Esperanza, El Porvenir, Moche ≈ 5–8 km
 * Huanchaco, Salaverry, Laredo y rurales ≈ 11–30 km
 */
const DISTRICT_ZONE: Record<string, TrujilloZone> = {
  trujillo: "center",
  "victor larco herrera": "center",
  "victor larco": "center",
  "florencia de mora": "center",
  "la esperanza": "mid",
  "el porvenir": "mid",
  moche: "mid",
  huanchaco: "far",
  salaverry: "far",
  laredo: "far",
  poroto: "far",
  simbal: "far",
};

const FAR_KEYWORDS = [
  "huanchaco",
  "huanchaquito",
  "las delicias",
  "salaverry",
  "laredo",
  "alto trujillo",
  "el milagro",
  "wichanzao",
  "poroto",
  "simbal",
  "aeropuerto",
  "buenos aires de huanchaco",
  "el golf",
  "las palmas",
];

const MID_KEYWORDS = [
  "la esperanza",
  "el porvenir",
  "moche",
  "la noria",
  "aranjuez",
  "san salvador",
  "los jardines",
  "primavera",
  "rosas de america",
  "rosa de america",
  "metropolitana",
  "san isidro",
  "parque industrial",
  "mampuesto",
  "fatima",
];

const ZONE_AMOUNT: Record<TrujilloZone, TrujilloDeliveryAmount> = {
  center: 5,
  mid: 8,
  far: 10,
};

const ZONE_LABEL: Record<TrujilloZone, string> = {
  center: "Zona céntrica",
  mid: "Zona intermedia",
  far: "Zona alejada",
};

export function isTrujilloCity(value: string): boolean {
  return normalizeSearch(value) === normalizeSearch(TRUJILLO_CITY);
}

export function isTrujilloDeliveryDistrict(value: string): value is TrujilloDistrict {
  const needle = normalizeSearch(value);
  return TRUJILLO_DISTRICTS.some((district) => normalizeSearch(district) === needle);
}

function haystackContains(haystack: string, keyword: string): boolean {
  return haystack.includes(normalizeSearch(keyword));
}

export function quoteTrujilloDelivery(
  district: string,
  line = "",
): TrujilloDeliveryQuote | null {
  const districtKey = normalizeSearch(district);
  const districtZone = DISTRICT_ZONE[districtKey];

  if (!districtZone) {
    return null;
  }

  const haystack = `${district} ${line}`;
  let zone: TrujilloZone = districtZone;

  if (FAR_KEYWORDS.some((keyword) => haystackContains(haystack, keyword))) {
    zone = "far";
  } else if (MID_KEYWORDS.some((keyword) => haystackContains(haystack, keyword))) {
    zone = zone === "far" ? "far" : "mid";
  }

  return {
    amount: ZONE_AMOUNT[zone],
    zone,
    label: ZONE_LABEL[zone],
  };
}
