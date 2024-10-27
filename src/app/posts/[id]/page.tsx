"use client";
import { createClient } from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";
import ActionButton from "@/app/components/ActionButton";
import PaginationButton from "@/app/components/PaginationButton";
import Header from "@/app/components/Header";

export default function AdminPostDetail({
  params,
}: {
  params: { id: string };
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

      // 記事の情報を取得
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", params.id)
        .single();

      if (postError || !postData) {
        console.error("記事が見つかりません。");
      } else {
        setPost(postData);
      }

      setLoading(false);
    };

    fetchUserStatusAndPost();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 記事が見つからない場合のエラーハンドリング
  if (!post) {
    return <div>記事が見つかりません。</div>;
  }

  return (
    <div>
      <Header />
      <div className="container my-24 md:my-48">
        <div className="absolute left-12 top-32 hidden md:block">
          <ActionButton type="back" />
        </div>
        <div className="bg-white w-full px-4 md:px-12 py-1 md:py-2.5 rounded-sm md:my-24">
          {isAdmin && (
            <div className="flex justify-between items-center">
              <p className="small-text bg-primary w-20 flex justify-center items-center rounded-xl text-white py-1 mt-4">
                {post.is_published ? "公開中" : "非公開"}
              </p>
              <ActionButton type="edit" postId={params.id} />
            </div>
          )}
          <div className="mt-2.5 mb-9">
            <p className="small-text opacity-50">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <h1 className="font-bold text-center mt-2 md:mt-10 mb-2 md:mb-6">{post.title}</h1>
            <div className="w-full border-t-2 border-accent opacity-50"></div>
            <p className="mt-9">{post.content}</p>
          </div>
        </div>
        <div className="w-full mx-auto mt-8 md:mt-12">
          <div className="flex flex-col md:flex-row justify-between gap-y-4 items-center">
            <PaginationButton
              type="next"
              currentId={params.id}
              isAdmin={isAdmin}
            />
            <PaginationButton
              type="prev"
              currentId={params.id}
              isAdmin={isAdmin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
