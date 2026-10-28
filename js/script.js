
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  highlightCurrentPage();
  updateFooterYear();
  setupBackToTop();
  setupSmoothScrolling();
});

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(
    ".site-header .main-nav, .site-header .primary-nav"
  );

  if (!toggle || !nav) return;

  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Toggle navigation");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function highlightCurrentPage() {
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(
    ".main-nav a, .primary-nav a"
  ).forEach(link => {
    const url = new URL(link.href, window.location.href);
    const linkPage =
      url.pathname.split("/").pop() || "index.html";

    if (
      url.origin === window.location.origin &&
      linkPage === currentPage
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function updateFooterYear() {
  document.querySelectorAll(
    "#year, [data-current-year]"
  ).forEach(element => {
    element.textContent = new Date().getFullYear();
  });
}

function setupBackToTop() {
  const button = document.createElement("button");

  button.type = "button";
  button.textContent = "↑";
  button.className = "back-to-top";
  button.setAttribute("aria-label", "Back to top");

  Object.assign(button.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "none",
    background: "#126da5",
    color: "#ffffff",
    fontSize: "22px",
    cursor: "pointer",
    zIndex: "1000",
    display: "none",
    boxShadow: "0 4px 15px rgba(0,0,0,.18)"
  });

  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    button.style.display =
      window.scrollY > 350 ? "block" : "none";
  }, { passive: true });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches ? "instant" : "smooth"
    });
  });
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const target = document.getElementById(id.slice(1));

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "instant" : "smooth"
      });
    });
  });
}
