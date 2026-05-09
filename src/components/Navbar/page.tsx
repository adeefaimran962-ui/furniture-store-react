import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem('decora-theme') || 'light'
  );
  const navigate = useNavigate();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('decora-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const nav = document.querySelector('nav');
      if (nav && !nav.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <nav>
      <Link to="/">DECORA</Link>

      <button className="menu-toggle" onClick={() => setMenuOpen(o => !o)}>
        <span /><span /><span />
      </button>

      <ul className={menuOpen ? 'open' : ''}>
        <li><Link to="/"         onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/about"    onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link to="/services" onClick={() => setMenuOpen(false)}>Collection</Link></li>
        <li><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
        <li><Link to="/contact"  onClick={() => setMenuOpen(false)}>Contact</Link></li>
        <li><Link to="/login"    onClick={() => setMenuOpen(false)}>Login</Link></li>
        <li>
          <button onClick={() => { navigate('/signup'); setMenuOpen(false); }}>
            Join Now
          </button>
        </li>
        <li>
          <button id="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
