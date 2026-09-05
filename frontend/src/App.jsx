import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Service from "./components/Service";
import PropertyList from "./components/Propertylist";
import Login from "./components/Login";
import Register from "./components/Register";
import PropertyDetails from "./components/PropertyDetails";
import ServiceDetails from "./components/ServiceDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/property-details/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;