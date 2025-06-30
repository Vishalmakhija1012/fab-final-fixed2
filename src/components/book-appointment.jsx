import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import ScrollToTop from './ScrollToTop';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function BookAppointment() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Try to get all relevant data from navigation state (if user came from single-page)
  const navState = location.state || {};
  const courseDetails = navState.selectedCourse || {};

  // Always prefer navState, but fallback to localStorage if not present
  const persona = navState.persona || localStorage.getItem('persona') || '';
  const goal = navState.goal || localStorage.getItem('goal') || '';
  const typeOfCourse = navState.typeOfCourse || localStorage.getItem('typeOfCourse') || '';
  const year = navState.year || localStorage.getItem('year') || '';
  const courseName = courseDetails.programName || navState.courseName || '';
  const price = courseDetails.offerPrice || navState.price || '';
  const cta = navState.cta || '';

  // Save journey context to localStorage if present in navState (for future fallback)
  if (navState.persona) localStorage.setItem('persona', navState.persona);
  if (navState.goal) localStorage.setItem('goal', navState.goal);
  if (navState.typeOfCourse) localStorage.setItem('typeOfCourse', navState.typeOfCourse);
  if (navState.year) localStorage.setItem('year', navState.year);

  // Warn if any key journey context is missing (except price)
  const missingFields = [];
  if (!persona) missingFields.push('persona');
  if (!goal) missingFields.push('goal');
  if (!typeOfCourse) missingFields.push('typeOfCourse');
  if (!year) missingFields.push('year');
  if (!courseName) missingFields.push('courseName');

  // Generate a unique journeyId per booking
  const generateJourneyId = () => {
    if (window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    // Fallback for older browsers
    return 'jid-' + Math.random().toString(36).substr(2, 9) + Date.now();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    if (form.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      setSubmitting(false);
      return;
    }
    if (missingFields.length > 0) {
      setError('Missing required journey data: ' + missingFields.join(', '));
      setSubmitting(false);
      return;
    }
    try {
      // Compose the full journey object
      const journeyId = generateJourneyId();
      const journeyData = {
        journeyId,
        persona,
        goal,
        typeOfCourse,
        year,
        courseName,
        price, // price is included if available, but not required
        cta, // capture which CTA was clicked
        // Add more course details if available
        duration: courseDetails.duration || '',
        live1on1: courseDetails.live1on1 || '',
        liveBatch: courseDetails.liveBatch || '',
        batchSize: courseDetails.batchSize || '',
        originalPrice: courseDetails.originalPrice || '',
        mainLine: courseDetails.mainLine || '',
        // Save the user's appointment form
        appointment: {
          ...form
        },
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'appointments'), journeyData);
      setShowThankYou(true);
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Scroll to top when thank you message is shown
  useEffect(() => {
    if (showThankYou) {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }, 50);
    }
  }, [showThankYou]);

  return (
    <>
      <ScrollToTop />
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-amber-100">
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Side: Image and Text */}
              <div className="bg-rose-100 p-8 sm:p-12 flex flex-col justify-center items-center text-center">
                <img src="/Parent.svg" alt="Aparna Mam" className="w-32 h-32 mb-6 rounded-full object-cover bg-white" />
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">Book Appointment with Aparna Mam</h1>
                <p className="text-md sm:text-lg text-gray-600 mt-3">Fill in your details and we will call you to confirm your appointment.</p>
              </div>

              {/* Right Side: Form or Thank You */}
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                {!showThankYou ? (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8"
                    aria-label="Book Appointment Form"
                  >
                    <div className="grid grid-cols-1 gap-6">
                      <label className="font-medium text-gray-700 text-base">
                        Your Name
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 mt-2 bg-gray-50 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
                          placeholder="Enter your name"
                        />
                      </label>

                      <label className="font-medium text-gray-700 text-base">
                        Phone Number
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          maxLength={10}
                          pattern="[0-9]{10}"
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 mt-2 bg-gray-50 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
                          placeholder="10-digit phone number"
                        />
                      </label>

                      <label className="font-medium text-gray-700 text-base">
                        Email ID
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 mt-2 bg-gray-50 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
                          placeholder="Enter your email"
                        />
                      </label>

                      <label className="font-medium text-gray-700 text-base">
                        Preferred Date
                        <input
                          type="date"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 mt-2 bg-gray-50 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900"
                        />
                      </label>
                    </div>

                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}

                    <button
                      type="submit"
                      className="w-full bg-rose-500 text-white rounded-lg px-8 py-4 text-lg font-semibold tracking-wide shadow-md hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-300 focus:ring-opacity-75 mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={submitting}
                    >
                      {submitting ? 'Booking...' : 'Book Appointment'}
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-6 py-8">
                    <svg width="60" height="60" fill="none" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30" fill="#fffbe0"/><path d="M18 32l8 8 16-16" stroke="#ef5a63" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <h2 className="text-2xl font-bold text-rose-500 mb-2 text-center">Thank You!</h2>
                    <p className="text-lg text-gray-800 text-center">
                      Someone from <span className="font-semibold text-rose-500">Fabulinus</span> will call you soon to book your appointment with <span className="font-semibold text-rose-500">Aparna Mam</span>.
                    </p>
                    <button
                      className="w-full bg-rose-500 text-white rounded-lg px-8 py-4 text-base font-semibold tracking-wide shadow-md hover:bg-rose-600 transition-all duration-300 mt-4"
                      onClick={() => navigate('/')}
                    >
                      Back to Home
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer showQuickLinks={false} showConnect={true} showLegal={false} showCopyright={true} />
    </>
  );
}
