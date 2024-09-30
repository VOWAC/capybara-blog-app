'use client'
import React, { useState } from 'react'

const page = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(title)
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
        <textarea name="" id="" cols={30} rows={10}></textarea>
        {/* 公開設定 */}
        <input type="checkbox" />
        {/* 送信ボタン */}
        <button type='submit'>送信</button>
      </form>
    </div>
  )
}

export default page