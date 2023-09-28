import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import axiosInstance from '../../../axios';
import { BiCalendarEdit } from "react-icons/bi"
import { format } from "date-fns";
import DatePicker from "react-date-picker"
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
function MeetingForm() {

  const navigate = useNavigate()



  const [meetingTitle, setMeetingTitle] = useState('')
  const [slug, setSlug] = useState("")
  const [meetingDate, setMeetingDateDate] = useState(new Date())
  const [host, setHost] = useState([]);
  const [participants, setParticipants] = useState([])
  const [openDate, setOpenDate] = useState(false);

  const onMeetingChange = (e) => {
    setMeetingTitle(e.target.value)
  }

  const onSlugChange = (e) => {
    setSlug(e.target.value)
  }
  const onDateChange = (e) => {
    
    setMeetingDateDate(format(new Date(e), 'yyyy-MM-dd'))
  }
  const onHostChange = (e) => {
    setHost(e)
  }

  const onParticipantsChange = (e) => {
    setParticipants(e)
  }



  const joinData = {
    host: host?.map((e) => {
      return e.value
    }),
    participants: participants?.map((e) => {
      return e.value
    }),
    meetingTitle,
    meetingDate,
    slug
  }

  console.log(joinData);

  const hostFilter = async (val) => {
    const res = await axiosInstance.get(`/auth/all/users?name=${val}`);


    return res.data.users?.map((e) => {
      return {
        value: e._id,
        label: `${e.name}`
      }
    })
  }

  const addMeeting = async (e) => {
    e.preventDefault()
    const res = await axiosInstance.post("/meeting/addMeeting", { joinData })

    console.log(res.data);
    if (res.data.success) {
      alert("Meeting scheduled")
    } else {
      alert("Error in scheduling")
    }

    navigate("/admin/meetings")
  }

  return (
    <div style={{ height: "100%" }}>
      <div >


        <div className="card__main__body d-flex justify-content-center">
          <div className="row">

            <Form onSubmit={addMeeting} style={{ width: "500px", backgroundColor: "white", padding: "30px", borderRadius: "10px" }}>
              <h3 className='mb-3'>Create a new meeting</h3>
              <Form.Group className="mb-3" >
                <Form.Label>Meeting Name</Form.Label>
                <Form.Control name="meetingName" type="text" onChange={onMeetingChange} value={meetingTitle} placeholder="Meeting name..." />
                {/* {errors.email && (
              <p style={{ color: "red" }} role="alert">*{errors.email?.message}</p>
            )} */}
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Select the host</Form.Label>
                <AsyncSelect
                  isMulti
                  loadOptions={hostFilter}
                  onChange={onHostChange}
                  placeholder="select host"
                  name='host'
                  value={host}
                />
                {/* {errors.password && (
              <p style={{ color: "red" }} role="alert">*{errors.password?.message}</p>
            )} */}
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

              <Form.Group className="mb-3" >
                <Form.Label>Generate a Slug</Form.Label>
                <Form.Control name="slug" type="text" onChange={onSlugChange} value={slug} placeholder="Generate a slug" />
                {/* {errors.email && (
              <p style={{ color: "red" }} role="alert">*{errors.email?.message}</p>
            )} */}
              </Form.Group>

              <Form.Label>Select Date</Form.Label>
              <div className="setDate">
                <BiCalendarEdit onClick={() => setOpenDate(!openDate)} />
                <span>{`${format(meetingDate, "dd/MM/yyyy")}`}</span>
                {
                  openDate && (
                    <DatePicker type="text" onChange={onDateChange} name='meetingDate' value={ meetingDate} minDate={new Date()} />
                  )
                }
              </div>

              <div className='mt-3'>
                {/* <input type='submit'>Submit</input> */}
                {/* <Button style={{ width: "100%" }} onClick={submitForm}>Submit</Button> */}
                <Button style={{ width: "100%" }} type='submit'>Submit</Button>
              </div>



            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeetingForm