// ==========================
// DOM READY
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector("#menuToggle");
  const nav = document.querySelector("#siteNav");

  if (toggleBtn && nav) {
    // Accessibility
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Toggle navigation");

    // Toggle click
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle("open");
      toggleBtn.classList.toggle("active", isOpen);
      toggleBtn.setAttribute("aria-expanded", isOpen.toString());
    });

    // Close if clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
        nav.classList.remove("open");
        toggleBtn.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Close with ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggleBtn.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Auto year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Highlight current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href === currentPage ||
      (href === "index.html" && (currentPage === "" || currentPage === "/"))
    ) {
      link.classList.add("active");
    }
  });
});

// ==========================
// SCROLL EFFECTS
// ==========================
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = Math.min(Math.max(scrollTop / docHeight, 0), 1);

  // Sidebar gradient
  const sidebar = document.querySelector('.side-bar');

  const startTop = [10, 42, 94];       // initial top color
  const startBottom = [37, 99, 235];   // initial bottom color
  const endTop = [20, 80, 150];        // top at 100% scroll
  const endBottom = [100, 180, 255];   // bottom at 100% scroll

  function lerp(start, end, t) {
    return Math.round(start + (end - start) * t);
  }

  const topColor = `rgb(${lerp(startTop[0], endTop[0], scrollPercent)}, 
                        ${lerp(startTop[1], endTop[1], scrollPercent)}, 
                        ${lerp(startTop[2], endTop[2], scrollPercent)})`;

  const bottomColor = `rgb(${lerp(startBottom[0], endBottom[0], scrollPercent)}, 
                           ${lerp(startBottom[1], endBottom[1], scrollPercent)}, 
                           ${lerp(startBottom[2], endBottom[2], scrollPercent)})`;

  sidebar.style.background = `linear-gradient(to bottom, ${topColor} 0%, ${bottomColor} 100%)`;

  // Scrollbar thumb (optional)
  const thumb = document.querySelector('::-webkit-scrollbar-thumb');
  if (thumb) {
    thumb.style.background = `linear-gradient(to bottom, #ff7e5f ${scrollPercent*100}%, #feb47b)`;
  }
});

// ==========================
// IMAGE SLIDER
// ==========================
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  if (slides.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach(slide => slide.style.display = "none");
  dots.forEach(dot => dot.classList.remove("active"));

  slides[slideIndex - 1].style.display = "block";
  if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add("active");
}

// Auto-play every 10s
setInterval(() => plusSlides(1), 10000);
