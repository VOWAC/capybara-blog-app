"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPost } from "./action";
import Button from "@/app/components/Button";
import Image from "next/image";
import ActionButton from "@/app/components/ActionButton";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [message, setMessage] = useState("");

  // useRefにHTMLTextAreaElement型を明示的に指定
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResize(); // 初期表示時に高さを調整
  }, [content]);

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

  const handleCheckboxChange = () => {
    setIsPublished((prev) => !prev);
  };

  return (
    <div className="mx-96 mt-24">
      <div className="absolute left-12 top-32">
        <ActionButton type="back" />
      </div>
      {/* 記事の作成 */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* タイトルの作成 */}
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          required
          className="bg-transparent font-bold text-2xl focus:outline-none"
        />

        {/* 本文の作成 */}
        <textarea
          id="content"
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ここに本文を書いてください"
          className="w-full border-2 border-gray-300 rounded-2xl p-2 mt-4 focus:outline-none border-none p-8 resize-none overflow-hidden"
          required
          onInput={autoResize} // 高さを動的に変更
        />
        <div className="flex flex-col items-end">
          <label
            className="flex items-center cursor-pointer mr-4 my-4"
            onClick={handleCheckboxChange}
          >
            <input
              type="checkbox"
              checked={isPublished}
              onChange={handleCheckboxChange}
              className="hidden" // チェックボックスを視覚的に隠す
            />
            {isPublished ? (
              <Image
                src="/icons/checkbox-active.svg"
                alt="チェックボックス＿選択済み"
                height={20}
                width={20}
              />
            ) : (
              <Image
                src="/icons/checkbox.svg"
                alt="チェックボックス"
                height={20}
                width={20}
              />
            )}
            <span className="ml-1">公開</span>
          </label>

          {/* 送信ボタン */}
          <div className="flex gap-4">
            <Button>{isPublished ? "投稿する" : "下書きを保存"}</Button>
          </div>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreatePage;
