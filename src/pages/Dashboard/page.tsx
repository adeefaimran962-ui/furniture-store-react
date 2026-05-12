import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import './dashboard.css';

Chart.register(...registerables);

/* ── Types ─────────────────────────────────────────────── */
type ModalId = 'view-modal' | 'insert-modal' | 'update-modal' | 'delete-modal' | null;

interface StockItem {
  sku: string;
  name: string;
  category: string;
  qty: number;
  price: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

/* ── Initial stock data ─────────────────────────────────── */
const INITIAL_STOCK: StockItem[] = [
  { sku: 'DEC-001', name: 'Modern Sofa — Charcoal Grey',    category: 'Sofa',    qty: 12, price: '$1,200', status: 'In Stock'     },
  { sku: 'DEC-002', name: 'Dining Table — Solid Oak',       category: 'Table',   qty: 7,  price: '$850',   status: 'In Stock'     },
  { sku: 'DEC-003', name: 'Comfort Chair — Beige',          category: 'Chair',   qty: 3,  price: '$420',   status: 'Low Stock'    },
  { sku: 'DEC-004', name: 'King Bed Frame — Walnut',        category: 'Bed',     qty: 0,  price: '$2,200', status: 'Out of Stock' },
  { sku: 'DEC-005', name: 'Coffee Table — Tempered Glass',  category: 'Table',   qty: 15, price: '$300',   status: 'In Stock'     },
  { sku: 'DEC-006', name: 'Bookshelf — Pine Wood',          category: 'Storage', qty: 2,  price: '$380',   status: 'Low Stock'    },
  { sku: 'DEC-007', name: 'L-Shape Sofa — Cream',           category: 'Sofa',    qty: 5,  price: '$1,850', status: 'In Stock'     },
  { sku: 'DEC-008', name: 'Bar Stool — Metal Frame',        category: 'Chair',   qty: 0,  price: '$180',   status: 'Out of Stock' },
];

/* ── Badge helper ───────────────────────────────────────── */
function StatusBadge({ status }: { status: StockItem['status'] }) {
  const cls =
    status === 'In Stock'     ? 'badge badge-green'  :
    status === 'Low Stock'    ? 'badge badge-yellow' :
                                'badge badge-red';
  return <span className={cls}>{status}</span>;
}

/* ── Dashboard Component ────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();

  /* modal state */
  const [activeModal, setActiveModal] = useState<ModalId>(null);

  /* table filter state */
  const [searchQuery, setSearchQuery]       = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter]     = useState('');

  /* chart refs */
  const barChartRef      = useRef<HTMLCanvasElement>(null);
  const doughnutChartRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const barChartInstance      = useRef<Chart<any> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doughnutChartInstance = useRef<Chart<any> | null>(null);

  /* modal helpers */
  const openModal  = (id: ModalId) => setActiveModal(id);
  const closeModal = ()            => setActiveModal(null);

  /* close modal on overlay click */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>, id: ModalId) => {
    if ((e.target as HTMLElement).classList.contains('modal-overlay') && activeModal === id) {
      closeModal();
    }
  };

  /* filtered rows */
  const filteredStock = INITIAL_STOCK.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.sku.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    const matchCategory = !categoryFilter || item.category === categoryFilter;
    const matchStatus   = !statusFilter   || item.status   === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  /* ── Charts ── */
  useEffect(() => {
    /* Bar chart */
    if (barChartRef.current) {
      if (barChartInstance.current) barChartInstance.current.destroy();
      barChartInstance.current = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Sofa', 'Table', 'Chair', 'Bed', 'Storage'],
          datasets: [{
            label: 'Products in Stock',
            data: [17, 22, 8, 5, 6],
            backgroundColor: ['#d4af37', '#c9a227', '#e0c15a', '#b68d1e', '#f0d878'],
            borderRadius: 8,
            borderSkipped: false,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: '#999' },
              grid:  { color: 'rgba(255,255,255,0.08)' },
            },
            x: {
              ticks: { color: '#999' },
              grid:  { display: false },
            },
          },
        },
      });
    }

    /* Doughnut chart */
    if (doughnutChartRef.current) {
      if (doughnutChartInstance.current) doughnutChartInstance.current.destroy();
      doughnutChartInstance.current = new Chart(doughnutChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['In Stock', 'Low Stock', 'Out of Stock'],
          datasets: [{
            data: [35, 8, 5],
            backgroundColor: ['#22c55e', '#facc15', '#ef4444'],
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#999', padding: 20 },
            },
          },
        },
      });
    }

    return () => {
      barChartInstance.current?.destroy();
      doughnutChartInstance.current?.destroy();
    };
  }, []);

  /* ── Form handlers ── */
  const handleInsertStock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Product saved to inventory!');
    (e.target as HTMLFormElement).reset();
    closeModal();
  };

  const handleUpdateStock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Stock record updated!');
    (e.target as HTMLFormElement).reset();
    closeModal();
  };

  const handleDeleteStock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmInput = (e.currentTarget.querySelector('#del-confirm') as HTMLInputElement).value;
    if (confirmInput !== 'DELETE') {
      alert('Please type DELETE to confirm.');
      return;
    }
    alert('Product removed from inventory.');
    (e.target as HTMLFormElement).reset();
    closeModal();
  };

  /* ── Render ── */
  return (
    <>
      {/* ── HEADER ── */}
      <div className="dash-header">
        <h4>Admin Portal</h4>
        <h1>Stock <span className="accent">Management</span></h1>
        <p>Monitor inventory levels, manage products, and track stock performance in real time.</p>
        <div className="dash-header-actions">
          <button className="lg-button" onClick={() => openModal('insert-modal')}>&#43; Add New Stock</button>
          <button className="link-button lg-button" onClick={() => navigate('/services')}>View Collection</button>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="dash-stats-bar">
        <div>
          <div><h2>48</h2><p>Total Products</p></div>
          <div><h2>35</h2><p>In Stock</p></div>
          <div><h2>8</h2><p>Low Stock</p></div>
          <div><h2>5</h2><p>Out of Stock</p></div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="page">

        {/* Inventory Control intro */}
        <section>
          <h4>Inventory Control</h4>
          <h2>Stock Actions</h2>
          <p>Use the cards below to manage your furniture inventory database.</p>
        </section>

        {/* ── ACTION CARDS ── */}
        <div className="dash-grid">
          <div className="dash-action-card" onClick={() => openModal('view-modal')}>
            <div className="dash-icon">&#128202;</div>
            <h3>View All Stock</h3>
            <p>Browse the complete inventory list with filters and search.</p>
            <button className="sm-button">Open Inventory</button>
          </div>

          <div className="dash-action-card" onClick={() => openModal('insert-modal')}>
            <div className="dash-icon">&#43;&#9711;</div>
            <h3>Insert New Stock</h3>
            <p>Add a new furniture product to the inventory database.</p>
            <button className="sm-button">Add Product</button>
          </div>

          <div className="dash-action-card" onClick={() => openModal('update-modal')}>
            <div className="dash-icon">&#9998;</div>
            <h3>Update Stock</h3>
            <p>Edit product details, price, quantity, or category.</p>
            <button className="sm-button border-button">Edit Record</button>
          </div>

          <div className="dash-action-card" onClick={() => openModal('delete-modal')}>
            <div className="dash-icon">&#128465;</div>
            <h3>Delete Stock</h3>
            <p>Remove a product from the inventory permanently.</p>
            <button className="sm-button border-button btn-danger">Delete Record</button>
          </div>
        </div>

        {/* ── CHARTS ── */}
        <div className="chart-section">
          <h4>Analytics</h4>
          <h2>Stock Overview</h2>
          <p>Visual breakdown of inventory levels and category distribution.</p>
          <div className="chart-row">
            <div className="chart-col">
              <h3>Stock by Category</h3>
              <div className="chart-box">
                <canvas ref={barChartRef}></canvas>
              </div>
            </div>
            <div className="chart-col">
              <h3>Stock Status Distribution</h3>
              <div className="chart-box">
                <canvas ref={doughnutChartRef}></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* ── INVENTORY TABLE HEADER ── */}
        <div className="section-header">
          <div>
            <h4>Database Records</h4>
            <h2>Current Inventory</h2>
          </div>
          <button className="sm-button" onClick={() => openModal('insert-modal')}>&#43; Add Product</button>
        </div>

        {/* ── SEARCH / FILTER BAR ── */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, SKU or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Sofa">Sofa</option>
            <option value="Table">Table</option>
            <option value="Chair">Chair</option>
            <option value="Bed">Bed</option>
            <option value="Storage">Storage</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* ── STOCK TABLE ── */}
        <div className="table-container">
          <table className="table-stock">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.length === 0 ? (
                <tr>
                  <td colSpan={7} className="table-empty">No products match your search.</td>
                </tr>
              ) : (
                filteredStock.map((item) => (
                  <tr key={item.sku}>
                    <td>{item.sku}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.qty}</td>
                    <td className="accent">{item.price}</td>
                    <td><StatusBadge status={item.status} /></td>
                    <td>
                      <button className="tiny-button" onClick={() => openModal('update-modal')}>Edit</button>
                      {' '}
                      <button className="tiny-button border-button btn-danger" onClick={() => openModal('delete-modal')}>Del</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── TWO-COLUMN: ACTIVITY + QUICK LINKS ── */}
        <div className="two-col">

          {/* Recent Activity */}
          <div>
            <h4>Live Feed</h4>
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-dot green"></div>
                <p>New stock added: <strong>L-Shape Sofa — Cream</strong> (x5)</p>
                <span>2 min ago</span>
              </div>
              <div className="activity-item">
                <div className="activity-dot gold"></div>
                <p>Price updated: <strong>Dining Table — Solid Oak</strong> to $850</p>
                <span>18 min ago</span>
              </div>
              <div className="activity-item">
                <div className="activity-dot red"></div>
                <p>Stock deleted: <strong>Vintage Armchair — Brown</strong></p>
                <span>1 hr ago</span>
              </div>
              <div className="activity-item">
                <div className="activity-dot blue"></div>
                <p>Low stock alert: <strong>Comfort Chair — Beige</strong> (3 left)</p>
                <span>3 hr ago</span>
              </div>
              <div className="activity-item">
                <div className="activity-dot green"></div>
                <p>Restock completed: <strong>Coffee Table — Glass</strong> (x15)</p>
                <span>Yesterday</span>
              </div>
            </div>
          </div>

          {/* Quick Links + Alerts */}
          <div>
            <h4>Shortcuts</h4>
            <h2>Quick Links</h2>
            <div className="quick-links">
              <button className="sm-button" onClick={() => openModal('insert-modal')}>&#43; Add Product</button>
              <button className="sm-button border-button" onClick={() => openModal('view-modal')}>&#128202; View All</button>
              <button className="sm-button border-button" onClick={() => openModal('update-modal')}>&#9998; Edit Stock</button>
              <button className="sm-button border-button" onClick={() => navigate('/services')}>&#128722; Collection</button>
              <button className="sm-button border-button" onClick={() => navigate('/contact')}>&#128222; Support</button>
              <button className="sm-button border-button" onClick={() => navigate('/')}>&#127968; Home</button>
              <button className="sm-button border-button" onClick={() => navigate('/about')}>&#8505; About</button>
              <button className="sm-button border-button" onClick={() => navigate('/login')}>&#128274; Log Out</button>
            </div>

            <div className="alert-card alert-card-warning">
              <h3>&#9888; Low Stock Alert</h3>
              <p>2 products are running low. Restock soon to avoid shortages.</p>
              <button
                className="sm-button border-button"
                onClick={() => { setStatusFilter('Low Stock'); setSearchQuery(''); setCategoryFilter(''); }}
              >
                View Low Stock
              </button>
            </div>

            <div className="alert-card alert-card-danger">
              <h3>&#128683; Out of Stock</h3>
              <p>2 products are currently unavailable. Update inventory immediately.</p>
              <button
                className="sm-button border-button btn-danger"
                onClick={() => { setStatusFilter('Out of Stock'); setSearchQuery(''); setCategoryFilter(''); }}
              >
                View Out of Stock
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* ── CTA SECTION ── */}
      <div className="dash-cta">
        <h2>Ready to Grow Your Inventory?</h2>
        <p>Add new products, update prices, and keep your stock database up to date.</p>
        <button className="lg-button" onClick={() => openModal('insert-modal')}>&#43; Insert New Stock</button>
      </div>

      {/* ════════════════════════════════════════════════════
          MODALS
      ════════════════════════════════════════════════════ */}

      {/* VIEW MODAL */}
      <div
        className={`modal-overlay${activeModal === 'view-modal' ? ' open' : ''}`}
        id="view-modal"
        onClick={(e) => handleOverlayClick(e, 'view-modal')}
      >
        <div className="modal">
          <button className="modal-close" onClick={closeModal}>&#10005;</button>
          <h2>&#128202; All Stock</h2>
          <p>Full inventory list. Use the search and filters on the main page for advanced filtering.</p>
          <div className="table-container">
            <table className="table-stock-sm">
              <thead>
                <tr><th>SKU</th><th>Product</th><th>Qty</th><th>Status</th></tr>
              </thead>
              <tbody>
                {INITIAL_STOCK.map((item) => (
                  <tr key={item.sku}>
                    <td>{item.sku}</td>
                    <td>{item.name.split(' — ')[0]}</td>
                    <td>{item.qty}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="modal-actions">
            <button className="sm-button" onClick={() => { closeModal(); openModal('insert-modal'); }}>&#43; Add Product</button>
            <button className="sm-button border-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>

      {/* INSERT MODAL */}
      <div
        className={`modal-overlay${activeModal === 'insert-modal' ? ' open' : ''}`}
        id="insert-modal"
        onClick={(e) => handleOverlayClick(e, 'insert-modal')}
      >
        <div className="modal">
          <button className="modal-close" onClick={closeModal}>&#10005;</button>
          <h2>&#43; Insert New Stock</h2>
          <p>Fill in the details below to add a new product to the inventory.</p>
          <form onSubmit={handleInsertStock}>
            <div>
              <label htmlFor="ins-sku">SKU / Product Code</label>
              <input type="text" id="ins-sku" placeholder="e.g. DEC-009" required />
            </div>
            <div>
              <label htmlFor="ins-name">Product Name</label>
              <input type="text" id="ins-name" placeholder="e.g. Velvet Armchair — Navy" required />
            </div>
            <div>
              <label htmlFor="ins-category">Category</label>
              <div className="select-container">
                <select id="ins-category" required defaultValue="">
                  <option value="" disabled>Select category...</option>
                  <option>Sofa</option>
                  <option>Table</option>
                  <option>Chair</option>
                  <option>Bed</option>
                  <option>Storage</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="ins-qty">Quantity</label>
              <input type="number" id="ins-qty" placeholder="e.g. 10" min="0" required />
            </div>
            <div>
              <label htmlFor="ins-price">Price (USD)</label>
              <input type="number" id="ins-price" placeholder="e.g. 599" min="0" step="0.01" required />
            </div>
            <div>
              <label htmlFor="ins-desc">Description (optional)</label>
              <textarea id="ins-desc" placeholder="Brief product description..."></textarea>
            </div>
            <button type="submit">Save to Inventory</button>
          </form>
        </div>
      </div>

      {/* UPDATE MODAL */}
      <div
        className={`modal-overlay${activeModal === 'update-modal' ? ' open' : ''}`}
        id="update-modal"
        onClick={(e) => handleOverlayClick(e, 'update-modal')}
      >
        <div className="modal">
          <button className="modal-close" onClick={closeModal}>&#10005;</button>
          <h2>&#9998; Update Stock</h2>
          <p>Search for a product by SKU or name, then update its details.</p>
          <form onSubmit={handleUpdateStock}>
            <div>
              <label htmlFor="upd-sku">SKU / Product Code</label>
              <input type="text" id="upd-sku" placeholder="e.g. DEC-003" required />
            </div>
            <div>
              <label htmlFor="upd-name">Product Name</label>
              <input type="text" id="upd-name" placeholder="Updated name..." />
            </div>
            <div>
              <label htmlFor="upd-category">Category</label>
              <div className="select-container">
                <select id="upd-category" defaultValue="">
                  <option value="">No change</option>
                  <option>Sofa</option>
                  <option>Table</option>
                  <option>Chair</option>
                  <option>Bed</option>
                  <option>Storage</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="upd-qty">New Quantity</label>
              <input type="number" id="upd-qty" placeholder="Updated quantity..." min="0" />
            </div>
            <div>
              <label htmlFor="upd-price">New Price (USD)</label>
              <input type="number" id="upd-price" placeholder="Updated price..." min="0" step="0.01" />
            </div>
            <div className="form-actions">
              <button type="submit">Save Changes</button>
              <button type="button" className="border-button" onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>

      {/* DELETE MODAL */}
      <div
        className={`modal-overlay${activeModal === 'delete-modal' ? ' open' : ''}`}
        id="delete-modal"
        onClick={(e) => handleOverlayClick(e, 'delete-modal')}
      >
        <div className="modal">
          <button className="modal-close" onClick={closeModal}>&#10005;</button>
          <h2>&#128465; Delete Stock</h2>
          <p>Enter the SKU of the product to permanently remove. This action cannot be undone.</p>
          <form onSubmit={handleDeleteStock}>
            <div>
              <label htmlFor="del-sku">SKU / Product Code</label>
              <input type="text" id="del-sku" placeholder="e.g. DEC-004" required />
            </div>
            <div>
              <label htmlFor="del-confirm">Type DELETE to confirm</label>
              <input type="text" id="del-confirm" placeholder="DELETE" required />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-danger-solid">Confirm Delete</button>
              <button type="button" className="border-button" onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
