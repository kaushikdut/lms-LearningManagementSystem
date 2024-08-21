import { Button } from "@/components/ui/button";
import Link from "next/link";

const teacher = () => {
  return (
    <div className="w-full h-full flex ">
      <Link href="/teacher/courses/create">
        <Button variant="default" size="sm">
          Create Course
        </Button>
      </Link>
    </div>
  );
};

export default teacher;
