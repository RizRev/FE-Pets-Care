import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  return (
    <div style={{
      backgroundImage: 'url("/blurry-gradient-haikei.png")', // Replace with your image path
      backgroundSize: 'cover',
      height: '85vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      paddingTop: '80px', // Sesuaikan nilai margin top sesuai kebutuhan
      paddingLeft: '80px', // Sesuaikan nilai margin left sesuai kebutuhan
    }}>
      <img src="/download__1_-removebg-preview-UW6JXDwb7-transformed (1).png" alt="logo" className="absolute right-[100px] top-[150px]" />
      <p
        className="font-roboto"
        style={{ fontSize: '52px', fontWeight: 'bold', color: '#171727', }}
      >
        Nutrisi Terbaik <br/> untuk Sahabat Berbulu Anda
      </p>
      <p
        className="font-poppins"
        style={{ fontSize: '18px', fontWeight: 'normal', color: '#777777', marginTop: '60px', marginBottom: '60px' }}
      >
        Berikan kucing kesayangan Anda makanan yang bukan hanya lezat, tetapi
        juga penuh nutrisi.<br/> Pets Care hadir untuk memastikan kucing Anda
        mendapatkan yang terbaik,<br/> karena kami peduli pada setiap bulu, cakar,
        dan dengkuran mereka.
      </p>
      <button
        className="font-roboto"
        style={{ color: '#FFFFFF', fontWeight: 'medium' }}
        onClick={() => navigate('/products')}
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
          Temukan Makanan Terbaik
        </div>
      </button>
    </div>
  )
}
export default Home
