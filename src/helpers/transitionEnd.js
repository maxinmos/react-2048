export default () => {
  var t;
  var el = document.createElement('fake');
  var transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  };
  for(t in transitions){
    if( el.style[t] !== undefined ){
      return transitions[t];
    }
  }
}
