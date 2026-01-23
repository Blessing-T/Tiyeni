document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburger-menu");
    const navbarMenu = document.getElementById("navbar-menu");
    const menuOverlay = document.getElementById("menu-overlay");

    const modal = document.getElementById("popup-modal");
    const closeBtn = document.querySelector(".popup-close");
    const popupBody = document.getElementById("popup-body");

    document.getElementById("year").textContent = new Date().getFullYear();

    function closeMenu() {
        navbarMenu.classList.remove("active");
        hamburgerBtn.classList.remove("active");
        menuOverlay.classList.remove("active");
    }

    if (hamburgerBtn && navbarMenu && menuOverlay) {
        hamburgerBtn.addEventListener("click", () => {
            navbarMenu.classList.toggle("active");
            hamburgerBtn.classList.toggle("active");
            menuOverlay.classList.toggle("active");
        });

        menuOverlay.addEventListener("click", closeMenu);

        navbarMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (event) => {
            const isClickInsideNav =
                hamburgerBtn.contains(event.target) || navbarMenu.contains(event.target);

            if (!isClickInsideNav && navbarMenu.classList.contains("active")) {
                closeMenu();
            }
        });
    }

    const popupContent = {
        about: `
            <h2 style="color:#c8742a;margin-bottom:20px;font-size:28px;">We Invite You to Experience Comfort & Adventure</h2>
            <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:20px;">
                Discover a welcoming stay paired with unforgettable local experiences. Our accommodation offers comfort, privacy, and convenience,
                while our guided tours introduce you to the culture, nature, and beauty of the destination. Whether you're here to relax or explore,
                we create stays worth remembering.
            </p>
            <p style="font-size:16px;line-height:1.6;color:#333;">
                At Tiyeni, we believe in creating authentic connections with our guests. Our team ensures every visit is tailored to provide genuine
                experiences that go beyond ordinary tourist attractions.
            </p>
        `,
        tours: `
            <h2 style="color:#c8742a;margin-bottom:20px;font-size:28px;">Curated Tours for Every Traveler</h2>
            <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:20px;">
                Explore iconic attractions, hidden gems, and authentic local culture through our carefully designed tours. Led by experienced local
                guides, each experience is crafted to be safe, enriching, and memorable.
            </p>
            <div style="margin-top:20px;">
                <h3 style="color:#333;margin-bottom:15px;">Our Tour Highlights:</h3>
                <ul style="color:#555;line-height:1.8;">
                    <li>• Victoria Falls viewpoints and boat cruises</li>
                    <li>• Wildlife safari experiences</li>
                    <li>• Local market and cultural tours</li>
                    <li>• Sunset and sunrise adventures</li>
                    <li>• Community-led experiences</li>
                </ul>
            </div>
        `,
        community: `
            <h2 style="color:#c8742a;margin-bottom:20px;font-size:28px;">Supporting Our Community, Preserving Our Environment</h2>
            <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:20px;">
                Tiyeni Group is committed to making a positive impact in Victoria Falls through Afro Edge Zimbabwe. The organization focuses on education,
                healthcare, sustainability, and social services to improve the quality of life for children, youth, and women.
            </p>
            <p style="font-size:16px;line-height:1.6;color:#333;margin-bottom:20px;">
                Afro Edge Zimbabwe Youth Ambassadors lead HIV/AIDS awareness programs and sustainability projects such as a black soldier fly larvae project,
                converting food waste into high-protein livestock feed.
            </p>
            <div style="background:#f8f9fa;padding:20px;border-radius:8px;margin-top:20px;">
                <h3 style="color:#333;margin-bottom:10px;">
                    Read more here… <a href="https://afroedge.org" style="color:#c8742a;text-decoration:none;">afroedge.org</a>
                </h3>
            </div>
        `
    };

    function openModal(key) {
        popupBody.innerHTML = popupContent[key];
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
    }

    document.querySelectorAll("[data-popup]").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const key = btn.dataset.popup;
            if (popupContent[key]) {
                openModal(key);
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });
});
