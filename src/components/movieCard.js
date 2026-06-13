export function createMovieCard(movie, favoriteIds = [], watchlistIds = []) {
  const isFavorite = favoriteIds.includes(movie.id);
  const isWatchlisted = watchlistIds.includes(movie.id);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const releaseDate = movie.release_date || "Unknown";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const popularity = movie.popularity ? Math.round(movie.popularity) : "N/A";
  const voteCount = movie.vote_count || 0;
  const language = movie.original_language
    ? movie.original_language.toUpperCase()
    : "N/A";

  const overview =
    movie.overview && movie.overview.length > 70
      ? `${movie.overview.slice(0, 70)}...`
      : movie.overview || "No overview available.";

  return `
    <div class="movie-card" data-id="${movie.id}">
      <button class="favorite-btn ${isFavorite ? "active" : ""}" data-id="${movie.id}">
        ${isFavorite ? "❤️" : "🤍"}
      </button>

      <button class="watchlist-btn ${isWatchlisted ? "active" : ""}" data-id="${movie.id}">
        ${isWatchlisted ? "✓" : "+"}
      </button>

      <img src="${posterUrl}" alt="${movie.title}">

      <h3>${movie.title}</h3>

      <div class="movie-meta">
        <span>⭐ ${rating}</span>
        <span>📅 ${releaseDate}</span>
        <span>🌍 ${language}</span>
        <span>🔥 ${popularity}</span>
        <span>🗳️ ${voteCount}</span>
      </div>

      <p class="movie-overview">${overview}</p>
    </div>
  `;
}
