import { useNavigate } from 'react-router-dom';

/* ── Shared typography ── */
const h2Cls = "font-['Playfair_Display'] text-[clamp(1.3rem,3vw,2rem)] font-semibold mb-2 text-[#1A1A1A]";
const pCls  = "text-[0.95rem] leading-[1.8] text-[#4A4A4A] mb-3";

/* ── Shared form styles ── */
const inputCls =
  'w-full px-[14px] py-[11px] font-["Inter"] text-[0.9rem] bg-white text-[#1A1A1A] border border-[#EEEEEE] rounded-[4px] transition-all duration-300 focus:outline-none focus:border-[#B8860B] focus:shadow-[0_0_0_3px_rgba(184,134,11,0.15)] box-border';
const labelCls =
  'block text-[0.8rem] font-semibold text-[#4A4A4A] mb-1.5 uppercase tracking-[0.5px] font-["Inter"]';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <main className="min-h-[calc(100vh-70px)] px-[5%] py-12 max-w-[1200px] mx-auto flex items-center justify-center max-[768px]:px-5 max-[768px]:py-8">
      <div className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-lg p-10 max-w-[480px] w-full shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-[768px]:p-7">

        {/* Header */}
        <div className="text-center mb-7">
          <div className="text-[2.2rem] mb-2">🔐</div>
          <h2 className={h2Cls}>Welcome Back</h2>
          <p className={pCls}>Sign in to your DECORA account</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className={labelCls}>Email Address</label>
            <input type="email" placeholder="you@example.com" required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Password</label>
            <input type="password" placeholder="Enter your password" required className={inputCls} />
          </div>

          {/* Remember me + Forgot */}
          <div className="flex items-center justify-between mb-1">
            <label className="flex items-center gap-2 text-[0.875rem] cursor-pointer text-[#4A4A4A]">
              <input type="checkbox" className="w-auto" />
              Remember me
            </label>
            <a href="#" className="text-[#B8860B] font-semibold text-[0.875rem] hover:text-[#8B6508]">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#2C2C2C] text-white border-2 border-[#2C2C2C] px-10 py-4 text-[0.9rem] font-['Inter'] font-semibold uppercase tracking-[1.5px] rounded-[4px] cursor-pointer transition-all duration-300 hover:bg-[#B8860B] hover:border-[#B8860B] hover:-translate-y-0.5 mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-5 text-[0.9rem] text-[#4A4A4A]">
          Don't have an account?{' '}
          <a
            onClick={() => navigate('/signup')}
            className="text-[#B8860B] font-semibold cursor-pointer hover:text-[#8B6508]"
          >
            Create Account
          </a>
        </p>
      </div>
    </main>
  );
}
