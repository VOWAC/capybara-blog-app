import React from "react";

type Props = {
  title: string;
  date: string;
};

const Card = ({ title, date }: Props) => {
  return (
    <div className="w-96 bg-white rounded-xl border border-accent shadow">
      <div className=" pt-2 pb-7">
        <p className="small-text opacity-50 pl-4">{date}</p>
        <h2 className="text-xl font-bold px-8 pt-2">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
