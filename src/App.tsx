import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Navbar   from './components/Navbar/page';
import Footer   from './components/Footer/page';

import About     from './pages/About/page';
import Services  from './pages/Services/page';
import Contact   from './pages/Contact/page';
import Login     from './pages/Login/page';
import Signup    from './pages/Signup/page';
import Dashboard from './pages/Dashboard/page';

/* ── HOME PAGE ─────────────────────────────────────────── */
function Home() {
  const navigate = useNavigate();
  return (
    <>
      {/* HERO */}
      <header>
        <h4>Welcome to DECORA</h4>
        <h1>The Art of <span className="accent">Living</span></h1>
        <p>Premium furniture crafted for modern interiors. Timeless design, unmatched quality.</p>
        <div>
          <button className="lg-button" onClick={() => navigate('/services')}>Shop Collection</button>
          <a className="link-button lg-button" href="/about">Our Story</a>
        </div>
      </header>

      {/* STATS */}
      <div className="stats-bar">
        <div>
          <div><h2>500+</h2><p>Products</p></div>
          <div><h2>12K+</h2><p>Happy Clients</p></div>
          <div><h2>20+</h2><p>Years of Craft</p></div>
          <div><h2>4.9 ★</h2><p>Avg. Rating</p></div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <main className="page">
        <section>
          <h4>Handpicked for You</h4>
          <h2>Featured Products</h2>
          <p>Discover our most-loved pieces, designed to elevate every room.</p>
        </section>

        <div className="card-container">
          <div className="card">
            <img src="/images/sofa.jpg" alt="Modern Sofa" />
            <h3>Modern Sofa</h3>
            <p>Luxury comfort meets minimalist design.</p>
            <p className="accent">$1,200</p>
            <button className="sm-button" onClick={() => navigate('/services')}>View Details</button>
          </div>
          <div className="card">
            <img src="/images/table.jpg" alt="Dining Table" />
            <h3>Dining Table</h3>
            <p>Solid oak craftsmanship for family moments.</p>
            <p className="accent">$850</p>
            <button className="sm-button" onClick={() => navigate('/services')}>View Details</button>
          </div>
          <div className="card">
            <img src="/images/comfort chair.jpg" alt="Comfort Chair" />
            <h3>Comfort Chair</h3>
            <p>Ergonomic design for lasting comfort.</p>
            <p className="accent">$420</p>
            <button className="sm-button" onClick={() => navigate('/services')}>View Details</button>
          </div>
        </div>

        {/* WHY DECORA */}
        <section>
          <h4>Why Choose Us</h4>
          <h2>The DECORA Difference</h2>
        </section>
        <div className="card-container">
          <div className="card">
            <h3>🪵 Natural Materials</h3>
            <p>We source only premium, sustainably harvested woods and genuine leathers for lasting beauty.</p>
          </div>
          <div className="card">
            <h3>🎨 Bespoke Design</h3>
            <p>Every piece is tailored to your space. Custom sizes, fabrics, and finishes available.</p>
          </div>
          <div className="card">
            <h3>🚚 White-Glove Delivery</h3>
            <p>Professional assembly and placement in your home, with full satisfaction guarantee.</p>
          </div>
        </div>
      </main>

      {/* CTA */}
      <section>
        <h2>Ready to Transform Your Space?</h2>
        <p>Browse our full collection and find the perfect pieces for your home.</p>
        <button className="lg-button" onClick={() => navigate('/services')}>Explore Collection</button>
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
