import axios from "axios";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import avatar from "../../assets/image.jpg"
import Header from "../Header/Header";
function Dashboard() {
  const token = localStorage.getItem("access_token");
  console.log("dashboard",token);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  // const cookies = new Cookies();

  // const GetCookie = () => {
  //   alert(cookies.get());
  // };
  const validateUser = async () => {
    try {
      if(!token){
        alert("Please login to view profile")
        navigate("/login")

      }
      const res = await axios.get(
        "http://localhost:4000/api/auth/validate_user",
        {
          headers: { Authorization: token },
        }
      );
  
      if(res.status===200){
        setUser(res.data)
      }else{
        navigate("/login")
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
    
  };
  useEffect(() => {
    validateUser();
    // GetCookie();
  }, []);
// console.log(user);
  return (
    <div style={{height:"100%"}}>
      <Header/>
      <div style={{backgroundColor:"#DCDCDC", display:"flex",height:"100%", alignItems:"center",justifyContent:"center"}}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={avatar} />
          <Card.Body>
            <Card.Text>Name: {user.name}</Card.Text>
            <Card.Text>
              Email : {user.email}
            </Card.Text>
            <Card.Text>
              Number : {user.phoneNumber}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
