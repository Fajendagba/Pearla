import Link from 'next/link';
import Image from 'next/image';
import RecipeCard from '@/components/RecipeCard';
import RecentlyViewed from '@/components/RecentlyViewed';
import { recipes, getFeaturedRecipes, getRecipeBySlug } from '@/data/recipes';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1665332195309-9d75071138f0?auto=format&fit=crop&w=1200&q=80';

export default function HomePage() {
  const featured = getFeaturedRecipes();
  const suya = getRecipeBySlug('suya');
  const dodo = getRecipeBySlug('dodo');
  const categoryTotal = new Set(recipes.map((r) => r.category)).size;

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
              <Link href="/recipes" className="btn btn-primary">
                Explore {recipes.length} Free Recipes
              </Link>
              <Link href="/about" className="btn btn-outline">Our Story</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo-wrap">
              <div className="hero-photo-main">
                <Image
                  src={HERO_IMAGE}
                  alt="A festive West African spread with jollof rice, grilled fish and suya skewers"
                  fill
                  sizes="(max-width: 900px) 90vw, 45vw"
                  priority
                />
              </div>
              {suya && (
                <Link href={`/recipes/${suya.slug}`} className="hero-chip hero-chip-1">
                  <Image src={suya.image} alt="" width={54} height={54} />
                  <span className="hero-chip-text">
                    <strong>{suya.title}</strong>
                    <span>{suya.totalTime} · {suya.difficulty}</span>
                  </span>
                </Link>
              )}
              {dodo && (
                <Link href={`/recipes/${dodo.slug}`} className="hero-chip hero-chip-2">
                  <Image src={dodo.image} alt="" width={54} height={54} />
                  <span className="hero-chip-text">
                    <strong>{dodo.title}</strong>
                    <span>{dodo.totalTime} · {dodo.difficulty}</span>
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        <div className="container">
          <div className="stat-item">
            <span className="stat-number">{recipes.length}</span>
            <span className="stat-label">Detailed Recipes</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{categoryTotal}</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">4</span>
            <span className="stat-label">West African Cuisines</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Free, Forever</span>
          </div>
        </div>
      </div>

      {/* RECENTLY VIEWED (only shows for returning visitors) */}
      <RecentlyViewed />

      {/* FEATURED RECIPES */}
      <section className="recipes-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Start With These</h2>
            <p className="section-subtitle">
              The three dishes our readers cook the most — each one a West African classic
            </p>
          </div>
          <div className="recipes-grid">
            {featured.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/recipes" className="btn btn-outline">
              See All {recipes.length} Recipes
            </Link>
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
