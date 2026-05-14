import { useEffect, useRef } from "react";
import "./services.css";

const DEFAULT_SERVICES = [
  {
    title: "Wedding Photography",
    image: "https://images-pw.pixieset.com/elementfield/EpmaQKq/CBP01628-5e591da4-1500.jpg",
    description:
      "Quietly cinematic coverage of vows, emotions, family, and the unscripted moments that make the day feel eternal.",
    href: "#contact",
  },
  {
    title: "Pre-Wedding Shoots",
    image: "https://www.bellanaija.com/wp-content/uploads/2013/11/Dapo_Funke_Nigerian_Yoruba_Wedding_E-session_Garden_22.jpg",
    description:
      "Editorial love stories crafted with direction, location styling, and images that feel intimate without feeling staged.",
    href: "#contact",
  },
  {
    title: "Portrait Sessions",
    image: "https://www.format.com/wp-content/uploads/portrait_of_black_man.jpg",
    description:
      "Personal portraits for artists, founders, professionals, and individuals who want images with presence and soul.",
    href: "#contact",
  },
  {
    title: "Fashion Editorial",
    image: "https://www.shutterstock.com/image-photo/elegant-fashion-portrait-woman-black-600nw-2559527049.jpg",
    description:
      "Mood-led fashion imagery with sharp composition, refined styling, and a visual language built for campaigns.",
    href: "#contact",
  },
  {
    title: "Event Coverage",
    image: "https://www.elitestudio.ng/wp-content/uploads/2021/01/event-photographer-lagos-nigeria-4.jpg",
    description:
      "Elegant documentary coverage for launches, private gatherings, celebrations, and cultural events.",
    href: "#contact",
  },
  {
    title: "Product Photography",
    image: "https://businessofphotography.net/wp-content/uploads/2020/11/Chanel5_product_photography.jpg",
    description:
      "Premium product stories shaped with light, texture, composition, and detail for brands that want to feel desirable.",
    href: "#contact",
  },
];

export default function ServicesSection({ services = DEFAULT_SERVICES }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealEls = section.querySelectorAll("[data-services-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="services-photographer section section--soft" id="services" ref={sectionRef}>
      <div className="services-photographer__ambient" aria-hidden="true" />

      <div className="container">
        <div className="services-photographer__header">
          <div>
            <span className="eyebrow" data-services-reveal>
              Services
            </span>

            <h2 className="services-photographer__title" data-services-reveal>
              Crafted for moments that deserve more than ordinary coverage.
            </h2>
          </div>

          <p className="services-photographer__intro" data-services-reveal>
            Each session is built around mood, intention, and story — from intimate portraits to
            full-day celebrations and editorial campaigns.
          </p>
        </div>

        <div className="services-photographer__grid">
          {services.map((service, index) => (
            <article
              className="service-card"
              key={service.title}
              data-services-reveal
              style={{ "--delay": `${index * 90}ms` }}
            >
              <a href={service.href} className="service-card__media" aria-label={`View ${service.title}`}>
                <img src={service.image} alt={service.title} className="service-card__img" />
                <span className="service-card__overlay" aria-hidden="true" />
                <span className="service-card__number">{String(index + 1).padStart(2, "0")}</span>
              </a>

              <div className="service-card__content">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>

                <a href={service.href} className="service-card__cta link-line">
                  Enquire now
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="services-photographer__footer" data-services-reveal>
          <p>
            Not sure which session fits your story? Let’s talk through the mood, the purpose, and
            the feeling you want the images to carry.
          </p>

          <a href="#contact" className="btn btn--outline services-photographer__button">
            Plan a session
          </a>
        </div>
      </div>
    </section>
  );
}
