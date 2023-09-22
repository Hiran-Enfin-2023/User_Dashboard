import React from 'react'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/Header/Header'
import EditForm from './EditForm'
import { useParams } from 'react-router-dom';

function EditMeeting() {
  const params = useParams();
  return (
    <div style={{ width: "100%" }}>
    <div className="main d-flex w-100">
        <Sidebar />
        <div className="w-100 main-wrapper">
            <div style={{ width: "100%" }} className="header  ">
                <Header />
            </div>
            <div style={{ style: "100%" }} className="form__div">
                <EditForm id={params.id}/>
            </div>
        </div>
    </div>
</div>
  )
}

export default EditMeeting