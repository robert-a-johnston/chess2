import * as Chess from 'chess.js'
import { throwIfEmpty } from 'rxjs'
import { BehaviorSubject } from 'rxjs'

// fen notation for chess
// related to DOM position when promote pawn 
// insert these variables into initialize new chess game to test
// condition of each.
let promotion ='rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'
let staleMate = '4k3/4P3/4K3/8/8/8/8/8 b - - 0 78'
let checkMate = 'rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3'
let insufficientMaterial = 'k7/8/n7/8/8/8/8/7K b - - 0 1'

// initialize new chess game
const chess = new Chess(staleMate)
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

export function resetGame() {
  chess.reset()
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
  const isGameOver = chess.game_over()

  const newGame = {
    board: chess.board(),
    pendingPromotion,
    isGameOver,
    result: isGameOver ? getGameResult() : null
  }

  gameSubject.next(newGame)
}

// function that determines if result is draw and reason for draw
function getGameResult() {
  if(chess.in_checkmate()){
    const winner = chess.turn() === "w" ? 'DARK' : 'LIGHT'
    return `CHECKMATE - WINNER - ${winner}`
  } else if(chess.in_draw()) {
    let reason = '50 - MOVES - RULE'
    if (chess.in_stalemate()) {
      reason = 'STALEMATE'
    } else if (chess.in_threefold_repetition()) {
      reason = 'REPETITION'
    } else if (chess.insufficient_material()) {
      reason = 'INSUFFICIENT MATERIAL'
    }
    return `DRAW - ${reason}`

  } else {
    return `UNKNOWN REASON`
  }
}