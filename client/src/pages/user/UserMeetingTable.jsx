import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axiosInstance from '../../axios';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function UserMeetingTable() {

    const [userMeeting, setUserMeeting] = useState([])
    const [keyword, setkeyword] = useState('')
    const navigate = useNavigate();
    const fetchInvitedMeeting = async () => {
        const res = await axiosInstance.get(`/meeting/user/invited`);
        setUserMeeting(res.data.userInvitedMeeting);

    }

    useEffect(() => {
        fetchInvitedMeeting();
    }, [])


    const joinMeetingFunc = async (slug) => {
        try {
            const res = await axiosInstance.get(`/meeting/join/${slug}`)

            console.log(res.data);
            navigate(`/meeting/${slug}`)
        } catch (error) {
            console.log(error.response.data.message);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }

    }
    return (
        <div className='mt-5'>

            <div className="my__meetings d-flex justify-content-around mb-2">
                <h2>My Meetings</h2>
                <div className="header-search">
                    <form
                        className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                            <input value={keyword} onChange={(e) => setkeyword(e.target.value)} style={{ width: "400px", height: "50px" }} type="text" className="form-control bg-white  border-1 small" placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button style={{ height: "50px", width: "50px" }} className="btn btn-primary " type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
            <div className="table-div p-5">

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Host</th>
                            <th>Participants</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userMeeting?.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{e.meetingTitle}</td>
                                        <td>
                                            {
                                                e.host.map((host, i) => {
                                                    return (
                                                        <h6 key={i}>{host.name}</h6>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>
                                            {
                                                e.participants.map((p, i) => {
                                                    return (
                                                        <h6 key={i}>{p.name}</h6>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>{e.meetingDate}</td>

                                        <td className='d-flex justify-content-center'>
                                            <Link  >
                                                <Button onClick={() => joinMeetingFunc(e.slug)} style={{ backgroundColor: "#00BFFF", color: "black" }}>Join</Button>

                                            </Link>
                                        </td>

                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </Table>
            </div>

        </div>
    )
}

export default UserMeetingTable