import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <AlertCircle className="h-16 w-16 text-army-green mx-auto" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            404 <span className="text-army-green">|</span> Page Not Found
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            The page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to the home page.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center bg-army-green hover:bg-army-dark text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;