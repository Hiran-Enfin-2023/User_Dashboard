import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import UserMeetingTable from './UserMeetingTable'
import axiosInstance from '../../axios'

function UserPage() {

  const [user,setUser]= useState('')

  const loginUser = async()=>{
    const res = await axiosInstance.get("/auth/validate_user");
    console.log(res.data);
    setUser(res.data)
  }

  
  useEffect(()=>{
    loginUser()
  },[])
  return (
    <div>
      <Header user={user} />
      <UserMeetingTable />
    </div>
  )
}

export default UserPage