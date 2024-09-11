import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Mux from "@mux/mux-node";
import { NextRequest, NextResponse } from "next/server";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const values = await req.json();

    const course = await db.course.update({
      where: {
        id: params.courseId,
        userId: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: { id: params.courseId, userId },
      include: {
        chapters: { include: { muxData: true } },
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    /** Removing mux data for all chapters */
    for (const chapter of course.chapters) {
      if (chapter.muxData) {
        await video.assets.delete(chapter.muxData.assetId);
      }
    }

    const deletedCourse = await db.course.delete({
      where: { id: params.courseId },
    });

    return NextResponse.json(deletedCourse);
  } catch {
    return new NextResponse("Internal server exception", { status: 500 });
  }
}
