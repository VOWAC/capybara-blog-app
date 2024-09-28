"use client";

import React, { useState } from "react";
import { supabase } from "../../../utils/supabase";

const Page = () => {
  const [email, setEmail] = useState(""); // メールアドレスを管理

  // フォーム送信時のログイン処理
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // ページのリロードを防ぐ
    e.preventDefault();

    // Supabase を使ってメールでログイン
    await supabase.auth.signInWithOtp({
      email,
    });

    alert("ログインリンクがメールに送信されました！");
  };

  return (
    <div>
      <head>
        <title>管理者ログイン</title>
      </head>
      <h1>管理者ログイン</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Page;
