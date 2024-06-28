import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";
import UserEndView from "./components/UserEndView"
import Home from "./components/Home"
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<UserEndView/>}/>
        <Route path="/athletics" element={<UserEndView/>}/>
        
        
      </Routes>
    </Router>
      
       
    </>
  )
}

export default App
