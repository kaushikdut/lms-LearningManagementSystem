"use client";

import { UserButton } from "@clerk/nextjs";
import SearchBar from "./searchBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const isTeacher = pathname.includes("/teacher");
  return (
    <div className="w-full h-full flex items-center justify-between px-6 -z-50">
      <SearchBar />
      <div className="flex gap-x-4">
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
