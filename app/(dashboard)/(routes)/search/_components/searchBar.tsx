"use client";
import { useDebounce } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");
  const router = useRouter();

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="w-full max-w-[500px] h-10 flex items-center gap-x-2 py-1 px-2 bg-slate-50 rounded-md border border-neutral-400 lg:max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px]">
      <Search className="w-4 h-4 text-neutral-500" />
      <input
        placeholder="Search for anything"
        className="w-full h-full bg-transparent text-xs focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
