"use client";

import { useEffect, useId, useRef, useState } from "react";
import { submitWaitlist } from "@/lib/strapi";
import { ensureGsap } from "@/lib/gsapSetup";

export default function Header({ data }) {
  const nav = data?.nav || [];
  const cta = data?.cta || {};
  const modal = data?.modal || {};

  const [isHidden, setIsHidden] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const menuPanelRef = useRef(null);
  const menuCloseRef = useRef(null);
  const menuTriggerRef = useRef(null);
  const headingId = useId();
  const menuHeadingId = useId();

  // Moves focus into the dialog on open, restores it to the trigger on
  // close, and wires Escape-to-dismiss + a Tab focus trap while it's open.
  useEffect(() => {
    if (!isModalOpen) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsModalOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Hide on scroll-down, reveal on scroll-up, except inside the Hero
  // section (.cover / .static-hero), where it always stays visible.
  useEffect(() => {
    let heroBottom = 0;
    let lastY = window.scrollY;
    let ticking = false;

    function measureHeroBottom() {
      const candidates = document.querySelectorAll(".cover, .static-hero");
      for (const el of candidates) {
        if (el.offsetHeight > 0) {
          const rect = el.getBoundingClientRect();
          return rect.bottom + window.scrollY;
        }
      }
      return 0;
    }

    function update() {
      const currentY = window.scrollY;
      const inHero = currentY < heroBottom;

      if (inHero) {
        setIsHidden(false);
      } else if (currentY > lastY) {
        setIsHidden(true);
      } else if (currentY < lastY) {
        setIsHidden(false);
      }

      lastY = currentY;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    function onResize() {
      heroBottom = measureHeroBottom();
    }

    heroBottom = measureHeroBottom();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
    };
  }, []);

  // Swaps logo/nav color via each section's data-header-theme attribute.
  // Rebuilt on resize since only one of desktop/static is ever laid out.
  useEffect(() => {
    const { ScrollTrigger } = ensureGsap();
    let triggers = [];

    function build() {
      triggers.forEach((st) => st.kill());
      triggers = [];
      document.querySelectorAll("[data-header-theme]").forEach((el) => {
        if (el.offsetHeight === 0) return;
        const sectionTheme = el.dataset.headerTheme;
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top top+=1",
            end: "bottom top",
            onToggle: (self) => {
              if (self.isActive) setTheme(sectionTheme);
            },
          })
        );
      });
    }

    build();
    window.addEventListener("resize", build);
    window.addEventListener("load", build);

    return () => {
      window.removeEventListener("resize", build);
      window.removeEventListener("load", build);
      triggers.forEach((st) => st.kill());
    };
  }, []);

  // Same focus-management contract as the "stay ahead" modal above: trap
  // Tab, dismiss on Escape, restore focus to whichever button opened it.
  useEffect(() => {
    if (!isMenuOpen) return;

    menuCloseRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menuPanelRef.current) return;

      const focusable = menuPanelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  function openMenu(event) {
    menuTriggerRef.current = event.currentTarget;
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
    menuTriggerRef.current?.focus();
  }

  function openModal(event) {
    triggerRef.current = event.currentTarget;
    setStatus("idle");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    triggerRef.current?.focus();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.elements.namedItem("email").value;
    const honeypot = form.elements.namedItem("company").value;

    setStatus("submitting");
    try {
      await submitWaitlist({ email, honeypot, source: "homepage-header-modal" });
      closeModal();
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <header
      className={`header${isHidden ? " header--hidden" : ""}`}
      data-theme={theme}
    >
      <div className="container--primary">
        <div className="header__wrapper">
          <div className="header__links">
            <a href="#" className="header__wordmark" aria-label="Nota">
              <svg viewBox="0 0 71 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.26969 7.45499H3.91969V24.99H-0.000313967V0.55999H5.63469L12.0397 18.095H12.3897V0.55999H16.3097V24.99H10.6747L4.26969 7.45499ZM20.776 -1.13845e-05H31.206V3.21999H20.776V-1.13845e-05ZM25.991 25.41C24.6143 25.41 23.3777 25.1883 22.281 24.745C21.2077 24.3017 20.286 23.6717 19.516 22.855C18.7693 22.0383 18.186 21.0467 17.766 19.88C17.3693 18.7133 17.171 17.4067 17.171 15.96C17.171 14.5133 17.3693 13.2067 17.766 12.04C18.186 10.8733 18.7693 9.88166 19.516 9.06499C20.286 8.24832 21.2077 7.61832 22.281 7.17499C23.3777 6.73166 24.6143 6.50999 25.991 6.50999C27.3443 6.50999 28.5693 6.73166 29.666 7.17499C30.7627 7.61832 31.6843 8.24832 32.431 9.06499C33.201 9.88166 33.7843 10.8733 34.181 12.04C34.601 13.2067 34.811 14.5133 34.811 15.96C34.811 17.4067 34.601 18.7133 34.181 19.88C33.7843 21.0467 33.201 22.0383 32.431 22.855C31.6843 23.6717 30.7627 24.3017 29.666 24.745C28.5693 25.1883 27.3443 25.41 25.991 25.41ZM25.991 21.98C27.2743 21.98 28.2893 21.595 29.036 20.825C29.7827 20.0317 30.156 18.8767 30.156 17.36V14.56C30.156 13.0433 29.7827 11.9 29.036 11.13C28.2893 10.3367 27.2743 9.93999 25.991 9.93999C24.7077 9.93999 23.6927 10.3367 22.946 11.13C22.1993 11.9 21.826 13.0433 21.826 14.56V17.36C21.826 18.8767 22.1993 20.0317 22.946 20.825C23.6927 21.595 24.7077 21.98 25.991 21.98ZM45.0523 24.99C43.3257 24.99 42.054 24.535 41.2373 23.625C40.4207 22.715 40.0123 21.5367 40.0123 20.09V10.465H34.7623V6.92999H38.3323C39.0557 6.92999 39.569 6.78999 39.8723 6.50999C40.1757 6.20666 40.3273 5.68166 40.3273 4.93499V0.55999H44.4923V6.92999H51.8423V10.465H44.4923V21.455H51.8423V24.99H45.0523ZM68.3137 24.99C67.217 24.99 66.3653 24.7217 65.7587 24.185C65.1753 23.625 64.8253 22.855 64.7087 21.875H64.5337C64.207 22.995 63.5653 23.87 62.6087 24.5C61.652 25.1067 60.4737 25.41 59.0737 25.41C57.2537 25.41 55.807 24.9317 54.7337 23.975C53.6603 23.0183 53.1237 21.6883 53.1237 19.985C53.1237 16.345 55.7953 14.525 61.1387 14.525H64.3237V13.335C64.3237 12.1917 64.0437 11.3283 63.4837 10.745C62.9237 10.1617 62.0137 9.86999 60.7537 9.86999C59.6103 9.86999 58.6887 10.0917 57.9887 10.535C57.2887 10.9783 56.6937 11.55 56.2037 12.25L53.6487 10.08C54.2087 9.07666 55.107 8.23666 56.3437 7.55999C57.6037 6.85999 59.2253 6.50999 61.2087 6.50999C63.5887 6.50999 65.4437 7.06999 66.7737 8.18999C68.127 9.28666 68.8037 10.9317 68.8037 13.125V21.63H70.9387V24.99H68.3137ZM60.5787 22.33C61.652 22.33 62.5387 22.085 63.2387 21.595C63.962 21.0817 64.3237 20.3933 64.3237 19.53V17.115H61.2437C58.7937 17.115 57.5687 17.885 57.5687 19.425V20.125C57.5687 20.8483 57.837 21.3967 58.3737 21.77C58.9103 22.1433 59.6453 22.33 60.5787 22.33Z" fill="currentColor" />
              </svg>
            </a>
            {/* Plain unsplit text on purpose — the live site's per-letter
                split animation breaks screen-reader accessible names. */}
            <nav className="header__nav menu-link">
              {nav.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <button
            type="button"
            className="header__menu-toggle"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            onClick={openMenu}
          >
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              {[2, 8, 14].flatMap((cy) =>
                [2, 8, 14].map((cx) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.4" fill="currentColor" />
                ))
              )}
            </svg>
          </button>
          <div className="header__order">
            <button
              type="button"
              className="header__order-icon"
              aria-label={`${cta.orderLabel} ${cta.productLabel}`.trim()}
              onClick={openModal}
            >
              <img src="/images/logo-mark.svg" alt="" width="16" height="17" />
            </button>
            <button
              type="button"
              className="header__order-cta button-title"
              onClick={openModal}
            >
              <span className="header__order-cta-order">{cta.orderLabel}</span>{" "}
              <span className="header__order-cta-product">{cta.productLabel}</span>
              <span className="header__order-dot" aria-hidden="true" />
              <span className="header__order-price">{cta.price}</span>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="mobile-nav" role="dialog" aria-modal="true" aria-labelledby={menuHeadingId} ref={menuPanelRef}>
          <h2 id={menuHeadingId} className="sr-only">
            Menu
          </h2>
          <button
            type="button"
            className="mobile-nav__close"
            aria-label="Close menu"
            onClick={closeMenu}
            ref={menuCloseRef}
          >
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <nav className="mobile-nav__links" aria-label="Primary">
            {nav.map((link) => (
              <a href={link.href} key={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="mobile-nav__cta button-title"
            onClick={(event) => {
              closeMenu();
              openModal(event);
            }}
          >
            <span>{cta.orderLabel}</span> <span>{cta.productLabel}</span>
            <span className="header__order-dot" aria-hidden="true" />
            <span>{cta.price}</span>
          </button>
        </div>
      ) : null}

      {isModalOpen ? (
        <div className="stay-ahead-modal">
          <button
            type="button"
            className="stay-ahead-modal__overlay"
            aria-label="Close dialog"
            onClick={closeModal}
          />
          <div
            className="stay-ahead-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            ref={panelRef}
          >
            <h2 id={headingId} className="stay-ahead-modal__heading">
              {modal.heading}
            </h2>
            <p className="stay-ahead-modal__body main-text">{modal.body}</p>
            <form className="stay-ahead-modal__form" onSubmit={handleSubmit}>
              <label htmlFor="stay-ahead-email" className="sr-only">
                Email address
              </label>
              <input
                id="stay-ahead-email"
                name="email"
                type="email"
                placeholder={modal.inputPlaceholder}
                autoComplete="email"
                required
                className="stay-ahead-modal__input"
              />
              {/* Honeypot: visually hidden, not display:none, so bots still fill it. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
              />
              <button
                type="submit"
                className="stay-ahead-modal__submit button-title"
                disabled={status === "submitting"}
              >
                <span>{status === "submitting" ? "Sending…" : modal.submitLabel}</span>
                <span className="stay-ahead-modal__submit-dot" aria-hidden="true" />
              </button>
              {status === "error" ? (
                <p className="stay-ahead-modal__error" role="alert">
                  Something went wrong. Please try again.
                </p>
              ) : null}
            </form>
            <button
              type="button"
              className="stay-ahead-modal__close"
              onClick={closeModal}
              ref={closeButtonRef}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
