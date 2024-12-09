document.addEventListener("DOMContentLoaded", () => {
  const currentPageElement = document.getElementById("currentPage");
  getMovies(API_URL_POPULAR + current).then(showMovies);
  updatePagination(currentPageElement);
  updateButton();

  const cardsButtonPrev = document.querySelector(".cards__button-prev");
  const cardsButtonNext = document.querySelector(".cards__button-next");

  cardsButtonPrev.addEventListener("click", () => {
    if (prevPage()) {
      getMovies(API_URL_POPULAR + current).then(showMovies);
      updatePagination(currentPageElement);
      updateButton();
    }
  });

  cardsButtonNext.addEventListener("click", () => {
    if (nextPage()) {
      getMovies(API_URL_POPULAR + current).then(showMovies);
      updatePagination(currentPageElement);
      updateButton();
    }
  });

  function updateButton() {
    const cardsButtonPrev = document.querySelector(".cards__button-prev");
    const cardsButtonNext = document.querySelector(".cards__button-next");

    if (current > 1) {
      cardsButtonPrev.classList.add("active");
    } else {
      cardsButtonPrev.classList.remove("active");
    }

    if (current < 35) {
      cardsButtonNext.classList.add("active");
    } else {
      cardsButtonNext.classList.remove("active");
    }
  }
});
