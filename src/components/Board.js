import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import crossvent from 'crossvent';
import { transitionEnd, getTouches, getDirection } from '../helpers/index.js';
import Message from './Message.js';
import Grid from './Grid.js';
import TransitionCell from './TransitionCell.js';
import actionCreators from '../actions/actionCreators.js'
import style from './Board.css';

let Board = React.createClass({
  componentDidMount() {
    let { board } = this.refs;
    crossvent.add(board, 'touchstart', this._touchStart, true);
    crossvent.add(board, 'touchend', this._touchEnd, true);
  },

  render () {
    let {
      width,
      height,
      cells,
      end
    } = this.props;
    return (
      <div ref="board">
        <div className={style.outer}>
          <Message end={end}/>
          <div className={style.container}>
            {cells.map((cell, i) => (
              <TransitionCell
                key={`key-${cell.get('key')}`}
                {...cell.toJS()}/>
              ))}
          </div>

          <Grid width={width} height={height}/>
        </div>
      </div>
      )
  },

  _touchStart (e) {
    this.start = getTouches(e);
  },

  _touchEnd (e) {
    let {
      isTransition,
      end,
      move,
    } = this.props;
    if (end) return;
    let direction = getDirection(this.start, getTouches(e));
    if (direction && !isTransition) {
      move(direction);
      setTimeout(() => this._transitionEnd(), 300); // TO REVIEW
    }
  },

  _transitionEnd () {
    let {
      isTransition,
      merge,
      checkEnd
    } = this.props;
    if (isTransition) {
      merge();
      checkEnd();
    }
  }
});

export default connect(
  (state) => state,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
  )(Board);
