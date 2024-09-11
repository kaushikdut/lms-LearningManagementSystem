import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, LayoutDashboard, Video } from "lucide-react";
import { redirect } from "next/navigation";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import Banner from "@/components/banner";
import ChapterVideoForm from "./_components/chpater-video-form";
import Link from "next/link";
import ChapterActions from "./_components/chapter-actions";
import { cn } from "@/lib/utils";

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
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner variant={"warning"} label="This chapter is not published yet" />
      )}
      <div className="flex flex-col items-start ">
        <div>
          <Link
            href={`/teacher/courses/${courseId}`}
            className="mb-6 flex items-center text-sm transition hover:opacity-75"
          >
            <ArrowLeft className="w-4 h-4" /> Back to course
          </Link>
        </div>
        <div className="w-full p-2 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-neutral-800 font-bold">
              Chapter Creation
            </h1>
            <span
              className={cn(
                "text-sm text-slate-700 pl-3",
                completionText && "text-emerald-500 "
              )}
            >
              Complete all fields to publish {completionText}
            </span>
          </div>
          <ChapterActions
            isPublished={chapter.isPublished}
            courseId={courseId}
            chapterId={chapterId}
            disabled={!isComplete}
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 px-6">
        <div className="space-y-4">
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-2xl ">Customize your chapter</h2>
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
              <h1 className="text-2xl ">Add a video</h1>
            </div>
            <ChapterVideoForm
              courseId={courseId}
              initialData={chapter}
              chapterId={chapter.id}
            />
          </>
        </div>
        ;
      </div>
    </>
  );
};

export default ChapterId;
