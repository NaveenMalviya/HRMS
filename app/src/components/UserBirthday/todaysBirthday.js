import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { todaysBirthday } from './birthday.js'; 
import Nav from '../Navbar/navbar.js';
import Footer from '../Footer/footer.js';

const TodaysBirthdays = () => {
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
    <div>
      <Nav />
      <div style={{ backgroundColor: '#28769a', textAlign: 'center' }}>
        <h1 className="headerUser">TODAY'S BIRTHDAYS</h1>
      </div>
      <div className="birthday-list">
        {todaysBirthdays.length > 0 ? (
          todaysBirthdays.map((birthday, index) => (
            <div key={index} className="birthday-item">
              <h2>{birthday.name}</h2>
              <p>Happy Birthday!</p>
            </div>
          ))
        ) : (
          <p>No birthdays today.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TodaysBirthdays;
