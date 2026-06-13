const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

async function fetchFromTMDB(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch TMDB data");
  }

  return response.json();
}

export async function getTrendingMovies(page = 1) {
  return fetchFromTMDB(`/trending/movie/week?page=${page}`);
}

export async function searchMovies(query, page = 1) {
  return fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
  );
}

export async function getMovieVideos(movieId) {
  const data = await fetchFromTMDB(`/movie/${movieId}/videos?language=en-US`);
  return data.results;
}
