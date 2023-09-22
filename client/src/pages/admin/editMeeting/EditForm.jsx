import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';
import DatePicker from 'react-date-picker';
import { BiCalendarEdit } from 'react-icons/bi';
import AsyncSelect from 'react-select/async'
import axiosInstance from '../../../axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';


function EditForm({ id }) {
    const [openDate, setOpenDate] = useState(false);
    const navigate = useNavigate()
    const [meetingData, setMeetingData] = useState([])
    const [host, setHost] = useState([]);
    const [participants, setParticipant] = useState([]);
    const [meetingTitle, setMeetingTitle] = useState("");
    const [meetingDate, setMeetingDate] = useState(new Date())

    const fetchDetails = async () => {
        const res = await axiosInstance.get(`/meeting/${id}`);
        const result = res.data.meeting

        setMeetingData(result)
    }

    useEffect(() => {
        fetchDetails()
    }, [])

    useEffect(() => {
        setParticipant(
            meetingData.participants?.map((e) => {
                return {
                    value: e._id,
                    label: e.name
                }

            })
        );

        setHost(
            meetingData.host?.map((e) => {
                return {
                    value: e._id,
                    label: e.name
                }
            })
        )
    }, [meetingData])

    const onMeetNameChange = (e) => {
        setMeetingTitle(e.target.value)
    }
    const onHostChange = (e) => {
        setHost(e)
    }
    const onParticipantsChange = (e) => {
        setParticipant(e)
    }

    const userData = {
        host: host?.map((e) => {
            return e.value
        }),
        participants: participants?.map((e) => {
            return e.value
        }),
        meetingTitle,
        meetingDate
    }

    const hostFilter = async (val) => {
        const res = await axiosInstance.get(`/auth/all/users?name=${val}`);


        return res.data.users?.map((e) => {
            return {
                value: e._id,
                label: `${e.name}`
            }
        })
    }

    const EditMeeting = async (e) => {
       e.preventDefault()
        try {
            const res = await axiosInstance.put(`/meeting/update/${id}`,{
            userData
            })
            if(res.data.success){
                navigate("/admin/meetings")
            }
        } catch (error) {
            console.log(error);
        }
       
    }

   

    return (
        <div style={{ height: "100%" }} >

            <div>
                <div className="card__main__body d-flex justify-content-center">
                    <div className="row">
                        <Form  style={{ width: "500px", backgroundColor: "white", padding: "30px", borderRadius: "10px" }}>
                            <h1 className='mb-3'>Edit Meeting</h1>
                            <Form.Group className="mb-3" >
                                <Form.Label>
                                    Meeting Name
                                </Form.Label>
                                <Form.Control defaultValue={meetingData.meetingTitle}  onChange={onMeetNameChange} name="meetingName" type="text" />

                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Select the host</Form.Label>
                                <AsyncSelect
                                    isMulti
                                    loadOptions={hostFilter}
                                    onChange={onHostChange}
                                    placeholder="select host"
                                    name='host'
                                    value={host}
                                />
                            </Form.Group>
                            <Form.Label>
                                Select participants
                            </Form.Label>
                            <AsyncSelect
                                isMulti
                                loadOptions={hostFilter}
                                onChange={onParticipantsChange}
                                placeholder="select participants"
                                name='participants'
                                value={participants}
                            />

                            <Form.Label>Select Date</Form.Label>
                            <div className="setDate">
                                <BiCalendarEdit onClick={() => setOpenDate(!openDate)} />
                                <span>{`${format(meetingDate, "dd/MM/yyyy")}`}</span>
                                {
                                    openDate && (
                                        <DatePicker

                                            onChange={(val) => setMeetingDate(val)}
                                            name='meetingDate'
                                            value={meetingDate}
                                            minDate={new Date()} />

                                    )
                                }
                            </div>
                            <div className='mt-3'>
                                {/* <input type='submit'>Submit</input> */}
                                {/* <Button style={{ width: "100%" }} onClick={submitForm}>Submit</Button> */}
                                <Button onClick={EditMeeting} style={{ width: "100%" }} type='submit'>Submit</Button>
                            </div>

                        </Form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditForm