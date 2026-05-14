import { useNavigate } from 'react-router-dom';

/* ── Shared typography ── */
const h1Cls = "font-['Playfair_Display'] text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.2] mb-2 text-[#1A1A1A]";
const h2Cls = "font-['Playfair_Display'] text-[clamp(1.3rem,3vw,2rem)] font-semibold mb-2 text-[#1A1A1A]";
const h3Cls = "font-['Playfair_Display'] text-[clamp(1rem,2vw,1.3rem)] font-semibold mb-1.5 text-[#1A1A1A]";
const h4Cls = "font-['Inter'] text-[0.8rem] font-semibold uppercase tracking-[2px] mb-1.5 text-[#999999]";
const pCls  = "text-[0.95rem] leading-[1.8] text-[#4A4A4A] mb-3";

/* ── Shared buttons ── */
const btnSm =
  'inline-flex items-center justify-center gap-2 bg-[#2C2C2C] text-white border-2 border-[#2C2C2C] px-[18px] py-2 text-[0.75rem] font-["Inter"] font-semibold uppercase tracking-[1.5px] rounded-[4px] cursor-pointer transition-all duration-300 hover:bg-[#B8860B] hover:border-[#B8860B] hover:-translate-y-0.5';
const btnLg =
  'inline-flex items-center justify-center gap-2 bg-[#2C2C2C] text-white border-2 border-[#2C2C2C] px-10 py-4 text-[0.9rem] font-["Inter"] font-semibold uppercase tracking-[1.5px] rounded-[4px] cursor-pointer transition-all duration-300 hover:bg-[#B8860B] hover:border-[#B8860B] hover:-translate-y-0.5';

const catalogue = [
  { item: 'Modern Sofa',     cat: 'Living Room', mat: 'Premium Fabric',  dim: '220 × 90 cm',  price: '$1,200' },
  { item: 'Dining Table',    cat: 'Dining Room', mat: 'Solid Oak',       dim: '180 × 90 cm',  price: '$850'   },
  { item: 'Comfort Chair',   cat: 'Living Room', mat: 'Leather',         dim: '80 × 85 cm',   price: '$420'   },
  { item: 'Executive Chair', cat: 'Office',      mat: 'Leather',         dim: '65 × 120 cm',  price: '$400'   },
  { item: 'King Bed Frame',  cat: 'Bedroom',     mat: 'Oak Wood',        dim: '200 × 180 cm', price: '$2,200' },
  { item: 'Coffee Table',    cat: 'Living Room', mat: 'Tempered Glass',  dim: '120 × 60 cm',  price: '$300'   },
  { item: 'Bookshelf Unit',  cat: 'Study',       mat: 'Walnut Wood',     dim: '90 × 200 cm',  price: '$550'   },
  { item: 'Wardrobe',        cat: 'Bedroom',     mat: 'MDF + Oak',       dim: '200 × 220 cm', price: '$1,800' },
];

export default function Services() {
  const navigate = useNavigate();
  return (
    <>
      {/* HERO */}
      <header className="bg-gradient-to-br from-[#FAF9F6] to-[#F4ECE1] text-center px-[5%] pt-[100px] pb-[80px] border-b border-[#EEEEEE] max-[768px]:px-5 max-[768px]:pt-[72px] max-[768px]:pb-14">
        <h4 className={h4Cls}>Our Products</h4>
        <h1 className={h1Cls}>
          The Full <span className="text-[#B8860B]">Collection</span>
        </h1>
        <p className={`${pCls} max-w-[520px] mx-auto mb-8 text-[1.05rem]`}>
          Every piece is crafted to perfection — from statement sofas to elegant dining sets.
        </p>
      </header>

      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">

        {/* Featured Pieces heading */}
        <section className="text-center mb-3">
          <h4 className={h4Cls}>Handpicked for You</h4>
          <h2 className={h2Cls}>Featured Pieces</h2>
          <p className={pCls}>Timeless designs for every room in your home.</p>
        </section>

        {/* Product cards */}
        <div className="flex flex-wrap justify-center gap-7 my-12 mx-[5%] max-[768px]:mx-0">
          {[
            { img: '/images/sofa.jpg',         alt: 'Modern Sofa',   title: 'Modern Sofa',   desc: 'Luxury comfort meets minimalist design. Available in 6 fabric options.', price: '$1,200' },
            { img: '/images/table.jpg',         alt: 'Dining Table',  title: 'Dining Table',  desc: 'Solid oak craftsmanship for family moments. Seats up to 8.',            price: '$850'   },
            { img: '/images/comfort chair.jpg', alt: 'Comfort Chair', title: 'Comfort Chair', desc: 'Ergonomic design for lasting comfort. Perfect for reading nooks.',       price: '$420'   },
          ].map(({ img, alt, title, desc, price }) => (
            <div key={title} className="flex flex-col bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg overflow-hidden flex-[1_1_260px] max-w-[320px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(184,134,11,0.15)] hover:border-[#B8860B] max-[768px]:flex-[1_1_100%] max-[768px]:max-w-full">
              <img src={img} alt={alt} className="w-full h-[220px] object-cover" />
              <h3 className={`${h3Cls} px-5 pt-[18px]`}>{title}</h3>
              <p className={`${pCls} px-5 pb-1`}>{desc}</p>
              <p className="text-[0.95rem] leading-[1.8] mb-3 px-5 text-[#B8860B]">{price}</p>
              <button className={`${btnSm} mx-5 mb-5 mt-auto`} onClick={() => navigate('/contact')}>Enquire Now</button>
            </div>
          ))}
        </div>

        {/* Catalogue heading */}
        <section className="text-center mb-3">
          <h4 className={h4Cls}>Full Price List</h4>
          <h2 className={h2Cls}>Product Catalogue</h2>
          <p className={pCls}>All prices are inclusive of standard delivery. White-glove service available.</p>
        </section>

        {/* Price table */}
        <div className="w-full overflow-x-auto mt-5 rounded-lg">
          <table className="w-full border-collapse rounded-lg overflow-hidden bg-[#FAFAFA] text-[0.9rem]" style={{ minWidth: '620px' }}>
            <thead className="bg-[#2C2C2C]">
              <tr>
                {['Item', 'Category', 'Material', 'Dimensions', 'Price'].map(h => (
                  <th key={h} className="px-[18px] py-[14px] text-left font-['Inter'] font-semibold text-[0.78rem] text-white uppercase tracking-[1px] whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {catalogue.map(({ item, cat, mat, dim, price }) => (
                <tr key={item}>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] border-b border-[#EEEEEE] align-middle break-words max-w-[280px]">{item}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] border-b border-[#EEEEEE] align-middle">{cat}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] border-b border-[#EEEEEE] align-middle">{mat}</td>
                  <td className="px-[18px] py-[13px] text-[#4A4A4A] border-b border-[#EEEEEE] align-middle">{dim}</td>
                  <td className="px-[18px] py-[13px] border-b border-[#EEEEEE] align-middle text-[#B8860B]">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom sizing CTA box */}
        <div className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg p-9 text-center mt-5 mx-[5%] max-[768px]:mx-0">
          <h2 className={h2Cls}>Need Custom Sizing?</h2>
          <p className={`${pCls} max-w-[500px] mx-auto mb-6`}>
            We offer bespoke furniture tailored to your exact space and style requirements.
          </p>
          <button className={btnLg} onClick={() => navigate('/contact')}>Request Custom Quote</button>
        </div>
      </main>
    </>
  );
}
