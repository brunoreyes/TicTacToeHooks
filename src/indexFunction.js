import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// converting a class to a function requires replacing class with square
// and getting rid of render
// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square">
//         {/* TODO */}
//       </button>
//     );
//   }
// }
function Square({ value, squares, onClick }) {
  // const [value, setValue] = useState('');
  return (
    <button
      className="square"
      // onClick={() => console.log('happy brithday react hooks')}
      // onClick={() => setValue('x')}
      // onClick={() => (onClick = { onClick })}
      onClick={onClick}
    >
      {/* TODO */}
      {/* {squares[number]} */}
      {value}
    </button>
  );
}

// class Board extends React.Component {
function Board() {
  // useState relies on the order of the definition, the order has to be static
  const [squares, setSquares] = useState(Array(9).fill(null));

  const [isXNext, setXNext] = useState(true);
  function renderSquare(i) {
    // return (
    return (
      <Square
        squares={squares}
        // number={i}
        value={squares[i]}
        onClick={() => {
          const nextSquares = squares.slice();
          // is XNext, yes, otherwise it will be o's turn
          nextSquares[i] = isXNext ? 'x' : 'o';
          setXNext(!isXNext);
          setSquares(nextSquares);
        }}
      />
    );
  }

  const status = 'Next player: X';

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
