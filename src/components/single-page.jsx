import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { COURSE_LOGIC, CRASH_COURSE_LOOKUP } from './courseLogic';
import { FaArrowLeft, FaCheckCircle, FaUserGraduate, FaUsers, FaStar, FaAward, FaRegCalendarAlt, FaGift, FaChalkboardTeacher, FaBars, FaGripLines } from 'react-icons/fa';
import { Footer } from './Footer';
import CrashCourseIcon from "./CrashCourseIcon";
import BookScroller from './BookScroller';

const JourneyTimeline = ({ selectedCourse, typeDropdown }) => {
  // Move typeIconMap inside JourneyTimeline and ensure typeDropdown is passed as a prop from SinglePage
  const typeIconMap = {
    'Short Term': '/short.svg',
    'Long Term': '/long.svg',
    'Crash Course': '/Crash.svg',
  };

  // Steps data (dynamic where needed)
  const steps = [
    {
      title: "Onboarding",
      subtitle: (
        <span className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl sm:text-3xl font-normal text-red-400 leading-none tracking-tight mb-1">Step 1: Onboarding</span>
          <ul className="pl-6 space-y-1 text-left">
            <li className="text-base text-gray-800 flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-2 rounded-full bg-pink-400 flex-shrink-0"></span>
              <span>Aparna Ma'am will understand your long-term goals.</span>
            </li>
            <li className="text-base text-gray-800 flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-2 rounded-full bg-yellow-400 flex-shrink-0"></span>
              <span>Review your current efforts to achieve them.</span>
            </li>
          </ul>
        </span>
      ),
      icon: <img src="/6.svg" alt="Aparna Ma'am" className="w-16 h-16 rounded-full border-4 border-pink-200 shadow bg-white" />, // Avatar
      color: "from-indigo-400 to-pink-400",
      dot: "bg-indigo-500",
    },
    {
      title: "Skill Assessment",
      subtitle: (
        <span className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl sm:text-3xl font-normal text-red-400 leading-none tracking-tight mb-1">Step 2: Skill Assessment</span>
          <ul className="pl-6 space-y-1 text-left">
            <li className="text-base text-gray-800 flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-2 rounded-full bg-yellow-400 flex-shrink-0"></span>
              <span>Identify areas for improvement.</span>
            </li>
          </ul>
        </span>
      ),
      icon: undefined,
      color: "from-pink-400 to-yellow-400",
      dot: "bg-pink-500",
    },
    {
      title: "Custom Plan",
      subtitle: (
        <span className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl sm:text-3xl font-normal text-red-400 leading-none tracking-tight mb-1">Step 3: Custom Plan</span>
          <ul className="pl-6 space-y-1 text-left">
            <li className="text-base text-gray-800 flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-2 rounded-full bg-pink-400 flex-shrink-0"></span>
              <span>Get a personalized plan.</span>
            </li>
            <li className="text-base text-gray-800 flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-2 rounded-full bg-yellow-400 flex-shrink-0"></span>
              <span>Designed specifically for you by Aparna Ma'am.</span>
            </li>
          </ul>
        </span>
      ),
      icon: undefined,
      color: "from-yellow-400 to-red-400",
      dot: "bg-yellow-400",
    },
    {
      title: "Mentoring",
      subtitle: (
        <span className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl sm:text-3xl font-normal text-red-400 leading-none tracking-tight mb-1">Step 4: Mentoring</span>
          <ul className="pl-6 space-y-1 text-left">
            <li className="text-base text-gray-800 flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-2 rounded-full bg-pink-400 flex-shrink-0"></span>
              <span>Get {selectedCourse?.live1on1 || 50} one-on-one mentoring sessions with Aparna Ma'am.</span>
            </li>
          </ul>
        </span>
      ),
      icon: undefined,
      color: "from-red-400 to-pink-400",
      dot: "bg-red-400",
    },
    {
      title: "Live Classes",
      subtitle: (
        <span className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl sm:text-3xl font-normal text-red-400 leading-none tracking-tight mb-1">Step 5: Live Classes</span>
          <ul className="pl-6 space-y-1 text-left">
            <li className="text-base text-gray-800 flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-2 rounded-full bg-pink-400 flex-shrink-0"></span>
              <span>Receive additional {selectedCourse?.liveBatch || 50} live classes with Aparna Ma'am.</span>
            </li>
            <li className="text-base text-gray-800 flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-2 rounded-full bg-yellow-400 flex-shrink-0"></span>
              <span>Learn in small batches of just {selectedCourse?.batchSize || 5} learners.</span>
            </li>
          </ul>
        </span>
      ),
      icon: undefined,
      color: "from-pink-400 to-red-400",
      dot: "bg-pink-500",
    },
    {
      title: "Home Kits",
      subtitle: (
        <span className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl sm:text-3xl font-normal text-red-400 leading-none tracking-tight mb-1">Step 6: Home Kits</span>
          <ul className="pl-6 space-y-1 text-left">
            <li className="text-base text-gray-800 flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-2 rounded-full bg-pink-400 flex-shrink-0"></span>
              <span>Access 74+ fun activities for practice and reinforcement.</span>
            </li>
            <li className="text-base text-gray-800 flex items-start gap-2">
              <span className="inline-block w-2 h-2 mt-2 rounded-full bg-yellow-400 flex-shrink-0"></span>
              <span>Receive loads of practice material and tools.</span>
            </li>
          </ul>
        </span>
      ),
      icon: undefined,
      color: "from-yellow-400 to-red-400",
      dot: "bg-yellow-400",
    },
  ];

  // Outcome cards (copied logic/content from Outcomes section, independent from steps)
  const outcomeCards = [
    {
      icon: (
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full border-2 border-gray-300 bg-white">
          <img src="/long.svg" alt="Long Term" className="w-8 h-8" />
        </div>
      ),
      text: selectedCourse?.bullets?.[0] || "Build foundational English skills",
      bg: "bg-white",
    },
    {
      icon: (
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full border-2 border-gray-300 bg-white">
          <img src="/short.svg" alt="Short Term" className="w-8 h-8" />
        </div>
      ),
      text: selectedCourse?.bullets?.[1] || "Develop strong communication, self-expression",
      bg: "bg-white",
    },
    {
      icon: (
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full border-2 border-gray-300 bg-white">
          <img src="/Anyone.svg" alt="Anyone" className="w-8 h-8" />
        </div>
      ),
      text: selectedCourse?.bullets?.[2] || "Foster confident, engaging personality",
      bg: "bg-white",
    },
    {
      icon: (
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full border-2 border-gray-300 bg-white">
          <img src="/Crash.svg" alt="Crash Course" className="w-8 h-8" />
        </div>
      ),
      text: selectedCourse?.bullets?.[3] || "Achieve real, lasting change",
      bg: "bg-white",
    },
  ];

  // Animation: fade-in/slide-up on scroll
  const timelineRefs = useRef([]);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.3 }
    );
    timelineRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Combine steps and outcome cards for a single timeline
  const timelineItems = [
    ...steps.map((step, idx) => ({ type: 'step', ...step, idx })),
    // Insert divider label after step 6 (idx === 5)
    { type: 'divider', key: 'guaranteed-outcomes' },
    ...outcomeCards.map((card, idx) => ({ type: 'outcome', ...card, idx: steps.length + 1 + idx })),
  ];

  return (
    <section className="timeline-section w-full flex flex-col items-center relative px-0 sm:px-4 lg:px-0">
      {/* Central vertical line (desktop) */}
      <div className="hidden md:block absolute left-1/2 top-0 h-full w-2 z-0" style={{transform:'translateX(-50%)'}}>
        <div className="w-full h-full bg-gradient-to-b from-indigo-300 via-pink-300 to-yellow-300 rounded-full blur-sm opacity-80"></div>
      </div>
      {/* Central vertical line (mobile only) - grouped as one element with overlap */}
      <div className="block md:hidden absolute left-1/2 top-0 h-full z-0" style={{transform:'translateX(-50%)'}}>
        <div className="relative w-1 h-full flex flex-col items-center justify-between">
          {/* Start circle - overlap by 10% (move down), now moved down by 2px */}
          <span
            className="absolute left-1/2 w-10 h-10 rounded-full bg-red-400 border-4 border-white z-20"
            style={{ top: '2px', transform: 'translate(-50%, 0)' }}
          />
          {/* Midline - starts at the edge of the top circle and ends at the edge of the bottom circle */}
          <div className="absolute left-1/2 w-1 bg-red-400 rounded-full opacity-80 z-10"
            style={{
              top: 'calc(2px + 20px)',
              bottom: 'calc(2px - 100px)',
              height: 'auto',
              transform: 'translateX(-50%)',
            }}
          ></div>
          {/* End circle - overlap by 10% (move up) */}
          <span
            className="absolute left-1/2 w-10 h-10 rounded-full bg-red-400 border-4 border-white z-20"
            style={{ bottom: '2px', transform: 'translate(-50%, 0)' }}
          />
        </div>
      </div>
      {/* Timeline Items: steps, divider, and outcomes */}
      {timelineItems.map((item, idx) => {
        if (item.type === 'divider') {
          // Center the divider both horizontally and vertically over the midline
          return (
            <div key={item.key || idx} className="w-full flex items-center justify-center my-8 md:my-12 relative z-30" style={{minHeight: '60px'}}>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center" style={{width: 'max-content'}}>
                <div className="flex-grow border-t-2 border-dashed border-pink-300 w-16"></div>
                <span className="mx-4 px-8 py-2 rounded-full bg-red-400 text-white font-extrabold text-lg uppercase tracking-widest border-2 border-red-400 shadow-xl flex items-center justify-center" style={{letterSpacing:'0.15em', boxShadow: '0 6px 32px 0 rgba(230,73,128,0.22)'}}>
                  Guaranteed Outcomes
                </span>
                <div className="flex-grow border-t-2 border-dashed border-pink-300 w-16"></div>
              </div>
            </div>
          );
        }
        return (
          <div
            key={item.type === 'step' ? item.title : item.type === 'outcome' ? `outcome-${idx}` : idx}
            ref={el => timelineRefs.current[idx] = el}
            className={`timeline-item animated-content group relative flex flex-col md:flex-row items-center md:items-start w-full md:w-1/2 max-w-2xl mx-auto mb-12 md:mb-20 px-2 md:px-0
              ${item.type === 'step' && idx % 2 === 0 ? 'md:self-start md:pr-16 md:text-right' : ''}
              ${item.type === 'step' && idx % 2 !== 0 ? 'md:self-end md:pl-16 md:text-left' : ''}
              ${item.type === 'outcome' ? 'md:self-center md:text-center' : ''}
            `}
          >
            {/* Card */}
            <div className={`relative z-20 bg-white rounded-2xl shadow-xl border border-gray-200 px-6 py-8 flex flex-col items-center md:items-${item.type === 'step' ? (idx%2===0?'end':'start') : 'center'} text-center md:text-${item.type === 'step' ? (idx%2===0?'right':'left') : 'center'} w-full transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl`}>
              {/* Step 1 avatar */}
              {item.type === 'step' && idx === 0 && (
                <div className="mb-3">
                  <img src="/6.svg" alt="Aparna Ma'am" className="w-16 h-16 rounded-full border-4 border-pink-200 shadow bg-white" />
                </div>
              )}
              {/* Step content */}
              {item.type === 'step' && (
                <div className="text-lg text-gray-700 font-medium">{item.subtitle}</div>
              )}
              {/* Outcome card content */}
              {item.type === 'outcome' && (
                <div className="flex items-center gap-5 w-full justify-start">
                  {item.icon}
                  <span className="text-gray-800 text-lg font-semibold leading-snug text-left">{item.text}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <style>{`
        .timeline-section { padding-top: 2rem; padding-bottom: 4rem; min-height: 100vh; }
        .timeline-item { opacity: 0; transform: translateY(40px); transition: opacity 0.8s cubic-bezier(.4,0,.2,1), transform 0.8s cubic-bezier(.4,0,.2,1); will-change: opacity, transform; }
        .timeline-item.is-visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 767px) {
          .timeline-section { padding-top: 1rem; padding-bottom: 2rem; min-height: auto; }
          .timeline-item { margin-bottom: 2rem; padding: 0.5rem; }
          .timeline-item .text-3xl { font-size: 1.3rem; }
          .timeline-item .text-lg { font-size: 1rem; }
        }
      `}</style>
    </section>
  );
};

const SinglePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { journeyId, ...formData } = location.state || {};

  // --- Persona and Target Audience Mapping ---
  const getTargetAudience = (id, courseType) => {
    if (courseType === 'Crash Course') return 'Any';
    switch (id) {
      case 'parent': return 'Parents';
      case 'professional':
      case 'college-student':
      case 'personal-growth': return 'Others';
      default: return '';
    }
  };

  let persona = journeyId;
  if (!['parent', 'professional', 'college-student', 'personal-growth'].includes(journeyId)) {
    if (formData.year && /\d/.test(formData.year)) persona = 'parent';
    else persona = 'professional';
  }

  // Normalize typeOfCourse to match COURSE_LOGIC
  const normalizeCourseType = (type) => {
    if (!type) return 'Long Term';
    if (type === 'short-term') return 'Short Term';
    if (type === 'long-term') return 'Long Term';
    if (type === 'crash-course') return 'Crash Course';
    return type;
  };

  const [typeOfCourse, setTypeOfCourse] = useState(formData.typeOfCourse || 'long-term');
  const [personaDropdown, setPersonaDropdown] = useState(persona);
  const [typeDropdown, setTypeDropdown] = useState(normalizeCourseType(typeOfCourse));
  const [goal, setGoal] = useState(formData.goal || '');
  const [showGoalDropdown, setShowGoalDropdown] = useState(false);

  // --- Target Audience for lookup ---
  const targetAudience = getTargetAudience(personaDropdown, typeDropdown);

  // Use the current goal state for crash course lookup
  let crashCourseGoal = goal || formData.goal;
  // If Crash Course and goal is 'all', force to 'confidence' for fallback
  if (typeDropdown === 'Crash Course' && crashCourseGoal === 'all') {
    crashCourseGoal = 'confidence';
  }
  let crashCourseName = undefined;
  if (typeDropdown === 'Crash Course') {
    crashCourseName = CRASH_COURSE_LOOKUP[crashCourseGoal];
  }

  // Determine which course to show
  let selectedCourse = null;

  if (typeDropdown === 'Crash Course') {
    if (crashCourseName && crashCourseName !== 'Requires Multiple Courses') {
      selectedCourse = COURSE_LOGIC.find(
        (c) =>
          c.programName === crashCourseName &&
          c.courseType === 'Crash Course' &&
          c.targetAudience === 'Any'
      );
    } else if (crashCourseName === 'Requires Multiple Courses') {
      selectedCourse = null;
    }
  } else if (
    personaDropdown === 'anyone' &&
    (typeDropdown === 'Short Term' || typeDropdown === 'Long Term')
  ) {
    // Fallback for Anyone + Short/Long Term (any goal)
    const programName = typeDropdown === 'Short Term' ? 'COMPETITIVE EDGE' : 'COMPETITIVE EDGE+';
    selectedCourse = COURSE_LOGIC.find(
      (c) =>
        c.programName === programName &&
        c.courseType === typeDropdown &&
        c.targetAudience === 'Others'
    );
  } else {
    selectedCourse = COURSE_LOGIC.find(
      (c) =>
        c.targetAudience === targetAudience &&
        c.courseType === typeDropdown
    );
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [showPersonaDropdown, setShowPersonaDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  // Add at the top, after other imports:
  const typeIconMap = {
    'Short Term': '/short.svg',
    'Long Term': '/Crash.svg',
    'Crash Course': '/Crash.svg',
  };

  // Add at the top of the component (inside SinglePage):
  const COURSE_TYPE_LABELS = {
    'Crash Course': {
      duration: '1 month',
      weeks: 4,
    },
    'Short Term': {
      duration: '3 months',
      weeks: 12,
    },
    'Long Term': {
      duration: '1 year',
      weeks: 50,
    },
  };

  const PERSONA_OPTIONS = [
    { value: 'parent', label: 'Parent', icon: '/Parent.svg' },
    { value: 'professional', label: 'Professional', icon: '/Professional.svg' },
    { value: 'college-student', label: 'College Student', icon: '/Student.svg' },
    { value: 'anyone', label: 'Anyone', icon: '/Anyone.svg' },
  ];

  if (!selectedCourse) {
    // Remove the confidence crash course button logic and fallback UI for this case
    return (
      <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-pink-50 to-yellow-50">
        <div className="max-w-lg bg-white rounded-2xl shadow-xl border border-pink-200 px-8 py-12 flex flex-col items-center mt-24">
          <span className="text-3xl font-extrabold text-pink-500 mb-4">No Matching Program Found</span>
          <p className="text-lg text-gray-700 mb-6 text-center">We couldn't find a program matching your selection. Please try again or go back to the start.</p>
          <button
            className="bg-purple-500 text-white font-bold py-3 px-8 rounded-xl shadow text-lg hover:bg-purple-600 transition-colors duration-200 mb-4"
            onClick={() => navigate('/')}
          >
            Go to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-white via-pink-50 to-yellow-50">
      {/* HEADER (fixed, with navigation and dropdowns) */}
      <header className="w-full flex flex-col sm:flex-row items-start sm:items-center px-6 py-4 bg-white/80 shadow-sm border-b border-red-100 fixed top-0 left-0 right-0 z-50 rounded-b-3xl backdrop-blur-md singlepage-header justify-between">
        <span
          className="font-extrabold text-2xl text-red-400 cursor-pointer mb-3 sm:mb-0"
          onClick={() => navigate('/')}
          style={{ userSelect: 'none' }}
        >
          fabulinus
        </span>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-end sm:items-center ml-0 w-full sm:w-auto" style={{flexShrink:1, minWidth:0}}>
          {/* Persona Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button
              className="flex items-center gap-2 bg-transparent text-gray-700 font-normal border-none rounded-none shadow-none px-0 py-0 text-base hover:underline focus:underline focus:outline-none transition w-full sm:w-auto justify-end sm:justify-start"
              onClick={() => setShowPersonaDropdown((v) => !v)}
              style={{ minWidth: 0, fontWeight: 400, width: 'auto', padding: 0, margin: 0 }}
            >
              <img src={PERSONA_OPTIONS.find(p => p.value === personaDropdown)?.icon} alt={PERSONA_OPTIONS.find(p => p.value === personaDropdown)?.label} className="w-5 h-5" />
              <span style={{ textTransform: 'capitalize' }}>{PERSONA_OPTIONS.find(p => p.value === personaDropdown)?.label}</span>
              <FaArrowLeft className={`ml-1 text-base rotate-180 text-red-400 transition-transform ${showPersonaDropdown ? 'rotate-90' : ''}`} />
            </button>
            {showPersonaDropdown && (
              <div className="fixed inset-0 z-50 flex items-start justify-center sm:justify-end pt-[90px] px-2" style={{pointerEvents:'none'}}>
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" style={{pointerEvents:'auto'}}>
                  <div className="w-full bg-white border border-pink-200 rounded-xl shadow-lg overflow-x-auto min-w-0 persona-dropdown-menu">
                    {PERSONA_OPTIONS.map((p) => (
                      <button
                        key={p.value}
                        className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-pink-50 ${personaDropdown === p.value ? 'bg-pink-100 font-bold' : ''}`}
                        onClick={() => {
                          setPersonaDropdown(p.value);
                          setShowPersonaDropdown(false);
                        }}
                      >
                        <img src={p.icon} alt={p.label} className="w-5 h-5" />
                        <span style={{ textTransform: 'capitalize' }}>{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Goal Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button
              className="flex items-center gap-2 bg-transparent text-gray-700 font-normal border-none rounded-none shadow-none px-0 py-0 text-base hover:underline focus:underline focus:outline-none transition w-full sm:w-auto justify-end sm:justify-start"
              onClick={() => setShowGoalDropdown((v) => !v)}
              style={{ minWidth: 0, fontWeight: 400, width: 'auto', padding: 0, margin: 0 }}
            >
              {goal ? (
                <img src={`/${(() => {
                  if (goal === 'public-comm.') return 'leadership.svg';
                  if (goal === 'exam-prep') return 'clear-exams.svg';
                  return `${goal}.svg`;
                })()}`} alt={goal} className="w-5 h-5" />
              ) : (
                <FaAward className="w-5 h-5" />
              )}
              <span style={{ textTransform: 'capitalize' }}>{(() => {
                if (goal === 'public-comm.') return 'Public Communication';
                if (goal === 'exam-prep') return 'Exam Prep';
                return goal || 'Select Goal';
              })()}</span>
              <FaArrowLeft className={`ml-1 text-base rotate-180 text-red-400 transition-transform ${showGoalDropdown ? 'rotate-90' : ''}`} />
            </button>
            {showGoalDropdown && (
              <div className="fixed inset-0 z-50 flex items-start justify-center sm:justify-end pt-[90px] px-2" style={{pointerEvents:'none'}}>
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" style={{pointerEvents:'auto'}}>
                  <div className="w-full bg-white border border-yellow-200 rounded-xl shadow-lg overflow-x-auto min-w-0 goal-dropdown-menu">
                    {[
  { value: 'confidence', label: 'confidence', icon: 'confidence.svg' },
  { value: 'communication', label: 'communication', icon: 'communication.svg' },
  { value: 'public-comm.', label: 'Public Communication', icon: 'leadership.svg' },
  { value: 'networking', label: 'networking', icon: 'networking.svg' },
  { value: 'self-expression', label: 'self-expression', icon: 'self-expression.svg' },
  { value: 'exam-prep', label: 'Exam Prep', icon: 'clear-exams.svg' },
  { value: 'clear-interviews', label: 'clear-interviews', icon: 'clear-interviews.svg' },
  { value: 'all', label: 'all', icon: 'all.svg' },
].map((g) => (
  <button
    key={g.value}
    className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-yellow-50 ${goal === g.value ? 'bg-yellow-100 font-bold' : ''}`}
    onClick={() => {
      setGoal(g.value);
      setShowGoalDropdown(false);
    }}
  >
    <img src={`/${g.icon}`} alt={g.label} className="w-5 h-5" />
    <span style={{ textTransform: 'capitalize' }}>{g.label}</span>
  </button>
))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Type of Course Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button
              className="flex items-center gap-2 bg-transparent text-gray-700 font-normal border-none rounded-none shadow-none px-0 py-0 text-base hover:underline focus:underline focus:outline-none transition w-full sm:w-auto justify-end sm:justify-start"
              onClick={() => setShowTypeDropdown((v) => !v)}
              style={{ minWidth: 0, fontWeight: 400, width: 'auto', padding: 0, margin: 0 }}
            >
              <img src={typeIconMap[typeDropdown]} alt={typeDropdown} className="w-5 h-5" />
              <span style={{ textTransform: 'capitalize' }}>{typeDropdown}</span>
              <FaArrowLeft className={`ml-1 text-base rotate-180 text-red-400 transition-transform ${showTypeDropdown ? 'rotate-90' : ''}`} />
            </button>
            {showTypeDropdown && (
              <div className="fixed inset-0 z-50 flex items-start justify-center sm:justify-end pt-[90px] px-2" style={{pointerEvents:'none'}}>
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" style={{pointerEvents:'auto'}}>
                  <div className="w-full bg-white border border-indigo-200 rounded-xl shadow-lg overflow-x-auto min-w-0 type-dropdown-menu">
                    {['Crash Course', 'Short Term', 'Long Term'].map((t) => {
  // Map type to duration
  let duration = '';
  if (t === 'Crash Course') duration = '(1 month)';
  if (t === 'Short Term') duration = '(3 months)';
  if (t === 'Long Term') duration = '(1 year)';
  return (
    <button
      key={t}
      className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-indigo-50 ${typeDropdown === t ? 'bg-indigo-100 font-bold' : ''}`}
      onClick={() => {
        setTypeDropdown(t);
        setShowTypeDropdown(false);
      }}
    >
      <img src={typeIconMap[t]} alt={t} className="w-5 h-5" />
      <span style={{ textTransform: 'capitalize' }}>{t}</span>
      <span className="ml-2 text-red-400 font-normal" style={{ fontWeight: 400 }}>{duration}</span>
    </button>
  );
})}
      </div>
    </div>
  </div>
            )}
          </div>
        </div>
      </header>
      <div className="h-[84px]"></div>
      {/* HERO (Program heading, mainLine, visually prominent) */}
      <section
        className="relative flex flex-col items-center justify-center py-20 px-4 sm:px-8 bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-100 text-gray-800 rounded-b-3xl shadow-2xl overflow-hidden"
        style={{ minHeight: '90vh' }}
      >
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center gap-4 mt-16">
          <span className="block text-xs uppercase tracking-widest font-bold text-red-400 mb-2 text-center">Program</span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-700 via-pink-500 to-yellow-500 bg-clip-text text-transparent leading-tight font-display drop-shadow text-center mb-1"
            style={{
              whiteSpace: 'pre-line',
              wordBreak: 'break-word',
              minHeight: '2.5em',
              maxHeight: '2.5em',
              lineHeight: 1.25,
              overflow: 'hidden',
              display: 'block',
            }}
          >
            {(() => {
              let name = (typeDropdown === 'Crash Course' && crashCourseGoal === 'all')
                ? 'Multiple Crash Courses are recommended for your goals.'
                : typeDropdown === 'Crash Course' && crashCourseName
                ? crashCourseName
                : selectedCourse?.programName;
              if (typeDropdown === 'Crash Course' && crashCourseGoal === 'all') return name;
              if (!name) return '';
              const words = name.split(' ');
              if (words.length === 1) return name;
              if (words.length === 2) return (<>{words[0]}<br />{words[1]}</>);
              const mid = Math.ceil(words.length / 2);
              return <>{words.slice(0, mid).join(' ')}<br />{words.slice(mid).join(' ')}</>;
            })()}
          </h1>
          <p className="text-lg sm:text-2xl text-gray-700 font-medium max-w-2xl mx-auto mt-6 text-center leading-relaxed">
            {selectedCourse?.mainLine
              ? selectedCourse.mainLine.replace(/-/g, ' ')
              : ''}
          </p>
        </div>
      </section>
      {/* FEATURES - Modern Scrollable Journey (without midline) */}
      <section
        className="relative py-24 px-2 sm:px-10 lg:px-0 text-gray-800 overflow-visible flex flex-col items-center justify-center min-h-[700px] bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-100"
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto text-center mb-16">
          <span className="block text-xs uppercase tracking-widest font-bold text-red-400 mb-2">Features</span>
          <h2 className="text-5xl sm:text-6xl font-extrabold mb-2 drop-shadow-md text-blue-700">Your Journey</h2>
        </div>
        <JourneyTimeline selectedCourse={selectedCourse} typeDropdown={typeDropdown} />
      </section>
      {/* REVIEW */}
      <section
        className="relative py-24 px-6 sm:px-10 lg:px-20 overflow-hidden flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #6366F1 0%, #E64980 60%, #FFC107 100%)', // darkest gradient
        }}
      >
        <div className="relative z-10 w-full max-w-2xl mx-auto text-center mb-12">
          <span
            className="block text-xs uppercase tracking-widest font-bold mb-2 text-center"
            style={{ color: '#fff' }}
          >
            Review
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight text-center"
            style={{ color: '#FFF9DB' }}
          >
            Loved By Many
          </h1>
        </div>
        <div className="relative z-10 w-full max-w-xl mx-auto">
          {/* Review 1 */}
          <div className="bg-white rounded-2xl shadow p-6 border border-indigo-100 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <img src="/man.png" alt="Amit Sharma" className="h-10 w-10 rounded-full border-2 border-blue-200 bg-white" />
              <div>
                <div className="font-bold text-blue-700 text-sm">Amit Sharma</div>
                <div className="flex items-center gap-1 text-yellow-400 text-xs">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
              </div>
            </div>
            <div className="text-gray-700 text-base italic">“This program changed my confidence and communication skills. Aparna Ma'am is the best mentor!”</div>
          </div>
          {/* Review 2 */}
          <div className="bg-white rounded-2xl shadow p-6 border border-indigo-100 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <img src="/girl.png" alt="Priya Verma" className="h-10 w-10 rounded-full border-2 border-blue-200 bg-white" />
              <div>
                <div className="font-bold text-blue-700 text-sm">Priya Verma</div>
                <div className="flex items-center gap-1 text-yellow-400 text-xs">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
              </div>
            </div>
            <div className="text-gray-700 text-base italic">“Aparna Ma'am's sessions are interactive and practical. I feel much more confident speaking in public now!”</div>
          </div>
          {/* Review 3 */}
          <div className="bg-white rounded-2xl shadow p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-2">
              <img src="/lady.png" alt="Meena Joshi" className="h-10 w-10 rounded-full border-2 border-blue-200 bg-white" />
              <div>
                <div className="font-bold text-blue-700 text-sm">Meena Joshi</div>
                <div className="flex items-center gap-1 text-yellow-400 text-xs">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
              </div>
            </div>
            <div className="text-gray-700 text-base italic">“The improvement in my English and confidence is amazing. Highly recommend this program to everyone!”</div>
          </div>
        </div>
      </section>
      {/* TEACHER (Program Designed By) */}
      <section
        className="relative py-24 px-4 sm:px-8 flex flex-col items-center justify-center rounded-3xl shadow-xl overflow-hidden bg-white"
        // Removed gradient, set bg-white
      >
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center mb-16">
          <span className="block text-xs uppercase tracking-widest font-bold text-red-400 mb-2">Program Designer</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-blue-700 leading-tight">
            Ms. Aparna Sinha
          </h1>
        </div>
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-center gap-10 md:gap-16">
          {/* Profile Image with vibrant ring */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative mb-4">
              {/* Removed glow/span behind image for clean look */}
              <img
                src="/6.svg"
                alt="Aparna Sinha"
                className="relative h-48 w-48 md:h-80 md:w-80 rounded-full object-cover border-4 border-pink-200 bg-white"
                style={{ zIndex: 1, boxShadow: 'none' }}
              />
            </div>
          </div>
          {/* Info and credentials */}
          <div className="flex-1 flex flex-col items-center md:items-start text-left">
            {/* Hide on mobile, show on md+ */}
            <ul className="hidden md:flex flex-col gap-3 w-full mt-2 mb-4 items-start">
              <li className="flex items-center gap-3 justify-start">
                <FaCheckCircle className="text-yellow-400 text-2xl" />
                <span className="text-lg font-semibold text-gray-800">20+ yrs experience</span>
              </li>
              <li className="flex items-center gap-3 justify-start">
                <FaCheckCircle className="text-pink-400 text-2xl" />
                <span className="text-lg font-semibold text-gray-800">Bestselling Author</span>
              </li>
              <li className="flex items-center gap-3 justify-start">
                <FaCheckCircle className="text-blue-400 text-2xl" />
                <span className="text-lg font-semibold text-gray-800">Featured in top media</span>
              </li>
            </ul>
            {/* Remove the box, just keep the text */}
            <span className="text-base sm:text-lg text-gray-700 font-medium mt-2 block">
              India's leading communication coach & mentor to many communication experts.
            </span>
          </div>
        </div>
        {/* Carousel below */}
        <BookScroller />
      </section>
      {/* PRICING */}
      <section
        className="relative py-24 px-4 sm:px-10 lg:px-20 overflow-hidden flex flex-col items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #fff 0%, #fde4ec 40%, #fffbe6 100%)',
          backgroundImage: 'linear-gradient(135deg, #6366F1 0%, #E64980 60%, #FFC107 100%)',
        }}
      >
        <div className="relative z-10 w-full max-w-2xl mx-auto text-center mb-12">
          <span className="block text-xs uppercase tracking-widest font-bold mb-2 text-center"
            style={{ color: '#fff' }}
          >
            Limited seats available
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight text-center"
            style={{ color: '#FFF9DB' }}
          >
            Join Now
          </h1>
        </div>
        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center gap-8">
          {/* --- PRICING SECTION RESTRUCTURED CARDS --- */}
          <div className="flex flex-col gap-6 w-full items-center">
            {/* Problem Card (dynamic) */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow border border-pink-100 px-6 py-6 mb-2" style={{boxShadow:'0 2px 12px 0 rgba(236,72,153,0.07)'}}>
              <span className="text-lg font-bold mb-3 tracking-wide uppercase"><span className="text-red-400">Problem</span></span>
              <div className="flex flex-col gap-3 w-full">
                {/* First bullet: Challenges in <goal> */}
                <div className="flex flex-row items-center" style={{background:'#fff', borderRadius:'18px', minHeight:'56px', boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)', padding:'0.75rem 1.25rem'}}>
                  {/* Icon for persona with vibrant border */}
                  <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', width: '54px', height: '54px', borderRadius: '50%', background: 'linear-gradient(90deg, #6366F1 0%, #E64980 60%, #FFC107 100%)', padding: '3px', marginRight: '1rem', marginLeft: '0.25rem',
                  }}>
                    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '46px', height: '46px', borderRadius: '50%', background: '#fff'}}>
                      <img src={PERSONA_OPTIONS.find(p => p.value === personaDropdown)?.icon || '/Anyone.svg'} alt="Current Level Icon" style={{width:'32px', height:'32px'}} />
                    </span>
                  </span>
                  <div className="flex flex-col items-start">
                    <span style={{fontSize:'1.08rem', fontWeight:600, color:'#e11d48', marginBottom:'0.15rem'}}>Current Level</span>
                    <span style={{fontSize:'1.05rem', fontWeight:400, color:'#475569', lineHeight:1.25, fontStyle:'italic'}}>
                      Challenges in{' '}
                      <span style={{fontWeight:600, color:'#334155'}}>{goal ? goal.replace(/-/g, ' ') : 'confidence'}</span>
                    </span>
                  </div>
                </div>
                {/* Second bullet: Desired Level */}
                <div className="flex flex-row items-center" style={{background:'#fff', borderRadius:'18px', minHeight:'56px', boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)', padding:'0.75rem 1.25rem'}}>
                  {/* Icon for goal with vibrant border */}
                  <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', width: '54px', height: '54px', borderRadius: '50%', background: 'linear-gradient(90deg, #6366F1 0%, #E64980 60%, #FFC107 100%)', padding: '3px', marginRight: '1rem', marginLeft: '0.25rem',
                  }}>
                    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '46px', height: '46px', borderRadius: '50%', background: '#fff'}}>
                      <img src={`/${goal || 'communication'}.svg`} alt="Desired Level" style={{width:'32px', height:'32px'}} />
                    </span>
                  </span>
                  <div className="flex flex-col items-start">
                    <span style={{fontSize:'1.08rem', fontWeight:600, color:'#e11d48', marginBottom:'0.15rem'}}>Desired Level</span>
                    <span style={{fontSize:'1.05rem', fontWeight:400, color:'#475569', lineHeight:1.25, fontStyle:'italic'}}>Achieve a <span style={{fontWeight:600, color:'#334155'}}>strong command</span> over {goal.replace(/-/g, ' ')}</span>
                  </div>
                </div>
                {/* Third bullet: Time */}
                <div className="flex flex-row items-center" style={{background:'#fff', borderRadius:'18px', minHeight:'56px', boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)', padding:'0.75rem 1.25rem'}}>
                  {/* Icon for time with vibrant border */}
                  <span style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', width: '54px', height: '54px', borderRadius: '50%', background: 'linear-gradient(90deg, #6366F1 0%, #E64980 60%, #FFC107 100%)', padding: '3px', marginRight: '1rem', marginLeft: '0.25rem',
                  }}>
                    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '46px', height: '46px', borderRadius: '50%', background: '#fff'}}>
                      <img src="/calendar.svg" alt="Time" style={{width:'32px', height:'32px'}} />
                    </span>
                  </span>
                  <div className="flex flex-col items-start">
                    <span style={{fontSize:'1.08rem', fontWeight:600, color:'#e11d48', marginBottom:'0.15rem'}}>Time</span>
                    <span style={{fontSize:'1.05rem', fontWeight:400, color:'#475569', lineHeight:1.25, fontStyle:'italic'}}>
                      {typeDropdown === 'Crash Course' ? '1 month' : typeDropdown === 'Short Term' ? '3 months' : '1 year'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Solution Card (dynamic) */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow border border-blue-100 px-6 py-6 mb-2" style={{boxShadow:'0 2px 12px 0 rgba(59,130,246,0.07)'}}>
              <span className="text-lg font-bold mb-3 tracking-wide uppercase"><span className="text-red-400">Solution</span></span>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex flex-row items-center" style={{background:'#EFF6FF', borderRadius:'18px', minHeight:'56px', boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)', padding:'0.75rem 1.25rem'}}>
                  {/* Dynamic icon based on typeDropdown, larger with vibrant gradient border */}
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, #6366F1 0%, #E64980 60%, #FFC107 100%)',
                    padding: '3px',
                    marginRight: '1.25rem',
                    marginLeft: '0.25rem',
                  }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: '#fff',
                    }}>
                      <img src={typeIconMap[typeDropdown]} alt={typeDropdown} style={{width:'32px', height:'32px'}} />
                    </span>
                  </span>
                  {/* Vibrant gradient program name, same as pricing/CTA */}
                  <span
                    className="font-extrabold text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-indigo-700 via-pink-500 to-yellow-500 bg-clip-text text-transparent leading-tight font-display drop-shadow"
                    style={{
                      whiteSpace: 'pre-line',
                      wordBreak: 'break-word',
                      lineHeight: 1.15,
                      display: 'block',
                    }}
                  >
                    {(() => {
                      let name = selectedCourse?.programName || 'Solution details here';
                      if (!name) return '';
                      const words = name.split(' ');
                      if (words.length === 1) return name;
                      if (words.length === 2) return (<>{words[0]}<br />{words[1]}</>);
                      const mid = Math.ceil(words.length / 2);
                      return <>{words.slice(0, mid).join(' ')}<br />{words.slice(mid).join(' ')}</>;
                    })()}
                  </span>
                </div>
              </div>
            </div>
            {/* Guaranteed Outcomes Card (dynamic) */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow border border-yellow-100 px-6 py-6 mb-2" style={{boxShadow:'0 2px 12px 0 rgba(253,224,71,0.07)'}}>
              <span className="text-lg font-bold mb-3 tracking-wide uppercase"><span className="text-red-400">Guaranteed Outcomes</span></span>
              <div className="flex flex-col gap-3 w-full">
                {(selectedCourse?.bullets || [
                  'Build foundational English skills',
                  'Develop strong communication, self-expression',
                  'Foster confident, engaging personality',
                  'Achieve real, lasting change',
                ]).map((text, idx) => {
                  // Use specific icons for the first three outcomes
                  const outcomeIcons = [
                    '/bullet1.svg', // Build foundational English skills
                    '/bullet2.svg', // Develop strong communication, self-expression
                    '/bullet3.svg', // Foster confident, engaging personality
                    '/Crash.svg',   // fallback for any extra
                  ];
                  return (
                    <div key={idx} className="flex flex-row items-center" style={{background:'#fff', borderRadius:'18px', minHeight:'56px', boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)', padding:'0.75rem 1.25rem'}}>
                      {/* Vibrant gradient border around icon */}
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        background: 'linear-gradient(90deg, #6366F1 0%, #E64980 60%, #FFC107 100%)',
                        padding: '3px',
                        marginRight: '1.25rem',
                        marginLeft: '0.25rem',
                      }}>
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '46px',
                          height: '46px',
                          borderRadius: '50%',
                          background: '#fff',
                        }}>
                          <img src={outcomeIcons[idx] || '/Crash.svg'} alt={`Outcome ${idx+1}`} style={{width:'32px', height:'32px'}} />
                        </span>
                      </span>
                      <span style={{fontSize:'1.05rem', fontWeight:400, color:'#475569', lineHeight:1.25}}>{text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Methodology Card (dynamic) */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow border border-green-100 px-6 py-6 mb-2" style={{boxShadow:'0 2px 12px 0 rgba(34,197,94,0.07)'}}>
              <span className="text-lg font-bold mb-3 tracking-wide uppercase"><span className="text-red-400">Methodology</span></span>
              <div className="flex flex-col gap-3 w-full">
                {(selectedCourse?.methodology || [
                  { icon: '/book1.png', text: 'Interactive live sessions' },
                  { icon: '/feedback.svg', text: 'Personalized feedback & practice' },
                  { icon: '/home.svg', text: 'Fun home kits & activities' },
                ]).map((item, idx) => (
                  <div key={idx} className="flex flex-row items-center" style={{background:'#fff', borderRadius:'18px', minHeight:'56px', boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)', padding:'0.75rem 1.25rem'}}>
                    <span style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', width: '54px', height: '54px', borderRadius: '50%', background: 'linear-gradient(90deg, #6366F1 0%, #E64980 60%, #FFC107 100%)', padding: '3px', marginRight: '1rem', marginLeft: '0.25rem',
                    }}>
                      <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '46px', height: '46px', borderRadius: '50%', background: '#fff'}}>
                        {item.icon && <img src={item.icon} alt={item.text} style={{width:'32px', height:'32px'}} />}
                      </span>
                    </span>
                    <span style={{fontSize:'1.05rem', fontWeight:400, color:'#475569', lineHeight:1.25, fontStyle:'italic'}}>
                      {idx === 0
                        ? `${(selectedCourse?.live1on1 || 0) + (selectedCourse?.liveBatch || 0)} live classes by Aparna Ma'am`
                        : item.text}
                    </span>
                  </div>
                ))}
                {/* 4th label: Live monitoring of progress */}
                <div className="flex flex-row items-center" style={{background:'#fff', borderRadius:'18px', minHeight:'56px', boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)', padding:'0.75rem 1.25rem'}}>
                  <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '54px', height: '54px', borderRadius: '50%', background: 'linear-gradient(90deg, #6366F1 0%, #E64980 60%, #FFC107 100%)', padding: '3px', marginRight: '1rem', marginLeft: '0.25rem'}}>
                    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '46px', height: '46px', borderRadius: '50%', background: '#fff'}}>
                      <img src="/monitor.svg" alt="Live monitoring of progress" style={{width:'32px', height:'32px'}} />
                    </span>
                  </span>
                  <span style={{fontSize:'1.05rem', fontWeight:400, color:'#475569', lineHeight:1.25, fontStyle:'italic'}}>
                    Live monitoring of progress
                  </span>
                </div>
                {/* 5th label: Time/Duration */}
                <div className="flex flex-row items-center" style={{background:'#fff', borderRadius:'18px', minHeight:'56px', boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)', padding:'0.75rem 1.25rem'}}>
                  <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '54px', height: '54px', borderRadius: '50%', background: 'linear-gradient(90deg, #6366F1 0%, #E64980 60%, #FFC107 100%)', padding: '3px', marginRight: '1rem', marginLeft: '0.25rem'}}>
                    <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '46px', height: '46px', borderRadius: '50%', background: '#fff'}}>
                      <img src="/calendar.svg" alt="Time" style={{width:'32px', height:'32px'}} />
                    </span>
                  </span>
                  <span style={{fontSize:'1.05rem', fontWeight:400, color:'#475569', lineHeight:1.25, fontStyle:'italic'}}>
                    {typeDropdown === 'Crash Course' ? '1 month' : typeDropdown === 'Short Term' ? '3 months' : '1 year'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Pricing and CTA (dynamic) */}
          <div className="w-full max-w-md flex flex-col items-center gap-4 mt-10">
            {selectedCourse && (
              <div className="w-full flex flex-col items-center bg-white rounded-2xl shadow border border-gray-100 px-6 py-6 mb-2" style={{boxShadow:'0 2px 12px 0 rgba(0,0,0,0.04)'}}>
                <div className="flex flex-row items-center justify-center gap-4 mb-2">
                  {/* Dynamic icon based on typeDropdown, larger with vibrant gradient border */}
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, #6366F1 0%, #E64980 60%, #FFC107 100%)',
                    padding: '3px',
                    marginRight: '1.25rem',
                    marginLeft: '0.25rem',
                  }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: '#fff',
                    }}>
                      <img src={typeIconMap[typeDropdown]} alt={typeDropdown} style={{width:'32px', height:'32px'}} />
                    </span>
                  </span>
                  {/* Vibrant gradient program name */}
                  <span
                    className="font-extrabold text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-indigo-700 via-pink-500 to-yellow-500 bg-clip-text text-transparent leading-tight font-display drop-shadow"
                    style={{
                      whiteSpace: 'pre-line',
                      wordBreak: 'break-word',
                      lineHeight: 1.15,
                      display: 'block',
                    }}
                  >
                    {(() => {
                      let name = selectedCourse?.programName || '';
                      if (!name) return '';
                      const words = name.split(' ');
                      if (words.length === 1) return name;
                      if (words.length === 2) return (<>{words[0]}<br />{words[1]}</>);
                      const mid = Math.ceil(words.length / 2);
                      return <>{words.slice(0, mid).join(' ')}<br />{words.slice(mid).join(' ')}</>;
                    })()}
                  </span>
                </div>
                <div className="flex flex-row items-center justify-center gap-4 mb-2">
                  <span className="text-lg text-gray-500 line-through">₹{selectedCourse.originalPrice?.toLocaleString()}</span>
                  <span className="text-3xl font-extrabold text-red-500">₹{selectedCourse.offerPrice?.toLocaleString()}</span>
                </div>
                <div className="flex flex-row items-center justify-center gap-2 mb-2">
                  <span className="text-base text-gray-700">{selectedCourse.live1on1} Mentoring Sessions</span>
                  <span className="text-base text-gray-700">|</span>
                  <span className="text-base text-gray-700">{selectedCourse.liveBatch} live classes</span>
                  <span className="text-base text-gray-700">|</span>
                  <span className="text-base text-gray-700">Batch size: {selectedCourse.batchSize}</span>
                </div>
                {/* Pricing Feature Badges - RECTANGULAR, light gray, thin red border */}
                <div className="flex flex-row items-center justify-center gap-4 mb-4">
                  {/* EMI Available */}
                  <span title="EMI Available" className="flex items-center justify-center w-20 h-12 bg-white rounded-md px-2 py-1 text-xs font-semibold text-gray-700 gap-1" style={{minWidth:'80px', minHeight:'48px'}}>
                    <img src="/emi.svg" alt="EMI" style={{width:'68px', height:'68px', maxWidth:'68px', maxHeight:'68px', objectFit:'contain'}} />
                  </span>
                  {/* Early Bird Offer */}
                  <span title="Early Bird Offer" className="flex items-center justify-center w-20 h-12 bg-white rounded-md px-2 py-1 text-xs font-semibold text-gray-700 gap-1" style={{minWidth:'80px', minHeight:'48px'}}>
                    <img src="/earlybirdoffer.svg" alt="Early Bird" style={{width:'80px', height:'80px', maxWidth:'80px', maxHeight:'80px', objectFit:'contain'}} />
                  </span>
                  {/* Batch Start Date */}
                  <span title="Batch Start Date" className="flex items-center justify-center w-28 h-12 bg-white rounded-md px-2 py-1 text-xs font-semibold text-blue-700" style={{minWidth:'112px', minHeight:'48px'}}>
                    <img src="/startdate.svg" alt="Batch Start" style={{width:'80px', height:'80px', maxWidth:'80px', maxHeight:'80px', objectFit:'contain'}} />
                    <span className="font-bold text-blue-700 text-base ml-0.5" style={{lineHeight:'0.9', marginLeft:'-8px'}}>{(() => {
                      // Default: 3 days from today
                      const today = new Date();
                      const batchDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);
                      const day = batchDate.getDate();
                      const month = batchDate.toLocaleString('default', { month: 'short' });
                      return `${day} ${month}`;
                    })()}</span>
                  </span>
                </div>
                {/* CTA Buttons */}
                <div className="flex flex-row gap-4 mt-4 w-full justify-center">
                  <button
                    className="bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 text-white font-bold py-3 px-8 rounded-xl shadow-lg text-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                    onClick={() => navigate('/book-appointment', {
                      state: {
                        persona: personaDropdown,
                        goal: goal,
                        typeOfCourse: typeDropdown,
                        year: formData.year || year, // year from formData or state
                        courseName: selectedCourse?.programName || '',
                        selectedCourse: selectedCourse
                      }
                    })}
                  >
                    Enroll Now
                  </button>
                  <button className="bg-white border-2 border-indigo-400 text-indigo-600 font-bold py-3 px-8 rounded-xl shadow text-lg hover:bg-indigo-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400">
                    Book a Call
                  </button>
                </div>
              </div>
            )}
          </div>
        </div> {/* <-- This closes the .relative.z-10.w-full.max-w-2xl.mx-auto.flex.flex-col.items-center.gap-8 */}
      </section>
      <Footer />
    </main>
  );
};

export default SinglePage;
