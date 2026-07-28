import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { recipes, getRecipeBySlug, getRelatedRecipes } from '@/data/recipes';
import RecipeCard from '@/components/RecipeCard';
import RecipeInteractive from '@/components/RecipeInteractive';
import ShareBar from '@/components/ShareBar';

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: 'Recipe Not Found' };
  return {
    title: recipe.title,
    description: recipe.shortDesc,
    openGraph: {
      title: `${recipe.title} · Pearla`,
      description: recipe.shortDesc,
      images: [recipe.image],
    },
  };
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const related = getRelatedRecipes(recipe.related);

  return (
    <>
      {/* RECIPE HERO */}
      <section className="recipe-hero">
        <div className="container">
          <div className="recipe-hero-inner">
            <div>
              <nav className="recipe-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link> ›{' '}
                <Link href="/recipes">Recipes</Link> ›{' '}
                {recipe.title}
              </nav>
              <h1 className="recipe-detail-title">{recipe.title}</h1>
              <p className="recipe-detail-desc">{recipe.fullDesc}</p>
              <div className="recipe-detail-meta">
                <div className="meta-badge">
                  <span className="meta-badge-icon" aria-hidden="true">⏱</span>
                  <span className="meta-badge-value">{recipe.prepTime}</span>
                  <span className="meta-badge-label">Prep Time</span>
                </div>
                <div className="meta-badge">
                  <span className="meta-badge-icon" aria-hidden="true">🔥</span>
                  <span className="meta-badge-value">{recipe.cookTime}</span>
                  <span className="meta-badge-label">Cook Time</span>
                </div>
                <div className="meta-badge">
                  <span className="meta-badge-icon" aria-hidden="true">🍽️</span>
                  <span className="meta-badge-value">{recipe.totalTime}</span>
                  <span className="meta-badge-label">Ready In</span>
                </div>
                <div className="meta-badge">
                  <span className="meta-badge-icon" aria-hidden="true">📊</span>
                  <span className="meta-badge-value">{recipe.difficulty}</span>
                  <span className="meta-badge-label">Difficulty</span>
                </div>
              </div>
              <ShareBar title={recipe.title} />
            </div>
            <div>
              <div className="recipe-hero-photo">
                <Image
                  src={recipe.image}
                  alt={recipe.imageAlt ?? recipe.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECIPE BODY: ingredients checklist, serving scaler, cook-mode steps */}
      <section className="recipe-body">
        <div className="container">
          <RecipeInteractive recipe={recipe} />
        </div>
      </section>

      {/* RELATED RECIPES */}
      {related.length > 0 && (
        <section className="related-recipes">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Goes Great With</h2>
              <p className="section-subtitle">Complete your plate</p>
            </div>
            <div className="recipes-grid">
              {related.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
