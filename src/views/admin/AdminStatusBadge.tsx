import { cn } from "@/lib/utils";
import { orderStatusLabel } from "@/types/order";

const statusClasses: Record<string, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-900",
  paid: "border-emerald-200 bg-emerald-50 text-emerald-900",
  processing: "border-sky-200 bg-sky-50 text-sky-900",
  shipped: "border-indigo-200 bg-indigo-50 text-indigo-900",
  delivered: "border-elova-border bg-elova-cream-deep text-text-secondary",
  cancelled: "border-red-200 bg-red-50 text-red-800",
};

export function AdminStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-1 text-[0.65rem] font-medium uppercase tracking-[0.12em]",
        statusClasses[status] ?? statusClasses.delivered,
      )}
    >
      {orderStatusLabel(status)}
    </span>
  );
}
