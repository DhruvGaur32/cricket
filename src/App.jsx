import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import UserEndView from "./components/UserEndView"
import Home from "./components/Home"
import Volleyball from "./components/Volleyball"
function App() {
  return (
    <>
    <Router>
      <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/volleyball' element={<Volleyball/>}/>
    <Route path='/athletics' element={<UserEndView/>}/>

      </Routes>
    </Router>
    </>
  )
}

export default App
