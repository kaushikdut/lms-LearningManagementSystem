import { auth } from "@clerk/nextjs/server";
import { Categories } from "./_components/categories";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

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
    <div>
      <Categories items={categories} />
    </div>
  );
};

export default SearchPage;
