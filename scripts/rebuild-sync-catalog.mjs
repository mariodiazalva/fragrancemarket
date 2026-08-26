import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  "patch-stronger-with-you.sql",
  "patch-odyssey-aqua.sql",
  "patch-valentino-born-in-roma.sql",
  "patch-khamrah-qahwa.sql",
  "patch-acqua-di-gio-profondo.sql",
  "patch-afnan-9pm-night-out.sql",
  "patch-le-male.sql",
  "patch-lattafa-yara.sql",
  "patch-xerjoff-erba-pura.sql",
];

const header = `-- Sync live Supabase with the edited catalog and prices.
-- SQL Editor -> New query -> copy this file from Cursor -> Run.
-- Safe to re-run.

`;

const body = files
  .map((file) => {
    const sql = readFileSync(join(root, "supabase", file), "utf8").replace(/^\uFEFF/, "");
    return `\n-- ===== ${file} =====\n${sql.trim()}\n`;
  })
  .join("\n");

writeFileSync(join(root, "supabase", "sync-live-catalog.sql"), header + body, "utf8");
console.log("Rebuilt supabase/sync-live-catalog.sql as UTF-8");
