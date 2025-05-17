import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Upload, Check, AlertCircle, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
  acceptTerms: boolean;
  profilePicture?: File;
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    acceptTerms: false
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loginStreak, setLoginStreak] = useState(0);

  const validatePassword = (password: string) => {
    const strength = {
      hasLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*]/.test(password)
    };
    
    return Object.values(strength).filter(Boolean).length;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        profilePicture: e.target.files![0]
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (!isLogin) {
      if (!formData.username) newErrors.username = 'Username is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms of service';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        }
        setLoginStreak(prev => prev + 1);
        navigate('/dashboard');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setErrors({ email: 'Invalid credentials' });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-army-green/10 to-neutral-100 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <h2 className="font-display text-2xl font-bold text-center mb-6">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {!isLogin && currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Username
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className={`block w-full px-4 py-3 rounded-md border ${
                            errors.username ? 'border-red-300' : 'border-gray-300'
                          } focus:ring-army-green focus:border-army-green pl-10`}
                          placeholder="Enter your username"
                        />
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                      {errors.username && (
                        <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Picture
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="profile-picture"
                        />
                        <label
                          htmlFor="profile-picture"
                          className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                        >
                          <Upload className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-gray-600">
                            {formData.profilePicture ? formData.profilePicture.name : 'Upload photo'}
                          </span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full bg-army-green text-white py-3 rounded-md hover:bg-army-dark transition-colors"
                    >
                      Next Step
                    </button>
                  </motion.div>
                )}

                {((!isLogin && currentStep === 2) || isLogin) && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`block w-full px-4 py-3 rounded-md border ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                          } focus:ring-army-green focus:border-army-green pl-10`}
                          placeholder="Enter your email"
                        />
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`block w-full px-4 py-3 rounded-md border ${
                            errors.password ? 'border-red-300' : 'border-gray-300'
                          } focus:ring-army-green focus:border-army-green pl-10`}
                          placeholder="Enter your password"
                        />
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                      )}
                      
                      {!isLogin && (
                        <div className="mt-2">
                          <div className="flex gap-1 h-1 mb-1">
                            {[1, 2, 3, 4, 5].map((segment) => (
                              <div
                                key={segment}
                                className={`flex-1 rounded-full transition-colors ${
                                  segment <= validatePassword(formData.password)
                                    ? getPasswordStrengthColor(validatePassword(formData.password))
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            Password strength: {
                              validatePassword(formData.password) <= 2 ? 'Weak' :
                              validatePassword(formData.password) <= 3 ? 'Medium' :
                              validatePassword(formData.password) <= 4 ? 'Strong' :
                              'Very Strong'
                            }
                          </p>
                        </div>
                      )}
                    </div>

                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`block w-full px-4 py-3 rounded-md border ${
                              errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                            } focus:ring-army-green focus:border-army-green pl-10`}
                            placeholder="Confirm your password"
                          />
                          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                        )}
                      </div>
                    )}

                    {isLogin && (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-army-green focus:ring-army-green border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <button
                          type="button"
                          className="text-sm text-army-green hover:text-army-dark"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    {!isLogin && (
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-army-green focus:ring-army-green border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            I accept the{' '}
                            <a href="#" className="text-army-green hover:text-army-dark">
                              terms of service
                            </a>
                          </span>
                        </label>
                        {errors.acceptTerms && (
                          <p className="text-sm text-red-600">{errors.acceptTerms}</p>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-army-green text-white py-3 rounded-md hover:bg-army-dark transition-colors flex items-center justify-center"
                    >
                      {isLoading ? (
                        <Loader className="h-5 w-5 animate-spin" />
                      ) : (
                        <>{isLogin ? 'Sign In' : 'Create Account'}</>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setCurrentStep(1);
                    setErrors({});
                  }}
                  className="text-sm text-gray-600 hover:text-army-green"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;