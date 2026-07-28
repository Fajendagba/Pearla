import Link from 'next/link';
import Image from 'next/image';
import Flag from '@/components/Flag';
import { getRecipeBySlug } from '@/data/recipes';

export const metadata = {
  title: 'About Pearla',
  description:
    'The story behind Pearla — why we document authentic West African recipes with full detail, and the regions whose kitchens inspire us.',
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          <div>
            <span className="hero-tag">Our Story</span>
            <h1 className="hero-title" style={{ fontSize: '2.8rem' }}>
              The Heart Behind
              <br />
              <em>Every Dish</em>
            </h1>
            <p className="hero-desc">
              Pearla is a celebration of West African cooking — a place where traditional recipes
              are lovingly documented, clearly explained, and freely shared with anyone who wants
              to cook with meaning.
            </p>
            <Link href="/recipes" className="btn btn-primary">Browse Recipes</Link>
          </div>
          <div className="about-visual" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="about-collage">
              {[
                { slug: 'jollof-rice', className: 'about-collage-item tall' },
                { slug: 'suya', className: 'about-collage-item' },
                { slug: 'egusi-soup', className: 'about-collage-item' },
              ].map(({ slug, className }) => {
                const r = getRecipeBySlug(slug);
                if (!r) return null;
                return (
                  <Link key={slug} href={`/recipes/${slug}`} className={className} title={r.title}>
                    <Image
                      src={r.image}
                      alt={r.imageAlt ?? r.title}
                      fill
                      sizes="(max-width: 900px) 45vw, 220px"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="container">
          <div className="about-story-text">
            <h2>Where Tradition Meets the Modern Kitchen</h2>
            <p>
              African food has always been at the center of family life — gathered around a pot of
              jollof rice at a celebration, sharing suya skewers on a warm evening, or watching your
              mother pound yam with effortless rhythm. These moments are stitched into the fabric of
              who we are.
            </p>
            <p>
              Yet for many people, especially those growing up away from home, the detailed know-how
              behind these dishes can feel out of reach. Pearla exists to close that gap. Every recipe
              here is written with care: step-by-step instructions, exact quantities, the techniques
              that actually matter, and the little tips that take a dish from good to unforgettable.
            </p>
            <p>
              Whether you are cooking for the first time or rediscovering a dish from your childhood,
              Pearla is your kitchen companion.
            </p>
            <div className="quote-block">
              <blockquote>
                "A people without the knowledge of their past history, origin and culture is like a
                tree without roots."
              </blockquote>
              <cite>— Marcus Garvey</cite>
            </div>
          </div>

          <ul className="region-list">
            {[
              {
                flag: 'ng',
                name: 'Nigerian Classics',
                dishes: [
                  { label: 'Jollof Rice', slug: 'jollof-rice' },
                  { label: 'Egusi Soup', slug: 'egusi-soup' },
                  { label: 'Pounded Yam', slug: 'pounded-yam' },
                  { label: 'Akara', slug: 'akara' },
                  { label: 'Banga Soup' },
                  { label: 'Ofada Rice' },
                ],
              },
              {
                flag: 'gh',
                name: 'Ghanaian Favourites',
                dishes: [
                  { label: 'Groundnut Soup' },
                  { label: 'Waakye' },
                  { label: 'Kelewele' },
                  { label: 'Kontomire Stew' },
                  { label: 'Banku' },
                ],
              },
              {
                flag: 'sn',
                name: 'Senegalese & Francophone',
                dishes: [
                  { label: 'Thieboudienne' },
                  { label: 'Yassa Poulet' },
                  { label: 'Mafé' },
                  { label: 'Thiakry' },
                ],
              },
              {
                flag: 'world',
                name: 'Pan-West African',
                dishes: [
                  { label: 'Suya', slug: 'suya' },
                  { label: 'Jollof variants', slug: 'jollof-rice' },
                  { label: 'Fufu' },
                  { label: 'Fried Plantain (Dodo)', slug: 'dodo' },
                ],
              },
            ].map((r) => (
              <li key={r.name} className="region-item">
                <span className="region-icon"><Flag code={r.flag} /></span>
                <div>
                  <div className="region-name">{r.name}</div>
                  <div className="region-dishes">
                    {r.dishes.map((d, i) => (
                      <span key={d.label}>
                        {d.slug ? (
                          <Link href={`/recipes/${d.slug}`} className="region-dish-link">{d.label}</Link>
                        ) : (
                          d.label
                        )}
                        {i < r.dishes.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <h2 className="section-title">What Pearla Stands For</h2>
            <p className="section-subtitle">Three principles that guide every recipe we publish</p>
          </div>
          <div className="values-grid">
            {[
              { icon: '🌿', title: 'Authenticity', desc: 'We honour original recipes as they were made by the people who perfected them. No unnecessary shortcuts, no hidden substitutions — just the real thing.' },
              { icon: '🤝', title: 'Community', desc: 'Food is most powerful when it brings people together. Every recipe on Pearla is designed to be cooked for others — family, friends, neighbours, strangers.' },
              { icon: '📖', title: 'Heritage', desc: 'Our culinary traditions are living history. By documenting and sharing them with precision, we ensure they are passed down to generations that have never held a mortar and pestle.' },
            ].map((v) => (
              <div key={v.title} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-teaser">
        <div className="container">
          <h2 className="about-teaser-title">Ready to Cook Something Extraordinary?</h2>
          <p className="about-teaser-desc">
            Dive into our collection of West African recipes — each one written to guide you from
            pantry to plate with confidence.
          </p>
          <Link href="/recipes" className="btn btn-white">Explore All Recipes</Link>
        </div>
      </section>
    </>
  );
}
