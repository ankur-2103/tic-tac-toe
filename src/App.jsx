import Square from './components/Square'
import Board from './components/Board.jsx'
import './styles.scss'
import { useState } from 'react';
import { calculateWinner } from './winner';
import StatusMessage from './components/StatusMessage';
import History from './components/History';

const New_Game = [{ squares: Array(9).fill(null), isXNext: false }];

function App() {

  const [history, setHistory] = useState(New_Game);
  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];
  const {winner, winningSquares} = calculateWinner(gamingBoard.squares);

  console.log(history, currentMove);

  const handleClick = position => {
    if (gamingBoard.squares[position] || winner) {
      return;
    }
    setHistory((currHistory) => {

      const isTraversing = currentMove + 1 !== currHistory.length;

      const lastGamingState = isTraversing ? currHistory[currentMove] : history[history.length - 1];

      const nextGamingState = lastGamingState.squares.map((val, index) => {
        if (position === index) {
          return lastGamingState.isXNext ? "X" : "O";
        }
        return val;
      });

      const base = isTraversing ? currHistory.slice(0, currHistory.indexOf(lastGamingState) + 1) : currHistory;

      return base.concat({
        squares: nextGamingState,
        isXNext: !lastGamingState.isXNext
      });

    })
    setCurrentMove(currentMove+1);
  }

  const moveTo = move => {
    setCurrentMove(move);
  }

  const setNewGame = () => {
    setHistory(New_Game);
    setCurrentMove(0);
  }

  return (
    <div className='app'>
      <h1>TIC <span className='text-green'>TAC</span>TOE</h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board squares={gamingBoard.squares} handleClick={handleClick} winningSquares={winningSquares} />
      <button type='button' onClick={() => setNewGame()} className={`btn-reset ${winner ? 'active' : ''}`}>Start New Game</button>
      <h2>Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove}/>
    </div>
  )
}

export default App