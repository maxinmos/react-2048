import React from 'react';
import Cell from './Cell.js';

export default React.createClass({
  componentDidMount() {
    let {grid} = this.refs;
    grid.addEventListener('touchmove', function () {
    })
  },
  render () {
    let {grid} = this.props
    return (
      <div ref="grid">
      {grid.map((cells, y) => (
        <div key={y}>
          {cells.map((cell, x) =>
            <Cell key={x} {...cell.toJS()}/>
            )}
        </div>
        ))}
      </div>
      )
  }
})
