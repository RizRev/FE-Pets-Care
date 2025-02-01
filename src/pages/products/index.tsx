import './style.css'
import { useState, useEffect } from 'react'
import {
  saveCartToIndexedDB,
  getCartFromIndexedDB,
} from '../../utilities/indexedDb'
import { data } from '../../data/etalase'
import { formatCurrency } from '../../helper/currency.ts'
import {
  FaRegSquareMinus,
  FaRegSquarePlus,
} from 'react-icons/fa6'
import { IconContext } from 'react-icons'

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
        {/* <div>
          {cart.map((item) => (
            <div key={item.id}>
              {item.name}
              {item.number}
              <button onClick={() => removeItemFromCart(item.id)}>
                remove
              </button>
            </div>
          ))}
        </div> */}
        <div className="flex flex-wrap gap-10">
          {data.map((item) => (
            <div className="card bg-base-100 w-[298px] shadow-xl" key={item.id}>
              <figure>
                <img
                  src={item.img}
                  alt="Shoes"
                  style={{ maxHeight: '160px', maxWidth: '300px', objectFit: 'contain' }}
                />
              </figure>
              <div className="card-body">
                <div style={{ height: '60px' }}>
                  <h2 className="card-title">
                    {`${item.brand} ${item.name}`.length > 35
                      ? `${item.brand} ${item.name}`.substring(0, 35) + '...'
                      : `${item.brand} ${item.name}`}
                  </h2>
                </div>
                <div>
                  <p style={{ height: '60px' }}>
                    {item.description.length > 50
                      ? `${item.description.substring(0, 50)}...`
                      : item.description}
                  </p>
                </div>
                <p
                  className="font-roboto"
                  style={{
                    color: '#E36255',
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  {formatCurrency(item.price)}
                </p>
                <div className="card-actions justify-end">
                  <p
                    style={{ color: '#F3C262' }}
                    className="font-roboto font-semibold"
                  >{`${item.quantity} ${item.unit}`}</p>
                  <div style={{ height: '25px' }} className="flex align-center" id='cart'>
                    {getCartQuantity(item.id) > 0 ? (
                      <div
                        className="flex justify-between"
                        style={{ width: '80px' }}
                      >
                        <IconContext.Provider
                          value={{ color: '#A2C5C9', size: '1.5em' }}
                        >
                          <button onClick={() => removeItemFromCart(item.id)}>
                            <FaRegSquareMinus />
                          </button>
                          {getCartQuantity(item.id)}
                          <button onClick={() => addToCart(item)}>
                            <FaRegSquarePlus />
                          </button>
                        </IconContext.Provider>
                      </div>
                    ) : (
                      <button
                        className="font-poppins"
                        style={{
                          fontSize: '14px',
                          borderRadius: '12px',
                          // paddingBottom: '6px',
                          // paddingTop: '6px',
                          paddingInline: '16px',
                          backgroundColor: '#A2C5C9',
                          color: '#FFFFFF',
                          fontWeight: 'medium',
                        }}
                        onClick={() => addToCart(item)}
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
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
