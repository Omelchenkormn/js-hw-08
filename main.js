import pictures from "./app.js";

const refs = {
    gallery: document.querySelector(".js-gallery"),  // ul parent
    lightbox: document.querySelector(".lightbox"),   
    lightboxButton: document.querySelector('[data-action="close-lightbox"]'),
    modal: document.querySelector(".lightbox__content"),
    lightbox__image: document.querySelector(".lightbox__image"),
    overlayWindow: document.querySelector('.lightbox__overlay'),
};

const createGalleryItem = ({ preview, original, description }) =>
  `<li class="gallery__item">
<a
  class="gallery__link"
  href=${original}
>
  <img
    class="gallery__image"
    src=${preview}
    data-source=${original}
    alt=${description}
  />
</a>
</li>`;

const galleryItem = pictures.reduce(
  (acc, item) => acc + createGalleryItem(item),
  ""
);

refs.gallery.insertAdjacentHTML("afterbegin", galleryItem);
refs.gallery.addEventListener('click', openImg);
refs.lightboxButton.addEventListener("click", onClickHandlerClose);
refs.modal.addEventListener("click", closeLightbox);

function openImg(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    if (e.target.nodeName === 'IMG') {
        refs.lightbox.classList.add('is-open');
        refs.lightbox__image.src = e.target.getAttribute('data-source');
        refs.lightbox__image.alt = e.target.alt;
    }
    window.addEventListener("keyup", onKey);
    
}

function onClickHandlerClose(e) {
    e.preventDefault();
    refs.lightbox.classList.remove("is-open");
    refs.lightbox__image.src = '';
    refs.lightbox__image.alt = '';
    window.removeEventListener("keyup", onKey);
    
    

}

function closeLightbox(e) {
    if (e.target === e.currentTarget) {
        onClickHandlerClose();
    }
}

function onKey(e) {
  if (e.code === "Escape") {
    onClickHandlerClose(e);
  }
}
refs.overlayWindow.addEventListener('click', closeOverlay); 

function closeOverlay(e) {
  if (e.target === refs.overlayWindow) {
    onClickHandlerClose(e);
  }

  
// function swithImg(event) {
//     if (e.key === "ArrowRight") {
//       refs.lightbox__image.setAttribute('data-index');
//     }

  
const swithImg = (event) => {
  let imgIndex = pictures.findIndex(
    (img) => img.original === refs.lightbox__image.src
  );
  if (event.code === "ArrowRight") {
    if (imgIndex === pictures.length - 1) {
      imgIndex -= pictures.length;
    }
    imgIndex += 1;
  }
  if (event.code === "ArrowLeft") {
      if (imgIndex === 0) {
        imgIndex += pictures.length;
      }
      imgIndex -= 1;
  }
  
  refs.lightbox__image.src = pictures[imgIndex].original;
  refs.lightbox__image.alt = pictures[imgIndex].description;
  
}; 
window.addEventListener("keydown", swithImg);
}

