import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import PersonaSelection from './PersonaSelection.jsx';
import ParentForm from './components/ParentForm.jsx';
import ProfessionalForm from './components/ProfessionalForm.jsx';
import CollegeStudentForm from './components/CollegeStudentForm.jsx';
import PersonalGrowthForm from './components/PersonalGrowthForm.jsx';
import FindingCourseAnimation from './components/FindingCourseAnimation.jsx';
import SinglePage from './components/single-page.jsx';
import './index.css'
import { FaGripLines } from 'react-icons/fa'; // Not needed here, just in single-page.jsx
import ScrollToTop from './components/ScrollToTop';
import BookAppointment from './components/book-appointment.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/persona-selection" element={<PersonaSelection />} />
        <Route path="/persona/parent" element={<ParentForm />} />
        <Route path="/persona/professional" element={<ProfessionalForm />} />
        <Route path="/persona/college-student" element={<CollegeStudentForm />} />
        <Route path="/persona/personal-growth" element={<PersonalGrowthForm />} />
        <Route path="/finding-course" element={<FindingCourseAnimation />} />
        <Route path="/single-page" element={<SinglePage />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)