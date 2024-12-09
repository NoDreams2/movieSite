const headerForma = document.querySelector(".header__forma");
const cardsPagination = document.querySelector(".cards__pagination");
headerForma.addEventListener("submit", (e) => {
  e.preventDefault();
  const headerSearch = document.querySelector(".header__search");
  const apiUrlSearch = API_URL_SEARCH + headerSearch.value;
  getMovies(apiUrlSearch).then(showMovies);
  headerSearch.value = "";
  cardsPagination.style.display = "none";
});
