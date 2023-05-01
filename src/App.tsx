import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home';
import Search from "./pages/Search/Search";
import Favorite from "./pages/Favorite/Favorite";
import Navbar from "./components/Navbar";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
      </Routes>
    </Router>
  )
}

export default App
