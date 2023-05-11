import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navigationbar from './components/navbar';
import Siders from './components/siderbar';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Product from './pages/product';
import ProductDetail from './pages/productDetail';
import { Empty } from 'antd';
import Managements from './pages/management';
import EditProduct from './pages/editProduct';
import AuthPage from './pages/auth';
import LogOut from './pages/logout';
import Carts from './pages/cart';
import SuccessPayment from './pages/successPayment';
import OrdersPage from './pages/order';
import OderDetailPage from './pages/orderDetail';
import OrderManagement from './pages/orderManagement';
import UserDetail from './pages/userDetail';
import UserManagement from './pages/userManagement';
function App() {
  return (
    <Container fluid>
      <BrowserRouter>
        <Row>
          <Navigationbar />
        </Row>
        <Row>
          <Col xs={12} md={2}>
            <Siders></Siders>
          </Col>
          <Col xs={12} md={10}>
          <Routes>
                <Route path="/" element={<Product/>}></Route>
                <Route path="/product" element={<Product/>}></Route>
                <Route path="/product-detail" element={<ProductDetail/>}></Route>
                <Route path="/empty" element={<Empty/>}></Route>
                <Route path="/management" element={<Managements/>}></Route>
                <Route path="/edit" element={<EditProduct/>}></Route>
                <Route path="/cart" element={<Carts/>}></Route>
                <Route path="/auth" element={<AuthPage/>}></Route>
                <Route path="/logout" element={<LogOut/>}></Route>
                <Route path="/success" element={<SuccessPayment/>}></Route>
                <Route path="/order" element={<OrdersPage/>}></Route>
                <Route path="/order-detail" element={<OderDetailPage/>}></Route>
                <Route path="/orderManagement" element={<OrderManagement/>}></Route>
                <Route path="/userDetail" element={<UserDetail/>}></Route>
                <Route path="/userManagement" element={<UserManagement/>}></Route>
              </Routes>
          </Col>
        </Row>
      </BrowserRouter>
    </Container>

  );
}

export default App;
