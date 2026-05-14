import { useEffect, useRef, useState } from "react";
import "./reviews.css";

// ─── Testimonial data ─────────────────────────────────────────────────────────
// Replace avatar URLs with real client photos, or set avatar: null to use initials
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Élara doesn't just take photographs — she captures the feeling of a moment you didn't even know existed. Our wedding album brings us to tears every single time.",
    author: "Amara & Kofi Mensah",
    role: "Wedding · Lagos",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80&auto=format&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Working with her on our brand campaign was transformative. Every image tells a layered story — clients stopped us to ask who shot the visuals before they even asked about our product.",
    author: "Zara Obi",
    role: "Brand Director · Abuja",
    avatar: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=120&q=80&auto=format&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "I've worked with many photographers across three continents. None have matched her ability to find light where there seems to be none, and humanity in every frame.",
    author: "Marcus Delacroix",
    role: "Creative Director · Paris",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "She understood our family's energy before we even said a word. The portraits are the most honest, beautiful images we have ever seen of ourselves.",
    author: "Ngozi Adeyemi",
    role: "Portrait Session · Port Harcourt",
    avatar: null,
    initials: "NA",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "The editorial shoot exceeded every brief we set. Her vision went beyond the assignment and produced something genuinely iconic for our magazine.",
    author: "Isabelle Fontaine",
    role: "Editor-in-Chief · Vogue Africa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80&auto=format&fit=crop&crop=face",
    rating: 5,
  },
  {
    id: 6,
    quote:
      "Every frame from our product launch felt like it belonged in a gallery. Our campaign performed 3× above projections — the imagery was everything.",
    author: "David Eze",
    role: "Founder · Oluwa Studio",
    avatar: null,
    initials: "DE",
    rating: 5,
  },
];

// ─── Star rating ──────────────────────────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <div className="tm-card__stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="tm-card__star" aria-hidden="true">★</span>
      ))}
    </div>
  );
}

// ─── Avatar (image or initials fallback) ─────────────────────────────────────
function Avatar({ avatar, initials, author }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showInitials = !avatar || imgFailed;

  return (
    <div className="tm-card__avatar" aria-hidden="true">
      {showInitials ? (
        <span className="tm-card__initials">
          {initials || author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </span>
      ) : (
        <img
          src={avatar}
          alt=""
          draggable="false"
          onError={() => setImgFailed(true)}
        />
      )}
    </div>
  );
}

// ─── Single testimonial card ──────────────────────────────────────────────────
function TestimonialCard({ data, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger each card by its index
          setTimeout(() => setVisible(true), index * 110);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <article
      ref={cardRef}
      className={`tm-card ${visible ? "tm-card--visible" : ""}`}
      style={{ "--card-index": index }}
    >
      {/* Opening quote mark */}
      <div className="tm-card__mark" aria-hidden="true">"</div>

      {/* Stars */}
      <Stars count={data.rating} />

      {/* Quote body */}
      <blockquote className="tm-card__quote">
        <p>{data.quote}</p>
      </blockquote>

      {/* Divider */}
      <div className="tm-card__divider" aria-hidden="true" />

      {/* Author row */}
      <footer className="tm-card__author">
        <Avatar avatar={data.avatar} initials={data.initials} author={data.author} />
        <div className="tm-card__author-info">
          <cite className="tm-card__name">{data.author}</cite>
          <span className="tm-card__role">{data.role}</span>
        </div>
      </footer>
    </article>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref} className={`tm-header ${visible ? "tm-header--visible" : ""}`}>
      <div className="tm-header__eyebrow">
        <span className="tm-header__eyebrow-line" aria-hidden="true" />
        <span className="tm-header__eyebrow-text">Client Stories</span>
        <span className="tm-header__eyebrow-line" aria-hidden="true" />
      </div>
      <h2 className="tm-header__title">
        <span className="tm-header__title-row">
          <span className="tm-header__line-mask">
            <span className="tm-header__line-inner">Words that</span>
          </span>
        </span>
        <span className="tm-header__title-row tm-header__title-row--italic">
          <span className="tm-header__line-mask">
            <span className="tm-header__line-inner tm-header__line-inner--delay">stayed.</span>
          </span>
        </span>
      </h2>
      <p className="tm-header__sub">
        <span className="tm-header__sub-inner">
          Every session is a conversation. These are some of the ones that never left.
        </span>
      </p>
    </header>
  );
}

// ─── Marquee trust strip ──────────────────────────────────────────────────────
const TRUST_ITEMS = [
  "Wedding Photography",
  "Brand Campaigns",
  "Editorial",
  "Family Portraits",
  "Commercial",
  "Fine Art",
];

function TrustStrip() {
  const items = [...TRUST_ITEMS, ...TRUST_ITEMS]; // duplicate for seamless loop
  return (
    <div className="tm-strip" aria-hidden="true">
      <div className="tm-strip__track">
        {items.map((item, i) => (
          <span key={i} className="tm-strip__item">
            <span className="tm-strip__dot">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  return (
    <section className="testimonials" aria-label="Client Testimonials">

      {/* Top decorative strip */}
      <TrustStrip />

      <div className="testimonials__inner">
        <SectionHeader />

        {/* Card grid */}
        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} data={t} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="testimonials__cta">
          <p className="testimonials__cta-text">Ready to create something timeless?</p>
          <button className="testimonials__cta-btn">
            <span>Book Your Session</span>
            <span className="testimonials__cta-arrow" aria-hidden="true">↗</span>
          </button>
        </div>
      </div>

    </section>
  );
}