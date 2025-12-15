
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const navbarMenu = document.getElementById('navbar-menu');

  
    hamburgerBtn.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
    });


    const navLinks = navbarMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        });
    });

    
    document.addEventListener('click', function(event) {
        const isClickInsideNav = hamburgerBtn.contains(event.target) || navbarMenu.contains(event.target);
        if (!isClickInsideNav && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const offers = document.querySelector('.offers');
    if (!offers) return;

    const rotateDelay = 4000;

    function rotateOnce() {
        const first = offers.querySelector('.offer-item');
        if (!first) return;

     
        first.classList.add('rotating-out');

        const cleanup = () => {
           
            const clone = first.cloneNode(true);
           
            clone.style.transition = 'none';
            clone.style.transform = 'translateX(30px)';
            clone.style.opacity = '0';
            offers.appendChild(clone);

          
            requestAnimationFrame(() => {
                clone.style.transition = '';
                clone.style.transform = '';
                clone.style.opacity = '';
            });

          
            first.remove();
        };

        
        const onEnd = (e) => {
            if (e.target !== first) return;
            first.removeEventListener('transitionend', onEnd);
            cleanup();
        };

        first.addEventListener('transitionend', onEnd);

        
        setTimeout(() => {
            if (offers.contains(first)) cleanup();
        }, 700);
    }

    let rotateTimer = setInterval(rotateOnce, rotateDelay);

  
    offers.addEventListener('mouseenter', () => clearInterval(rotateTimer));
    offers.addEventListener('mouseleave', () => rotateTimer = setInterval(rotateOnce, rotateDelay));
});
