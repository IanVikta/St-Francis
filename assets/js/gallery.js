// Gallery App JS
// Simulated data for albums and images
const albums = [
  {
    id: 'nature',
    title: 'Nature Collection',
    desc: 'Breathtaking landscapes and wildlife',
    thumb: 'assets/img/gallery/nature-thumb.jpg',
    shape: 'rect',
    images: [
      {
        src: 'assets/img/gallery/nature1.jpg',
        title: 'Mountain Sunrise',
        desc: 'A beautiful sunrise over the mountains.',
        likes: 12,
        dislikes: 1,
        comments: [
          { user: 'Alice', text: 'Stunning view!' },
          { user: 'Bob', text: 'Love this place.' }
        ]
      },
      {
        src: 'assets/img/gallery/nature2.jpg',
        title: 'Forest Path',
        desc: 'A peaceful path through the forest.',
        likes: 8,
        dislikes: 0,
        comments: []
      }
    ]
  },
  {
    id: 'urban',
    title: 'Urban Life',
    desc: 'Cityscapes and urban moments',
    thumb: 'assets/img/gallery/urban-thumb.jpg',
    shape: 'square',
    images: [
      {
        src: 'assets/img/gallery/urban1.jpg',
        title: 'City Lights',
        desc: 'The city comes alive at night.',
        likes: 15,
        dislikes: 2,
        comments: [
          { user: 'Jane', text: 'So vibrant!' }
        ]
      }
    ]
  },
  {
    id: 'portraits',
    title: 'Portraits',
    desc: 'Faces and emotions captured in time',
    thumb: 'assets/img/gallery/portraits-thumb.jpg',
    shape: 'rect',
    images: [
      {
        src: 'assets/img/gallery/portraits1.jpg',
        title: 'Smiling Child',
        desc: 'A joyful smile on a sunny day.',
        likes: 10,
        dislikes: 0,
        comments: []
      }
    ]
  },
  {
    id: 'abstract',
    title: 'Abstract Art',
    desc: 'Colors, shapes, and imagination',
    thumb: 'assets/img/gallery/abstract-thumb.jpg',
    shape: 'square',
    images: [
      {
        src: 'assets/img/gallery/abstract1.jpg',
        title: 'Color Splash',
        desc: 'A burst of colors and creativity.',
        likes: 7,
        dislikes: 1,
        comments: []
      }
    ]
  },
  {
    id: 'sports',
    title: 'Sports Moments',
    desc: 'Exciting action from the field',
    thumb: 'assets/img/gallery/sports-thumb.jpg',
    shape: 'rect',
    images: [
      {
        src: 'assets/img/gallery/sports1.jpg',
        title: 'Goal!',
        desc: 'A winning moment in football.',
        likes: 14,
        dislikes: 0,
        comments: []
      }
    ]
  },
  {
    id: 'campus',
    title: 'Campus Life',
    desc: 'Everyday moments around the school',
    thumb: 'assets/img/gallery/campus-thumb.jpg',
    shape: 'square',
    images: [
      {
        src: 'assets/img/gallery/campus1.jpg',
        title: 'Morning Assembly',
        desc: 'Students gathered for the morning assembly.',
        likes: 9,
        dislikes: 0,
        comments: []
      }
    ]
  }
];

// DOM Elements
const albumsGrid = document.getElementById('albumsGrid');
const albumImagesSection = document.getElementById('albumImagesSection');
const albumTitle = document.getElementById('albumTitle');
const albumDesc = document.getElementById('albumDesc');
const imagesGrid = document.getElementById('imagesGrid');
const backToAlbums = document.getElementById('backToAlbums');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxImageTitle = document.getElementById('lightboxImageTitle');
const lightboxImageDesc = document.getElementById('lightboxImageDesc');
const lightboxLike = document.getElementById('lightboxLike');
const lightboxDislike = document.getElementById('lightboxDislike');
const lightboxLikeCount = document.getElementById('lightboxLikeCount');
const lightboxDislikeCount = document.getElementById('lightboxDislikeCount');
const lightboxComment = document.getElementById('lightboxComment');
const lightboxCommentCount = document.getElementById('lightboxCommentCount');
const lightboxComments = document.getElementById('lightboxComments');
const commentsList = document.getElementById('commentsList');
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentAlbum = null;
let currentImageIdx = 0;

// Render Albums Grid
function renderAlbums() {
  albumsGrid.innerHTML = '';
  albums.forEach(album => {
    const card = document.createElement('div');
    card.className = 'album-card ' + (album.shape === 'square' ? 'album-square' : 'album-rect');
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', album.title);
    card.innerHTML = `
      <img src="${album.thumb}" alt="${album.title}" class="album-thumb">
      <div class="album-info">
        <div class="album-title">${album.title}</div>
        <div class="album-desc">${album.desc}</div>
      </div>
      <div class="album-overlay"><i class="fa fa-images"></i> View Album</div>
    `;
    card.addEventListener('click', () => openAlbum(album.id));
    card.addEventListener('keypress', e => { if (e.key === 'Enter') openAlbum(album.id); });
    albumsGrid.appendChild(card);
  });
}

// Open Album
function openAlbum(albumId) {
  currentAlbum = albums.find(a => a.id === albumId);
  albumTitle.textContent = currentAlbum.title;
  albumDesc.textContent = currentAlbum.desc;
  renderImages();
  document.querySelector('.albums-section').style.display = 'none';
  albumImagesSection.style.display = 'block';
  window.scrollTo({ top: albumImagesSection.offsetTop, behavior: 'smooth' });
}

// Render Images Grid
function renderImages() {
  imagesGrid.innerHTML = '';
  currentAlbum.images.forEach((img, idx) => {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', img.title);
    card.innerHTML = `
      <img src="${img.src}" alt="${img.title}" class="image-thumb">
      <div class="image-overlay"><i class="fa fa-search-plus"></i> View</div>
      <div class="image-actions">
        <button class="like-btn" aria-label="Like"><i class="fa fa-heart"></i> <span>${img.likes}</span></button>
        <button class="dislike-btn" aria-label="Dislike"><i class="fa fa-thumbs-down"></i> <span>${img.dislikes}</span></button>
        <button class="comment-btn" aria-label="Comment"><i class="fa fa-comment"></i> <span>${img.comments.length}</span></button>
      </div>
    `;
    card.addEventListener('click', e => {
      if (e.target.closest('.like-btn')) {
        img.likes++;
        renderImages();
      } else if (e.target.closest('.dislike-btn')) {
        img.dislikes++;
        renderImages();
      } else if (e.target.closest('.comment-btn')) {
        // Show comment input below image (not in lightbox)
        // For simplicity, open lightbox for comments
        openLightbox(idx);
        showComments();
      } else {
        openLightbox(idx);
      }
    });
    card.addEventListener('keypress', e => { if (e.key === 'Enter') openLightbox(idx); });
    imagesGrid.appendChild(card);
  });
}

// Back to Albums
backToAlbums.addEventListener('click', () => {
  albumImagesSection.style.display = 'none';
  document.querySelector('.albums-section').style.display = 'block';
  window.scrollTo({ top: document.getElementById('albums').offsetTop, behavior: 'smooth' });
});

// Lightbox Logic
function openLightbox(idx) {
  currentImageIdx = idx;
  updateLightbox();
  lightboxOverlay.style.display = 'flex';
  setTimeout(() => lightboxOverlay.focus(), 100);
}
function closeLightbox() {
  lightboxOverlay.style.display = 'none';
  hideComments();
}
function updateLightbox() {
  const img = currentAlbum.images[currentImageIdx];
  lightboxImage.src = img.src;
  lightboxImage.alt = img.title;
  lightboxImageTitle.textContent = img.title;
  lightboxImageDesc.textContent = img.desc;
  lightboxLikeCount.textContent = img.likes;
  lightboxDislikeCount.textContent = img.dislikes;
  lightboxCommentCount.textContent = img.comments.length;
  // Remove liked/disliked/commented states
  lightboxLike.classList.remove('liked');
  lightboxDislike.classList.remove('disliked');
  lightboxComment.classList.remove('active');
}
lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay.addEventListener('click', e => { if (e.target === lightboxOverlay) closeLightbox(); });
lightboxPrev.addEventListener('click', () => {
  if (currentImageIdx > 0) {
    currentImageIdx--;
    animateLightbox('left');
    updateLightbox();
  }
});
lightboxNext.addEventListener('click', () => {
  if (currentImageIdx < currentAlbum.images.length - 1) {
    currentImageIdx++;
    animateLightbox('right');
    updateLightbox();
  }
});
function animateLightbox(direction) {
  const img = lightboxImage;
  img.style.transition = 'none';
  img.style.opacity = 0;
  setTimeout(() => {
    img.style.transition = 'opacity 0.3s';
    img.style.opacity = 1;
  }, 50);
}
// Like/Dislike/Comment in Lightbox
lightboxLike.addEventListener('click', () => {
  const img = currentAlbum.images[currentImageIdx];
  img.likes++;
  updateLightbox();
});
lightboxDislike.addEventListener('click', () => {
  const img = currentAlbum.images[currentImageIdx];
  img.dislikes++;
  updateLightbox();
});
lightboxComment.addEventListener('click', () => {
  showComments();
});
function showComments() {
  lightboxComments.style.display = 'block';
  renderComments();
  lightboxComment.classList.add('active');
}
function hideComments() {
  lightboxComments.style.display = 'none';
  lightboxComment.classList.remove('active');
}
function renderComments() {
  const img = currentAlbum.images[currentImageIdx];
  commentsList.innerHTML = '';
  img.comments.forEach(c => {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.textContent = `${c.user}: ${c.text}`;
    commentsList.appendChild(div);
  });
}
commentForm.addEventListener('submit', e => {
  e.preventDefault();
  const val = commentInput.value.trim();
  if (val) {
    currentAlbum.images[currentImageIdx].comments.push({ user: 'You', text: val });
    commentInput.value = '';
    renderComments();
    updateLightbox();
  }
});
// Keyboard navigation for lightbox
lightboxOverlay.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
  if (e.key === 'ArrowRight') lightboxNext.click();
});
// Accessibility: trap focus in lightbox
lightboxOverlay.addEventListener('focusout', e => {
  if (lightboxOverlay.style.display === 'flex' && !lightboxOverlay.contains(e.relatedTarget)) {
    setTimeout(() => lightboxOverlay.focus(), 10);
  }
});
// Smooth scroll for hero CTA
const heroCta = document.querySelector('.hero-cta');
if (heroCta) {
  heroCta.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('albums').scrollIntoView({ behavior: 'smooth' });
  });
}
// Init
AOS.init({ duration: 900, once: true });
renderAlbums(); 