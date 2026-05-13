
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

/* ── Types ── */
type ModalId = 'view-modal' | 'insert-modal' | 'update-modal' | 'delete-modal' | null;

interface StockItem {
  sku: string;
  name: string;
  category: string;
  qty: number;
  price: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

const INITIAL_STOCK: StockItem[] = [
  { sku: 'DEC-001', name: 'Modern Sofa — Charcoal Grey',   category: 'Sofa',    qty: 12, price: '$1,200', status: 'In Stock'     },
  { sku: 'DEC-002', name: 'Dining Table — Solid Oak',      category: 'Table',   qty: 7,  price: '$850',   status: 'In Stock'     },
  { sku: 'DEC-003', name: 'Comfort Chair — Beige',         category: 'Chair',   qty: 3,  price: '$420',   status: 'Low Stock'    },
  { sku: 'DEC-004', name: 'King Bed Frame — Walnut',       category: 'Bed',     qty: 0,  price: '$2,200', status: 'Out of Stock' },
  { sku: 'DEC-005', name: 'Coffee Table — Tempered Glass', category: 'Table',   qty: 15, price: '$300',   status: 'In Stock'     },
  { sku: 'DEC-006', name: 'Bookshelf — Pine Wood',         category: 'Storage', qty: 2,  price: '$380',   status: 'Low Stock'    },
  { sku: 'DEC-007', name: 'L-Shape Sofa — Cream',          category: 'Sofa',    qty: 5,  price: '$1,850', status: 'In Stock'     },
  { sku: 'DEC-008', name: 'Bar Stool — Metal Frame',       category: 'Chair',   qty: 0,  price: '$180',   status: 'Out of Stock' },
];

/* ── Shared class strings ── */
const btnBase = 'inline-flex items-center justify-center gap-2 font-["Inter"] font-semibold uppercase tracking-[1.5px] border-2 rounded-[4px] cursor-pointer transition-all duration-300';
const btnDark = `${btnBase} bg-[#2C2C2C] text-white border-[#2C2C2C] hover:bg-[#B8860B] hover:border-[#B8860B] hover:-translate-y-0.5`;
const btnLg   = `${btnDark} px-10 py-4 text-[0.9rem]`;
const btnSm   = `${btnDark} px-[18px] py-2 text-[0.75rem]`;
const btnTiny = `${btnDark} px-3 py-[5px] text-[0.7rem]`;
const btnBorder = `${btnBase} bg-transparent text-[#B8860B] border-[#B8860B] hover:bg-[#B8860B] hover:text-white px-[18px] py-2 text-[0.75rem]`;

const btnDanger = `${btnBase} bg-transparent text-[#dc3545] border-[#dc3545] hover:bg-[#dc3545] hover:text-white px-[18px] py-2 text-[0.75rem]`;
const btnDangerTiny = `${btnBase} bg-transparent text-[#dc3545] border-[#dc3545] hover:bg-[#dc3545] hover:text-white px-3 py-[5px] text-[0.7rem]`;
const btnDangerSolid = `${btnBase} bg-[#dc3545] text-white border-[#dc3545] hover:bg-[#b02a37] hover:border-[#b02a37] px-[18px] py-2 text-[0.75rem]`;
const btnLinkOutline = `${btnBase} bg-transparent text-[#2C2C2C] border-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-white px-10 py-4 text-[0.9rem]`;

const inputCls = 'w-full px-[14px] py-[11px] font-["Inter"] text-[0.9rem] bg-[var(--bg-main)] text-[var(--text-primary)] border border-[#EEEEEE] rounded-[4px] transition-all duration-300 focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.15)] box-border';
const labelCls = 'block text-[0.8rem] font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-[0.5px] font-["Inter"]';
const selectCls = 'w-full px-[14px] py-[11px] font-["Inter"] text-[0.9rem] bg-[var(--bg-main)] text-[var(--text-primary)] border border-[#EEEEEE] rounded-[4px] appearance-none cursor-pointer transition-all duration-300 focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.15)]';

/* ── Status Badge ── */
function StatusBadge({ status }: { status: StockItem['status'] }) {
  const cls =
    status === 'In Stock'
      ? 'bg-green-100 text-green-800'
      : status === 'Low Stock'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800';
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[0.72rem] font-bold uppercase tracking-wide ${cls}`}>
      {status}
    </span>
  );
}

/* ── Modal wrapper ── */
function Modal({ id, active, onOverlay, children }: {
  id: ModalId; active: ModalId; onOverlay: (e: React.MouseEvent<HTMLDivElement>, id: ModalId) => void; children: React.ReactNode;
}) {
  return (
    <div
      className={`fixed inset-0 z-[2000] items-center justify-center bg-black/55 ${active === id ? 'flex' : 'hidden'}`}
      onClick={(e) => onOverlay(e, id)}
    >
      <div className="relative w-full max-w-[500px] bg-[var(--bg-main)] rounded-lg p-9 shadow-[0_24px_60px_rgba(0,0,0,0.2)] max-h-[90vh] overflow-y-auto mx-4">
        {children}
      </div>
    </div>
  );
}

/* ── Dashboard ── */
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalId>(null);
  const [searchQuery, setSearchQuery]       = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter]     = useState('');

  const barChartRef      = useRef<HTMLCanvasElement>(null);
  const doughnutChartRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const barChartInstance      = useRef<Chart<any> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doughnutChartInstance = useRef<Chart<any> | null>(null);

  const openModal  = (id: ModalId) => setActiveModal(id);
  const closeModal = ()            => setActiveModal(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>, id: ModalId) => {
    if ((e.target as HTMLElement).classList.contains('fixed') && activeModal === id) closeModal();
  };

  const filteredStock = INITIAL_STOCK.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
    return matchSearch && (!categoryFilter || item.category === categoryFilter) && (!statusFilter || item.status === statusFilter);
  });

  useEffect(() => {
    if (barChartRef.current) {
      if (barChartInstance.current) barChartInstance.current.destroy();
      barChartInstance.current = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Sofa', 'Table', 'Chair', 'Bed', 'Storage'],
          datasets: [{ label: 'Products in Stock', data: [17, 22, 8, 5, 6], backgroundColor: ['#d4af37','#c9a227','#e0c15a','#b68d1e','#f0d878'], borderRadius: 8, borderSkipped: false }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { color: '#999' }, grid: { color: 'rgba(255,255,255,0.08)' } }, x: { ticks: { color: '#999' }, grid: { display: false } } } },
      });
    }
    if (doughnutChartRef.current) {
      if (doughnutChartInstance.current) doughnutChartInstance.current.destroy();
      doughnutChartInstance.current = new Chart(doughnutChartRef.current, {
        type: 'doughnut',
        data: { labels: ['In Stock','Low Stock','Out of Stock'], datasets: [{ data: [35,8,5], backgroundColor: ['#22c55e','#facc15','#ef4444'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#999', padding: 20 } } } },
      });
    }
    return () => { barChartInstance.current?.destroy(); doughnutChartInstance.current?.destroy(); };
  }, []);

  const handleInsertStock = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); alert('Product saved to inventory!'); (e.target as HTMLFormElement).reset(); closeModal(); };
  const handleUpdateStock = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); alert('Stock record updated!'); (e.target as HTMLFormElement).reset(); closeModal(); };
  const handleDeleteStock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const val = (e.currentTarget.querySelector('#del-confirm') as HTMLInputElement).value;
    if (val !== 'DELETE') { alert('Please type DELETE to confirm.'); return; }
    alert('Product removed from inventory.'); (e.target as HTMLFormElement).reset(); closeModal();
  };

  return (
    <>
      {/* HEADER */}
      <div className="text-center px-[5%] pt-[100px] pb-[80px] border-b border-[#EEEEEE] bg-gradient-to-br from-[#FAF9F6] to-[#F4ECE1] max-[768px]:px-5 max-[768px]:pt-[72px] max-[768px]:pb-14">
        <h4>Admin Portal</h4>
        <h1>Stock <span className="text-[#B8860B]">Management</span></h1>
        <p className="max-w-[520px] mx-auto mb-8 text-[1.05rem]">
          Monitor inventory levels, manage products, and track stock performance in real time.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className={btnLg} onClick={() => openModal('insert-modal')}>&#43; Add New Stock</button>
          <button className={btnLinkOutline} onClick={() => navigate('/services')}>View Collection</button>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="bg-[#2C2C2C] px-[5%] py-7">
        <div className="flex flex-wrap justify-center gap-12 max-w-[900px] mx-auto text-center max-[768px]:gap-7">
          {[{ val: '48', label: 'Total Products' }, { val: '35', label: 'In Stock' }, { val: '8', label: 'Low Stock' }, { val: '5', label: 'Out of Stock' }].map(({ val, label }) => (
            <div key={label}>
              <h2 className="text-[#B8860B] m-0">{val}</h2>
              <p className="text-[#ccc] m-0 text-[0.85rem]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">

        <section className="mb-6">
          <h4>Inventory Control</h4>
          <h2>Stock Actions</h2>
          <p>Use the cards below to manage your furniture inventory database.</p>
        </section>

        {/* ACTION CARDS */}
        <div className="grid gap-6 my-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {[
            { icon: '📊', title: 'View All Stock',   desc: 'Browse the complete inventory list with filters and search.', btn: 'Open Inventory', modal: 'view-modal' as ModalId,   danger: false, outline: false },
            { icon: '➕⊙', title: 'Insert New Stock', desc: 'Add a new furniture product to the inventory database.',     btn: 'Add Product',    modal: 'insert-modal' as ModalId, danger: false, outline: false },
            { icon: '✎',   title: 'Update Stock',    desc: 'Edit product details, price, quantity, or category.',        btn: 'Edit Record',    modal: 'update-modal' as ModalId, danger: false, outline: true  },
            { icon: '🗑',   title: 'Delete Stock',    desc: 'Remove a product from the inventory permanently.',           btn: 'Delete Record',  modal: 'delete-modal' as ModalId, danger: true,  outline: true  },
          ].map(({ icon, title, desc, btn, modal, danger, outline }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-3 p-7 rounded-lg cursor-pointer bg-[#FAFAFA] border border-[#EEEEEE] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(184,134,11,0.15)] hover:border-[#B8860B]"
              onClick={() => openModal(modal)}
            >
              <div className="text-[2.6rem] leading-none">{icon}</div>
              <h3 className="m-0 text-[1.05rem]">{title}</h3>
              <p className="m-0 text-[0.85rem] text-[#999]">{desc}</p>
              <button className={`mt-1 w-full ${danger ? btnDanger : outline ? btnBorder : btnSm}`}>
                {btn}
              </button>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg p-8 my-8">
          <h4>Analytics</h4>
          <h2>Stock Overview</h2>
          <p className="mb-6">Visual breakdown of inventory levels and category distribution.</p>
          <div className="grid gap-6 max-[900px]:grid-cols-1" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <h3 className="mb-4">Stock by Category</h3>
              <div className="chart-box relative w-full p-5 rounded-xl bg-[#111]" style={{ height: '280px' }}>
                <canvas ref={barChartRef} />
              </div>
            </div>
            <div>
              <h3 className="mb-4">Stock Status Distribution</h3>
              <div className="chart-box relative w-full p-5 rounded-xl bg-[#111]" style={{ height: '280px' }}>
                <canvas ref={doughnutChartRef} />
              </div>
            </div>
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
          <div>
            <h4>Database Records</h4>
            <h2>Current Inventory</h2>
          </div>
          <button className={btnSm} onClick={() => openModal('insert-modal')}>&#43; Add Product</button>
        </div>

        {/* SEARCH BAR */}
        <div className="flex gap-3 mb-5 flex-wrap">
          <input
            type="text"
            placeholder="Search by name, SKU or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${inputCls} flex-1 min-w-[200px]`}
          />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={selectCls} style={{ flex: '0 0 160px', width: 'auto' }}>
            <option value="">All Categories</option>
            {['Sofa','Table','Chair','Bed','Storage'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectCls} style={{ flex: '0 0 160px', width: 'auto' }}>
            <option value="">All Status</option>
            {['In Stock','Low Stock','Out of Stock'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* STOCK TABLE */}
        <div className="w-full overflow-x-auto mt-5 rounded-lg">
          <table className="w-full border-collapse rounded-lg overflow-hidden bg-[#FAFAFA] text-[0.9rem]" style={{ minWidth: '780px' }}>
            <thead className="bg-[#2C2C2C]">
              <tr>
                {['SKU','Product Name','Category','Qty','Price','Status','Actions'].map(h => (
                  <th key={h} className="px-[18px] py-[14px] text-left font-['Inter'] font-semibold text-[0.78rem] text-white uppercase tracking-[1px] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStock.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-[#999] italic">No products match your search.</td>
                </tr>
              ) : filteredStock.map((item) => (
                <tr key={item.sku}>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] border-b border-[#EEEEEE] align-middle">{item.sku}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] border-b border-[#EEEEEE] align-middle break-words max-w-[280px]">{item.name}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] border-b border-[#EEEEEE] align-middle">{item.category}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] border-b border-[#EEEEEE] align-middle">{item.qty}</td>
                  <td className="px-[18px] py-[13px] border-b border-[#EEEEEE] align-middle text-[#B8860B]">{item.price}</td>
                  <td className="px-[18px] py-[13px] border-b border-[#EEEEEE] align-middle"><StatusBadge status={item.status} /></td>
                  <td className="px-[18px] py-[13px] border-b border-[#EEEEEE] align-middle">
                    <button className={btnTiny} onClick={() => openModal('update-modal')}>Edit</button>
                    {' '}
                    <button className={btnDangerTiny} onClick={() => openModal('delete-modal')}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TWO-COL: ACTIVITY + QUICK LINKS */}
        <div className="grid gap-6 my-8 max-[900px]:grid-cols-1" style={{ gridTemplateColumns: '1fr 1fr' }}>

          {/* Recent Activity */}
          <div>
            <h4>Live Feed</h4>
            <h2>Recent Activity</h2>
            <div className="flex flex-col gap-3 mt-4">
              {[
                { dot: 'bg-[#28a745]', text: <>New stock added: <strong>L-Shape Sofa — Cream</strong> (x5)</>,                    time: '2 min ago'  },
                { dot: 'bg-[#B8860B]', text: <>Price updated: <strong>Dining Table — Solid Oak</strong> to $850</>,               time: '18 min ago' },
                { dot: 'bg-[#dc3545]', text: <>Stock deleted: <strong>Vintage Armchair — Brown</strong></>,                       time: '1 hr ago'   },
                { dot: 'bg-[#17a2b8]', text: <>Low stock alert: <strong>Comfort Chair — Beige</strong> (3 left)</>,               time: '3 hr ago'   },
                { dot: 'bg-[#28a745]', text: <>Restock completed: <strong>Coffee Table — Glass</strong> (x15)</>,                 time: 'Yesterday'  },
              ].map(({ dot, text, time }, i) => (
                <div key={i} className="flex items-center gap-3.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg px-[18px] py-[14px]">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${dot}`} />
                  <p className="m-0 text-[0.88rem] flex-1">{text}</p>
                  <span className="ml-auto text-[0.78rem] text-[#999] whitespace-nowrap">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links + Alerts */}
          <div>
            <h4>Shortcuts</h4>
            <h2>Quick Links</h2>
            <div className="flex flex-wrap gap-3 my-6">
              <button className={btnSm}       onClick={() => openModal('insert-modal')}>&#43; Add Product</button>
              <button className={btnBorder}   onClick={() => openModal('view-modal')}>📊 View All</button>
              <button className={btnBorder}   onClick={() => openModal('update-modal')}>✎ Edit Stock</button>
              <button className={btnBorder}   onClick={() => navigate('/services')}>🛒 Collection</button>
              <button className={btnBorder}   onClick={() => navigate('/contact')}>📞 Support</button>
              <button className={btnBorder}   onClick={() => navigate('/')}>🏠 Home</button>
              <button className={btnBorder}   onClick={() => navigate('/about')}>ℹ About</button>
              <button className={btnBorder}   onClick={() => navigate('/login')}>🔒 Log Out</button>
            </div>

            <div className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg p-6 mt-4 border-l-4 border-l-[#B8860B]">
              <h3 className="mb-2">⚠ Low Stock Alert</h3>
              <p className="mb-3">2 products are running low. Restock soon to avoid shortages.</p>
              <button className={btnBorder} onClick={() => { setStatusFilter('Low Stock'); setSearchQuery(''); setCategoryFilter(''); }}>
                View Low Stock
              </button>
            </div>

            <div className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg p-6 mt-4 border-l-4 border-l-[#dc3545]">
              <h3 className="mb-2">🚫 Out of Stock</h3>
              <p className="mb-3">2 products are currently unavailable. Update inventory immediately.</p>
              <button className={btnDanger} onClick={() => { setStatusFilter('Out of Stock'); setSearchQuery(''); setCategoryFilter(''); }}>
                View Out of Stock
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* CTA */}
      <div className="px-[5%] py-[72px] text-center bg-gradient-to-r from-[#8B6508] to-[#B8860B] max-[768px]:px-5 max-[768px]:py-12">
        <h2 className="text-white mb-2.5">Ready to Grow Your Inventory?</h2>
        <p className="text-white/90 max-w-[500px] mx-auto mb-7">
          Add new products, update prices, and keep your stock database up to date.
        </p>
        <button
          className="bg-white text-[#B8860B] border-2 border-white px-10 py-4 text-[0.9rem] font-['Inter'] font-semibold uppercase tracking-[1.5px] rounded-[4px] cursor-pointer transition-all duration-300 hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C] inline-flex items-center"
          onClick={() => openModal('insert-modal')}
        >
          &#43; Insert New Stock
        </button>
      </div>

      {/* ── MODALS ── */}

      {/* VIEW MODAL */}
      <Modal id="view-modal" active={activeModal} onOverlay={handleOverlayClick}>
        <button className="absolute top-4 right-4 bg-transparent border-none text-[1.4rem] cursor-pointer text-[#999] px-2 py-1 leading-none hover:text-[var(--text-primary)]" onClick={closeModal}>&#10005;</button>
        <h2 className="mb-1">📊 All Stock</h2>
        <p className="mb-5">Full inventory list. Use the search and filters on the main page for advanced filtering.</p>
        <div className="w-full overflow-x-auto mt-5 rounded-lg">
          <table className="w-full border-collapse rounded-lg overflow-hidden bg-[#FAFAFA] text-[0.9rem]" style={{ minWidth: '400px' }}>
            <thead className="bg-[#2C2C2C]">
              <tr>
                {['SKU','Product','Qty','Status'].map(h => (
                  <th key={h} className="px-[18px] py-[14px] text-left font-['Inter'] font-semibold text-[0.78rem] text-white uppercase tracking-[1px] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INITIAL_STOCK.map((item) => (
                <tr key={item.sku}>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] border-b border-[#EEEEEE] align-middle">{item.sku}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] border-b border-[#EEEEEE] align-middle">{item.name.split(' — ')[0]}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] border-b border-[#EEEEEE] align-middle">{item.qty}</td>
                  <td className="px-[18px] py-[13px] border-b border-[#EEEEEE] align-middle"><StatusBadge status={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-3 flex-wrap mt-5">
          <button className={btnSm} onClick={() => { closeModal(); openModal('insert-modal'); }}>&#43; Add Product</button>
          <button className={btnBorder} onClick={closeModal}>Close</button>
        </div>
      </Modal>

      {/* INSERT MODAL */}
      <Modal id="insert-modal" active={activeModal} onOverlay={handleOverlayClick}>
        <button className="absolute top-4 right-4 bg-transparent border-none text-[1.4rem] cursor-pointer text-[#999] px-2 py-1 leading-none hover:text-[var(--text-primary)]" onClick={closeModal}>&#10005;</button>
        <h2 className="mb-1">&#43; Insert New Stock</h2>
        <p className="mb-5">Fill in the details below to add a new product to the inventory.</p>
        <form onSubmit={handleInsertStock} className="flex flex-col gap-4">
          <div><label className={labelCls} htmlFor="ins-sku">SKU / Product Code</label><input type="text" id="ins-sku" placeholder="e.g. DEC-009" required className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="ins-name">Product Name</label><input type="text" id="ins-name" placeholder="e.g. Velvet Armchair — Navy" required className={inputCls} /></div>
          <div>
            <label className={labelCls} htmlFor="ins-category">Category</label>
            <select id="ins-category" required defaultValue="" className={selectCls}>
              <option value="" disabled>Select category...</option>
              {['Sofa','Table','Chair','Bed','Storage','Other'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div><label className={labelCls} htmlFor="ins-qty">Quantity</label><input type="number" id="ins-qty" placeholder="e.g. 10" min="0" required className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="ins-price">Price (USD)</label><input type="number" id="ins-price" placeholder="e.g. 599" min="0" step="0.01" required className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="ins-desc">Description (optional)</label><textarea id="ins-desc" placeholder="Brief product description..." className={`${inputCls} resize-y min-h-[100px]`} /></div>
          <button type="submit" className={`${btnDark} w-full px-10 py-4 text-[0.9rem] mt-2`}>Save to Inventory</button>
        </form>
      </Modal>

      {/* UPDATE MODAL */}
      <Modal id="update-modal" active={activeModal} onOverlay={handleOverlayClick}>
        <button className="absolute top-4 right-4 bg-transparent border-none text-[1.4rem] cursor-pointer text-[#999] px-2 py-1 leading-none hover:text-[var(--text-primary)]" onClick={closeModal}>&#10005;</button>
        <h2 className="mb-1">✎ Update Stock</h2>
        <p className="mb-5">Search for a product by SKU or name, then update its details.</p>
        <form onSubmit={handleUpdateStock} className="flex flex-col gap-4">
          <div><label className={labelCls} htmlFor="upd-sku">SKU / Product Code</label><input type="text" id="upd-sku" placeholder="e.g. DEC-003" required className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="upd-name">Product Name</label><input type="text" id="upd-name" placeholder="Updated name..." className={inputCls} /></div>
          <div>
            <label className={labelCls} htmlFor="upd-category">Category</label>
            <select id="upd-category" defaultValue="" className={selectCls}>
              <option value="">No change</option>
              {['Sofa','Table','Chair','Bed','Storage','Other'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div><label className={labelCls} htmlFor="upd-qty">New Quantity</label><input type="number" id="upd-qty" placeholder="Updated quantity..." min="0" className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="upd-price">New Price (USD)</label><input type="number" id="upd-price" placeholder="Updated price..." min="0" step="0.01" className={inputCls} /></div>
          <div className="flex gap-3 flex-wrap mt-2">
            <button type="submit" className={`${btnDark} px-10 py-4 text-[0.9rem]`}>Save Changes</button>
            <button type="button" className={btnBorder} onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>

      {/* DELETE MODAL */}
      <Modal id="delete-modal" active={activeModal} onOverlay={handleOverlayClick}>
        <button className="absolute top-4 right-4 bg-transparent border-none text-[1.4rem] cursor-pointer text-[#999] px-2 py-1 leading-none hover:text-[var(--text-primary)]" onClick={closeModal}>&#10005;</button>
        <h2 className="mb-1">🗑 Delete Stock</h2>
        <p className="mb-5">Enter the SKU of the product to permanently remove. This action cannot be undone.</p>
        <form onSubmit={handleDeleteStock} className="flex flex-col gap-4">
          <div><label className={labelCls} htmlFor="del-sku">SKU / Product Code</label><input type="text" id="del-sku" placeholder="e.g. DEC-004" required className={inputCls} /></div>
          <div><label className={labelCls} htmlFor="del-confirm">Type DELETE to confirm</label><input type="text" id="del-confirm" placeholder="DELETE" required className={inputCls} /></div>
          <div className="flex gap-3 flex-wrap mt-2">
            <button type="submit" className={btnDangerSolid}>Confirm Delete</button>
            <button type="button" className={btnBorder} onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
