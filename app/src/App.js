import './App.css';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import Nav from './components/Navbar/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHome from './pages/home';
import AdminHome from './pages/adminHome';
import EmployeeModule from './components/Employee/employee'
import ChangePassword from './components/ChangePassword/changePassword';
import CandidateModule from './components/Candidate/candidate';
import Expenses from './components/Expenses/expenses';
import HelpCenter from './components/HelpCenter/helpCenter';
import Consultancy from './components/Consultancy/consultancy';
import Skill from './components/Skills/skill';
import Profile from './components/Profile/profile';
import BirthdayCalendar from './components/UserBirthday/birthday';
import AboutHome from './components/Admin/AdminHome/aboutAdmin';
import TodaysBirthdays from './components/UserBirthday/todaysBirthday';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/nav" element={<Nav />} />
          <Route path="/user" element={<UserHome />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/user/employee" element={<EmployeeModule />} />
          <Route path="/admin/changepassword" element={<ChangePassword />} />
          <Route path="/user/candidate" element={<CandidateModule />} />
          <Route path="/user/expenses" element={<Expenses />} />
          <Route path="/user/helpcenter" element={<HelpCenter />} />
          <Route path="/user/consultancy" element={<Consultancy />} />
          <Route path="/user/skills" element={<Skill />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/birthday" element={<BirthdayCalendar />} />
          <Route path="/user/Todaybirthday" element={<TodaysBirthdays />} />
          <Route path="/admin/admin-about" element={<AboutHome />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
