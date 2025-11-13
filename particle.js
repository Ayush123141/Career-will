// Particle Background Animation - Floating Dots Only (No Lines)
class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasId;
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.style.zIndex = '-1';
            this.canvas.style.pointerEvents = 'none';
            this.canvas.style.background = '#000000'; // Pure black background
            document.body.insertBefore(this.canvas, document.body.firstChild);
        }

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80; // More dots for better effect
        this.mouse = { x: 0, y: 0 };

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => this.updateMouse(e));
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    updateMouse(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1.5, // Slower movement
                vy: (Math.random() - 0.5) * 1.5,
                radius: Math.random() * 2.5 + 1.5, // Slightly larger dots
                opacity: Math.random() * 0.6 + 0.3, // More visible
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = [
            '#667eea',  // Primary Purple
            '#764ba2',  // Secondary Purple
            '#a78bfa',  // Light Purple
            '#8b5cf6',  // Medium Purple
            '#7c3aed',  // Dark Purple
            '#6366f1',  // Indigo
            '#818cf8'   // Light Indigo
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        // Clear canvas with pure black
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw only particles (dots) - NO LINES
        this.particles.forEach((particle) => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            
            // Add glow effect to dots
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 2
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
    }

    update() {
        this.particles.forEach((particle) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x - particle.radius < 0 || particle.x + particle.radius > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y - particle.radius < 0 || particle.y + particle.radius > this.canvas.height) {
                particle.vy *= -1;
            }

            // Keep particles within bounds
            particle.x = Math.max(particle.radius, Math.min(this.canvas.width - particle.radius, particle.x));
            particle.y = Math.max(particle.radius, Math.min(this.canvas.height - particle.radius, particle.y));

            // Mouse interaction - particles move away from mouse (repel effect)
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const angle = Math.atan2(dy, dx);
                // Repel particles away from mouse
                particle.vx -= Math.cos(angle) * 0.3;
                particle.vy -= Math.sin(angle) * 0.3;
            }

            // Add slight friction
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            // Speed limit
            const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (speed > 2) {
                particle.vx = (particle.vx / speed) * 2;
                particle.vy = (particle.vy / speed) * 2;
            }

            // Subtle pulsing effect
            particle.opacity = 0.3 + Math.sin(Date.now() * 0.001 + particle.x) * 0.3;
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    addParticles(count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                radius: Math.random() * 2.5 + 1.5,
                opacity: Math.random() * 0.6 + 0.3,
                color: this.getRandomColor()
            });
        }
    }

    removeParticles(count) {
        this.particles = this.particles.slice(0, Math.max(1, this.particles.length - count));
    }
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', () => {
    const particleBackground = new ParticleBackground('particle-canvas');
});
