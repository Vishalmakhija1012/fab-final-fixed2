import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Footer } from './Footer';

export default function PersonalGrowthForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    year: '',
    goal: '',
    englishLevel: '',
    typeOfCourse: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const journeyId = 'personal-growth';
    navigate('/finding-course', { state: { ...form, journeyId } });
  };

  const progress = Object.values(form).filter(Boolean).length / Object.keys(form).length * 100;

 return (
    <>
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-amber-100">
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side: Image and Text */}
            <div className="bg-rose-100 p-8 sm:p-12 flex flex-col justify-center items-center text-center">
              <img src="/short.svg" alt="Personal Growth Icon" className="w-32 h-32 mb-6 rounded-full object-cover" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">Tell us about your  background</h1>
              <p className="text-md sm:text-lg text-gray-600 mt-3">This will help us find the perfect course.</p>
            </div>

            {/* Right Side: Form */}
            <div className="p-8 sm:p-12">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
                aria-label="Personal Growth Persona Form"
              >
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-6">
                  <label className="font-medium text-gray-700 text-base">
                    Years of Experience
                    <div className="relative mt-2">
                      <select
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 bg-gray-50 text-base shadow-sm hover:border-rose-400 text-gray-900"
                      >
                        <option value="" disabled>Select years of experience</option>
                        <option value="0-3">0-3 years</option>
                        <option value="4-7">4-7 years</option>
                        <option value="8-15">8-15 years</option>
                        <option value="15+">15+ years</option>
                      </select>
                      <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-rose-500">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    </div>
                  </label>

                  <label className="font-medium text-gray-700 text-base">
                    Your main goal
                    <div className="relative mt-2">
                      <select
                        name="goal"
                        value={form.goal}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 bg-gray-50 text-base shadow-sm hover:border-rose-400 text-gray-900"
                      >
                        <option value="" disabled>Select a goal</option>
                        <option value="speak-better">Speak more confidently</option>
                        <option value="public-comm.">Public Communication</option>
                        <option value="networking">Networking</option>
                        <option value="self-expression">Self-expression</option>
                        <option value="clear-interviews">Clear Interviews</option>
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
                    Type of Course
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
                  className="w-full bg-rose-500 text-white font-bold py-4 px-4 rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all duration-300 shadow-lg text-lg"
                >
                  Find me the Best Course
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer showQuickLinks={false} showConnect={true} showLegal={false} showCopyright={true} />
    </>
  );
}
