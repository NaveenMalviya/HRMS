import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import axios from 'axios'; // For making API requests
import Nav from '../Navbar/navbar.js';
import Footer from '../Footer/footer.js';

import './birthday.css';

const BirthdayCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [birthdays, setBirthdays] = useState([]);

  // Fetch birthdays from the API
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
        }
      } catch (error) {
        console.error('Error fetching birthdays:', error);
      }
    };

    fetchBirthdays();
  }, []);

  // Function to check if a date has a birthday
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const birthday = birthdays.find((bday) => {
        const bdayDate = new Date(bday.date);
        // Compare only month and day, ignore the year
        return bdayDate.getMonth() === date.getMonth() && bdayDate.getDate() === date.getDate();
      });
      if (birthday) {
        return <p className="birthday">{birthday.name}'s Birthday</p>;
      }
    }
    return null;
  };

  // Function to get today's birthdays


  return (
    <div>
      <Nav />
      <div style={{ backgroundColor: '#28769a', textAlign: 'center' }}>
        <h1 className="headerUser">BIRTHDAY CALENDAR</h1>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
          width: '100%',
        }}
      >
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={tileContent} // Add birthday info on the calendar
          style={{ width: '100%' }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default BirthdayCalendar;
