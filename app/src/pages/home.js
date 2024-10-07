import React, { useState, useEffect } from 'react';
import Nav from '../components/Navbar/navbar';
import './userHome.css'; // Import custom styles for UserHome
import axios from 'axios';
import { todaysBirthday } from '../components/UserBirthday/birthday'; 

const UserHome = () => {
    const [birthdays, setBirthdays] = useState([]);
    const [todaysBirthdays, setTodaysBirthdays] = useState([]);


    useEffect(() => {
        const fetchBirthdays = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/employee/get-dob');
            if (response.data.success) {
              const formattedBirthdays = response.data.data.map((employee) => ({
                name: `${employee.employee_first_name}`,
                date: employee.employee_dob,
              }));
              setBirthdays(formattedBirthdays);
              setTodaysBirthdays(todaysBirthday(formattedBirthdays)); // Use the todaysBirthday function
            }
          } catch (error) {
            console.error('Error fetching birthdays:', error);
          }
        };
    
        fetchBirthdays();
      }, []);
    return (
        <div className="dashboard-container">
            <Nav />
            <main className="main-content">
                <header className="header">
                    <h1>Dashboard</h1>
                </header>
                <section className="stats">
                    <div className="stat-box">
                        <span className="stat-title">Total clients</span>
                        <span className="stat-value">6,389</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-title">Account balance</span>
                        <span className="stat-value">$46,760.89</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-title">Birthday</span>

                        {todaysBirthdays.length > 0 ? (
          todaysBirthdays.map((birthday, index) => (
            <div key={index} className="birthday-item">
              <span className="stat-value">{birthday.name}</span>
            </div>
          ))
        ) : (
            <span className="stat-value">No birthdays</span>
        )}


                        
                    </div>
                    <div className="stat-box">
                        <span className="stat-title">Pending contacts</span>
                        <span className="stat-value">35</span>
                    </div>
                </section>
                <section className="clients">
                    <h2>Client List</h2>
                    <table className="client-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Hans Burger</td>
                                <td>$863.45</td>
                                <td className="approved">Approved</td>
                                <td>6/10/2020</td>
                            </tr>
                            <tr>
                                <td>Jolina Angelie</td>
                                <td>$369.95</td>
                                <td className="pending">Pending</td>
                                <td>6/10/2020</td>
                            </tr>
                            <tr>
                                <td>Sarah Curry</td>
                                <td>$86.00</td>
                                <td className="denied">Denied</td>
                                <td>6/10/2020</td>
                            </tr>
                            <tr>
                                <td>Rulia Joberts</td>
                                <td>$1,276.45</td>
                                <td className="approved">Approved</td>
                                <td>6/10/2020</td>
                            </tr>
                            <tr>
                                <td>Wenzel Dashington</td>
                                <td>$863.45</td>
                                <td className="expired">Expired</td>
                                <td>6/10/2020</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default UserHome;
