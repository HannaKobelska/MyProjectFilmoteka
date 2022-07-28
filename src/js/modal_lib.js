import { renderLibraryMovies } from './library.js';
import { fetchMoviesById } from './fetchMovies.js';


  const refs = {
    openModalContainer: document.querySelector('.movies-cards-container'),
    modalCloseBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    modalMovieCardContainer: document.querySelector('.movie-modal-card'),
};
  
let buttonWatchedStatus = 1;
let buttonQueueStatus = 1;

let movieId;

  refs.openModalContainer.addEventListener('click', toggleModal);
  refs.modalCloseBtn.addEventListener('click', closeByCross);
  refs.modal.addEventListener('click', closeByBackdrop);


  window.addEventListener('keydown', onEscKeyPress);

function toggleModal(event) {
    
    event.preventDefault();

    let elementOnClick = event.target.closest("a");

    if (elementOnClick) {
      console.log(elementOnClick.getAttribute(`data-id`));
      
      movieId = elementOnClick.getAttribute(`data-id`);

        document.body.classList.toggle("modal-open");
        refs.modal.classList.toggle('is-hidden');
      
      fetchMoviesById(movieId)
        .then(renderMovieModalCard)
        .catch(onFetchMoviesByIdError);
      
      
      

    }


  }

  function closeByCross() {
    refs.modal.classList.add('is-hidden');
    document.body.classList.remove("modal-open");
  }


  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      refs.modal.classList.add('is-hidden');
      document.body.classList.remove("modal-open");
    }
  }

  function closeByBackdrop(event) {
    if (event.target === refs.modal) {
      refs.modal.classList.add('is-hidden');
      document.body.classList.remove("modal-open");
    }
  }

function onFetchMoviesByIdError() {
  refs.modalMovieCardContainer.innerHTML = `Movie's info was not find!!! :-(  Sorry!!!`;
}

function renderMovieModalCard(movieInfo) {
  console.log(movieInfo);

  refs.modalMovieCardContainer.innerHTML = 

    `
    <img src="https://image.tmdb.org/t/p/w500${movieInfo.poster_path}" alt="${movieInfo.original_title}" class="modal__img" />

        <div class="modal__info-block">
        
        <ul class="modal__info discription__modal">
        <li class="discription__modal-item">
          <h4 class="discription__modal-title">Vote / Votes</h4>
          <p class="discription__modal-text">
            <span class="discription__modal-text-vote">${movieInfo.vote_average}</span>
            <span class="discription__modal-text-slash">/</span>
            <span class="discription__modal-text-votes">${movieInfo.vote_count}</span>
          </p>
        </li>
        <li class="discription__modal-item">
          <h4 class="discription__modal-title">Popularity</h4>
          <p class="discription__modal-text">${movieInfo.popularity.toFixed(1)}</p>
        </li>
        <li class="discription__modal-item">
          <h4 class="discription__modal-title">Original Title</h4>
          <p class="discription__modal-text">${movieInfo.original_title}</p>
        </li>
        <li class="discription__modal-item">
          <h4 class="discription__modal-title">Genre</h4>
          <p class="discription__modal-text">FFFFFFFF</p>
        </li>

           <li class="modal__info about__modal">
      <h4 class="about__modal-title">About</h4>
      <p class="about__modal-text">${movieInfo.overview}</p>
    </li>
      </ul>
 
 
    <div class="modal-button-container">
      <button type="button" class="modal-button" id="modal-button-watched">add to Watched</button>
      <button type="button" class="modal-button" id="modal-button-queue">add to Queue</button>
    </div>
  </div>
   </div>
   `;
  
  document.querySelector('#modal-button-watched').addEventListener('click', onButtonAddToWatched);
  document.querySelector('#modal-button-queue').addEventListener('click', onButtonAddToQueue);
  
  if (checkLocalStorage(movieId, localStorage.getItem("watched-movies"))) {
  setButtonWatchedStatus(0);
  } else {
     setButtonWatchedStatus(1);
  }
 
   if (checkLocalStorage(movieId, localStorage.getItem("queue-movies"))) {
      setButtonQueueStatus(0);
  } else {
     setButtonQueueStatus(1);
  }

  }

function onButtonAddToWatched(event) {
  let buttonOne = document.querySelector('#modal-button-watched');

  if (buttonWatchedStatus === 1) {
    setButtonWatchedStatus(0);
    setButtonQueueStatus(1);

    // тут мы убераем из localStorage Queue и добавляем в localStorage Watched
    const watchedMovies = localStorage.getItem("watched-movies");
    if (watchedMovies) {
      if (checkLocalStorage(movieId, watchedMovies) === false) {
          localStorage.setItem("watched-movies", watchedMovies + "," + movieId);
      }         
    } else {
      localStorage.setItem("watched-movies", movieId);
    }

    const queueMovies = localStorage.getItem("queue-movies");
    if (checkLocalStorage(movieId, queueMovies) === true) {
      localStorage.setItem("queue-movies", removeIdLocalStorage(movieId, queueMovies));
    }

    if (refs.openModalContainer.classList.contains('movies-cards-container-library')) {
      renderLibraryMovies();
    }

  } else {
    setButtonWatchedStatus(1);
    
      const watchedMovies = localStorage.getItem("watched-movies");
      if (checkLocalStorage(movieId, watchedMovies) === true) {
        localStorage.setItem("watched-movies", removeIdLocalStorage(movieId, watchedMovies));
    }

     if (refs.openModalContainer.classList.contains('movies-cards-container-library')) {
      renderLibraryMovies();
    }
    
  }

}
  
function onButtonAddToQueue(event) {
   let buttonTwo = document.querySelector('#modal-button-queue');

   if (buttonQueueStatus === 1) {
    setButtonWatchedStatus(1);
     setButtonQueueStatus(0);
     
       // тут мы убераем из localStorage Watched  и добавляем в localStorage Queue
    const queueMovies = localStorage.getItem("queue-movies");
    if (queueMovies) {
      if (checkLocalStorage(movieId, queueMovies) === false) {
          localStorage.setItem("queue-movies", queueMovies + "," + movieId);
      }           
    } else {
      localStorage.setItem("queue-movies", movieId);
     }
     
    const watchedMovies = localStorage.getItem("watched-movies");
      if (checkLocalStorage(movieId, watchedMovies) === true) {
        localStorage.setItem("watched-movies", removeIdLocalStorage(movieId, watchedMovies));
     }
     
       if (refs.openModalContainer.classList.contains('movies-cards-container-library')) {
      renderLibraryMovies();
    }

   
  } else {
     setButtonQueueStatus(1);
     
    const queueMovies = localStorage.getItem("queue-movies");
    if (checkLocalStorage(movieId, queueMovies) === true) {
      localStorage.setItem("queue-movies", removeIdLocalStorage(movieId, queueMovies));
     }
     
       if (refs.openModalContainer.classList.contains('movies-cards-container-library')) {
      renderLibraryMovies();
    }
    
  }
  

}
  
function setButtonWatchedStatus(buttonStatus) {
let buttonOne = document.querySelector('#modal-button-watched');

  if (buttonStatus === 0) {

    buttonOne.innerHTML = "remove from Watched";
    buttonWatchedStatus = 0;
    buttonOne.classList.add('pressed');
  } else {
    buttonOne.innerHTML = "add to Watched";
    buttonWatchedStatus = 1;
    buttonOne.classList.remove('pressed');
  }
}

function setButtonQueueStatus(buttonStatus) {
let buttonTwo = document.querySelector('#modal-button-queue');

  if (buttonStatus === 0) {

    buttonTwo.innerHTML = "remove from Queue";
    buttonQueueStatus = 0;
    buttonTwo.classList.add('pressed');
  } else {
    buttonTwo.innerHTML = "add to Queue";
    buttonQueueStatus = 1;
    buttonTwo.classList.remove('pressed');
  }
}

function checkLocalStorage(movieId, storageMovies) {

  if (storageMovies === null) {
    return false;
  }

  let storageMoviesArray = storageMovies.split(",");
  console.log(storageMoviesArray);

  for (movie of storageMoviesArray) {
    if (movie === movieId) {
      return true;
    } 
  }

  return false;
 
}

function removeIdLocalStorage(movieId, storageMovies) {
  let storageMoviesArray = storageMovies.split(",");

  for (let i = 0; i < storageMoviesArray.length; i += 1) {
    if (storageMoviesArray[i] === movieId) {
      storageMoviesArray.splice(i, 1);
      break;
    } 
  }
  return storageMoviesArray.join(",");

}