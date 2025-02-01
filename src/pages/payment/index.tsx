import { useNavigate } from 'react-router-dom'
import { FaQrcode, FaMoneyBillTransfer, FaWallet } from 'react-icons/fa6'
import { useState } from 'react'

export const Payment = () => {
  const navigate = useNavigate()
  const [selectedPayment, setSelectedPayment] = useState<string>('')

  const handleContinue = () => {
    if (selectedPayment) {
      navigate(`/payment/confirmation?method=${selectedPayment}`)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Payment Methods</h1>
      <p className="text-gray-600 text-center mb-8">
        Choose the payment method that suits you best
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* QRIS Card */}
        <div
          className={`p-6 rounded-lg border opacity-50 ${
            selectedPayment === 'qris'
              ? 'border-blue-500 shadow-lg'
              : 'border-gray-200'
          } cursor-not-allowed`}
        >
          <div className="flex justify-center mb-4">
            <FaQrcode className="text-4xl text-gray-700" />
          </div>
          <h2 className="text-xl font-semibold text-center mb-4">QRIS</h2>
          <p className="text-gray-600 text-center text-sm">
            Bayar mudah dengan QRIS! Scan kode QR pakai aplikasi pembayaran
            favorit Anda untuk transaksi cepat, praktis, dan aman.
          </p>
        </div>

        {/* Bank Transfer Card */}
        <div
          className={`p-6 rounded-lg border ${
            selectedPayment === 'bank_transfer'
              ? 'border-blue-500 shadow-lg'
              : 'border-gray-200'
          } cursor-pointer hover:shadow-md transition-all`}
          onClick={() => setSelectedPayment('bank_transfer')}
        >
          <div className="flex justify-center mb-4">
            <FaMoneyBillTransfer className="text-4xl text-gray-700" />
          </div>
          <h2 className="text-xl font-semibold text-center mb-4">
            Bank Transfer
          </h2>
          <p className="text-gray-600 text-center text-sm">
            Lakukan transfer bank ke rekening tujuan. Tambahkan 3 digit terakhir
            pada nominal pembayaran untuk verifikasi.
          </p>
        </div>

        {/* E-Wallet Card */}
        <div
          className={`p-6 rounded-lg border opacity-50 ${
            selectedPayment === 'e_wallet'
              ? 'border-blue-500 shadow-lg'
              : 'border-gray-200'
          } cursor-not-allowed`}
        >
          <div className="flex justify-center mb-4">
            <FaWallet className="text-4xl text-gray-700" />
          </div>
          <h2 className="text-xl font-semibold text-center mb-4">E-Wallet</h2>
          <p className="text-gray-600 text-center text-sm">
            Gunakan e-wallet seperti Dana atau GoPay. Saat top-up, tambahkan 3
            digit terakhir pada nominal untuk validasi.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!selectedPayment}
          className={`px-6 py-3 rounded-lg font-semibold ${
            selectedPayment
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition-colors`}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  )
}
