import React from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div className="logo-section">
            <h1 className="logo"><Link to="/user"   className="nav-item"> HRMS </Link></h1>
            </div>

            <div className="menu-desktop">
                <ul className="main-menu">
                    {localStorage.getItem('role') === 'user' ? (
                        <>
                            <li><Link to="/user/employee" className="nav-item">Employee</Link></li>
                            <li><Link to="/user/candidate" className="nav-item">Candidate</Link></li>
                            <li><Link to="/user/helpcenter" className="nav-item">HelpCenter</Link></li>
                            <li><Link to="/user/expenses" className="nav-item">Expenses</Link></li>
                            <li><Link to="/user/consultancy" className="nav-item">Consultancy</Link></li>
                            <li><Link to="/user/skills" className="nav-item">Skills</Link></li>
                            <li><Link to="/user/profile" className="nav-item">Profile</Link></li>
                            <li><Link to="/user/birthday" className="nav-item">Birthday</Link></li>
                            <li><Link to="/user/Todaybirthday" className="nav-item">TBirthday</Link></li>
                            <li className="nav-item" onClick={logout}>Logout</li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/admin" className="nav-item">Admin</Link></li>
                            <li><Link to="/admin-user" className="nav-item">User</Link></li>
                            <li><Link to="/admin/changepassword" className="nav-item">Change Password</Link></li>
                            <li><Link to="/edit-profile" className="nav-item">Edit Profile</Link></li>
                            <li><Link to="/admin/admin-about" className="nav-item">About</Link></li>
                            <li className="nav-item" onClick={logout}>Logout</li>
                        </>
                    )}
                </ul>
            </div>
        </aside>
    );
};

export default Nav;
