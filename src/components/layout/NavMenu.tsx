import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Settings, LogOut } from 'lucide-react';

const NavMenu: React.FC = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 py-2 bg-dark-lighter rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
      <Link
        to="/profile"
        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-dark-lightest hover:text-white"
      >
        <UserCircle className="mr-2" size={16} />
        My Profile
      </Link>
      <Link
        to="/profile/settings"
        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-dark-lightest hover:text-white"
      >
        <Settings className="mr-2" size={16} />
        Settings
      </Link>
      <div className="border-t border-gray-800 my-1"></div>
      <button
        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-lightest hover:text-white"
      >
        <LogOut className="mr-2" size={16} />
        Sign Out
      </button>
    </div>
  );
};

export default NavMenu;