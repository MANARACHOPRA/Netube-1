import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react';
import NavMenu from './NavMenu';
import SearchBar from '../ui/SearchBar';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setShowSearch(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'nav-scrolled' : 'nav-gradient'
      }`}
    >
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo and primary navigation */}
          <div className="flex items-center">
            <Link to="/" className="mr-8">
              <h1 className="text-primary text-2xl font-bold">StreamHub</h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-white hover:text-gray-300 transition-colors">
                Home
              </Link>
              <Link to="/browse" className="text-white hover:text-gray-300 transition-colors">
                Browse
              </Link>
              <Link to="/browse?type=movies" className="text-white hover:text-gray-300 transition-colors">
                Movies
              </Link>
              <Link to="/browse?type=series" className="text-white hover:text-gray-300 transition-colors">
                Series
              </Link>
            </nav>
          </div>

          {/* Secondary Navigation */}
          <div className="flex items-center space-x-4">
            {showSearch ? (
              <SearchBar 
                onSubmit={handleSearchSubmit} 
                onClose={() => setShowSearch(false)}
              />
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 text-white hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            )}
            
            <button
              className="p-2 text-white hover:text-primary transition-colors hidden md:block"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>
            
            <div className="relative hidden md:block">
              <button
                className="flex items-center space-x-2 text-white hover:text-primary transition-colors"
                aria-label="Account"
              >
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                  <span className="text-sm font-medium">U</span>
                </div>
                <ChevronDown size={16} />
              </button>
              <NavMenu />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-white md:hidden"
              aria-label={showMobileMenu ? "Close menu" : "Open menu"}
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <nav className="mt-4 py-4 border-t border-gray-800 md:hidden animate-fade-in">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/"
                  className="block py-2 text-white hover:text-primary"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/browse"
                  className="block py-2 text-white hover:text-primary"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Browse
                </Link>
              </li>
              <li>
                <Link 
                  to="/browse?type=movies"
                  className="block py-2 text-white hover:text-primary"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link 
                  to="/browse?type=series"
                  className="block py-2 text-white hover:text-primary"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Series
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile"
                  className="block py-2 text-white hover:text-primary"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;