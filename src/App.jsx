import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import Home from "./components/Home"
import Volleyball from "./Volleyball"
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/volleyball" element={<Volleyball/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
