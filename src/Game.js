import * as Chess from 'chess.js'
import { throwIfEmpty } from 'rxjs'
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
  // if move is a promotion option
  if(promotions.some(p => `${p.from}:${p.to}` === `${from}:${to}`)) {
    console.log('pending promotion')
    // cannot promote right away because you can select different pieces
    // pendingPromotion allows for selecting piece
    // pendingPromotion is a object getting color [0]
    const pendingPromotion = {from, to, color: promotions[0].color}

    updateGame(pendingPromotion)
  }
  // puts game on hold so you can choose piece
  const {pendingPromotion} = gameSubject.getValue()

  
  if(!pendingPromotion){
  move(from, to)
  }
}

// function that performs the move.
// uses chess.js notation
export function move(from, to, promotion) {
  let tempMove = { from, to }

  if(promotion) {
    tempMove.promotion = promotion
  }

  // console.log('from to', from, to)
  const legalMove = chess.move(tempMove)
  if(legalMove) {
    // updates current gameSubject
    updateGame()
    //console.log('board ', chess.board())
  }
}

// function that updates game depending on event
// used in handleMove and move
function updateGame(pendingPromotion) {
  const newGame = {
    board: chess.board(),
    pendingPromotion
  }
  gameSubject.next(newGame)
}