import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);  // store token in localStorage for later use
      alert('Login successful!');

      if (data.is_admin) {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } else {
      alert(`Login failed: ${data.message}`);
    }
  }

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ 
          textAlign: 'center',
          marginBottom: '30px',
          color: '#333',
          fontSize: '28px'
        }}>Login</h2>
      <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#9fc7e8'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '25px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#9fc7e8'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#9fc7e8',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'background-color 0.3s, transform 0.1s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#7fb3d5';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#9fc7e8';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Login
          </button>
        </form>
        <p style={{ 
          textAlign: 'center', 
          marginTop: '20px',
          color: '#666'
        }}>
          Not registered? <Link to="/register" style={{ color: '#9fc7e8', textDecoration: 'none', fontWeight: '600' }}>Create an account</Link>
        </p>  
      </div>
    </div>
  )
}

export default Login