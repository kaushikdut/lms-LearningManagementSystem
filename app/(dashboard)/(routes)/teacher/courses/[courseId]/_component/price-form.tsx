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
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  price: z.coerce.number(),
});
const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { price: initialData?.price || undefined },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log("submit error: ", error);
    }
  };

  return (
    <div className="w-full bg-slate-200 p-6 rounded-md">
      <div className="flex justify-between items-center font-semibold text-neutral-800">
        <h1 className="text-lg ">Course price</h1>
        <Button
          variant="ghost"
          className="hover:bg-slate-200"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              <p className="text-md ">Edit price</p>{" "}
            </>
          ) : (
            <p>Cancle</p>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p
          className={cn(
            "text-red-500 text-sm font-semibold pl-2",
            !initialData.price && "italic text-neutral-600"
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "No price"}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.01}
                      disabled={isSubmitting}
                      placeholder="set a price for your course"
                      {...field}
                    />
                  </FormControl>
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

export default PriceForm;
