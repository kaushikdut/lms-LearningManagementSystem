import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SideBarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}
const SideBarItem = ({ icon: Icon, label, href }: SideBarItemProps) => {
  const pathname = usePathname();
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      className={cn(
        "w-full flex text-neutral-300 cursor-pointer rounded-md p-2 gap-x-2 ",
        isActive && " text-neutral-800  "
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "h-full border-2 border-[#defafc] opacity-0 transition-all",
          isActive && "opacity-100"
        )}
      />
      <div
        className={cn(
          " w-full rounded-md p-2 flex  gap-x-2 ",
          isActive && "bg-[#defafc]"
        )}
      >
        <Icon />
        <p className="font-semibold">{label}</p>
      </div>
    </button>
  );
};

export default SideBarItem;
