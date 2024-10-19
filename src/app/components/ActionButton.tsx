'use client';

import Image from "next/image";
import React from "react";
import Link from "next/link";

type Props = {
  type: "edit" | "back";
};

const ActionButton = ({ type }: Props) => {
  const config = {
    edit: {
      src: "/icons/edit.svg",
      alt: "編集",
      path: "/edit",
      width: 30,
      height: 30,
    },
    back: {
      src: "/icons/arrow.svg",
      alt: "戻る",
      path: "/",
      width: 60,
      height: 60,
    },
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <button onClick={type === "back" ? goBack : undefined}>
      {type === "edit" ? (
        <Link href={config[type].path}>
          <Image
            src={config[type].src}
            alt={config[type].alt}
            width={config[type].width}
            height={config[type].height}
          />
        </Link>
      ) : (
        <Image
          src={config[type].src}
          alt={config[type].alt}
          width={config[type].width}
          height={config[type].height}
        />
      )}
    </button>
  );
};

export default ActionButton;
