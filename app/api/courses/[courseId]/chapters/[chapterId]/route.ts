import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const { userId } = await auth();

    const { isPublished, ...values } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: { id: params.courseId, userId },
    });
    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: { id: params.chapterId },
      data: { ...values },
    });
    return NextResponse.json(chapter);
  } catch {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
