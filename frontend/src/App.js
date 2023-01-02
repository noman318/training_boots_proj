/* eslint-disable no-unused-vars */
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
import { isAdmin, isLoggedIn } from "./services/MyData";
import { Navigate } from "react-router-dom";
import { CartScreen } from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";

function App() {
  const ProtectRoute = ({ children }) => {
    const auth = isLoggedIn();
    return auth ? children : <Navigate to="/" />;
  };

  const ProtectAdminRoute = ({ children }) => {
    const auth = isLoggedIn();
    const adminAuth = isAdmin();
    return auth && adminAuth ? children : <Navigate to="/" />;
  };
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
              theme="dark"
            />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegistrationScreen />} />
              <Route path="/cart/:id?" element={<CartScreen />} />
            </Routes>
          </Container>
        </main>
      </Router>
      <Footer />
    </>
  );
}

export default App;
