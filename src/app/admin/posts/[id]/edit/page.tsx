'use client';
import React, { useState, useEffect } from 'react';
import { updatePost, getPostById } from '@/utils/postActions'; 

const EditPage = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [message, setMessage] = useState('');

  // ページ読み込み時に記事データを取得してフォームにセットする
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await getPostById(params.id);  // IDで記事を取得
      if (error || !data) {
        setMessage('記事が見つかりません。');
        return;
      }
      setTitle(data.title);
      setContent(data.content);
      setIsPublished(data.is_published);
    };

    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 更新処理の呼び出し
    const result = await updatePost(params.id, { title, content, is_published: isPublished });

    if (result.error) {
      setMessage('記事の更新に失敗しました。');
    } else {
      setMessage('記事が正常に更新されました！');
    }
  };

  return (
    <div>
      <h1>記事の編集</h1>
      <form onSubmit={handleSubmit}>
        {/* タイトルの編集 */}
        <label htmlFor="title">タイトル:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* 本文の編集 */}
        <label htmlFor="content">内容:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {/* 公開設定 */}
        <label>
          公開:
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>

        {/* 送信ボタン */}
        <button type="submit">更新</button>
      </form>
      {message && <p>{message}</p>} {/* メッセージの表示 */}
    </div>
  );
};

export default EditPage;
