import { useEffect, useState } from 'react'
import {
  getCartFromIndexedDB,
  saveCartToIndexedDB,
} from '../../utilities/indexedDb'
import { CartItem } from '../../helper/interface/cart'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../helper/currency'
import { FaRegSquareMinus, FaRegSquarePlus } from 'react-icons/fa6'
import { IconContext } from 'react-icons'

interface ProductsPageProps {
  setCartLength: React.Dispatch<React.SetStateAction<number>>
}

export const Cart = ({ setCartLength }: ProductsPageProps) => {
  const navigate = useNavigate()
  const [cart, setCart] = useState<CartItem[]>([])
  useEffect(() => {
    fetchCartData()
  }, [])
  const fetchCartData = async () => {
    const storedCart = await getCartFromIndexedDB()
    console.log(storedCart)
    setCart(storedCart || [])
  }
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
    <div className="flex gap-4 h-[85vh]">
      <div
        id="cart"
        className="w-[60%] p-4"
        style={{ borderRight: '1px solid #E5E5E5' }}
      >
        <div>
          <ul>
            {cart.map((item) => (
              <div className="flex mb-4">
                <li key={item.id} className="flex gap-2">
                  <div className="w-[200px]">
                    <figure>
                      <img
                        style={{ borderRadius: '12px' }}
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes"
                      />
                    </figure>
                  </div>
                  <div className="w-[400px] flex flex-col justify-evenly">
                    <h2 className="card-title">
                      {`${item.brand} ${item.name}`.length > 30
                        ? `${item.brand} ${item.name}`.substring(0, 30) +
                          '. . .'
                        : `${item.brand} ${item.name}`}
                    </h2>
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
                    <p
                      style={{ color: '#F3C262' }}
                      className="font-roboto font-semibold"
                    >{`${item.quantity} ${item.unit}`}</p>
                  </div>
                  <div className="flex flex-col justify-center h-[100%] w-[80px]">
                    <div
                      style={{ height: '25px' }}
                      className="flex align-center"
                      id="cart"
                    >
                      {getCartQuantity(item.id) >= 1 ? (
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
                  <div
                    className="flex flex-col justify-center pl-4"
                    style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#E36255',
                    }}
                  >
                    <p>{formatCurrency(item.price * (item.number ?? 0))}</p>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div
          className="flex"
          style={{
            marginTop: '32px',
            borderTop: '2px solid #E5E5E5',
            paddingTop: '16px',
          }}
        >
          <div style={{ width: '600px' }}></div>
          <div className="w-[80px] ml-4 flex justify-end">
            <p
              style={{ color: '#A2C5C9', fontWeight: 'bold', fontSize: '20px' }}
            >
              Total
            </p>
          </div>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#E36255',
              marginLeft: '24px',
            }}
          >
            {formatCurrency(
              cart.reduce(
                (acc, item) => acc + item.price * (item.number ?? 0),
                0
              )
            )}
          </h2>
        </div>
      </div>
      <div id="address" className="flex flex-col gap-4 w-[100%] pt-4">
        <div className="flex justify-around">
          <div className="w-[40%]">
            <p>Nama</p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
          <div className="w-[40%]">
            <p>Email</p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="ml-[5%] w-[40%]">
          <p>No. Telepon</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex justify-around">
          <div className="w-[40%]">
            <p>Provinsi</p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="w-[40%]">
            <p>Kota</p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="ml-[5%] w-[40%]">
          <p>Kecamatan/Desa</p>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="ml-[5%] w-[90%]">
          <p>Alamat</p>
          <textarea
            placeholder="Type your complete address here"
            className="textarea textarea-bordered w-full h-[100px]"
            rows={4}
            maxLength={500}
            style={{
              // resize: 'none',
              padding: '12px',
              fontSize: '14px',
              borderRadius: '8px',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <button
            className="font-poppins"
            style={{
              width: '300px',
              color: '#FFFFFF',
              fontWeight: 'medium',
              marginRight: '5%',
            }}
            onClick={() => navigate('/payment')}
          >
            <div
              style={{
                borderRadius: '12px',
                paddingBottom: '16px',
                paddingTop: '16px',
                paddingInline: '60px',
                backgroundColor: '#D38669',
              }}
            >
              Lanjut Pembayaran
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}