import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const { title } = await req.json();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new Response("Unauthorized", { status: 401 });
    }

    const lastPosition = await db.chapter.findFirst({
      where: {
        courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const position = lastPosition ? lastPosition.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title,
        courseId,
        position,
      },
    });

    return Response.json(chapter, { status: 200 });
  } catch {
    return new Response("Internal Error", { status: 500 });
  }
}
