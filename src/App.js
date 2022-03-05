import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Detail from "./pages/detail/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Catalog />} />
        <Route path="/:category/:id" element={<Detail />} />
        <Route path="/:category/search/:keyword" element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
