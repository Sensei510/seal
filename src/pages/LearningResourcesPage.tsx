import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Calendar, Clock, Download, ExternalLink, Lightbulb, Monitor, FileText, BookOpen, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

// Resource types
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'pdf';
  category: 'general' | 'physical' | 'written' | 'interview';
  url: string;
  icon: React.ReactNode;
  date: string;
  readTime?: string;
  watchTime?: string;
}

// Mock data for the resources
const resourcesData: Resource[] = [
  {
    id: '1',
    title: 'Overview of Armed Forces Entrance Exams',
    description: 'A comprehensive guide to different entrance examinations for the Indian Armed Forces.',
    type: 'article',
    category: 'general',
    url: '#',
    icon: <FileText className="h-5 w-5" />,
    date: 'May 15, 2023',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'Physical Fitness Training Plan for Armed Forces Selection',
    description: 'Detailed workout regimen to prepare for the physical tests in military selection.',
    type: 'article',
    category: 'physical',
    url: '#',
    icon: <FileText className="h-5 w-5" />,
    date: 'June 3, 2023',
    readTime: '12 min read'
  },
  {
    id: '3',
    title: 'Common Interview Questions at SSB',
    description: 'Prepare for your Services Selection Board interview with these frequently asked questions and suggested answers.',
    type: 'article',
    category: 'interview',
    url: '#',
    icon: <FileText className="h-5 w-5" />,
    date: 'April 22, 2023',
    readTime: '10 min read'
  },
  {
    id: '4',
    title: 'Understanding the AFCAT Exam Pattern',
    description: 'Learn about the structure, sections, and marking scheme for the Air Force Common Admission Test.',
    type: 'article',
    category: 'written',
    url: '#',
    icon: <FileText className="h-5 w-5" />,
    date: 'July 8, 2023',
    readTime: '7 min read'
  },
  {
    id: '5',
    title: 'Day in the Life of an Indian Army Officer',
    description: 'Experience the daily routine and responsibilities of officers in the Indian Army.',
    type: 'video',
    category: 'general',
    url: '#',
    icon: <Monitor className="h-5 w-5" />,
    date: 'March 12, 2023',
    watchTime: '18 min'
  },
  {
    id: '6',
    title: 'Physical Fitness Test Demonstration',
    description: 'Watch a detailed demonstration of all exercises included in the Armed Forces physical fitness tests.',
    type: 'video',
    category: 'physical',
    url: '#',
    icon: <Monitor className="h-5 w-5" />,
    date: 'February 5, 2023',
    watchTime: '22 min'
  },
  {
    id: '7',
    title: 'Mock SSB Interview Session',
    description: 'Watch a simulated Services Selection Board interview to understand the process and expectations.',
    type: 'video',
    category: 'interview',
    url: '#',
    icon: <Monitor className="h-5 w-5" />,
    date: 'April 8, 2023',
    watchTime: '35 min'
  },
  {
    id: '8',
    title: 'Navy Entrance Exam Preparation Guide',
    description: 'Comprehensive study material for the Indian Navy entrance examinations.',
    type: 'pdf',
    category: 'written',
    url: '#',
    icon: <Download className="h-5 w-5" />,
    date: 'May 30, 2023'
  },
  {
    id: '9',
    title: 'CDS Exam Sample Papers',
    description: 'Collection of previous years\' Combined Defence Services Examination papers with solutions.',
    type: 'pdf',
    category: 'written',
    url: '#',
    icon: <Download className="h-5 w-5" />,
    date: 'January 25, 2023'
  },
  {
    id: '10',
    title: 'Group Tasks in SSB - A Guide',
    description: 'Learn about the group task activities conducted during the SSB and how to approach them.',
    type: 'pdf',
    category: 'interview',
    url: '#',
    icon: <Download className="h-5 w-5" />,
    date: 'March 7, 2023'
  }
];

const LearningResourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');
  
  // Filter resources based on active filters
  const filteredResources = resourcesData.filter(resource => {
    const categoryMatch = activeCategory === 'all' || resource.category === activeCategory;
    const typeMatch = activeType === 'all' || resource.type === activeType;
    return categoryMatch && typeMatch;
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-neutral-800 to-neutral-900 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Learning <span className="text-accent-gold">Resources</span>
            </h1>
            <p className="text-lg text-neutral-300">
              Prepare for a career in the Indian Armed Forces with our comprehensive collection of study materials, guides, and preparatory resources.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Preparation Tips */}
      <section className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">Essential Preparation Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="bg-army-green w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Book className="text-white h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Academic Preparation</h3>
              <p className="text-neutral-700 mb-4">
                Focus on mathematics, english, general knowledge, and logical reasoning. Use standard textbooks and practice previous years' question papers.
              </p>
              <div className="text-army-green font-medium">
                Recommendation: Dedicate 3-4 hours daily for studies
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="bg-navy-blue w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="text-white h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Physical Fitness</h3>
              <p className="text-neutral-700 mb-4">
                Build endurance through running, swimming, and circuit training. Include push-ups, pull-ups, and sit-ups in your regular routine.
              </p>
              <div className="text-navy-blue font-medium">
                Recommendation: Minimum 1 hour of physical exercise daily
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="bg-airforce-blue w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Bookmark className="text-white h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">Current Affairs</h3>
              <p className="text-neutral-700 mb-4">
                Stay updated with national and international news, defense developments, and geopolitical situations through newspapers and quality news sources.
              </p>
              <div className="text-airforce-blue font-medium">
                Recommendation: Read quality newspaper daily
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="bg-accent-gold w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="text-white h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">SSB Interview</h3>
              <p className="text-neutral-700 mb-4">
                Develop leadership qualities, confidence, and problem-solving skills. Practice group discussions and personal interviews with friends.
              </p>
              <div className="text-accent-dark font-medium">
                Recommendation: Join SSB preparation groups
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Resources Filters & Listing */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">Study Resources</h2>
          
          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setActiveCategory('all')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeCategory === 'all' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                All Categories
              </button>
              <button 
                onClick={() => setActiveCategory('general')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeCategory === 'general' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                General
              </button>
              <button 
                onClick={() => setActiveCategory('physical')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeCategory === 'physical' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                Physical Preparation
              </button>
              <button 
                onClick={() => setActiveCategory('written')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeCategory === 'written' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                Written Exam
              </button>
              <button 
                onClick={() => setActiveCategory('interview')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeCategory === 'interview' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                Interview & SSB
              </button>
            </div>
            
            <div className="h-px w-full md:h-auto md:w-px bg-neutral-200 my-4 md:mx-6"></div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setActiveType('all')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${activeType === 'all' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                All Types
              </button>
              <button 
                onClick={() => setActiveType('article')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center ${activeType === 'article' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                <FileText className="h-4 w-4 mr-1" /> Articles
              </button>
              <button 
                onClick={() => setActiveType('video')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center ${activeType === 'video' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                <Monitor className="h-4 w-4 mr-1" /> Videos
              </button>
              <button 
                onClick={() => setActiveType('pdf')} 
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center ${activeType === 'pdf' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
              >
                <Download className="h-4 w-4 mr-1" /> PDFs
              </button>
            </div>
          </div>
          
          {/* Resources Listing */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredResources.length > 0 ? (
              filteredResources.map(resource => (
                <motion.div 
                  key={resource.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-4px]"
                  variants={itemVariants}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        resource.type === 'article' ? 'bg-neutral-100 text-neutral-700' :
                        resource.type === 'video' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        <div className="flex items-center">
                          {resource.icon}
                          <span className="ml-1 capitalize">{resource.type}</span>
                        </div>
                      </span>
                      <span className="text-xs text-neutral-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> {resource.date}
                      </span>
                    </div>
                    
                    <h3 className="font-display text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-neutral-600 text-sm mb-4">{resource.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        to={resource.url} 
                        className="text-army-green font-medium text-sm hover:text-army-dark transition-colors inline-flex items-center"
                      >
                        {resource.type === 'article' ? 'Read Article' :
                         resource.type === 'video' ? 'Watch Video' :
                         'Download PDF'}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                      
                      {(resource.readTime || resource.watchTime) && (
                        <span className="text-xs text-neutral-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {resource.readTime || resource.watchTime}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-neutral-500">No resources found matching your current filters.</p>
                <button 
                  onClick={() => {setActiveCategory('all'); setActiveType('all');}}
                  className="mt-4 text-army-green hover:text-army-dark transition-colors font-medium"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Official Resources */}
      <section className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">Official Resources</h2>
          
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <p className="text-neutral-700 mb-6">
              For the most accurate and up-to-date information, always refer to the official websites of the Indian Armed Forces:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-army-green w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <ExternalLink className="text-white h-4 w-4" />
                </div>
                <div>
                  <a 
                    href="https://joinindianarmy.nic.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-army-green hover:text-army-dark transition-colors"
                  >
                    Indian Army Official Recruitment Website
                  </a>
                  <p className="text-sm text-neutral-600 mt-1">Information about Army recruitment, exam notifications, and application process.</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-navy-blue w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <ExternalLink className="text-white h-4 w-4" />
                </div>
                <div>
                  <a 
                    href="https://www.joinindiannavy.gov.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-navy-blue hover:text-navy-dark transition-colors"
                  >
                    Indian Navy Official Recruitment Website
                  </a>
                  <p className="text-sm text-neutral-600 mt-1">Details about Navy entrance exams, officer and sailor recruitment.</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-airforce-blue w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <ExternalLink className="text-white h-4 w-4" />
                </div>
                <div>
                  <a 
                    href="https://afcat.cdac.in/AFCAT/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-airforce-blue hover:text-airforce-dark transition-colors"
                  >
                    Indian Air Force AFCAT Website
                  </a>
                  <p className="text-sm text-neutral-600 mt-1">Information about Air Force Common Admission Test and other recruitment avenues.</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-neutral-700 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                  <ExternalLink className="text-white h-4 w-4" />
                </div>
                <div>
                  <a 
                    href="https://upsc.gov.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-neutral-700 hover:text-neutral-900 transition-colors"
                  >
                    Union Public Service Commission
                  </a>
                  <p className="text-sm text-neutral-600 mt-1">For information about the Combined Defence Services Examination (CDSE) and National Defence Academy Examination (NDA).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-army-dark to-army-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Preparation?</h2>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Begin your journey to joining the Indian Armed Forces with proper preparation and guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/categories" 
              className="bg-white text-army-green hover:bg-neutral-100 font-medium py-3 px-6 rounded-md transition-colors"
            >
              Explore Career Options
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-6 rounded-md transition-colors"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningResourcesPage;