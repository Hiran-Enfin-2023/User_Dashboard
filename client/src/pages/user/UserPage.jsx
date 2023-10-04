import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import UserMeetingTable from './UserMeetingTable'
import axiosInstance from '../../axios'
import { validateUser } from '../../services/validateUser'
import { stillOnline } from '../../redux/auth/authSlice'
import { useDispatch } from 'react-redux'

function UserPage() {

  const [data, setData] = useState([])
  const [id, setId] = useState("");
  const dispatch = useDispatch()
  const activeUser = async () => {
    validateUser().then((res) => {
      setData(res)
      setId(res._id)
      dispatch(stillOnline(res))
    })


  }


  useEffect(() => {
    activeUser()
  }, [])
  return (
    <div>
      <Header />
      <UserMeetingTable />
    </div>
  )
}

export default UserPage