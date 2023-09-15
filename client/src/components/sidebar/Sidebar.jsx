import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
function Sidebar() {
    return (
        <div style={{ minWidth: "15%", borderRadius: "5px", minHeight: "100vh" }} className='bg-white m-2 p-2'>
            <div style={{border: "1px solid #CDCDCD", borderRadius: "10px", padding:"8px"}} className='d-flex justify-content-around mt-2'>
                <div className="avatar">
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                </div>
                <div className="details ">
                    <h6 style={{fontSize:"14px"}} className='font-weight-light'>Hi Admin!</h6>
                    <h6 style={{fontSize:"10px"}}>admin@gmail.com</h6>
                </div>
            </div>

        </div>
    )
}

export default Sidebar