// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { BASE_API_URL } from '../../lib/constants.js';
// import './signup.css';

// const Signup = () => {
//     const [form, setForm] = useState({
//         fname: "",
//         lname: "",
//         email: "",
//         password: "",
//         dob: "",
//         gender: "",
//         standard: "",
//         address: "",
//         city: "",
//         state: "",
//     });
//     const [msg, setMsg] = useState('');
//     const [errors, setErrors] = useState({
//         email: "",
//         password: "",
//     });
//     const navigate = useNavigate();

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

//     const onUpdateField = (e) => {
//         const { name, value } = e.target;
//         setForm({
//             ...form,
//             [name]: value,
//         });
//     };

//     const onSubmitForm = async (e) => {
//         e.preventDefault();
//         if (validateForm()) {
//             try {
//                 const response = await fetch(`${BASE_API_URL}user/signup`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify(form),
//                 });
//                 const data = await response.json();
//                 setMsg(data.msg);
//                 if (response.ok) {
//                     // Redirect to login page or other action after successful signup
//                     navigate('/login');
//                 } else {
//                     console.error('Signup failed');
//                 }
//             } catch (error) {
//                 console.error('Error occurred:', error);
//             }
//         }
//     };

//     return (
//         <div className="signup-page">
//             <div className="signup-container">
//                 <div className="signup-form-container">
//                     <h1>Sign Up</h1>
//                     <form onSubmit={onSubmitForm}>
//                         <div className="form-group-main">
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     name="fname"
//                                     placeholder="First name"
//                                     value={form.fname}
//                                     onChange={onUpdateField}
//                                     className="form-input"
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     name="lname"
//                                     placeholder="Last name"
//                                     value={form.lname}
//                                     onChange={onUpdateField}
//                                     className="form-input"
//                                 />
//                             </div>
//                         </div>

//                         <div className="form-group-main">
//                             <div className="form-group">
//                                 <input
//                                     type="email"
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
//                                     type="password"
//                                     name="password"
//                                     placeholder="Password"
//                                     value={form.password}
//                                     onChange={onUpdateField}
//                                     className="form-input"
//                                 />
//                                 {errors.password && <span className="error">{errors.password}</span>}
//                             </div>
//                         </div>

//                         <div className="form-group-main">
//                             <div className="form-group">
//                                 <input
//                                     type="date"
//                                     name="dob"
//                                     placeholder="Date of Birth"
//                                     value={form.dob}
//                                     onChange={onUpdateField}
//                                     className="form-input"
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     name="gender"
//                                     placeholder="Gender"
//                                     value={form.gender}
//                                     onChange={onUpdateField}
//                                     className="form-input"
//                                 />
//                             </div>
//                         </div>

//                         <div className="form-group-main">
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     name="standard"
//                                     placeholder="Standard"
//                                     value={form.standard}
//                                     onChange={onUpdateField}
//                                     className="form-input"
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     placeholder="Address"
//                                     value={form.address}
//                                     onChange={onUpdateField}
//                                     className="form-input"
//                                 />
//                             </div>
//                         </div>

//                         <div className="form-group-main">
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     name="city"
//                                     placeholder="City"
//                                     value={form.city}
//                                     onChange={onUpdateField}
//                                     className="form-input"
//                                 />
//                             </div>
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     name="state"
//                                     placeholder="State"
//                                     value={form.state}
//                                     onChange={onUpdateField}
//                                     className="form-input"
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-actions">
//                             <button type="submit" className="signup-btn">Signup</button>
//                             <Link to='/login' className='login-btn'>Login</Link>
//                         </div>
//                         {msg && <p className="msg">{msg}</p>}
//                     </form>
//                 </div>
//                 <div className="signup-image-container">

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../../lib/constants.js';
// import './signup.css';
import '../../assets/css/tailwind.output.css'

const Signup = () => {
    const [form, setForm] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        standard: "",
        address: "",
        city: "",
        state: "",
    });
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

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

    const onUpdateField = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${BASE_API_URL}user/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });
                const data = await response.json();
                setMsg(data.msg);
                if (response.ok) {
                    navigate('/login'); // Redirect to login page
                } else {
                    console.error('Signup failed', data.msg);
                    setMsg(data.msg || "Signup failed");
                }
            } catch (error) {
                console.error('Error occurred:', error);
                setMsg("An error occurred during signup");
            }
        }
    };

    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img
                            aria-hidden="true"
                            className="object-cover w-full h-full dark:hidden"
                            src="../assets/img/create-account-office.jpeg"
                            alt="Office"
                        />
                        <img
                            aria-hidden="true"
                            className="hidden object-cover w-full h-full dark:block"
                            src="../assets/img/create-account-office-dark.jpeg"
                            alt="Office"
                        />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Create account
                            </h1>
                            <form onSubmit={onSubmitForm}>
                                <div className="form-group-main">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="fname"
                                            placeholder="First name"
                                            value={form.fname}
                                            onChange={onUpdateField}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="lname"
                                            placeholder="Last name"
                                            value={form.lname}
                                            onChange={onUpdateField}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group-main">
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email address"
                                            value={form.email}
                                            onChange={onUpdateField}
                                            className="form-input"
                                            required
                                        />
                                        {errors.email && <span className="error">{errors.email}</span>}
                                    </div>
                                    <div className="form-group password-group">
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={form.password}
                                            onChange={onUpdateField}
                                            className="form-input"
                                            required
                                        />
                                        {errors.password && <span className="error">{errors.password}</span>}
                                    </div>
                                </div>

                                <div className="form-group-main">
                                    <div className="form-group">
                                        <input
                                            type="date"
                                            name="dob"
                                            placeholder="Date of Birth"
                                            value={form.dob}
                                            onChange={onUpdateField}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="gender"
                                            placeholder="Gender"
                                            value={form.gender}
                                            onChange={onUpdateField}
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <div className="form-group-main">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="standard"
                                            placeholder="Standard"
                                            value={form.standard}
                                            onChange={onUpdateField}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="address"
                                            placeholder="Address"
                                            value={form.address}
                                            onChange={onUpdateField}
                                            className="form-input"
                                        />
                                    </div>
                                </div>

                                <div className="flex mt-6 text-sm">
                                    <label className="flex items-center dark:text-gray-400">
                                        <input
                                            type="checkbox"
                                            className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                            required
                                        />
                                        <span className="ml-2">I agree to the <span className="underline">privacy policy</span></span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                >
                                    Create account
                                </button>
                            </form>

                            {msg && <p className="mt-4 text-sm text-red-500">{msg}</p>}
                            <p className="mt-4">
                                <Link to="/login" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                                    Already have an account? Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
