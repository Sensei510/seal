import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Compass, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArmyCategoriesPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
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
      <section className="bg-neutral-100 py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
              Indian Armed Forces <span className="text-accent-gold">Categories</span>
            </h1>
            <p className="text-neutral-600 text-center max-w-3xl mx-auto">
              The Indian Armed Forces consist of three professional uniformed services. Each branch has its unique role, traditions, and opportunities for service.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Army Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="bg-army-green w-14 h-14 rounded-full flex items-center justify-center mr-4">
                  <Shield className="text-white h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold text-army-green">Indian Army</h2>
              </div>
              
              <p className="text-neutral-700 mb-6">
                The Indian Army is the land-based branch and the largest component of the Indian Armed Forces. Its primary mission is to ensure national security and defense of India against external aggression and threats, and maintaining peace and security within its borders.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-neutral-100 p-4 rounded">
                  <h3 className="font-display font-semibold text-lg text-army-green mb-2">Size & Strength</h3>
                  <p className="text-neutral-600">Over 1.2 million active personnel, making it one of the largest standing armies in the world.</p>
                </div>
                
                <div className="bg-neutral-100 p-4 rounded">
                  <h3 className="font-display font-semibold text-lg text-army-green mb-2">Key Missions</h3>
                  <p className="text-neutral-600">Border defense, counter-terrorism, disaster relief, and UN peacekeeping operations.</p>
                </div>
                
                <div className="bg-neutral-100 p-4 rounded">
                  <h3 className="font-display font-semibold text-lg text-army-green mb-2">Career Paths</h3>
                  <p className="text-neutral-600">Officer, Junior Commissioned Officer (JCO), and Other Ranks with numerous specializations.</p>
                </div>
                
                <div className="bg-neutral-100 p-4 rounded">
                  <h3 className="font-display font-semibold text-lg text-army-green mb-2">Training Centers</h3>
                  <p className="text-neutral-600">Indian Military Academy (IMA), Officers Training Academy (OTA), and various regimental centers.</p>
                </div>
              </div>
              
              <Link 
                to="/how-to-apply/army" 
                className="bg-army-green hover:bg-army-dark text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center"
              >
                How to Apply <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              <img 
                src="https://images.pexels.com/photos/1788351/pexels-photo-1788351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Indian Army soldiers" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Navy Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/545972/pexels-photo-545972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Indian Navy ships" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            
            <div className="lg:w-1/2">
              <div className="flex items-center mb-4">
                <div className="bg-navy-blue w-14 h-14 rounded-full flex items-center justify-center mr-4">
                  <Compass className="text-white h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold text-navy-blue">Indian Navy</h2>
              </div>
              
              <p className="text-neutral-700 mb-6">
                The Indian Navy is the naval branch of the Indian Armed Forces. Its primary objective is to safeguard the nation's maritime borders and, in conjunction with other Armed Forces, act to deter or defeat any threats in the maritime domain.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-display font-semibold text-lg text-navy-blue mb-2">Fleet Strength</h3>
                  <p className="text-neutral-600">Over 150 ships and submarines, including aircraft carriers, destroyers, frigates, and submarines.</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-display font-semibold text-lg text-navy-blue mb-2">Key Operations</h3>
                  <p className="text-neutral-600">Maritime security, anti-piracy measures, disaster relief, and power projection across the Indian Ocean Region.</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-display font-semibold text-lg text-navy-blue mb-2">Career Paths</h3>
                  <p className="text-neutral-600">Officers (Executive, Engineering, Electrical, Education), Sailors, and specialized technical roles.</p>
                </div>
                
                <div className="bg-white p-4 rounded shadow-sm">
                  <h3 className="font-display font-semibold text-lg text-navy-blue mb-2">Training Institutes</h3>
                  <p className="text-neutral-600">Indian Naval Academy (INA), Naval College of Engineering, and various technical schools.</p>
                </div>
              </div>
              
              <Link 
                to="/how-to-apply/navy" 
                className="bg-navy-blue hover:bg-navy-dark text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center"
              >
                How to Apply <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Air Force Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="flex items-center mb-4">
                <div className="bg-airforce-blue w-14 h-14 rounded-full flex items-center justify-center mr-4">
                  <Award className="text-white h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold text-airforce-blue">Indian Air Force</h2>
              </div>
              
              <p className="text-neutral-700 mb-6">
                The Indian Air Force (IAF) is the air arm of the Indian Armed Forces. Its primary responsibility is to secure Indian airspace and conduct aerial warfare during armed conflict. It was officially established on 8 October 1932.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-neutral-100 p-4 rounded">
                  <h3 className="font-display font-semibold text-lg text-airforce-blue mb-2">Aircraft Fleet</h3>
                  <p className="text-neutral-600">Diverse fleet of fighter jets, transport aircraft, helicopters, and unmanned aerial vehicles.</p>
                </div>
                
                <div className="bg-neutral-100 p-4 rounded">
                  <h3 className="font-display font-semibold text-lg text-airforce-blue mb-2">Key Capabilities</h3>
                  <p className="text-neutral-600">Air defense, precision strikes, transportation, reconnaissance, and humanitarian assistance.</p>
                </div>
                
                <div className="bg-neutral-100 p-4 rounded">
                  <h3 className="font-display font-semibold text-lg text-airforce-blue mb-2">Career Paths</h3>
                  <p className="text-neutral-600">Flying Branch, Technical Branch, Ground Duty Branch, and various non-commissioned roles.</p>
                </div>
                
                <div className="bg-neutral-100 p-4 rounded">
                  <h3 className="font-display font-semibold text-lg text-airforce-blue mb-2">Training Centers</h3>
                  <p className="text-neutral-600">Air Force Academy, Flying Training Establishments, and Technical Training Institutes.</p>
                </div>
              </div>
              
              <Link 
                to="/how-to-apply/airforce" 
                className="bg-airforce-blue hover:bg-airforce-dark text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center"
              >
                How to Apply <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              <img 
                src="https://images.pexels.com/photos/76971/fighter-jet-fighter-aircraft-f-16-falcon-aircraft-76971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Indian Air Force jets" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Special Forces Section */}
      <section className="py-16 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Elite <span className="text-accent-gold">Special Forces</span></h2>
            <p className="max-w-3xl mx-auto mb-12 text-neutral-300">
              The Indian Armed Forces also maintain elite special operations units that undertake high-risk missions requiring specialized training and equipment.
            </p>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="bg-neutral-700/50 p-6 rounded-lg" variants={itemVariants}>
                <h3 className="font-display text-xl font-semibold mb-3 text-accent-gold">Para Special Forces</h3>
                <p className="text-neutral-300 mb-4">Elite special operations unit of the Indian Army trained for direct action, special reconnaissance, and counter-terrorism.</p>
              </motion.div>
              
              <motion.div className="bg-neutral-700/50 p-6 rounded-lg" variants={itemVariants}>
                <h3 className="font-display text-xl font-semibold mb-3 text-accent-gold">MARCOS</h3>
                <p className="text-neutral-300 mb-4">Marine Commandos of the Indian Navy, specialized in maritime operations, counter-terrorism, and hostage rescue.</p>
              </motion.div>
              
              <motion.div className="bg-neutral-700/50 p-6 rounded-lg" variants={itemVariants}>
                <h3 className="font-display text-xl font-semibold mb-3 text-accent-gold">Garud Commando Force</h3>
                <p className="text-neutral-300 mb-4">Special forces unit of the Indian Air Force trained for special operations, airfield seizure, and counter-terrorism.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ArmyCategoriesPage;