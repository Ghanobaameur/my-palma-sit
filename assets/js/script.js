// ===========================
// MOBILE MENU TOGGLE
// ===========================
const navToggle = document.getElementById("nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
}

// إخفاء القائمة عند الضغط على عنصر
document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });
});


// ===========================
// REVEAL ON SCROLL
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));


// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});


// ===========================
// OPTIONAL: Close menu on scroll
// ===========================
window.addEventListener("scroll", () => {
    if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
    }
});

// ===========================
// SLIDER AUTO SWITCH
// ===========================
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function changeSlide() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[currentSlide].classList.add("active");

    currentSlide = (currentSlide + 1) % slides.length;
}

if (slides.length > 0) {
    changeSlide(); // أول صورة تظهر
    setInterval(changeSlide, 4000); // كل 4 ثواني
}
