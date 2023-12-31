import {useState } from 'react';
import { useForm } from "react-hook-form"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "../../axios" 

function Login() {

  const schema = yup.object({
    email: yup.string(true).required(),
    password: yup.string(true).min(8,"Should contain atleast 8 characters").required()
  }).required()

  const { register, handleSubmit,formState: { errors } } = useForm({ resolver: yupResolver(schema) })


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



  const onSubmit=async(data) =>{
    const {email,password} = data

    try {
      const res = await axios.post("/auth/login",{email,password});
      console.log(res.data);
      if(res.status===200 && res.data.isAdmin){

        localStorage.setItem("admin_token", res.data.access_token);
      
          navigate("/admin/meetings");
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div style={{ height: "100vh" }}>
      {/* <Header /> */}
      <div style={{ padding: "20px", backgroundColor: "#DCDCDC ", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}  >

        <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "500px", backgroundColor: "white", padding: "30px", borderRadius: "10px" }}>
          <h3>Admin Login {process.env.REACT_APP_HI_MESSAGE}</h3>
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
            <Button style={{ width: "100%" }} type='submit'>Submit</Button>
          </div>

          

        </Form>

      </div>
    </div>
  )
}

export default Login