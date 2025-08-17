/* -----------------------------------------
  Have focus outline only for keyboard users 
---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');

    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing');

  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
};

window.addEventListener('keydown', handleFirstTab);

const backToTopButton = document.querySelector('.back-to-top');
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? 'visible' : 'hidden';
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered ? 'scale(1)' : 'scale(0)';
};

window.addEventListener('scroll', () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  Click Me! -> Show picture in modal (button stays)
---------------------------------------- */

// Find the "Click Me!" button
let clickMeBtn = document.getElementById('clickMeBtn');
if (!clickMeBtn) {
  clickMeBtn = Array.from(document.querySelectorAll('.about .btn'))
    .find(el => el.textContent.trim().toLowerCase() === 'click me!');
}

// Create modal if not already present
let resumeModal = document.getElementById('resumeModal');
if (!resumeModal) {
  const aboutPhoto = document.querySelector('.about__photo');
  const src = aboutPhoto ? aboutPhoto.getAttribute('src') : '';
  const modal = document.createElement('div');
  modal.id = 'resumeModal';
  modal.className = 'modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <span class="close" aria-label="Close">&times;</span>
    <img class="modal-content" src="${src}" alt="My Picture">
  `;
  document.body.appendChild(modal);
  resumeModal = modal;
}

const modalClose = resumeModal.querySelector('.close');

// Wire up events
if (clickMeBtn && resumeModal) {
  // Open modal
  clickMeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resumeModal.classList.add('show');
    resumeModal.setAttribute('aria-hidden', 'false');
  });

  // Close modal
  const closeModal = () => {
    resumeModal.classList.remove('show');
    resumeModal.setAttribute('aria-hidden', 'true');
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Close when clicking outside modal content
  window.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeModal();
  });

  // Close with ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
