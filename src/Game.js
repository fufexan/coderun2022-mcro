import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xisNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xisNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    // game over
    if (winner || squares[i]) return;
    // game not over
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xisNext);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  }

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : 'Restart';
      return (
        <li key={move}>
          <button className="non-game" onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });


  return (
    <>
      <div className="title">
        <h1>Tic Tac Toe</h1>
        <h3>{winner ? "Winner " + winner : ""}</h3>
        <h3>{!winner && stepNumber === 9 ? "Draw" : ""}</h3>
        <h3>{!winner && stepNumber !== 9 ? "Next " + xO : ""}</h3>
      </div>
      <div className="game">
        <Board squares={history[stepNumber]} onClick={handleClick} />
        <div className="wrapper">
          <div>
            <h3>History</h3>
            {renderMoves()}
          </div>
        </div>
      </div>
    </>
  );
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}

export default Game;