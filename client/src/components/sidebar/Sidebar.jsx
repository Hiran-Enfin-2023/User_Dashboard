import { Link } from "react-router-dom"

function Sidebar() {

    return (
        <div  className='bg-white'>
         

            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/* <!-- Sidebar - Brand --> */}
                <Link to="/" className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                </Link>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/* <!-- Nav Item - Dashboard --> */}
                <li className="nav-item active">
                    <Link to="/admin/dashboard" className="nav-link" >
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                        </Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

               


                {/* <!-- Nav Item - Utilitie/</hr>s Collapse Menu --> */}
                <li className="nav-item">
                    <Link to="/admin/meetings" className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                        <span>Meetings</span>
                    </Link>
                   
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />


            </ul>

        </div>
    )
}

export default Sidebar