import React from 'react';

const StatusMessage = ({ winner, gamingBoard }) => {

    const noMovesLeft = gamingBoard.squares.every(val => val !== null);
    const nextPlayer = gamingBoard.isXNext ? "X" : "O";

    const renderStatusMessage = () => {
        if (winner) {
            return <>Winner is <span className={winner==="X" ? 'text-orange' : 'text-green'}>{winner}</span></>
        }
        
        if (!winner && noMovesLeft) {
            return <><span className='text-green'>O</span> and <span className='text-orange'>X</span> tied</>
        }
        
        if (!winner && !noMovesLeft) {
            return <>Next player is <span className={gamingBoard.isXNext ? 'text-orange' : 'text-green'}>{nextPlayer}</span></>
        }
    }

    return <h2 className='status-message'>{renderStatusMessage()}</h2>
}

export default StatusMessage