import { useNavigate, useLocation } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa6'

interface NavbarProps {
  cartLength: number
}

export default function Navbar({ cartLength }: NavbarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      <div className="border-b-2 px-20 py-9 navbar bg-base-100 ">
        <div className="flex-1 navbar-start flex flex-row gap-10">
          <button
            onClick={() => navigate('/')}
            className={`font-roboto font-medium text-lg transition-colors duration-200 ${
              location.pathname === '/'
                ? 'text-[#D38669]'
                : 'text-gray-700 hover:text-[#D38669]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navigate('/products')}
            className={`font-roboto font-medium text-lg transition-colors duration-200 ${
              location.pathname === '/products'
                ? 'text-[#D38669]'
                : 'text-gray-700 hover:text-[#D38669]'
            }`}
          >
            Product
          </button>
        </div>
        <div className="navbar-center">
          <p className="font-times-new-roman text-4xl font-bold">Pet's Care</p>
        </div>
        <div className="navbar-end flex-none gap-2">
          <button
            onClick={() => navigate('/cart')}
            className={`font-roboto transition-colors duration-200 relative ${
              location.pathname === '/cart'
                ? 'text-[#D38669]'
                : 'text-gray-700 hover:text-[#D38669]'
            }`}
          >
            <FaCartPlus className="text-2xl" />
            <span className="absolute top-2 -right-4 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {cartLength}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
