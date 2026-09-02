document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.getElementById('menuDropdownBtn');
    const dropdownList = document.getElementById('menuDropdownList');
    
    if (dropdownBtn && dropdownList) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownList.classList.toggle('hidden');
        });

        document.addEventListener('click', () => {
            dropdownList.classList.add('hidden');
        });
    }
    
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    if (slides.length > 0) {
        function changeSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.remove('opacity-0', 'pointer-events-none');
                    slide.classList.add('opacity-100');
                    if(dots[i]) dots[i].classList.replace('opacity-40', 'opacity-100');
                } else {
                    slide.classList.remove('opacity-100');
                    slide.classList.add('opacity-0', 'pointer-events-none');
                    if(dots[i]) dots[i].classList.replace('opacity-100', 'opacity-40');
                }
            });
            currentIndex = index;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let idx = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;
                changeSlide(idx);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let idx = currentIndex + 1 >= slides.length ? 0 : currentIndex + 1;
                changeSlide(idx);
            });
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => changeSlide(i));
        });

        setInterval(() => {
            let idx = currentIndex + 1 >= slides.length ? 0 : currentIndex + 1;
            changeSlide(idx);
        }, 4000);
    }
});