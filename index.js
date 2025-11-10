// API 1 :`https://www.omdbapi.com/?i=tt3896198&apikey=bf6dbfbc&`

const movieListEl = document.querySelector(".movie-list");
let allMovies = [];

function reload() {
  const load = document.querySelector(".nav_link");
  if (load) {
    load.addEventListener("click", () => {
      window.location.reload();
    });
  }
}
reload();

function onSearchChange(event) {
  const id = event.target.value;
  renderMovies(id);
  Searchresults(id);
}

function Searchresults(id) {
  const info = document.querySelector(".search-info");
  if (info) {
    info.innerHTML = `Search results: <span class="red">"${id}"</span>`;
  }
} 
Searchresults(`Iron man`);

async function renderMovies(id, movieType) {
  document.body.classList += (" .movie__loading");

 if (movieType === "series" || movieType === "movie" || movieType === "game") {
   id += `&type=`+ movieType;
  }else if (movieType === `all`){
   id += `&type=`;
  }

  const movies = await fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=bf6dbfbc&s=${id}`
  );
  const movieData = await movies.json();

  if (movieData.Search) {
    allMovies = movieData.Search;
    movieListEl.innerHTML = allMovies.map((movie) =>
      movieHTML(movie)
  ).slice(0, 6).join("");
  } else {
    movieListEl.innerHTML = "<p class=\"no-movies\">No movies found.</p>";
  }
  
  document.body.classList.remove("movie__loading");
}

function onFilterChange(event) {
  const movieType = event.target.value;
 
let filteredMovies = allMovies;
if (movieType !== "all") {
  filteredMovies = allMovies.filter(movie => 
    movie.Type === movieType);
  }

movieListEl.innerHTML = filteredMovies.map((movie) => movieHTML(movie)
).slice(0, 6).join("");
}

setTimeout(() => {
renderMovies("Iron man", "all");
}, 500);


function movieHTML(movie) {
  return `<div class="movie" >
            <div class="movie-card">
              <div class="movie-card__wrapper">
                <figure class="movie__img__wrapper">
                  <img class="movie__img" src="${movie.Poster}" alt="" />
                </figure>
              <p><b>Title :</b> <span class="red">${movie.Title}</span></p>
              <p><b>Year :</b> <span class="red">${movie.Year}</span></p>
              <p><b>Type :</b> <span class="red">${movie.Type}</span></p>
            </div>
          </div>
        </div>`;
}
