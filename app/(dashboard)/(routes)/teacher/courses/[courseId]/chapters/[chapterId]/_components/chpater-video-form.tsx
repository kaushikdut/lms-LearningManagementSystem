"use client";

import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Chapter, MuxData } from "@prisma/client";

import axios from "axios";
import { Pencil, PlusCircleIcon, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import MuxPlayer from "@mux/mux-player-react";
import * as z from "zod";
import { IconBadge } from "@/components/icon-badge";

interface VideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});
const VideoForm = ({ initialData, courseId, chapterId }: VideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log("submit error: ", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-3 bg-slate-200 p-6 rounded-md text-sky-900">
      <div className="flex justify-between items-center font-semibold text-neutral-800">
        <div className="flex items-center gap-x-2">
          <IconBadge icon={Video} size={"md"} />
          <h1 className="text-lg ">Chapter video</h1>
        </div>
        <Button
          variant="ghost"
          className="hover:bg-slate-200"
          onClick={toggleEdit}
        >
          {!isEditing ? (
            initialData.videoUrl ? (
              <>
                <Pencil className="w-4 h-4 mr-2" />
                <p className="text-md ">Edit video</p>{" "}
              </>
            ) : (
              <>
                <PlusCircleIcon className="w-4 h-4 mr-2" />
                <p className="text-md">Add video</p>
              </>
            )
          ) : (
            <p>Cancle</p>
          )}
        </Button>
      </div>

      {!isEditing && !initialData.videoUrl && (
        <div className="h-60 w-full flex flex-col items-center justify-center bg-slate-100 rounded-md">
          <Video className="w-10 h-10 text-slate-500" />
        </div>
      )}

      {!isEditing && initialData.videoUrl && (
        <div className="relative aspect-video mt-2">
          <MuxPlayer
            playbackId={initialData?.muxData?.playbackId || ""}
            className="w-full"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Videos can take a few minutes to process. Refresh the page if video
            does not appear.
          </p>
        </div>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoForm;
