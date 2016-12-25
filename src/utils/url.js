/**
 * Arrays intersect
 */
export const relativePath = (path) => {
  if( path.substr(-1) === '/') {
    path = path.slice(0,-1)
  }
  return path.substr(0, path.lastIndexOf("/")) + '/'
}
