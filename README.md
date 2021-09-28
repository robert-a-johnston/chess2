# Purpose
Recreate chess app.
Learn more about hooks.

# The problem "How to Make a Chess Game Work Using React Framework"
# The Problem Breakdown
- Create board.
  - Components used
    - Board
    - BoardSquare
    - Square
- Create chess pieces.
  - Components used
    - Piece
- Add pieces to board.
- Move pieces on board.
  - React dnd
  - chess.js can check for proper piece movement and special moves like castling.
- Create game logic and functions.
  - Handled in Game.js
- Handle when promote pawn to another piece (queen, knight, bishop, rook)
  - Components used
    - Promote
- Determine when checkmate, stalemate.
  - Chess.js can check for this.

# Dependencies
- chess.js
- react dnd
- react dnd html5 backend
- rxjs

# Issues
- Need to use older versions of react and react dnd or will have some issues.
  - attempted to write with newest versions and kept getting errors with solutions for errors to use older versions.
  - copied package.json file from example and npm installed from that after removing all of the files from a new React project created with ``npx create-react-app Chess2``
- Need to use FEN notation (Forsyth-Edwards Notation)
  - 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5'
  - not really an issue but is complicated and not fully understood why this is necessary.