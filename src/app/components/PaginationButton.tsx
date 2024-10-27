"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/supabase";

type Props = {
  type: "prev" | "next";
  currentId: string;
  isAdmin: boolean;
};

const PaginationButton = ({ type, currentId, isAdmin }: Props) => {
  const [targetId, setTargetId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTargetPost = async () => {
      const supabase = createClient();
      const { data: currentPost, error: currentPostError } = await supabase
        .from("posts")
        .select("created_at")
        .eq("id", currentId)
        .single();

      if (currentPostError || !currentPost) {
        console.error("現在の記事が見つかりません。");
        return;
      }

      const { created_at: currentCreatedAt } = currentPost;

      // 次または前の記事を取得
      const query = supabase
        .from("posts")
        .select("id")
        .filter("created_at", type === "next" ? "gt" : "lt", currentCreatedAt)
        .order("created_at", { ascending: type === "next" })
        .limit(1);

      // 管理者以外の場合、公開済みのフィルタを追加
      if (!isAdmin) {
        query.eq("is_published", true);
      }

      const { data: targetPost, error: targetPostError } = await query.single();

      if (targetPostError || !targetPost) {
        console.error(
          type === "next" ? "次の記事が見つかりません。" : "前の記事が見つかりません。"
        );
      } else {
        setTargetId(targetPost.id);
      }
    };

    fetchTargetPost();
  }, [currentId, type, isAdmin]);

  if (!targetId) {
    return null; // ターゲット記事がない場合はボタンを表示しない
  }

  return (
    <Link href={`/posts/${targetId}`}>
      <button className="shadow px-9 py-4 rounded-xl bg-white font-bold">
        {type === "prev" ? "前" : "次"}の記事を読む
      </button>
    </Link>
  );
};

export default PaginationButton;
