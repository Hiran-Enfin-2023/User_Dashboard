
import React from 'react'
import Sidebar from '../../sidebar/Sidebar'
import Header from '../../Header/Header'


function AdminDashboard() {
    return (
        <div>
            <div style={{ height: "100%", width: "100%" }} className='d-flex'>
                <Sidebar />
                <div className="adminPage w-100">
                    <Header />
                    <div>
                        Blank Page
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AdminDashboard