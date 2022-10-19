import lightbox from './lightbox';
import CardTpl from '../templates/card.hbs';
import { refs } from './refs';

// Displays list of images and enables SimpleLightBox.
export default function createCard(r) {
  const card = r.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) =>
      CardTpl({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      })
  );

  refs.list.insertAdjacentHTML('beforeend', card.join(''));

  return lightbox();
}
