// =====================================================
// THEME TOGGLE
// =====================================================
const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
  }
}

// initial theme
setTheme(storedTheme || (prefersDark ? "dark" : "light"));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}

// =====================================================
// MOBILE NAV TOGGLE
// =====================================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
    }
  });
}

// =====================================================
// BACK TO TOP BUTTON
// =====================================================
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// =====================================================
// FADE-IN ON SCROLL
// =====================================================
const faders = document.querySelectorAll(".fade-in");
if ("IntersectionObserver" in window && faders.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  faders.forEach((el) => observer.observe(el));
}

// =====================================================
// PREMIUM ACCORDION BEHAVIOR + FADE EFFECT
// =====================================================
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const accordion = header.closest(".accordion");
    if (!accordion) return;

    const content = accordion.querySelector(".accordion-content");
    if (!content) return;

    const isOpen = accordion.classList.toggle("open");

    if (isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = "0";
      setTimeout(() => (content.style.opacity = "1"), 150);
    } else {
      content.style.maxHeight = 0;
      content.style.opacity = "0";
    }
  });
});

// =====================================================
// CLICKABLE TAGS -> SMOOTH SCROLL TO RESEARCH SECTIONS
// =====================================================
document.querySelectorAll(".research-tags .tag").forEach((tag) => {
  tag.addEventListener("click", () => {
    const targetId = tag.getAttribute("data-target");
    const el = document.getElementById(targetId);
    if (!el) return;

    document.querySelectorAll(".research-tags .tag").forEach((t) =>
      t.classList.remove("active")
    );
    tag.classList.add("active");

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// =====================================================
// SCROLLSPY FOR RESEARCH TAGS
// =====================================================
const sections = document.querySelectorAll(".research-block");
const spyTags = document.querySelectorAll(".research-tags .tag");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      current = sec.getAttribute("id");
    }
  });

  spyTags.forEach((tag) => {
    tag.classList.toggle("active", tag.dataset.target === current);
  });
});

// =====================================================
// PUBLICATION FILTERS (PUBLICATIONS PAGE)
// =====================================================
const pubFilterButtons = document.querySelectorAll(".pub-filter");
const pubCards = document.querySelectorAll(".pub-card");

if (pubFilterButtons.length && pubCards.length) {
  pubFilterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const topic = btn.getAttribute("data-topic");

      pubFilterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      pubCards.forEach((card) => {
        const cardTopic = card.getAttribute("data-topic");
        card.style.display =
          topic === "all" || cardTopic === topic ? "block" : "none";
      });
    });
  });
}

// =====================================================
// BIBTEX TOGGLE (PUBLICATIONS PAGE)
// =====================================================
document.querySelectorAll(".pub-bib-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".pub-card");
    if (!card) return;
    const bib = card.querySelector(".pub-bib");
    if (!bib) return;

    bib.style.display = bib.style.display === "block" ? "none" : "block";
  });
});

// =====================================================
// COPY CITATION TO CLIPBOARD (PUBLICATIONS PAGE)
// =====================================================
document.querySelectorAll(".pub-copy").forEach((btn) => {
  btn.addEventListener("click", () => {
    const text = btn.getAttribute("data-text");
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => {
          const original = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          setTimeout(() => {
            btn.innerHTML = original;
          }, 1500);
        },
        () => alert("Could not copy citation. Please copy manually.")
      );
    } else {
      alert("Clipboard API not available.");
    }
  });
});

// =====================================================
// ANIMATE TIMELINE VERTICAL LINE
// =====================================================
const timeline = document.querySelector(".timeline");

if (timeline) {
  window.addEventListener("scroll", () => {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const visible = Math.min(
      Math.max(windowHeight - rect.top, 0),
      rect.height
    );

    timeline.style.setProperty("--line-visible", visible + "px");
  });
}
