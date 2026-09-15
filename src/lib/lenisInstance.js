"use client";

// Tiny shared-singleton so components outside SmoothScroll.jsx (e.g.
// Preloader) can pause/resume the same Lenis instance it owns.
let lenis = null;

export function setLenisInstance(instance) {
  lenis = instance;
}

export function getLenisInstance() {
  return lenis;
}
