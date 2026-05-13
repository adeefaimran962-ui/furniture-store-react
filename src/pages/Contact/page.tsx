import { useState } from 'react';

const inputCls =
  'w-full px-[14px] py-[11px] font-["Inter"] text-[0.9rem] bg-[var(--bg-main)] text-[var(--text-primary)] border border-[#EEEEEE] rounded-[4px] transition-all duration-300 focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.15)] box-border';

const labelCls =
  'block text-[0.8rem] font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-[0.5px] font-["Inter"]';

const btnLg =
  'w-full inline-flex items-center justify-center gap-2 bg-[#2C2C2C] text-white border-2 border-[#2C2C2C] px-10 py-4 text-[0.9rem] font-["Inter"] font-semibold uppercase tracking-[1.5px] rounded-[4px] cursor-pointer transition-all duration-300 hover:bg-[#B8860B] hover:border-[#B8860B] hover:-translate-y-0.5 mt-2';

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
      {/* HERO */}
      <header className="bg-gradient-to-br from-[#FAF9F6] to-[#F4ECE1] text-center px-[5%] pt-[100px] pb-[80px] border-b border-[#EEEEEE] max-[768px]:px-5 max-[768px]:pt-[72px] max-[768px]:pb-14">
        <h4>Get In Touch</h4>
        <h1>Contact <span className="text-[#B8860B]">DECORA</span></h1>
        <p className="max-w-[520px] mx-auto mb-8 text-[1.05rem]">
          We'd love to hear from you. Reach out for custom orders, delivery questions, or design consultations.
        </p>
      </header>

      <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto max-[768px]:px-5 max-[768px]:py-8">
        <section className="text-center mb-3">
          <h4>We Are Here</h4>
          <h2>Send Us a Message</h2>
        </section>

        {/* 2-col: form + info */}
        <div className="flex flex-wrap gap-10 items-start mt-6">

          {/* Form */}
          <div className="flex-[1_1_320px] max-w-[560px] bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg p-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-[768px]:p-7">
            {submitted && (
              <p className="text-green-600 text-center font-semibold mb-4">
                ✅ Message sent! We'll reply within 24 hours.
              </p>
            )}
            <form onSubmit={handleForm} className="flex flex-col gap-4">
              <div>
                <label className={labelCls}>Full Name</label>
                <input type="text" placeholder="John Doe" required className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Email Address</label>
                <input type="email" placeholder="you@example.com" required className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Subject</label>
                <input type="text" placeholder="Custom order / Delivery / General enquiry" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Message</label>
                <textarea
                  placeholder="Tell us what you're looking for..."
                  rows={5}
                  className={`${inputCls} resize-y min-h-[120px]`}
                />
              </div>
              <button type="submit" className={btnLg}>Send Message</button>
            </form>
          </div>

          {/* Info cards */}
          <div className="flex-[1_1_260px] flex flex-col gap-5">
            {[
              { icon: '📍', title: 'Showroom',  main: '45 Design District, Milano, Italy', sub: 'Open Mon–Sat, 10am – 7pm' },
              { icon: '📞', title: 'Phone',     main: '+1 (555) 123-4567',                 sub: 'Available Mon–Fri, 9am – 6pm' },
              { icon: '✉️', title: 'Email',     main: 'hello@decora.com',                  sub: 'We reply within 24 hours' },
              { icon: '🚚', title: 'Delivery',  main: 'Nationwide white-glove delivery available.', sub: 'Free delivery on orders over $2,000' },
            ].map(({ title, main, sub }) => (
              <div key={title} className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg p-6 border-l-4 border-l-[#B8860B]">
                <h3>{title}</h3>
                <p className="m-0">{main}</p>
                <p className="m-0 text-[#999] text-[0.85rem]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
