import { shalomAgencyGroups } from "@/data/shalom-agencies";
import type { PeruDepartment } from "@/lib/shipping";
import { slugify } from "@/lib/utils";

export type ShalomAgency = {
  id: string;
  region: PeruDepartment;
  province: string;
  district: string;
  city: string;
  address: string;
  aliases: string[];
};

function expandAgencies(): ShalomAgency[] {
  return shalomAgencyGroups.flatMap((group) =>
    group.addresses.map((address, index) => ({
      id: `${slugify(group.region)}-${slugify(group.district)}-${index}`,
      region: group.region,
      province: group.province,
      district: group.district,
      city: group.city,
      address,
      aliases: [...group.aliases],
    })),
  );
}

export const shalomAgencies: ShalomAgency[] = expandAgencies();

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "es"));
}

export function listShalomCities(department: string): string[] {
  return uniqueSorted(
    shalomAgencies.filter((agency) => agency.region === department).map((agency) => agency.city),
  );
}

export function listShalomDistricts(department: string, city: string): string[] {
  return uniqueSorted(
    shalomAgencies
      .filter((agency) => agency.region === department && (!city || agency.city === city))
      .map((agency) => agency.district),
  );
}

export function filterShalomAgencies(
  district: string,
  city: string,
  department = "",
): ShalomAgency[] {
  if (!department && !city && !district) {
    return [];
  }

  return shalomAgencies.filter((agency) => {
    if (department && agency.region !== department) {
      return false;
    }

    if (city && agency.city !== city) {
      return false;
    }

    if (district && agency.district !== district) {
      return false;
    }

    return true;
  });
}

export function findShalomAgency(id: string): ShalomAgency | undefined {
  return shalomAgencies.find((agency) => agency.id === id);
}

export function shippingLineForAgency(agency: ShalomAgency): string {
  const labeled = `Shalom · ${agency.district}: ${agency.address}`;

  if (labeled.length <= 160) {
    return labeled;
  }

  if (agency.address.length <= 160) {
    return agency.address;
  }

  return `${agency.address.slice(0, 157)}...`;
}

export function groupShalomAgencies(
  agencies: ShalomAgency[],
): Array<{ district: string; agencies: ShalomAgency[] }> {
  const groups = new Map<string, ShalomAgency[]>();

  for (const agency of agencies) {
    const current = groups.get(agency.district) ?? [];
    current.push(agency);
    groups.set(agency.district, current);
  }

  return [...groups.entries()].map(([district, items]) => ({
    district,
    agencies: items,
  }));
}
