document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Parallax Background
    const bgLayer = document.querySelector('.bg-layer');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        bgLayer.style.transform = `scale(1.05) translateY(${scrolled * 0.1}px)`;
    });

    // 3. 3D Tilt Effect on Hero Image based on Mouse movement
    const heroImageContainer = document.querySelector('.hero-image-container');
    const heroImage = document.querySelector('.hero-image');

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return; // Disable on mobile

        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
        
        // Add subtle continuous movement even without hover, but amplify if hovering container
        heroImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis+10}deg)`;
    });

    // Reset rotation on mobile or extreme edges smoothly
    document.addEventListener('mouseleave', () => {
        heroImage.style.transform = `rotateY(0deg) rotateX(10deg)`;
    });

    // 4. Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger Count Up Animation if it's the stats section
                if (entry.target.classList.contains('card')) {
                    const numberEl = entry.target.querySelector('.count-up');
                    if (numberEl && !numberEl.classList.contains('counted')) {
                        startCountUp(numberEl);
                        numberEl.classList.add('counted');
                    }
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 5. Count Up Animation Function
    function startCountUp(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // ms
        const step = 16; // 60fps
        const steps = duration / step;
        const increment = target / steps;
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.innerText = target.toLocaleString();
                clearInterval(timer);
                
                // Add comma or '+' if it's large amount
                if(target === 25000) element.innerText = "25,000";
            } else {
                element.innerText = Math.floor(current).toLocaleString();
            }
        }, step);
    }

    // 6. Form Submission Simulation
    const form = document.getElementById('bookingForm');
    const successMsg = document.getElementById('successMsg');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'PROCESSING...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.opacity = '1';
            successMsg.style.display = 'block';
            form.reset();
            
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        }, 1500);
    });
});
