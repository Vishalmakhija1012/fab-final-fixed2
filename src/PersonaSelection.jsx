import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import React from 'react';
// import { db } from '../../firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Menu } from 'lucide-react';

const personas = [
	{
		key: 'parent',
		icon: <img src="/Parent.svg" alt="Parent" className="w-10 h-10" />, // replaced emoji
		title: 'Parent',
		age: 'For children (4-17 years)', // changed
		description: 'Help your child build confidence and communication skills for a bright future.',
	},
	{
		key: 'professional',
		icon: <img src="/Professional.svg" alt="Professional" className="w-10 h-10" />, // replaced emoji
		title: 'Professional',
		age: 'For working or aspiring adults', // changed
		description: 'Advance your career with powerful English and communication skills.',
	},
	{
		key: 'college-student',
		icon: <img src="/Student.svg" alt="College Student" className="w-10 h-10" />, // replaced emoji
		title: 'College Student',
		age: 'For college & university students', // changed
		description: 'Stand out in academics and beyond with advanced English skills.',
	},
	{
		key: 'anyone',
		icon: <img src="/Anyone.svg" alt="Anyone" className="w-10 h-10" />,
		title: 'Anyone',
		age: 'For anyone who wants Personal Growth',
		description: 'Empower yourself and enhance your work/personal journey. with Fabulinus',
	},
];

export default function PersonaSelection() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const handleSelect = (personaKey) => {
		let journeyId = localStorage.getItem('journeyId');
		if (!journeyId) {
			journeyId = uuidv4();
			localStorage.setItem('journeyId', journeyId);
		}
		// Logic to add document to Firestore
		// addDoc(collection(db, 'journeys'), {
		// 	journeyId,
		// 	persona: personaKey,
		// 	timestamp: serverTimestamp(),
		// 	cta: searchParams.get('cta') || 'organic',
		// }).catch((err) => console.error('Failed to log journey:', err));

		let detailPage = '';
		switch (personaKey) {
			case 'parent':
				detailPage = 'parent';
				break;
			case 'professional':
				detailPage = 'professional';
				break;
			case 'college-student':
				detailPage = 'college-student';
				break;
			case 'anyone':
				detailPage = 'personal-growth';
				break;
			default:
				detailPage = personaKey;
		}
		const cta = searchParams.get('cta');
		const query = cta ? `?cta=${encodeURIComponent(cta)}` : '';
		const url = `/persona/${detailPage}${query}`;
		navigate(url);
	};

	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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

	const Header = ({ showExploreCourses = true }) => (
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

	return (
		<>
			<Header showExploreCourses={false} />
			<main className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-32 md:pt-32 lg:pt-32">
				<div className="text-center mb-12">
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
						Who is this for?
					</h1>
					<p className="text-lg sm:text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
						Select the profile that best describes you to get a personalized experience.
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
					{personas.map((persona) => (
						<button
							key={persona.key}
							aria-label={`Select ${persona.title}`}
							className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-2xl border-4 border-transparent hover:border-red-400 focus:border-red-400 focus:outline-none transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
							onClick={() => handleSelect(persona.key)}
							tabIndex={0}
						>
							<div className="mb-5 text-red-400" aria-hidden="true">
								{persona.icon}
							</div>
							<h2 className="text-2xl font-bold text-gray-800 mb-2">
								{persona.title}
							</h2>
							<p className="text-red-600 font-semibold mb-4 text-sm">
								{persona.age}
							</p>
							<p className="text-gray-700 leading-relaxed">
								{persona.description}
							</p>
						</button>
					))}
				</div>
			</main>
		</>
	);
}
