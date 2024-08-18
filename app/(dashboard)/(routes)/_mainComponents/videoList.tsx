"use client";

import Card from "./card";
import { data } from "./data";

const VideoList = () => {
  console.log(data);
  return (
    <div className="w-full h-full bg-red-400">
      <Card
        title={data[0].title}
        description={data[0].description}
        thumbnailUrl={data[0].thumbnailUrl}
        author={data[0].author}
      />
    </div>
  );
};

export default VideoList;
