import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function AdminPostsPage() {
  const supabase = createClient();

  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (postsError || !posts) {
    return <p>記事が見つかりません。</p>;
  }

  return (
    <div>
      <h1>記事一覧（管理者）</h1>
      {posts.length === 0 ? (
        <p>記事がありません。</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/admin/posts/${post.id}`}>
                <h2>{post.title}</h2>
                <p>{post.is_published ? "公開" : "非公開"}</p>
                <p>作成日: {new Date(post.created_at).toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
