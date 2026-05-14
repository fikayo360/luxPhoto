import { useEffect, useRef, useState } from "react";
import "./hero.css";

// ─── Scroll indicator arrow ───────────────────────────────────────────────────
function ScrollArrow() {
  return (
    <svg
      className="hero__scroll-arrow"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M10 3v14M3 10l7 7 7-7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Word splitter for staggered text reveal ─────────────────────────────────
function SplitWords({ text, className, delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={`split-words ${className || ""}`} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="split-words__word"
          style={{ "--word-index": i, "--base-delay": `${delay}ms` }}
          aria-hidden="true"
        >
          <span className="split-words__inner">{word}</span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}

// ─── Magnetic button hook ─────────────────────────────────────────────────────
function useMagnetic(strength = 0.28) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      el.style.transition = "transform 0.1s linear";
    };
    const onLeave = () => {
      el.style.transform = "translate(0,0)";
      el.style.transition = "transform 0.6s cubic-bezier(0.16,1,0.3,1)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}

// ─── Video sources — swap src for your own file at any time ─────────────────
// These are direct MP4 links from Pexels (free, no attribution required for web)
const VIDEO_SOURCES = [
  {
    src: "https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4",
    type: "video/mp4",
  },
];

// Fallback poster shown while video loads or on reduced-data connections
const POSTER =
  "https://www.mariannechua.com/uploads/outdoor-wedding-photographer-1.jpg";

// ─── Main component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const heroRef    = useRef(null);
  const videoRef   = useRef(null);
  const [loaded, setLoaded]       = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const btnPrimaryRef   = useMagnetic(0.3);
  const btnSecondaryRef = useMagnetic(0.3);

  // Trigger entrance sequence — wait slightly for first paint
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  // Play video as soon as enough data is buffered
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Respect reduced-data preference — show poster only
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn?.saveData) return;

    const onReady = () => {
      setVideoReady(true);
      video.play().catch(() => {
        // Autoplay blocked (some mobile browsers) — stays on poster, no error thrown
      });
    };

    if (video.readyState >= 3) {
      onReady();
    } else {
      video.addEventListener("canplaythrough", onReady, { once: true });
    }

    return () => video.removeEventListener("canplaythrough", onReady);
  }, []);

  // Parallax on scroll — GPU transform only
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          video.style.transform = `scale(1.08) translateY(${window.scrollY * 0.20}px)`;
          ticking = false;
        });
        ticking = true
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className={`hero-section ${loaded ? "hero-section--loaded" : ""}`}
      ref={heroRef}
      aria-label="Hero"
    >              
      {/* ── Cinematic background video ── */}
      <div className="hero-section__media" aria-hidden="true">

        {/* Poster image — always rendered, fades out once video is ready */}
        <div
          className={`hero-section__poster ${videoReady ? "hero-section__poster--hidden" : ""}`}
          style={{ backgroundImage: `url(${POSTER})` }}
        />

        {/* Video element */}
        <video
          ref={videoRef}
          className={`hero-section__video ${videoReady ? "hero-section__video--visible" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
          aria-hidden="true"
        >
          {VIDEO_SOURCES.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>

        {/* Layered overlays for depth */}
        <div className="hero-section__overlay hero-section__overlay--vignette" />
        <div className="hero-section__overlay hero-section__overlay--gradient" />
        <div className="hero-section__overlay hero-section__overlay--top" />
      </div>

      {/* ── Noise grain texture ── */}
      <div className="hero-section__grain" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="hero-section__content">

        {/* Eyebrow / logo name */}
        <div className="hero-section__eyebrow">
          <span className="hero-section__eyebrow-line" />
          <span className="hero-section__eyebrow-text">Mira Ade</span>
          <span className="hero-section__eyebrow-line" />
        </div>

        {/* Main title */}
        <h1 className="hero-section__title" aria-label="Visual Storyteller">
          <span className="hero-section__title-row">
            <SplitWords text="Visual" delay={300} />
          </span>
          <span className="hero-section__title-row">
            <SplitWords text="Storyteller" delay={420} />
          </span>
        </h1>

        {/* Tagline */}
        <p className="hero-section__tagline">
          <span className="hero-section__tagline-inner">
            Capturing stories through light, emotion, and timeless frames.
          </span>
        </p>

        {/* CTA buttons */}
        <div className="hero-section__actions">
          <button
            ref={btnPrimaryRef}
            className="hero-btn hero-btn--primary shimmer-btn"
          >
            <span className="hero-btn__label">View Portfolio</span>
            <span className="hero-btn__arrow" aria-hidden="true">↗</span>
          </button>

          <button
            ref={btnSecondaryRef}
            className="hero-btn hero-btn--outline"
          >
            <span className="hero-btn__label">Book a Session</span>
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-section__scroll-hint" aria-hidden="true">
        <div className="hero-section__scroll-track">
          <div className="hero-section__scroll-dot" />
        </div>
        <span className="hero-section__scroll-label">Scroll</span>
      </div>

      {/* ── Corner metadata ── */}
      <div className="hero-section__meta hero-section__meta--left" aria-hidden="true">
        <span>Lagos · Nigeria</span>
      </div>
      <div className="hero-section__meta hero-section__meta--right" aria-hidden="true">
        <span>© 2026</span>
      </div>
    </section>
  );
}