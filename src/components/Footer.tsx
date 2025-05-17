import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-accent-gold" />
              <span className="font-display font-bold text-lg text-accent-gold">INDIAN ARMED FORCES</span>
            </div>
            <p className="text-neutral-300 text-sm">
              Serving the nation with pride and honor since 1947. Defenders of our sovereignty and integrity.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-neutral-300 hover:text-accent-gold transition-colors">Home</Link></li>
              <li><Link to="/categories" className="text-neutral-300 hover:text-accent-gold transition-colors">Army Categories</Link></li>
              <li><Link to="/resources" className="text-neutral-300 hover:text-accent-gold transition-colors">Learning Resources</Link></li>
              <li><Link to="/contact" className="text-neutral-300 hover:text-accent-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display font-semibold text-lg mb-4">How to Apply</h3>
            <ul className="space-y-2">
              <li><Link to="/how-to-apply/army" className="text-neutral-300 hover:text-accent-gold transition-colors">Indian Army</Link></li>
              <li><Link to="/how-to-apply/navy" className="text-neutral-300 hover:text-accent-gold transition-colors">Indian Navy</Link></li>
              <li><Link to="/how-to-apply/airforce" className="text-neutral-300 hover:text-accent-gold transition-colors">Indian Air Force</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-neutral-300 hover:text-accent-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-gold transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <p className="text-neutral-300 text-sm">
              Subscribe to our newsletter for updates
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-neutral-700 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Indian Armed Forces. All rights reserved.</p>
          <p className="mt-1">This is a model website created for educational purposes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;