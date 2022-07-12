(() => {
  const refs = {
    openModalContainer: document.querySelector('.movies-cards-container'),
    modalCloseBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    // openModalBtn: document.querySelector('[data-modal-open]'),
  };

  refs.openModalContainer.addEventListener('click', toggleModal);
  refs.modalCloseBtn.addEventListener('click', closeByCross);
  refs.modal.addEventListener('click', closeByBackdrop);

  window.addEventListener('keydown', onEscKeyPress);
  
  // refs.openModalBtn.addEventListener('click', toggleModal);

  function toggleModal(event) {
    event.preventDefault();

    console.log("fffffffffffffff");
    document.body.classList.toggle("modal-open");
    refs.modal.classList.toggle('is-hidden');

  }


  function closeByCross() {
    refs.modal.classList.add('is-hidden');
  }


  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      refs.modal.classList.add('is-hidden');
    }
  }

  function closeByBackdrop(event) {
    if (event.target === refs.modal) {
      refs.modal.classList.add('is-hidden');
    }
  }

})();

