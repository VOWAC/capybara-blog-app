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
      <div className="container">
        <Title text="アバウト" />
        <div className="md:w-[764px] md:mx-auto md:mt-24">
          <div className="flex flex-col items-center md:items-start md:justify-center">
            <div className="md:flex">
              <Image
                src={avatarUrl}
                alt="avatar"
                width={284}
                height={284}
                className="md:relative md:left-8 w-40 h-40 md:bottom-16 md:z-10 md:w-[284px] md:h-[284px] mb-8 md:mb-0"
              />

              <div className="bg-white w-full h-8 md:w-[450px] md:h-16 flex justify-center items-center">
                <ruby>
                  {name}
                  <rt>{ruby}</rt>
                </ruby>
                {isAdmin && (
                  <Link
                    href="/admin/setting"
                    className="flex justify-end md:mr-8 p-2"
                  >
                    <ActionButton type="setting" />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white mt-2 md:w-[700px] md:relative md:left-24 md:bottom-48 md:mt-0">
            <div className="flex justify-center md:justify-start md:relative md:left-72 gap-4 p-4 md:p-10">
              <Link href={`${youtubeUrl}`}>
                <Image
                  src={"/about/youtube.png"}
                  alt="youtube"
                  width={72}
                  height={72}
                  className="w-12 h-12 md:w-16 md:h-16"
                />
              </Link>
              <Link href={`${xUrl}`}>
                <Image
                  src={"/about/x.png"}
                  alt="x"
                  width={72}
                  height={72}
                  className="w-12 h-12 md:w-16 md:h-16"
                />
              </Link>
            </div>
            <p className="px-8 pb-10 md:px-24 md:pb-24 whitespace-pre-line">
              {bio}
            </p>
          </div>
          <Image
            src={midorinUrl}
            alt="midorin"
            width={500}
            height={500}
            className="-mt-16 md:-mt-0 md:relative md:bottom-[450px] md:left-[450px]"
          />
        </div>
      </div>
      {message && <p className="text-red-500">{message}</p>}
    </div>
  );
};

export default AboutPage;
