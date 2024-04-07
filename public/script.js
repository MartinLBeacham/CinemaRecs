const api_key = "<insert your API key>";
const tmdbBaseUrl = "https://api.themoviedb.org/3/";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  const genreRequestEndpoint = "genre/movie/list?language=en";
  const requestParams = `&api_key=${api_key}`;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  console.log(urlToFetch);
  try {
    const response = await fetch(urlToFetch, {
      method: "GET", // "POST" does not work
      cache: "no-cache",
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const genres = jsonResponse.genres;
      console.log(genres);
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint =
    "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const requestParams = `&api_key=${api_key}&with_genres=${selectedGenre}`;
  urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch, {
      method: "GET", // "POST" does not work
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      console.log("movies:", movies);
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `movie/${movie.id}?language=en-US`;
  const requestParams = `&api_key=${api_key}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
  console.log(urlToFetch);
  try {
    const response = await fetch(urlToFetch, {
      method: "GET", // "POST" does not work
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const movieInfo = await response.json();
      console.log("movie info:", movieInfo);
      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  console.log("movies:", typeof movies);
  const randomMovie = getRandomMovie(movies);
  console.log("randomMovie:", randomMovie);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

// dropdown menu to select genre
getGenres().then(populateGenreDropdown);
// button to  start the above chain of functions
playBtn.onclick = showRandomMovie;
