import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ActionButton from "@/app/components/ActionButton";

export default async function AdminPostDetail({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: user, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    notFound();
  }

  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.id)
    .single();

  if (postError || !post) {
    notFound();
  }

  return (
    <div>
      <div className="absolute left-12 top-32">
        <ActionButton type="back" />
      </div>
      <div className="bg-white mx-96 px-12 py-2.5 rounded-sm my-24">
        <div className="flex justify-between items-center">
          <p className="small-text bg-primary w-20 flex justify-center items-center rounded-xl text-white py-1 mt-4">
            {post.is_published ? "公開中" : "非公開"}
          </p>
          <ActionButton type="edit" />
        </div>
        <div className="mt-2.5 mb-9">
          <p className="small-text opacity-50">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
          <h1 className="font-bold text-center mt-10 mb-6">{post.title}</h1>
          <div className="w-full border-t-2 border-accent opacity-50"></div>
          <p className="mt-9">{post.content}</p>
        </div>
      </div>
    </div>
  );
}
