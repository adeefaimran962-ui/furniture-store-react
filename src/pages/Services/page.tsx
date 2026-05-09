import { useNavigate } from 'react-router-dom';

export default function Services() {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <h4>Our Products</h4>
        <h1>The Full <span className="accent">Collection</span></h1>
        <p>Every piece is crafted to perfection — from statement sofas to elegant dining sets.</p>
      </header>

      <main className="page">
        <section>
          <h4>Handpicked for You</h4>
          <h2>Featured Pieces</h2>
          <p>Timeless designs for every room in your home.</p>
        </section>

        <div className="card-container">
          <div className="card">
            <img src="/images/sofa.jpg" alt="Modern Sofa" />
            <h3>Modern Sofa</h3>
            <p>Luxury comfort meets minimalist design. Available in 6 fabric options.</p>
            <p className="accent">$1,200</p>
            <button className="sm-button" onClick={() => navigate('/contact')}>Enquire Now</button>
          </div>
          <div className="card">
            <img src="/images/table.jpg" alt="Dining Table" />
            <h3>Dining Table</h3>
            <p>Solid oak craftsmanship for family moments. Seats up to 8.</p>
            <p className="accent">$850</p>
            <button className="sm-button" onClick={() => navigate('/contact')}>Enquire Now</button>
          </div>
          <div className="card">
            <img src="/images/comfort chair.jpg" alt="Comfort Chair" />
            <h3>Comfort Chair</h3>
            <p>Ergonomic design for lasting comfort. Perfect for reading nooks.</p>
            <p className="accent">$420</p>
            <button className="sm-button" onClick={() => navigate('/contact')}>Enquire Now</button>
          </div>
        </div>

        <section>
          <h4>Full Price List</h4>
          <h2>Product Catalogue</h2>
          <p>All prices are inclusive of standard delivery. White-glove service available.</p>
        </section>

        <div className="table-container">
          <table style={{ minWidth: '620px' }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Material</th>
                <th>Dimensions</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Modern Sofa</td><td>Living Room</td><td>Premium Fabric</td><td>220 × 90 cm</td><td className="accent">$1,200</td></tr>
              <tr><td>Dining Table</td><td>Dining Room</td><td>Solid Oak</td><td>180 × 90 cm</td><td className="accent">$850</td></tr>
              <tr><td>Comfort Chair</td><td>Living Room</td><td>Leather</td><td>80 × 85 cm</td><td className="accent">$420</td></tr>
              <tr><td>Executive Chair</td><td>Office</td><td>Leather</td><td>65 × 120 cm</td><td className="accent">$400</td></tr>
              <tr><td>King Bed Frame</td><td>Bedroom</td><td>Oak Wood</td><td>200 × 180 cm</td><td className="accent">$2,200</td></tr>
              <tr><td>Coffee Table</td><td>Living Room</td><td>Tempered Glass</td><td>120 × 60 cm</td><td className="accent">$300</td></tr>
              <tr><td>Bookshelf Unit</td><td>Study</td><td>Walnut Wood</td><td>90 × 200 cm</td><td className="accent">$550</td></tr>
              <tr><td>Wardrobe</td><td>Bedroom</td><td>MDF + Oak</td><td>200 × 220 cm</td><td className="accent">$1,800</td></tr>
            </tbody>
          </table>
        </div>

        <section>
          <h2>Need Custom Sizing?</h2>
          <p>We offer bespoke furniture tailored to your exact space and style requirements.</p>
          <button className="lg-button" onClick={() => navigate('/contact')}>Request Custom Quote</button>
        </section>
      </main>
    </>
  );
}
