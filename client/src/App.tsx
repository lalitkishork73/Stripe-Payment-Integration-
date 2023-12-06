
import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import CartDetails from './components/CartDetails'
import Cancel from './components/Cancel'
import { Route, Routes } from 'react-router-dom'
import Success from './components/Success'
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CartDetails />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
      </Routes>

    </>
  )
}

export default App
