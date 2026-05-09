import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="page">
      <section>
        <h4>Customer Portal</h4>
        <h2>My Dashboard</h2>
        <p>Welcome back! Here's an overview of your DECORA account and recent orders.</p>
      </section>

      <div className="card-container" id="stat-cards">
        <div className="card">
          <h2>3</h2>
          <p>Active Orders</p>
        </div>
        <div className="card">
          <h2>$4,850</h2>
          <p>Total Spent</p>
        </div>
        <div className="card">
          <h2>7</h2>
          <p>Wishlist Items</p>
        </div>
        <div className="card">
          <h2>4.9 ★</h2>
          <p>Your Rating</p>
        </div>
      </div>

      <section>
        <h4>Order History</h4>
        <h2>Recent Orders</h2>
      </section>

      <div className="table-container">
        <table style={{ minWidth: '640px' }}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row-selected">
              <td>#DEC-1041</td>
              <td>Modern Sofa — Charcoal Grey</td>
              <td>2 May 2026</td>
              <td className="accent">$1,200</td>
              <td><span className="accent">Confirmed</span></td>
            </tr>
            <tr>
              <td>#DEC-1039</td>
              <td>Dining Table — Solid Oak</td>
              <td>28 Apr 2026</td>
              <td className="accent">$850</td>
              <td>Processing</td>
            </tr>
            <tr>
              <td>#DEC-1032</td>
              <td>Comfort Chair × 2</td>
              <td>19 Apr 2026</td>
              <td className="accent">$840</td>
              <td>Delivered</td>
            </tr>
            <tr>
              <td>#DEC-1025</td>
              <td>Coffee Table — Glass</td>
              <td>5 Apr 2026</td>
              <td className="accent">$300</td>
              <td>Delivered</td>
            </tr>
            <tr>
              <td>#DEC-1018</td>
              <td>King Bed Frame — Oak</td>
              <td>12 Mar 2026</td>
              <td className="accent">$2,200</td>
              <td>Delivered</td>
            </tr>
          </tbody>
        </table>
      </div>

      <section>
        <h2>Quick Actions</h2>
        <div>
          <button className="lg-button" onClick={() => navigate('/services')}>Browse Collection</button>
          <button className="border-button lg-button" onClick={() => navigate('/contact')}>Contact Support</button>
          <button className="border-button lg-button" onClick={() => navigate('/login')}>Log Out</button>
        </div>
      </section>
    </main>
  );
}
