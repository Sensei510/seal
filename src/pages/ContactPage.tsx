import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, MessageSquare, User, AlertCircle, CheckCircle2 } from 'lucide-react';

const ContactPage: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = 'Phone number must be 10 digits';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage('There was a problem submitting your form. Please try again later.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-army-green to-army-dark text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Contact <span className="text-accent-gold">Us</span>
            </h1>
            <p className="text-lg text-neutral-100">
              Have questions about joining the Indian Armed Forces? Reach out to us and our team will provide the guidance you need.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/3"
            >
              <h2 className="font-display text-2xl font-bold mb-6">Get In Touch</h2>
              <p className="text-neutral-600 mb-8">
                Our team is ready to answer your questions about recruitment, eligibility, preparation, and other aspects of joining the Indian Armed Forces.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-army-green w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <MapPin className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Our Address</h3>
                    <p className="text-neutral-600">
                      Armed Forces Information Center<br />
                      123 Defense Colony<br />
                      New Delhi, 110024<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-army-green w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <Phone className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Phone Numbers</h3>
                    <p className="text-neutral-600">
                      General Inquiries: +91 11 2345 6789<br />
                      Recruitment Support: +91 11 2345 6790
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-army-green w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <Mail className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Email Addresses</h3>
                    <p className="text-neutral-600">
                      General Inquiries: info@armedforces.edu<br />
                      Support: support@armedforces.edu
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-army-green w-10 h-10 rounded-full flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <MessageSquare className="text-white h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800 mb-1">Office Hours</h3>
                    <p className="text-neutral-600">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:w-2/3"
            >
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
                <h2 className="font-display text-2xl font-bold mb-6">Send Us a Message</h2>
                
                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 text-green-800 rounded-md p-4 mb-6 flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Message sent successfully!</p>
                      <p className="mt-1 text-sm">Thank you for contacting us. We will get back to you as soon as possible.</p>
                    </div>
                  </div>
                )}
                
                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Failed to send message</p>
                      <p className="mt-1 text-sm">{errorMessage}</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2 rounded-md shadow-sm focus:ring-army-green focus:border-army-green border ${
                            formErrors.name ? 'border-red-300' : 'border-neutral-300'
                          }`}
                          placeholder="Your full name"
                        />
                      </div>
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>
                    
                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2 rounded-md shadow-sm focus:ring-army-green focus:border-army-green border ${
                            formErrors.email ? 'border-red-300' : 'border-neutral-300'
                          }`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                    
                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-neutral-400" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2 rounded-md shadow-sm focus:ring-army-green focus:border-army-green border ${
                            formErrors.phone ? 'border-red-300' : 'border-neutral-300'
                          }`}
                          placeholder="Your phone number (optional)"
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                      )}
                    </div>
                    
                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`block w-full px-3 py-2 rounded-md shadow-sm focus:ring-army-green focus:border-army-green border ${
                          formErrors.subject ? 'border-red-300' : 'border-neutral-300'
                        }`}
                      >
                        <option value="">Select a subject</option>
                        <option value="General Information">General Information</option>
                        <option value="Army Recruitment">Army Recruitment</option>
                        <option value="Navy Recruitment">Navy Recruitment</option>
                        <option value="Air Force Recruitment">Air Force Recruitment</option>
                        <option value="Technical Questions">Technical Questions</option>
                        <option value="Other">Other</option>
                      </select>
                      {formErrors.subject && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.subject}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Message Field */}
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 rounded-md shadow-sm focus:ring-army-green focus:border-army-green border ${
                        formErrors.message ? 'border-red-300' : 'border-neutral-300'
                      }`}
                      placeholder="Your message..."
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                    )}
                  </div>
                  
                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-army-green hover:bg-army-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-army-green transition-colors ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Send Message <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Official Channels Section */}
      <section className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl text-center font-bold mb-8">Official Recruitment Channels</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-army-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-army-green">Indian Army</h3>
              <p className="text-neutral-600 mb-4">
                For official recruitment information and application for the Indian Army.
              </p>
              <a 
                href="https://joinindianarmy.nic.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-army-green font-medium hover:text-army-dark transition-colors"
              >
                Visit Official Website <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-navy-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="text-white h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-navy-blue">Indian Navy</h3>
              <p className="text-neutral-600 mb-4">
                For official recruitment information and application for the Indian Navy.
              </p>
              <a 
                href="https://www.joinindiannavy.gov.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-navy-blue font-medium hover:text-navy-dark transition-colors"
              >
                Visit Official Website <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-airforce-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-airforce-blue">Indian Air Force</h3>
              <p className="text-neutral-600 mb-4">
                For official recruitment information and application for the Indian Air Force.
              </p>
              <a 
                href="https://afcat.cdac.in/AFCAT/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-airforce-blue font-medium hover:text-airforce-dark transition-colors"
              >
                Visit Official Website <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;