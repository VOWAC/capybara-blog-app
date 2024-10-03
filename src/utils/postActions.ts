import { createClient } from '@/utils/supabase/server';

// 記事の削除関数
export async function deletePost(postId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) {
    throw new Error(`削除に失敗しました: ${error.message}`);
  }

  return true;
}

// 記事の編集関数
export async function updatePost(postId: string, updatedData: any) {
  const supabase = createClient();

  const { error } = await supabase
    .from('posts')
    .update(updatedData)
    .eq('id', postId);

  if (error) {
    throw new Error(`編集に失敗しました: ${error.message}`);
  }

  return true;
}
