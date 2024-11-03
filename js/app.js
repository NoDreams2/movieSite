const API_KEY = "2242dc3a-8d40-4f0b-816a-45d2be81e10b";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

let currentPage = 1;
let isSearching = false; // Отслеживаем, активен ли поиск

function updateMovies() {
  const apiUrl = `${API_URL_POPULAR}${currentPage}`;
  getMovies(apiUrl);
  document.getElementById("currentPage").innerHTML = currentPage;

  if (isSearching) {
    document.querySelector(".cards__pagination").style.display = "none";
  } else {
    document.querySelector(".cards__pagination").style.display = "flex";
  }
}

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateMovies();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  if (currentPage < 35) {
    currentPage++;
    updateMovies();
  }
});

updateMovies();

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);

  if (url.startWith(API_URL_POPULAR)) {
    isSearching = false;
    document.querySelector(".cards__pagination").style.display = "flex";
  } else {
    isSearching = true;
  }
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".cards__movies");

  // Очиска фильмов
  document.querySelector(".cards__movies").innerHTML = "";

  if (data.items && Array.isArray(data.items) && data.items.length > 0) {
    data.items.forEach((movie) => {
      const movieEl = document.createElement("div");
      movieEl.classList.add("cards__movie");
      movieEl.innerHTML = `
              <div class="cards__cover-inner">
                <img
                  class="cards__movie-cover"
                  src="${movie.posterUrlPreview}"
                  alt="${movie.nameRu}"
                />
                <div class="cards__cover_darkened"></div>
              </div>
              <div class="cards__info">
                <div class="cards__title">${movie.nameRu}</div>
                <div class="cards__category">${movie.genres.map(
                  (genre) => ` ${genre.genre}`
                )}</div>
                <div class="cards__average cards__average_${getClassByRate(
                  movie.ratingKinopoisk
                )}">${movie.ratingKinopoisk}</div>
              </div>
          `;
      const coverDarkened = movieEl.querySelector(".cards__cover_darkened");
      coverDarkened.addEventListener("click", () =>
        openModal(movie.kinopoiskId)
      );
      moviesEl.appendChild(movieEl);
    });
  } else {
    data.films.forEach((movie) => {
      const movieEl = document.createElement("div");
      movieEl.classList.add("cards__movie");
      movieEl.innerHTML = `
              <div class="cards__cover-inner">
                <img
                  class="cards__movie-cover"
                  src="${movie.posterUrlPreview}"
                  alt="${movie.nameRu}"
                />
                <div class="cards__cover_darkened"></div>
              </div>
              <div class="cards__info">
                <div class="cards__title">${movie.nameRu}</div>
                <div class="cards__category">${movie.genres.map(
                  (genre) => ` ${genre.genre}`
                )}</div>
                ${
                  movie.rating &&
                  `
                <div class="cards__average cards__average_${getClassByRate(
                  movie.rating
                )}">${movie.rating}</div>
                `
                }  
              </div>
          `;
      const coverDarkened = movieEl.querySelector(".cards__cover_darkened");
      coverDarkened.addEventListener("click", () => {
        openModal(movie.filmId);
      });
      moviesEl.appendChild(movieEl);
    });
  }
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    isSearching = true;
    currentPage = 1;
    document.querySelector(".cards__pagination").style.display = "none";
    getMovies(apiSearchUrl);

    search.value = "";
  }
});

// modal
const modalEl = document.querySelector(".cards__modal");

async function openModal(id) {
  const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();

  modalEl.classList.add("cards__modal_show");
  document.body.classList.add("stop-scrolling");

  modalEl.innerHTML = `
    <div class="cards__modal-card">
      <img class="cards__movie-backdrop" src="${respData.posterUrl}" alt="">
      <h2 class="cards__movie-titles">
        <span class="cards__movie-title">${respData.nameRu}</span>
        <span class="cards__movie-release-year">${respData.year}</span>
      <h2>
      <ul class="cards__movie-info">
        <div class="loader"></div>
        <li class="cards__list cards__movie-genre">${respData.genres.map(
          (el) => ` <span>${el.genre}</span>`
        )}</li>
        <li class="cards__list cards__movie-runtime">${
          respData.filmLength
        } мин</li>
        <li class="cards__list">Сайт: <a class="cards__movie-site" href="${
          respData.webUrl
        }">${respData.webUrl}</a></li>
        <li class="cards__list cards__movie-overview">${
          respData.description
        }</li>
      </ul>
      <button type="button" class="cards__button-close">Закрыть</button>
    </div>
  `;
  const btnClose = document.querySelector(".cards__button-close");
  btnClose.addEventListener("click", () => closeModal());
}

function closeModal() {
  modalEl.classList.remove("cards__modal_show");
  document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target === modalEl) {
    closeModal();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    closeModal();
  }
});
