import React from 'react'
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'

export default function Contact() {
    return (
        <div>
            <Navbar/>


            <div className="mt-30 max-w-sm mx-auto my-10 p-6 bg-white rounded-lg shadow-md text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Aloqa</h2>
                <div className="space-y-2 text-gray-600">
                    <p><strong>Email:</strong> info@example.com</p>
                    <p><strong>Telefon:</strong> +998 90 123 45 67</p>
                </div>
            </div>

            <Footer/>
        </div>

    )
}
