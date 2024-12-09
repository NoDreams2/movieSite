const modalEl = document.querySelector(".cards__modal");
const movieCard = document.querySelector(".cards__movie-card");

function createModalElement(movieData) {
  const modalCard = document.createElement("div");
  modalCard.classList.add("cards__movie-card");

  modalEl.classList.add("show");

  const movieBackdrop = document.createElement("img");
  movieBackdrop.src = movieData.posterUrlPreview;
  movieBackdrop.alt = movieData.nameRu;
  movieBackdrop.classList.add("cards__movie-backdrop");
  modalCard.appendChild(movieBackdrop);

  const movieTitles = document.createElement("h2");
  movieTitles.classList.add("cards__movie-titles");

  const movieName = document.createElement("span");
  movieName.classList.add("cards__movie-name");
  movieName.textContent = movieData.nameRu;
  movieTitles.appendChild(movieName);

  const movieYear = document.createElement("span");
  movieYear.classList.add("cards__movie-release-year");
  movieYear.textContent = movieData.year;
  movieTitles.appendChild(movieYear);

  modalCard.appendChild(movieTitles);

  const movieInfo = document.createElement("ul");
  movieInfo.classList.add("cards__movie-info");

  const movieGenre = document.createElement("li");
  movieGenre.classList.add("cards__item", "cards__movie-genre");
  movieGenre.textContent = movieData.genres
    .map((genre) => genre.genre)
    .join(", ");
  movieInfo.appendChild(movieGenre);

  const movieRuntime = document.createElement("li");
  movieRuntime.classList.add("cards__item", "cards__movie-runtime");
  movieRuntime.textContent = `${movieData.filmLength} мин`;
  movieInfo.appendChild(movieRuntime);

  const movieSite = document.createElement("li");
  movieSite.classList.add("cards__item");
  const movieSiteSpan = document.createElement("span");
  movieSiteSpan.classList.add("cards__movie-site");
  movieSiteSpan.textContent = "Сайт: ";
  const movieSiteLink = document.createElement("a");
  movieSiteLink.href = movieData.webUrl;
  movieSiteLink.classList.add("cards__movie-site-link");
  movieSiteLink.textContent = movieData.webUrl;
  movieSiteSpan.appendChild(movieSiteLink);
  movieSite.appendChild(movieSiteSpan);
  movieInfo.appendChild(movieSite);

  const movieOverview = document.createElement("li");
  movieOverview.classList.add("cards__item", "cards__movie-overview");
  movieOverview.textContent = movieData.description;
  movieInfo.appendChild(movieOverview);

  modalCard.appendChild(movieInfo);

  const closeButton = document.createElement("button");
  closeButton.classList.add("cards__button-close");
  closeButton.type = "button";
  closeButton.textContent = "Закрыть";
  modalCard.appendChild(closeButton);

  modalEl.appendChild(modalCard);

  closeButton.addEventListener("click", closeModal);
  modalCard.appendChild(closeButton);
  modalEl.appendChild(modalCard);

  return modalCard;
}

async function openModal(id) {
  const movieData = await getMovieDetails(id);
  modalEl.classList.add("show");
  document.body.classList.add("stop-scrolling");
  modalEl.innerHTML = "";
  modalEl.appendChild(createModalElement(movieData));

  document.addEventListener("click", handleClickOutsideModal);

  const closeButton = modalEl.querySelector(".cards__button-close");
  closeButton.addEventListener("click", closeModal);
}

function closeModal() {
  modalEl.classList.remove("show");
  document.body.classList.remove("stop-scrolling");
}

