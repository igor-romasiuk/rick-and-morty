export const getPaginationRange = (currentPage: number, totalPages: number) => {
  const range = [];
  const maxPagesToShow = 5;

  let start = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  let end = Math.min(start + maxPagesToShow - 1, totalPages);

  if (end - start + 1 < maxPagesToShow) {
    start = Math.max(end - maxPagesToShow + 1, 1);
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
};
