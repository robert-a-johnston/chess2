import * as Chess from 'chess.js'
import { BehaviorSubject } from 'rxjs'

// fen notation for chess
// related to DOM position when promote pawn 
let promotion ='rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'

// initialize new chess game
const chess = new Chess(promotion)
// BehaviorSubject is an 'observable' with
// attribute board
export const gameSubject = new BehaviorSubject({
  // chess.board() makes array representation of board
  // from chess.js
  board: chess.board()
})

export function initGame() {
  updateGame()
}
// handles move and checks if promotion
export function handleMove (from, to) {
  // from chess.js chess.moves
  // filter creates array of promotion options
  const promotions = chess.moves({verbose: true}).filter(m => m.promotion)
  console.table(promotions)
  if(promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
    console.log('pending promotion')
    const pendingPromotion = {from, to, color: promotions[0].color}
    updateGame(pendingPromotion)
  }
  const {pendingPromotion} = gameSubject.getValue()
  if(!pendingPromotion){
  move(from, to)
  }
}
// function that performs the move.
// uses chess.js notation
export function move(from, to) {
  // console.log('from to', from, to)
  const legalMove = chess.move({ from, to })
  if(legalMove) {
    // updates current gameSubject
    updateGame()
    //console.log('board ', chess.board())
  }
}

// 
function updateGame(pendingPromotion) {
  const newGame = {
    board: chess.board(),
    pendingPromotion
  }
  gameSubject.next(newGame)
}