import React, { useState } from 'react'
import axiosInstance from '../../axios'
import Form from 'react-bootstrap/Form';
import { Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function ResetPassword() {

  const navigate = useNavigate()

  const [showPass, setShowPass] = useState(false)

  const { token } = useParams();

  console.log(token);

  const [password, setPassword] = useState("")

  const setValue = (e) => {
    setPassword(e.target.value)
  }

  const resetPassword = async () => {
    try {
      const res = await axiosInstance.post(`/auth/password/reset/${token}`, {
        password
      })

      console.log(res.data);
      if (res.data.success) {
        alert("Password reset")
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
    }

  }



  return (
    <div>
      <div className='d-flex justify-content-center pt-5 bg-light'>
        <div style={{ borderRadius: "10px", width: "400px", boxShadow: "0px 0px 20px 1px #959595", marginTop: "40px", padding: "10px" }} className="form d-flex justify-content-center">
          <Form style={{ width: "100%", textAlign: "center" }}>


            <div className="sub-title">
              Choose a new password
            </div>
            <hr style={{ backgroundColor: "black" }} />
            <Form.Group style={{ padding: "15px", display: "flex" }}>
              <Form.Control type={!showPass ? "password" : "text"} onChange={setValue} name="password" value={password} placeholder='New password' />
              <Button style={{ backgroundColor: "white", color: "black", border: "none" }} onClick={() => setShowPass(!showPass)}>{!showPass ? <FaEyeSlash /> : <FaEye />} </Button>
            </Form.Group>



            <div style={{ borderTop: "1px solid #909090", padding: "10px" }} className='or  d-flex justify-content-end'>



              <div className="cancel">
                <Button>
                  <Link to="/login">
                    Cancel
                  </Link>
                </Button>
              </div>

              <div className="continue">

                <Button style={{ backgroundColor: "#1E90FF", color: "white" }} onClick={resetPassword}>
                  Continue
                </Button>
              </div>
            </div>

          </Form>
        </div>

      </div>
    </div>
  )
}

export default ResetPassword