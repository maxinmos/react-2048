export { default as getTouches } from './getTouches.js';
export { default as getDirection } from './getDirection.js';
export { default as transitionEnd } from './transitionEnd.js';

export let generateKey = () => {
  return Math.random().toString().substr(2, 6);
}
