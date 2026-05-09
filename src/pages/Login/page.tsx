import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <main className="page">
      <div className="form-container">
        <div>
          <div>🔐</div>
          <h2>Welcome Back</h2>
          <p>Sign in to your DECORA account</p>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <div>
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" className="lg-button">Sign In</button>
        </form>
        <p>Don't have an account? <a onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>Create Account</a></p>
      </div>
    </main>
  );
}
