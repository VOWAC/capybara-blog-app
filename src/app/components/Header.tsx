import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-14 md:h-24 bg-gradient-to-r to-primary from-secondary border border-foreground shadow z-50">
      <div className="flex justify-between items-center py-2 px-4 md:px-8 md:py-4">
        <div className="w-24 md:w-36">
          <Image
            src="/capybara-blog.svg"
            alt="サイトのロゴ"
            width={150}
            height={50}
            className="w-full h-auto"
          />
        </div>

        <div className="text-white flex gap-5 md:gap-10">
          <Link href="/">記事一覧</Link>
          <Link href="/about">アバウト</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
