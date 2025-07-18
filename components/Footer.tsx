
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full mt-12 py-6 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} AI Read-to-Earn. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link to="/privacy-policy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
