"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { StudentMenu } from "@/lib/sidebar-menus";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarUserButton } from "./sidebar-user-button";

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div>
          <Image src="/logo.svg" alt="Logo" width={150} height={50} />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 mt-6">
        <SidebarMenu className="gap-y-2">
          {StudentMenu.map((elem) => (
            <SidebarMenuItem key={elem.href}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "flex items-center gap-x-2 text-secondary rounded-lg hover:bg-gray-200 px-2 py-2.5 h-auto",
                  pathname === elem.href &&
                    "rounded-lg bg-gray-200/60 text-primary"
                )}
              >
                <Link href={elem.href}>
                  <elem.icon className="size-8" />
                  <span className="tracking-tight text-[15px] font-semibold">
                    {elem.name}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
