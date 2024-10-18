import React from 'react'

type Props = {
  children: React.ReactNode
}

const Button = ({children}:Props) => {
  return (
    <button type='submit' className='w-48 h-14 bg-primary rounded-3xl text-white border border-accent shadow'>
      <h2>{children}</h2>
    </button>
  )
}

export default Button