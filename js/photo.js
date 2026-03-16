// Array de imágenes - fácil de editar
const images = [
  "img/spiderman-img1.jpg",
  "img/spiderman-img2.jpg",
  "img/spiderman-img3.jpeg",
  "img/spiderman-img4.jpg",
  "img/spiderman-img5.jpg",
  "img/spiderman-img6.jpeg",
  "img/spiderman-img7.jpg",
  "img/spiderman-img8.jpeg",
  "img/spiderman-img9.jpg",
  "img/spiderman-img10.jpg",
];

let currentImageIndex = 0;
const imageArea = document.getElementById("image-area");
const imageContainer = document.querySelector(".image-container");
const photoCounter = document.getElementById("photo-counter");
const customCursor = document.getElementById("custom-cursor");
const gmtClock = document.getElementById("gmt-clock");

// Inicializar las imágenes
function initializeImages() {
  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Spiderman";
    img.className = "gallery-image";
    if (index === 0) {
      img.classList.add("active");
    }
    imageContainer.appendChild(img);
  });
}

// Actualizar contador de fotos
function updatePhotoCounter() {
  const currentNumber = currentImageIndex + 1;
  const totalNumber = images.length;
  photoCounter.textContent = `PHOTOS [${currentNumber}/${totalNumber}]`;
}

// Cambiar a la siguiente imagen
function nextImage() {
  const currentImg = document.querySelector(".gallery-image.active");
  if (currentImg) {
    currentImg.classList.remove("active");
  }

  currentImageIndex = (currentImageIndex + 1) % images.length;
  const nextImg =
    document.querySelectorAll(".gallery-image")[currentImageIndex];
  if (nextImg) {
    nextImg.classList.add("active");
  }

  updatePhotoCounter();
}

// Event listener para click en el área de imagen
imageArea.addEventListener("click", (e) => {
  const mitad = window.innerWidth / 2;
  if (e.clientX < mitad) {
    const currentImg = document.querySelector('.gallery-image.active');
    if (currentImg) currentImg.classList.remove('active');
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    document.querySelectorAll('.gallery-image')[currentImageIndex].classList.add('active');
    updatePhotoCounter();
  } else {
    nextImage();
  }
});

// Sistema de cursor personalizado con lerp y next/prev
let cursorX = 0, cursorY = 0;
let lerpX = 0, lerpY = 0;
let animating = false;
const LERP = 0.12;

function animateCursor() {
  lerpX += (cursorX - lerpX) * LERP;
  lerpY += (cursorY - lerpY) * LERP;
  customCursor.style.transform = `translate(${lerpX}px, ${lerpY}px)`;
  animating = true;
  requestAnimationFrame(animateCursor);
}

imageArea.addEventListener('mouseenter', () => {
  customCursor.classList.add('visible');
  if (!animating) animateCursor();
});

imageArea.addEventListener('mouseleave', () => {
  customCursor.classList.remove('visible');
});

imageArea.addEventListener('mousemove', (e) => {
  cursorX = e.clientX + 12;
  cursorY = e.clientY + 12;
  const mitad = window.innerWidth / 2;
  customCursor.textContent = e.clientX < mitad ? 'PREV' : 'NEXT';
});

// Reloj GMT en vivo
function updateClock() {
  const now = new Date();
  const gmtTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  const hours = gmtTime.getUTCHours().toString().padStart(2, "0");
  const minutes = gmtTime.getUTCMinutes().toString().padStart(2, "0");
  const seconds = gmtTime.getUTCSeconds().toString().padStart(2, "0");

  gmtClock.textContent = `${hours}:${minutes}:${seconds} (GMT)`;
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  initializeImages();
  updatePhotoCounter();
  updateClock();
  setInterval(updateClock, 1000);
});
