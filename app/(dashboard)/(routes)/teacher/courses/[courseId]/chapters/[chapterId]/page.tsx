import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ChapterId = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  const { courseId, chapterId } = params;

  if (!userId) {
    redirect("/teacher/courses");
  }
  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
  });

  if (!chapter) {
    redirect("/teacher/courses");
  }

  return <div>{params.chapterId}</div>;
};

export default ChapterId;
