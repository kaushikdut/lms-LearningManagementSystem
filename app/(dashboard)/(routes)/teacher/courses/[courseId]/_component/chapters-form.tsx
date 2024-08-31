"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface ChapterFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
});
const ChapterForm = ({ initialData, courseId }: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsCreating((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values).then(() => {
        toast.success("created successfully");
        toggleEdit();
        router.refresh();
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.log("submit error: ", error);
    }
  };

  return (
    <div className="w-full bg-slate-200 p-6 rounded-md">
      <div className="flex justify-between items-center font-semibold text-neutral-800">
        <h1 className="text-lg ">Course chapters</h1>
        <Button
          variant="ghost"
          className="hover:bg-slate-200"
          onClick={toggleEdit}
        >
          {!isCreating ? (
            <>
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              <p className="text-md ">Add a chapter</p>
            </>
          ) : (
            <p>Cancle</p>
          )}
        </Button>
      </div>

      {!isCreating && (
        <div
          className={cn(
            "text-neutral-700 text-sm font-semibold divl-2",
            !initialData.chapters.length && "italic text-neutral-600"
          )}
        >
          {!initialData.chapters.length && "No chapters"}
          {initialData.chapters.length > 0 && (
            <div className="w-full flex flex-col gap-y-1 overflow-y-auto max-h-[200px]">
              {initialData.chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="flex items-center justify-between bg-slate-50 p-3"
                >
                  <p>{chapter.title}</p>
                  <Badge className="text-xs cursor-pointer">draft</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isCreating && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Title of the chapter"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Give a name for your chapter
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              Create
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterForm;
