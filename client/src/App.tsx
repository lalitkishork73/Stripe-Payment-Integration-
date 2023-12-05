
import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import CartDetails from './components/CartDetails'
import { Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CartDetails />} />
      </Routes>

    </>
  )
}

export default App
