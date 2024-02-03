import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Index from './pages/Index';


function App() {
  const [Active, SetActive] = useState(true)

  return (
    <>
    <Routes>
      <Route index element={<Index />} />
    </Routes>
    </>

  )
}

export default App
