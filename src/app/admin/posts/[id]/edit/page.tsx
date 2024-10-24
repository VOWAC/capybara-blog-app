"use client";
import React, { useState, useEffect, useRef } from "react";
import { updatePost, getPostById } from "@/utils/postActions";
import DeleteButton from "@/app/components/DeleteButton";
import ActionButton from "@/app/components/ActionButton";
import Button from "@/app/components/Button";
import Image from "next/image";

const EditPage = ({ params }: { params: { id: string } }) => {
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

  // ページ読み込み時に記事データを取得してフォームにセットする
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await getPostById(params.id); // IDで記事を取得
      if (error || !data) {
        setMessage("記事が見つかりません。");
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
    const result = await updatePost(params.id, {
      title,
      content,
      is_published: isPublished,
    });

    if (result.error) {
      setMessage("記事の更新に失敗しました。");
    } else {
      setMessage("記事が正常に更新されました！");
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
      <form onSubmit={handleSubmit}>
        {/* タイトルの編集 */}
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-transparent font-bold text-2xl focus:outline-none"
        />

        <textarea
          id="content"
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border-2 border-gray-300 rounded-2xl p-2 mt-4 focus:outline-none border-none p-8 resize-none overflow-hidden"
          required
          onInput={autoResize} // 高さを動的に変更
        />

        {/* 公開設定 */}
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
            <DeleteButton postId={params.id} />
            <Button>{isPublished ? "更新する" : "下書きを保存"}</Button>
          </div>
        </div>
      </form>
      {message && <p>{message}</p>} {/* メッセージの表示 */}
    </div>
  );
};

export default EditPage;
