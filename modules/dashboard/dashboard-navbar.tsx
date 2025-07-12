"use client";

import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  BellRingIcon,
  LogOut,
  Menu,
  PanelLeftCloseIcon,
  PanelLeftIcon,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { StudentMenu } from "@/lib/sidebar-menus";

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();

  const router = useRouter();
  const pathname = usePathname();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <div className="md:border-b bg-white h-16 p-3 gap-x-5 flex items-center justify-between ">
      <div className="flex items-center gap-x-3 md:gap-x-6">
        <Button
          className="size-9 shadow-none "
          onClick={toggleSidebar}
          variant="outline"
        >
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>

        <div className="text-indigo-950 tracking-tight font-bold text-2xl">
          {StudentMenu.map(
            (elem) =>
              pathname === elem.href && <h1 key={elem.href}>{elem.name}</h1>
          )}
        </div>
        <div className="">
          <Input
            className="md:min-w-[300px] md:flex hidden"
            placeholder="Search ..."
          />
        </div>
      </div>
      <div className="flex items-center md:mr-5 gap-x-2">
        <div className=" text-indigo-950 hover:bg-gray-200/60 cursor-pointer p-2 rounded-full">
          <BellRingIcon className="size-5" />
        </div>
        <div
          onClick={onLogout}
          className="  text-indigo-950 hover:bg-gray-200/60 cursor-pointer p-2 rounded-full"
        >
          <LogOut className="size-5" />
        </div>
      </div>
    </div>
  );
};
