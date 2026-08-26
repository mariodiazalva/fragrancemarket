"use client";

import { useMemo } from "react";

import {
  filterShalomAgencies,
  groupShalomAgencies,
  type ShalomAgency,
} from "@/lib/shalom";

type ShalomAgencyPickerProps = {
  department: string;
  district: string;
  city: string;
  selectedId: string;
  onSelect: (agency: ShalomAgency) => void;
};

export function ShalomAgencyPicker({
  department,
  district,
  city,
  selectedId,
  onSelect,
}: ShalomAgencyPickerProps) {
  const matches = useMemo(
    () => filterShalomAgencies(district, city, department),
    [city, department, district],
  );
  const groups = useMemo(() => groupShalomAgencies(matches), [matches]);
  const hasLocation = Boolean(department && (city || district));

  return (
    <fieldset className="space-y-3">
      <legend className="text-xs font-medium uppercase tracking-[0.14em] text-text-secondary">
        Agencia Shalom
      </legend>
      <p className="text-sm leading-relaxed text-text-secondary">
        El envío es por agencia Shalom a todo el Perú. Elige departamento, ciudad
        y distrito para ver las agencias disponibles.
      </p>

      {!hasLocation ? (
        <p className="border border-elova-border bg-surface px-4 py-3 text-sm text-text-secondary">
          Elige tu departamento y ciudad para ver las agencias Shalom.
        </p>
      ) : matches.length === 0 ? (
        <p className="border border-elova-border bg-surface px-4 py-3 text-sm text-text-secondary">
          No hay agencias Shalom listadas para esa zona. Si tu distrito no
          aparece, llama al (01) 500 7878 para confirmar la agencia más cercana.
        </p>
      ) : (
        <div className="max-h-[28rem] space-y-5 overflow-y-auto border border-elova-border bg-surface p-4">
          <p className="text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
            {matches.length} {matches.length === 1 ? "agencia" : "agencias"}
            {!district && matches.length > 8 ? " · elige el distrito para acotar" : ""}
          </p>
          {groups.map((group) => (
            <div key={group.district}>
              {groups.length > 1 ? (
                <p className="text-[0.7rem] uppercase tracking-[0.14em] text-elova-gold">
                  {group.district}
                </p>
              ) : null}
              <ul className={groups.length > 1 ? "mt-2 space-y-2" : "space-y-2"}>
                {group.agencies.map((agency) => {
                  const inputId = `agency-${agency.id}`;
                  const checked = selectedId === agency.id;

                  return (
                    <li key={agency.id}>
                      <label
                        htmlFor={inputId}
                        className={[
                          "flex cursor-pointer gap-3 border px-3 py-3 text-sm leading-relaxed",
                          checked
                            ? "border-elova-gold bg-surface-elevated text-text-primary"
                            : "border-elova-border text-text-secondary hover:border-elova-gold/40",
                        ].join(" ")}
                      >
                        <input
                          id={inputId}
                          type="radio"
                          name="agencyId"
                          value={agency.id}
                          required
                          checked={checked}
                          onChange={() => onSelect(agency)}
                          className="mt-1 shrink-0 accent-elova-gold"
                        />
                        <span>
                          <span className="block text-text-primary">{agency.address}</span>
                          <span className="mt-1 block text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
                            {agency.district} · {agency.city} · {agency.region}
                          </span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
}
