import Link from 'next/link';

const CATEGORY_LINKS = [
  { key: 'rice', label: 'Rice Dishes' },
  { key: 'soups', label: 'Soups & Stews' },
  { key: 'grill', label: 'Grills & BBQ' },
  { key: 'snacks', label: 'Snacks' },
  { key: 'sides', label: 'Sides' },
  { key: 'swallows', label: 'Swallows' },
];

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Pearla.</div>
            <p className="footer-desc">
              Your guide to authentic West African cooking — from everyday meals to
              celebration feasts, made with love.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/recipes">All Recipes</Link></li>
              <li><Link href="/about">About Pearla</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              {CATEGORY_LINKS.map((c) => (
                <li key={c.key}>
                  <Link href={`/recipes?category=${c.key}`}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Pearla. Made with ❤️ for African food lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
