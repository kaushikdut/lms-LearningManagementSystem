"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import SearchBar from "../(routes)/search/_components/searchBar";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  const pathname = usePathname();
  const isTeacher = pathname.includes("/teacher");
  const isSearchPage = pathname?.includes("/search");

  return (
    <div className="w-full h-full flex items-center px-6 -z-50">
      <div className="block md:hidden ">
        <MobileSidebar />
      </div>

      {isSearchPage && (
        <div className="hidden md:flex w-full  ">
          <SearchBar />
        </div>
      )}

      <div className="ml-auto flex gap-x-4">
        {isTeacher ? (
          <Link href="/">
            <Button size={"sm"} variant="ghost">
              <LogOut className="w-4 h-4" /> Exit
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <Button size={"sm"} variant="ghost">
              Teacher
            </Button>
          </Link>
        )}

        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
