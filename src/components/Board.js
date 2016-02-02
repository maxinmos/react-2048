import React from 'react';
import Grid from './Grid.js';
import TransitionCell from './TransitionCell.js';
import style from './Board.css';

export default React.createClass({
  componentDidMount() {
  },

  render () {
    let { board } = this.props;
    return (
      <div className={style.board} ref="board">
        <div className={style.layer}
          ref={(container) => this._container = container}>
          {board.get('cells').map((cell, i) => (
            <TransitionCell key={i} {...cell.toJS()}/>
            ))}
        </div>
        <Grid
          width={board.get('width')}
          height={board.get('height')}/>
      </div>
      )
  }
})
