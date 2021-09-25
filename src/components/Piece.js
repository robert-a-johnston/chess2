import React from 'react'

export default function Piece({ piece: {type, color} }) {
  const pieceImg = require(`../img/${type}_${color}.png`)
  return (
    <div className='piece-container'>
      <img src={pieceImg} alt='' className='piece'/>
    </div>
  )
}
