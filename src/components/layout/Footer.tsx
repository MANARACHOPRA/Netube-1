import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-darker py-12 mt-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">StreamHub</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your premium destination for the best video content from creators around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-white transition-colors">
                  Browse
                </Link>
              </li>
              <li>
                <Link to="/browse?type=movies" className="text-gray-400 hover:text-white transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/browse?type=series" className="text-gray-400 hover:text-white transition-colors">
                  Series
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/copyright" className="text-gray-400 hover:text-white transition-colors">
                  Copyright
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-400 hover:text-white transition-colors">
                  Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} StreamHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;