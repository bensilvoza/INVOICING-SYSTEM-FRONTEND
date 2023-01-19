// Libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/home";
import CreateInvoice from "./pages/invoice/create";
import Register from "./pages/account/register";
import Login from "./pages/account/login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/invoice/create" element={<CreateInvoice />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
