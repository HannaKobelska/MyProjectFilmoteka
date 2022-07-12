import { fetchMoviesTrending, fetchMoviesGenres, fetchMoviesByName } from './js/fetchMovies.js';

const refs = {
  moviesContainer: document.querySelector('.movies-cards-container'),
  formSearchBox: document.querySelector('.header-input-container'),
  inputSearchBox: document.querySelector('#search-box'),

  errorMessage: document.querySelector('.header-error-container'),
  };

let pageNumber = 1;

let genresArray = [];


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
  
  console.log("kjsfhlajshfjaks");

    pageNumber = 1;
    
    const movieToFind = refs.inputSearchBox.value.trim();
  
    if (movieToFind.length > 0) {
         
        fetchMoviesByName(movieToFind, pageNumber)
        .then(renderMoviesCards)
        .catch(onFetchError);

    }
}



// refs.searchForm.addEventListener('submit', onFormSubmit);
// refs.loadMoreBtn.addEventListener('click', onFormLoadMore);



// function onFormLoadMore(event) {
//     event.preventDefault();

//     pageNumber += 1;

//     const pictureToFind = refs.searchInput.value.trim();
  
//     if (pictureToFind.length !== 0) {
         
//         API.fetchPictures(pictureToFind, pageNumber)
//         .then(renderPictureCard)
//         .catch(onFetchError);

//     }
// }



function renderMoviesCards(movies) {

  console.log(movies);

    refs.moviesContainer.innerHTML = movies.results.map(({ poster_path, genre_ids, title, release_date, id }) => {
        return `
        <div class="movie-card">
        <a href="" class="movie-card-link" data-modal-open>
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
    
//     refs.loadMoreBtn.style.visibility = 'visible';
    
//     lightbox.refresh();
    
}


function onFetchError() {
  refs.errorMessage.classList.remove('is-hidden');
  setTimeout(() => {
    refs.errorMessage.classList.add('is-hidden');
  }, 2000);
}

