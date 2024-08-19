import { UserButton } from "@clerk/nextjs";
import Logo from "./logo";
import SearchBar from "./searchBar";

const Navbar = () => {
  return (
    <div className="w-full h-full bg-white flex items-center justify-between border-b px-6 -z-50">
      <Logo />
      <SearchBar />
      <UserButton />
    </div>
  );
};

export default Navbar;
