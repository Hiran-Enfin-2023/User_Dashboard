import Header from '../../components/Header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import AdminTable from '../../components/admin/adminDashboard/AdminTable'


function AdminPage() {
  return (
    <div style={{ height: "100%" }} className='bg-light'>
      <div style={{ height: "100%", width: "100%" }} className='d-flex'>
        <Sidebar/>
        <div className="adminPage w-100">
          {/* <Header /> */}
          <AdminTable/>
        </div>
      </div>
    </div>
  )
}

export default AdminPage