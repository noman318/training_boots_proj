import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { HomeScreen } from "./Screens/HomeScreen";
import { ToastContainer } from "react-toastify";
import { ProductScreen } from "./Screens/ProductScreen";
import AddProduct from "./components/AddProduct";
import Registration from "./components/Registration";
import Login from "./components/Login";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <>
      <Router>
        <Header />
        <main>
          <Container>
            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/editproduct/:id" element={<EditProduct />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </main>
      </Router>
      <Footer />
    </>
  );
}

export default App;
