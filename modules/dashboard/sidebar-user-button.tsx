import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, CreditCard, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/generated-avatar";
import { Skeleton } from "@/components/ui/skeleton";

export const SidebarUserButton = () => {
  const { data, isPending } = authClient.useSession();

  const router = useRouter();
  const isMobile = useIsMobile();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return (
      <div className="rounded-lg cursor-pointer border border-border/90 p-3 overflow-hidden flex items-center justify-between ">
 <div className="flex items-center space-x-2">
      <Skeleton className="h-9 w-9 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-27" />
        <Skeleton className="h-3 w-33" />
      </div>
    </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg cursor-pointer border border-border/90 p-3 overflow-hidden flex items-center justify-between hover:bg-muted">
          <UserAvatar seed={data.user.name} className="size-9 mr-3" />

          <div className="flex flex-col  text-left overflow-hidden flex-1 min-w-0">
            <p className="text-[14px] capitalize tracking-tight truncate font-medium">
              {data.user.name}
            </p>
            <p className="text-[13px] tracking-tight truncate font-medium">
              {data.user.email}
            </p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex flex-col items-start">
            <span className="font-medium capitalize  tracking-tight truncate">
              {data.user.name}
            </span>
            <span className="text-xs  font-normal text-muted-foreground truncate">
              {data.user.email}
            </span>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="outline"
              className="flex cursor-pointer items-center justify-between"
            >
              Billing
              <CreditCard />
            </Button>
            <Button
              onClick={onLogout}
              variant="outline"
              className="flex cursor-pointer items-center justify-between"
            >
              Logout
              <LogOut />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg cursor-pointer border border-border/90 p-3 overflow-hidden flex items-center justify-between ">
        <UserAvatar seed={data.user.name} className="size-9 mr-3" />
        <div className="flex flex-col  text-left overflow-hidden flex-1 min-w-0">
          <p className="text-[13px] text-indigo-950 capitalize tracking-tight truncate font-semibold">
            {data.user.name}
          </p>
          <p className="text-xs tracking-tight text-gray-600 truncate font-semibold">
            {data.user.email}
          </p>
        </div>
        <ChevronDownIcon className="size-4 text-indigo-950 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium capitalize tracking-tight truncate">
              {data.user.name}
            </span>
            <span className="text-xs  font-normal text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex cursor-pointer items-center justify-between">
          Billing
          <CreditCard />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          className="flex cursor-pointer items-center justify-between"
        >
          Logout
          <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
