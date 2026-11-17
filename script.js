const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navToggle.classList.toggle("open", !isOpen);
    nav.classList.toggle("open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
      navToggle.classList.remove("open");
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
    });
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("revealed"));
}

document.querySelectorAll("[data-scroll-demo]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" });
  });
});

const demoForm = document.querySelector("[data-demo-form]");
if (demoForm) {
  demoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = demoForm.querySelector("[data-form-status]");
    if (!demoForm.checkValidity()) {
      demoForm.reportValidity();
      status.textContent = "Please complete both fields.";
      return;
    }
    status.textContent = "Demo request completed.";
  });
}
