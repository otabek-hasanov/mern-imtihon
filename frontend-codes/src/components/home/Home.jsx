import React from 'react'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between pt-24 pb-20">
      <Navbar/>

      <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Bosh sahifa</h1>
        <p className="text-gray-600 text-lg">
          Mern-Imtihon!<br/>
          Kategoriyalar dan keyin Itemslar chiqadi uni ichida 
        </p>
      </div>

      <Footer />
    </div>
  )
}
