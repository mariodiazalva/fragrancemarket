import { getSignedInEmail } from "@/data-access/auth";
import { AdminShell } from "@/views/admin/AdminShell";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const email = await getSignedInEmail();

  return <AdminShell email={email}>{children}</AdminShell>;
}
