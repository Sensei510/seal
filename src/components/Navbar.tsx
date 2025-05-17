import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Shield, User, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navbarBg = isScrolled ? 'bg-army-green shadow-md' : 'bg-transparent';
  const textColor = isScrolled ? 'text-white' : 'text-white';

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Army Categories', path: '/categories' },
    { name: 'Learning Resources', path: '/resources' },
    { name: 'Mock Test', path: '/mock-test' },
    { name: 'Mock Interview', path: '/mock-interview' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <Shield className="h-7 w-7 text-accent-gold" />
            <span className="font-display font-bold text-xl sm:text-2xl text-accent-gold">INDIAN ARMED FORCES</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `${textColor} font-medium hover:text-accent-gold transition-colors ${
                    isActive ? 'text-accent-gold' : ''
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/progress"
                  className={({ isActive }) =>
                    `${textColor} font-medium hover:text-accent-gold transition-colors flex items-center ${
                      isActive ? 'text-accent-gold' : ''
                    }`
                  }
                >
                  <BarChart className="h-5 w-5 mr-1" />
                  Progress
                </NavLink>
                <NavLink
                  to="/profile"
                  className="bg-accent-gold text-army-green px-4 py-2 rounded-md hover:bg-accent-dark transition-colors flex items-center"
                >
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </NavLink>
              </div>
            ) : (
              <NavLink
                to="/auth"
                className="bg-accent-gold text-army-green px-4 py-2 rounded-md hover:bg-accent-dark transition-colors"
              >
                Sign In
              </NavLink>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `${textColor} font-medium block hover:text-accent-gold transition-colors ${
                      isActive ? 'text-accent-gold' : ''
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              
              {user ? (
                <>
                  <NavLink
                    to="/progress"
                    className={({ isActive }) =>
                      `${textColor} font-medium hover:text-accent-gold transition-colors flex items-center ${
                        isActive ? 'text-accent-gold' : ''
                      }`
                    }
                  >
                    <BarChart className="h-5 w-5 mr-1" />
                    Progress
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className="bg-accent-gold text-army-green px-4 py-2 rounded-md hover:bg-accent-dark transition-colors flex items-center"
                  >
                    <User className="h-5 w-5 mr-1" />
                    Profile
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to="/auth"
                  className="bg-accent-gold text-army-green px-4 py-2 rounded-md hover:bg-accent-dark transition-colors"
                >
                  Sign In
                </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;