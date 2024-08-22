import { Button } from "@/components/ui/button";
import Link from "next/link";

const teacher = () => {
  return (
    <div className="w-full h-full flex ">
      <Button variant="default" size="sm">
        <Link href="/teacher/courses/create">Create Course</Link>
      </Button>
    </div>
  );
};

export default teacher;
