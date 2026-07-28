import Link from 'next/link';

export const metadata = { title: 'Page Not Found' };

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="notfound-inner">
        <div className="notfound-emoji" aria-hidden="true">🍲</div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-desc">
          Looks like this page wandered off to find some jollof rice. Let&apos;s get you back to
          something delicious.
        </p>
        <div className="notfound-actions">
          <Link href="/recipes" className="btn btn-primary">Browse Recipes</Link>
          <Link href="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
