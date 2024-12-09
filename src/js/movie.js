function getClassByRate(rating) {
  if (rating >= 7) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else if (rating >= 1) {
    return "red";
  } else {
    return "gray";
  }
}

function showMovies(data) {
  const cardsMovies = document.getElementById("cards-movies");

  cardsMovies.innerHTML = "";

  if (data.items) {
    data.items.forEach((item) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("cards__movie");

      const coverInner = document.createElement("div");
      coverInner.classList.add("cards__cover-inner");

      const movieCover = document.createElement("img");
      movieCover.src = item.posterUrlPreview;
      movieCover.alt = item.nameRu;
      movieCover.classList.add("img-responsive", "cards__movie-cover");
      coverInner.appendChild(movieCover);

      const coverDarkened = document.createElement("div");
      coverDarkened.classList.add("cards__cover_darkened");
      coverInner.appendChild(coverDarkened);

      const itemAverage = document.createElement("span");
      itemAverage.classList.add(
        "cards__average",
        `cards__average_${getClassByRate(item.ratingKinopoisk)}`
      );
      itemAverage.textContent = item.ratingKinopoisk;
      coverInner.appendChild(itemAverage);

      movieCard.appendChild(coverInner);

      const itemInfo = document.createElement("div");
      itemInfo.classList.add("cards__info");

      const itemTitle = document.createElement("h2");
      itemTitle.classList.add("cards__title");
      itemTitle.textContent = item.nameRu;
      itemInfo.appendChild(itemTitle);

      const itemCategory = document.createElement("span");
      itemCategory.classList.add("cards__category");
      const genres = item.genres.map((genre) => genre.genre);
      itemCategory.textContent = genres.join(", ");
      itemInfo.appendChild(itemCategory);

      movieCard.appendChild(itemInfo);

      cardsMovies.appendChild(movieCard);

      const darkened = movieCard.querySelector(".cards__cover_darkened");
      darkened.addEventListener("click", () => {
        openModal(item.kinopoiskId)
      })
    });
  } else {
    data.films.forEach((film) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("cards__movie");

      const coverInner = document.createElement("div");
      coverInner.classList.add("cards__cover-inner");

      const movieCover = document.createElement("img");
      movieCover.src = film.posterUrlPreview;
      movieCover.alt = film.nameRu;
      movieCover.classList.add("img-responsive", "cards__movie-cover");
      coverInner.appendChild(movieCover);

      const coverDarkened = document.createElement("div");
      coverDarkened.classList.add("cards__cover_darkened");
      coverInner.appendChild(coverDarkened);

      const itemAverage = document.createElement("span");
      itemAverage.classList.add(
        "cards__average",
        `cards__average_${getClassByRate(film.rating)}`
      );
      itemAverage.textContent = film.rating;
      coverInner.appendChild(itemAverage);

      movieCard.appendChild(coverInner);

      const itemInfo = document.createElement("div");
      itemInfo.classList.add("cards__info");

      const itemTitle = document.createElement("h2");
      itemTitle.classList.add("cards__title");
      itemTitle.textContent = film.nameRu;
      itemInfo.appendChild(itemTitle);

      const itemCategory = document.createElement("span");
      itemCategory.classList.add("cards__category");
      const genres = film.genres.map((genre) => genre.genre);
      itemCategory.textContent = genres.join(", ");
      itemInfo.appendChild(itemCategory);

      movieCard.appendChild(itemInfo);

      cardsMovies.appendChild(movieCard);
      
      const darkened = movieCard.querySelector(".cards__cover_darkened");
      darkened.addEventListener("click", () => {
        openModal(film.filmId)
      })
    });
  }
}