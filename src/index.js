import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
function Square(props) {
  // All react components classes that have a constructor should start with a super(props) call.
  //   constructor(props) {
  //     super(props);
  //   we use state to remember things such as something was clicked
  //     this.state = {
  //       value: null,
  //     };
  //   }
  // render() {

  //   checking what the value of each of the 9 squares were
  // return <button className="square">{this.props.value}</button>;
  return (
    <button
      className="square"
      // Checking if the clickhandlers for each square was done properly
      // onClick={function () {
      //   alert('click');
      // }}
      // Now I am adding a new X for each on click.
      // set state effects all child elements within it.
      // onClick={() => this.setState({ value: 'X' })}
      //   onClick={() => this.props.onClick()}
      //   When we modified the Square to be a function component, we also
      //   changed onClick={() => this.props.onClick()} to a shorter onClick={props.onClick}
      //    (note the lack of parentheses on both sides).
      onClick={props.onClick}
    >
      {/* Since the Board passed onClick={() => this.handleClick(i)} to Square,
             the Square calls this.handleClick(i) when clicked. */}
      {props.value}
      {/* {this.props.value} */}
      {/* {this.state.value} */}
    </button>
  );
  // }
}

class Board extends React.Component {
  // To collect data from multiple children,
  //     or to have two child components communicate
  //     with each other, you need to declare the shared
  // state in their parent component instead.The parent
  // component can pass the state back down to the children
  // by using props; this keeps the child components in sync
  // with each other and with the parent component.

  // Next, we’ll have the Board component receive squares
  // and onClick props from the Game component.
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   };
  // }

  // After implementing handleClick(i) the state is
  //stored in the Borad component instead of the
  //individual Square component. Now the Square components
  // are now controlled components and the board has full control of them.

  // handleClick(i) {
  // Unlike the array push() method you might be more familiar with, the
  // concat() method doesn’t mutate the original array, so we prefer it.
  // const history = this.state.history;

  // We will also replace reading this.state.history
  // with this.state.history.slice(0, this.state.stepNumber + 1).This
  // ensures that if we “go back in time” and then make a new move from
  // that point, we throw away all the “future” history that would now become incorrect.
  // const history = this.state.history.slice(0, this.state.stepNumber + 1);
  // const current = history[history.length - 1];
  // rendering the currently selected move according to stepNumber:
  // const current = history[this.state.stepNumber];
  // const squares = current.squares.slice();
  // const squares = this.state.squares.slice();
  // if (calculateWinner(squares) || squares[i]) {
  // return;
  // }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   // Note how in handleClick, we call .slice() to create a copy of the squares
  //   // array to modify instead of modifying the existing array.
  //   // squares[i] = 'X';
  //   this.setState({
  //     history: history.concat([
  //       {
  //         squares: squares,
  //       },
  //     ]),
  //     stepNumber: history.length,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        // We split the returned element into multiple lines
        //for readability, and added parentheses so that JavaScript
        //doesn’ t insert a semicolon after return and break our code.
      />
    );
  }
  // Next, we’ll define the jumpTo method in Game to update that
  //stepNumber.We also set xIsNext to true if the number that we’re
  //changing stepNumber to is even
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    // const status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
    // const history = this.state.history;
    // const current = history[history.length - 1];
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }
    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      // stepNumber to the Game component’s state
      //to indicate which step we’re currently viewing.
      stepNumber: 0,
      xIsNext: true,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  render() {
    const history = this.state.history;
    // const current = history[history.length - 1];
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    // Let’s map over the history in the Game’s render method:
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        // The moves are never re-ordered, deleted, or inserted in the middle,
        //so it’s safe to use the move index as a key.
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

// There are generally two approaches to changing data. The first approach is to mutate the data by directly changing the data’s values. The second approach is to replace the data with a new copy which has the desired changes.

// Data Change with Mutation
// var player = {score: 1, name: 'Jeff'};
// player.score = 2;
// // Now player is {score: 2, name: 'Jeff'}

// Data Change without Mutation
// var player = {score: 1, name: 'Jeff'};

// var newPlayer = Object.assign({}, player, {score: 2});
// // Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// // Or if you are using object spread syntax proposal, you can write:
// // var newPlayer = {...player, score: 2};
// The end result is the same but by not mutating (or changing the underlying data) directly, we gain several benefits described below.

// Complex Features Become Simple
// Immutability makes complex features much easier to implement.
// Later in this tutorial, we will implement a “time travel” feature that
// allows us to review the tic - tac - toe game’s history and “jump back” to
// previous moves.This functionality isn’t specific to games — an ability to
// undo and redo certain actions is a common requirement in applications.Avoiding
// direct data mutation lets us keep previous versions of the game’s history intact,
//     and reuse them later.

// Detecting Changes
// Detecting changes in mutable objects is difficult because they are modified directly.
// This detection requires the mutable object to be compared to previous copies of itself and the
// entire object tree to be traversed.

// Detecting changes in immutable objects is considerably easier. If the immutable object that
// is being referenced is different than the previous one, then the object has changed.

// Determining When to Re-Render in React
// The main benefit of immutability is that it helps you build pure components in React.
// Immutable data can easily determine if changes have been made, which helps to determine
// when a component requires re - rendering.

// You can learn more about shouldComponentUpdate() and how you can build pure components
// by reading Optimizing Performance.
