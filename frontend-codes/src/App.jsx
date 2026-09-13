import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import Error404 from './components/errors/404'
import Contact from './components/pages/Contact'
import ViewCategory from './components/categories/ViewCategory'
import ViewItems from './components/items/ViewItems'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/categories" element={<ViewCategory />}></Route>
      <Route path="/categories/read-items/:id" element={<ViewItems/>}></Route>
      <Route path="*" element={<Error404 />}></Route>
    </Routes>
  )
}

export default App
