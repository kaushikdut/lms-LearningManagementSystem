import { db } from "@/lib/db";
import TitleForm from "./_component/title-form";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DescriptionForm from "./_component/description-form";

const courseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/teacher/courses");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
  });

  if (!course) {
    return redirect("/teacher/courses");
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Course Setup</h1>
      <div className="grid mt-10 gap-2 gap-x-6 grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-y-8 p-6">
          <h1 className="text-xl font-bold">Customize your course</h1>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm
            initialData={{
              ...course,
              description: course.description || undefined,
            }}
            courseId={course.id}
          />
        </div>
        <div>Hello</div>
      </div>
    </div>
  );
};

export default courseIdPage;
