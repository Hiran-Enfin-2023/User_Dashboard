import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Header from '../Header/Header';
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from '../../axios';

function Register() {
  const schema = yup.object({
    name: yup.string().min(5),
    email: yup.string().required("Enter your email"),
    phoneNumber: yup.number().required("Enter your phone number").min(10),
    password: yup.string().required("Enter your password"),
    confirmPassword: yup.string().required("Confirm your password")
  })

  toast.success('🦄 Wow so easy!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const [showPass, setShowPass] = useState(false)
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
  // const onSubmit = (data) => { console.log(data); }
  const setValue = (e) => {
    const { name, value } = e.target;
    setInputValues(() => {
      return {
        ...inputValues,
        [name]: value
      }
    })
  }

  // console.log(inputValues);
  const onSubmit = async () => {
    
    const { name, email, phoneNumber, password, confirmPassword } = inputValues;

    if (name === " ") {
      alert("Fill the require fields")
    } else {
      const res = await axios.post("/auth/register", { name, email, phoneNumber, password, confirmPassword })

      if (res.status === 200 || res.data.success) {

        alert("User join successfully")
      } else {
        console.log("something went wrong");
      }
    }
  }
  return (
    <div style={{ height: "100vh" }}>
      {/* <Header /> */}
      <div style={{ height: "100%", backgroundColor: "#DCDCDC", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
        <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "500px", backgroundColor: "white", padding: "30px", borderRadius: "10px" }}>
          <h3 style={{ marginBottom: "20px" }}>Register</h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control {...register("name", { required: "Email Address is required" })} onChange={setValue} name="name" value={inputValues.name} type="text" placeholder="Enter your user name" />
            {errors.name && <p style={{ color: "red" }} role="alert">*{errors.name.message}</p>}
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Control {...register("email", { required: "Enter your email" })} onChange={setValue} name="email" value={inputValues.email} type="email" placeholder="Enter your email" />
            {errors.email && <p style={{ color: "red" }} role='alter'>*{errors.email.message}</p>}
          </Form.Group>

          <Form.Group className="mb-3  " >
            <Form.Control  {...register("phoneNumber", { required: "Enter your phone number", minLength: { value: 10, message: "must have 10 numbers" } })} onChange={setValue} name="phoneNumber" value={inputValues.phoneNumber} type="text" placeholder="Enter your phone number" />
            {errors.phoneNumber && <p style={{ color: "red" }} role="alert">*{errors.phoneNumber.message}</p>}
          </Form.Group>

          <Form.Group className="mb-3" >
            <div className='d-flex'>
              <Form.Control {...register("password", { required: "Enter your password", pattern: { value: /^[A-Za-z]{3}/, message: "Must contain Alphabets & Numbers " } })} onChange={setValue} name="password" value={inputValues.password} type={!showPass ? "password" : "text"} placeholder="Enter your password" />
              <Button style={{ backgroundColor: "black", border: "none" }} onClick={() => setShowPass(!showPass)}>{!showPass ? <FaEyeSlash /> : <FaEye />} </Button>
            </div>
            {errors.password && <p style={{ color: "red" }} role="alert">*{errors.password.message}</p>}
          </Form.Group>

          <Form.Group className="mb-3" >
            <div className='d-flex'>
              <Form.Control {...register("confirmPassword", { required: "Please confirm your password", pattern: { value: /[A-Za-z]{3}/, message: "Must contain Alphabets & Numbers" } })} onChange={setValue} name="confirmPassword" value={inputValues.confirmPassword} type={!showPass ? "password" : "text"} placeholder="Confirm your password" />
              <Button style={{ backgroundColor: "black", border: "none" }} onClick={() => setShowPass(!showPass)}>{!showPass ? <FaEyeSlash /> : <FaEye />} </Button>
            </div>
            {errors.confirmPassword && <p style={{ color: "red" }} role="alert">*{errors.confirmPassword?.message}</p>}
          </Form.Group>

          <div>
            {/* <Button style={{ width: "100%" }} onClick={submitForm}>Submit</Button> */}
            <Button style={{ width: "100%" }} type='submit'>Submit</Button>

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