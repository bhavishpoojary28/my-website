/* ================= BASIC SITE FUNCTIONS ================= */

function openSite(url) {
  window.open(url, "_blank");
}

const collegeProjects = [
  {
    name: "Industrial Machines Management & Tracking System",
    url: "https://bhavishpoojary28.github.io/Industrial-Machines-Management-and-Tracking-System/"
  },
  {
    name: "Client–Server File Transfer System with GUI and Live Throughput Graph",
    url: "https://bhavishpoojary28.github.io/Client-Server-File-Transfer-System-with-GUI-and-Live-Throughput-Graph/"
  },
   {
    name: "KSRTC Live Bus Tracking System",
    url: "https://bhavishpoojary28.github.io/Ksrtc-Live-Bus-Tracking-/"
  }

];

const gameProjects = [
  { name: "Tic Tac Toe", url: "https://bhavishpoojary28.github.io/Tic-tac/" },
  { name: "Snake Game", url: "https://bhavishpoojary28.github.io/Feel-free-to-play-snake-game/" },
  { name: "Truth and Dare Game", url: "https://bhavishpoojary28.github.io/Truth-and-Dare-game/" }
];

function showCollegeProjects() {
  showProjects("📚 College Projects", collegeProjects);
}

function showGameProjects() {
  showProjects("🎮 Game Projects", gameProjects);
}

function showPortfolio() {
  showPortfolio("🎮 Game Projects", gameProjects);
}
function showPortfolio() {
  document.getElementById("main-cards").classList.add("hidden");
  document.getElementById("project-list-section").classList.add("hidden");
  document.getElementById("portfolio-section").classList.remove("hidden");
}

function goBackToHome() {
  document.getElementById("portfolio-section").classList.add("hidden");
  document.getElementById("main-cards").classList.remove("hidden");
}

function showProjects(title, projects) {
  document.getElementById("main-cards").classList.add("hidden");
  document.getElementById("project-list-section").classList.remove("hidden");
  document.getElementById("list-title").innerText = title;

  const container = document.getElementById("project-items");
  container.innerHTML = "";

  projects.forEach(p => {
    const div = document.createElement("div");
    div.className = "sub-card";
    div.innerText = p.name;
    div.onclick = () => openSite(p.url);
    container.appendChild(div);
  });
}

function goBack() {
  document.getElementById("project-list-section").classList.add("hidden");
  document.getElementById("main-cards").classList.remove("hidden");
}

function openLogo() {
  document.getElementById("logo-modal").style.display = "flex";
}

function closeLogo() {
  document.getElementById("logo-modal").style.display = "none";
}




/* ================= LOCAL CURSOR PARTICLE EFFECT ================= */

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let mouse = {
  x: -1000,
  y: -1000,
  radius: 10000  // 🔹 SMALL EFFECT AREA
};

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

let hue = 0;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.vx = 0;
    this.vy = 0;
    this.size = 1.4;
    this.density = Math.random() * 6 + 2;
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    // 🔹 ONLY react near cursor
    if (dist < mouse.radius) {
      let force = (mouse.radius - dist) / mouse.radius;
      let angle = Math.atan2(dy, dx);

      this.vx -= Math.cos(angle) * force * this.density;
      this.vy -= Math.sin(angle) * force * this.density;
    }

    this.vx *= 0.72;
    this.vy *= 0.72;

    this.x += this.vx;
    this.y += this.vy;

    // Gentle return
    this.x += (this.baseX - this.x) * 0.05;
    this.y += (this.baseY - this.y) * 0.05;
  }

  draw() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    // 🔹 DRAW ONLY NEAR CURSOR
    if (dist < mouse.radius) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
      ctx.fill();
    }
  }
}

let particles = [];

function initParticles() {
  particles = [];
  const gap = 30;   // 🔹 MORE GAP = FEWER PARTICLES

  for (let y = 0; y < canvas.height; y += gap) {
    for (let x = 0; x < canvas.width; x += gap) {
      particles.push(new Particle(x, y));
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  hue += 1;
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();