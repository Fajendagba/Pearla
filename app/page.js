import Link from 'next/link';
import FilterTabs from '@/components/FilterTabs';
import { recipes } from '@/data/recipes';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-tag">🌍 West African Kitchen</span>
            <h1 className="hero-title">
              Discover the <em>Flavors</em>
              <br />
              of West Africa
            </h1>
            <p className="hero-desc">
              Authentic recipes passed down through generations. From the smoky streets of
              Lagos to the vibrant markets of Accra — every dish tells a story.
            </p>
            <div className="hero-actions">
              <Link href="/recipes" className="btn btn-primary">Explore Recipes</Link>
              <Link href="/about" className="btn btn-outline">Our Story</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-plate-ring" />
            <div className="hero-plate">🍲</div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        <div className="container">
          <div className="stat-item">
            <span className="stat-number">24+</span>
            <span className="stat-label">Recipes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">6</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4</span>
            <span className="stat-label">West African Cuisines</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Authentic</span>
          </div>
        </div>
      </div>

      {/* FEATURED RECIPES */}
      <section className="recipes-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Recipes</h2>
            <p className="section-subtitle">Hand-picked classics from West African kitchens</p>
          </div>
          <FilterTabs recipes={recipes} />
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/recipes" className="btn btn-outline">View All Recipes</Link>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="about-teaser">
        <div className="container">
          <h2 className="about-teaser-title">Where Every Recipe Holds a Memory</h2>
          <p className="about-teaser-desc">
            Pearla was born from a deep love of African food and the belief that our traditional
            recipes deserve to be shared with the world — with full detail, authenticity, and care.
          </p>
          <Link href="/about" className="btn btn-white">Discover Our Story</Link>
        </div>
      </section>
    </>
  );
}
