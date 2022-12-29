import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { HomeScreen } from "./Screens/HomeScreen";
import { ProductScreen } from "./Screens/ProductScreen";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/addproduct" element={<AddProduct />} />
            </Routes>
          </Container>
        </main>
      </Router>
      <Footer />
    </>
  );
}

export default App;
