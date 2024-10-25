import { createClient } from '@/utils/supabase/server';

export async function updateProfile(
  bio: string,
  xUrl: string,
  youtubeUrl: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const { error } = await supabase
    .from('about')
    .update(
      { bio, x_url: xUrl, youtube_url: youtubeUrl })
      .match({ id: 1 })

  if (error) {
    return { success: false, error: `プロフィールの更新に失敗しました: ${error.message}` };
  }

  return { success: true };
}
