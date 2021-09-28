import React from 'react'
import Square from './Square'
import { move } from '../Game'
const promotionPieces = ['r', 'n', 'b', 'q']

export default function Promote({
  promotion: { from, to, color }}) 
  {

  return (
    // same class as board
    <div className='board'>
      {/* maps images of each promotionPieces to board square */}
      {promotionPieces.map((p, i) => (
        <div key={i} className='promote-square'>
          {/* creates mini board with different colors */}
          <Square dark={i % 3 === 0}>
            <div className='piece-container'
             onClick={() => move(from, to, p)}>
              <img src={require(`../img/${p}_${color}.png`)}
                alt=''
                // class name cursor-pointer changes cursor to pointer
                // by css
                className='piece cursor-pointer'
                />
            </div>
          </Square>
        </div>
      ))}
    </div>
  )
}
