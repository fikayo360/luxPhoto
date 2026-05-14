import { useEffect, useRef, useState } from "react";
import "./stats.css";

const DEFAULT_STATS = [
  {
    value: 120,
    suffix: "+",
    label: "Projects",
    description: "Stories shaped across weddings, portraits, campaigns, and intimate personal sessions.",
  },
  {
    value: 40,
    suffix: "+",
    label: "Weddings",
    description: "Celebrations documented with quiet direction, emotional detail, and timeless restraint.",
  },
  {
    value: 8,
    suffix: "+",
    label: "Years Experience",
    description: "Years spent studying light, people, movement, silence, and the poetry between frames.",
  },
  {
    value: 35,
    suffix: "+",
    label: "Brands & Clients",
    description: "Individuals, families, founders, and creative teams trusting the process and the eye.",
  },
];

function AnimatedCounter({ value, suffix = "", start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    let frameId = null;
    const duration = 1700;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(eased * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [start, value]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function ExperienceStatsSection({ stats = DEFAULT_STATS }) {
  const sectionRef = useRef(null);
  const [startCounters, setStartCounters] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealEls = section.querySelectorAll("[data-stats-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          if (entry.target === section) {
            setStartCounters(true);
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.24 }
    );

    observer.observe(section);
    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="experience-stats section section--dark"
      id="experience"
      ref={sectionRef}
    >
      <div className="experience-stats__glow" aria-hidden="true" />

      <div className="container">
        <div className="experience-stats__intro">
          <span className="eyebrow" data-stats-reveal>
            Experience
          </span>

          <h2 className="experience-stats__title" data-stats-reveal>
            A quiet record of trust, time, and carefully held stories.
          </h2>

          <p className="experience-stats__copy" data-stats-reveal>
            Numbers do not tell the whole story, but they mark the journey — the people, places,
            vows, portraits, and brands that have shaped the work over the years.
          </p>
        </div>

        <div className="experience-stats__grid" aria-label="Photography experience statistics">
          {stats.map((stat, index) => (
            <article
              className="experience-stats__item"
              key={stat.label}
              data-stats-reveal
              style={{ "--delay": `${index * 110}ms` }}
            >
              <div className="experience-stats__number">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  start={startCounters}
                />
              </div>

              <div className="experience-stats__body">
                <h3>{stat.label}</h3>
                <p>{stat.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}