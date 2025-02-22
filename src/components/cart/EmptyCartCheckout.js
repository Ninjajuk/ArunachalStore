import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmptyCartCheckout = () => {
    const navigate=useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <p className="text-xl text-gray-600">
      Your cart is Empty Please add items to your cart.
    </p>
    <div className="my-2">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="font-bold text-primary px-2 "
      >
        Continue Shopping
        <span aria-hidden="true"> &rarr;</span>
      </button>
    </div>
  </div>
  )
}

export default EmptyCartCheckout