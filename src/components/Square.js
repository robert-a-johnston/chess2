import React from 'react'

export default function Square({children, dark}) {

  const bgClass = dark ? 'square-dark' : 'square-white'
  return (
    <div className={`${bgClass} board-square`}>
      {children}
    </div>
  )
}
