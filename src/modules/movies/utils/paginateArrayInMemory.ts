export function paginate(array, perPage, page) {
  return array.slice((page - 1) * perPage, page * perPage);
}
