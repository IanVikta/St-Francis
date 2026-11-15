// Gallery JS for St. Francis Day and Boarding Primary School - Ntinda
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 700, once: true });
}

const defaultAlbums = [
  {
    id: 'campus',
    title: 'Campus & Facilities',
    desc: 'Our serene learning environment, modern classrooms, library, and boarding dormitories in Ntinda.',
    cover: 'assets/img/education/campus-3.webp',
    images: [
      {
        src: 'assets/img/education/campus-3.webp',
        title: 'Main Administration & Classroom Block',
        desc: 'Spacious, well-ventilated classrooms designed for focused learning.',
        likes: 24,
        dislikes: 0,
        comments: ['Very clean and organized campus!', 'Proud of our school facilities.']
      },
      {
        src: 'assets/img/education/campus-4.webp',
        title: 'School Library & Reading Resource Center',
        desc: 'Equipped with curriculum textbooks, storybooks, and reference materials for P.1 to P.7.',
        likes: 19,
        dislikes: 0,
        comments: ['A great place for pupils to build reading habits.']
      },
      {
        src: 'assets/img/education/campus-8.webp',
        title: 'School Grounds & Walkways',
        desc: 'Safe, green, and child-friendly walkways across the Ntinda campus.',
        likes: 15,
        dislikes: 0,
        comments: []
      },
      {
        src: 'assets/img/education/campus-10.webp',
        title: 'Boarding Dormitory Wing',
        desc: 'Secure and comfortable boarding facilities with dedicated matrons and wardens.',
        likes: 21,
        dislikes: 0,
        comments: ['Home away from home for our boarders.']
      }
    ]
  },
  {
    id: 'academics',
    title: 'Classroom & Academics',
    desc: 'Interactive lessons, practical science, ICT literacy, and UNEB PLE preparation.',
    cover: 'assets/img/education/education-1.webp',
    images: [
      {
        src: 'assets/img/education/education-1.webp',
        title: 'Upper Primary Interactive Lesson',
        desc: 'Teachers engaging P.6 and P.7 candidates in problem-solving and critical thinking.',
        likes: 31,
        dislikes: 0,
        comments: ['Dedicated teachers!']
      },
      {
        src: 'assets/img/education/education-2.webp',
        title: 'Lower Primary Literacy Session',
        desc: 'Building strong foundations in reading, phonics, and numeracy for P.1–P.3 learners.',
        likes: 18,
        dislikes: 0,
        comments: []
      },
      {
        src: 'assets/img/education/education-5.webp',
        title: 'Practical Science & Discovery',
        desc: 'Hands-on integrated science experiments in the classroom.',
        likes: 22,
        dislikes: 0,
        comments: ['Future doctors and engineers in the making!']
      },
      {
        src: 'assets/img/education/students-2.webp',
        title: 'Group Revision & Peer Learning',
        desc: 'Pupils collaborating on mathematics and social studies assignments.',
        likes: 16,
        dislikes: 0,
        comments: []
      }
    ]
  },
  {
    id: 'sports',
    title: 'Sports & Co-Curricular',
    desc: 'Athletics, football, netball, swimming, music, dance, and drama.',
    cover: 'assets/img/education/activities-2.webp',
    images: [
      {
        src: 'assets/img/education/activities-2.webp',
        title: 'Inter-House Athletics Championship',
        desc: 'Pupils competing in track and field events during our annual Sports Gala.',
        likes: 28,
        dislikes: 0,
        comments: ['Go Red House!', 'Wonderful team spirit.']
      },
      {
        src: 'assets/img/education/activities-4.webp',
        title: 'Music, Dance & Drama Festival',
        desc: 'Learners showcasing traditional Ugandan cultural dances and choral music.',
        likes: 25,
        dislikes: 0,
        comments: []
      },
      {
        src: 'assets/img/education/activities-6.webp',
        title: 'Creative Arts & Crafts Club',
        desc: 'Developing artistic talent and handiwork skills every Friday afternoon.',
        likes: 14,
        dislikes: 0,
        comments: []
      },
      {
        src: 'assets/img/education/activities-8.webp',
        title: 'Football & Netball Training',
        desc: 'Physical education and teamwork on the school sports pitch.',
        likes: 20,
        dislikes: 0,
        comments: []
      }
    ]
  },
  {
    id: 'awards',
    title: 'Awards & Celebrations',
    desc: 'Celebrating academic excellence, top PLE performers, and outstanding discipline.',
    cover: 'assets/img/education/awards.jpg',
    images: [
      {
        src: 'assets/img/education/awards.jpg',
        title: 'Annual Speech & Prize-Giving Day',
        desc: 'Recognizing top-performing pupils in academics, leadership, and co-curricular activities.',
        likes: 35,
        dislikes: 0,
        comments: ['Educate to build the nation!']
      },
      {
        src: 'assets/img/education/HP3.jpg',
        title: 'School Leadership & Prefectorial Investiture',
        desc: 'Newly elected pupil leaders taking their oath of service.',
        likes: 27,
        dislikes: 0,
        comments: []
      },
      {
        src: 'assets/img/education/inspiring.jpg',
        title: 'Top PLE Candidates Recognition',
        desc: 'Celebrating our Division One candidates with parents and teachers.',
        likes: 40,
        dislikes: 0,
        comments: ['Congratulations to our candidates!']
      }
    ]
  },
  {
    id: 'student-life',
    title: 'Pupil Life & Welfare',
    desc: 'Daily life, friendships, assembly, and mentorship at St. Francis Ntinda.',
    cover: 'assets/img/education/cover.jpg',
    images: [
      {
        src: 'assets/img/education/cover.jpg',
        title: 'Morning Assembly & Parade',
        desc: 'Starting the school day with prayer, national anthem, and announcements.',
        likes: 33,
        dislikes: 0,
        comments: ['Smartly dressed pupils!']
      },
      {
        src: 'assets/img/education/students-1.webp',
        title: 'Nursery & Kindergarten Playtime',
        desc: 'Joyful early childhood learning and outdoor play.',
        likes: 26,
        dislikes: 0,
        comments: []
      },
      {
        src: 'assets/img/education/students-3.webp',
        title: 'Debate & Writers Club',
        desc: 'Building confidence and public speaking skills among upper primary pupils.',
        likes: 19,
        dislikes: 0,
        comments: []
      }
    ]
  },
  {
    id: 'events',
    title: 'School Events & Visitation',
    desc: 'Parents visitation days, science fairs, and community outreach.',
    cover: 'assets/img/education/events-3.webp',
    images: [
      {
        src: 'assets/img/education/events-3.webp',
        title: 'Annual Science & Innovation Exhibition',
        desc: 'Pupils presenting practical science projects to parents and guests.',
        likes: 23,
        dislikes: 0,
        comments: []
      },
      {
        src: 'assets/img/education/events-5.webp',
        title: 'Parents-Teachers Academic Conference',
        desc: 'Reviewing learner progress and strengthening the parent-teacher partnership.',
        likes: 17,
        dislikes: 0,
        comments: []
      },
      {
        src: 'assets/img/education/events-9.webp',
        title: 'P.7 Dedication & Blessing Service',
        desc: 'Praying for our Primary Seven candidates ahead of UNEB examinations.',
        likes: 29,
        dislikes: 0,
        comments: ['Wishing all P.7 candidates success!']
      }
    ]
  }
];

const STORAGE_KEY = 'stfrancis_gallery_state_v1';

function loadAlbums() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === defaultAlbums.length) {
        return parsed;
      }
    }
  } catch (e) {
    // Ignore storage errors
  }
  return JSON.parse(JSON.stringify(defaultAlbums));
}

function saveAlbums() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(albums));
  } catch (e) {
    // Ignore storage errors
  }
}

const albums = loadAlbums();

// DOM Elements
const albumsGrid = document.getElementById('albumsGrid');
const albumImagesSection = document.getElementById('albumImagesSection');
const albumsSection = document.getElementById('albums');
const albumTitle = document.getElementById('albumTitle');
const albumDesc = document.getElementById('albumDesc');
const imagesGrid = document.getElementById('imagesGrid');
const backToAlbumsBtn = document.getElementById('backToAlbums');

// Lightbox Elements
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxImageTitle = document.getElementById('lightboxImageTitle');
const lightboxImageDesc = document.getElementById('lightboxImageDesc');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxLike = document.getElementById('lightboxLike');
const lightboxDislike = document.getElementById('lightboxDislike');
const lightboxComment = document.getElementById('lightboxComment');
const lightboxLikeCount = document.getElementById('lightboxLikeCount');
const lightboxDislikeCount = document.getElementById('lightboxDislikeCount');
const lightboxCommentCount = document.getElementById('lightboxCommentCount');
const lightboxComments = document.getElementById('lightboxComments');
const commentsList = document.getElementById('commentsList');
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');

let currentAlbum = null;
let currentImageIndex = 0;

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Render Albums
function renderAlbums() {
  if (!albumsGrid) return;
  albumsGrid.innerHTML = '';
  albums.forEach((album, idx) => {
    const card = document.createElement('div');
    card.className = 'album-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', String(100 + idx * 50));
    card.innerHTML = `
      <img class="album-thumb" src="${escapeHtml(album.cover)}" alt="${escapeHtml(album.title)}" loading="lazy">
      <div class="album-info">
        <div class="album-title-row">
          <h3 class="album-title">${escapeHtml(album.title)}</h3>
          <span class="badge bg-success rounded-pill">${album.images.length} Photos</span>
        </div>
        <p class="album-desc">${escapeHtml(album.desc)}</p>
      </div>
    `;
    card.addEventListener('click', () => openAlbum(album.id));
    albumsGrid.appendChild(card);
  });
}

// Open Album
function openAlbum(albumId) {
  const album = albums.find(a => a.id === albumId);
  if (!album) return;
  currentAlbum = album;
  albumTitle.textContent = album.title;
  albumDesc.textContent = album.desc;
  renderAlbumImages(album);
  albumsSection.style.display = 'none';
  albumImagesSection.style.display = 'block';
  window.scrollTo({ top: albumImagesSection.offsetTop - 80, behavior: 'smooth' });
}

// Render Images in Album
function renderAlbumImages(album) {
  imagesGrid.innerHTML = '';
  album.images.forEach((img, idx) => {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.setAttribute('data-aos', 'zoom-in');
    card.setAttribute('data-aos-delay', String(idx * 40));
    card.innerHTML = `
      <img class="image-thumb" src="${escapeHtml(img.src)}" alt="${escapeHtml(img.title)}" loading="lazy">
      <div class="image-overlay">
        <div class="image-actions">
          <button class="like-btn" title="Like"><i class="fa fa-heart"></i> <span>${img.likes}</span></button>
          <button class="dislike-btn" title="Dislike"><i class="fa fa-thumbs-down"></i> <span>${img.dislikes}</span></button>
          <button class="comment-btn" title="Comments"><i class="fa fa-comment"></i> <span>${img.comments.length}</span></button>
        </div>
        <span style="color:#fff;font-weight:600;text-shadow:0 2px 8px #000;">${escapeHtml(img.title)}</span>
      </div>
    `;
    card.querySelector('.image-thumb').addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(idx);
    });
    card.querySelector('.like-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      img.likes++;
      saveAlbums();
      card.querySelector('.like-btn span').textContent = img.likes;
    });
    card.querySelector('.dislike-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      img.dislikes++;
      saveAlbums();
      card.querySelector('.dislike-btn span').textContent = img.dislikes;
    });
    card.querySelector('.comment-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(idx, true);
    });
    card.addEventListener('click', () => openLightbox(idx));
    imagesGrid.appendChild(card);
  });
}

if (backToAlbumsBtn) {
  backToAlbumsBtn.addEventListener('click', () => {
    albumImagesSection.style.display = 'none';
    albumsSection.style.display = 'block';
    window.scrollTo({ top: albumsSection.offsetTop - 80, behavior: 'smooth' });
  });
}

// Lightbox Functions
function openLightbox(imgIdx, showComments = false) {
  if (!currentAlbum) return;
  currentImageIndex = imgIdx;
  updateLightbox();
  lightboxOverlay.style.display = 'flex';
  setTimeout(() => lightboxOverlay.focus(), 50);
  lightboxComments.style.display = showComments ? 'block' : 'none';
}

function closeLightbox() {
  lightboxOverlay.style.display = 'none';
  if (currentAlbum) {
    renderAlbumImages(currentAlbum);
  }
}

function updateLightbox() {
  if (!currentAlbum) return;
  const img = currentAlbum.images[currentImageIndex];
  lightboxImage.src = img.src;
  lightboxImageTitle.textContent = img.title;
  lightboxImageDesc.textContent = img.desc;
  lightboxLikeCount.textContent = img.likes;
  lightboxDislikeCount.textContent = img.dislikes;
  lightboxCommentCount.textContent = img.comments.length;
  renderComments(img.comments);
}

function renderComments(comments) {
  commentsList.innerHTML = '';
  if (comments.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.style.color = '#888';
    emptyDiv.textContent = 'No comments yet. Be the first to comment!';
    commentsList.appendChild(emptyDiv);
    return;
  }
  comments.forEach(c => {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.textContent = c;
    commentsList.appendChild(div);
  });
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

if (lightboxPrev) {
  lightboxPrev.addEventListener('click', () => {
    if (!currentAlbum) return;
    currentImageIndex = (currentImageIndex - 1 + currentAlbum.images.length) % currentAlbum.images.length;
    updateLightbox();
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', () => {
    if (!currentAlbum) return;
    currentImageIndex = (currentImageIndex + 1) % currentAlbum.images.length;
    updateLightbox();
  });
}

if (lightboxLike) {
  lightboxLike.addEventListener('click', () => {
    if (!currentAlbum) return;
    const img = currentAlbum.images[currentImageIndex];
    img.likes++;
    saveAlbums();
    lightboxLikeCount.textContent = img.likes;
    lightboxLike.classList.add('liked');
    setTimeout(() => lightboxLike.classList.remove('liked'), 400);
  });
}

if (lightboxDislike) {
  lightboxDislike.addEventListener('click', () => {
    if (!currentAlbum) return;
    const img = currentAlbum.images[currentImageIndex];
    img.dislikes++;
    saveAlbums();
    lightboxDislikeCount.textContent = img.dislikes;
    lightboxDislike.classList.add('disliked');
    setTimeout(() => lightboxDislike.classList.remove('disliked'), 400);
  });
}

if (lightboxComment) {
  lightboxComment.addEventListener('click', () => {
    lightboxComments.style.display = lightboxComments.style.display === 'none' ? 'block' : 'none';
  });
}

if (commentForm) {
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentAlbum) return;
    const val = commentInput.value.trim();
    if (!val) return;
    const img = currentAlbum.images[currentImageIndex];
    img.comments.push(val);
    saveAlbums();
    commentInput.value = '';
    renderComments(img.comments);
    lightboxCommentCount.textContent = img.comments.length;
  });
}

if (lightboxOverlay) {
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  if (!lightboxOverlay || lightboxOverlay.style.display !== 'flex') return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
  if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
});

renderAlbums();
