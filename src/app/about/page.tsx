import React from "react";
import Header from "../components/Header";
import Title from "../components/Title";
import Image from "next/image";
import Link from "next/link";

const avatarUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL_AVATAR}`|| '';
const midorinUrl = `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL_MIDORIN}`|| '';

const About = () => {
  return (
    <div>
      <Header />
      <div className="">
        <div className="ml-80 my-20">
          <Title text="アバウト" />
        </div>
        <div className="w-[764px] mx-auto mt-24">
          <div className="flex flex-col items-start  justify-center">
            <div className="flex">
              <Image
                src={avatarUrl}
                alt="avatar"
                width={284}
                height={284}
                className="relative left-8 bottom-16 z-10"
              />

              <div className="bg-white w-[450px] h-16 flex justify-center items-center">
                <ruby>
                  名前名前
                  <rt>なまえなまえ</rt>
                </ruby>
              </div>
            </div>
          </div>
          <div className="bg-white w-[700px] relative left-24 bottom-48">
            <div className="flex relative left-72 gap-4 p-10">
              <Link href="https://youtube.com/">
                <Image
                  src={"/about/youtube.png"}
                  alt="youtube"
                  width={72}
                  height={72}
                />
              </Link>
              <Link href="https://x.com/">
                <Image src={"/about/x.png"} alt="x" width={72} height={72} />
              </Link>
            </div>
            <p className="px-24 pb-24">
              テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
            </p>
          </div>
          <Image src={midorinUrl} alt="midorin" width={500} height={500} className="relative bottom-[450px] left-[450px]"/>
        </div>
      </div>
    </div>
  );
};

export default About;
