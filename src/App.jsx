import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Netflix from './pages/Netflix';
import Signup from './pages/Signup';
import Player from './pages/Player';
import Movies from './pages/Movies';
import Tvshow from './pages/Tvshow';
import Mylist from './pages/Mylist';

export default function App() {
  return (
    <div>
        <BrowserRouter>
    
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/video' element={<Player/>} />
            <Route path='/' element={<Netflix/>}/>
            <Route path='/tv' element={<Tvshow/>}/>
            <Route path='/movie' element={<Movies/>}/>
            <Route path='/mylist' element={<Mylist/>}/>
        </Routes>
        
        </BrowserRouter>

    </div>
  )
}
