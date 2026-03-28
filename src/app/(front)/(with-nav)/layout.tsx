import { AppNavbar } from "@/components/layout/front/AppNavbar";
import { AppFooter } from "@/components/layout/front/AppFooter";

export default function WithNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppNavbar />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  );
}
