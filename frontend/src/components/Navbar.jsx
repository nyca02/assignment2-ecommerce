import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#9fc7e8',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/static/images/roundlab.jpg" alt="Round Lab" style={{ width: '80px' }} />
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#2f3b46', fontWeight: 'bold' }}>Home</Link>
        <Link to="/cart" style={{ textDecoration: 'none', color: '#2f3b46', fontWeight: 'bold' }}>Cart</Link>
        <Link to="/login" style={{ textDecoration: 'none', color: '#2f3b46', fontWeight: 'bold' }}>Login</Link>
        {/* <Link to="/register" style={{ textDecoration: 'none', color: '#2f3b46', fontWeight: 'bold' }}>Register</Link> */}
        {/* <Link to="/admin" style={{ textDecoration: 'none', color: '#2f3b46', fontWeight: 'bold' }}>Admin</Link> */}
      </div>
    </nav>
  )
}

export default Navbar