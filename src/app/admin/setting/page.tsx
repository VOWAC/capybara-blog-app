"use client";
import React, { useState, useEffect, useRef } from "react";
import { updateProfile,getProfile } from "@/utils/aboutActions";
import ActionButton from "@/app/components/ActionButton";
import Button from "@/app/components/Button";

const ProfileEditPage = () => {
  const [bio, setBio] = useState("");
  const [xUrl, setXUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [message, setMessage] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResize(); // 初期表示時に高さを調整
  }, [bio]);

  // ページ読み込み時にプロフィールデータを取得してフォームにセットする
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await getProfile(); // プロフィール取得に変更
      if (error || !data) {
        setMessage("プロフィールが見つかりません。");
        return;
      }
      setBio(data.bio);
      setXUrl(data.x_url);
      setYoutubeUrl(data.youtube_url);
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 更新処理の呼び出し
    const result = await updateProfile({
      bio,
      x_url: xUrl,
      youtube_url: youtubeUrl,
    });

    if (result.error) {
      setMessage("プロフィールの更新に失敗しました。");
    } else {
      setMessage("プロフィールが正常に更新されました！");
    }
  };

  return (
    <div className="container mt-24 md:mt-48">
        <div className="absolute left-12 top-32 hidden md:block">
          <ActionButton type="back" />
        </div>
      <form onSubmit={handleSubmit}>
        <h2>プロフィール編集</h2>
        {/* プロフィールの紹介文編集 */}
          <textarea
          id="bio"
          ref={textareaRef}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border-2 border-gray-300 rounded-2xl p-2 mt-4 focus:outline-none border-none p-8 resize-none overflow-hidden"
          placeholder="bio"
          required
          onInput={autoResize} // 高さを動的に変更
        />

        {/* X URL 編集 */}
        <input
          type="url"
          id="xUrl"
          value={xUrl}
          onChange={(e) => setXUrl(e.target.value)}
          placeholder="XのURL"
          className="w-full border-2 border-gray-300 rounded-2xl p-2 mt-4 focus:outline-none"
        />

        {/* YouTube URL 編集 */}
        <input
          type="url"
          id="youtubeUrl"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="YouTubeのURL"
          className="w-full border-2 border-gray-300 rounded-2xl p-2 mt-4 focus:outline-none"
        />
  
        {/* 送信ボタン */}
        <div className="flex gap-4 mt-4 justify-center md:justify-end">
          <Button>更新する</Button>
        </div>
      </form>
      {message && <p>{message}</p>} {/* メッセージの表示 */}
    </div>
  );
};

export default ProfileEditPage;