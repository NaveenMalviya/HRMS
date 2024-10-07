import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import EditProfile from './editProfile.js';
import Nav from '../../components/Navbar/navbar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import { faEdit, faTrashAlt, faTrash, faSortUp, faSortDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/footer.js';
import { BASE_API_URL } from '../../lib/constants.js';
import { Link } from 'react-router-dom';


const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tableData, settableData] = useState([]);
    const [togle, settogle] = useState([true]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProfileId, setSelectedProfileId] = useState(null);
    const [message, setMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('ascending');
    const [ids, setId] = useState([]);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected); // Update the current page when pagination changes
    };

    const itemsPerPage = 5; // Number of items to display per page
    const offset = currentPage * itemsPerPage;
    const pageCount = tableData?.length ? Math.ceil(tableData.length / itemsPerPage) : 0;
    const currentItems = tableData?.length ? tableData.slice(offset, offset + itemsPerPage) : [];
    // const currentItems = tableData.slice(offset, offset + itemsPerPage);

    // const [data, setData] = useState(formData);

    const openModal = (profileId) => {
        console.log('profileId', profileId)
        setModalIsOpen(true);
        setSelectedProfileId(profileId);

    };

    const handleSort = (column) => {
        if (column === sortColumn) {
            // If the same column is clicked again, reverse the sorting direction
            setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
        } else {
            // If a new column is clicked, set it as the sorting column and reset the direction
            setSortColumn(column);
            setSortDirection('ascending');
        }
    };
    const sortedData = () => {
        if (sortColumn) {
            const sorted = [...tableData].sort((a, b) => {
                const valueA = a[sortColumn];
                const valueB = b[sortColumn];
                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    // Case-insensitive string comparison
                    return sortDirection === 'ascending' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                } else {
                    // Numerical or other comparison
                    return sortDirection === 'ascending' ? valueA - valueB : valueB - valueA;
                }
            });
            return sortDirection === 'ascending' ? sorted : sorted.reverse();
        }
        return tableData; // Return original data if no sorting column is selected
    };

    const handleCheckboxChange = (e, id) => {
        // If the checkbox is checked, add the ID to the list of selected IDs
        if (e.target.checked) {
            setId(prevIds => [...prevIds, id]);
        } else {
            // If the checkbox is unchecked, remove the ID from the list of selected IDs
            setId(prevIds => prevIds.filter(prevId => prevId !== id));
        }
    };

    const Deletemulti = async () => {
        const data = {
            "ids": ids
        };
        console.log('ids', data);

        try {
            const response = await axios.delete(`${BASE_API_URL}profile/multidelete`, {
                data: data // IDs ko data body mein bhejna
            });
            console.log(response.data); // Response ke saath kuch karne ke liye
            settogle(!togle);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        if (!formData.profile.trim()) {
            newErrors.profile = "This is a required field";
            isValid = false;
        }

        if (!formData.profile_id.trim()) {
            newErrors.profile_id = "This is a required field";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };


    const closeModal = () => {
        settogle(!togle)
        setModalIsOpen(false);
    };
    const [errors, setErrors] = useState({
       profile: "",
        profile_id: "",

    });
    const [formData, setFormData] = useState({
        profile: "",
        profile_id: "",
       
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}profile/getprofiles`);

                console.log(response); // Handle the response as needed
                settableData(response.data.data)
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [togle]);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here, for example, send data to backend or perform validation
        console.log('', formData);
        if (validateForm()) {
            try {
                const response = await axios.post(`${BASE_API_URL}profile/createprofile`, formData);
                settogle(!togle)
                console.log(response.data); // Handle the response as needed
                setMessage(response.data.msg);


            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log("Form Validation failed");

        }
    };
    const DeleteData = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // Check if the user confirmed
        if (isConfirmed) {
            // Delete logic here
            try {
                console.log('id', id)
                const response = axios.delete(`${BASE_API_URL}profile/deleteprofile?id=${id}`)

                console.log(response.data); // Handle the response as needed
                settogle(!togle)

            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // User canceled the action
            console.log('Deletion canceled');
        } console.log('', id)

    }
    return (
        <>
            <div className="dashboard-container">
                <Nav />
                <main className="main-content">

                    <div class="card-body text-center">

                        <div>
                            <button className="backButton" onClick={openPopup}>
                                Add &nbsp;<FontAwesomeIcon icon={faPlusCircle} />
                            </button>
                        </div>
                        <div> <span> <button className="multiDeleteButton" onClick={() => { Deletemulti() }}    >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button></span></div>
                        {isOpen && (
                            <div>
                                <div>
                                    <div>
                                        <div class="row">
                                            <div class="col-md-6 offset-md-3">
                                                <div class="signup-form">


                                                <form onSubmit={handleSubmit} class="mt-5 border p-4 bg-light shadow">
                                                                    <div style={{ textAlign: 'center' }}>
                                                                        <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Create Profile</h4>
                                                                        <button style={{ float: 'right', fontSize: '20px', backgroundColor: '#ddc7c7', border: 'none' }} className="close" onClick={closePopup}>&times;</button>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="profile" value={formData.profile} onChange={handleInputChange} class="form-control" placeholder="profile" />
                                                                            {errors.profile && <span className="error" style={{ color: 'red' }}>{errors.profile}</span>}
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="profile_id" value={formData.profile_id} onChange={handleInputChange} class="form-control" placeholder="profile_id" />
                                                                            {errors.profile_id && <span className="error" style={{ color: 'red' }}>{errors.profile_id}</span>}
                                                                        </div>

                                                                        <span style={{ color: 'green' }}>{message && <p>{message}</p>}</span>

                                                                    </div>
                                                                    <div class="col-md-12">
                                                                        <button type="submit">Add Profile</button>
                                                                    </div>
                                                                </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>       </div>
                            </div>
                        )}
                    </div>

                    <section className="clients">
                        <h2>WELCOME TO PROFILE PAGE</h2>
                        <table className="client-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Profile</th>
                                    <th>profile_id</th>
                                    <th>Action</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody className="customtable">
                            {currentItems.map((data, index) => (
                                                <tr key={index}>

                                                    <td>{data._id}</td>
                                                    <td>{data.profile}</td>
                                                    <td>{data.profile_id}</td>
                                                    <td>
                                                        <button className="editButton" onClick={() => DeleteData(data._id)} >  <FontAwesomeIcon icon={faTrash} /></button>
                                                        <button className="editButton" onClick={() => openModal(data._id)} >
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <label className="customcheckbox">
                                                            <input type="checkbox" className="listCheckbox" onChange={(e) => handleCheckboxChange(e, data._id)} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </td>
                                                    <EditProfile isOpen={modalIsOpen} profileId={selectedProfileId} onRequestClose={closeModal}>
                                                        <h2>Modal Title</h2>
                                                        <p>Modal Content</p>
                                                    </EditProfile>
                                                </tr>
                                            ))}
                            </tbody>
                        </table>
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </section>
                </main>

            </div>
            <Footer />
        </>
    );
};

export default Profile;
