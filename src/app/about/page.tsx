"use client";
import React, { useEffect, useState } from "react";
import Title from "@/app/components/Title";
import Image from "next/image";
import Link from "next/link";
import { getProfile } from "@/utils/aboutActions";
import Header from "@/app/components/Header";
import { createClient } from "@/utils/supabase/supabase";
import ActionButton from "@/app/components/ActionButton";

const avatarUrl =
  `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL_AVATAR}` || "";
const midorinUrl =
  `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL_MIDORIN}` || "";

const AboutPage = () => {
  const [bio, setBio] = useState("");
  const [xUrl, setXUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [ruby, setRuby] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // ページ読み込み時にプロフィールデータを取得してフォームにセットする
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await getProfile(); // プロフィール取得に変更
      if (error || !data) {
        setMessage("プロフィールが見つかりません。");
        return;
      }
      setBio(data.bio);
      setXUrl(data.x_url);
      setYoutubeUrl(data.youtube_url);
      setName(data.name);
      setRuby(data.ruby);

      const supabase = createClient();

      // ユーザーの情報を取得
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // ログインしている場合、isAdminをtrueに設定
      if (user) {
        setIsAdmin(true); // ログインしている場合はtrueに設定
      }
    };

    fetchProfile();
  }, []);
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
                  {name}
                  <rt>{ruby}</rt>
                </ruby>
                {isAdmin && (
              <Link href="/admin/setting" className="flex justify-end mr-8 p-2">
                <ActionButton type="setting" />
              </Link>
            )}
              </div>
            </div>
          </div>
          <div className="bg-white w-[700px] relative left-24 bottom-48">
            <div className="flex relative left-72 gap-4 p-10">
              <Link href={`${youtubeUrl}`}>
                <Image
                  src={"/about/youtube.png"}
                  alt="youtube"
                  width={72}
                  height={72}
                />
              </Link>
              <Link href={`${xUrl}`}>
                <Image src={"/about/x.png"} alt="x" width={72} height={72} />
              </Link>
            </div>
            <p className="px-24 pb-24">{bio}</p>
          </div>
          <Image
            src={midorinUrl}
            alt="midorin"
            width={500}
            height={500}
            className="relative bottom-[450px] left-[450px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
