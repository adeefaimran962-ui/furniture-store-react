import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <main className="page">
      <div className="form-container">
        <div>
          <div>✨</div>
          <h2>Create Account</h2>
          <p>Join DECORA and discover premium living</p>
        </div>
        <form onSubmit={handleSignup}>
          <div>
            <div>
              <label>First Name</label>
              <input type="text" placeholder="John" required />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" placeholder="Doe" required />
            </div>
          </div>
          <div>
            <label>Email Address</label>
            <input type="email" placeholder="you@example.com" required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Create a strong password" required />
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" placeholder="Repeat your password" required />
          </div>
          <button type="submit" className="lg-button">Create Account</button>
        </form>
        <p>Already have an account? <a onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Sign In</a></p>
      </div>
    </main>
  );
}
