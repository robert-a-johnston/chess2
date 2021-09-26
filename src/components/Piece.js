import React from 'react'
import { useDrag, DragPreviewImage } from 'react-dnd'

export default function Piece({ piece: {type, color}, position }) {

  const [ { isDragging }, drag, preview ] = useDrag({
    item: { 
      type: 'piece',
      id: `${position}_${type}_${color}`},
      // removes piece from original position view when dragging
      collect: (monitor) => {
        return { isDragging: !!monitor.isDragging() }
      }
  })
  const pieceImg = require(`../img/${type}_${color}.png`)
  return (
    <>
      <DragPreviewImage connect={preview} src={pieceImg} />
      <div className='piece-container'
         ref={drag} 
        //  changes opacity style for dragged piece
         style={{opacity: isDragging ? 0 : 1}}>
          <img src={pieceImg} alt='' className='piece'/>
      </div>
    </>
  )
}
