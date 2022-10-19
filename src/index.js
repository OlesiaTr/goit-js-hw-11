import { Notify } from 'notiflix/build/notiflix-notify-aio';

import PixabayAPI from './js/pixabayAPI';
import { refs } from './js/refs';
import createCard from './js/cardMarkup';

import './sass/index.scss';

const pixabay = new PixabayAPI();

const callback = async function (entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting && entry.intersectionRect.bottom > 550) {
      pixabay.incrementPage();
      observer.unobserve(entry.target);

      try {
        const { hits, totalHits } = await pixabay.getPhotos();
        createCard(hits);
        pixabay.totalPages(totalHits);

        if (pixabay.isShowLoadMore) {
          const target = document.querySelector('.photo-card:last-child');
          io.observe(target);
        }
      } catch (error) {
        Notify.failure(
          error.message,
          'Sorry, something went wrong here. Please try again!'
        );
        clearPage();
      }
    }
  });
};

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

const io = new IntersectionObserver(callback, options);

const onSubmit = async event => {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) {
    return Notify.failure('Oops, you should type something for search...');
  }

  pixabay.query = query;
  clearPage();

  try {
    const { hits, totalHits } = await pixabay.getPhotos();
    if (hits.length === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    Notify.success(`Hooray! We found ${totalHits} images.`);
    createCard(hits);
    pixabay.calculateTotalPages(totalHits);
    if (pixabay.isShowLoadMore) {
      const target = document.querySelector('.photo-card:last-child');
      io.observe(target);
    }
  } catch (error) {
    Notify.failure(
      error.message,
      'Sorry, something went wrong here. Please try again!'
    );
    clearPage();
  }
};

refs.form.addEventListener('submit', onSubmit);

function clearPage() {
  pixabay.resetPage();
  refs.list.innerHTML = '';
}
