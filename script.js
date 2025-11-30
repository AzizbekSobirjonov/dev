        // Loading screen with progress bar animation
        window.addEventListener('load', function() {
            const loadingBar = document.querySelector('.loading-bar');
            const loadingPercentage = document.querySelector('.loading-percentage');
            let progress = 0;
            
            const loadingInterval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(loadingInterval);
                    setTimeout(() => {
                        document.getElementById('loading-screen').classList.add('hidden');
                        document.querySelector('.content').classList.add('visible');
                    }, 300);
                }
                loadingBar.style.width = progress + '%';
                loadingPercentage.textContent = Math.floor(progress) + '%';
            }, 100);
        });

        // Parallax effect for video background
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            let st = window.pageYOffset || document.documentElement.scrollTop;
            let video = document.getElementById('video-bg');
            if (video) {
                video.style.transform = 'translateY(' + st * 0.5 + 'px)';
            }
            lastScrollTop = st;
        });

        // Typing effect for title
        const titles = ['SOFTWARE DEVELOPER', 'PYTHON EXPERT', 'WEB DESIGNER', 'PROBLEM SOLVER'];
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const titleElement = document.querySelector('.title');
        
        function typeTitle() {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                titleElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                titleElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentTitle.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeTitle, speed);
        }
        
        setTimeout(typeTitle, 2500);

        // Glitch effect on hover for h1
        /* Bu funksiya h1 uchun edi. Agar u ham kerak bo'lmasa, uni o'chiring */
        const h1 = document.querySelector('.profile-card h1');
        const originalName = h1.textContent;
        let isGlitching = false;
        
        h1.addEventListener('mouseenter', function() {
            if (isGlitching) return;
            isGlitching = true;
            
            let glitchCount = 0;
            const maxGlitches = 6;
            
            const glitchInterval = setInterval(() => {
                this.textContent = originalName.split('').map(char => 
                    Math.random() > 0.7 ? String.fromCharCode(33 + Math.random() * 94) : char
                ).join('');
                
                glitchCount++;
                if (glitchCount >= maxGlitches) {
                    clearInterval(glitchInterval);
                    this.textContent = originalName;
                    isGlitching = false;
                }
            }, 50);
        });
        /* ----------------------------------------------------------- */

        // Particle effect on click
        document.addEventListener('click', function(e) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.background = '#fff';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            particle.style.animation = 'particle-explosion 0.6s ease-out';
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 600);
        });

        // Stats counter animation
        function animateStats() {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + '%';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + '%';
                    }
                }, 30);
            });
        }

        // Trigger stats animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.disconnect();
                }
            });
        });

        setTimeout(() => {
            const statsSection = document.querySelector('.stats');
            if (statsSection) observer.observe(statsSection);
        }, 2500);