import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiPlus } from "react-icons/hi"
import axiosInstance from '../../../axios';
import { FaTrash, FaEdit, FaUndoAlt } from 'react-icons/fa'
function AdminTable() {
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState();
    const fetchMeetings = async () => {
        const res = await axiosInstance.get("/meeting/all/meetings");
        setMeetings(res.data.meeting)

    }
    const deActivateMeeting = async (id) => {
        const res = await axiosInstance.patch(`/meeting/deactivate/${id}`)
        // console.log(res);
        if (res.data.success) {
            alert("Status changed")
        }
        fetchMeetings()
    }

    useEffect(() => {
        fetchMeetings();
    }, [])



    return (
        <div>
            <div className="admin-main d-flex justify-content-between mt-3 p-3">
                <div className="header-main">
                    <h2>Meetings</h2>
                </div>
                <div className="meeting-btn">
                    <Link to='/admin/create' className='btn btn-primary p-2'>
                        <HiPlus />  New Meeting
                    </Link>
                </div>
            </div>
            <hr />
            <div className="table-main col-lg-12">
                <div className="card shadow mb-2">
                    {
                        meetings?.length ? (<div className="card-main">
                            <table className='table '>
                                <thead>
                                    <tr>
                                        <th>
                                            No
                                        </th>
                                        <th className='text-center '>
                                            Name of the meeting
                                        </th>
                                        <th className='text-center'>
                                            Host
                                        </th>
                                        <th className='text-center'>
                                            Participants
                                        </th>
                                        <th className='text-center'>
                                            Date
                                        </th>
                                        <th className='text-center'>
                                            Status
                                        </th>
                                        <th className='text-center'>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    meetings.map((val, i) => {
                                        return (
                                            <tbody key={i}>
                                                <tr>
                                                    <th>
                                                        {i + 1}
                                                    </th>
                                                    <td className='text-center '>{val.meetingTitle}</td>
                                                    <td className='text-center'>
                                                        {val.host.map((h, i) => {
                                                            return (
                                                                <div key={i}>{h.name}</div>
                                                            )
                                                        })}
                                                    </td>
                                                    <td className='text-center d-flex justify-content-between'>
                                                        {val.participants.map((p, i) => {
                                                            return (
                                                                <div key={i}>{p.name},</div>
                                                            )
                                                        })}
                                                    </td>
                                                    <td className='text-center'>{val.meetingDate}</td>
                                                    <td className='text-center'>{
                                                        val.meetingStatus ? <div className='bg-success rounded '>Active </div> : <div className='bg-danger rounded'>InActive</div>
                                                    }</td>
                                                    <td className='text-center d-flex justify-content-between'>
                                                        <div className='text-center text-primary'>
                                                            <Link to={`/admin/edit/${val._id}`}>
                                                                <FaEdit />
                                                            </Link>
                                                        </div>
                                                        <div className="text-center">
                                                            {val.meetingStatus ?
                                                                <FaTrash onClick={() => deActivateMeeting(val._id)} style={{ cursor: "pointer", color: "red" }} /> :
                                                                <FaUndoAlt onClick={() => deActivateMeeting(val._id)} style={{ cursor: "pointer", color: "green" }} />}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })
                                }

                            </table>
                        </div>) :
                            (
                                <div>No meetings available</div>
                            )
                    }

                </div>
            </div>
        </div>
    )
}

export default AdminTable