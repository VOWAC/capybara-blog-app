'use server'
import { createClient } from '@/utils/supabase/server';

export async function updateProfile({
  bio,
  x_url,
  youtube_url,
}: {
  bio: string;
  x_url: string;
  youtube_url: string;
}): Promise<{ success: boolean; error?: string}> {
  const supabase = createClient();

  const { error } = await supabase
    .from('profile')
    .update(
      { bio, x_url, youtube_url })
      .match({ id: 1 })

  if (error) {
    return { success: false, error: `プロフィールの更新に失敗しました: ${error.message}` };
  }

  return { success: true };
}

// プロフィールを取得する関数
export async function getProfile(): Promise<{ data: any; error?: string }> {
  const supabase = createClient();

  // プロフィールデータを取得
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .single();
  if (error) {
    return { data: null, error: `プロフィールの取得に失敗しました: ${error.message}` };
  }

  return { data, error: undefined };
}