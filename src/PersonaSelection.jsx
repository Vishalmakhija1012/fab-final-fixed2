import { useNavigate, useSearchParams } from 'react-router-dom';
import React from 'react';
// import { db } from '../../firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const personas = [
	{
		key: 'parent',
		icon: <img src="/Parent.svg" alt="Parent" className="w-10 h-10" />, // replaced emoji
		title: 'Parent',
		age: 'For children (4-17 years)', // changed
		description: 'Help your child build confidence and communication skills for a bright future.',
	},
	{
		key: 'college-student',
		icon: <img src="/Student.svg" alt="College Student" className="w-10 h-10" />, // replaced emoji
		title: 'College Student',
		age: 'For college students', // changed
		description: 'Prepare for competitive exams. Stand out in interview with advanced English skills.',
	},
	{
		key: 'professional',
		icon: <img src="/Professional.svg" alt="Professional" className="w-10 h-10" />, // replaced emoji
		title: 'Professional',
		age: 'For working or aspiring adults', // changed
		description: 'Advance your career with powerful English and communication skills.',
	},
	{
		key: 'personal-growth',
		icon: <img src="/Anyone.svg" alt="Personal Growth" className="w-10 h-10" />, // replaced emoji
		title: 'Personal Growth', // changed from 'Teacher'
		age: 'For anyone seeking self-improvement', // updated from 'For educators and teachers'
		description: 'Unlock your potential and boost your confidence with expert guidance.', // updated description
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
			case 'college-student':
				detailPage = 'college-student';
				break;
			case 'professional':
				detailPage = 'professional';
				break;
			case 'personal-growth':
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

	return (
		<main className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
	);
}
