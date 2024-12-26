import './App.css'
import Navbar from './components/Navbar'

function App() {
  const data = [
    {
      brand: 'Royal Canin',
      name: 'Mother & Baby Cat',
      description: 'Makanan kucing untuk umur dibawah 10 bulan',
      price: 100000,
      quantity: 400,
      unit: 'gram',
      img: 'https://cdn.pixabay.com/photo/2016/03/31/20/55/canines-1295175_1280.jpg',
    },
    {
      brand: 'Whiskas',
      name: 'Kitten Food',
      description: 'Makanan kucing untuk anak kucing',
      price: 80000,
      quantity: 300,
      unit: 'gram',
      img: 'https://cdn.pixabay.com/photo/2017/06/20/18/40/cat-2422017_1280.jpg',
    },
    {
      brand: 'Whiskas',
      name: 'Kitten Food',
      description: 'Makanan kucing untuk anak kucing',
      price: 80000,
      quantity: 300,
      unit: 'gram',
      img: 'https://cdn.pixabay.com/photo/2017/06/20/18/40/cat-2422017_1280.jpg',
    },
    {
      brand: 'Whiskas',
      name: 'Kitten Food',
      description: 'Makanan kucing untuk anak kucing',
      price: 80000,
      quantity: 300,
      unit: 'gram',
      img: 'https://cdn.pixabay.com/photo/2017/06/20/18/40/cat-2422017_1280.jpg',
    },
    {
      brand: 'Whiskas',
      name: 'Kitten Food',
      description: 'Makanan kucing untuk anak kucing',
      price: 80000,
      quantity: 300,
      unit: 'gram',
      img: 'https://cdn.pixabay.com/photo/2017/06/20/18/40/cat-2422017_1280.jpg',
    },
    {
      brand: 'Whiskas',
      name: 'Kitten Food',
      description: 'Makanan kucing untuk anak kucing',
      price: 80000,
      quantity: 300,
      unit: 'gram',
      img: 'https://cdn.pixabay.com/photo/2017/06/20/18/40/cat-2422017_1280.jpg',
    },
    {
      brand: 'Whiskas',
      name: 'Kitten Food',
      description: 'Makanan kucing untuk anak kucing',
      price: 80000,
      quantity: 300,
      unit: 'gram',
      img: 'https://cdn.pixabay.com/photo/2017/06/20/18/40/cat-2422017_1280.jpg',
    },
    {
      brand: 'Whiskas',
      name: 'Kitten Food',
      description: 'Makanan kucing untuk anak kucing',
      price: 80000,
      quantity: 300,
      unit: 'gram',
      img: 'https://cdn.pixabay.com/photo/2017/06/20/18/40/cat-2422017_1280.jpg',
    },
  ]

  return (
    <>
      <Navbar />
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
        <div className="flex flex-wrap gap-10">
          {data.map((item) => (
            <div className="card bg-base-100 w-[298px] shadow-xl">
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
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
