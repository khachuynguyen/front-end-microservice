import { Button } from 'antd';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useSearchParams } from 'react-router-dom';

function Navigationbar() {
  let isAdmin = sessionStorage.getItem('role')?.toUpperCase()=="ADMIN"?true:false;
  let userName = sessionStorage.getItem('userName');
  const [search,setSearch] = useSearchParams();
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href='/'>Trang chủ</Navbar.Brand>
        {isAdmin ? (
                  <>
                    <Nav className="me-auto">
                      <Nav.Link href='/management'>Quản lý sản phẩm</Nav.Link>
                      <Nav.Link as={Link} to={'/orderManagement'}>Quản lý đơn hàng</Nav.Link>
                      <Nav.Link as={Link} to={'/userManagement'}>Quản lý người dùng</Nav.Link>
                    </Nav>
                    <Nav >
                        <Nav.Link  >{userName}</Nav.Link>
                        <Nav.Link as={Link} to={'/logout'}>Đăng xuất</Nav.Link>
                      </Nav>
                  </>
                  ) : <>
                      
                  </>}
        
          {
            userName!=null && !isAdmin ? (
              <>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to={'/cart'}>Giỏ hàng</Nav.Link>
                  <Nav.Link as={Link} to={'/order'}>Đơn hàng</Nav.Link>
                </Nav>
                <Nav >
                  <Nav.Link as={Link} to={'/userDetail'}>{userName}</Nav.Link>
                  <Nav.Link as={Link} to={'/logout'}>Đăng xuất</Nav.Link>
                </Nav>
              </>
          ) : <>
          </>
          }
        {
          userName==null?
          <Nav >
            <Nav.Link as={Link} to={'/auth'}>Đăng ký</Nav.Link>
          </Nav>:<></>
        }

      </Container>
    </Navbar>
  );
}

export default Navigationbar;