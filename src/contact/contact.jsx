import { useEffect, useRef, useState } from "react";
import "./contact.css";

const DEFAULT_CONTACT_LINKS = [
  {
    label: "WhatsApp",
    value: "+234 800 000 0000",
    href: "https://wa.me/2348000000000",
  },
  {
    label: "Instagram",
    value: "@miraade.studio",
    href: "https://instagram.com/",
  },
  {
    label: "Email",
    value: "hello@miraadestudio.com",
    href: "mailto:hello@miraadestudio.com",
  },
];

const SERVICE_OPTIONS = [
  "Wedding Photography",
  "Pre-Wedding Shoot",
  "Portrait Session",
  "Fashion Editorial",
  "Event Coverage",
  "Product Photography",
];

export default function ContactBookingSection({
  contactLinks = DEFAULT_CONTACT_LINKS,
  email = "hello@miraadestudio.com",
  whatsappUrl = "https://wa.me/2348000000000",
}) {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const revealEls = section.querySelectorAll("[data-contact-reveal]");

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Photography Inquiry from ${formData.name || "Website Visitor"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nPreferred Date: ${formData.date}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      className="contact-booking section section--soft"
      id="contact"
      ref={sectionRef}
    >
      <div className="contact-booking__glow" aria-hidden="true" />

      <div className="container contact-booking__layout">
        <div className="contact-booking__content">
          <span className="eyebrow" data-contact-reveal>
            Contact
          </span>

          <h2 className="contact-booking__title" data-contact-reveal>
            Let’s create images that feel like memory.
          </h2>

          <p className="contact-booking__copy" data-contact-reveal>
            Tell me about the story, the mood, the people, and the moment you want to preserve.
            I’ll respond with availability, direction, and the best next step.
          </p>

          <div className="contact-booking__actions" data-contact-reveal>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn--gold">
              Book a Shoot
            </a>

            <a href={`mailto:${email}`} className="btn btn--outline">
              Let’s Work Together
            </a>
          </div>

          <div className="contact-booking__links" data-contact-reveal>
            {contactLinks.map((link) => (
              <a href={link.href} key={link.label} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>
                <span>{link.label}</span>
                <strong>{link.value}</strong>
              </a>
            ))}
          </div>
        </div>

        <form className="contact-booking__form" onSubmit={handleSubmit} data-contact-reveal>
          <div className="contact-booking__form-header">
            <span>Inquiry Form</span>
            <p>Share a few details and I’ll get back to you.</p>
          </div>

          <div className="contact-booking__field-grid">
            <label className="contact-booking__field">
              <span>Your Name</span>
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="contact-booking__field">
              <span>Email Address</span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="contact-booking__field-grid">
            <label className="contact-booking__field">
              <span>Service</span>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>
                {SERVICE_OPTIONS.map((service) => (
                  <option value={service} key={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>

            <label className="contact-booking__field">
              <span>Preferred Date</span>
              <input
                type="text"
                name="date"
                placeholder="Month / date / flexible"
                value={formData.date}
                onChange={handleChange}
              />
            </label>
          </div>

          <label className="contact-booking__field contact-booking__field--full">
            <span>Tell me about the shoot</span>
            <textarea
              name="message"
              rows="6"
              placeholder="Share the story, location, mood, number of people, or anything important."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="btn btn--gold contact-booking__submit">
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
