import { CourseWithProgressAndCategory } from "@/actions/get-course";
import CourseCard from "./course-card";

type CourseListProps = {
  items: CourseWithProgressAndCategory[];
};
const CourseList = ({ items }: CourseListProps) => {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
        {items.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageUrl={course.imageUrl!}
            price={course.price!}
            progress={course.progress}
            chaptersLength={course.chapters.length}
            category={course.category?.name ?? ""}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
