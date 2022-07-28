import { fetchMoviesTrending, fetchMoviesGenres, fetchMoviesByName, fetchMoviesById } from './js/fetchMovies.js';
import Pagination from 'tui-pagination';
import "tui-pagination/dist/tui-pagination.min.css";



const refs = {
  moviesContainer: document.querySelector('.movies-cards-container'),
  formSearchBox: document.querySelector('.header-input-container'),
  inputSearchBox: document.querySelector('#search-box'),

  errorMessage: document.querySelector('.header-error-container'),
  };

let pageNumber = 1;

let totalMovies = 0;

let pageQuantity = 0;

let genresArray = [];

let searchActive = false;

let movieToFind = "";


const containerPagination = document.querySelector('#tui-pagination-container');

const pagination = new Pagination(containerPagination, {
        totalItems: 0,
        itemsPerPage: 20,
        visiblePages: 5 });

pagination.on('afterMove', (event) => {

  if (pageNumber !== event.page) {
      pageNumber = event.page;
      
    if (searchActive === false) {
         fetchMoviesTrending(pageNumber)
            .then(renderMoviesCards)
      .catch(onFetchError);
    } else {
        fetchMoviesByName(movieToFind, pageNumber)
        .then(renderMoviesCards)
        .catch(onFetchError);
      }
    
  }
 
});



fetchMoviesGenres()
  .then((genre) => {

    for (let i = 0; i < genre.genres.length; i += 1) {
      genresArray.push(genre.genres[i]);
    }

  });

function genresById(genre_ids) {
  let resultstr = "";

  for (let i = 0; i < genre_ids.length; i += 1) {
    for (let b = 0; b < genresArray.length; b += 1) {
      if (genre_ids[i] === genresArray[b].id) {
        if (i >= 1) {
          resultstr += ", ";
        }

        if (i >= 2) {
          resultstr += "Other";
          return resultstr;
        }
        
        resultstr += genresArray[b].name;
        break;
      } 
    } 
  }
  
  return resultstr;
}

function filmDate(release_date) {
  let filmYearDate = new Date(release_date);
  return filmYearDate.getFullYear();
}



fetchMoviesTrending(pageNumber)
        .then(renderMoviesCards)
  .catch(onFetchError);
        

refs.formSearchBox.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  movieToFind = refs.inputSearchBox.value.trim();
  
    if (movieToFind.length > 0) {
        searchActive = true;
        pageNumber = 1;
      
        fetchMoviesByName(movieToFind, pageNumber)
        .then(renderMoviesCards)
        .catch(onFetchError);

    }
}


function renderMoviesCards(movies) {

  console.log(movies);

    refs.moviesContainer.innerHTML = movies.results.map(({ poster_path, genre_ids, title, release_date, id }) => {
        return `
        <div class="movie-card" >
        <a href="" class="movie-card-link" data-modal-open data-id="${id}">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" class="movie-card-img" width = "300px">
            <div class="movie-card-info-set"> 
                <h3 class="movie-card-info-title">${title}</h3>
                <div class="movie-card-info-details-set">
                  <p class="movie-card-info-genre">${genresById(genre_ids)}</p>
                  <p class="movie-card-info-genre"> &nbsp; &#124; &nbsp; </p>
                  <p class="movie-card-info-date">${filmDate(release_date)}</p>
                </div>
            </div>
         </a>
       
        </div>
    `;
})
    .join('');
  
  totalMovies = movies.total_results;
  pageQuantity = Math.ceil(totalMovies / 20);
  
  pagination.setTotalItems(totalMovies);
 

  pagination.movePageTo(pageNumber);
  console.log(pageNumber);
  
}


function onFetchError() {
  refs.errorMessage.classList.remove('is-hidden');
  setTimeout(() => {
    refs.errorMessage.classList.add('is-hidden');
  }, 2000);
}






