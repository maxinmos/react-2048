export default {
  newGame: function (width, height) {
    return {
      type: 'NEW_GAME',
      payload: {width, height}
    };
  }
}
