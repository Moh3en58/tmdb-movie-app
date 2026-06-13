const FAVORITES_KEY = "tmdb_favorites";
const WATCHLIST_KEY = "tmdb_watchlist";
const THEME_KEY = "tmdb_theme";

export function getFavorites() {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(movieId) {
  const favorites = getFavorites();

  if (favorites.includes(movieId)) {
    const updatedFavorites = favorites.filter((id) => id !== movieId);
    saveFavorites(updatedFavorites);
    return updatedFavorites;
  }

  favorites.push(movieId);
  saveFavorites(favorites);
  return favorites;
}

export function getWatchlist() {
  const watchlist = localStorage.getItem(WATCHLIST_KEY);
  return watchlist ? JSON.parse(watchlist) : [];
}

export function saveWatchlist(watchlist) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
}

export function toggleWatchlist(movieId) {
  const watchlist = getWatchlist();

  if (watchlist.includes(movieId)) {
    const updatedWatchlist = watchlist.filter((id) => id !== movieId);
    saveWatchlist(updatedWatchlist);
    return updatedWatchlist;
  }

  watchlist.push(movieId);
  saveWatchlist(watchlist);
  return watchlist;
}

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "dark";
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
