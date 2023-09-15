import React from 'react'
import Card from "react-bootstrap/Card";
import cardsData from "../../../data/adminData"

function AdminDashboard() {
    console.log(cardsData);
    return (
        <div>
            <div className="cards-div d-flex m-4">
                {
                    cardsData.map((e) => {
                        return (
                            <Card style={{ height: "8rem", width: "16rem", marginLeft: "8px",backgroundColor:`${e.bg}` }}>
                                <Card.Body className='d-flex justify-content-around'>
                                    <div className='w-25 justify-content-center'>
                                        <h1>{e.icon}</h1>

                                    </div>
                                    <div>
                                        <h3>{e.data}</h3>
                                        <h6>{e.title}</h6>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default AdminDashboard