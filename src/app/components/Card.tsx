"use client";

import React from "react";
import { createClient } from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  date: string;
  isPublished?: boolean;
};

const Card = ({ title, date, isPublished }: Props) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserStatusAndPost = async () => {
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

    fetchUserStatusAndPost();
  }, []);

  return (
    <div className="w-96 bg-white rounded-xl border border-accent shadow">
      <div className=" pt-2 pb-7">
        <div className="flex justify-between">
          <p className="small-text opacity-50 pl-4">{date}</p>
          {(isAdmin && !isPublished) &&(
            <p className="small-text bg-primary w-16 flex justify-center items-center rounded-xl text-white mr-6">
              非公開
            </p>
          )}
        </div>
        <h2 className="text-xl font-bold px-8 pt-2">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
