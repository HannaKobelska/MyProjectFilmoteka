import { fetchMoviesTrending, fetchMoviesGenres, fetchMoviesByName, fetchMoviesById } from './fetchMovies.js';

const refs = {
    moviesContainer: document.querySelector('.movies-cards-container'),

    watchBtn: document.querySelector('#header-watched-button'),
    queueBtn: document.querySelector('#header-queue-button'),
    
  };

let pageNumber = 1;

let genresArray = [];

renderLibraryMovies();

export function renderLibraryMovies() {
    if (refs.watchBtn === null) {
        return;
    }
    if (refs.watchBtn.classList.contains('is-header-active')) {
    let watchedMovies = localStorage.getItem("watched-movies");
    let storageMoviesArray = watchedMovies.split(",");
        
    refs.moviesContainer.innerHTML = "";

    for (movie of storageMoviesArray) {
        console.log(movie);
        fetchMoviesById(movie)
            .then(renderChoosenMoviesCard)
            .catch(onFetchError);
    }
    } else {
            if (refs.queueBtn.classList.contains('is-header-active')) {
    let queueMovies = localStorage.getItem("queue-movies");
    let storageMoviesArray = queueMovies.split(",");
        
    refs.moviesContainer.innerHTML = "";

    for (movie of storageMoviesArray) {
        console.log(movie);
        fetchMoviesById(movie)
            .then(renderChoosenMoviesCard)
            .catch(onFetchError);
    }
}
}
}


fetchMoviesGenres()
  .then((genre) => {

    for (let i = 0; i < genre.genres.length; i += 1) {
      genresArray.push(genre.genres[i]);
    }

  });

function genresById(genre_ids) {
    console.log(genre_ids);
  let resultstr = "";

  for (let i = 0; i < genre_ids.length; i += 1) {
        if (i >= 1) {
          resultstr += ", ";
        }

        if (i >= 2) {
          resultstr += "Other";
          return resultstr;
        }
        
        resultstr += genre_ids[i].name;
      
      } 
  
  return resultstr;
}

function filmDate(release_date) {
  let filmYearDate = new Date(release_date);
  return filmYearDate.getFullYear();
}


function renderChoosenMoviesCard(movie) {

    refs.moviesContainer.innerHTML += 
    `
        <div class="movie-card" >
        <a href="" class="movie-card-link" data-modal-open data-id="${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="movie-card-img" width = "300px">
            <div class="movie-card-info-set"> 
                <h3 class="movie-card-info-title">${movie.title}</h3>
                <div class="movie-card-info-details-set">
                  <p class="movie-card-info-genre">${genresById(movie.genres)}</p>
                  <p class="movie-card-info-genre"> &nbsp; &#124; &nbsp; </p>
                  <p class="movie-card-info-date">${filmDate(movie.release_date)}</p>
                </div>
            </div>
         </a>
       
        </div>
    `;
    
}


function onFetchError() {
  refs.errorMessage.classList.remove('is-hidden');
  setTimeout(() => {
    refs.errorMessage.classList.add('is-hidden');
  }, 2000);
}

