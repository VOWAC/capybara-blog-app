import React from "react";

type Props = {
  type: "prev" | "next";
};

const PaginationButton = ({ type }: Props) => {
  return <button className="shadow px-9 py-4 rounded-xl bg-white font-bold">{type === "prev" ? "前" : "次"}の記事を読む</button>;
};

export default PaginationButton;
