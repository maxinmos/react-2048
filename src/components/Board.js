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
        <div ref={(container) => this._container = container}>
          {board.get('cells').map((cell) =>(
            <Cell {...cell.toJS()}/>
            ))}
        </div>
        <Grid
          width={board.get('width')}
          height={board.get('height')}/>
      </div>
      )
  }
})
