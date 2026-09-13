import React from 'react'
import { Link } from 'react-router-dom'

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-9xl font-bold text-indigo-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Sahifa topilmadi</h2>
      <p className="text-gray-500 mt-2 max-w-sm">
        Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki oʻchirilgan.
      </p>
      <Link 
        to="/" 
        className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  )
}
