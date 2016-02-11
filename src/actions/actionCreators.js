export default {
  newGame: function (width, height) {
    return {
      type: 'NEW_GAME',
      payload: {width, height}
    };
  },
  move: function (direction) {
    return {
      type: 'MOVE',
      payload: direction
    };
  },
  merge: function () {
    return {
      type: 'MERGE'
    }
  },
  checkWin: function () {
    return {
      type: 'CHECK_WIN'
    }
  },
  checkLose: function () {
    return {
      type: 'CHECK_LOSE'
    }
  }
}
