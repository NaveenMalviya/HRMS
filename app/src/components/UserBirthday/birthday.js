import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import axios from 'axios'; 
import Nav from '../Navbar/navbar.js';
import Footer from '../Footer/footer.js';

import './birthday.css';

// Function to get today's birthdays
const todaysBirthday = (birthdays) => {
  const today = new Date();
  return birthdays.filter((birthday) => {
    const bdayDate = new Date(birthday.date);
    return bdayDate.getDate() === today.getDate() && bdayDate.getMonth() === today.getMonth();
  });
};

// Function to get all birthdays
const allBirthdays = (birthdays) => {
  return birthdays.map((birthday) => ({
    name: birthday.name,
    date: new Date(birthday.date).toLocaleDateString(),
  }));
};

const BirthdayCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [birthdays, setBirthdays] = useState([]);

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

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const birthday = birthdays.find((bday) => {
        const bdayDate = new Date(bday.date);
        return bdayDate.getMonth() === date.getMonth() && bdayDate.getDate() === date.getDate();
      });
      if (birthday) {
        return <p className="birthday">{birthday.name}'s Birthday</p>;
      }
    }
    return null;
  };

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
          tileContent={tileContent}
          style={{ width: '100%' }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default BirthdayCalendar;

// Export both functions together
export { todaysBirthday, allBirthdays };
