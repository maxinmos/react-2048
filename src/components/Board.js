import React from 'react';
import Grid from './Grid.js';
import Cell from './Cell.js';

export default React.createClass({
  componentDidMount() {
  },

  render () {
    let { board } = this.props;
    return (
      <div ref="board">
        {board.get('cells').map((cell) =>(
          <Cell {...cell.toJS()}/>
          ))}
        <Grid
          width={board.get('width')}
          height={board.get('height')}/>
      </div>
      )
  }
})
