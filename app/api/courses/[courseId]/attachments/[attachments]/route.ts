import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachments: string } }
) {
  try {
    const { userId } = auth();
    const { courseId, attachments } = params;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseowner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!courseowner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId,
        id: attachments,
      },
    });
    return new NextResponse("Attachment Deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
