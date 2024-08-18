"use client";
import { useUser } from "@clerk/nextjs";
import Banner from "./banner";
import Image from "next/image";

const Header = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <section className="w-full h-full flex flex-col gap-y-6">
      <div className="flex gap-x-4 px-6">
        {user?.imageUrl && (
          <Image
            src={`${user?.imageUrl}`}
            alt="profile"
            width={50}
            height={50}
            className="rounded-full"
          />
        )}

        <h1 className="text-xl font-bold text-neutral-800">
          Welcome back, {user?.firstName}
        </h1>
      </div>
      <Banner />
    </section>
  );
};

export default Header;
