import { useEffect, useRef } from "react";
import "./p.css";

export default function FullscreenImageBreak({
  image = "/images/breaks/cinematic-break.jpg",
  eyebrow = "Editorial Pause",
  title = "Some stories are best understood in silence.",
  subtitle = "A quiet visual interlude designed to let the photographs breathe between sections.",
  align = "center",
  height = "screen",
}) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageEl = imageRef.current;

    if (!section || !imageEl) return;

    const revealEls = section.querySelectorAll("[data-break-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    revealEls.forEach((el) => observer.observe(el));

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return () => observer.disconnect();
    }

    let rafId = null;

    const handleParallax = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clamped = Math.min(Math.max(progress, 0), 1);
      const translate = (clamped - 0.5) * 90;

      imageEl.style.transform = `translate3d(0, ${translate}px, 0) scale(1.16)`;
    };

    const onScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        handleParallax();
        rafId = null;
      });
    };

    handleParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className={`fullscreen-image-break fullscreen-image-break--${align} fullscreen-image-break--${height}`}
      ref={sectionRef}
      aria-label={title}
    >
      <div className="fullscreen-image-break__media" data-break-reveal>
        <img
          ref={imageRef}
          src={image}
          alt=""
          aria-hidden="true"
          className="fullscreen-image-break__image"
        />
        <span className="fullscreen-image-break__overlay" aria-hidden="true" />
        <span className="fullscreen-image-break__reveal" aria-hidden="true" />
      </div>

      <div className="fullscreen-image-break__content">
        <span className="fullscreen-image-break__eyebrow" data-break-reveal>
          {eyebrow}
        </span>

        <h2 className="fullscreen-image-break__title" data-break-reveal>
          {title}
        </h2>

        <p className="fullscreen-image-break__subtitle" data-break-reveal>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
