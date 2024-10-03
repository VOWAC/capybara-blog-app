import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function AdminPostDetail({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: user, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    notFound();
  }

  
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (postError || !post) {
    notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.is_published ? '公開' : '非公開'}</p>
      <p>作成日: {new Date(post.created_at).toLocaleDateString()}</p>
    </div>
  );
}
