import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ModalBox from './editConsultancy.js';
import Nav from '../../components/Navbar/navbar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import { faEdit, faTrashAlt, faTrash, faSortUp, faSortDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Footer/footer.js';
import { BASE_API_URL } from '../../lib/constants.js';
import { Link } from 'react-router-dom';


const Consultancy = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tableData, settableData] = useState([]);
    const [togle, settogle] = useState([true]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedConsultancyId, setSelectedConsultancyId] = useState(null);
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

    const openModal = (consultancyId) => {
        console.log('consultancyId', consultancyId)
        setModalIsOpen(true);
        setSelectedConsultancyId(consultancyId);

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
            const response = await axios.delete(`${BASE_API_URL}consultancy/multidelete`, {
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
        if (!formData.consultancy_name.trim()) {
            newErrors.consultancy_name = "This is a required field";
            isValid = false;
        }

        if (!formData.consultancy_email.trim()) {
            newErrors.consultancy_email = "This is a required field";
            isValid = false;
        }

        if (!formData.consultancy_address.trim()) {
            newErrors.consultancy_address = "This is a required field";
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
        consultancy_name: "",
        consultancy_email: "",
        consultancy_address: "",

    });
    const [formData, setFormData] = useState({
        consultancy_name: "",
        consultancy_email: "",
        consultancy_address: "",
        consultancy_website_url: "",
        consultancy_mobile: '',
        consultancy_alternate_mobile: "",
        consultancy_city: "",
        consultancy_state: "",
        contract_agreement: "",
        contract_person_name: '',
        contract_linkedIn_Profile: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}consultancy/getconsultancy`);

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
                const response = await axios.post(`${BASE_API_URL}consultancy/createconsultancy`, formData);
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
                const response = axios.delete(`${BASE_API_URL}consultancy/deleteconsultancy/?id=${id}`)

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
                                                            <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Create Consultancy</h4>
                                                            <button style={{ float: 'right', fontSize: '20px', backgroundColor: '#ddc7c7', border: 'none' }} className="close" onClick={closePopup}>&times;</button>
                                                        </div>
                                                        <div class="row">
                                                            <div class="mb-3 col-md-6">
                                                                <input type="text" name="consultancy_name" value={formData.consultancy_name} onChange={handleInputChange} class="form-control" placeholder="Consultancy Name" />
                                                                {errors.consultancy_name && <span className="error" style={{ color: 'red' }}>{errors.consultancy_name}</span>}
                                                            </div>
                                                            <div class="mb-3 col-md-6">
                                                                <input type="email" name="consultancy_email" value={formData.consultancy_email} onChange={handleInputChange} class="form-control" placeholder="Consultancy Email" />
                                                                {errors.consultancy_email && <span className="error" style={{ color: 'red' }}>{errors.consultancy_email}</span>}
                                                            </div>
                                                            <div class="mb-3 col-md-6">
                                                                <input type="address" name="consultancy_address" value={formData.consultancy_address} onChange={handleInputChange} class="form-control" placeholder="Address" />
                                                                {errors.consultancy_address && <span className="error" style={{ color: 'red' }}>{errors.consultancy_address}</span>}
                                                            </div>
                                                            <div class="mb-3 col-md-6">
                                                                <input type="url" name="consultancy_website_url" value={formData.consultancy_website_url} onChange={handleInputChange} class="form-control" placeholder="Website" />
                                                            </div>
                                                            <div class="mb-3 col-md-6">
                                                                <input type="text" name="consultancy_mobile" value={formData.consultancy_mobile} onChange={handleInputChange} class="form-control" placeholder="Mobile number" />
                                                            </div>
                                                            <div class="mb-3 col-md-6">
                                                                <input type="text" name="consultancy_alternate_mobile" value={formData.consultancy_alternate_mobile} onChange={handleInputChange} class="form-control" placeholder="Alternative number" />
                                                            </div>
                                                            <div class="mb-3 col-md-6">
                                                                <input type="text" name="consultancy_city" value={formData.consultancy_city} onChange={handleInputChange} class="form-control" placeholder="City" />
                                                            </div>
                                                            <div class="mb-3 col-md-6">
                                                                <input type="text" name="consultancy_state" value={formData.consultancy_state} onChange={handleInputChange} class="form-control" placeholder="State" />
                                                            </div>
                                                            <div class="mb-3 col-md-6">
                                                                <input type="text" name="contract_agreement" value={formData.contract_agreement} onChange={handleInputChange} class="form-control" placeholder="Contract Agreement" />
                                                            </div>
                                                            <div class="mb-3 col-md-6">
                                                                <input type="text" name="contract_person_name" value={formData.contract_person_name} onChange={handleInputChange} class="form-control" placeholder="Contract Person Name" />
                                                            </div>
                                                            <div class="mb-3 col-md-6">
                                                                <input type="text" name="contract_linkedIn_Profile" value={formData.contract_linkedIn_Profile} onChange={handleInputChange} class="form-control" placeholder="LinkdIn Profile" />
                                                            </div>

                                                            <span style={{ color: 'green' }}>{message && <p>{message}</p>}</span>

                                                        </div>
                                                        <div class="col-md-12">
                                                            <button type="submit">Create Consultancy</button>
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
                        <h2>WELCOME TO CONSULTANCY PAGE</h2>
                        <table className="client-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADDRESS</th>
                                    <th>Action</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody className="customtable">
                                {currentItems.map((data, index) => (
                                    <tr key={index}>

                                        <td>{data._id}</td>
                                        <td>{data.consultancy_name}</td>
                                        <td>{data.consultancy_email}</td>
                                        <td>{data.consultancy_address}</td>
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
                                        <ModalBox isOpen={modalIsOpen} consultancyId={selectedConsultancyId} onRequestClose={closeModal}>
                                            <h2>Modal Title</h2>
                                            <p>Modal Content</p>
                                        </ModalBox>
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

export default Consultancy;
