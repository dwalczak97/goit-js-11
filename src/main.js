import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '45141077-2f2085cf6ccd740accb993600';
const BASE_URL = 'https://pixabay.com/api/';
const searchForm = document.querySelector(`.search-form`);
const inputField = document.querySelector(`.input-field`);
const resultsGalleryList = document.querySelector(`.gallery-result-list`);
const queryWord = document.querySelector('.query-word');

const createToggle = selector => ({
  enable: () => document.querySelector(selector).classList.remove('disabled'),
  disable: () => document.querySelector(selector).classList.add('disabled'),
});

const loader = createToggle('.spinner');
const loadText = createToggle('.loading-text');
const queryText = createToggle('.query-text');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const request = inputField.value;
  fetchImages(request);
});

function fetchImages(request) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    request
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  loader.enable();
  loadText.enable();

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      loader.disable();
      loadText.disable();
      queryText.enable();
      queryWord.textContent = inputField.value;

      if (data.hits) {
        displayImages(data.hits);
      } else {
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#ef4040',
          messageColor: '#fff',
        });
      }
    })
    .catch(error => {
      loader.disable();
      loadText.disable();
      console.error(error);
      iziToast.warning({
        title: 'Error',
        message: 'An error occurred while fetching images',
      });
    });
}

const message =
  'Sorry, there are no images matching your search query. Please try again!';

function displayImages(images) {
  resultsGalleryList.innerHTML = '';
  if (images.length === 0) {
    loader.disable();
    loadText.disable();
    queryText.disable();

    iziToast.warning({
      message: message,
      backgroundColor: '#ef4040',
      messageColor: `#fff`,
      position: 'topRight',
      timeout: 2000,
    });
    setTimeout(clearValue, 2000);

    return;
  }
  const imagesMarkup = images.map(makeImgItem).join('');
  resultsGalleryList.insertAdjacentHTML('beforeend', imagesMarkup);
  setTimeout(clearValue, 500);

  lightbox.refresh();
}

function clearValue() {
  inputField.value = '';
}

const lightbox = new SimpleLightbox('.gallery-result-list a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  className: 'simpleLightboxGallery',
  doubleTapZoom: 2,
  scrollZoom: true,
  overlay: true,
});

function makeImgItem({
  webformatURL,
  tags,
  downloads,
  likes,
  comments,
  views,
}) {
  return `<li class="list-container">
    <div >
      <div class="image-container">
        <a href="${webformatURL}" data-source="${webformatURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
      </div>
      <div class="descr-element">
        <ul class="descr-list">
          <li>
            <h3>Likes</h3>
              <p>${likes}</p>
          </li>
          <li>
            <h3>Views</h3>
              <p>${views}</p>
          </li>
          <li>
            <h3>Comments</h3>
            <p>${comments}</p>
          </li>
          <li>
            <h3>Downloads</h3>
              <p>${downloads}</p>
          </li>
        </ul>
      </div>
    </div>
  </li>`;
}
