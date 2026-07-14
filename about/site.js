"use strict";
(() => {
  const key = "portfolio-theme";
  const button = document.getElementById("theme-toggle");
  if (!(button instanceof HTMLButtonElement)) return;
  const lightIcon = button.querySelector('[data-theme-icon="light"]');
  const darkIcon = button.querySelector('[data-theme-icon="dark"]');
  const preferred = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const stored = localStorage.getItem(key);
  if (stored === "light" || stored === "dark") document.documentElement.dataset.theme = stored;
  const current = () => document.documentElement.dataset.theme || preferred();
  const update = () => {
    const theme = current();
    if (lightIcon instanceof HTMLElement) lightIcon.hidden = theme !== "light";
    if (darkIcon instanceof HTMLElement) darkIcon.hidden = theme !== "dark";
    const label = theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему";
    button.setAttribute("aria-label", label);
    button.title = label;
    button.setAttribute("aria-pressed", String(theme === "dark"));
  };
  button.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(key, next);
    update();
  });
  update();
})();
(() => {
  const dialog = document.getElementById("lightbox");
  const image = dialog?.querySelector("[data-lightbox-image]");
  const closeButton = dialog?.querySelector("[data-lightbox-close]");
  if (!(dialog instanceof HTMLDialogElement) || !(image instanceof HTMLImageElement) || !(closeButton instanceof HTMLButtonElement)) return;
  let returnTarget = null;
  const close = () => { if (dialog.open) dialog.close(); };
  document.querySelectorAll(".lightbox-trigger").forEach((trigger) => {
    if (!(trigger instanceof HTMLButtonElement)) return;
    trigger.addEventListener("click", () => {
      const source = trigger.dataset.lightboxSrc;
      if (!source) return;
      returnTarget = trigger;
      image.src = source;
      image.alt = trigger.dataset.lightboxAlt || "";
      document.body.classList.add("lightbox-open");
      dialog.showModal();
      closeButton.focus();
    });
  });
  closeButton.addEventListener("click", close);
  dialog.addEventListener("click", (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    image.removeAttribute("src");
    if (returnTarget instanceof HTMLElement) returnTarget.focus();
    returnTarget = null;
  });
})();
(() => {
  document.querySelectorAll("[data-project-card]").forEach((card) => {
    if (!(card instanceof HTMLAnchorElement)) return;
    const badge = card.querySelector("[data-project-cursor]");
    if (!(badge instanceof HTMLElement)) return;
    card.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "touch") return;
      badge.hidden = false;
    });
    card.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;
      badge.style.left = event.clientX + "px";
      badge.style.top = event.clientY + "px";
    });
    card.addEventListener("pointerleave", () => { badge.hidden = true; });
  });
})();
(() => {
  document.querySelectorAll("[data-accordion]").forEach((accordion) => {
    const toggle = accordion.querySelector("[data-accordion-toggle]");
    const content = accordion.querySelector("[data-accordion-content]");
    const collapsedLabel = accordion.querySelector(".accordion__label--collapsed");
    const expandedLabel = accordion.querySelector("[data-accordion-expanded-label]");
    if (!(toggle instanceof HTMLButtonElement) || !(content instanceof HTMLElement)) return;
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(expanded));
      content.hidden = !expanded;
      if (collapsedLabel instanceof HTMLElement) collapsedLabel.hidden = expanded;
      if (expandedLabel instanceof HTMLElement) expandedLabel.hidden = !expanded;
    });
  });
})();
