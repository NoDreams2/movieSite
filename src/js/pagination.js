let current = 1;
const totalPage = 35;

function updatePagination(currentPageElement) {
  currentPageElement.textContent = `${current} / ${totalPage}`;
}

function nextPage() {
  if (current < totalPage) {
    current++;
    return true;
  }
  return false;
}

function prevPage() {
  if (current > 1) {
    current--;
    return true;
  }
  return false;
}