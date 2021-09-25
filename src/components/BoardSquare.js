import React from 'react'
import Square from './Square'
import Piece from './Piece' 

export default function BoardSquare({ piece, dark }) {
  return (
    <div className='board-square'>
      <Square dark={dark}>
        {piece && <Piece piece={piece}/>}
      </Square>
    </div>
  )
}
