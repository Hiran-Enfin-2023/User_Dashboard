import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import axios from "axios"
import Button from 'react-bootstrap/Button';
function Register() {
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
      const res = await axios.post("http://localhost:4000/api/auth/register",{name,email,phoneNumber,password,confirmPassword})

      if(res.status === 200){
        console.log("Created", res);
      }else{
        console.log("something went wrong");
      }
    }
  }
  return (

    <div style={{ backgroundColor: "whitesmoke", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
      <h3>Register</h3>
      <Form style={{ width: "500px" }}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control onChange={setValue} name="name" value={inputValues.name} type="text" placeholder="Enter your user name" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Control onChange={setValue} name="email" value={inputValues.email} type="email" placeholder="Enter your email" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Control onChange={setValue} name="phoneNumber" value={inputValues.phoneNumber} type="text" placeholder="Enter your phonenumber" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Control onChange={setValue} name="password" value={inputValues.password} type="password" placeholder="Enter your password" />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Control onChange={setValue} name="confirmPassword" value={inputValues.confirmPassword} type="password" placeholder="Confirm your password" />
        </Form.Group>

        <div>
          <Button onClick={submitForm}>Submit</Button>
        </div>

        <div>
          <h6>Already have account ? </h6>
          <Link to={"/login"}>
            Login</Link>
        </div>

      </Form>
    </div>
  )
}

export default Register