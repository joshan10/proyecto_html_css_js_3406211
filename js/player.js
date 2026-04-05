const clips = [
  { nombre: 'Flower Mountain', autor: 'Nicholas Daley' },
  { nombre: 'Flower Mountain', autor: 'Nicholas Daley' },
  { nombre: 'Flower Mountain', autor: 'Nicholas Daley' },
  { nombre: 'Flower Mountain', autor: 'Nicholas Daley' },
  { nombre: 'Flower Mountain', autor: 'Nicholas Daley' },
  { nombre: 'Flower Mountain', autor: 'Nicholas Daley' },
  { nombre: 'Flower Mountain', autor: 'Nicholas Daley' },
  { nombre: 'Flower Mountain', autor: 'Nicholas Daley' },
  { nombre: 'Flower Mountain', autor: 'Nicholas Daley' },
  { nombre: 'Flower Mountain', autor: 'Nicholas Daley' },
];

const numActivo = parseInt(sessionStorage.getItem('videoActivo') || '1');
const clip = clips[numActivo - 1];

const video = document.getElementById('main-video');
video.src = `../media/edit${numActivo}.mp4`;
video.muted = true;
video.autoplay = true;
video.loop = true;

document.getElementById('video-numero').textContent = `[${numActivo}]`;
document.getElementById('video-nombre').textContent = clip.nombre;
document.getElementById('video-autor').textContent = clip.autor;

// Cursor LERP
const cursor = document.getElementById('cursor-custom');
const cursorText = document.getElementById('cursor-text');
let cx = 0, cy = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  tx = e.clientX - 20;
  ty = e.clientY - 30;
});

(function lerp() {
  cx += (tx - cx) * 0.04;
  cy += (ty - cy) * 0.04;
  cursor.style.transform = `translate(${cx}px, ${cy}px)`;
  requestAnimationFrame(lerp);
})();

// Contador random
const contRandom = document.getElementById('contador-random');
let randomInterval = null;

function iniciarRandom() {
  randomInterval = setInterval(() => {
    contRandom.textContent = String(
      Math.floor(Math.random() * 100)
    ).padStart(2, '0');
  }, 100);
}

function detenerRandom() {
  clearInterval(randomInterval);
  randomInterval = null;
  contRandom.textContent = '00';
}

// Contador tiempo
const contTiempo = document.getElementById('contador-tiempo');
video.addEventListener('timeupdate', () => {
  const t = Math.floor(video.currentTime);
  const m = String(Math.floor(t / 60)).padStart(2, '0');
  const s = String(t % 60).padStart(2, '0');
  contTiempo.textContent = `${m}:${s}`;
});

// Click — play activa controles, pause vuelve al estado inicial
video.addEventListener('click', () => {
  if (video.muted) {
    // Estado inicial → reproducir con sonido
    video.muted = false;
    video.currentTime = 0;
    video.play();
    document.body.classList.add('reproduciendo');
    cursorText.textContent = '(PAUSE)';
    iniciarRandom();
  } else {
    // Reproduciendo → volver al estado inicial
    video.pause();
    video.muted = true;
    video.currentTime = 0;
    video.play();
    document.body.classList.remove('reproduciendo');
    cursorText.textContent = '(PLAY)';
    detenerRandom();
  }
});

// Mute toggle
const btnMute = document.getElementById('btn-mute');
btnMute.addEventListener('click', e => {
  e.stopPropagation();
  video.muted = !video.muted;
  btnMute.textContent = video.muted ? 'UNMUTE' : 'MUTE';
});

// Fullscreen
document.getElementById('btn-fullscreen').addEventListener('click', e => {
  e.stopPropagation();
  video.requestFullscreen();
});

const boxOculta = document.querySelector('.box-oculta');
const closeBtn = document.querySelector('.box-close');

document.querySelectorAll('.nav-right a').forEach(a => {
  if (a.textContent.trim().toLowerCase() === 'info') {
    a.addEventListener('click', e => {
      e.preventDefault();
      if (boxOculta) boxOculta.classList.add('visible');
    });
  }
});

if (closeBtn) {
  closeBtn.addEventListener('click', e => {
    e.preventDefault();
    boxOculta.classList.remove('visible');
  });
}