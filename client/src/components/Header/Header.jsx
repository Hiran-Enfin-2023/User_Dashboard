import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { Link, useNavigate } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import avatar from "../../assets/image.jpg"
function Header() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("access_token");
        navigate("/")
    }
    return (
        <div>
            <Navbar bg="white" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand style={{ color: "black" }} to="/">UserApp</Navbar.Brand>

                </Container>
                <Nav className="me-auto">
                    <div style={{ width: "17rem", display: "flex", justifyContent: "space-between", marginRight: "25px" }}>


                        <Link style={{ textDecoration: "none" }} className='link' to={"/login"}> <Button variant="dark">Login</Button> </Link>


                        <Link style={{ textDecoration: "none" }} className='link' to={"/"}>  <Button variant="dark">Register</Button></Link>
                        <Link style={{ textDecoration: "none" }} className='link' to={"/dashboard"}>
                            {/* <img style={{height:"100%",width:"100%"}} src={avatar} /> */}
                            <DropdownButton title="Profile" variant="dark">

                                <Dropdown.Item onClick={logout} >Logout</Dropdown.Item>

                            </DropdownButton>
                        </Link>

                    </div>

                </Nav>
            </Navbar>
        </div>
    )
}

export default Header