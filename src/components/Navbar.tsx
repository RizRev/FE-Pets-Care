import React from 'react'

export default function Navbar() {
  return (
    <div>
      <div className="border-b-2 px-20 py-9 navbar bg-base-100 ">
        <div className="flex-1 navbar-start flex flex-row gap-10">
          <button className='font-roboto font-medium text-lg'>Home</button>
          <button className='font-roboto font-medium text-lg'>Product</button>
        </div>
        <div className="navbar-center">
          <p className="font-times-new-roman text-4xl font-bold">Pet's Care</p>
        </div>
        <div className="navbar-end flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search Product"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
