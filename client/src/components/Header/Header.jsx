import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
function Header() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("access_token");
        navigate("/")
    }

    const token = localStorage.getItem("access_token")


    return (
        <div style={{ height: "40px", borderBottom: "1px solid gray" }}>
            <Navbar style={{ height: "100%" }} bg="white" data-bs-theme="dark">
                
            </Navbar>

           
        </div>
    )
}

export default Header