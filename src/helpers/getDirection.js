export default (start, end) => {
  let xDistance = Math.abs(end.x - start.x);
  let yDistance = Math.abs(end.y - start.y);
  if (xDistance + yDistance === 0) {
    return null;
  }

  let axis = xDistance > yDistance ? 'x' : 'y';
  let modulus = end[axis] - start[axis] > 0 ? 1 : -1;
  return {
    [axis]: modulus
  };
}
