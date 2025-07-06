import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Footer } from './Footer';
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Our Mentors", href: "#solutions" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "GREAT Approach", href: "#great-framework" },
  { name: "Why Us", href: "#how-we-are-different" },
  { name: "FAQs", href: "#faqs" },
  { name: "Contact", href: "#contact" }
];

function Header({ showExploreCourses = false }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-b-3xl">
      <div className="text-2xl font-extrabold text-red-400">fabulinus</div>
      <div className="flex items-center gap-2">
        {showExploreCourses && (
          <Link
            to="/persona-selection"
            className="bg-red-500 text-white hover:bg-red-600 font-bold px-4 py-2 md:px-8 md:py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 text-sm md:text-base"
            style={{ minWidth: 'auto' }}
          >
            Explore Courses
          </Link>
        )}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center justify-center p-0 m-0 bg-transparent border-none outline-none focus:outline-none">
          <Menu size={32} className="text-red-600" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg">
          <nav className="flex flex-col items-end space-y-4 py-4 pr-6">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={handleNavClick} className="text-red-600 hover:text-red-800 font-medium transition-colors duration-300">{link.name}</a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default function ParentForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    year: '', // renamed from childAge
    goal: '',
    typeOfCourse: '', // renamed from preferredTime
    englishLevel: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // The journeyId should be the persona type, not a random UUID
    const journeyId = 'parent'; 

    // Pass form data and journeyId in navigation state
    navigate('/finding-course', { state: { ...form, journeyId } });
  };

  const progress = Object.values(form).filter(Boolean).length / Object.keys(form).length * 100;

  return (
    <>
    <Header showExploreCourses={false} />
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-amber-100 pt-32">
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side: Image and Text */}
            <div className="bg-rose-100 p-8 sm:p-12 flex flex-col justify-center items-center text-center">
              <img src="/Parent.svg" alt="Parent Icon" className="w-32 h-32 mb-6 rounded-full object-cover bg-white" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">Tell us about your child</h1>
              <p className="text-md sm:text-lg text-gray-600 mt-3">This will help us find the perfect course.</p>
            </div>

            {/* Right Side: Form */}
            <div className="p-8 sm:p-12">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
                aria-label="Parent Persona Form"
              >
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-6">
                  <label className="font-medium text-gray-700 text-base">
                    Child's Age
                    <div className="relative mt-2">
                      <select
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 bg-gray-50 text-base shadow-sm hover:border-rose-400 text-gray-900"
                      >
                        <option value="" disabled>Select age</option>
                        <option value="3-6">3-6 years</option>
                        <option value="7-10">7-10 years</option>
                        <option value="11-14">11-14 years</option>
                        <option value="15+">15+ years</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-rose-500">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  </label>

                  <label className="font-medium text-gray-700 text-base">
                    Main Goal
                    <div className="relative mt-2">
                      <select
                        name="goal"
                        value={form.goal}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 bg-gray-50 text-base shadow-sm hover:border-rose-400 text-gray-900"
                      >
                        <option value="" disabled>Select goal</option>
                        <option value="confidence">Confidence</option>
                        <option value="communication">Communication</option>
                        <option value="public-comm.">Public Communication</option>
                        <option value="exam-prep">Exam Prep</option>
                        <option value="all">All the above</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-rose-500">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  </label>

                  <label className="font-medium text-gray-700 text-base">
                    English Comfort
                    <div className="relative mt-2">
                      <select
                        name="englishLevel"
                        value={form.englishLevel}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 bg-gray-50 text-base shadow-sm hover:border-rose-400 text-gray-900"
                      >
                        <option value="" disabled>Select comfort level</option>
                        <option value="not-comfortable">Not comfortable</option>
                        <option value="somewhat">Somewhat comfortable</option>
                        <option value="very">Very comfortable</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-rose-500">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  </label>

                  <label className="font-medium text-gray-700 text-base">
                    Preferred Course Type
                    <div className="relative mt-2">
                      <select
                        name="typeOfCourse"
                        value={form.typeOfCourse}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 bg-gray-50 text-base shadow-sm hover:border-rose-400 text-gray-900"
                      >
                        <option value="" disabled>Select type</option>
                        <option value="short-term">Short Term</option>
                        <option value="long-term">Long Term</option>
                        <option value="crash-course">Crash Course</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-rose-500">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-500 text-white rounded-lg px-8 py-4 text-lg font-semibold tracking-wide shadow-md hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-300 focus:ring-opacity-75 mt-4"
                >
                  Find the Perfect Course
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer showQuickLinks={false} showConnect={true} showLegal={false} showCopyright={true} />
    </>
  )
}

// Values saved from ParentForm in the system:

// journeyId: "parent"
// typeOfCourse: "short-term", "long-term", or "crash-course" (depending on user selection)
// goal: "confidence", "communication", "leadership", "clear-exams", or "all" (depending on user selection)
// year: child's age group (e.g., "3-6", "7-10", etc.)
// englishLevel: "not-comfortable", "somewhat", or "very"
