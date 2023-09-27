import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiPlus } from "react-icons/hi"
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi"
import axiosInstance from '../../../axios';
import { FaTrash, FaEdit, FaUndoAlt } from 'react-icons/fa'
function AdminTable() {
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState();
    const [searchData, setSearchData] = useState("")
    const [page, setPage] = useState(1)
    const [totalDocument, setTotalDocument] = useState()
    const [limit, setLimit] = useState()
    const fetchMeetings = async () => {
        try {
            const res = await axiosInstance.get(`/meeting/all/meetings/?page=${page}&keyword=${searchData}`);

            setMeetings(res.data.meetingsAgg)
            setLimit(res.data.limit)
            setTotalDocument(res.data.count)
        } catch (error) {
            console.log(error);
        }
    
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
    }, [page, searchData])

    const selectPageHanlder = (page) => {
        if (page > 0) {

            setPage(page)
        }
    }

    const onSearchChange = (e) => {
        setSearchData(e.target.value)
    }

    return (
        <div>
            <div className="admin-main d-flex justify-content-between mt-3 p-3">
                <div className="header-main">
                    <h2>Meetings</h2>
                </div>
                <div className="header-search">
                    <form
                        className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                            <input value={searchData} onChange={onSearchChange} style={{ width: "400px", height: "50px" }} type="text" className="form-control bg-white  border-1 small" placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button style={{ height: "50px", width: "50px" }} className="btn btn-primary " type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>

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
                            <table style={{ minHeight: "350px" }} className='table '>
                                <thead>
                                    <tr>
                                        <th>
                                            No
                                        </th>
                                        <th className='text-center w-25 '>
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
                                    meetings?.map((val, i) => {
                                        return (
                                            <tbody key={i}>
                                                <tr>
                                                    <th>
                                                        {i + 1}
                                                    </th>
                                                    <td className='text-center w-25'>{val.meetingTitle}</td>
                                                    <td className='text-center' style={{height:"25px"}}>
                                                        {val.hostList.map((h, i) => {
                                                            return (
                                                                <div className='w-100' key={i}>{h.name}</div>
                                                            )
                                                        })}
                                                    </td>
                                                    <td className='text-center d-flex justify-content-between'>
                                                        {val.participantList.map((p, i) => {
                                                            return (
                                                                <div className='w-70' key={i}>{p.name},</div>
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

            {

                meetings?.length > 0 && <div style={{ padding: "10px", justifyContent: "center" }} className="pagination mt-2">
                    <div>

                        <span ><BiSolidLeftArrow className={page <= 1 ?  "opacity-0 " : ""  } style={{ height: "20px", width: "20px", cursor: "pointer", color: "blue" }} onClick={() => selectPageHanlder(page - 1)} /> </span>
                        {
                            [...Array(Math.ceil(totalDocument / limit) )].map((_, i) => {
                                return <span className={page=== i + 1 ? "border border-primary rounded p-1" : ""} onClick={()=>selectPageHanlder(i+1)} style={{ fontSize: "18px", margin: "5px", cursor: "pointer" }}>{i + 1}</span>

                            })
                        }

                        <span onClick={() => selectPageHanlder(page + 1)}><BiSolidRightArrow className={page > meetings.length ?  "opacity-0" : ""  } style={{ cursor: "pointer", height: "20px", width: "20px", color: "blue"  }} /></span>
                    </div>
                </div>
            }



        </div>
    )
}

export default AdminTable