import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <h4>Our Story</h4>
        <h1>The Art of <span className="accent">Craft</span></h1>
        <p>Since 2004, DECORA has been creating furniture that transforms houses into homes.</p>
      </header>

      <main className="page">
        <section>
          <div>
            <div>
              <h4>Who We Are</h4>
              <h2>Passion for Premium Living</h2>
              <p>DECORA was founded in Milano with a singular vision: to bring the finest European craftsmanship to homes around the world. Every piece in our collection is designed by award-winning artisans and built to last a lifetime.</p>
              <p>We work exclusively with sustainably sourced materials — hand-selected oak, walnut, genuine leather, and hand-blown glass — because we believe quality begins at the source.</p>
              <button className="lg-button" onClick={() => navigate('/services')}>Explore Collection</button>
            </div>
            <div>
              <div>
                <h3>🪵 Sustainable Materials</h3>
                <p>Every wood grain is FSC-certified. Every leather is ethically tanned.</p>
              </div>
              <div>
                <h3>🎨 Bespoke Design</h3>
                <p>Custom sizes, custom finishes, tailored to your exact space.</p>
              </div>
              <div>
                <h3>🏆 Award-Winning</h3>
                <p>Recognised by the European Design Awards three years running.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h4>By the Numbers</h4>
          <h2>DECORA in Figures</h2>
          <div>
            <div><h2>500+</h2><p>Unique Products</p></div>
            <div><h2>12K+</h2><p>Happy Clients</p></div>
            <div><h2>20+</h2><p>Years of Craft</p></div>
            <div><h2>4.9 ★</h2><p>Average Rating</p></div>
            <div><h2>30+</h2><p>Countries Served</p></div>
          </div>
        </section>

        <section>
          <h4>Meet the Team</h4>
          <h2>The People Behind DECORA</h2>
          <p>A passionate team of designers, craftspeople, and customer specialists dedicated to your experience.</p>
        </section>

        <div className="card-container">
          <div className="card">
            <h3>🎨 Marco Bianchi</h3>
            <p>Chief Design Officer — 20 years shaping furniture for luxury interiors across Europe and the Middle East.</p>
          </div>
          <div className="card">
            <h3>🪚 Sofia Ricci</h3>
            <p>Head of Craftsmanship — Master carpenter and material scientist ensuring every joint is perfect.</p>
          </div>
          <div className="card">
            <h3>🚀 Liam Chen</h3>
            <p>Customer Experience Lead — Dedicated to making your DECORA journey seamless from first click to white-glove delivery.</p>
          </div>
        </div>
      </main>

      <section>
        <h2>Ready to Transform Your Space?</h2>
        <p>Browse our full collection and find the perfect pieces for your home.</p>
        <button className="lg-button" onClick={() => navigate('/services')}>Explore Collection</button>
      </section>
    </>
  );
}
