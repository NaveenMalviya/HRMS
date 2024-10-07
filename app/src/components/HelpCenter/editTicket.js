// editExpenses.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../lib/constants';
const ModalBox = ({ isOpen, onRequestClose, ticketId }) => {
    // ModalBox code here

    const [data, setData] = useState([])
    useEffect(() => {

        if (isOpen) {
            console.log('model open', ticketId)
            // Fetch data for the given ticketId
            if (ticketId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}helpcenter/getTicketById?id=${ticketId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching ticket data:', error);
                    }
                };

                fetchData();
            }
        }
    }, [isOpen]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        console.log("data", data)
        e.preventDefault();
        // Handle form submission here
        try {
            const response = axios.put(`${BASE_API_URL}helpcenter/updateTicket`, data);
            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            style={{
                overlay: {

                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    width: '90%',
                    height: '90%',
                    margin: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    padding: '20px'
                }
            }}
        >

            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="signup-form">
                        <form onSubmit={handleSubmit} class="mt-5 border p-4 bg-light shadow">
            <button onClick={onRequestClose}>Close</button>
                            <div style={{ textAlign: 'center' }}>
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit Ticket</h4>
                            </div>
                            <div class="row">
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="helpcenter_ticket_id" value={data.helpcenter_ticket_id} onChange={handleInputChange} class="form-control" placeholder="Ticket Id" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="helpcenter_employee_id" value={data.helpcenter_employee_id} onChange={handleInputChange} class="form-control" placeholder="Employee Id" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="helpcenter_employee_code" value={data.helpcenter_employee_code} onChange={handleInputChange} class="form-control" placeholder="Employee Code" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="helpcenter_ticket_description" value={data.helpcenter_ticket_description} onChange={handleInputChange} class="form-control" placeholder="Description" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="helpcenter_ticket_priority" value={data.helpcenter_ticket_priority} onChange={handleInputChange} class="form-control" placeholder="Ticket Priority" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="helpcenter_ticket_department" value={data.helpcenter_ticket_department} onChange={handleInputChange} class="form-control" placeholder="Department" />
                                </div>
                                <div class="mb-3 col-md-6">
                                <label >Date of Ticket Created</label>
                                    <input type="date" name="helpcenter_ticket_created_date" value={data.helpcenter_ticket_created_date} onChange={handleInputChange} class="form-control"  />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="helpcenter_ticket_status" value={data.helpcenter_ticket_status} onChange={handleInputChange} class="form-control" placeholder="Ticket Status" />
                                </div>
                                
                                <div class="mb-3 col-md-6" style={{ textAlign: 'left' }}>
                                                                            <label >Date of Ticket Solved</label>
                                                                            <input type="date" name="helpcenter_ticket_solved_date" value={data.helpcenter_ticket_solved_date} onChange={handleInputChange} class="form-control" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="helpcenter_ticket_solved_by" value={data.helpcenter_ticket_solved_by} onChange={handleInputChange} class="form-control" placeholder="Ticket Solved By" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="helpcenter_ticket_managed_by" value={data.helpcenter_ticket_managed_by} onChange={handleInputChange} class="form-control" placeholder="Ticket Managed By" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="helpcenter_solve_duration" value={data.helpcenter_solve_duration} onChange={handleInputChange} class="form-control" placeholder="Ticket Solved Duration" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <button type="submit">Edit here</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalBox;  // Default export
