import React from 'react';
import { ArrowRight, Award, Shield, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10"></div>
          <img 
            src="https://images.pexels.com/photos/6497685/pexels-photo-6497685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Indian Armed Forces soldiers on duty" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 z-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Serve India With Pride <span className="text-accent-gold">& Honor</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-neutral-100">
              Join the elite ranks of the Indian Armed Forces and be part of a proud tradition of courage, discipline, and service to the nation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/categories" 
                className="bg-army-green hover:bg-army-dark text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center sm:justify-start"
              >
                Explore Branches <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/how-to-apply/army" 
                className="bg-transparent border-2 border-white hover:border-accent-gold text-white hover:text-accent-gold font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center sm:justify-start"
              >
                How to Apply
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Defending the Nation's <span className="text-army-green">Pride & Sovereignty</span></h2>
            <p className="max-w-2xl mx-auto text-neutral-600">The Indian Armed Forces consist of three professional uniformed services: the Indian Army, Indian Navy, and Indian Air Force.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-neutral-100 p-6 rounded-lg shadow-md"
            >
              <div className="bg-army-green w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-white h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-army-green">Indian Army</h3>
              <p className="text-neutral-700 mb-4">The backbone of national security with over 1.2 million active personnel, protecting our borders and serving in peacekeeping missions worldwide.</p>
              <Link to="/how-to-apply/army" className="text-army-green font-medium flex items-center hover:text-army-dark transition-colors">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-neutral-100 p-6 rounded-lg shadow-md"
            >
              <div className="bg-navy-blue w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Compass className="text-white h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-navy-blue">Indian Navy</h3>
              <p className="text-neutral-700 mb-4">Guardians of our maritime borders with sophisticated fleet of ships, submarines and aircraft, ensuring security of our vast coastline.</p>
              <Link to="/how-to-apply/navy" className="text-navy-blue font-medium flex items-center hover:text-navy-dark transition-colors">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-neutral-100 p-6 rounded-lg shadow-md"
            >
              <div className="bg-airforce-blue w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Award className="text-white h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-airforce-blue">Indian Air Force</h3>
              <p className="text-neutral-700 mb-4">The air defense wing with cutting-edge aircraft and technology, safeguarding our airspace and providing crucial air support during operations.</p>
              <Link to="/how-to-apply/airforce" className="text-airforce-blue font-medium flex items-center hover:text-airforce-dark transition-colors">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story/History Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">A Legacy of <span className="text-army-green">Courage & Valor</span></h2>
              <p className="text-neutral-700 mb-4">
                Since independence in 1947, the Indian Armed Forces have been the stalwart defenders of our nation's sovereignty. Through wars, natural disasters, and peacekeeping missions, they have exemplified the highest standards of professionalism and sacrifice.
              </p>
              <p className="text-neutral-700 mb-6">
                Today, as one of the world's largest military forces, they continue to modernize while holding steadfast to their core values of duty, honor, and patriotism. The armed forces offer not just a career, but a way of life dedicated to service and excellence.
              </p>
              <Link 
                to="/resources" 
                className="bg-army-green hover:bg-army-dark text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center"
              >
                Discover Our History <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <img 
                src="https://images.pexels.com/photos/7662850/pexels-photo-7662850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Indian Armed Forces historical moments" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-army-dark to-army-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Ready to Serve the Nation?</h2>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Take the first step towards a rewarding career in the Indian Armed Forces. Explore opportunities, learn about the application process, and prepare for a life of purpose and honor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/how-to-apply/army" 
              className="bg-white text-army-green hover:bg-neutral-100 font-medium py-3 px-6 rounded-md transition-colors"
            >
              Join the Army
            </Link>
            <Link 
              to="/how-to-apply/navy" 
              className="bg-white text-navy-blue hover:bg-neutral-100 font-medium py-3 px-6 rounded-md transition-colors"
            >
              Join the Navy
            </Link>
            <Link 
              to="/how-to-apply/airforce" 
              className="bg-white text-airforce-blue hover:bg-neutral-100 font-medium py-3 px-6 rounded-md transition-colors"
            >
              Join the Air Force
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;