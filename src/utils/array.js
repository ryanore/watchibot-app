/**
 * Arrays intersect
 */
export const intersects = (a1, a2) => {
  return a1.filter(n => ( a2.indexOf(n) != -1)).length > 0
}
