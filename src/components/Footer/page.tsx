import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-[#ccc] pt-14 px-[5%] pb-6 mt-[60px]">
      <div className="flex flex-wrap gap-10 justify-between max-w-[1200px] mx-auto mb-9 max-[768px]:flex-col max-[768px]:gap-7">

        {/* Brand */}
        <div className="flex-[1_1_200px] flex flex-col gap-[10px]">
          <h1 className="text-[1.8rem] text-white m-0 font-['Playfair_Display']">DECORA</h1>
          <p className="text-[0.85rem] text-[#888] m-0 leading-relaxed">
            Luxury furniture for modern living.<br />Crafted with passion since 2004.
          </p>
        </div>

        {/* Navigate */}
        <div className="flex-[1_1_200px] flex flex-col gap-[10px]">
          <h2 className="text-[0.85rem] font-bold text-white uppercase tracking-[1.5px] mb-2 font-['Inter']">Navigate</h2>
          {[
            { to: '/',         label: 'Home' },
            { to: '/about',    label: 'About' },
            { to: '/services', label: 'Collection' },
            { to: '/contact',  label: 'Contact' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="text-[#aaa] text-[0.875rem] transition-colors duration-300 hover:text-[#B8860B]">
              {label}
            </Link>
          ))}
        </div>

        {/* Account */}
        <div className="flex-[1_1_200px] flex flex-col gap-[10px]">
          <h2 className="text-[0.85rem] font-bold text-white uppercase tracking-[1.5px] mb-2 font-['Inter']">Account</h2>
          {[
            { to: '/login',     label: 'Login' },
            { to: '/signup',    label: 'Sign Up' },
            { to: '/dashboard', label: 'Dashboard' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="text-[#aaa] text-[0.875rem] transition-colors duration-300 hover:text-[#B8860B]">
              {label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="flex-[1_1_200px] flex flex-col gap-[10px]">
          <h2 className="text-[0.85rem] font-bold text-white uppercase tracking-[1.5px] mb-2 font-['Inter']">Contact</h2>
          <p className="text-[0.85rem] text-[#888] m-0 leading-relaxed">📍 45 Design District, Milano</p>
          <p className="text-[0.85rem] text-[#888] m-0 leading-relaxed">📞 +1 (555) 123-4567</p>
          <p className="text-[0.85rem] text-[#888] m-0 leading-relaxed">✉️ hello@decora.com</p>
        </div>
      </div>

      <p className="text-center border-t border-[#333] pt-5 m-0 text-[0.8rem] text-[#666]">
        © 2026 DECORA. All rights reserved.
      </p>
    </footer>
  );
}
