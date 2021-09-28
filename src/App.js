import React,{ useEffect, useState } from 'react'
import './App.css'

// listen to observable
import{ gameSubject, initGame } from './Game'
import Board from './components/Board'

export default function App() {
  // sets state for board
  const [board, setBoard] = useState([])
  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe((game) => 
      setBoard(game.board)
      )
    return () => subscribe.unsubscribe()
  }, [])
  return (
    <div className='container'>
      <div className='board-container'>
      {/* {console.log('board', board)} */}
        <Board board={board} />
      </div>
    </div>
  )
}
