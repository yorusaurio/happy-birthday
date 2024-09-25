window.addEventListener('load', startFireworks);

function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    class Particle {
        constructor(x, y, color, size, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
            this.alpha = 1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= 0.02;
        }
    }

    function createFirework(x, y) {
        const numberOfParticles = 100;
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        for (let i = 0; i < numberOfParticles; i++) {
            const speedX = (Math.random() - 0.5) * 5;
            const speedY = (Math.random() - 0.5) * 5;
            const size = Math.random() * 3 + 1;
            particles.push(new Particle(x, y, color, size, speedX, speedY));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            }
        });
        requestAnimationFrame(animateParticles);
    }

    function randomFireworks() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        createFirework(x, y);
    }

    setInterval(randomFireworks, 800);
    animateParticles();
}
