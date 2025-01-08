import './style.css'
import { useState, useEffect } from 'react'
import {
  saveCartToIndexedDB,
  getCartFromIndexedDB,
} from '../../utilities/indexedDb'
import { data } from '../../data/etalase'

interface ProductsPageProps {
  setCartLength: React.Dispatch<React.SetStateAction<number>>
}

function Products({ setCartLength }: ProductsPageProps) {
  interface CartItem {
    id: string
    brand: string
    name: string
    description: string
    price: number
    quantity: number
    unit: string
    img: string
    number?: number
  }
  const [cart, setCart] = useState<CartItem[]>([])
  useEffect(() => {
    const fetchCartData = async () => {
      const storedCart = await getCartFromIndexedDB()
      setCart(storedCart || [])
    }
    fetchCartData()
  }, [])

  const addToCart = async (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        const updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, number: cartItem.number ? cartItem.number + 1 : 1 }
            : cartItem
        )
        saveCartToIndexedDB(updatedCart)
        return updatedCart
      } else {
        const updatedCart = [...prevCart, { ...item, number: 1 }]
        const cartLength = updatedCart.length
        setCartLength(cartLength)
        saveCartToIndexedDB(updatedCart)
        return updatedCart
      }
    })
  }

  const removeItemFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId)
      if (existingItem) {
        let updatedCart
        if (existingItem.number && existingItem.number > 1) {
          updatedCart = prevCart.map((cartItem) =>
            cartItem.id === itemId
              ? {
                  ...cartItem,
                  number: cartItem.number ? cartItem.number - 1 : 0,
                }
              : cartItem
          )
        } else {
          updatedCart = prevCart.filter((cartItem) => cartItem.id !== itemId)
        }
        const cartLength = updatedCart.length
        setCartLength(cartLength)
        saveCartToIndexedDB(updatedCart)
        return updatedCart
      } else {
        return prevCart
      }
    })
  }

  const getCartQuantity = (itemId: string): number => {
    const item = cart.find((cartItem) => cartItem.id === itemId)
    return item ? (item.number as number) : 0
  }

  return (
    <>
      <div className="p-20">
        <div className="flex flex-col ">
          <p
            className="text-lg font-semibold self-center mb-1"
            style={{ color: '#D38669' }}
          >
            Discover Our Best Product
          </p>
          <p
            className="font-roboto font-bold text-[52px] self-center mb-5"
            style={{ fontFamily: 'Roboto' }}
          >
            Product Overview
          </p>
        </div>
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              {item.name}
              {item.number}
              <button onClick={() => removeItemFromCart(item.id)}>
                remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-10">
          {data.map((item) => (
            <div className="card bg-base-100 w-[298px] shadow-xl" key={item.id}>
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {item.brand} {item.name}
                </h2>
                <p>{item.description}</p>
                <div className="card-actions justify-end">
                  {getCartQuantity(item.id) > 0 ? (
                    <div>
                      <button onClick={() => removeItemFromCart(item.id)}>
                        -
                      </button>
                      {getCartQuantity(item.id)}
                      <button onClick={() => addToCart(item)}>+</button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(item)}>Buy Now</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Products
