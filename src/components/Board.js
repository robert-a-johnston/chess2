import React from 'react'
import BoardSquare from './BoardSquare'

// determine coordinates
function getXYPosition(index) {
  const x = index % 8
  const y = Math.abs(Math.floor(index / 8) - 7)

  return {x, y}
}

// determine if square should be black
// if return true then black
function isBlack(index) {
  // deconstruct x and y from getXYPosition
  const {x, y} = getXYPosition(index)
  return (x + y) % 2 === 1
}

export default function Board({board}) {
  return (
    <div className='board'>
      {/* maps through array board */}
      {/* .flat makes 2d array into 1d */}
      {board.flat().map((piece, index) => (
        <div key={index} className='square'>
          <BoardSquare piece={piece} black={isBlack(index)}/>
        </div>
      ))}
    </div>
  )
}
