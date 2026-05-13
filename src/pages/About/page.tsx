import { useNavigate } from 'react-router-dom';

const btnLg =
  'inline-flex items-center justify-center gap-2 bg-[#2C2C2C] text-white border-2 border-[#2C2C2C] px-10 py-4 text-[0.9rem] font-["Inter"] font-semibold uppercase tracking-[1.5px] rounded-[4px] cursor-pointer transition-all duration-300 hover:bg-[#B8860B] hover:border-[#B8860B] hover:-translate-y-0.5';

const ctaBtn =
  'bg-white text-[#B8860B] border-2 border-white px-10 py-4 text-[0.9rem] font-["Inter"] font-semibold uppercase tracking-[1.5px] rounded-[4px] cursor-pointer transition-all duration-300 hover:bg-[#2C2C2C] hover:text-white hover:border-[#2C2C2C] inline-flex items-center';

export default function About() {
  const navigate = useNavigate();
  return (
    <>
      {/* HERO */}
      <header className="bg-gradient-to-br from-[#FAF9F6] to-[#F4ECE1] text-center px-[5%] pt-[100px] pb-[80px] border-b border-[#EEEEEE] max-[768px]:px-5 max-[768px]:pt-[72px] max-[768px]:pb-14">
        <h4>Our Story</h4>
        <h1>The Art of <span className="text-[#B8860B]">Craft</span></h1>
        <p className="max-w-[520px] mx-auto mb-8 text-[1.05rem]">
          Since 2004, DECORA has been creating furniture that transforms houses into homes.
        </p>
      </header>

      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">

        {/* WHO WE ARE — 2-col */}
        <section className="flex flex-wrap gap-10 items-center mb-12 max-[768px]:flex-col">
          {/* Text */}
          <div className="flex-[1_1_280px]">
            <h4>Who We Are</h4>
            <h2>Passion for Premium Living</h2>
            <p>
              DECORA was founded in Milano with a singular vision: to bring the finest European
              craftsmanship to homes around the world. Every piece in our collection is designed
              by award-winning artisans and built to last a lifetime.
            </p>
            <p>
              We work exclusively with sustainably sourced materials — hand-selected oak, walnut,
              genuine leather, and hand-blown glass — because we believe quality begins at the source.
            </p>
            <button className={btnLg} onClick={() => navigate('/services')}>Explore Collection</button>
          </div>

          {/* Feature boxes */}
          <div className="flex-[1_1_280px] flex flex-col gap-4">
            {[
              { icon: '🪵', title: 'Sustainable Materials', desc: 'Every wood grain is FSC-certified. Every leather is ethically tanned.' },
              { icon: '🎨', title: 'Bespoke Design',        desc: 'Custom sizes, custom finishes, tailored to your exact space.' },
              { icon: '🏆', title: 'Award-Winning',         desc: 'Recognised by the European Design Awards three years running.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg p-5 border-l-4 border-l-[#B8860B]">
                <h3>{title}</h3>
                <p className="m-0">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg px-5 py-10 mb-12">
          <div className="text-center mb-4">
            <h4>By the Numbers</h4>
            <h2>DECORA in Figures</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-center">
            {[
              { val: '500+',  label: 'Unique Products' },
              { val: '12K+',  label: 'Happy Clients' },
              { val: '20+',   label: 'Years of Craft' },
              { val: '4.9 ★', label: 'Average Rating' },
              { val: '30+',   label: 'Countries Served' },
            ].map(({ val, label }) => (
              <div key={label}>
                <h2 className="text-[#B8860B] m-0">{val}</h2>
                <p className="mt-1 m-0">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM */}
        <section className="text-center mb-3">
          <h4>Meet the Team</h4>
          <h2>The People Behind DECORA</h2>
          <p>A passionate team of designers, craftspeople, and customer specialists dedicated to your experience.</p>
        </section>

        <div className="flex flex-wrap justify-center gap-7 my-12 mx-[5%] max-[768px]:mx-0">
          {[
            { title: '🎨 Marco Bianchi', desc: 'Chief Design Officer — 20 years shaping furniture for luxury interiors across Europe and the Middle East.' },
            { title: '🪚 Sofia Ricci',   desc: 'Head of Craftsmanship — Master carpenter and material scientist ensuring every joint is perfect.' },
            { title: '🚀 Liam Chen',     desc: 'Customer Experience Lead — Dedicated to making your DECORA journey seamless from first click to white-glove delivery.' },
          ].map(({ title, desc }) => (
            <div key={title} className="flex flex-col bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg overflow-hidden flex-[1_1_260px] max-w-[320px] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(184,134,11,0.15)] hover:border-[#B8860B] max-[768px]:flex-[1_1_100%] max-[768px]:max-w-full">
              <h3 className="pt-[18px]">{title}</h3>
              <p className="pb-1">{desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#8B6508] to-[#B8860B] px-[5%] py-[72px] text-center max-[768px]:px-5 max-[768px]:py-12">
        <h2 className="text-white mb-2.5">Ready to Transform Your Space?</h2>
        <p className="text-white/90 max-w-[500px] mx-auto mb-7">
          Browse our full collection and find the perfect pieces for your home.
        </p>
        <button className={ctaBtn} onClick={() => navigate('/services')}>Explore Collection</button>
      </section>
    </>
  );
}
