import FilterTabs from '@/components/FilterTabs';
import { recipes } from '@/data/recipes';

export const metadata = {
  title: 'All Recipes',
  description:
    'Browse every authentic West African recipe on Pearla — rice dishes, soups and stews, grills, snacks, sides and swallows.',
};

export default async function RecipesPage({ searchParams }) {
  const { category } = await searchParams;

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-header-title">All Recipes</h1>
          <p className="page-header-desc">
            Explore our collection of authentic West African dishes — filter by category and
            find your next favourite meal.
          </p>
        </div>
      </header>

      <section className="recipes-page-body">
        <div className="container">
          <FilterTabs recipes={recipes} initialCategory={category} syncUrl />
        </div>
      </section>
    </>
  );
}
