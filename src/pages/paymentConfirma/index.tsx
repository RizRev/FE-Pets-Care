import { useEffect, useState } from 'react'
import { formatCurrency } from '../../helper/currency'
import { CartItem } from '../../helper/interface/cart'
import { getCartFromIndexedDB } from '../../utilities/indexedDb'

export const PaymentConfirmation = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const paymentMethod = searchParams.get('method')
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchCartData = async () => {
      const storedCart = await getCartFromIndexedDB()
      setCart(storedCart || [])
    }
    fetchCartData()
  }, [])

  const generateUniqueDigits = () => {
    return String(Math.floor(Math.random() * 399) + 1).padStart(3, '0')
  }

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * (item.number || 0),
    0
  )
  const uniqueDigits = generateUniqueDigits()

  const renderPaymentInstructions = () => {
    switch (paymentMethod) {
      case 'qris':
        return (
          <div className="card p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Pay with QRIS</h2>
            <ol className="list-decimal ml-4">
              <li>Scan QRIS code using your mobile banking app</li>
              <li>Complete payment in your app</li>
              <li>Upload payment proof below</li>
            </ol>
          </div>
        )
      case 'bank_transfer':
        return (
          <div className="card p-4 border rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-lg font-bold mb-4 text-center">
              Bank Transfer BCA
            </h2>
            <ol className="list-decimal ml-8 space-y-2">
              <li>Transfer to BCA account: 2000123221</li>
              <li>
                Transfer amount: Rp {formatCurrency(totalAmount)} +{' '}
                {uniqueDigits} = Rp{' '}
                {formatCurrency(totalAmount + parseInt(uniqueDigits))}
              </li>
              <li>Screenshot transfer proof and upload below</li>
            </ol>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                Upload Payment Proof
              </label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-2 text-center">
                  {selectedImage ? (
                    <>
                      <img
                        src={selectedImage}
                        alt="Selected payment proof"
                        className="mx-auto h-48 w-auto object-contain"
                      />
                      <div className="flex justify-center gap-2 mt-4">
                        <button
                          onClick={() => setSelectedImage(null)}
                          className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
                        >
                          Remove
                        </button>
                        <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                          Upload Proof
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex justify-center text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                  setSelectedImage(reader.result as string)
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        JPG, JPEG, PNG up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      case 'e_wallet':
        return (
          <div className="card p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">E-Wallet Payment</h2>
            <ol className="list-decimal ml-4">
              <li>Open your e-wallet app (Dana/GoPay)</li>
              <li>Enter the payment amount</li>
              <li>Upload payment proof below</li>
            </ol>
          </div>
        )
      default:
        return <p>Invalid payment method selected</p>
    }
  }

  return (
    <div>
      <div className="flex gap-4 mt-4">{renderPaymentInstructions()}</div>
    </div>
  )
}
