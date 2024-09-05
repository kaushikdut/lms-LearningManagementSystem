import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard, Video } from "lucide-react";
import { redirect } from "next/navigation";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import VideoForm from "./_components/chpater-video-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";

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
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    redirect("/teacher/courses");
  }

  return (
    <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center gap-x-2">
          <IconBadge icon={LayoutDashboard} />
          <h2 className="text-3xl font-semibold">Customize your chapter</h2>
        </div>
        <>
          <ChapterTitleForm
            initialData={chapter}
            courseId={courseId}
            chapterId={chapterId}
          />
        </>
        <>
          <ChapterDescriptionForm
            initialData={chapter}
            courseId={courseId}
            chapterId={chapterId}
          />
        </>
        <>
          <ChapterAccessForm
            initialData={chapter}
            courseId={courseId}
            chapterId={chapterId}
          />
        </>
      </div>
      <div className="space-y-4">
        <>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={Video} />
            <h1 className="text-xl">Add a video</h1>
          </div>
          <VideoForm
            courseId={courseId}
            initialData={chapter}
            chapterId={chapter.id}
          />
        </>
      </div>
      ;
    </div>
  );
};

export default ChapterId;
