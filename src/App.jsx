import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Award, Book, Star, Briefcase, Trophy, Newspaper, Quote, CheckCircle, ChevronDown, Facebook, Twitter, Linkedin, Instagram, Menu } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';

// New ComparisonCell component (moved to top level for proper definition)
const ComparisonCell = ({ status, detail, isFabulinusCol }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowDetail(false); // Hide tooltip if resized to desktop
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const iconColorClass = status ? "text-red-400" : "text-red-500";
  const icon = status ? <CheckCircle size={28} className={iconColorClass} /> : <span className={`text-3xl font-bold ${iconColorClass}`}>X</span>;

  return (
    <div 
      className={`col-span-1 flex flex-col items-center relative ${isMobile ? 'cursor-pointer' : 'cursor-auto'} 
                  ${isFabulinusCol ? 'comparison-cell-fabulinus' : 'comparison-cell-others'}`} 
      onMouseEnter={() => !isMobile && setShowDetail(true)} // Show on hover for desktop
      onMouseLeave={() => !isMobile && setShowDetail(false)} // Hide on leave for desktop
      onClick={() => isMobile && setShowDetail(!showDetail)} // Toggle on click for mobile
    >
      <div className="tooltip-wrapper">
          {icon}
          {isMobile && ( // Only render tooltip container on mobile
            <div className={`mobile-tooltip-container ${showDetail ? 'show' : ''}`}>
              <p className="tooltip-bubble">
                {detail}
              </p>
            </div>
          )}
      </div>
      {!isMobile && ( // Only render static text on desktop
        <p className="text-sm opacity-80 mt-1 text-gray-700 desktop-detail-text">
          {detail}
        </p>
      )}
    </div>
  );
};


// GreatFrameworkSection (Section 4)
const GreatFrameworkSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInViewAnimation(sectionRef);

  const greatPoints = [
    { letter: "G", word: "Grading", description: "Tailored assessments and defined benchmarks to track your development.", icon: <CheckCircle size={32} className="text-red-500" /> },
    { letter: "R", word: "Regular Monitoring", description: "Continuous feedback and performance evaluations to guide improvement.", icon: <CheckCircle size={32} className="text-red-500" /> },
    { letter: "E", word: "Experts", description: "Learn from Aparna Sinha, and other expert educators, using time-tested strategies.", icon: <CheckCircle size={32} className="text-red-500" /> },
    { letter: "A", word: "Accessibility", description: "Flexible scheduling, on-demand resources, and a supportive learning environment.", icon: <CheckCircle size={32} className="text-red-500" /> },
    { letter: "T", word: "Transparency", description: "Clear objectives, honest feedback, and absolutely no hidden costs.", icon: <CheckCircle size={32} className="text-red-500" /> },
  ];

  return (
    <section 
      ref={sectionRef} id="great-framework" 
      className={`relative py-24 px-6 sm:px-10 lg:px-20 text-gray-800 overflow-hidden flex flex-col items-center justify-center bg-gray-50`} 
    >
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob-alt animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center mb-16 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-gray-800 leading-tight">
          Excel in English Communication with the <span className="font-extrabold text-red-400">GREAT</span> Approach
        </h1> 
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 text-gray-800 max-w-3xl mx-auto">
          Unlock your <span className="font-extrabold text-red-400">potential</span> in public speaking, communication, and English proficiency—both verbal and written—through our <span className="font-extrabold text-red-400">structured</span> and results-driven GREAT Approach.
        </p>
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-700 max-w-3xl mx-auto">
          Whether you're a student, a working professional, or someone striving to build confidence, our <span className="font-extrabold text-red-400">methodology</span> ensures consistent progress and <span className="font-extrabold text-red-400">success</span>.
        </p>
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16 mt-12">
        {greatPoints.map((point, index) => (<div key={index} className={`flex flex-col items-start p-8 rounded-xl bg-white shadow-lg border border-gray-200 transition-all duration-700 ease-out hover:shadow-xl hover:scale-[1.01] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: `${0.15 * index}s` }}>
            <div className="flex items-center mb-4">
                <span className={`text-5xl font-extrabold mr-4 ${point.letter === 'G' ? 'text-red-600' : point.letter === 'R' ? 'text-red-600' : point.letter === 'E' ? 'text-red-600' : point.letter === 'A' ? 'text-red-600' : 'text-red-600'}`}>{point.letter}.</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{point.word}</h3>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">{point.description}</p>
            <span className="flex-shrink-0 text-red-500 mt-auto">{point.icon}</span>
          </div>
        ))}
      </div>
      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center mt-20 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="w-full flex flex-col items-center">
          <Link to="/persona-selection" className="inline-block bg-red-500 text-white hover:bg-red-600 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 text-xl">
            Explore Courses
          </Link>
          <LearnersSocialProof />
        </div>
      </div>
    </section>
  );
};

// HowWeAreDifferentSection (Section 5)
const HowWeAreDifferentSection = () => {
    const comparisonData = [
    {
        param: "Personalized Mentorship",
        fabulinus: { status: true, detail: "Direct guidance from a best-selling author." },
        others: { status: false, detail: "Generic, pre-recorded lessons." }
    },
    {
        param: "Structured Curriculum",
        fabulinus: { status: true, detail: "The GREAT framework for guaranteed results." },
        others: { status: false, detail: "Unstructured, one-size-fits-all content." }
    },
    {
        param: "One-on-One Sessions",
        fabulinus: { status: true, detail: "Dedicated sessions for individual feedback." },
        others: { status: false, detail: "Group classes with limited personal attention." }
    },
    {
        param: "Expert Instructors",
        fabulinus: { status: true, detail: "Learn from published authors and industry experts." },
        others: { status: false, detail: "Taught by generalists, not specialists." }
    },
    {
        param: "Transparent Pricing",
        fabulinus: { status: true, detail: "Clear, upfront costs with no hidden fees." },
        others: { status: false, detail: "Complex pricing with potential upsells." }
    }
];

    const sectionRef = useRef(null);
    const isInView = useInViewAnimation(sectionRef);

    return (
        <section 
            ref={sectionRef} id="how-we-are-different" 
            className={`relative py-24 px-6 sm:px-10 lg:px-20 text-gray-800 overflow-hidden flex flex-col items-center justify-center bg-white`} 
        >
            <div className={`relative z-10 w-full max-w-5xl mx-auto text-center mb-16 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-gray-800 leading-tight">
                    Our <span className="text-red-400">Difference</span>.
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 text-gray-800 max-w-3xl mx-auto">
                    Discover what sets Fabulinus apart in English communication training.
                </p>
            </div>

            <div className={`relative z-10 w-full max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden ${isInView ? 'animate-fadeInScale' : 'opacity-0'}`}>
                <div className="grid grid-cols-3 text-center text-gray-800 font-bold text-xl py-4 border-b border-gray-300">
                    <div className="col-span-1 py-2 flex items-center justify-start sm:justify-center">Parameter</div> 
                    <div className="col-span-1 py-2 flex items-center justify-center font-extrabold text-2xl text-red-400">Fabulinus</div> 
                    <div className="col-span-1 py-2 flex items-center justify-center">Others</div>
                </div>
                {comparisonData.map((item, index) => (
                    <div key={index} className={`grid grid-cols-3 items-center py-4 px-2 sm:px-4 text-lg md:text-xl ${index % 2 === 0 ? 'bg-white bg-opacity-5' : ''} border-b border-gray-300 last:border-b-0`}>
                        <div className="col-span-1 text-left font-medium text-base sm:text-lg text-gray-800">{item.param}</div>
                        <ComparisonCell status={item.fabulinus.status} detail={item.fabulinus.detail} isFabulinusCol={true} />
                        <ComparisonCell status={item.others.status} detail={item.others.detail} isFabulinusCol={false} />
                    </div>
                ))}
            </div>
        </section>
    );
};


// FAQs Section Component (Section 6 - formerly Section 5)
const FAQsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInViewAnimation(sectionRef); // For section-level animation

  const [openIndex, setOpenIndex] = useState(null);

  const faqsData = [
    {
      question: "Who are the teachers at Fabulinus?",
      answer: `Aparna Sinha, a best-selling author, is supported by highly qualified, English language and communication <span class="font-extrabold text-red-400">experts</span>.`
    },
    {
      question: "What is the GREAT Approach?",
      answer: `The GREAT <span class="font-extrabold text-red-400">Approach</span> is our unique and structured methodology, built on five pillars: Grading, Regular Monitoring, Experts, Accessibility, and Transparency. It is designed to ensure measurable <span class="font-extrabold text-red-400">improvement</span> in communication and public speaking skills.`
    },
    {
      question: "How are classes conducted?",
      answer: `Classes are delivered <span class="font-extrabold text-red-400">one-on-one</span> in an online format, offering personalized attention and flexible <span class="font-extrabold text-red-400">scheduling</span>. You can book sessions at your convenience and access learning resources anytime.`
    },
    {
      question: "Who can join the program?",
      answer: `We offer programs for <span class="font-extrabold text-red-400">all</span> age groups—including young learners, students, working professionals, and anyone aiming to enhance their English and communication <span class="font-extrabold text-red-400">abilities</span>.`
    },
    {
      question: "How do I track my progress?",
      answer: `You will receive regular <span class="font-extrabold text-red-400">feedback</span>, detailed progress reports, and clear learning <span class="font-extrabold text-red-400">benchmarks</span> after each session. Our transparent system ensures you stay informed and on track throughout your learning journey.`
    },
    {
      question: "How do I get an appointment with Aparna Ma'am?",
      answer: `Click the "Explore Courses" button anywhere on the site, fill in your details, and our team will contact you to <span class="font-extrabold text-red-400">schedule</span> your <span class="font-extrabold text-red-400">session</span> with Aparna Ma'am!`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      id="faqs" 
      className={`relative py-24 px-6 sm:px-10 lg:px-20 text-gray-800 overflow-hidden
                 flex flex-col items-center justify-center bg-white`} 
    >
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob-alt animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center mb-16 
        ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-gray-800 leading-tight">
          Frequently Asked <span className="font-extrabold text-red-400">Questions</span>
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-4">
        {faqsData.map((faq, index) => (
          <div 
            key={index} 
            className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 
                       transition-all duration-500 ease-out hover:shadow-xl hover:scale-[1.005]
                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <button 
              className="flex justify-between items-center w-full text-left font-semibold text-xl md:text-2xl text-gray-800 py-2 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <ChevronDown size={24} className={`accordion-icon transition-transform duration-300 ${openIndex === index ? 'rotate' : ''}`} />
            </button>
            <div className={`accordion-content ${openIndex === index ? 'open pt-4' : ''}`}>
              <p 
                className="text-lg text-gray-700 leading-relaxed" 
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              ></p>
            </div>
          </div>
        ))}
      </div>

      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center mt-20 
        ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="w-full flex flex-col items-center">
          <Link to="/persona-selection" className="inline-block bg-red-500 text-white hover:bg-red-600 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 text-xl">
            Explore Courses
          </Link>
          <LearnersSocialProof />
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
    const footerRef = useRef(null);
    const isInView = useInViewAnimation(footerRef);
    const quickLinks = [
        { name: "Home", href: "#hero" },
        { name: "Our Mentors", href: "#solutions" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "GREAT Approach", href: "#great-framework" },
        { name: "Why Us", href: "#how-we-are-different" },
        { name: "FAQs", href: "#faqs" },
        { name: "Contact", href: "#contact" }
    ];
    const socialLinks = [
        { name: "Facebook", icon: <Facebook size={24} />, href: "#" },
        { name: "Twitter", icon: <Twitter size={24} />, href: "#" },
        { name: "LinkedIn", icon: <Linkedin size={24} />, href: "#" },
        { name: "Instagram", icon: <Instagram size={24} />, href: "#" }
    ];

    const handleNavClick = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer 
            ref={footerRef}
            id="contact"
            className={`relative py-16 px-6 sm:px-10 lg:px-20 bg-gray-900 text-white overflow-hidden`}
        >
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob-alt animation-delay-2000"></div>
            </div>
            <div className={`relative z-10 w-full max-w-5xl mx-auto text-center ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-4">Quick Links</h3>
                        <nav className="w-full">
                            <ul className="space-y-2">
                                {quickLinks.map((link, index) => (
                                    <li key={index} className="text-center">
                                        <a href={link.href} onClick={handleNavClick} className="text-white hover:text-red-400 transition-colors duration-300">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a key={index} href={social.href} className="text-white hover:text-red-400 transition-colors duration-300">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-4">Contact Us</h3>
                        <p className="text-center text-gray-300">
                            Email: info@fabulinus.com
                        </p>
                        <p className="text-center text-gray-300">
                            Phone: +91 123 456 7890
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Main App Component - Renders all sections sequentially
const App = () => {
  return (
    // The main container's background creates the continuous flow for the entire page
    <div className="min-h-screen bg-white text-gray-800 antialiased overflow-x-hidden">
      <style>
        {`
        /* Essential CSS for consistent scrolling in various environments */
        html, body {
            height: 100%; /* Important for min-h-screen to work consistently */
            margin: 0;
            padding: 0;
            overflow-y: auto; /* Allow scrolling on the body if content overflows */
        }

        /* Custom Keyframes for Animations (repeated for clarity, but ideally in a single global CSS file) */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes blob { 0%, 100% { transform: scale(1) translate(0px, 0px); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { transform: scale(1.1) translate(30px, -20px); border-radius: 30% 70% 60% 40% / 70% 40% 60% 30%; } 66% { transform: scale(0.9) translate(-20px, 20px); border-radius: 70% 30% 40% 60% / 40% 70% 30% 60%; } }
        @keyframes blob-alt { 0%, 100% { transform: scale(1) translate(0px, 0px); border-radius: 40% 60% 70% 30% / 30% 60% 40% 70%; } 50% { transform: scale(1.2) translate(-20px, 30px); border-radius: 70% 30% 40% 60% / 60% 70% 30% 40%; } 66% { transform: scale(0.8) translate(20px, -30px); border-radius: 30% 70% 60% 40% / 70% 40% 60% 30%; } }
        @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.7s ease-out forwards; }
        .animate-fadeInScale { animation: fadeInScale 0.7s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.7s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.7s ease-out forwards; }
        .animate-blob { animation: blob 8s infinite ease-in-out; }
        .animate-blob-alt { animation: blob-alt 9s infinite ease-in-out alternate; }
        .animate-float { animation: float 3s infinite ease-in-out; }
        .animate-gradientShift { background-size: 400% 400%; animation: gradientShift 15s ease infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
        .accordion-content.open { max-height: 500px; }
        .accordion-icon.rotate { transform: rotate(180deg); }
        `}
      </style>
      
      <Header />
      <HeroSection />
      <SolutionsSection /> 
      <TestimonialsSection />
      <GreatFrameworkSection />
      <HowWeAreDifferentSection />
      <FAQsSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

// Hook for Intersection Observer animations
const useInViewAnimation = (ref, threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isInView;
};

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close menu on click
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Our Mentors", href: "#solutions" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "GREAT Approach", href: "#great-framework" },
    { name: "Why Us", href: "#how-we-are-different" },
    { name: "FAQs", href: "#faqs" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-b-3xl">
      <div className="text-2xl font-extrabold text-red-400">fabulinus</div>
      <nav className="hidden md:flex space-x-6">
        {navLinks.map(link => (
          <a key={link.name} href={link.href} onClick={handleNavClick} className="text-red-600 hover:text-red-800 font-medium transition-colors duration-300">{link.name}</a>
        ))}
      </nav>
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={28} className="text-red-600" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
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

// Reusable Social Proof Component for learners
const LearnersSocialProof = () => {
    const learnersImages = [
        "/Professional.svg",
        "/Student.svg",
        "/Anyone.svg"
    ];

    return (
        <div className="flex items-center space-x-4 mt-4">
            <div className="flex -space-x-4">
                {learnersImages.map((src, index) => (
                    <img 
                        key={index}
                        className="w-12 h-12 rounded-full border-4 border-white shadow-lg object-cover bg-transparent"
                        style={{ backgroundColor: "transparent" }}
                        src={src}
                        alt={`Learner ${index + 1}`} 
                    />
                ))}
            </div>
            <div className="text-left">
                <div className="font-bold text-lg text-gray-800">100%</div>
                <div className="text-sm text-gray-600">Happy Learners</div>
            </div>
        </div>
    );
};


// Hero Section Component (Section 1)
const HeroSection = () => {
  const heroRef = useRef(null);
  const isInView = useInViewAnimation(heroRef, 0.5);

  return (
    <section 
      ref={heroRef} id="hero" 
      className={`relative flex flex-col items-center justify-center py-24 bg-gradient-to-br from-red-50 to-orange-100 text-gray-800 p-6 md:p-10 rounded-b-3xl shadow-2xl overflow-hidden animate-gradientShift`} 
    >
      <div className="absolute inset-0 z-0 opacity-15">
        <svg className="absolute top-0 -left-1/4 w-3/4 h-auto transform rotate-12 animate-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#E57373" d="M47.7,-64C61.4,-50.2,71.7,-33.4,70.5,-16.9C69.3,-0.5,56.7,15.6,45.8,28.2C34.9,40.9,25.7,50,13.7,56.5C1.6,62.9,-13.4,66.8,-24.5,61.9C-35.7,57,-43.1,43.3,-50.3,30.3C-57.5,17.2,-64.5,4.7,-64.8,-8.1C-65.1,-21,-58.6,-34,-48.5,-45.5C-38.3,-57,-24.5,-67,-9.6,-70.6C5.4,-74.2,20.8,-71.4,32.3,-64.4L32.3,-64.4Z" transform="translate(100 100)" /></svg>
        <svg className="absolute bottom-0 -right-1/4 w-3/4 h-auto transform -rotate-45 animate-blob animation-delay-2000" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#FFB74D" d="M50.2,-47.9C64.6,-40.4,75.4,-23.4,76.5,-5.9C77.5,11.6,68.9,29.6,56.9,41.9C44.9,54.2,29.5,60.8,12.7,62.8C-4.1,64.9,-22.4,62.4,-37.2,54.8C-52,47.2,-63.3,34.5,-69.1,18.4C-74.9,2.3,-75.2,-17.3,-67.2,-30.9C-59.2,-44.6,-43,-52.3,-27.1,-56C-11.2,-59.7,3.3,-59.5,16.5,-56.9L16.5,-56.9Z" transform="translate(100 100)" /></svg>
      </div>
      <div className={`relative z-10 w-full max-w-5xl mx-auto py-12 px-6 sm:px-8 lg:px-12 text-left ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}> 
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 tracking-tight text-left" style={{ animationDelay: '0.1s' }}>Master English <span className="text-red-400">Communication</span></h1>
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 flex flex-col items-start text-left" style={{ animationDelay: '0.3s' }}>
          <span>
            Express<span className="text-red-400">.</span> Communicate<span className="text-red-400">.</span> Dominate<span className="text-red-400">.</span>
          </span>
        </div>
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-4 text-gray-800 max-w-2xl text-left" style={{ animationDelay: '0.5s' }}>
          Get personalized guidance from top English instructors, through one-on-one sessions. Build fluency, precision and confidence.
        </p>
        <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 text-gray-800 max-w-2xl text-left" style={{ animationDelay: '0.5s' }}>
          Advance in your career and improve daily communication; get measurable results.
        </p>
        <Link to="/persona-selection" className="inline-block bg-red-500 text-white hover:bg-red-600 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 text-xl" style={{ animationDelay: '0.7s' }}>
          Explore Courses
        </Link>
        <LearnersSocialProof />
      </div>
      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white opacity-20 rounded-full animate-float delay-100"></div>
      <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-white opacity-20 rounded-full animate-float delay-300"></div>
      <div className="absolute top-1/2 right-1/2 w-10 h-10 bg-white opacity-20 rounded-xl animate-float delay-500"></div>
    </section>
  );
};

// Data for Solutions Section
const achievementsData = [
  { text: "Best-selling Indian author", icon: <Award size={40} className="text-yellow-400" /> }, 
  { text: "7 books published", icon: <Book size={40} className="text-red-400" /> }, 
  { text: "Queen of Thrillers!", icon: <Star size={40} className="text-red-400" /> }, 
  { text: "2X Entrepreneur", icon: <Briefcase size={40} className="text-blue-400" /> }, 
  { text: "Multiple national & international awards", icon: <Trophy size={40} className="text-purple-400" /> }, 
  { text: "Published in Indian & International Magazines", icon: <Newspaper size={40} className="text-orange-400" /> }, 
];
const mediaLogosData = [
  { src: "/hindustantimes.png", alt: "Hindustan Times" }, 
  { src: "/Republic.png", alt: "Republic" },
  { src: "/thehindu.png", alt: "The Hindu" },
  { src: "/dainikjagran.png", alt: "Dainik Jagran" },
  { src: "/dainikbhaskar.png", alt: "Dainik Bhaskar" },
  { src: "/bt.png", alt: "Business Times" },
  { src: "/DD.png", alt: "DD" },
  { src: "/TOI.png", alt: "TOI" },
  { src: "/amar.png", alt: "Amar Ujala" },
];

// SolutionsSection (Section 2)
const SolutionsSection = () => {
    const books = [
        { title: "Book 1", imgSrc: "/book1.png" },
        { title: "Book 2", imgSrc: "/book2.png" },
        { title: "Book 3", imgSrc: "/book3.png" },
        { title: "Book 4", imgSrc: "/book4.png" },
        { title: "Book 5", imgSrc: "/book5.png" },
        { title: "Book 6", imgSrc: "/book6.png" },
        { title: "Book 7", imgSrc: "/book7.png" }
    ];

    const sectionRef = useRef(null);
    const isInView = useInViewAnimation(sectionRef);

    const achievementsListRef = useRef(null);
    const achievementsListInView = useInViewAnimation(achievementsListRef);

    const mediaCoverageRef = useRef(null);
    const mediaCoverageInView = useInViewAnimation(mediaCoverageRef);

    const scrollContainerRef = useRef(null);
    const [activeBook, setActiveBook] = useState(0);

    const handleScroll = useCallback(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            const scrollLeft = scrollContainer.scrollLeft;
            const bookElements = Array.from(scrollContainer.children);

            let closestIndex = 0;
            let minDistance = Infinity;

            bookElements.forEach((book, index) => {
                const distance = Math.abs(book.offsetLeft - scrollLeft);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });
            setActiveBook(closestIndex);
        }
    }, []);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        let scrollTimeout;

        const debouncedScrollHandler = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScroll, 100);
        };

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', debouncedScrollHandler);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', debouncedScrollHandler);
            }
            clearTimeout(scrollTimeout);
        };
    }, [handleScroll]);

    return (
        <section 
            ref={sectionRef} id="solutions" 
            className={`relative py-24 text-gray-800 overflow-hidden flex flex-col items-center justify-center min-h-screen bg-white`} 
        >
            <div className={`relative z-10 w-full max-w-5xl mx-auto py-12 px-6 sm:px-8 lg:px-12 text-left ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-gray-800 leading-tight" style={{ animationDelay: '0.1s' }}>
                    Do not <span className="text-red-400">compromise</span>.
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 text-gray-800 leading-snug" style={{ animationDelay: '0.3s' }}>
                    Learn Personally from the best-selling Author Aparna Sinha.
                </h2>
                {/* Aparna's image - restored and sized as in Program Designer section */}
                <div className="flex justify-center mb-8">
                  <img 
                    src="/6.svg" 
                    alt="Aparna Sinha" 
                    className="rounded-full border-4 border-pink-200 shadow-xl object-cover bg-white solutions-aparna-img"
                    style={{ width: '320px', height: '320px', maxWidth: '250%', maxHeight: '250%' }}
                  />
                </div>
                <div className="relative w-full overflow-hidden mt-8 mb-16">
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 -mx-2"
                    >
                        {books.map((book, index) => (
                            <div key={index} className="flex-shrink-0 snap-start px-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
                                <img src={book.imgSrc} alt={book.title} className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-[1.02] cursor-pointer" />
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-0 left-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                    <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
                </div>

                <div className="flex justify-center space-x-3 mt-[-2rem] mb-8">
                    {books.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                const scrollContainer = scrollContainerRef.current;
                                const bookElement = scrollContainer.children[index];
                                if (scrollContainer && bookElement) {
                                    scrollContainer.scrollTo({
                                        left: bookElement.offsetLeft,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeBook === index ? 'bg-red-400 scale-125' : 'bg-gray-300'}`}
                            aria-label={`Go to book ${index + 1}`}
                        ></button>
                    ))}
                </div>

                <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-16 text-gray-700"> 
                    Aparna Sinha is a celebrated Indian author and entrepreneur, recognized for her impactful writing, public communication and leadership. With six published books and numerous awards, she has inspired many. Her work is widely featured and she is a sought-after voice in media and interviews.
                </p>
                <div ref={achievementsListRef} className={`relative z-10 w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 sm:p-10 bg-gradient-to-br from-red-50 to-orange-100 text-gray-800 rounded-2xl shadow-2xl ${achievementsListInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
                    {achievementsData.map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-white bg-opacity-20 rounded-lg transform transition-transform duration-300 hover:scale-105">
                            {achievement.icon}
                            <span className="text-lg font-medium">{achievement.text}</span>
                        </div>
                    ))}
                </div>

                <div ref={mediaCoverageRef} className={`relative z-10 w-full max-w-5xl mx-auto mt-20 text-center ${mediaCoverageInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
                    <h3 className="text-3xl font-bold mb-8 text-gray-800">Featured In</h3> 
                    <div className="grid grid-cols-3 gap-x-16 gap-y-12 justify-items-center items-center py-4"> 
                        {mediaLogosData.slice(0, 9).map((logo, index) => (<div key={index} className={`flex items-center justify-center ${mediaCoverageInView ? 'opacity-100 animate-fadeInScale' : 'opacity-0'}`} style={{ animationDelay: `${index * 100}ms` }}>
                                <img src={logo.src} alt={logo.alt} className="h-20 w-auto object-contain opacity-70 filter grayscale hover:filter-none transition-all duration-300 hover:opacity-100 transform hover:scale-110" />
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-lg sm:text-xl md:text-2xl text-gray-600 mt-12">and more...</p> 
                </div>
            </div>
        </section>
    );
};

// Testimonials Section Component (Section 3)
const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInViewAnimation(sectionRef);

  const testimonialsData = [
    {
      name: "Ananya Sharma",
      role: "Software Engineer",
      testimonial: "Fabulinus, under Aparna's guidance, transformed my communication skills. The one-on-one sessions were tailored to my needs, helping me excel in client presentations.",
      image: "/Professional.svg"
    },
    {
      name: "Vikram Singh",
      role: "Marketing Manager",
      testimonial: "The GREAT framework is a game-changer. I can now articulate my ideas with clarity and confidence, which has been invaluable in my career. Aparna Mam's methods are truly effective.",
      image: "/Professional.svg"
    },
    {
      name: "Priya Mehta",
      role: "University Student",
      testimonial: "I used to be terrified of public speaking. Thanks to Aparna Mam's guidance, I can now confidently present in front of a large audience.",
      image: "/Student.svg"
    },
    {
      name: "Aarav Patel",
      role: "University Student",
      testimonial: "The personalized feedback from Aparna helped me identify my weak spots and work on them effectively. My grades have improved significantly.",
      image: "/Student.svg"
    },
    {
      name: "Mrs. Gupta",
      role: "Parent",
      testimonial: "My son's confidence has soared since joining Fabulinus. He is now an active participant in school debates, all thanks to the wonderful coaching.",
      image: "/Parent.svg"
    },
    {
      name: "Mr. & Mrs. Sharma",
      role: "Parents",
      testimonial: "We are thrilled with the progress our daughter has made. Aparna's personalized approach has made all the difference in her communication skills.",
      image: "/Parent.svg"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="testimonials" 
      className={`relative py-24 px-6 sm:px-10 lg:px-20 text-gray-800 overflow-hidden flex flex-col items-center justify-center bg-white`}
    >
      <div className={`relative z-10 w-full max-w-6xl mx-auto text-center mb-16 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-gray-800 leading-tight">
          What Our <span className="font-extrabold text-red-400">Learners & Parents</span> Say
        </h1>
      </div>
      <div className={`relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 ${isInView ? 'animate-fadeInScale' : 'opacity-0'}`}>
        {testimonialsData.map((testimonial, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-lg border border-gray-200 transition-all duration-500 ease-out hover:shadow-2xl hover:scale-[1.02]`}
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <Quote size={48} className="text-red-500 mb-4" />
            <p className="text-lg leading-relaxed text-gray-700 mb-6 font-medium flex-grow">"{testimonial.testimonial}"</p>
            <img src={testimonial.image} alt={testimonial.name} className="w-24 h-24 rounded-full mb-4 border-4 border-red-200 shadow-md" />
            <h3 className="text-xl font-bold text-red-700">{testimonial.name}</h3>
            <p className="text-md font-semibold text-white px-3 py-1 rounded-full bg-red-400 mt-2">{testimonial.role}</p>
          </div>
        ))}
      </div>
      <div className={`relative z-10 w-full max-w-5xl mx-auto text-center mt-20 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="w-full flex flex-col items-center">
          <Link to="/persona-selection" className="inline-block bg-red-500 text-white hover:bg-red-600 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75 text-xl">
            Explore Courses
          </Link>
          <LearnersSocialProof />
        </div>
      </div>
    </section>
  );
};

export default App;