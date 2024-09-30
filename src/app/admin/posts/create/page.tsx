'use client'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* 記事の作成 */}
      <form action="">
        {/* タイトルの作成 */}
        <input type="text" />
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