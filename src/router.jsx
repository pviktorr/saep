import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Cadastro from './Pages/Cadastro/CadastroLivro'
import TelaEstoque from './Pages/Estoque/TelaEstoque'

const AppRoutes = () => {
  return (

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/estoque" element={<TelaEstoque />} />
      </Routes>
    
  )
}

export default AppRoutes
