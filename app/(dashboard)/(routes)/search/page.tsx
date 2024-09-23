import { auth } from "@clerk/nextjs/server";
import { Categories } from "./_components/categories";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import SearchBar from "./_components/searchBar";
import { getCourse } from "@/actions/get-course";
import CourseList from "@/components/course-list";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourse({ userId, ...searchParams });
  return (
    <>
      <div className="md:hidden flex justify-center items-center px-3 pb-1">
        <SearchBar />
      </div>
      <div>
        <Categories items={categories} />
        <CourseList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
