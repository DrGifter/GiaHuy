const scene = document.getElementById("scene");
const sparkleContainer = document.getElementById("sparkles");
const audio = document.getElementById("sound");

const texts = [
  "Tuyết Ngân", "16 - 07 - 2002", "Chúc em sinh nhật vui vẻ",
  "Happy Birthday", "Luôn vui vẻ", "Chúc em những điều tuyệt vời nhất", "Mong em luôn tỏa sáng", "I Love You"
];
const icons = ["🎂", "🎉", "💖", "🌟", "💐", "🎁", "✨", "💝"];

function createFallingText() {
  const text = document.createElement("div");
  text.className = "falling-text";
  text.textContent = texts[Math.floor(Math.random() * texts.length)];
  text.style.left = `${Math.random() * window.innerWidth}px`;
  text.style.transform = `translateZ(${(Math.random() - 0.5) * 1000}px)`;
  scene.appendChild(text);
  setTimeout(() => text.remove(), 6000);
}

function createFallingIcon() {
  const icon = document.createElement("div");
  icon.className = "falling-icon";
  icon.textContent = icons[Math.floor(Math.random() * icons.length)];
  icon.style.left = `${Math.random() * window.innerWidth}px`;
  icon.style.transform = `translateZ(${(Math.random() - 0.5) * 1000}px)`;
  scene.appendChild(icon);
  setTimeout(() => icon.remove(), 6000);
}

setInterval(() => {
  createFallingText();
  createFallingIcon();
}, 200);

function playMusicOnce() {
  if (audio.paused) {
    audio.currentTime = 48; 
    audio.play().catch(e => {
      console.warn("Audio bị trình duyệt chặn. Đợi tương tác từ người dùng.");
    });
  }


  document.removeEventListener("click", playMusicOnce);
  document.removeEventListener("touchstart", playMusicOnce);
}


document.addEventListener("click", playMusicOnce);
document.addEventListener("touchstart", playMusicOnce);


window.addEventListener("load", () => {
  audio.currentTime = 48; 
  audio.play().catch(() => {
  });
});

let isDragging = false;
let lastTouch = { x: 0, y: 0 };

document.addEventListener("mousedown", () => {
  isDragging = true;
  document.body.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.style.cursor = "grab";
});

document.addEventListener("mouseleave", () => {
  isDragging = false;
  document.body.style.cursor = "grab";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const rotateY = (e.clientX - centerX) * 0.15;
  const rotateX = -(e.clientY - centerY) * 0.15;
  scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

document.addEventListener("touchstart", (e) => {
  isDragging = true;
  lastTouch.x = e.touches[0].clientX;
  lastTouch.y = e.touches[0].clientY;
}, { passive: false });

document.addEventListener("touchend", () => {
  isDragging = false;
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const touch = e.touches[0];
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const rotateY = (touch.clientX - centerX) * 0.15;
  const rotateX = -(touch.clientY - centerY) * 0.15;
  scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}, { passive: false });

function createSparkles(count = 80) {
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.top = `${Math.random() * 100}%`;
    s.style.left = `${Math.random() * 100}%`;
    s.style.animationDuration = `${3 + Math.random() * 3}s`;
    s.style.animationDelay = `${Math.random() * 4}s`;
    sparkleContainer.appendChild(s);
  }
}

createSparkles(80);