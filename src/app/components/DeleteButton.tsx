import Image from "next/image";
import React from "react";

const DeleteButton = () => {
  return (
    <button
      type="submit"
      className="w-48 h-14 bg-red-500 rounded-3xl text-white border border-accent shadow flex items-center justify-center"
    >
      <Image alt="delete" src="/icons/trash.svg" height={30} width={30}></Image>
      <h2>削除</h2>
    </button>
  );
};

export default DeleteButton;
