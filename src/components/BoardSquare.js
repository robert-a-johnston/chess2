import React from 'react'
import Square from './Square'
import Piece from './Piece' 
import { useDrop } from 'react-dnd'
import {move} from '../Game'

export default function BoardSquare({ piece, dark, position }) {
  const [, drop] = useDrop({
    accept: 'piece',
    drop: (item) => {
      console.log('id ', item)
      const [fromPosition] = item.id.split('_')
      move(fromPosition, position)
    },
  })
  return (
    <div className='board-square' ref={drop}>
      <Square dark={dark}>
        {piece && <Piece piece={piece} position={position}/>}
      </Square>
    </div>
  )
}
