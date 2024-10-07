import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
import Modal from 'react-modal';
import { BASE_API_URL } from '../../lib/constants';

const EditProfile = ({ isOpen, onRequestClose, profileId }) => {
    const [data, setData] = useState({ profile: '', profile_id: '' });

    useEffect(() => {
        if (isOpen && profileId) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${BASE_API_URL}profile/getprofilebyid?id=${profileId}`);
                    setData(response.data.data || { profile: '', profile_id: '' });
                    console.log('Profile data fetched:', response.data.data);
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                }
            };

            fetchData();
        }
    }, [isOpen, profileId]);

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
            const response = await axios.put(`${BASE_API_URL}profile/updateprofile`, data);
            console.log('Profile updated:', response.data); // Handle the response as needed
        } catch (error) {
            console.error('Error updating profile:', error);
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
                    margin: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    padding: '20px',
                },
            }}
        >

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="signup-form">
                        <form onSubmit={handleSubmit} className="mt-5 border p-4 bg-light shadow">
            <button onClick={onRequestClose}>Close</button>
                            <div style={{ textAlign: 'center' }}>
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">
                                    Edit Profile
                                </h4>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6">
                                    <input
                                        type="text"
                                        name="profile"
                                        value={data.profile || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Profile"
                                    />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <input
                                        type="text"
                                        name="profile_id"
                                        value={data.profile_id || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="Profile ID"
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary">Edit Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default EditProfile;
