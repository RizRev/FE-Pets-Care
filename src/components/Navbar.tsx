import { useNavigate } from 'react-router-dom'

interface NavbarProps {
  cartLength: number
}

export default function Navbar({ cartLength }: NavbarProps) {

  const navigate = useNavigate()
  return (
    <div>
      <div className="border-b-2 px-20 py-9 navbar bg-base-100 ">
        <div className="flex-1 navbar-start flex flex-row gap-10">
          <button
            onClick={() => navigate('/')}
            className="font-roboto font-medium text-lg"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/products')}
            className="font-roboto font-medium text-lg"
          >
            Product
          </button>
        </div>
        <div className="navbar-center">
          <p className="font-times-new-roman text-4xl font-bold">Pet's Care</p>
        </div>
        <div className="navbar-end flex-none gap-2">
          <div className="form-control">
          Cart Length: {cartLength}
          </div>
        </div>
      </div>
    </div>
  )
}
