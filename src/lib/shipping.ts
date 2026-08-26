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

export type ShippingAddress = {
  line: string;
  district?: string;
  city: string;
  department: PeruDepartment;
  carrier?: "Shalom";
  agencyId?: string;
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
  const carrier = row.carrier === "Shalom" ? "Shalom" : undefined;

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
