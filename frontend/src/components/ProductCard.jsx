function ProductCard({ product }) {
  const addToCart = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Please login first!')
      return
    }
    await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        product_id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      })
    })
    alert(`${product.name} added to cart!`)
  }

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '20px',
      textAlign: 'center',
      width: '250px'
    }}>
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '200px',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px'
        }}
      />
      <h3 style={{ fontSize: '16px' }}>{product.name}</h3>
      <p>${product.price} AUD</p>
      <button
        onClick={addToCart}
        style={{
          backgroundColor: '#9fc7e8',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard