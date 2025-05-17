import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Compass, Award, CalendarDays, Calculator, GraduationCap, Hourglass, FileCheck, ExternalLink } from 'lucide-react';

// Define types for branch data
interface EligibilityCriteria {
  education: string;
  age: string;
  physical: string;
  additional?: string;
}

interface ApplicationStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface BranchData {
  name: string;
  fullName: string;
  color: string;
  darkColor: string;
  icon: React.ReactNode;
  description: string;
  heroImage: string;
  applicationUrl: string;
  eligibility: {
    officer: EligibilityCriteria;
    other: EligibilityCriteria;
  };
  applicationSteps: ApplicationStep[];
}

const HowToApplyPage: React.FC = () => {
  const { branch } = useParams<{ branch: string }>();
  
  // Data for each branch
  const branchesData: Record<string, BranchData> = {
    army: {
      name: 'Army',
      fullName: 'Indian Army',
      color: 'army-green',
      darkColor: 'army-dark',
      icon: <Shield className="h-6 w-6" />,
      description: 'The Indian Army is the land-based branch of the Indian Armed Forces. Join the proud tradition of courage, discipline, and service to the nation.',
      heroImage: 'https://images.pexels.com/photos/1788351/pexels-photo-1788351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      applicationUrl: 'https://joinindianarmy.nic.in/',
      eligibility: {
        officer: {
          education: 'Bachelor\'s degree from a recognized university for most entries. Technical entries require engineering degrees.',
          age: '19-25 years for most direct entries. Short Service Commission: 19-25 years. Technical Entry: 18-24 years.',
          physical: 'Minimum height: 157.5 cm. Chest: 77 cm with minimum 5 cm expansion. Good physical and mental health.',
          additional: 'Must pass the Services Selection Board (SSB) interview and medical examination.'
        },
        other: {
          education: 'Minimum 10th pass for some trades. 12th pass (10+2) with specific subjects for technical trades.',
          age: '17.5-21 years for most entries.',
          physical: 'Minimum height: 170 cm (relaxable for certain regions). Chest: 77 cm with minimum 5 cm expansion.'
        }
      },
      applicationSteps: [
        {
          title: 'Check Eligibility',
          description: 'Ensure you meet all the educational, age, and physical requirements for your desired entry.',
          icon: <FileCheck className="h-5 w-5" />
        },
        {
          title: 'Register Online',
          description: 'Create an account on the official Indian Army recruitment website and complete your profile.',
          icon: <GraduationCap className="h-5 w-5" />
        },
        {
          title: 'Apply for Open Positions',
          description: 'When notifications are published, apply for suitable positions through the portal.',
          icon: <CalendarDays className="h-5 w-5" />
        },
        {
          title: 'Written Examination',
          description: 'Appear for the written examination at your designated center if shortlisted.',
          icon: <Calculator className="h-5 w-5" />
        },
        {
          title: 'Services Selection Board',
          description: 'If you clear the written exam, attend the five-day SSB interview process which includes psychological tests, group tasks, and personal interviews.',
          icon: <Hourglass className="h-5 w-5" />
        }
      ]
    },
    navy: {
      name: 'Navy',
      fullName: 'Indian Navy',
      color: 'navy-blue',
      darkColor: 'navy-dark',
      icon: <Compass className="h-6 w-6" />,
      description: 'The Indian Navy is the naval branch of the Indian Armed Forces. Safeguard our maritime borders and project power across the Indian Ocean Region.',
      heroImage: 'https://images.pexels.com/photos/545972/pexels-photo-545972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      applicationUrl: 'https://www.joinindiannavy.gov.in/',
      eligibility: {
        officer: {
          education: 'Bachelor\'s degree with 60% marks for non-technical branches. B.Tech with 60% for technical branches. Some specialized roles require specific qualifications.',
          age: '19-24 years for most entries. Varies based on entry scheme.',
          physical: 'Minimum height: 157 cm. Good vision without glasses for some branches. Medical category: SHAPE-1.',
          additional: 'Must pass the Services Selection Board (SSB) interview and medical examination.'
        },
        other: {
          education: '10+2 qualified with Physics and Mathematics with at least 60% marks. Some trades require specific technical qualifications.',
          age: '17-21 years for most entries.',
          physical: 'Minimum height: 157 cm. Proportionate weight and chest. Good vision parameters depending on trade.'
        }
      },
      applicationSteps: [
        {
          title: 'Review Eligibility Criteria',
          description: 'Check official website to ensure you meet all necessary qualifications and physical standards.',
          icon: <FileCheck className="h-5 w-5" />
        },
        {
          title: 'Register Online',
          description: 'Create an account on the Indian Navy recruitment portal and complete your profile with accurate information.',
          icon: <GraduationCap className="h-5 w-5" />
        },
        {
          title: 'Apply for Advertised Positions',
          description: 'Submit applications for suitable entry schemes when notifications are published.',
          icon: <CalendarDays className="h-5 w-5" />
        },
        {
          title: 'Written Examination',
          description: 'Take the written examination if shortlisted, covering subject knowledge and aptitude.',
          icon: <Calculator className="h-5 w-5" />
        },
        {
          title: 'SSB Interview',
          description: 'If selected, attend the Services Selection Board interview which includes psychological assessment, group tasks, and interviews.',
          icon: <Hourglass className="h-5 w-5" />
        }
      ]
    },
    airforce: {
      name: 'Air Force',
      fullName: 'Indian Air Force',
      color: 'airforce-blue',
      darkColor: 'airforce-dark',
      icon: <Award className="h-6 w-6" />,
      description: 'The Indian Air Force is the air arm of the Indian Armed Forces. Secure Indian airspace and conduct aerial warfare with cutting-edge technology.',
      heroImage: 'https://images.pexels.com/photos/76971/fighter-jet-fighter-aircraft-f-16-falcon-aircraft-76971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      applicationUrl: 'https://afcat.cdac.in/AFCAT/',
      eligibility: {
        officer: {
          education: 'Flying Branch: 10+2 with Physics and Mathematics, or Bachelor\'s degree with 60%. Technical Branches: Engineering degree with minimum 60%. Ground Duty: Bachelor\'s degree with 60%.',
          age: 'Flying Branch: 20-24 years. Technical Branches: 20-26 years. Ground Duty: 20-26 years.',
          physical: 'Height: Minimum 162.5 cm. Good vision parameters for flying branch. Medical Category: A1G1.',
          additional: 'Must pass the Air Force Selection Board and medical examination.'
        },
        other: {
          education: '10+2 pass with Physics and Mathematics for most technical trades. Minimum 10th pass for non-technical trades.',
          age: '17-21 years for most entries.',
          physical: 'Minimum height: 152.5 cm (male), 148 cm (female). Proportionate weight and chest. Vision requirements as per trade.'
        }
      },
      applicationSteps: [
        {
          title: 'Verify Eligibility',
          description: 'Confirm you meet the educational qualifications, age requirements, and physical standards for your chosen branch.',
          icon: <FileCheck className="h-5 w-5" />
        },
        {
          title: 'Register Online',
          description: 'Create an account on the IAF recruitment website (AFCAT portal for officers) and complete your profile.',
          icon: <GraduationCap className="h-5 w-5" />
        },
        {
          title: 'Apply When Notified',
          description: 'Submit your application when recruitment cycles are announced for your preferred entry scheme.',
          icon: <CalendarDays className="h-5 w-5" />
        },
        {
          title: 'AFCAT/Other Examination',
          description: 'Take the Air Force Common Admission Test (for officers) or relevant examination for other ranks.',
          icon: <Calculator className="h-5 w-5" />
        },
        {
          title: 'Selection Board',
          description: 'If shortlisted, attend the Air Force Selection Board process including psychological tests, group activities, and interviews.',
          icon: <Hourglass className="h-5 w-5" />
        }
      ]
    }
  };

  // Default to army if no branch is specified or invalid branch
  const currentBranch = branch && branch in branchesData 
    ? branchesData[branch] 
    : branchesData.army;

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className={`relative h-[50vh] flex items-center bg-${currentBranch.color}`}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10"></div>
          <img 
            src={currentBranch.heroImage}
            alt={`${currentBranch.fullName} personnel`} 
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
            <div className="flex items-center mb-4">
              <div className={`bg-${currentBranch.color} bg-opacity-80 w-14 h-14 rounded-full flex items-center justify-center mr-4`}>
                {currentBranch.icon}
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">
                Join the {currentBranch.fullName}
              </h1>
            </div>
            <p className="text-lg mb-6">
              {currentBranch.description}
            </p>
            <a
              href={currentBranch.applicationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-${currentBranch.color} hover:bg-${currentBranch.darkColor} text-white font-medium py-3 px-6 rounded-md transition-colors inline-flex items-center`}
            >
              Official Recruitment Portal <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Branch Navigation */}
      <section className="bg-neutral-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/how-to-apply/army"
              className={`px-6 py-3 rounded-md font-medium transition-colors flex items-center ${branch === 'army' ? 'bg-army-green text-white' : 'bg-white text-army-green hover:bg-neutral-200'}`}
            >
              <Shield className="mr-2 h-5 w-5" /> Indian Army
            </Link>
            <Link 
              to="/how-to-apply/navy"
              className={`px-6 py-3 rounded-md font-medium transition-colors flex items-center ${branch === 'navy' ? 'bg-navy-blue text-white' : 'bg-white text-navy-blue hover:bg-neutral-200'}`}
            >
              <Compass className="mr-2 h-5 w-5" /> Indian Navy
            </Link>
            <Link 
              to="/how-to-apply/airforce"
              className={`px-6 py-3 rounded-md font-medium transition-colors flex items-center ${branch === 'airforce' ? 'bg-airforce-blue text-white' : 'bg-white text-airforce-blue hover:bg-neutral-200'}`}
            >
              <Award className="mr-2 h-5 w-5" /> Indian Air Force
            </Link>
          </div>
        </div>
      </section>
      
      {/* Eligibility Requirements */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold mb-8 text-center">Eligibility Requirements</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className={`font-display text-2xl font-semibold mb-4 text-${currentBranch.color}`}>For Officer Entry</h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <GraduationCap className={`h-6 w-6 text-${currentBranch.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Educational Qualifications</h4>
                    <p className="text-neutral-700">{currentBranch.eligibility.officer.education}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <CalendarDays className={`h-6 w-6 text-${currentBranch.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Age Requirements</h4>
                    <p className="text-neutral-700">{currentBranch.eligibility.officer.age}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <Shield className={`h-6 w-6 text-${currentBranch.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Physical Standards</h4>
                    <p className="text-neutral-700">{currentBranch.eligibility.officer.physical}</p>
                  </div>
                </div>
                
                {currentBranch.eligibility.officer.additional && (
                  <div className="flex">
                    <div className="mr-4 mt-1">
                      <FileCheck className={`h-6 w-6 text-${currentBranch.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Additional Requirements</h4>
                      <p className="text-neutral-700">{currentBranch.eligibility.officer.additional}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className={`font-display text-2xl font-semibold mb-4 text-${currentBranch.color}`}>For Other Ranks Entry</h3>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <GraduationCap className={`h-6 w-6 text-${currentBranch.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Educational Qualifications</h4>
                    <p className="text-neutral-700">{currentBranch.eligibility.other.education}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <CalendarDays className={`h-6 w-6 text-${currentBranch.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Age Requirements</h4>
                    <p className="text-neutral-700">{currentBranch.eligibility.other.age}</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 mt-1">
                    <Shield className={`h-6 w-6 text-${currentBranch.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Physical Standards</h4>
                    <p className="text-neutral-700">{currentBranch.eligibility.other.physical}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Application Process */}
      <section className={`py-12 bg-${currentBranch.color} bg-opacity-10`}>
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold mb-8 text-center">Application Process</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block"></div>
              
              <div className="space-y-8">
                {currentBranch.applicationSteps.map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row gap-4"
                  >
                    <div className="flex items-center md:block md:min-w-[120px]">
                      <div className={`w-8 h-8 rounded-full bg-${currentBranch.color} text-white flex items-center justify-center shadow-md z-10`}>
                        {step.icon}
                      </div>
                      <div className="ml-4 mr-4 text-lg font-semibold md:hidden">{step.title}</div>
                    </div>
                    
                    <div className="ml-12 md:ml-0 pl-0 md:pl-8 pb-2">
                      <h3 className={`text-lg font-semibold text-${currentBranch.color} hidden md:block`}>{step.title}</h3>
                      <p className="text-neutral-700 mt-2">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Important Notice */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md border-l-4 border-accent-gold">
            <h3 className="font-display text-xl font-semibold mb-4">Important Notice</h3>
            <p className="text-neutral-700 mb-4">
              The information provided here is general in nature. Requirements may change, and specific entry schemes may have additional criteria. Always refer to the official recruitment websites and notifications for the most current and accurate information.
            </p>
            <p className="text-neutral-700">
              Beware of fraudulent websites and agents. The official recruitment process does not involve any payment for application or selection.
            </p>
            <div className="mt-6">
              <a
                href={currentBranch.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-gold font-medium hover:text-accent-dark transition-colors inline-flex items-center"
              >
                Visit the official {currentBranch.fullName} recruitment website <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToApplyPage;