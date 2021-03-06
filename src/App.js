import React,{ useEffect, useState } from 'react'
import './App.css'

// listen to observable
import{ gameSubject, initGame, resetGame } from './Game'
import Board from './components/Board'

export default function App() {
  // sets state for board
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()

  useEffect(() => {
    initGame()
    console.log('gameSubject', gameSubject)
    const subscribe = gameSubject.subscribe((game) => {
      console.log('gameBoard bS', game.board)
      setBoard(game.board)
      console.log('game ', game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
    })
    return () => subscribe.unsubscribe()
  }, [])

  return (
    <div className='container'>
      {isGameOver && (
        <h2 className='vertical-text'>GAME OVER
          <button onClick={resetGame}>
            <span className='vertical-text'>NEW GAME</span>
          </button>
        </h2>
      )}
      <div className='board-container'>
      {/* {console.log('board', board)} */}
        <Board board={board} />
      </div>
      {result && <p className='vertical-text'>{result}</p>}
    </div>
  )
}
