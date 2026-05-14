import { useEffect, useRef, useState } from "react";
import "./process.css";

const DEFAULT_STEPS = [
  {
    number: "01",
    title: "Consultation",
    description:
      "We begin with a quiet conversation about the story, mood, people, location, and the feeling you want the images to carry.",
  },
  {
    number: "02",
    title: "Planning",
    description:
      "Every visual detail is refined — styling, timing, shot direction, references, locations, and the rhythm of the session.",
  },
  {
    number: "03",
    title: "Shooting",
    description:
      "The session is guided with calm direction, natural movement, and enough space for honest moments to unfold.",
  },
  {
    number: "04",
    title: "Editing",
    description:
      "Images are carefully selected and refined with a cinematic, timeless finish while preserving the truth of the moment.",
  },
  {
    number: "05",
    title: "Delivery",
    description:
      "Your final gallery is delivered beautifully, ready to download, share, print, and return to for years.",
  },
];

export default function ProcessSection({ steps = DEFAULT_STEPS }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealEls = section.querySelectorAll("[data-process-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="process-photographer section section--dark" id="process" ref={sectionRef}>
      <div className="process-photographer__glow" aria-hidden="true" />

      <div className="container">
        <div className="process-photographer__header">
          <div>
            <span className="eyebrow" data-process-reveal>
              Process
            </span>

            <h2 className="process-photographer__title" data-process-reveal>
              A considered process for images that feel effortless.
            </h2>
          </div>

          <p className="process-photographer__copy" data-process-reveal>
            Luxury is not rushed. Every step is designed to make the experience calm, intentional,
            and deeply personal from first conversation to final gallery.
          </p>
        </div>

        <div className="process-photographer__layout">
          <div className="process-photographer__list" data-process-reveal>
            {steps.map((step, index) => (
              <button
                type="button"
                className={`process-photographer__step ${
                  activeIndex === index ? "is-active" : ""
                }`}
                key={step.title}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                <span className="process-photographer__step-number">{step.number}</span>
                <span className="process-photographer__step-title">{step.title}</span>
                <span className="process-photographer__step-line" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="process-photographer__detail" data-process-reveal>
            <span className="process-photographer__detail-number">
              {steps[activeIndex].number}
            </span>

            <h3>{steps[activeIndex].title}</h3>

            <p>{steps[activeIndex].description}</p>

            <a href="#contact" className="link-line process-photographer__link">
              Start the process
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
