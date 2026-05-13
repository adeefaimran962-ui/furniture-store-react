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

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const nav = document.querySelector('nav');
      if (nav && !nav.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const linkCls =
    'font-["Inter"] text-[0.8rem] font-semibold tracking-[1px] uppercase text-[var(--text-primary)] px-[10px] py-[6px] rounded block transition-colors duration-300 hover:text-[#B8860B]';

  return (
    <nav className="flex items-center justify-between px-[5%] h-[70px] bg-[var(--bg-main)] border-b border-[var(--border-muted)] sticky top-0 z-[1000] shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:px-[5%] relative">

      {/* Brand */}
      <Link
        to="/"
        className="font-['Playfair_Display'] text-[1.5rem] font-bold text-[var(--text-primary)] tracking-[2px] shrink-0 hover:text-[var(--text-primary)] max-[480px]:text-[1.2rem]"
      >
        DECORA
      </Link>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] cursor-pointer bg-transparent border-none p-[6px]"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-[2px] bg-[var(--text-primary)] rounded-sm transition-all duration-300" />
        <span className="block w-6 h-[2px] bg-[var(--text-primary)] rounded-sm transition-all duration-300" />
        <span className="block w-6 h-[2px] bg-[var(--text-primary)] rounded-sm transition-all duration-300" />
      </button>

      {/* Nav links */}
      <ul
        className={[
          'list-none m-0 p-0 items-center gap-1',
          /* desktop */
          'md:flex',
          /* mobile */
          menuOpen
            ? 'flex flex-col items-start gap-0 absolute top-[70px] left-0 right-0 bg-[var(--bg-main)] py-3 border-t-2 border-[#B8860B] shadow-[0_8px_20px_rgba(0,0,0,0.1)] z-[998]'
            : 'hidden md:flex',
        ].join(' ')}
      >
        {[
          { to: '/',          label: 'Home' },
          { to: '/about',     label: 'About' },
          { to: '/services',  label: 'Collection' },
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/contact',   label: 'Contact' },
          { to: '/login',     label: 'Login' },
        ].map(({ to, label }) => (
          <li key={to} className="relative md:static w-full md:w-auto">
            <Link to={to} className={linkCls} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          </li>
        ))}

        {/* Join Now */}
        <li className="w-full md:w-auto">
          <button
            className="bg-[#B8860B] border-[#B8860B] text-white px-5 py-2 text-[0.75rem] font-semibold uppercase tracking-[1.5px] border-2 rounded-[4px] cursor-pointer transition-all duration-300 hover:bg-[#8B6508] hover:border-[#8B6508] font-['Inter'] inline-flex items-center justify-center ml-2 md:ml-0"
            onClick={() => { navigate('/signup'); setMenuOpen(false); }}
          >
            Join Now
          </button>
        </li>

        {/* Theme toggle */}
        <li className="w-full md:w-auto">
          <button
            id="theme-toggle"
            className="bg-transparent border border-[#ccc] text-[var(--text-primary)] px-[10px] py-[6px] text-base cursor-pointer transition-all duration-300 hover:bg-black/5 hover:border-[#999] hover:translate-y-0 rounded-[4px] font-['Inter'] inline-flex items-center justify-center ml-1 md:ml-0"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
