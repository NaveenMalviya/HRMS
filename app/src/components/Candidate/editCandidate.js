// editCandidate.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
import Modal from 'react-modal';
import { BASE_API_URL } from '../../lib/constants';

const ModalBox = ({ isOpen, onRequestClose, candidateId }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        if (isOpen && candidateId) {
            console.log('modal open', candidateId);
            // Fetch data for the given candidateId
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${BASE_API_URL}candidate/getcandidatebyid?id=${candidateId}`);
                    setData(response.data.data);
                    console.log('data', response.data.data);
                } catch (error) {
                    console.error('Error fetching candidate data:', error);
                }
            };

            fetchData();
        }else{
            console.log("not open");
            
            console.log(`${isOpen} and ${candidateId}`);
            
        }
    }, [isOpen, candidateId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${BASE_API_URL}candidate/updateCandidate`, data);
            console.log('Updated data:', response.data);
            onRequestClose(); // Close the modal after updating
        } catch (error) {
            console.error('Error updating candidate:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    width: '90%',
                    height: '90%',
                    // margin: 'auto',
                    marginLeft:'200px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    padding: '20px'
                },
            }}
        >

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="signup-form">
                        <form onSubmit={handleSubmit} className="mt-5 border p-4 bg-light shadow">
            <button onClick={onRequestClose}>Close</button>
                            <div style={{ textAlign: 'center' }}>
                                <h4 className="mb-5 text-secondary">Edit Candidate</h4>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <input
                                        type="text"
                                        name="candidate_first_name"
                                        value={data.candidate_first_name || 'default'}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <input
                                        type="text"
                                        name="candidate_last_name"
                                        value={data.candidate_last_name || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <input
                                        type="text"
                                        name="candidate_mobile"
                                        value={data.candidate_mobile || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Mobile Number"
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <input
                                        type="email"
                                        name="candidate_email"
                                        value={data.candidate_email || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <input
                                        type="text"
                                        name="candidate_skills"
                                        value={data.candidate_skills || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Skills"
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <input
                                        type="text"
                                        name="candidate_experience"
                                        value={data.candidate_experience || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Experience"
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <input
                                        type="text"
                                        name="candidate_expected_salary"
                                        value={data.candidate_expected_salary || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Expected Salary"
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <input
                                        type="date"
                                        name="candidate_expected_joining_date"
                                        value={data.candidate_expected_joining_date || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalBox;
