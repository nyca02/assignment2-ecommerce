import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminPanel() {
  const [carts, setCarts] = useState([])
  const [search, setSearch] = useState('')
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  useEffect(() => {
    if (!token || user?.role !== 'admin') {
      navigate('/')
      return
    }
    loadAllCarts()
  }, [])

  async function loadAllCarts() {
    const response = await fetch('/api/admin/carts', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    setCarts(data)
  }

  async function increaseQuantity(productId, userId, currentQuantity) {
    await fetch(`/api/admin/cart/${productId}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantity: currentQuantity + 1 })
    })
    loadAllCarts()
  }

  async function decreaseQuantity(productId, userId, currentQuantity) {
    if (currentQuantity > 1) {
      await fetch(`/api/admin/cart/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: currentQuantity - 1 })
      })
    } else {
      await removeItem(productId, userId)
      return
    }
    loadAllCarts()
  }

  async function removeItem(productId, userId) {
    await fetch(`/api/admin/cart/${productId}/${userId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    loadAllCarts()
  }

  const filtered = carts.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.user_id.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin Panel — All Carts</h2>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by product or user..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '16px'
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No cart items found.</p>
      ) : (
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#9fc7e8', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>User ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Product</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Quantity</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Subtotal</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, index) => (
              <tr key={index} style={{
                borderBottom: '1px solid #ddd',
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
              }}>
                <td style={{ padding: '12px', fontSize: '12px', color: '#666' }}>
                  {item.user_id}
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    {item.name}
                  </div>
                </td>
                <td style={{ padding: '12px' }}>${item.price}</td>
                <td style={{ padding: '12px' }}>{item.quantity}</td>
                <td style={{ padding: '12px' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => increaseQuantity(item.product_id, item.user_id, item.quantity)}
                      style={{
                        backgroundColor: '#9fc7e8',
                        color: 'white',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}>
                      +
                    </button>
                    <button
                      onClick={() => decreaseQuantity(item.product_id, item.user_id, item.quantity)}
                      style={{
                        backgroundColor: '#9fc7e8',
                        color: 'white',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}>
                      -
                    </button>
                    <button
                      onClick={() => removeItem(item.product_id, item.user_id)}
                      style={{
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}>
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminPanel