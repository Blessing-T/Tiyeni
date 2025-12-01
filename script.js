// Hamburger menu toggle for mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const navbarMenu = document.getElementById('navbar-menu');

    // Toggle menu visibility when hamburger is clicked
    hamburgerBtn.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    const navLinks = navbarMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = hamburgerBtn.contains(event.target) || navbarMenu.contains(event.target);
        if (!isClickInsideNav && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        }
    });
});
