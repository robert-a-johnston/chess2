import React from 'react'

const promotionPieces = ['r', 'n', 'b', 'q']

export default function Promote({
  promotion: { from, to, color },
}) {
  return (
    // same class as board
    <div className='board'>
      {promotionPieces.map((p, i) => (
        <div key={i} className='promote-square'>{p}
          {/* <div className='piece-container'></div> */}
        </div>
      ))}
      promotion
    </div>
  )
}
