import React from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import AdminDashboard from '../../components/admin/adminDashboard/AdminDashboard'

function AdminPage() {
  return (
    <div className='bg-light'>
        <Header/>
        <div className='d-flex'>
            <Sidebar/>
            <AdminDashboard/> 
        </div>
    </div>
  )
}

export default AdminPage