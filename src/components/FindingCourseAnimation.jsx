import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, FileSearch, Loader } from 'lucide-react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const FindingCourseAnimation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {};
  const journeyId = formData.journeyId || localStorage.getItem('journeyId');

  const analysisSteps = [
    { label: "Goal", value: formData.goal },
    { label: "Year/Experience", value: formData.year },
    { label: "Course Type", value: formData.typeOfCourse },
    { label: "English Level", value: formData.englishLevel },
  ].filter(item => item.value);

  const craftingSteps = [
    "Custom Plan",
    "One-on-One Guidance by Aparna Ma’am",
    "Real Results with Personal Support.",
    "Realtime Progress Tracking",
    "Confidence scoring"
  ];

  const [phase, setPhase] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepInterval = 500;
    const phaseEndPause = 500; // Pause for 0.5s after a phase ends

    const totalDuration = (analysisSteps.length + craftingSteps.length) * stepInterval + phaseEndPause + 2000;

    const navigationTimer = setTimeout(() => {
      navigate('/single-page', { state: { ...formData, journeyId } });
    }, totalDuration);

    let phaseTransitionTimeout;

    const stepTimer = setInterval(() => {
      setCurrentStep(prevStep => {
        const currentPhaseSteps = phase === 1 ? analysisSteps : craftingSteps;
        if (prevStep < currentPhaseSteps.length) {
          return prevStep + 1;
        } else {
          clearInterval(stepTimer);
          if (phase === 1) {
            phaseTransitionTimeout = setTimeout(() => {
              setPhase(2);
              setCurrentStep(0);
            }, phaseEndPause);
          }
          return prevStep;
        }
      });
    }, stepInterval);

    return () => {
      clearTimeout(navigationTimer);
      clearInterval(stepTimer);
      clearTimeout(phaseTransitionTimeout);
    };
  }, [navigate, phase, analysisSteps.length, craftingSteps.length]);

  const steps = phase === 1 ? analysisSteps : craftingSteps;
  const title = phase === 1 ? "Analyzing your requirements" : "Crafting your solution";

  const Header = ({ showExploreCourses = true }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navLinks = [
      { name: "Home", href: "#hero" },
      { name: "Our Mentors", href: "#solutions" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "GREAT Approach", href: "#great-framework" },
      { name: "Why Us", href: "#how-we-are-different" },
      { name: "FAQs", href: "#faqs" },
      { name: "Contact", href: "#contact" }
    ];
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
  };

  return (
    <>
      <Header showExploreCourses={false} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12">
          <div className="text-center">
            {phase === 1 ? (
                <FileSearch size={56} className="text-indigo-500 mb-5 mx-auto animate-pulse" />
            ) : (
                <Loader size={56} className="text-indigo-500 mb-5 mx-auto animate-spin" />
            )}

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {title}
            </h1>
            <p className="text-gray-500 mb-8">
                Please wait while we tailor the perfect learning path for you.
            </p>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex items-center p-4 bg-indigo-50/50 border border-indigo-100 rounded-lg transition-all duration-500 ease-in-out transform ${currentStep > index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CheckCircle size={20} className={`flex-shrink-0 transition-colors duration-300 ${currentStep > index ? 'text-green-500' : 'text-gray-300'}`} />
                <div className="ml-4 text-sm md:text-base">
                  {phase === 1 ? (
                    <p className="text-gray-700">
                      <span className="font-semibold text-gray-900">{step.label}:</span> {step.value}
                    </p>
                  ) : (
                    <p className="font-semibold text-gray-900">{step}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FindingCourseAnimation;
