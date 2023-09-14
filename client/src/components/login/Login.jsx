import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import axios from "axios"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate()
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

    const {email,  password } = inputValues;

    if (email === " ") {
      alert("Fill the require fields")
    } else {

      try {
        const res = await axios.post("http://localhost:4000/api/auth/login", { email,password })

      if (res.status === 200) {
        console.log("User login successfully ", res);
        navigate("/dashboard");
      } else{
        console.log(res.response);
      }
      } catch (error) {
alert(error.response.data.message)
        // console.log(error.response.data.message);
      }
      
    }
  }
  return (
    <div style={{ padding:"20px" ,backgroundColor: "whitesmoke", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}  >

      <Form style={{ width: "500px" ,backgroundColor:"white", padding:"30px", borderRadius:"10px" }}>
      <h3>Login</h3>

        <Form.Group className="mb-3" >
          <Form.Control onChange={setValue} name="email" value={inputValues.email} type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Control onChange={setValue} name="password" value={inputValues.password} type="password" placeholder="Enter your password" />
        </Form.Group>


        <div>
          <Button onClick={submitForm}>Submit</Button>
        </div>

        <div style={{ marginTop: "10px" }}>
          <h6>Don't have account. New ? </h6>
          <Link to={"/"}>
            Register</Link>
        </div>

      </Form>
    </div>
  )
}

export default Login