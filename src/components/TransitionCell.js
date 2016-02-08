import React from 'react';
import _merge from 'lodash/merge';
import Cell from './Cell.js';
import style from './TransitionCell.css';

let TransitionCell = React.createClass({
  getInitialState () {
    return this.props;
  },

  componentWillReceiveProps (props) {
    let { x, y, to } = props;
    this.setState({ x, y });
    if (to) {
      setTimeout(() => {
        this.setState({ x: to.x, y: to.y });
      });
    }
  },

  render () {
    let { value } = this.props;
    let { x, y } = this.state;
    let inlineStyle = {
      left: x * 50,
      top: y * 50
    };

    return (
      <div className={`cell ${style.cell}`} style={inlineStyle}>
        <Cell value={value}/>
      </div>
      )
  }
})

export default TransitionCell;
