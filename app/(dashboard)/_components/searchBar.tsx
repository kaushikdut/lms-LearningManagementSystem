import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="w-full max-w-[500px] h-10 flex items-center gap-x-2 py-1 px-2 bg-slate-50 rounded-md border border-neutral-400 lg:max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px]">
      <Search className="w-4 h-4 text-neutral-500" />
      <input
        placeholder="Search for anything"
        className="w-full h-full bg-transparent text-xs focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
