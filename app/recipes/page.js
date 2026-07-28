import FilterTabs from '@/components/FilterTabs';
import { recipes } from '@/data/recipes';

export const metadata = {
  title: 'All Recipes',
  description:
    'Browse every West African recipe on Pearla. Rice dishes, soups and stews, grills, snacks, sides and swallows.',
};

export default async function RecipesPage({ searchParams }) {
  const { category } = await searchParams;

  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1 className="page-header-title">All Recipes</h1>
          <p className="page-header-desc">
            Here is everything we have so far. Pick a category below to narrow it down and find
            your next meal.
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
