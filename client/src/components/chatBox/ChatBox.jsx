import { Button } from '@mui/material';
import React, { useState } from 'react'
import FormGroup from 'react-bootstrap/esm/FormGroup';
import Form from "react-bootstrap/Form"
import { BsSend, BsSendPlus } from 'react-icons/bs';

function ChatBox() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  return (
    <div style={{backgroundColor:"lightsalmon", height:"70%"}}>
      <div className="hed">
        <p>Live Chat</p>
      </div>

      <div style={{ height: "100%" }} className="chat__body">

      </div>
      <div style={{display:"flex", width:"100%",backgroundColor:"red"}} className="input__field">
        <Form style={{ display: "flex",width:"100%",justifyContent:"space-between" }}>

          <FormGroup>
            <Form.Control>

            </Form.Control>
          </FormGroup>
          <Button style={{backgroundColor:"blue", width:"20%", color:"white"}}><BsSendPlus/></Button>
        </Form>
      </div>
    </div>
  )
}

export default ChatBox