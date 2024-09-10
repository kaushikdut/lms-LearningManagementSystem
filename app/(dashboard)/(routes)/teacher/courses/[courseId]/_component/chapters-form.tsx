"use client";

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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import ChapterList from "./chapter-list";

interface ChapterFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
});
const ChapterForm = ({ initialData, courseId }: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsCreating((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("created successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log("submit error: ", error);
    }
  };
  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios
        .put(`/api/courses/${courseId}/chapters/reorder`, {
          list: updateData,
        })
        .then(() => {
          toast.success("Chapters reordered");
          router.refresh();
          setIsUpdating(false);
        });
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-full bg-slate-200 p-6 rounded-md relative">
      {isUpdating && (
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full items-center justify-center bg-slate-500/20">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )}
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
            <ChapterList
              chapterList={initialData.chapters}
              courseId={courseId}
              onReorder={onReorder}
            />
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
      {!isCreating && (
        <p className="mt-4 text-xs text-muted-foreground">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChapterForm;
