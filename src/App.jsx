import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import UserEndView from "./components/UserEndView"
import Home from "./components/Home"
import Volleyball from "./Volleyball"
function App() {
  return (
    <>
    <Router>
      <Routes>
    <Route path='/' element={<Volleyball/>}/>

      </Routes>
    </Router>
    </>
  )
}

export default App
