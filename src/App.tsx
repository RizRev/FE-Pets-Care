import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Products from './pages/products'
import Navbar from './components/Navbar'
import { Cart } from './pages/cart'
import { useEffect, useState } from 'react'
import { getCartLengthFromIndexedDB } from './utilities/indexedDb'
import {Payment} from './pages/payment'
import { PaymentConfirmation } from './pages/paymentConfirma'
import SuccessPayment from './pages/successPayment'

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
        <Route path="/cart" element={<Cart setCartLength={setCartLength}/>} />
        <Route path="*" element={<div>Not Found</div>} />
        <Route path="/payment" element={<Payment/>} />
        <Route path="/payment/confirmation" element={<PaymentConfirmation/>} />
        <Route path="/payment/success" element={<SuccessPayment/>} />
      </Routes>
    </div>
  )
}

export default App
