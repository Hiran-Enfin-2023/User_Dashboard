import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Header from '../Header/Header';
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
function Register() {
  const [showPass, setShowPass] = useState(false)
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
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

  console.log(inputValues);
  const submitForm = async (e) => {
    e.preventDefault();

    const { name, email, phoneNumber, password, confirmPassword } = inputValues;

    if (name === " ") {
      alert("Fill the require fields")
    } else {
      const res = await axios.post("http://localhost:4000/api/auth/register", { name, email, phoneNumber, password, confirmPassword })

      if (res.status === 200) {
        console.log("Created", res);
        return (
          <div>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              <strong>Your registered successfully</strong>
            </Alert>
          </div>
        )
      } else {
        console.log("something went wrong");
      }
    }
  }
  return (
    <div style={{ height: "100%" }}>
      <Header />
      <div style={{ height: "100%", backgroundColor: "#DCDCDC", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
        <Form style={{ width: "500px", backgroundColor: "white", padding: "30px", borderRadius: "10px" }}>
          <h3 style={{ marginBottom: "20px" }}>Register</h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control onChange={setValue} name="name" value={inputValues.name} type="text" placeholder="Enter your user name" />
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control onChange={setValue} name="email" value={inputValues.email} type="email" placeholder="Enter your email" />
          </Form.Group>
          <Form.Group className="mb-3  " >
            <Form.Control onChange={setValue} name="phoneNumber" value={inputValues.phoneNumber} type="text" placeholder="Enter your phonenumber" />
          </Form.Group>
          <Form.Group className="mb-3 d-flex" >
            <Form.Control onChange={setValue} name="password" value={inputValues.password} type={!showPass ? "password" : "text"} placeholder="Enter your password" />
            <Button style={{ backgroundColor: "black", border: "none" }} onClick={() => setShowPass(!showPass)}>{!showPass ? <FaEyeSlash /> : <FaEye />} </Button>
          </Form.Group>
          <Form.Group className="mb-3 d-flex" >
            <Form.Control onChange={setValue} name="confirmPassword" value={inputValues.confirmPassword} type={!showPass ? "password" : "text"} placeholder="Confirm your password" />
            <Button style={{ backgroundColor: "black", border: "none" }} onClick={() => setShowPass(!showPass)}>{!showPass ? <FaEyeSlash /> : <FaEye />} </Button>
          </Form.Group>

          <div>
            <Button style={{ width: "100%" }} onClick={submitForm}>Submit</Button>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h6>Already have account ? </h6>
            <Link to={"/login"}>
              Login</Link>
          </div>

        </Form>
      </div>
    </div>
  )
}

export default Register