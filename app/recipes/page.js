import FilterTabs from '@/components/FilterTabs';
import { recipes } from '@/data/recipes';

export const metadata = { title: 'All Recipes' };

export default function RecipesPage() {
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
          <FilterTabs recipes={recipes} />
        </div>
      </section>
    </>
  );
}
