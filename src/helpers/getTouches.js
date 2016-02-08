export default (e) => {
  let out = {};
  out.x = e.pageX || (e.touches[0] || e.changedTouches[0]).pageX;
  out.y = e.pageY || (e.touches[0] || e.changedTouches[0]).pageY;
  return out;
}
