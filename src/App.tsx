import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Products from './pages/products'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import { getCartLengthFromIndexedDB } from './utilities/indexedDb'

function App() {
  const [cartLength, setCartLength] = useState(0)

  useEffect(() => {
    fetchCartData()
  }, [])

  const fetchCartData = async () => {
    const storedCart = await getCartLengthFromIndexedDB()
    setCartLength(storedCart)
  }

  return (
    <div>
      <Navbar cartLength={cartLength}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products setCartLength={setCartLength}/>} />
      </Routes>
    </div>
  )
}

export default App
