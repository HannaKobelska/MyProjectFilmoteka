!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in o){var a=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,a.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequired7c6=a);var n,i=a("cHsZg"),l=a("kitKc"),s={openModalContainer:document.querySelector(".movies-cards-container"),modalCloseBtn:document.querySelector("[data-modal-close]"),modal:document.querySelector("[data-modal]"),modalMovieCardContainer:document.querySelector(".movie-modal-card")},d=1,r=1;function c(){s.modalMovieCardContainer.innerHTML="Movie's info was not find!!! :-(  Sorry!!!"}function m(e){console.log(e),s.modalMovieCardContainer.innerHTML='\n    <img src="https://image.tmdb.org/t/p/w500'.concat(e.poster_path,'" alt="').concat(e.original_title,'" class="modal__img" />\n\n        <div class="modal__info-block">\n        \n        <ul class="modal__info discription__modal">\n        <li class="discription__modal-item">\n          <h4 class="discription__modal-title">Vote / Votes</h4>\n          <p class="discription__modal-text">\n            <span class="discription__modal-text-vote">').concat(e.vote_average,'</span>\n            <span class="discription__modal-text-slash">/</span>\n            <span class="discription__modal-text-votes">').concat(e.vote_count,'</span>\n          </p>\n        </li>\n        <li class="discription__modal-item">\n          <h4 class="discription__modal-title">Popularity</h4>\n          <p class="discription__modal-text">').concat(e.popularity.toFixed(1),'</p>\n        </li>\n        <li class="discription__modal-item">\n          <h4 class="discription__modal-title">Original Title</h4>\n          <p class="discription__modal-text">').concat(e.original_title,'</p>\n        </li>\n        <li class="discription__modal-item">\n          <h4 class="discription__modal-title">Genre</h4>\n          <p class="discription__modal-text">FFFFFFFF</p>\n        </li>\n\n           <li class="modal__info about__modal">\n      <h4 class="about__modal-title">About</h4>\n      <p class="about__modal-text">').concat(e.overview,'</p>\n    </li>\n      </ul>\n \n \n    <div class="modal-button-container">\n      <button type="button" class="modal-button" id="modal-button-watched">add to Watched</button>\n      <button type="button" class="modal-button" id="modal-button-queue">add to Queue</button>\n    </div>\n  </div>\n   </div>\n   '),document.querySelector("#modal-button-watched").addEventListener("click",u),document.querySelector("#modal-button-queue").addEventListener("click",v),g(n,localStorage.getItem("watched-movies"))?p(0):p(1),g(n,localStorage.getItem("queue-movies"))?_(0):_(1)}function u(e){document.querySelector("#modal-button-watched");if(1===d){p(0),_(1);var t=localStorage.getItem("watched-movies");t?!1===g(n,t)&&localStorage.setItem("watched-movies",t+","+n):localStorage.setItem("watched-movies",n);var o=localStorage.getItem("queue-movies");!0===g(n,o)&&localStorage.setItem("queue-movies",f(n,o)),s.openModalContainer.classList.contains("movies-cards-container-library")&&(0,i.renderLibraryMovies)()}else{p(1);var a=localStorage.getItem("watched-movies");!0===g(n,a)&&localStorage.setItem("watched-movies",f(n,a)),s.openModalContainer.classList.contains("movies-cards-container-library")&&(0,i.renderLibraryMovies)()}}function v(e){document.querySelector("#modal-button-queue");if(1===r){p(1),_(0);var t=localStorage.getItem("queue-movies");t?!1===g(n,t)&&localStorage.setItem("queue-movies",t+","+n):localStorage.setItem("queue-movies",n);var o=localStorage.getItem("watched-movies");!0===g(n,o)&&localStorage.setItem("watched-movies",f(n,o)),s.openModalContainer.classList.contains("movies-cards-container-library")&&(0,i.renderLibraryMovies)()}else{_(1);var a=localStorage.getItem("queue-movies");!0===g(n,a)&&localStorage.setItem("queue-movies",f(n,a)),s.openModalContainer.classList.contains("movies-cards-container-library")&&(0,i.renderLibraryMovies)()}}function p(e){var t=document.querySelector("#modal-button-watched");0===e?(t.innerHTML="remove from Watched",d=0,t.classList.add("pressed")):(t.innerHTML="add to Watched",d=1,t.classList.remove("pressed"))}function _(e){var t=document.querySelector("#modal-button-queue");0===e?(t.innerHTML="remove from Queue",r=0,t.classList.add("pressed")):(t.innerHTML="add to Queue",r=1,t.classList.remove("pressed"))}function g(e,t){if(null===t)return!1;var o=t.split(",");console.log(o);var a=!0,n=!1,i=void 0;try{for(var l,s=o[Symbol.iterator]();!(a=(l=s.next()).done);a=!0)if(movie=l.value,movie===e)return!0}catch(e){n=!0,i=e}finally{try{a||null==s.return||s.return()}finally{if(n)throw i}}return!1}function f(e,t){for(var o=t.split(","),a=0;a<o.length;a+=1)if(o[a]===e){o.splice(a,1);break}return o.join(",")}s.openModalContainer.addEventListener("click",(function(e){e.preventDefault();var t=e.target.closest("a");t&&(console.log(t.getAttribute("data-id")),n=t.getAttribute("data-id"),document.body.classList.toggle("modal-open"),s.modal.classList.toggle("is-hidden"),(0,l.fetchMoviesById)(n).then(m).catch(c))})),s.modalCloseBtn.addEventListener("click",(function(){s.modal.classList.add("is-hidden"),document.body.classList.remove("modal-open")})),s.modal.addEventListener("click",(function(e){e.target===s.modal&&(s.modal.classList.add("is-hidden"),document.body.classList.remove("modal-open"))})),window.addEventListener("keydown",(function(e){"Escape"===e.code&&(s.modal.classList.add("is-hidden"),document.body.classList.remove("modal-open"))}))}();
//# sourceMappingURL=library.4c610615.js.map
