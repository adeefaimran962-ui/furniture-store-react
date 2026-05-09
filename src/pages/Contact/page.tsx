import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <header>
        <h4>Get In Touch</h4>
        <h1>Contact <span className="accent">DECORA</span></h1>
        <p>We'd love to hear from you. Reach out for custom orders, delivery questions, or design consultations.</p>
      </header>

      <main className="page">
        <section>
          <h4>We Are Here</h4>
          <h2>Send Us a Message</h2>
        </section>

        <div>
          <div className="form-container">
            {submitted && <p style={{ color: 'green', textAlign: 'center', fontWeight: 600 }}>✅ Message sent! We'll reply within 24 hours.</p>}
            <form onSubmit={handleForm}>
              <div>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div>
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" required />
              </div>
              <div>
                <label>Subject</label>
                <input type="text" placeholder="Custom order / Delivery / General enquiry" />
              </div>
              <div>
                <label>Message</label>
                <textarea placeholder="Tell us what you're looking for..." rows={5} />
              </div>
              <button type="submit" className="lg-button">Send Message</button>
            </form>
          </div>

          <div>
            <div>
              <h3>📍 Showroom</h3>
              <p>45 Design District, Milano, Italy</p>
              <p><span>Open Mon–Sat, 10am – 7pm</span></p>
            </div>
            <div>
              <h3>📞 Phone</h3>
              <p>+1 (555) 123-4567</p>
              <p><span>Available Mon–Fri, 9am – 6pm</span></p>
            </div>
            <div>
              <h3>✉️ Email</h3>
              <p>hello@decora.com</p>
              <p><span>We reply within 24 hours</span></p>
            </div>
            <div>
              <h3>🚚 Delivery</h3>
              <p>Nationwide white-glove delivery available.</p>
              <p><span>Free delivery on orders over $2,000</span></p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
