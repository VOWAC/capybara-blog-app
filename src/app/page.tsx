import Card from "@/app/components/Card";
import Title from "@/app/components/Title";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Header from "@/app/components/Header";

export default async function Home() {
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
    </div>
  );
}
