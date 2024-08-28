"use client";

import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Attachment, Course } from "@prisma/client";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import * as z from "zod";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});
const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

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
    <div className="w-full h-full flex flex-col gap-y-3 bg-slate-200 p-6 rounded-md">
      <div className="flex justify-between items-center font-semibold text-neutral-800">
        <h1 className="text-lg ">Course Files</h1>
        <Button
          variant="ghost"
          className="hover:bg-slate-200"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            initialData.attachments ? (
              <>
                <Pencil className="w-4 h-4 mr-2" />
                <p className="text-md ">Edit Attachments</p>{" "}
              </>
            ) : (
              <>
                <PlusCircleIcon className="w-4 h-4 mr-2" />
                <p className="text-md">Add a file</p>
              </>
            )
          ) : (
            <p>Cancle</p>
          )}
        </Button>
      </div>

      {!isEditing && !initialData.attachments && (
        <div className="h-60 w-full flex flex-col items-center justify-center bg-slate-300">
          <ImageIcon className="w-10 h-10" />
          <p>No image</p>
        </div>
      )}

      {!isEditing && initialData.attachments && (
        <div>
          <ul className="flex flex-col gap-y-2">
            {initialData.attachments.map((attachment) => (
              <li
                key={attachment.url}
                className="flex items-center gap-x-3 bg-slate-300 p-2 rounded-md"
              ></li>
            ))}
          </ul>
        </div>
      )}

      {isEditing && (
        <div>
          <FileUpload
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
              }
            }}
            endpoint="courseAttachment"
          />
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
