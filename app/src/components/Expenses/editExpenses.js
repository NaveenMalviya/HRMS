// editExpenses.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../lib/constants';
const ModalBox = ({ isOpen, onRequestClose, expensesId }) => {
    // ModalBox code here

    const [data, setData] = useState([])
    useEffect(() => {

        if (isOpen) {
            console.log('model open', expensesId)
            // Fetch data for the given expensesId
            if (expensesId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}expenses/getById?id=${expensesId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching employee data:', error);
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
            const response = axios.put(`${BASE_API_URL}expenses/update`, data);
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
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit Expense</h4>
                            </div>
                            <div class="row">
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="transaction_id" value={data.transaction_id} onChange={handleInputChange} class="form-control" placeholder="Transaction Id" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="expenses_purpose" value={data.expenses_purpose} onChange={handleInputChange} class="form-control" placeholder="Expense Purpose" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="expenses_bill" value={data.expenses_bill} onChange={handleInputChange} class="form-control" placeholder="Expense Bill" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="expenses_amount" value={data.expenses_amount} onChange={handleInputChange} class="form-control" placeholder="Expense Amount" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="expenses_voucher" value={data.expenses_voucher} onChange={handleInputChange} class="form-control" placeholder="Expense Voucher" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="expenses_remark" value={data.expenses_remark} onChange={handleInputChange} class="form-control" placeholder="Expense Remark" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="expenses_by_cash" value={data.expenses_by_cash} onChange={handleInputChange} class="form-control" placeholder="Expense by Cash" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="expenses_by_cheque" value={data.expenses_by_cheque} onChange={handleInputChange} class="form-control" placeholder="Expense by Cheque" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="expenses_cash_recieved_by" value={data.expenses_cash_recieved_by} onChange={handleInputChange} class="form-control" placeholder="Expense Cash received By" />
                                </div>
                                <div class="mb-3 col-md-6" style={{ textAlign: 'left' }}>
                                                                            <label >Date of Expense</label>
                                                                            <input type="date" name="date_of_expenses" value={data.date_of_expenses} onChange={handleInputChange} class="form-control" />
                                                                        </div>
                            </div>
                            <div class="col-md-12">
                                <button type="submit">EDit here</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalBox;  // Default export
