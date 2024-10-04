'use server';
import { createClient } from '@/utils/supabase/server';

// 記事をIDで取得する関数
export async function getPostById(postId: string): Promise<{ data: any; error: string | null }> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (error) {
    return { data: null, error: `記事の取得に失敗しました: ${error.message}` };
  }

  return { data, error: null };
}

// 記事の編集関数
export async function updatePost(
  postId: string,
  updatedData: { title: string; content: string; is_published: boolean }
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const { error } = await supabase
    .from('posts')
    .update(updatedData)
    .eq('id', postId);

  if (error) {
    return { success: false, error: `編集に失敗しました: ${error.message}` };
  }

  return { success: true };
}

// 記事の削除関数
export async function deletePost(postId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) {
    return { success: false, error: `削除に失敗しました: ${error.message}` };
  }

  return { success: true };
}