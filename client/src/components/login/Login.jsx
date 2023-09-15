import { useState } from 'react';
import { useForm } from "react-hook-form"
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import axios from "axios"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
function Login() {

  const schema = yup.object({
    email: yup.string(true).required(),
    password: yup.string(true).min(8,"Should contain atleast 8 characters").required()
  }).required()

  const { register, handleSubmit,formState: { errors } } = useForm({ resolver: yupResolver(schema) })
  const onSubmit = (data) =>{
    const {email,password} = data
    console.log(email);
  };
  const baseURL = process.env.REACT_APP_AUTH_BASEURL
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
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

  // const submitForm = async (e) => {
  //   e.preventDefault();

  //   const { email, password } = inputValues;

  //   if (email === " ") {
  //     alert("Fill the require fields")
  //   } else {

  //     try {
  //       const res = await axios.post("http://localhost:4000/api/auth/login", { email, password })
  //       if (res.status === 200) {
  //         console.log("User login successfully ", res.data.access_token);
  //         localStorage.setItem("access_token", res.data.access_token)

  //         navigate("/dashboard");
  //         return (
  //           <div>
  //             <Stack sx={{ width: '100%' }} spacing={2}>
  //               <Alert severity="success">This is a success alert — check it out!</Alert>
  //             </Stack>
  //           </div>
  //         )
  //       }
  //     } catch (error) {

  //       // alert(error.response.data.message)
  //       console.log(error);
  //     }

  //   }
  // }
  return (
    <div style={{ height: "100%" }}>
      <Header />
      <div style={{ padding: "20px", backgroundColor: "#DCDCDC ", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}  >

        <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "500px", backgroundColor: "white", padding: "30px", borderRadius: "10px" }}>
          <h3>Login</h3>

          <Form.Group className="mb-3" >
            <Form.Control {...register("email", { required: "Please enter email" })} onChange={setValue} name="email" value={inputValues.email} type="text" aria-invalid={errors.email ? "true" : "false"} placeholder="Enter your email" />
            {errors.email && (
              <p style={{ color: "red" }} role="alert">*{errors.email?.message}</p>
            )}
          </Form.Group>

          <Form.Group className="mb-3" >
            <div className='d-flex '>
              <Form.Control {...register("password", { required: "Enter your password", pattern: { value: /^[A-Za-z]{3}/, message: "Must include Numbers and Alphabets" } })} onChange={setValue} name="password" value={inputValues.password} type={!showPass ? "password" : "text"} placeholder="Enter your password" />
              <Button style={{ backgroundColor: "black", border: "none" }} onClick={() => setShowPass(!showPass)}>{!showPass ? <FaEyeSlash /> : <FaEye />} </Button>
            </div>
            {errors.password && (
              <p style={{ color: "red" }} role="alert">*{errors.password?.message}</p>
            )}
          </Form.Group>


          <div>
            {/* <input type='submit'>Submit</input> */}
            {/* <Button style={{ width: "100%" }} onClick={submitForm}>Submit</Button> */}
            <Button style={{ width: "100%" }} type='submit'>Submit</Button>
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