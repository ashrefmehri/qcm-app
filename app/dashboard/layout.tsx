import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full  ">
        <DashboardSidebar />
        <main className="flex-1 items-center">
          <DashboardNavbar />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
