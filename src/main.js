import "./style.css";

import { getTrendingMovies, searchMovies, getMovieVideos } from "./api/tmdbApi";

import { createMovieCard } from "./components/movieCard";

import {
  getFavorites,
  toggleFavorite,
  getWatchlist,
  toggleWatchlist,
  getTheme,
  saveTheme,
} from "./utils/storage";

let currentMovies = [];
let currentPage = 1;
let currentSearch = "";

document.querySelector("#app").innerHTML = `
  <div class="app">
    <header class="app-header">
      <div class="top-bar">
        <h1>TMDB Movie Explorer</h1>
        <button id="theme-toggle">🌙 Dark</button>
      </div>

      <div class="search-wrapper">
        <input
          id="search-input"
          type="text"
          placeholder="Search for a movie, tv show, person......"
        />
        <button id="search-button">Search</button>
      </div>

      <div class="controls">
        <select id="sort-select">
          <option value="">Sort By</option>
          <option value="rating">Rating</option>
          <option value="date">Release Date</option>
          <option value="title">Name</option>
        </select>

        <select id="genre-select">
          <option value="">Filter Genre</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
        </select>

        <button id="favorites-filter">Favorites ❤️</button>
        <button id="watchlist-filter">Watchlist 📺</button>
        <button id="reset-button">Reset</button>
      </div>

      <div id="stats-bar"></div>
    </header>

    <div id="movies-container"></div>

    <div id="pagination">
      <button id="prev-page">← Previous</button>
      <span id="page-number">Page 1</span>
      <button id="next-page">Next →</button>
    </div>

    <button id="back-to-top">↑</button>

    <div id="modal-overlay" class="hidden"></div>
  </div>
`;

const moviesContainer = document.querySelector("#movies-container");
const themeToggleButton = document.querySelector("#theme-toggle");

function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  themeToggleButton.textContent = theme === "light" ? "☀️ Light" : "🌙 Dark";
}

function updateStats(movies) {
  const statsBar = document.querySelector("#stats-bar");

  const averageRating =
    movies.reduce((sum, movie) => sum + movie.vote_average, 0) /
      movies.length || 0;

  statsBar.innerHTML = `
    <div class="stat-box">Movies: ${movies.length}</div>
    <div class="stat-box">Avg Rating: ${averageRating.toFixed(1)}</div>
    <div class="stat-box">Favorites: ${getFavorites().length}</div>
    <div class="stat-box">Watchlist: ${getWatchlist().length}</div>
  `;
}

function observeMovieCards() {
  const cards = document.querySelectorAll(".movie-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  cards.forEach((card) => observer.observe(card));
}

function renderMovies(movies) {
  currentMovies = movies;

  const favorites = getFavorites();
  const watchlist = getWatchlist();

  moviesContainer.innerHTML = "";

  if (movies.length === 0) {
    moviesContainer.innerHTML = `<div class="empty-message">No movies found.</div>`;
    updateStats([]);
    return;
  }

  movies.forEach((movie) => {
    moviesContainer.innerHTML += createMovieCard(movie, favorites, watchlist);
  });

  updateStats(movies);
  observeMovieCards();
}

function showLoading() {
  moviesContainer.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading movies...</p>
    </div>
  `;
}

function showError() {
  moviesContainer.innerHTML = `
    <div class="error-box">
      <p>Failed to load movies.</p>
      <button id="retry-button">Retry</button>
    </div>
  `;

  document.querySelector("#retry-button").addEventListener("click", () => {
    loadMovies(currentPage);
  });
}

async function loadMovies(page = 1) {
  try {
    showLoading();

    const data = await getTrendingMovies(page);

    currentPage = page;
    currentSearch = "";
    renderMovies(data.results);

    document.querySelector("#page-number").textContent = `Page ${page}`;
  } catch (error) {
    showError();
    console.error(error);
  }
}

async function performSearch(query, page = 1) {
  try {
    showLoading();

    const data = await searchMovies(query, page);

    currentPage = page;
    currentSearch = query;
    renderMovies(data.results);

    document.querySelector("#page-number").textContent = `Page ${page}`;
  } catch (error) {
    showError();
    console.error(error);
  }
}

document.querySelector("#search-input").addEventListener("input", async (e) => {
  const query = e.target.value.trim();

  if (!query) {
    loadMovies(1);
    return;
  }

  await performSearch(query, 1);
});

document.querySelector("#search-button").addEventListener("click", () => {
  const query = document.querySelector("#search-input").value.trim();

  if (query) {
    performSearch(query, 1);
  }
});

document.querySelector("#sort-select").addEventListener("change", (e) => {
  const value = e.target.value;
  const sorted = [...currentMovies];

  if (value === "rating") {
    sorted.sort((a, b) => b.vote_average - a.vote_average);
  }

  if (value === "date") {
    sorted.sort(
      (a, b) =>
        new Date(b.release_date || "1900-01-01") -
        new Date(a.release_date || "1900-01-01"),
    );
  }

  if (value === "title") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  renderMovies(sorted);
});

document.querySelector("#genre-select").addEventListener("change", (e) => {
  const genreId = Number(e.target.value);

  if (!genreId) {
    renderMovies(currentMovies);
    return;
  }

  const filtered = currentMovies.filter((movie) =>
    movie.genre_ids?.includes(genreId),
  );

  renderMovies(filtered);
});

moviesContainer.addEventListener("click", async (e) => {
  const favoriteBtn = e.target.closest(".favorite-btn");

  if (favoriteBtn) {
    const id = Number(favoriteBtn.dataset.id);
    toggleFavorite(id);
    renderMovies(currentMovies);
    return;
  }

  const watchlistBtn = e.target.closest(".watchlist-btn");

  if (watchlistBtn) {
    const id = Number(watchlistBtn.dataset.id);
    toggleWatchlist(id);
    renderMovies(currentMovies);
    return;
  }

  const card = e.target.closest(".movie-card");

  if (!card) return;

  const movieId = Number(card.dataset.id);
  const movie = currentMovies.find((m) => m.id === movieId);

  if (!movie) return;

  const videos = await getMovieVideos(movieId);
  const trailer = videos.find((video) => video.type === "Trailer");

  const overlay = document.querySelector("#modal-overlay");
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  overlay.classList.remove("hidden");

  overlay.innerHTML = `
    <div class="modal">
      <button id="close-modal">✕</button>

      <img src="${posterUrl}" alt="${movie.title}">

      <div class="modal-content">
        <h2>${movie.title}</h2>

        <p><strong>Rating:</strong> ⭐ ${movie.vote_average?.toFixed(1) || "N/A"}</p>
        <p><strong>Release:</strong> ${movie.release_date || "Unknown"}</p>
        <p><strong>Language:</strong> ${movie.original_language?.toUpperCase() || "N/A"}</p>
        <p>${movie.overview || "No overview available."}</p>

        ${
          trailer
            ? `
              <a
                class="trailer-button"
                target="_blank"
                href="https://www.youtube.com/watch?v=${trailer.key}"
              >
                ▶ Watch Trailer
              </a>
            `
            : ""
        }
      </div>
    </div>
  `;
});

document.addEventListener("click", (e) => {
  if (e.target.id === "close-modal" || e.target.id === "modal-overlay") {
    document.querySelector("#modal-overlay").classList.add("hidden");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelector("#modal-overlay").classList.add("hidden");
  }

  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault();
    document.querySelector("#search-input").focus();
  }
});

document.querySelector("#favorites-filter").addEventListener("click", () => {
  const favorites = getFavorites();
  renderMovies(currentMovies.filter((movie) => favorites.includes(movie.id)));
});

document.querySelector("#watchlist-filter").addEventListener("click", () => {
  const watchlist = getWatchlist();
  renderMovies(currentMovies.filter((movie) => watchlist.includes(movie.id)));
});

document.querySelector("#reset-button").addEventListener("click", () => {
  document.querySelector("#search-input").value = "";
  document.querySelector("#sort-select").value = "";
  document.querySelector("#genre-select").value = "";
  loadMovies(1);
});

themeToggleButton.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  saveTheme(newTheme);
  applyTheme(newTheme);
});

document.querySelector("#prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    const newPage = currentPage - 1;

    if (currentSearch) {
      performSearch(currentSearch, newPage);
    } else {
      loadMovies(newPage);
    }
  }
});

document.querySelector("#next-page").addEventListener("click", () => {
  const newPage = currentPage + 1;

  if (currentSearch) {
    performSearch(currentSearch, newPage);
  } else {
    loadMovies(newPage);
  }
});

window.addEventListener("scroll", () => {
  const button = document.querySelector("#back-to-top");

  if (window.scrollY > 500) {
    button.classList.add("show");
  } else {
    button.classList.remove("show");
  }
});

document.querySelector("#back-to-top").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

applyTheme(getTheme());
loadMovies();
