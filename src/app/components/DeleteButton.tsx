"use client";
import Image from "next/image";
import React, { useState } from "react";
import { deletePost } from "@/utils/postActions";

type DeleteButtonProps = {
  postId: string;
};

const DeleteButton = ({ postId }: DeleteButtonProps) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleDelete = async () => {
    const result = await deletePost(postId);

    if (result.success) {
      setMessage("記事が正常に削除されました。");
    } else {
      setMessage(result.error || "記事の削除に失敗しました。");
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        type="button"
        className="w-48 h-14 bg-red-500 rounded-3xl text-white border border-accent shadow flex items-center justify-center"
      >
        <Image alt="delete" src="/icons/trash.svg" height={30} width={30} />
        <h2>削除</h2>
      </button>
      {message && <p className="mt-2 text-red-600">{message}</p>}
    </div>
  );
};

export default DeleteButton;
