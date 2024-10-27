import React from "react";

type Props = {
  text: string;
};

const Title = ({ text }: Props) => {
  return (
    <div className="mt-20 mb-8 md:mt-36 md:mb-20">
      <div className="w-32 h-9 md:w-52 md:h-14 bg-foreground text-secondary flex justify-center items-center">
        <h2>{text}</h2>
      </div>
    </div>
  );
};

export default Title;
