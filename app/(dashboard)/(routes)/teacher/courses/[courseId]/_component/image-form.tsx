"use client";

import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "description is required" }),
});
const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { imageUrl: initialData.imageUrl || "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course description updated successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log("submit error: ", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-3 bg-slate-200 p-6 rounded-md">
      <div className="flex justify-between items-center font-semibold text-neutral-800">
        <h1 className="text-lg ">Course Image</h1>
        <Button
          variant="ghost"
          className="hover:bg-slate-200"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            initialData.imageUrl ? (
              <>
                <Pencil className="w-4 h-4 mr-2" />
                <p className="text-md ">Edit image</p>{" "}
              </>
            ) : (
              <>
                <PlusCircleIcon className="w-4 h-4 mr-2" />
                <p className="text-md">Add image</p>
              </>
            )
          ) : (
            <p>Cancle</p>
          )}
        </Button>
      </div>

      {!isEditing && !initialData.imageUrl && (
        <div className="h-60 w-full flex flex-col items-center justify-center bg-slate-300">
          <ImageIcon className="w-10 h-10" />
          <p>No image</p>
        </div>
      )}

      {!isEditing && initialData.imageUrl && (
        <div className=" h-60 relative">
          <Image
            src={initialData.imageUrl}
            alt="uploadedImage"
            fill
            className="rounded-md object-cover"
          />
        </div>
      )}

      {isEditing && (
        <div>
          <FileUpload
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
            endpoint="courseImage"
          />
        </div>
      )}
    </div>
  );
};

export default ImageForm;
