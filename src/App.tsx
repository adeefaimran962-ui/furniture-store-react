import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Navbar   from './components/Navbar/page';
import Footer   from './components/Footer/page';

import About     from './pages/About/page';
import Services  from './pages/Services/page';
import Contact   from './pages/Contact/page';
import Login     from './pages/Login/page';
import Signup    from './pages/Signup/page';
import Dashboard from './pages/Dashboard/page';

/* ── Shared Tailwind class strings ─────────────────────── */
const btnBase =
  'inline-flex items-center justify-center gap-2 font-["Inter"] font-semibold uppercase tracking-[1.5px] border-2 rounded-[4px] cursor-pointer transition-all duration-300';
const btnDark =
  `${btnBase} bg-[#2C2C2C] text-white border-[#2C2C2C] hover:bg-[#B8860B] hover:border-[#B8860B] hover:-translate-y-0.5`;
const btnLg   = `${btnDark} px-10 py-4 text-[0.9rem]`;
const btnSm   = `${btnDark} px-[18px] py-2 text-[0.75rem]`;
const btnLink =
  `${btnBase} bg-transparent text-[#2C2C2C] border-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-white hover:-translate-y-0.5 px-10 py-4 text-[0.9rem]`;

/* ── Card component ─────────────────────────────────────── */
interface CardProps {
  img?: string;
  imgAlt?: string;
  title: string;
  desc: string;
  price?: string;
  btnLabel: string;
  onBtn: () => void;
}
function Card({ img, imgAlt, title, desc, price, btnLabel, onBtn }: CardProps) {
  return (
    <div className="flex flex-col bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg overflow-hidden flex-[1_1_260px] max-w-[320px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(184,134,11,0.15)] hover:border-[#B8860B] max-[768px]:flex-[1_1_100%] max-[768px]:max-w-full">
      {img && (
        <img src={img} alt={imgAlt} className="w-full h-[220px] object-cover" />
      )}
      <h3 className="px-5 pt-[18px]">{title}</h3>
      <p className="px-5 pb-1">{desc}</p>
      {price && <p className="px-5 text-[#B8860B]">{price}</p>}
      <button className={`${btnSm} mx-5 mb-5 mt-auto`} onClick={onBtn}>
        {btnLabel}
      </button>
    </div>
  );
}

/* ── HOME PAGE ─────────────────────────────────────────── */
function Home() {
  const navigate = useNavigate();
  return (
    <>
      {/* HERO */}
      <header className="bg-gradient-to-br from-[#FAF9F6] to-[#F4ECE1] text-center px-[5%] pt-[100px] pb-[80px] border-b border-[#EEEEEE] max-[768px]:px-5 max-[768px]:pt-[72px] max-[768px]:pb-14">
        <h4>Welcome to DECORA</h4>
        <h1>The Art of <span className="text-[#B8860B]">Living</span></h1>
        <p className="max-w-[520px] mx-auto mb-8 text-[1.05rem]">
          Premium furniture crafted for modern interiors. Timeless design, unmatched quality.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className={btnLg} onClick={() => navigate('/services')}>Shop Collection</button>
          <a className={btnLink} href="/about">Our Story</a>
        </div>
      </header>

      {/* STATS */}
      <div className="bg-[#2C2C2C] px-[5%] py-7">
        <div className="flex flex-wrap justify-center gap-12 max-w-[900px] mx-auto text-center max-[768px]:gap-7">
          {[
            { val: '500+', label: 'Products' },
            { val: '12K+', label: 'Happy Clients' },
            { val: '20+',  label: 'Years of Craft' },
            { val: '4.9 ★', label: 'Avg. Rating' },
          ].map(({ val, label }) => (
            <div key={label}>
              <h2 className="text-[#B8860B] m-0">{val}</h2>
              <p className="text-[#ccc] m-0 text-[0.85rem]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">
        <section className="text-center mb-3">
          <h4>Handpicked for You</h4>
          <h2>Featured Products</h2>
          <p>Discover our most-loved pieces, designed to elevate every room.</p>
        </section>

        <div className="flex flex-wrap justify-center gap-7 my-12 mx-[5%] max-[768px]:mx-0">
          <Card img="/images/sofa.jpg"          imgAlt="Modern Sofa"    title="Modern Sofa"    desc="Luxury comfort meets minimalist design." price="$1,200" btnLabel="View Details" onBtn={() => navigate('/services')} />
          <Card img="/images/table.jpg"         imgAlt="Dining Table"   title="Dining Table"   desc="Solid oak craftsmanship for family moments." price="$850" btnLabel="View Details" onBtn={() => navigate('/services')} />
          <Card img="/images/comfort chair.jpg" imgAlt="Comfort Chair"  title="Comfort Chair"  desc="Ergonomic design for lasting comfort." price="$420" btnLabel="View Details" onBtn={() => navigate('/services')} />
        </div>

        {/* WHY DECORA */}
        <section className="text-center mb-3">
          <h4>Why Choose Us</h4>
          <h2>The DECORA Difference</h2>
        </section>
        <div className="flex flex-wrap justify-center gap-7 my-12 mx-[5%] max-[768px]:mx-0">
          <Card title="🪵 Natural Materials"   desc="We source only premium, sustainably harvested woods and genuine leathers for lasting beauty." btnLabel="Learn More" onBtn={() => navigate('/about')} />
          <Card title="🎨 Bespoke Design"      desc="Every piece is tailored to your space. Custom sizes, fabrics, and finishes available." btnLabel="Learn More" onBtn={() => navigate('/about')} />
          <Card title="🚚 White-Glove Delivery" desc="Professional assembly and placement in your home, with full satisfaction guarantee." btnLabel="Learn More" onBtn={() => navigate('/about')} />
        </div>
      </main>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#8B6508] to-[#B8860B] px-[5%] py-[72px] text-center max-[768px]:px-5 max-[768px]:py-12">
        <h2 className="text-white mb-2.5">Ready to Transform Your Space?</h2>
        <p className="text-white/90 max-w-[500px] mx-auto mb-7">
          Browse our full collection and find the perfect pieces for your home.
        </p>
        <button
          className="bg-white text-[#B8860B] border-white border-2 px-10 py-4 text-[0.9rem] font-semibold uppercase tracking-[1.5px] rounded-[4px] cursor-pointer transition-all duration-300 hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C] font-['Inter'] inline-flex items-center"
          onClick={() => navigate('/services')}
        >
          Explore Collection
        </button>
      </section>
    </>
  );
}

/* ── APP (ROUTER) ───────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/about"     element={<About />} />
        <Route path="/services"  element={<Services />} />
        <Route path="/contact"   element={<Contact />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/signup"    element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
