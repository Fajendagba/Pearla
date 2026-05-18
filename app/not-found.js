import Link from 'next/link';

export const metadata = { title: 'Page Not Found' };

export default function NotFound() {
  return (
    <section className="hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '24px' }}>🍲</div>
        <h1 className="hero-title" style={{ fontSize: '2.5rem' }}>
          Page Not Found
        </h1>
        <p className="hero-desc" style={{ margin: '16px auto 32px' }}>
          Looks like this page wandered off to find some jollof rice. Let&apos;s get you back to
          something delicious.
        </p>
        <Link href="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </section>
  );
}
