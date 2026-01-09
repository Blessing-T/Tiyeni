
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

// Popup Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('popup-modal');
    const closeBtn = document.querySelector('.popup-close');
    const popupBody = document.getElementById('popup-body');
    
    // Content for each popup
    const popupContent = {
        'about': {
            title: 'About Us',
            content: `
                <h2 style="color: #c8742a; margin-bottom: 20px; font-size: 28px;">We Invite You to Experience Comfort & Adventure</h2>
                <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                    Discover a welcoming stay paired with unforgettable local experiences. Our accommodation offers comfort, privacy, and convenience, while our guided tours introduce you to the culture, nature, and beauty of the destination. Whether you're here to relax or explore, we create stays worth remembering.
                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                    At Tiyeni, we believe in creating authentic connections with our guests. Our team of local experts ensures that every aspect of your visit is tailored to provide genuine experiences that go beyond the ordinary tourist attractions.
                </p>
            `
        },
        'tours': {
            title: 'Tours & Experiences',
            content: `
                <h2 style="color: #c8742a; margin-bottom: 20px; font-size: 28px;">Curated Tours for Every Traveler</h2>
                <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                    Explore iconic attractions, hidden gems, and authentic local culture through our carefully designed tours. Led by experienced local guides, each experience is crafted to be safe, enriching, and memorable, giving you a deeper connection to every place you visit.
                </p>
                <div style="margin-top: 20px;">
                    <h3 style="color: #333; margin-bottom: 15px;">Our Tour Highlights:</h3>
                    <ul style="color: #555; line-height: 1.8;">
                        <li>• Victoria Falls viewpoints and boat cruises</li>
                        <li>• Wildlife safari experiences</li>
                        <li>• Local market and cultural tours</li>
                        <li>• Sunset and sunrise adventures</li>
                        <li>• Community-led experiences</li>
                    </ul>
                </div>
            `
        },
        'community': {
            title: 'Community & Sustainability',
            content: `
                <h2 style="color: #c8742a; margin-bottom: 20px; font-size: 28px;">Supporting Our Community, Preserving Our Environment</h2>
                <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                    Tiyeni Group is deeply dedicated to making a positive and lasting 
                    impact on the Victoria Falls community by actively working to uplift 
                    and empower its residents. 
                    The company believes in the importance of fostering sustainable 
                    development and social well-being, and this runs Afro Edge Zimbabwe, 
                    a not-for-profit organization committed to addressing critical issues 
                    such as education, healthcare, environmental sustainability, and social 
                    services. Through these efforts, Afro Edge Zimbabwe aims to create 
                    opportunities and improve the quality of life for children, youth, and
                     women, ensuring that they have access to the resources and support 
                     necessary to thrive and contribute meaningfully to their communities.


                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                    Furthermore, Afro Edge Zimbabwe’s Youth Ambassadors play a vital role 
                    in implementing impactful programs, particularly in the fight against 
                    HIV/AIDS. These passionate young leaders are actively involved in HIV/AIDS
                     awareness campaigns, prevention initiatives, and support services, 
                     helping to reduce stigma and promote healthier lifestyles among their 
                     peers. In addition, the Youth Ambassadors are spearheading an innovative 
                     black soldier fly larvae project, which champions environmental 
                     sustainability in Victoria Falls. This project focuses on converting 
                     all food waste generated by the hospitality sector into high-protein 
                     feed for livestock, thereby reducing waste, lowering environmental 
                     footprints, and providing a sustainable alternative to conventional 
                     animal feed. Through these initiatives, Afro Edge Zimbabwe exemplifies
                      a holistic approach to community development, driven by youth 
                      leadership and a commitment to creating a sustainable future.
                </p>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <h3 style="color: #333; margin-bottom: 10px;">Read more here… <a href="https://afroedge.org" style="color: #c8742a; text-decoration: none;">afroedge.org</a></h3>
                    
                </div>
            `
        }
    };
    
    // Add click event listeners to all READ MORE buttons
    document.querySelectorAll('.what-we-offer .btn').forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            let contentKey;
            if (index === 0) contentKey = 'about';
            else if (index === 1) contentKey = 'tours';
            else if (index === 2) contentKey = 'community';
            
            if (contentKey && popupContent[contentKey]) {
                popupBody.innerHTML = popupContent[contentKey].content;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
});
