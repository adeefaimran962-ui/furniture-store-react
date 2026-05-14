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
<nav className="flex items-center justify-between px-[5%] h-[70px] sticky top-0 z-[1000] bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
  {/* Brand */}
  <Link
    to="/"
    className="font-['Playfair_Display'] text-[1.5rem] font-bold text-[var(--text-primary)] tracking-[2px] shrink-0 max-[480px]:text-[1.2rem]"
  >
    DECORA
  </Link>

  {/* Hamburger */}
  <button
    className="md:hidden flex flex-col justify-center gap-[5px] bg-transparent border-none cursor-pointer z-[1001]"
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label="Toggle menu"
  >
    <span
      className={`block w-6 h-[2px] bg-[var(--text-primary)] transition-all duration-300 ${
        menuOpen ? "rotate-45 translate-y-[7px]" : ""
      }`}
    />
    <span
      className={`block w-6 h-[2px] bg-[var(--text-primary)] transition-all duration-300 ${
        menuOpen ? "opacity-0" : ""
      }`}
    />
    <span
      className={`block w-6 h-[2px] bg-[var(--text-primary)] transition-all duration-300 ${
        menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
      }`}
    />
  </button>

  {/* Nav Links */}
  <ul
    className={`${
      menuOpen ? "flex" : "hidden"
    } md:flex flex-col md:flex-row absolute md:static top-[70px] left-0 w-full md:w-auto bg-[var(--bg-main)] md:bg-transparent shadow-md md:shadow-none border-t md:border-0 border-gray-200 items-start md:items-center gap-1 md:gap-2 py-4 md:py-0 px-[5%] md:px-0 z-[999]`}
  >
    {[
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/services", label: "Collection" },
      { to: "/dashboard", label: "Dashboard" },
      { to: "/contact", label: "Contact" },
      { to: "/login", label: "Login" },
    ].map(({ to, label }) => (
      <li key={to} className="w-full md:w-auto">
        <Link
          to={to}
          className={`${linkCls} block w-full md:w-auto`}
          onClick={() => setMenuOpen(false)}
        >
          {label}
        </Link>
      </li>
    ))}

    {/* Join Button */}
    <li className="w-full md:w-auto mt-2 md:mt-0">
      <button
        className="bg-[#B8860B] border-2 border-[#B8860B] text-white px-5 py-2 text-[0.75rem] font-semibold uppercase tracking-[1.5px] rounded-[4px] transition-all duration-300 hover:bg-[#8B6508] hover:border-[#8B6508] w-full md:w-auto"
        onClick={() => {
          navigate("/signup");
          setMenuOpen(false);
        }}
      >
        Join Now
      </button>
    </li>

    {/* Theme Toggle */}
    <li className="w-full md:w-auto mt-2 md:mt-0">
      <button
        id="theme-toggle"
        className="border border-gray-300 text-[var(--text-primary)] px-[10px] py-[6px] rounded-[4px] transition-all duration-300 hover:bg-black/5 w-full md:w-auto"
        onClick={toggleTheme}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </li>
  </ul>
</nav>
  );
}
