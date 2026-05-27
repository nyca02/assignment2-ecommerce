import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuth = () => setUser(JSON.parse(localStorage.getItem('user')))
    window.addEventListener('authChanged', handleAuth)
    return () => window.removeEventListener('authChanged', handleAuth)
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <nav style={{
      backgroundColor: '#9fc7e8',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div>
        <img src="/static/images/roundlab.jpg" alt="Round Lab" style={{ width: '80px' }} />
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#2f3b46', fontWeight: 'bold' }}>Home</Link>
        <Link to="/cart" style={{ textDecoration: 'none', color: '#2f3b46', fontWeight: 'bold' }}>Cart</Link>
        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ textDecoration: 'none', color: '#2f3b46', fontWeight: 'bold' }}>Admin</Link>
            )}
            <span style={{ color: '#2f3b46' }}>Hi, {user.username}</span>
            <button onClick={handleLogout} style={{
              backgroundColor: '#7fb4dd',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: '#2f3b46', fontWeight: 'bold' }}>Login</Link>
            <Link to="/register" style={{ textDecoration: 'none', color: '#2f3b46', fontWeight: 'bold' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar