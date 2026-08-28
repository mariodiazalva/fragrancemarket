export const peruDepartments = [
  "Amazonas",
  "Áncash",
  "Apurímac",
  "Arequipa",
  "Ayacucho",
  "Cajamarca",
  "Callao",
  "Cusco",
  "Huancavelica",
  "Huánuco",
  "Ica",
  "Junín",
  "La Libertad",
  "Lambayeque",
  "Lima",
  "Loreto",
  "Madre de Dios",
  "Moquegua",
  "Pasco",
  "Piura",
  "Puno",
  "San Martín",
  "Tacna",
  "Tumbes",
  "Ucayali",
] as const;

export type PeruDepartment = (typeof peruDepartments)[number];

export const shippingCarriers = ["Shalom", "Pickup", "Local"] as const;

export type ShippingCarrier = (typeof shippingCarriers)[number];

export type ShippingAddress = {
  line: string;
  district?: string;
  city: string;
  department: PeruDepartment;
  carrier?: ShippingCarrier;
  agencyId?: string;
};

export const STORE_PICKUP = {
  line: "Rosas de América MZ D LT 3 Grupo 1",
  district: "Trujillo",
  city: "Trujillo",
  department: "La Libertad",
  carrier: "Pickup",
  lat: -8.090927,
  lng: -79.0509975,
} as const satisfies ShippingAddress & { lat: number; lng: number };

export function storePickupMapEmbedUrl(): string {
  return `https://maps.google.com/maps?q=${STORE_PICKUP.lat},${STORE_PICKUP.lng}&hl=es&z=16&output=embed`;
}

export function storePickupMapsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${STORE_PICKUP.line}, ${STORE_PICKUP.city}, ${STORE_PICKUP.department}, Perú`,
  )}`;
}

export function isShippingCarrier(value: string): value is ShippingCarrier {
  return (shippingCarriers as readonly string[]).includes(value);
}

export type BillingAddress = {
  line: string;
  district?: string;
  city: string;
  department: PeruDepartment;
  dni: string;
};

export function isPeruDepartment(value: string): value is PeruDepartment {
  return (peruDepartments as readonly string[]).includes(value);
}

export function formatShippingAddress(address: ShippingAddress): string {
  return [address.line, address.district, address.city, address.department]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" · ");
}

export function parseShippingAddress(value: unknown): ShippingAddress | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const row = value as Record<string, unknown>;
  const line = typeof row.line === "string" ? row.line.trim() : "";
  const district = typeof row.district === "string" ? row.district.trim() : "";
  const city = typeof row.city === "string" ? row.city.trim() : "";
  const department = typeof row.department === "string" ? row.department.trim() : "";
  const agencyId = typeof row.agencyId === "string" ? row.agencyId.trim() : "";
  const rawCarrier = typeof row.carrier === "string" ? row.carrier.trim() : "";
  const carrier = isShippingCarrier(rawCarrier) ? rawCarrier : undefined;

  if (!line || !city || !isPeruDepartment(department)) {
    return null;
  }

  if (line.length > 160 || city.length > 80 || district.length > 80) {
    return null;
  }

  return {
    line,
    city,
    department,
    ...(district ? { district } : {}),
    ...(carrier ? { carrier } : {}),
    ...(agencyId ? { agencyId } : {}),
  };
}

export function formatBillingAddress(address: BillingAddress): string {
  return [address.line, address.district, address.city, address.department, `DNI ${address.dni}`]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" · ");
}

export function parseBillingAddress(value: unknown): BillingAddress | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const row = value as Record<string, unknown>;
  const line = typeof row.line === "string" ? row.line.trim() : "";
  const district = typeof row.district === "string" ? row.district.trim() : "";
  const city = typeof row.city === "string" ? row.city.trim() : "";
  const department = typeof row.department === "string" ? row.department.trim() : "";
  const dni = typeof row.dni === "string" ? row.dni.replace(/\D/g, "") : "";

  if (!line || !city || !isPeruDepartment(department)) {
    return null;
  }

  if (line.length < 5 || line.length > 160 || city.length > 80 || district.length > 80) {
    return null;
  }

  if (dni.length < 8 || dni.length > 9) {
    return null;
  }

  return {
    line,
    city,
    department,
    dni,
    ...(district ? { district } : {}),
  };
}
