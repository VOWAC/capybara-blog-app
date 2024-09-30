"use client";
import React, { useState } from "react";
import { createPost } from "./action";

const page = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // actions.tsに定義した関数を呼び出してデータ送信
    const result = await createPost({ title, content, isPublished });

    if (result.error) {
      setMessage("記事の作成に失敗しました。");
    } else {
      setMessage("記事が正常に作成されました！");
      setTitle("");
      setContent("");
      setIsPublished(false);
    }
  };

  return (
    <div>
      {/* 記事の作成 */}
      <form onSubmit={handleSubmit}>
        {/* タイトルの作成 */}
        <label htmlFor="title">タイトル:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* 本文の作成 */}
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
        <button type="submit">送信</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default page;
