document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------------------
       THEME TOGGLE (SAFE)
    ----------------------------------------------------------- */
    const toggleBtn = document.getElementById('modeToggle');
    const body = document.body;
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');

    function applyTheme(theme) {
        body.dataset.theme = theme;

        if (lightIcon && darkIcon) {
            if (theme === 'dark') {
                lightIcon.style.display = 'none';
                darkIcon.style.display = 'inline';
            } else {
                lightIcon.style.display = 'inline';
                darkIcon.style.display = 'none';
            }
        }
    }

    const savedTheme = localStorage.getItem('theme')
        || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    applyTheme(savedTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const newTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }


    /* -----------------------------------------------------------
       HERO SLIDE TEXT ANIMATION (SAFE)
    ----------------------------------------------------------- */
    const slideText = document.querySelector('.slide-text');
    const slideSubtext = document.querySelector('.slide-subtext');

    if (slideText && slideSubtext) {
        const rect = slideText.getBoundingClientRect();
        const initiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (!initiallyVisible) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        slideText.classList.add('slide-in');
                        slideSubtext.classList.add('slide-in');
                        observer.unobserve(slideText);
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(slideText);
        }
    }


    /* -----------------------------------------------------------
       MOTTO SECTION FADE (SAFE)
    ----------------------------------------------------------- */
    const mottoSection = document.querySelector('.about-motto-section');
    let lastScroll = 0;

    if (mottoSection) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const scrollingDown = currentScroll > lastScroll;

            const sectionTop = mottoSection.offsetTop;
            const sectionBottom = sectionTop + mottoSection.offsetHeight;
            const windowHeight = window.innerHeight;

            const inView =
                currentScroll + windowHeight > sectionTop &&
                currentScroll < sectionBottom;

            if (inView) {
                if (scrollingDown) {
                    mottoSection.style.opacity = Math.max(
                        parseFloat(mottoSection.style.opacity || 1) - 0.05,
                        0
                    );
                } else {
                    mottoSection.style.opacity = Math.min(
                        parseFloat(mottoSection.style.opacity || 0) + 0.05,
                        1
                    );
                }
            }

            lastScroll = currentScroll;
        });
    }


    /*  FADE-IN SECTIONS ON SCROLL (SAFE) */
    const fadeSections = document.querySelectorAll('.fade-on-scroll');

    if (fadeSections.length > 0) {
        function fadeInOnScroll() {
            const windowBottom = window.innerHeight + window.scrollY;

            fadeSections.forEach(section => {
                const sectionTop = section.offsetTop;

                if (windowBottom > sectionTop + 100) {
                    section.style.opacity = 1;
                }
            });
        }

        window.addEventListener('scroll', fadeInOnScroll);
        window.addEventListener('load', fadeInOnScroll);
    }

    // Initialize Swiper
    const menuSwiper = new Swiper('.menu-swiper', {
        loop: true, // Infinite loop with 10 slides
        autoplay: {
            delay: 20000, // Reduced to 20 seconds per full cycle (adjust to 10000 for 10s if too fast)
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        speed: 500, // Faster transitions (was 1000ms)
        slidesPerView: 'auto',
        spaceBetween: 20,
        grabCursor: true,
        breakpoints: {
            768: {
                spaceBetween: 15,
            }
        }
    });


});
