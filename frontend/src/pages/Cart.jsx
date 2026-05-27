import { useState, useEffect } from 'react'

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    loadCart()
  }, [])

  async function loadCart() {
    const response = await fetch('/api/cart', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await response.json()
    setCartItems(data)
  }

  async function increaseQuantity(productId, currentQuantity) {
    await fetch(`/api/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantity: currentQuantity + 1 })
    })
    loadCart()
  }

  async function decreaseQuantity(productId, currentQuantity) {
    if (currentQuantity > 1) {
      await fetch(`/api/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: currentQuantity - 1 })
      })
    } else {
      await removeItem(productId)
      return
    }
    loadCart()
  }

  async function removeItem(productId) {
    await fetch(`/api/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    loadCart()
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (!token) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Please login to view your cart</h2>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.product_id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '15px'
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '70px',
                  height: '70px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 6px' }}>{item.name}</h4>
                <p style={{ margin: '0', color: '#555' }}>${item.price} AUD</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => decreaseQuantity(item.product_id, item.quantity)}
                  style={{ backgroundColor: '#9fc7e8', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.product_id, item.quantity)}
                  style={{ backgroundColor: '#9fc7e8', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                  +
                </button>
                <button onClick={() => removeItem(item.product_id)}
                  style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3 style={{ textAlign: 'right' }}>Total: ${total.toFixed(2)} AUD</h3>
        </>
      )}
    </div>
  )
}

export default Cart