"use client";

import { Compass, Layout } from "lucide-react";
import { usePathname } from "next/navigation";
import SideBarItem from "./sidebar-item";
import Logo from "./logo";
const guestRoute = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Search",
    href: "/search",
  },
];
const teacherRoutes = [
  {
    icon: Layout,
    label: "Course",
    href: "/teacher/courses",
  },
  {
    icon: Compass,
    label: "Search",
    href: "/search",
  },
];
const Sidebar = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname.startsWith("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoute;
  return (
    <div className="w-full h-full flex flex-col bg-neutral-800 text-[#f4f5f8]  border-r pl-8 py-2">
      <div className="pb-8">
        <Logo />
      </div>

      <div className="text-neutral-400">
        <h3>MAIN</h3>
      </div>
      <div className="w-full h-full flex flex-col items-start overflow-y-auto ">
        {routes.map((route) => (
          <SideBarItem key={route.href} {...route} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
