"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface DescriptionFormProps {
  initialData: { description: string };
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, { message: "description is required" }),
});
const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course description updated successfully");
      router.refresh();
      toggleEdit();
    } catch (error) {
      toast.error("Something went wrong");
      console.log("submit error: ", error);
    }
  };

  return (
    <div className="w-full bg-slate-200 p-6 rounded-md">
      <div className="flex justify-between items-center font-semibold text-neutral-800">
        <h1 className="text-lg ">Course description</h1>
        <Button
          variant="ghost"
          className="hover:bg-slate-200"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              <p className="text-md ">Edit text</p>{" "}
            </>
          ) : (
            <p>Cancle</p>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p
          className="text-neutral-700 text-sm font-semibold pl-2
        "
        >
          {initialData?.description}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your course a description. You can change it later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!isValid || isSubmitting}>
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DescriptionForm;
