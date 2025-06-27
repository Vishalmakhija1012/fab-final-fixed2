import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer = ({
  showQuickLinks = true,
  showConnect = true,
  showLegal = true,
  showCopyright = true,
} = {}) => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-2xl font-extrabold text-red-400 mb-2">fabulinus</h3>
          <p className="mt-2 mb-4 text-white">
            Express<span className="text-red-400">.</span> Communicate<span className="text-red-400">.</span> Dominate<span className="text-red-400">.</span>
          </p>
          <p className="text-gray-400 leading-relaxed">
            Empowering individuals to communicate with confidence and clarity. Join us to unlock your potential.
          </p>
        </div>
        {showQuickLinks && (
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-red-400 transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-red-400 transition-colors">Courses</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-red-400 transition-colors">Blog</Link></li>
            </ul>
          </div>
        )}
        {showConnect && (
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-red-400 transition-colors"><Facebook size={24} /></a>
              <a href="#" aria-label="Twitter" className="hover:text-red-400 transition-colors"><Twitter size={24} /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-red-400 transition-colors"><Linkedin size={24} /></a>
              <a href="#" aria-label="Instagram" className="hover:text-red-400 transition-colors"><Instagram size={24} /></a>
            </div>
          </div>
        )}
        {showLegal && (
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-red-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-red-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        )}
      </div>
      {showCopyright && (
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>&copy; 2024 Fabulinus. All rights reserved.</p>
        </div>
      )}
    </footer>
  );
};
