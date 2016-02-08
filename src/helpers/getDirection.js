export default (start, end) => {
  let axis = Math.abs(end.x - start.x) > Math.abs(end.y - start.y) ? 'x' : 'y';
  let modulus = end[axis] - start[axis] > 0 ? 1 : -1;
  return {
    [axis]: modulus
  };
}
