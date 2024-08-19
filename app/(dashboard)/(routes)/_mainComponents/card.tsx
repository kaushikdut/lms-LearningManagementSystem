import Image from "next/image";

interface CardProps {
  title: string;
  thumbnailUrl: string;
  author: string;
  price: string;
}
const Card = ({ title, thumbnailUrl, author, price }: CardProps) => {
  return (
    <div className="w-[250px] h-full flex flex-col gap-y-[0.25rem] p-1 cursor-pointer group">
      <div className=" w-[240px] h-[160px] relative">
        <Image
          src={thumbnailUrl}
          alt="course"
          width={250}
          height={160}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>

      <h1 className="text-lg font-bold">{title}</h1>
      <p className="text-xs text-neutral-700">{author}</p>
      <p className="text-sm font-bold">{price}</p>
    </div>
  );
};

export default Card;
