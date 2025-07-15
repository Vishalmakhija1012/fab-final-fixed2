import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const personaOptions = ["Parent", "Student", "Professional"];
const goalOptions = [
  "Crack Interview",
  "Express Confidently",
  "Networking",
  "Ice-breaking",
  "All the above"
];
const dateOptions = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
});
const timeslotOptions = [
  "Morning (8am-12pm)",
  "Afternoon (12pm-4pm)",
  "Evening (4pm-8pm)",
  "Night (8pm-10pm)"
];
const goalTimeOptions = ["1 month", "3 months", "1 year"];

const BookTrial = () => {
  const [step, setStep] = useState(1);
  const [form1, setForm1] = useState({ name: "", phone: "", email: "", date: "", timeslot: "" });
  const [form2, setForm2] = useState({ persona: "", goal: "", goalTime: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleForm1Change = e => {
    setForm1({ ...form1, [e.target.name]: e.target.value });
  };
  const handleForm2Change = e => {
    setForm2({ ...form2, [e.target.name]: e.target.value });
  };

  const handleForm1Submit = e => {
    e.preventDefault();
    setStep(2);
  };

  const handleForm2Submit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "trialAppointments"), {
        ...form1,
        ...form2,
        createdAt: Timestamp.now(),
      });
      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 py-12 px-4">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 mt-12">
          <div className="flex flex-col items-center mb-6">
            <span className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center mb-4 border-4 border-pink-200 shadow-md overflow-hidden relative">
              <img src="/6.svg" alt="Aparna Sinha" className="w-full h-full object-cover rounded-full" />
            </span>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">Book Appointment<br />with Aparna Mam</h2>
            <p className="text-md text-gray-700 text-center mb-2">Fill in your details and we will call you to confirm your appointment.</p>
          </div>
          <div className="flex flex-col items-center mt-8 mb-6">
            <span className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="#FFF7E6" />
                <path d="M16 25.5L22 31.5L33 18.5" stroke="#F87171" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <h2 className="text-2xl font-bold text-red-500 mb-2 text-center">Thank You!</h2>
            <p className="text-lg text-gray-700 text-center">
              Someone from <span className="font-bold text-pink-600">Fabulinus</span> will call you soon to book your appointment with <span className="font-bold text-red-500">Aparna Mam</span>.
            </p>
          </div>
          <button onClick={() => window.location.href = "/"} className="w-full py-3 bg-pink-500 text-white font-bold rounded-lg shadow-lg hover:bg-pink-600 transition-all text-lg mt-4">Back to Home</button>
        </div>
        <div className="mt-8 text-gray-500 text-sm text-center">&copy; {new Date().getFullYear()} Fabulinus. All rights reserved.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 py-12 px-4">
      {/* Header */}
      <div className="w-full max-w-lg bg-pink-50 rounded-t-xl shadow-lg p-8 flex flex-col items-center">
        <span className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center mb-4 border-4 border-pink-200 shadow-md overflow-hidden relative">
          <img src="/6.svg" alt="Aparna Sinha" className="w-full h-full object-cover rounded-full" />
        </span>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">Book a Free Trial</h2>
        <p className="text-md text-gray-700 text-center mb-2">Fill in your details and we will call you to confirm your free trial session with Aparna Ma'am!</p>
      </div>
      {/* Card Form */}
      <div className="w-full max-w-lg bg-white rounded-b-xl shadow-lg p-8 -mt-2">
        {step === 1 && (
          <form onSubmit={handleForm1Submit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
              <input type="text" name="name" value={form1.name} onChange={handleForm1Change} required placeholder="Enter your name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-300 focus:outline-none placeholder-gray-400" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
              <input type="tel" name="phone" value={form1.phone} onChange={handleForm1Change} required placeholder="10-digit phone number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-300 focus:outline-none placeholder-gray-400" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email ID</label>
              <input type="email" name="email" value={form1.email} onChange={handleForm1Change} required placeholder="Enter your email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-300 focus:outline-none placeholder-gray-400" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select Date</label>
              <select name="date" value={form1.date} onChange={handleForm1Change} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-300 focus:outline-none">
                <option value="">dd/mm/yyyy</option>
                {dateOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select Timeslot</label>
              <select name="timeslot" value={form1.timeslot} onChange={handleForm1Change} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-300 focus:outline-none">
                <option value="">Select Timeslot</option>
                {timeslotOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-400 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-red-500 transition-all text-lg">Next</button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleForm2Submit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Persona</label>
              <select name="persona" value={form2.persona} onChange={handleForm2Change} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-300 focus:outline-none">
                <option value="">Select Persona</option>
                {personaOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Goal</label>
              <select name="goal" value={form2.goal} onChange={handleForm2Change} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-300 focus:outline-none">
                <option value="">Select Goal</option>
                {goalOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Time to achieve the goal</label>
              <select name="goalTime" value={form2.goalTime} onChange={handleForm2Change} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-300 focus:outline-none">
                <option value="">Select Time</option>
                {goalTimeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="px-6 py-2 bg-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-300">Back</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-gradient-to-r from-pink-500 to-red-400 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-red-500 transition-all text-lg">{loading ? "Submitting..." : "Submit"}</button>
            </div>
          </form>
        )}
      </div>
      {/* Footer */}
      <div className="mt-8 text-gray-500 text-sm text-center">&copy; {new Date().getFullYear()} Fabulinus. All rights reserved.</div>
    </div>
  );
};

export default BookTrial;
