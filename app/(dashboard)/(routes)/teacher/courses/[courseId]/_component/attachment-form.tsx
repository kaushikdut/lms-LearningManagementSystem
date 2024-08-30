"use client";

import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Attachment, Course } from "@prisma/client";
import axios from "axios";
import { Loader2, PlusCircleIcon, Trash2Icon } from "lucide-react";
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
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("File uploaded successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log("submit error: ", error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      console.log(id);
      setDeleteId(`${id}`);

      axios.delete(`/api/courses/${courseId}/attachments/${id}`).then(() => {
        toast.success("Attachment deleted");
        router.refresh();
        setDeleteId(null);
      });
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Delete error: ", error);
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
            <>
              <PlusCircleIcon className="w-4 h-4 mr-2" />
              <p className="text-md">Add a file</p>
            </>
          ) : (
            <p>Cancle</p>
          )}
        </Button>
      </div>

      {!isEditing && initialData.attachments && (
        <div>
          {initialData.attachments.length === 0 && (
            <p className="text-center">No Files</p>
          )}
          {initialData.attachments.length > 0 && (
            <ul className="flex flex-col gap-y-2 text-sky-900">
              {initialData.attachments?.map((attachment) => (
                <li
                  key={attachment.url}
                  className="flex items-center justify-between gap-x-3 bg-slate-100 p-2 rounded-md"
                >
                  <p className="line-clamp-1">{attachment.name}</p>
                  <div>
                    {deleteId === attachment.id && (
                      <div className="flex items-center mr-3 py-2">
                        <Loader2 className="h-6 w-6 animate-spin" />
                      </div>
                    )}
                    {deleteId !== attachment.id && (
                      <Button
                        variant={"ghost"}
                        onClick={() => onDelete(attachment.id)}
                        className="hover:bg-slate-200 hover:text-sky-900 transition"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
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
      <p className="text-sm text-muted-foreground text-center">
        Add files related to this course
      </p>
    </div>
  );
};

export default AttachmentForm;
