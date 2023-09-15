import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import axios from "axios"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
function Login() {

  const baseURL = process.env.REACT_APP_AUTH_BASEURL
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [err, setErr] = useState("")
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  })


  const setValue = (e) => {
    const { name, value } = e.target;
    setInputValues(() => {
      return {
        ...inputValues,
        [name]: value
      }
    })
  }

  const submitForm = async (e) => {
    e.preventDefault();

    const { email, password } = inputValues;

    if (email === " ") {
      alert("Fill the require fields")
    } else {

      try {
        const res = await axios.post("http://localhost:4000/api/auth/login", { email, password })
        if (res.status === 200) {
          console.log("User login successfully ", res.data.access_token);
          localStorage.setItem("access_token", res.data.access_token)

          navigate("/dashboard");
          return (
            <div>
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">This is a success alert — check it out!</Alert>
              </Stack>
            </div>
          )
        }
      } catch (error) {

        // alert(error.response.data.message)
        console.log(error);
      }

    }
  }
  return (
    <div style={{ height: "100%" }}>
      <Header />
      <div style={{ padding: "20px", backgroundColor: "#DCDCDC ", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}  >

        <Form style={{ width: "500px", backgroundColor: "white", padding: "30px", borderRadius: "10px" }}>
          <h3>Login</h3>

          <Form.Group className="mb-3 d-flex" >
            <Form.Control onChange={setValue} name="email" value={inputValues.email} type="text" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group className="mb-3 d-flex " >
            <Form.Control onChange={setValue} name="password" value={inputValues.password} type={!showPass ? "password" : "text"} placeholder="Enter your password" />
            <Button style={{ backgroundColor: "black", border: "none" }} onClick={() => setShowPass(!showPass)}>{!showPass ? <FaEyeSlash /> : <FaEye />} </Button>
          </Form.Group>


          <div>
            <Button style={{ width: "100%" }} onClick={submitForm}>Submit</Button>
          </div>

          <div style={{ marginTop: "10px" }}>
            <h6>Don't have account. New ? </h6>
            <Link to={"/"}>
              Register</Link>
          </div>

        </Form>
      </div>
    </div>
  )
}

export default Login