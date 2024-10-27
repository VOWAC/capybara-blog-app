"use client";

import Card from "@/app/components/Card";
import Title from "@/app/components/Title";
import { createClient } from "@/utils/supabase/supabase";
import Link from "next/link";
import Header from "@/app/components/Header";
import { useEffect, useState } from "react";
import ActionButton from "@/app/components/ActionButton";

export default function Home() {
  const supabase = createClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserStatusAndPosts = async () => {
      try {
        // ユーザーの情報を取得
        const {
          data: { user },
        } = await supabase.auth.getUser();

        // ログインしている場合、isAdminをtrueに設定
        if (user) {
          setIsAdmin(true);
        }

        // 記事の情報を取得
        const { data: postsData, error: postsError } = isAdmin
          ? await supabase
              .from("posts")
              .select("*")
              .order("created_at", { ascending: false })
          : await supabase
              .from("posts")
              .select("*")
              .eq("is_published", true) // 公開された記事のみ取得
              .order("created_at", { ascending: false });

        if (postsError) {
          setError("記事の取得に失敗しました。");
        } else {
          setPosts(postsData || []);
        }
      } catch (error) {
        setError("データの取得中にエラーが発生しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchUserStatusAndPosts();
  }, [isAdmin]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header />
      <div className="ml-80 my-20">
        <Title text="記事一覧" />
      </div>
      <div className="flex flex-col items-center">
        {posts.length === 0 ? (
          <h2>記事がありません。</h2>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-5">
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <Card
                    title={post.title}
                    date={new Date(post.created_at).toLocaleDateString()}
                    isPublished={post.is_published}
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isAdmin && (
        <div className="absolute bottom-20 right-20">
          <ActionButton type="create" />
        </div>
      )}
    </div>
  );
}
