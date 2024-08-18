import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  author: string;
}
const Card = ({ title, description, thumbnailUrl, author }: CardProps) => {
  return (
    <div className="w-[150px]">
      <Image src={thumbnailUrl} alt="course" width={100} height={100} />
      <h1>{title}</h1>
      <p className="truncate">{description}</p>
      <p>{author}</p>
    </div>
  );
};

export default Card;
