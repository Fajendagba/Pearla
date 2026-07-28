import Link from 'next/link';
import Image from 'next/image';
import Flag from '@/components/Flag';
import { getRecipeBySlug } from '@/data/recipes';

export const metadata = {
  title: 'About Pearla',
  description:
    'The story behind Pearla. Why we write out real West African recipes in full detail, and the kitchens that inspire us.',
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
              Pearla is here to celebrate West African cooking. We write our recipes down carefully,
              explain them clearly, and share them free with anyone who wants to cook.
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
            <h2>Old Recipes for Today&apos;s Kitchen</h2>
            <p>
              African food has always been at the center of family life. Everyone gathering around a
              pot of jollof rice at a party, sharing suya on a warm evening, or watching your mother
              pound yam like it costs her nothing. Those moments are part of who we are.
            </p>
            <p>
              But for a lot of people, especially those who grew up far from home, nobody ever taught
              them how to actually make these dishes. That is the gap we are trying to close. Every
              recipe here gives you the steps in order, the exact amounts, the parts that really
              matter, and the small tips that turn a good dish into one people remember.
            </p>
            <p>
              Maybe you are cooking for the very first time, or maybe you are trying to bring back a
              dish you ate as a child. Either way, we are here to help you get it right.
            </p>
            <div className="quote-block">
              <blockquote>
                "A people without the knowledge of their past history, origin and culture is like a
                tree without roots."
              </blockquote>
              <cite>Marcus Garvey</cite>
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
                  { label: 'Banga Soup', slug: 'banga-soup' },
                  { label: 'Ofada Rice', slug: 'ofada-rice' },
                ],
              },
              {
                flag: 'gh',
                name: 'Ghanaian Favourites',
                dishes: [
                  { label: 'Groundnut Soup', slug: 'groundnut-soup' },
                  { label: 'Waakye', slug: 'waakye' },
                  { label: 'Kelewele', slug: 'kelewele' },
                  { label: 'Kontomire Stew', slug: 'kontomire-stew' },
                  { label: 'Banku', slug: 'banku' },
                ],
              },
              {
                flag: 'sn',
                name: 'Senegalese & Francophone',
                dishes: [
                  { label: 'Thieboudienne', slug: 'thieboudienne' },
                  { label: 'Yassa Poulet', slug: 'yassa-poulet' },
                  { label: 'Mafé', slug: 'mafe' },
                  { label: 'Thiakry', slug: 'thiakry' },
                ],
              },
              {
                flag: 'world',
                name: 'Pan-West African',
                dishes: [
                  { label: 'Suya', slug: 'suya' },
                  { label: 'Jollof Rice', slug: 'jollof-rice' },
                  { label: 'Fufu', slug: 'fufu' },
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
            <p className="section-subtitle">Three things we keep in mind with every recipe we put up</p>
          </div>
          <div className="values-grid">
            {[
              { icon: '🌿', title: 'The Real Thing', desc: 'We keep recipes the way the people who perfected them actually made them. No shortcuts, no swapping things out quietly. Just the real thing.' },
              { icon: '🤝', title: 'Cooking Together', desc: 'Food does the most good when it brings people together. Every recipe here is meant to be cooked for other people. Your family, your friends, your neighbours.' },
              { icon: '📖', title: 'Passing It On', desc: 'Our food is our history, and it is still alive. By writing it all down properly we make sure it reaches people who have never even held a mortar and pestle.' },
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
          <h2 className="about-teaser-title">Ready to Cook Something Great?</h2>
          <p className="about-teaser-desc">
            Have a look through our West African recipes. Each one walks you through everything,
            from what to buy to what lands on the plate.
          </p>
          <Link href="/recipes" className="btn btn-white">Explore All Recipes</Link>
        </div>
      </section>
    </>
  );
}
