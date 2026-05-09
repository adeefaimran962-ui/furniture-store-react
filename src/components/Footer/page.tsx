import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <h1>DECORA</h1>
          <p>Luxury furniture for modern living.<br />Crafted with passion since 2004.</p>
        </div>
        <div>
          <h2>Navigate</h2>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Collection</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h2>Account</h2>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          <h2>Contact</h2>
          <p>📍 45 Design District, Milano</p>
          <p>📞 +1 (555) 123-4567</p>
          <p>✉️ hello@decora.com</p>
        </div>
      </div>
      <p>© 2026 DECORA. All rights reserved.</p>
    </footer>
  );
}
