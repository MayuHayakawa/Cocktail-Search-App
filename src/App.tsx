import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import Home from './pages/Home/Home';
import Search from "./pages/Search/Search";
import Favorite from "./pages/Favorite/Favorite";
import Navbar from "./components/Navbar";

function App() {

  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/favorite" element={<Favorite />}></Route>
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
