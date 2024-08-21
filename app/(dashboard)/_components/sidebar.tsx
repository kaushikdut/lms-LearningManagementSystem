"use client";

import { Compass, Layout } from "lucide-react";
import { usePathname } from "next/navigation";
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
    label: "Dashboard",
    href: "/",
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
  return <div className="w-full h-full overflow-y-auto border-r ">Sidebar</div>;
};

export default Sidebar;
