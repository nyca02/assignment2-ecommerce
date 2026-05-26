import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'

function Home() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`/api/products?search=${search}`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [search])

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>1025 Dokdo Collection</h2>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search products..."
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

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center'
      }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home