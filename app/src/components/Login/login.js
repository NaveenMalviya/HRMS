// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { BASE_API_URL } from '../../lib/constants.js';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import './login.css';

// const Login = () => {
//     const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
//     const [form, setForm] = useState({
//         email: "",
//         password: "",
//     });
//     const [errors, setErrors] = useState({
//         email: "",
//         password: "",
//     });
//     const [msg, setmsg] = useState('');
//     const navigate = useNavigate();
//     const onUpdateField = e => {
//         const { name, value } = e.target;
//         setForm({
//             ...form,
//             [name]: value,
//         });
//         // Clear validation error when user starts typing
//         setErrors({
//             ...errors,
//             [name]: "",
//         });
//     };

//     const validateForm = () => {
//         let isValid = true;
//         const newErrors = {};

//         if (!form.email.trim()) {
//             newErrors.email = "Email is required";
//             isValid = false;
//         }

//         if (!form.password.trim()) {
//             newErrors.password = "Password is required";
//             isValid = false;
//         }

//         setErrors(newErrors);
//         return isValid;
//     };
//     const onSubmitForm = async e => {
//         e.preventDefault();
//         if (validateForm()) {
//             try {
//                 const response = await fetch(`${BASE_API_URL}user/login-auth`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(form),
//                 });
//                 const data = await response.json();
//                 setmsg(data.msg)  // Display the message from login response

//                 if (response.ok) {
//                     // Handle successful login
//                     console.log(data.user._id);

//                     const authToken = data.authToken; // Get the token from the response
//                 localStorage.setItem("token", authToken); // Save token in localStorage
//                     // Fetch the user data after successful login
//                     try {
//                         const response = await fetch(`${BASE_API_URL}user/getuserbyid?userid=${data.user._id}`, {
//                             method: 'GET',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                                 'Authorization': authToken, // Send token with request
//                             },
//                         });


//                         // Check if the response is successful
//                         if (!response.ok) {
//                             throw new Error('Failed to fetch user data');
//                         }

//                         const userData = await response.json();
//                         console.log("User data:", userData);

//                         // Save user data in localStorage
//                         const name = userData.data.fname + " " + userData.data.lname;
//                         localStorage.setItem("_id", userData.data._id);
//                         localStorage.setItem("name", name);
//                         localStorage.setItem("email", userData.data.email);
//                         localStorage.setItem("password", userData.data.password);
//                         localStorage.setItem("role", userData.data.role);

//                         // Navigate based on user role
//                         if (userData.data.role === "admin") {
//                             navigate('/admin');
//                         } else {
//                             navigate('/user');
//                         }

//                     } catch (err) {
//                         // Handle fetch user data errors
//                         console.error("Error fetching user data:", err);
//                     }

//                 } else {
//                     // Handle unsuccessful login
//                     console.error('Login failed');
//                     setmsg("Login failed, please check your credentials.");
//                 }
//             } catch (error) {
//                 console.error('Error occurred:', error);
//                 setmsg("An error occurred during login.");
//             }
//         }
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };
//     return (
//         <>
//             <div className="login-page">
//                 <div className="login-container">
//                     <div className="login-form-container">
//                         <h1>Hello, <br /> welcome!</h1>
//                         <form onSubmit={onSubmitForm}>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     name="email"
//                                     placeholder="Email address"
//                                     value={form.email}
//                                     onChange={onUpdateField}
//                                     className="form-input"
//                                 />
//                                 {errors.email && <span className="error">{errors.email}</span>}
//                             </div>
//                             <div className="form-group password-group">
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     name="password"
//                                     placeholder="Password"
//                                     value={form.password}
//                                     onChange={onUpdateField}
//                                     className="form-input"
//                                 />
//                                 <FontAwesomeIcon
//                                     icon={showPassword ? faEyeSlash : faEye}
//                                     onClick={togglePasswordVisibility}
//                                     className="password-toggle-icon"
//                                 />
//                                 {errors.password && <span className="error">{errors.password}</span>}
//                             </div>
//                             <div className="form-actions">
//                                 <button type="submit" className="login-btn">Login</button>
//                                 <Link to='/signup' className='signup-btn'>Sign up</Link>
//                                 {/* <button className="signup-btn">Sign up</button> */}
//                             </div>
//                         </form>
//                     </div>
//                     <div className="login-image-container">

//                     </div>
//                 </div>
//             </div>
//         </>)
// }

// export default Login




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../lib/constants.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../../assets/css/tailwind.output.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const onUpdateField = e => {
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

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${BASE_API_URL}user/login-auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });
                const data = await response.json();
                setMsg(data.msg);

                if (response.ok) {
                    const authToken = data.authToken;
                    localStorage.setItem("token", authToken);

                    try {
                        const userResponse = await fetch(`${BASE_API_URL}user/getuserbyid?userid=${data.user._id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': authToken,
                            },
                        });

                        if (!userResponse.ok) {
                            throw new Error('Failed to fetch user data');
                        }

                        const userData = await userResponse.json();
                        const name = `${userData.data.fname} ${userData.data.lname}`;
                        localStorage.setItem("_id", userData.data._id);
                        localStorage.setItem("name", name);
                        localStorage.setItem("email", userData.data.email);
                        localStorage.setItem("role", userData.data.role);

                        // Navigate based on user role
                        if (userData.data.role === "admin") {
                            navigate('/admin');
                        } else {
                            navigate('/user');
                        }

                    } catch (err) {
                        console.error("Error fetching user data:", err);
                    }

                } else {
                    console.error('Login failed');
                    setMsg("Login failed, please check your credentials.");
                }
            } catch (error) {
                console.error('Error occurred:', error);
                setMsg("An error occurred during login.");
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img
                            aria-hidden="true"
                            className="object-cover w-full h-full dark:hidden"
                            src="../assets/img/login-office.jpeg"
                            alt="Office"
                        />
                        <img
                            aria-hidden="true"
                            className="hidden object-cover w-full h-full dark:block"
                            src="../assets/img/login-office-dark.jpeg"
                            alt="Office"
                        />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
                            <label className="block text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Email</span>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Jane Doe"
                                    value={form.email}
                                    onChange={onUpdateField}
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </label>
                            <label className="block mt-4 text-sm">
                                <span className="text-gray-700 dark:text-gray-400">Password</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="***************"
                                    value={form.password}
                                    onChange={onUpdateField}
                                    className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    onClick={togglePasswordVisibility}
                                    className="password-toggle-icon"
                                />
                                {errors.password && <span className="error">{errors.password}</span>}
                            </label>

                            <button
                                type="submit"
                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                onClick={onSubmitForm}
                            >
                                Log in
                            </button>

                            <hr className="my-8" />

                            <p className="mt-4">
                                <Link
                                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                    to="./forgot-password.html"
                                >
                                    Forgot your password?
                                </Link>
                            </p>
                            <p className="mt-1">
                                <Link
                                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                                    to='/signup'
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
