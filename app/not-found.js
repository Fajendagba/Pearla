import Link from 'next/link';

export const metadata = { title: 'Page Not Found' };

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="notfound-inner">
        <div className="notfound-emoji" aria-hidden="true">🍲</div>
        <h1 className="notfound-title">We Could Not Find That Page</h1>
        <p className="notfound-desc">
          Looks like this page went off to look for jollof rice. Let us take you back to
          something good.
        </p>
        <div className="notfound-actions">
          <Link href="/recipes" className="btn btn-primary">See the Recipes</Link>
          <Link href="/" className="btn btn-outline">Go Home</Link>
        </div>
      </div>
    </section>
  );
}
