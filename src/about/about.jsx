import { useEffect, useRef } from "react";
import "./about.css";

const DEFAULT_STATS = [
  { value: "7+", label: "Years of experience" },
  { value: "120+", label: "Stories captured" },
  { value: "45+", label: "Clients worked with" },
];

const DEFAULT_CLIENTS = [
  "Editorial Couples",
  "Creative Founders",
  "Fashion Brands",
  "Private Families",
  "Wedding Clients",
];

export default function AboutSection({
  portraitSrc = "https://mir-s3-cdn-cf.behance.net/project_modules/fs/570a1745898621.58408191aee7a.jpg",
  portraitAlt = "Portrait of the photographer",
  name = "Mira Ade",
  stats = DEFAULT_STATS,
  clients = DEFAULT_CLIENTS,
}) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section) return;

    const revealEls = section.querySelectorAll("[data-about-reveal]");

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

    let rafId = null;

    const handleParallax = () => {
      if (!image || prefersReducedMotion) return;

      const rect = image.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress =
        (viewportHeight - rect.top) / (viewportHeight + rect.height);

      const clamped = Math.min(Math.max(progress, 0), 1);
      const translate = (clamped - 0.5) * 36;

      image.style.transform = `translate3d(0, ${translate}px, 0) scale(1.08)`;
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
    <section className="about-photographer section section--dark" id="about" ref={sectionRef}>
      <div className="about-photographer__noise" aria-hidden="true" />

      <div className="container about-photographer__grid">
        <div className="about-photographer__media-wrap" data-about-reveal>
          <figure className="about-photographer__portrait">
            <img
              ref={imageRef}
              src={portraitSrc}
              alt={portraitAlt}
              className="about-photographer__portrait-img"
            />
          </figure>

          <div className="about-photographer__signature" aria-hidden="true">
            {name}
          </div>
        </div>

        <div className="about-photographer__content">
          <span className="eyebrow about-photographer__eyebrow" data-about-reveal>
            About the artist
          </span>

          <h2 className="about-photographer__title" data-about-reveal>
            I don’t just take photographs. I preserve the feeling of a moment before it disappears.
          </h2>

          <div className="about-photographer__story" data-about-reveal>
            <p>
              My work began with a quiet obsession: watching how light changes the mood of a room,
              the honesty in an unguarded smile, and the poetry hidden inside ordinary gestures.
            </p>

            <p>
              Over the years, that curiosity became a visual language — intimate, cinematic, and
              deeply human. Whether I’m documenting a wedding, a portrait session, or an editorial
              story, I’m always searching for the frame that feels honest.
            </p>
          </div>

          <blockquote className="about-photographer__philosophy" data-about-reveal>
            “Photography, to me, is less about perfection and more about presence — creating images
            that still feel alive years after they were made.”
          </blockquote>

          <div className="about-photographer__stats" data-about-reveal>
            {stats.map((stat) => (
              <div className="about-photographer__stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="about-photographer__clients" data-about-reveal>
            <span className="about-photographer__clients-label">Selected clients</span>
            <div className="about-photographer__client-list" aria-label="Clients worked with">
              {clients.map((client) => (
                <span key={client}>{client}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}