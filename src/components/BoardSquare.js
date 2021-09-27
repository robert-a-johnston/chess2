import React, {useEffect, useState} from 'react'
import Square from './Square'
import Piece from './Piece' 
import { useDrop } from 'react-dnd'
import {handleMove} from '../Game'
import {gameSubject} from '../Game'
import Promote from './Promote'

export default function BoardSquare({ 
    piece, 
    dark, 
    position }) {
  const [promotion, setPromotion] = useState(null)
  const [, drop] = useDrop({
    accept: 'piece',
    drop: (item) => {
      // console.log('id ', item)
      const [fromPosition] = item.id.split('_')
      handleMove(fromPosition, position)
    },
  })
  useEffect(() =>{
    // game deconstructed
    const subscribe = gameSubject.subscribe(
      // logic to describe when piece has a promotion
      ({pendingPromotion}) => 
      pendingPromotion && pendingPromotion.to === position 
          ? setPromotion(pendingPromotion) 
          : setPromotion(null)
    )
    return () => subscribe.unsubscribe()
  }, [])

  return (
    <div className='board-square' ref={drop}>
      <Square dark={dark}>
        {/* if promotion */}
        {promotion ? (
          // render promotion component
          <Promote promotion={promotion}/>
          // else  render piece
          ) : piece ? (
            <Piece piece={piece} position={position}/>
            // else just render the square
          ) : null}
      </Square>
    </div>
  )
}
