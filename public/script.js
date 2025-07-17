// script.js
async function submitForm(event) {
  event.preventDefault();
  const result = document.getElementById('result');
  const button = document.getElementById('submit-button');
  try {
    result.style.display = 'block';
    button.style.display = 'none';
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({
        cookie: document.getElementById('cookies').value,
        url: document.getElementById('urls').value,
        amount: document.getElementById('amounts').value,
        interval: document.getElementById('intervals').value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (data.status === 200) {
      result.style.backgroundColor = '#32ff0dc7';
      result.innerHTML = 'Submitted successfully!';
    } else {
      result.style.backgroundColor = '#3D1619';
      result.innerHTML = 'Error: ' + data.error;
    }
    button.style.display = 'block';
  } catch (e) {
    console.error(e);
  }
}

// Particles.js effect simulation
function createParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 100;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();
}

createParticles();
linkOfProcessing();
