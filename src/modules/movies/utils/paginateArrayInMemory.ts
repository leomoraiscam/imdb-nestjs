export function paginate(array, perPage, pageNumber) {
  return array.slice((pageNumber - 1) * perPage, pageNumber * perPage);
}
