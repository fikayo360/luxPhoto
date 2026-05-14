import { useEffect, useMemo, useRef, useState } from "react";
import "./works.css";

const CATEGORIES = [
  "All",
  "Weddings",
  "Portraits",
  "Fashion",
  "Lifestyle",
  "Events",
  "Street",
  "Travel",
];

const DEFAULT_WORKS = [
  {
    title: "The Quiet Vow",
    category: "Weddings",
    image: "https://sensesatplay.com/wp-content/uploads/2024/11/posed-blog-SAP-scaled.jpg",
    location: "Lagos, Nigeria",
    year: "2025",
    size: "featured",
  },
  {
    title: "Soft Power",
    category: "Portraits",
    image: "https://i.pinimg.com/originals/3a/e7/57/3ae7570b10d1f71a41a1daea8bf8de77.jpg",
    location: "Studio Session",
    year: "2025",
    size: "tall",
  },
  {
    title: "Velvet Motion",
    category: "Fashion",
    image: "https://fashionweekonline.com/wp-content/uploads/2025/02/Germanier_HCSS25_2x3_26-copy.jpg",
    location: "Editorial",
    year: "2024",
    size: "wide",
  },
  {
    title: "Sunday Light",
    category: "Lifestyle",
    image: "https://images.squarespace-cdn.com/content/v1/574512d92eeb81676262d877/1723064767465-ZUA5J91KCNZRXYTYCBGJ/Street-Photographer-London-UK-Ian-Kobylanski_Mastering-Street-Photography_83.jpg",
    location: "Home Story",
    year: "2024",
    size: "standard",
  },
  {
    title: "After Hours",
    category: "Events",
    image: "https://www.websitedesigner.ng/media/blog_images/tech_events_nigeria.jpg",
    location: "Private Event",
    year: "2025",
    size: "standard",
  },
  {
    title: "City Rhythm",
    category: "Street",
    image: "https://miro.medium.com/v2/resize:fit:1400/1*o_mUT72NcRTLksQt1Z0Lgg.jpeg",
    location: "Downtown",
    year: "2024",
    size: "tall",
  },
  {
    title: "Far From Noise",
    category: "Travel",
    image: "https://klebergroup.com/wp-content/uploads/2025/10/%C2%A9iStock-9parusnikov-1024x683.jpg",
    location: "Coastal Road",
    year: "2025",
    size: "wide",
  },
  {
    title: "Far From Noise",
    category: "Travel",
    image: "https://thetravelexpert.ie/wp-content/uploads/2021/03/10.-Soneva-Jani.-1.jpg",
    location: "Coastal Road",
    year: "2025",
    size: "wide",
  },
    {
    title: "City Rhythm",
    category: "Street",
    image: "https://buenosairesstreetart.com/wp-content/uploads/2024/04/sao-paulo-street-art-murals-graffiti-best-murals-fresque-murais-tour-okuda-san-miguel-artist-felipe-pantone-tomie-ohtake-institute-faria-lima-largo-do-batata-pinheiros.jpg",
    location: "Downtown",
    year: "2024",
    size: "tall",
  }
];

export default function FeaturedWorkGallery({ works = DEFAULT_WORKS }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeWork, setActiveWork] = useState(null);
  const sectionRef = useRef(null);

  const filteredWorks = useMemo(() => {
    if (activeCategory === "All") return works;
    return works.filter((work) => work.category === activeCategory);
  }, [activeCategory, works]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealEls = section.querySelectorAll("[data-gallery-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredWorks]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const images = section.querySelectorAll("[data-gallery-parallax]");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let rafId = null;

    const updateParallax = () => {
      const viewportHeight = window.innerHeight;

      images.forEach((image) => {
        const rect = image.getBoundingClientRect();
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const clamped = Math.min(Math.max(progress, 0), 1);
        const speed = Number(image.dataset.galleryParallax) || 28;
        const translate = (clamped - 0.5) * speed;

        image.style.transform = `translate3d(0, ${translate}px, 0) scale(1.1)`;
      });
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateParallax();
        rafId = null;
      });
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [filteredWorks]);

  useEffect(() => {
    document.body.classList.toggle("gallery-lightbox-open", Boolean(activeWork));

    const handleEscape = (event) => {
      if (event.key === "Escape") setActiveWork(null);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("gallery-lightbox-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeWork]);

  return (
    <section className="featured-gallery section section--dark" id="work" ref={sectionRef}>
      <div className="featured-gallery__grain" aria-hidden="true" />

      <div className="container">
        <div className="featured-gallery__header">
          <div className="featured-gallery__heading-block">
            <span className="eyebrow" data-gallery-reveal>
              Featured Work
            </span>

            <h2 className="featured-gallery__title" data-gallery-reveal>
              A visual archive of people, places, and beautifully unfinished moments.
            </h2>
          </div>

          <div className="featured-gallery__side" data-gallery-reveal>
            <p>
              Explore selected frames across weddings, portraits, fashion, lifestyle, events,
              street stories, and travel essays.
            </p>

            <a href="#contact" className="link-line featured-gallery__inquiry">
              Commission a story
            </a>
          </div>
        </div>

        <div className="featured-gallery__filters" data-gallery-reveal aria-label="Gallery categories">
          {CATEGORIES.map((category) => (
            <button
              type="button"
              key={category}
              className={`featured-gallery__filter ${
                activeCategory === category ? "is-active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="featured-gallery__grid">
          {filteredWorks.map((work, index) => (
            <article
              className={`featured-gallery__item featured-gallery__item--${work.size || "standard"}`}
              key={`${work.title}-${activeCategory}`}
              data-gallery-reveal
              style={{ "--delay": `${index * 90}ms` }}
            >
              <button
                type="button"
                className="featured-gallery__image-button"
                onClick={() => setActiveWork(work)}
                aria-label={`Open ${work.title}`}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="featured-gallery__image"
                  data-gallery-parallax={work.size === "featured" ? "42" : "30"}
                />

                <span className="featured-gallery__shade" aria-hidden="true" />

                <span className="featured-gallery__meta">
                  <span>{work.category}</span>
                  <span>{work.year}</span>
                </span>

                <span className="featured-gallery__caption">
                  <span className="featured-gallery__work-title">{work.title}</span>
                  <span className="featured-gallery__location">{work.location}</span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>

      {activeWork && (
        <div
          className="featured-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeWork.title}
          onClick={() => setActiveWork(null)}
        >
          <button
            type="button"
            className="featured-gallery__lightbox-close"
            onClick={() => setActiveWork(null)}
          >
            Close
          </button>

          <figure
            className="featured-gallery__lightbox-frame"
            onClick={(event) => event.stopPropagation()}
          >
            <img src={activeWork.image} alt={activeWork.title} />
            <figcaption>
              <span>{activeWork.category}</span>
              <strong>{activeWork.title}</strong>
              <span>
                {activeWork.location} · {activeWork.year}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
