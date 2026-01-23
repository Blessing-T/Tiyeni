document.addEventListener('DOMContentLoaded', function() {
  document.documentElement.style.perspective = '1200px';

  const scrollCards = document.querySelectorAll('.luxury-room-card, .card, .feature-card, .amenity-item, .offer-item');

  window.addEventListener('scroll', () => {
    scrollCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        const windowCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distance = (elementCenter - windowCenter) / windowCenter;

        const rotateX = distance * 5;
        const rotateY = (distance * 3) % 360;
        const scale = 1 + (Math.abs(distance) * 0.05);

        card.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateZ(${50 - Math.abs(distance) * 30}px)
          scale(${Math.min(scale, 1.1)})
        `;
        card.style.opacity = 1 - Math.abs(distance) * 0.3;
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
