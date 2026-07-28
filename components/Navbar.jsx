'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setIsOpen(false);

  const linkClass = (href) => {
    if (href === '/') return pathname === '/' ? 'active' : '';
    return pathname.startsWith(href) ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="navbar-logo" onClick={close}>
          Pearla<span>.</span>
        </Link>

        <ul className={`navbar-links${isOpen ? ' open' : ''}`}>
          <li><Link href="/" className={linkClass('/')} onClick={close}>Home</Link></li>
          <li><Link href="/recipes" className={linkClass('/recipes')} onClick={close}>Recipes</Link></li>
          <li><Link href="/about" className={linkClass('/about')} onClick={close}>About</Link></li>
        </ul>

        <div className="navbar-actions">
          <button
            type="button"
            className="search-trigger"
            onClick={() => setSearchOpen(true)}
            aria-label="Search recipes"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <span className="search-trigger-label">Search</span>
          </button>

          <button
            className="hamburger"
            onClick={() => setIsOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span style={isOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
            <span style={isOpen ? { opacity: 0 } : {}} />
            <span style={isOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
          </button>
        </div>
      </div>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </nav>
  );
}
