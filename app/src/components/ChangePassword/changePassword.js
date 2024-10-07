import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../lib/constants.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './changePassword.css';

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        currentPassword: "", // renamed from oldPassword to match the expected API structure
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const onUpdateField = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        if (!form.currentPassword.trim()) { // updated for currentPassword
            newErrors.currentPassword = "Current password is required";
            isValid = false;
        }

        if (!form.newPassword.trim()) {
            newErrors.newPassword = "New password is required";
            isValid = false;
        }

        if (!form.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm password is required";
            isValid = false;
        }

        if (form.newPassword !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from local storage
                if (!token) {
                    setMsg('Authentication token is missing.');
                    return;
                }

                const response = await fetch(`${BASE_API_URL}user/changepass`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token, // Send token in Authorization header
                    },
                    body: JSON.stringify(form), // Payload now matches the API
                });
                const userData = await response.json();
                console.log(userData);
                setMsg(userData.msg);
                if (response.ok) {
                    console.log("password changed");
                    localStorage.removeItem('password');

                    localStorage.setItem('password', form.newPassword);

                    navigate('/login');
                } else {
                    console.error('Password change failed');
                }
            } catch (error) {
                console.error('Error occurred:', error);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="change-password-page">
            <div className="change-password-container">
                <div className="change-password-form-container">
                    <h1>Change Password</h1>
                    <form onSubmit={onSubmitForm}>
                        <div className='form-group'>
                            <input
                                type={"email"}
                                name='email'
                                placeholder='Email'
                                value={form.email}
                                onChange={onUpdateField}
                                className='form-input'
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="currentPassword" // updated from oldPassword to currentPassword
                                placeholder="Current Password"
                                value={form.currentPassword}
                                onChange={onUpdateField}
                                className="form-input"
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                onClick={togglePasswordVisibility}
                                className="password-toggle-icon"
                            />
                            {errors.currentPassword && <span className="error">{errors.currentPassword}</span>}
                        </div>

                        <div className="form-group password-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                placeholder="New Password"
                                value={form.newPassword}
                                onChange={onUpdateField}
                                className="form-input"
                            />
                            {errors.newPassword && <span className="error">{errors.newPassword}</span>}
                        </div>

                        <div className="form-group password-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                onChange={onUpdateField}
                                className="form-input"
                            />
                            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="change-password-btn">Change Password</button>
                        </div>
                        {msg && <p className="msg">{msg}</p>}
                    </form>
                </div>
                <div className="change-password-image-container">
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
