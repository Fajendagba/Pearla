'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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

        <button
          className="hamburger"
          onClick={() => setIsOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span style={isOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
          <span style={isOpen ? { opacity: 0 } : {}} />
          <span style={isOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
        </button>
      </div>
    </nav>
  );
}
