document.addEventListener('DOMContentLoaded', () => {
    const backgroundShapes = document.querySelector('.background-shapes');
    const suits = ['spade', 'heart', 'diamond', 'club'];
    const shapes = [];
    
    // Clear existing shapes
    backgroundShapes.innerHTML = '';
    
    class Shape {
        constructor(element, x, y, speedX, speedY, rotation) {
            this.element = element;
            this.x = x;
            this.y = y;
            this.speedX = speedX;
            this.speedY = speedY;
            this.rotation = rotation;
            this.width = 40;
            this.height = 40;
            this.rotationSpeed = (Math.random() - 0.5) * 2;
        }

        update() {
            // Update position
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
            
            // Boundary checking
            if (this.x <= 0 || this.x >= window.innerWidth - this.width) {
                this.speedX *= -1;
            }
            if (this.y <= 0 || this.y >= window.innerHeight - this.height) {
                this.speedY *= -1;
            }

            // Apply position and rotation
            this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
        }

        checkCollision(other) {
            const dx = this.x - other.x;
            const dy = this.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < (this.width + other.width) / 2;
        }

        handleCollision(other) {
            // Calculate collision response
            const dx = other.x - this.x;
            const dy = other.y - this.y;
            const angle = Math.atan2(dy, dx);
            
            // Update velocities
            const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
            this.speedX = -Math.cos(angle) * speed;
            this.speedY = -Math.sin(angle) * speed;
            
            // Adjust rotation
            this.rotationSpeed *= -0.8;
        }
    }

    // Add card suits (increased by 40%)
    for (let i = 0; i < 34; i++) {
        const shape = document.createElement('div');
        shape.className = `shape ${suits[Math.floor(Math.random() * suits.length)]}`;
        
        // Random starting position with better distribution
        const x = Math.random() * (window.innerWidth - 60);
        const y = Math.random() * (window.innerHeight - 60);
        
        // Random velocities
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.5 + 0.5;
        const speedX = Math.cos(angle) * speed;
        const speedY = Math.sin(angle) * speed;
        
        const rotation = Math.random() * 360;

        shape.style.position = 'absolute';
        backgroundShapes.appendChild(shape);

        shapes.push(new Shape(shape, x, y, speedX, speedY, rotation));
    }

    // Animation loop
    function animate() {
        // Update positions
        shapes.forEach(shape => shape.update());

        // Check collisions
        for (let i = 0; i < shapes.length; i++) {
            for (let j = i + 1; j < shapes.length; j++) {
                if (shapes[i].checkCollision(shapes[j])) {
                    shapes[i].handleCollision(shapes[j]);
                    shapes[j].handleCollision(shapes[i]);
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Rest of your existing code for smooth scrolling, copyright, slideshows, etc.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const yearSpan = document.querySelector('.copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    function initializeSlideshow(container) {
        const slides = container.querySelectorAll('.slide');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.style.display = 'none');
            slides[index].style.display = 'block';
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        showSlide(0);
        return setInterval(nextSlide, 3000);
    }

    document.querySelectorAll('.game-card-slideshow').forEach(slideshow => {
        initializeSlideshow(slideshow);
    });

    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.querySelector('.modal-close');
    const modalCaption = document.querySelector('.modal-caption');

    document.querySelectorAll('.slide').forEach(slide => {
        slide.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImg.src = slide.dataset.full;
            modalCaption.textContent = slide.querySelector('img').alt;
        });
    });

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});