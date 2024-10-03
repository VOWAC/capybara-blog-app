'use server';
import { createClient } from "@/utils/supabase/server";

interface PostData {
  title: string;
  content: string;
  isPublished: boolean;
}

export async function createPost(postData: PostData) {
  const supabase = createClient();

  // Supabaseへのデータ送信
  const { data, error } = await supabase.from('posts').insert([
    {
      title: postData.title,
      content: postData.content,
      is_published: postData.isPublished,
      created_at: new Date(),
    },
  ]);

  return { data, error };
}
