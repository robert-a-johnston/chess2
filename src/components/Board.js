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
function isDark(index) {
  // deconstruct x and y from getXYPosition
  const {x, y} = getXYPosition(index)
  return (x + y) % 2 === 1
}

function getPosition(i) {
  const { x, y } = getXYPosition(i)
  const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x]
  // console.log('letter', letter)
  return `${letter}${ y + 1 }`
}

export default function Board({board}) {
  return (
    <div className='board'>
      {/* maps through array board */}
      {/* .flat makes 2d array into 1d */}
      {board.flat().map((piece, i) => (
        <div key={i} className='square'>
          <BoardSquare 
            piece={piece} 
            dark={isDark(i)} 
            position={getPosition(i)}
            />
        </div>
      ))}
    </div>
  )
}
