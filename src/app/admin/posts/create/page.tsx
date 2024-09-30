'use client'
import React, { useState } from 'react'

const page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(title)
    console.log(content)
    console.log(isPublished)
    console.log('submit')
  }

  return (
    <div>
      {/* 記事の作成 */}
      <form onSubmit={handleSubmit}>
        {/* タイトルの作成 */}
        <label htmlFor="title">タイトル:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* 本文の作成 */}
        <label htmlFor="content">内容:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {/* 公開設定 */}
        <label>
          公開:
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
        {/* 送信ボタン */}
        <button type='submit'>送信</button>
      </form>
    </div>
  )
}

export default page