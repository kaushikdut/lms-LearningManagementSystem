import { auth } from "@clerk/nextjs/server";
import { Categories } from "./_components/categories";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import SearchBar from "./_components/searchBar";

const SearchPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <div className="md:hidden flex justify-center items-center px-3 pb-1">
        <SearchBar />
      </div>
      <div>
        <Categories items={categories} />
      </div>
    </>
  );
};

export default SearchPage;
