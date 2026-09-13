import React, { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="font-bold text-xl text-indigo-400">
            Mern-Imtihon
          </div>

          <div className="hidden md:flex space-x-8">
            <a href="/" className="hover:text-indigo-400 transition">Bosh menyu</a>
            <a href="/categories" className="hover:text-indigo-400 transition">Kategoriyalar</a>
            <a href="/contact" className="hover:text-indigo-400 transition">Aloqa</a>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800 px-2 pt-2 pb-4 space-y-1">
          <a href="/" className="block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-indigo-400">Bosh menyu</a>
          <a href="/categories" className="block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-indigo-400">Kategoriyalar</a>
          <a href="/contact" className="block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-indigo-400">Aloqa</a>
        </div>
      )}
    </nav>
  )
}
