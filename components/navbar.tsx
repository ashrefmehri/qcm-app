import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import {  Menu } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="w-full h-16 p-4  flex items-center justify-between ">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={150} height={50} />
      </Link>
      <Link href="/sign-in" className="md:flex hidden">
        <Button className="">
           Let’s Practice!
        </Button>
      </Link>
      <Menu className="size-7 text-secondary flex md:hidden cu" />
    </div>
  );
};
