import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const teacher = async () => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const courses = await db.course.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default teacher;
