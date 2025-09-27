import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FiSun, FiMoon } from 'react-icons/fi';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MealPlanSubscription from './MealPlanSubscription';

export default function MealVersityLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showQuickOrder, setShowQuickOrder] = useState(false);
  const [dark, setDark] = useState(false);
  const [count, setCount] = useState(0);
  const [showAppPreregister, setShowAppPreregister] = useState(false);
  const [preregisterFormData, setPreregisterFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notifyMe: true
  });
  
  // Job application form state
  const [showJobApplication, setShowJobApplication] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobApplicationData, setJobApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null
  });
  const heroControls = useAnimation();
  const countersRef = useRef(null);
  const preregisterFormRef = useRef(null);
  const jobApplicationFormRef = useRef(null);

  // Career section states
  const [selectedJobCategory, setSelectedJobCategory] = useState('Tech');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Stable dark mode toggle handler
  const toggleDarkMode = useCallback(() => {
    setDark(prevDark => !prevDark);
  }, []);

  // Handle app pre-registration form
  const handlePreregisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreregisterFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePreregisterSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading indicator
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Submitting...';
    
    try {
      // Google Sheets API endpoint - using a more reliable deployment URL
      const apiUrl = "https://script.google.com/macros/s/AKfycbwWap3f_WrvrMZsscXtmZEaRaFWdxEfqeVWvurYAYVe7eIdu7K_Nj1URAarj-lcU2pFGA/exec";
      
      // Prepare data with timestamp
      const dataToSend = {
        ...preregisterFormData,
        timestamp: new Date().toISOString(),
        source: window.location.href
      };
      
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json"
        },
       mode: "no-cors"

      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === "success" || result.result === "success") {
        alert("✅ Thank you for pre-registering! Your data has been saved to our Google Sheet.");
        
        // Reset form and close popup on success
        setShowAppPreregister(false);
        setPreregisterFormData({
          name: '',
          email: '',
          phone: '',
          notifyMe: true
        });
      } else {
        throw new Error(result.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error submitting form to Google Sheets:", error);
      alert(`❌ Failed to submit: ${error.message || "Please check your connection and try again."}`);
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  };

  // Handle job application form
  const handleJobApplicationChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      setJobApplicationData(prev => ({
        ...prev,
        [name]: e.target.files[0]
      }));
    } else {
      setJobApplicationData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleJobApplicationSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading indicator
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Submitting...';
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success message
      alert(`✅ Thank you for applying for ${selectedJob?.title || 'this position'}! We'll review your application and contact you soon.`);
      
      // Reset form and close popup on success
      setShowJobApplication(false);
      setJobApplicationData({
        name: '',
        email: '',
        phone: '',
        resume: null
      });
    } catch (error) {
      console.error("Error submitting job application:", error);
      alert(`❌ Failed to submit: ${error.message || "Please check your connection and try again."}`);
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  };

  // Close popups when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (preregisterFormRef.current && !preregisterFormRef.current.contains(event.target)) {
        setShowAppPreregister(false);
      }
      if (jobApplicationFormRef.current && !jobApplicationFormRef.current.contains(event.target)) {
        setShowJobApplication(false);
      }
    }

    if (showAppPreregister || showJobApplication) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAppPreregister, showJobApplication]);

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  useEffect(() => {
    // animated counter demo
    let r = 0;
    const t = setInterval(() => {
      r += Math.ceil((2000 - r) / 12);
      setCount(r);
      if (r >= 2000) clearInterval(t);
    }, 90);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    heroControls.start({ y: [6, -6, 6], transition: { y: { yoyo: Infinity, duration: 6, ease: 'easeInOut' } } });
  }, [heroControls]);

  // ... rest of your component code (unchanged)





  const team = [
    { 
      id: 1, 
      name: 'Tarik Anowar', 
      role: 'CEO & Founder', 
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
      bio: 'Passionate about making healthy food accessible to everyone.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    },
    { 
      id: 2, 
      name: 'Afreen Sarkar', 
      role: 'Chief Marketing Officer', 
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
      bio: 'Digital marketing expert with a passion for food and sustainability.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    },
    { 
      id: 3, 
      name: 'Muklesur Rahaman', 
      role: 'Chief Financial Officer', 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
      bio: 'Financial strategist focused on sustainable growth and ethical business practices.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    },
    { 
      id: 4, 
      name: 'Asif Ahmed', 
      role: 'Executive Chef', 
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
      bio: 'Award-winning chef with 15+ years of experience in creating nutritious, delicious meals.',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    },
  ];

  // Career positions data
  const techPositions = [
    // Creative Team
    {
      id: 1,
      title: 'Graphic Designer',
      department: 'Creative Team',
      type: 'Full-time',
      location: 'Remote/Hybrid',
      experience: '2-4 years',
      description: 'Create compelling visual designs for marketing materials, social media, and brand assets.',
      requirements: ['Adobe Creative Suite', 'UI/UX Design', 'Brand Design', 'Print & Digital Media'],
      icon: '🎨',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      title: 'Video Editor',
      department: 'Creative Team',
      type: 'Full-time',
      location: 'Remote/Hybrid',
      experience: '2-5 years',
      description: 'Edit and produce high-quality video content for marketing campaigns and social media.',
      requirements: ['Adobe Premiere Pro', 'After Effects', 'Video Production', 'Motion Graphics'],
      icon: '🎬',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 3,
      title: 'Motion Graphics / Animation Creator',
      department: 'Creative Team',
      type: 'Full-time',
      location: 'Remote/Hybrid',
      experience: '3-6 years',
      description: 'Create engaging motion graphics and animations for digital marketing and brand storytelling.',
      requirements: ['After Effects', 'Cinema 4D/Blender', 'Motion Design', '3D Animation'],
      icon: '✨',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 4,
      title: 'Photographer / Videographer',
      department: 'Creative Team',
      type: 'Full-time',
      location: 'On-site',
      experience: '2-4 years',
      description: 'Capture stunning food photography and videography for marketing and social media content.',
      requirements: ['Food Photography', 'Video Production', 'Lighting Techniques', 'Post-processing'],
      icon: '📸',
      color: 'from-orange-500 to-red-500'
    },

    // Digital Marketing Team
    {
      id: 5,
      title: 'Social Media Manager',
      department: 'Digital Marketing Team',
      type: 'Full-time',
      location: 'Remote/Hybrid',
      experience: '2-4 years',
      description: 'Manage and grow our social media presence across all platforms with engaging content.',
      requirements: ['Social Media Strategy', 'Content Creation', 'Community Management', 'Analytics'],
      icon: '📱',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 6,
      title: 'SEO Specialist',
      department: 'Digital Marketing Team',
      type: 'Full-time',
      location: 'Remote',
      experience: '2-5 years',
      description: 'Optimize our website and content for search engines to drive organic traffic.',
      requirements: ['SEO Strategy', 'Keyword Research', 'Technical SEO', 'Content Optimization'],
      icon: '🔍',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 7,
      title: 'Ads Specialist',
      department: 'Digital Marketing Team',
      type: 'Full-time',
      location: 'Remote/Hybrid',
      experience: '2-4 years',
      description: 'Create and manage paid advertising campaigns across Google, Facebook, and other platforms.',
      requirements: ['Google Ads', 'Facebook Ads', 'Campaign Management', 'ROI Optimization'],
      icon: '📊',
      color: 'from-blue-500 to-purple-500'
    },

    // Content & Copy
    {
      id: 8,
      title: 'Content Writer',
      department: 'Content & Copy',
      type: 'Full-time',
      location: 'Remote',
      experience: '1-3 years',
      description: 'Create engaging written content for blogs, social media, and marketing materials.',
      requirements: ['Content Writing', 'SEO Writing', 'Food Industry Knowledge', 'Creative Writing'],
      icon: '✍️',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 9,
      title: 'Copywriter',
      department: 'Content & Copy',
      type: 'Full-time',
      location: 'Remote/Hybrid',
      experience: '2-4 years',
      description: 'Write compelling copy for advertisements, email campaigns, and marketing materials.',
      requirements: ['Copywriting', 'Brand Voice', 'A/B Testing', 'Conversion Optimization'],
      icon: '📝',
      color: 'from-teal-500 to-cyan-500'
    },

    // Analytics
    {
      id: 10,
      title: 'Data Analyst / Performance Tracker',
      department: 'Analytics',
      type: 'Full-time',
      location: 'Remote/Hybrid',
      experience: '2-5 years',
      description: 'Analyze data to track performance, identify trends, and provide actionable insights.',
      requirements: ['Data Analysis', 'Google Analytics', 'Excel/SQL', 'Reporting'],
      icon: '📈',
      color: 'from-emerald-500 to-green-500'
    }
  ];

  // Culinary positions data
  const culinaryPositions = [
    // Chef
    {
      id: 11,
      title: 'Head Chef',
      department: 'Chef',
      type: 'Full-time',
      location: 'On-site',
      experience: '5+ years',
      description: 'Lead our kitchen team in creating delicious, nutritious meals while maintaining high standards of quality and efficiency.',
      requirements: ['Culinary Degree', 'Menu Planning', 'Kitchen Management', 'Food Safety'],
      icon: '👨‍🍳',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 12,
      title: 'Sous Chef',
      department: 'Chef',
      type: 'Full-time',
      location: 'On-site',
      experience: '3-5 years',
      description: 'Assist the Head Chef in daily kitchen operations, menu planning, and staff supervision.',
      requirements: ['Culinary Experience', 'Team Leadership', 'Menu Development', 'Inventory Management'],
      icon: '🍳',
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 13,
      title: 'Pastry Chef',
      department: 'Chef',
      type: 'Full-time',
      location: 'On-site',
      experience: '2-4 years',
      description: 'Create delicious desserts and baked goods for our meal plans and special orders.',
      requirements: ['Pastry Expertise', 'Baking Skills', 'Recipe Development', 'Presentation'],
      icon: '🧁',
      color: 'from-pink-400 to-rose-500'
    },

    // Helper
    {
      id: 14,
      title: 'Kitchen Assistant',
      department: 'Helper',
      type: 'Full-time',
      location: 'On-site',
      experience: '0-2 years',
      description: 'Assist chefs with food preparation, kitchen cleaning, and maintaining food safety standards.',
      requirements: ['Basic Cooking Skills', 'Food Safety Knowledge', 'Team Player', 'Physical Stamina'],
      icon: '🔪',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 15,
      title: 'Dishwasher',
      department: 'Helper',
      type: 'Part-time',
      location: 'On-site',
      experience: '0-1 year',
      description: 'Maintain cleanliness of kitchen equipment, utensils, and dishes while following sanitation protocols.',
      requirements: ['Attention to Detail', 'Physical Stamina', 'Reliability', 'Sanitation Knowledge'],
      icon: '🧼',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      id: 16,
      title: 'Food Prep Assistant',
      department: 'Helper',
      type: 'Full-time',
      location: 'On-site',
      experience: '0-2 years',
      description: 'Prepare ingredients for chefs, including washing, chopping, and portioning food items.',
      requirements: ['Knife Skills', 'Food Safety', 'Organization', 'Efficiency'],
      icon: '🥕',
      color: 'from-green-400 to-emerald-500'
    },

    // Delivery
    {
      id: 17,
      title: 'Delivery Driver',
      department: 'Delivery',
      type: 'Full-time',
      location: 'On-site/Mobile',
      experience: '1+ years',
      description: 'Deliver meals to customers in a timely, professional manner while ensuring food quality and safety.',
      requirements: ['Valid Driver\'s License', 'Clean Driving Record', 'Navigation Skills', 'Customer Service'],
      icon: '🚗',
      color: 'from-amber-400 to-yellow-500'
    },
    {
      id: 18,
      title: 'Delivery Coordinator',
      department: 'Delivery',
      type: 'Full-time',
      location: 'On-site',
      experience: '1-3 years',
      description: 'Manage delivery schedules, routes, and logistics to ensure efficient and timely meal deliveries.',
      requirements: ['Logistics Experience', 'Route Planning', 'Problem Solving', 'Communication Skills'],
      icon: '📋',
      color: 'from-purple-400 to-violet-500'
    },
    {
      id: 19,
      title: 'Packaging Specialist',
      department: 'Delivery',
      type: 'Full-time',
      location: 'On-site',
      experience: '0-2 years',
      description: 'Package meals for delivery, ensuring proper temperature control, presentation, and food safety.',
      requirements: ['Attention to Detail', 'Food Safety Knowledge', 'Efficiency', 'Organization'],
      icon: '📦',
      color: 'from-teal-400 to-green-500'
    }
  ];
  
  // Combined positions based on selected category
  const careerPositions = selectedJobCategory === 'Tech' ? techPositions : culinaryPositions;

  function openPlan(plan) {
    setSelectedPlan(plan);
    setShowQuickOrder(true);
  }

  // Plan selection handlers

  // 3D tilt helper
  function cardMove(e) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) scale(1.02)`;
  }
  function cardLeave(e) { e.currentTarget.style.transform = ''; }

  return (
    <div className={`min-h-screen ${dark ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-b from-white to-amber-50 text-gray-900'} antialiased`}>
      
      {/* App Pre-registration Popup */}
      {showAppPreregister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
          <div 
            ref={preregisterFormRef}
            className={`relative w-full max-w-md p-4 overflow-y-auto ${dark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-h-[80vh]`}
          >
            <button 
              onClick={() => setShowAppPreregister(false)}
              className="absolute p-2 rounded-full top-4 right-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="mb-3 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Get Early Access</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Pre-register for exclusive app launch benefits!</p>
            </div>
            
            <form onSubmit={handlePreregisterSubmit} className="space-y-3">
              <div>
                <label htmlFor="name" className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={preregisterFormData.name}
                  onChange={handlePreregisterChange}
                  required
                  className={`w-full p-2 text-sm border rounded-lg ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={preregisterFormData.email}
                  onChange={handlePreregisterChange}
                  required
                  className={`w-full p-2 text-sm border rounded-lg ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={preregisterFormData.phone}
                  onChange={handlePreregisterChange}
                  className={`w-full p-2 text-sm border rounded-lg ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  placeholder="Your phone number"
                />
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="notifyMe"
                    name="notifyMe"
                    type="checkbox"
                    checked={preregisterFormData.notifyMe}
                    onChange={handlePreregisterChange}
                    className="w-4 h-4 border-gray-300 rounded text-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div className="ml-2 text-xs">
                  <label htmlFor="notifyMe" className="font-medium text-gray-700 dark:text-gray-300">Notify me</label>
                  <p className="text-gray-500 dark:text-gray-400">Get updates about app launch and offers</p>
                </div>
              </div>
              
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-2 text-sm font-medium text-white transition duration-300 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 hover:shadow-lg"
                >
                  Pre-Register Now
                </button>
              </div>
              
              <div className="mt-2 text-[10px] text-center text-gray-500 dark:text-gray-400">
                By pre-registering, you agree to our Terms of Service and Privacy Policy.
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Job Application Popup */}
      {showJobApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
          <div 
            ref={jobApplicationFormRef}
            className={`relative w-full max-w-md p-4 overflow-y-auto ${dark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-h-[80vh]`}
          >
            <button 
              onClick={() => setShowJobApplication(false)}
              className="absolute p-2 rounded-full top-4 right-4 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="mb-3 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Apply for {selectedJob?.title || 'Position'}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Complete the form below to submit your application</p>
            </div>
            
            <form onSubmit={handleJobApplicationSubmit} className="space-y-3">
              <div>
                <label htmlFor="job-name" className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  id="job-name"
                  name="name"
                  value={jobApplicationData.name}
                  onChange={handleJobApplicationChange}
                  required
                  className={`w-full p-2 text-sm border rounded-lg ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="job-email" className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                <input
                  type="email"
                  id="job-email"
                  name="email"
                  value={jobApplicationData.email}
                  onChange={handleJobApplicationChange}
                  required
                  className={`w-full p-2 text-sm border rounded-lg ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="job-phone" className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  id="job-phone"
                  name="phone"
                  value={jobApplicationData.phone}
                  onChange={handleJobApplicationChange}
                  required
                  className={`w-full p-2 text-sm border rounded-lg ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  placeholder="Your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="resume" className="block mb-1 text-xs font-medium text-gray-700 dark:text-gray-300">Upload CV/Resume</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleJobApplicationChange}
                  required
                  accept=".pdf,.doc,.docx"
                  className={`w-full p-2 text-sm border rounded-lg ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100`}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
              </div>
              
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-2 text-sm font-medium text-white transition duration-300 rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 hover:shadow-lg"
                >
                  Apply Now
                </button>
              </div>
              
              <div className="mt-2 text-[10px] text-center text-gray-500 dark:text-gray-400">
                By applying, you agree to our Terms of Service and Privacy Policy.
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header/Navbar */}
      <header className="fixed top-0 z-50 w-full mx-auto">
        <nav className={`max-w-8xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between ${dark ? 'bg-gray-800/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'} rounded-lg mx-2 sm:mx-4 md:mx-6 shadow-lg`}>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center justify-center w-10 h-10 overflow-hidden sm:w-12 sm:h-12 rounded-xl">
              <img src="/logo.png" alt="MealVersity Logo" className={`w-full h-full object-contain ${dark ? "invert" : ""}`} />
            </div>
            <div>
              <h1 className="text-base font-extrabold leading-none sm:text-lg">MealVersity</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">The Smarter Choice</p>
            </div>
          </div>

          <div className="items-center hidden gap-6 text-sm md:flex">
            <a href="#home" className="hover:underline">Home</a>
            <a href="#about" className="hover:underline">About</a>
            <a href="#plans" className="hover:underline">Meal Plans</a>
            <a href="#team" className="hover:underline">Team</a>
            <a href="#career" className="hover:underline">Career</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <button 
              onClick={toggleDarkMode} 
              aria-pressed={dark} 
              className="p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {dark ? <FiSun size={20} className="text-amber-400" /> : <FiMoon size={20} />}
            </button>
            <button onClick={() => setShowAppPreregister(true)} className="px-4 py-2 text-white rounded-full bg-amber-600">Download App</button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button 
              onClick={toggleDarkMode} 
              aria-pressed={dark} 
              className="p-2 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {dark ? <FiSun size={20} className="text-amber-400" /> : <FiMoon size={20} />}
            </button>
            {/* <button onClick={() => setShowQuickOrder(true)} className="px-3 py-2 text-sm text-white rounded-md bg-amber-600">Quick</button> */}
            <button onClick={() => setMenuOpen(m => !m)} className="p-2 border border-gray-200 rounded-md">
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </nav>

        {/* mobile menu */}
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden mx-2 sm:mx-4 md:mx-6 rounded-lg ${dark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md shadow-lg border ${dark ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex flex-col px-6 py-4">
              <a href="#home" onClick={() => setMenuOpen(false)} className="px-4 py-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Home</a>
              <a href="#about" onClick={() => setMenuOpen(false)} className="px-4 py-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">About</a>
              <a href="#plans" onClick={() => setMenuOpen(false)} className="px-4 py-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Meal Plans</a>
              <a href="#team" onClick={() => setMenuOpen(false)} className="px-4 py-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Team</a>
              <a href="#career" onClick={() => setMenuOpen(false)} className="px-4 py-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Career</a>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="px-4 py-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Contact</a>
              <button 
                onClick={toggleDarkMode} 
                className="flex items-center gap-2 px-4 py-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {dark ? <FiSun size={18} className="text-amber-400" /> : <FiMoon size={18} />}
                <span>Toggle Theme</span>
              </button>
              <button onClick={() => {setShowAppPreregister(true); setMenuOpen(false);}} className="px-4 py-3 mt-2 font-medium text-center text-white rounded-lg bg-gradient-to-r from-amber-500 to-rose-500">Download App</button>
            </div>
          </motion.div>
        )}
      </header>

      <main id="home" className="px-6 pt-40 mx-auto max-w-7xl ">
        {/* HERO */}
        <section className="relative grid items-center grid-cols-1 gap-8 md:grid-cols-2"> 
          <div>
            <motion.h2 animate={{}} className="text-4xl font-extrabold leading-tight md:text-5xl">
              <span className="block">Fresh, Healthy & Affordable — </span>
              <span className="block text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 md:text-6xl">Just When You Need It.</span>
            </motion.h2>

            <p className="max-w-lg mt-4 text-gray-600">Healthy, mom-quality meals for students, professionals, families, and migrants — made with love, priced with respect. Care and comfort without breaking your budget.</p>

            <div className="flex gap-4 mt-6">
              <a href="#plans" className="px-6 py-3 text-white transition transform rounded-full shadow-lg bg-gradient-to-r from-amber-500 to-rose-500 hover:-translate-y-1">View Plans</a>
              <button onClick={() => setShowAppPreregister(true)} className="px-6 py-3 border border-gray-200 rounded-full">Download App</button>
            </div>

            <div className="flex items-center gap-8 mt-8 text-sm text-gray-600">
              <div>
                <div className="text-2xl font-bold">{count}+</div>
                <div className="text-xs">Happy customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">28</div>
                <div className="text-xs">Days sample</div>
              </div>
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-xs">Fresh ingredients</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div animate={heroControls} className="relative p-6 overflow-hidden border shadow-2xl rounded-3xl bg-gradient-to-tr from-white/80 to-white/60 backdrop-blur-md border-white/30">
              <div onMouseMove={cardMove} onMouseLeave={cardLeave} className="overflow-hidden transition-all transform shadow-lg rounded-2xl will-change-transform">
                <Slider
                  dots={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  autoplay={true}
                  autoplaySpeed={3000}
                  pauseOnHover={true}
                  className="w-full"
                >
                  <div>
                    <div>
                      <img src="/react5.jpeg" alt="meal 1" className="object-cover w-full h-52" loading="lazy" />
                    </div>
                    <div className="p-4 bg-gradient-to-b from-white/10 to-white/5">
                      <h3 className="font-semibold">Chef's Seasonal Veg Thali</h3>
                      <p className="mt-1 text-sm text-gray-600">Wholesome, balanced, and prepared fresh daily.</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-lg font-bold">₹X9</div>
                        <button onClick={() => { setPreregisterFormData(prev => ({ ...prev, name: '', email: '', phone: '', notifyMe: true })); setShowAppPreregister(true); }} className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-amber-500 to-rose-500">Order</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src="/hero1.jpeg" alt="meal 2" className="object-cover w-full h-52" loading="lazy" />
                    </div>
                    <div className="p-4 bg-gradient-to-b from-white/10 to-white/5">
                      <h3 className="font-semibold">Chef's special chicken thali</h3>
                      <p className="mt-1 text-sm text-gray-600">High-protein meal with fresh vegetables and lean meat.</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-lg font-bold">₹X9</div>
                        <button onClick={() => { setPreregisterFormData(prev => ({ ...prev, name: '', email: '', phone: '', notifyMe: true })); setShowAppPreregister(true); }} className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-amber-500 to-rose-500">Order</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src="/react4.jpeg" alt="meal 3" className="object-cover w-full h-52" loading="lazy" />
                    </div>
                    <div className="p-4 bg-gradient-to-b from-white/10 to-white/5">
                      <h3 className="font-semibold">Chef's special fish thali</h3>
                      <p className="mt-1 text-sm text-gray-600">Inspired by Mediterranean cuisine with fresh herbs and olive oil.</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-lg font-bold">₹X9</div>
                        <button onClick={() => { setPreregisterFormData(prev => ({ ...prev, name: '', email: '', phone: '', notifyMe: true })); setShowAppPreregister(true); }} className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-amber-500 to-rose-500">Order</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src="/react6.jpeg" alt="meal 5" className="object-cover w-full h-52" loading="lazy" />
                    </div>
                    <div className="p-4 bg-gradient-to-b from-white/10 to-white/5">
                      <h3 className="font-semibold">Chef's special egg thali</h3>
                      <p className="mt-1 text-sm text-gray-600">Start your day with a nutritious and filling breakfast option.</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-lg font-bold">₹X9</div>
                        <button onClick={() => { setPreregisterFormData(prev => ({ ...prev, name: '', email: '', phone: '', notifyMe: true })); setShowAppPreregister(true); }} className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-amber-500 to-rose-500">Order</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src="/cbiriyani.jpg" alt="meal 6" className="object-cover w-full h-52" loading="lazy" />
                    </div>
                    <div className="p-4 bg-gradient-to-b from-white/10 to-white/5">
                      <h3 className="font-semibold">Chef's special chicken briyani</h3>
                      <p className="mt-1 text-sm text-gray-600">Indulge in our healthy yet delicious chicken biriyani.</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-lg font-bold">₹X9</div>
                        <button onClick={() => { setPreregisterFormData(prev => ({ ...prev, name: '', email: '', phone: '', notifyMe: true })); setShowAppPreregister(true); }} className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-amber-500 to-rose-500">Order</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <img src="/fried_rice.jpeg" alt="meal 6" className="object-cover w-full h-52" loading="lazy" />
                    </div>
                    <div className="p-4 bg-gradient-to-b from-white/10 to-white/5">
                      <h3 className="font-semibold">Chef's special fried rice</h3>
                      <p className="mt-1 text-sm text-gray-600">Indulge in our healthy yet delicious chicken biriyani.</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-lg font-bold">₹X9</div>
                        <button onClick={() => { setPreregisterFormData(prev => ({ ...prev, name: '', email: '', phone: '', notifyMe: true })); setShowAppPreregister(true); }} className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-amber-500 to-rose-500">Order</button>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </motion.div>

            {/* Animated decorative SVG */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.28 }} className="absolute -left-8 -top-10 w-28 h-28 opacity-90">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="g2" x1="0" x2="1">
                    <stop offset="0" stopColor="#FFD6A5" />
                    <stop offset="1" stopColor="#FF6B6B" />
                  </linearGradient>
                </defs>
                <rect x="8" y="12" width="80" height="80" rx="20" fill="url(#g2)" opacity="0.9" />
              </svg>
            </motion.div>
          </div>
        </section>

        {/* PLANS */}
        <section id="plans" className="mt-14">
          <MealPlanSubscription dark={dark} />
        </section>

        {/* ABOUT */}
        <section id="about" className="grid items-center grid-cols-1 gap-8 mt-16 md:grid-cols-2">
          <div>
            <h4 className="text-2xl font-semibold">About MealVersity</h4>
            <p className="mt-3 text-gray-600">We combine nutrition science and great taste. Menus rotate weekly, sourced from local farms and packaged sustainably.</p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>• Chef-curated rotating menus</li>
              <li>• Swap up to 48 hours before delivery</li>
              <li>• Pause or cancel anytime — transparent pricing</li>
            </ul>
          </div>
          <div className="p-4 overflow-hidden border shadow-lg rounded-2xl bg-gradient-to-tr from-white/30 to-amber-50 border-white/20">
            <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=def" alt="about" className="object-cover w-full h-56 rounded-lg" loading="lazy" />
          </div>
        </section>

        {/* TEAM */}
        <section id="team" className="mt-24 mb-16">
          <div className="mb-12 text-center">
            <h4 className="mb-4 text-3xl font-bold">Meet Our Team</h4>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              The passionate individuals behind MealVersity who are dedicated to bringing healthy, delicious meals to your doorstep.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t, idx) => (
              <motion.div 
                key={t.id} 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1, transition: { delay: idx * 0.1 } }} 
                className={`group overflow-hidden rounded-2xl ${dark ? 'bg-gray-800/80' : 'bg-white/90'} backdrop-blur-md border ${dark ? 'border-gray-700' : 'border-white/30'} shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2`}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-110" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 flex items-end p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/70 to-transparent group-hover:opacity-100">
                    <p className={`text-white text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100`}>
                      {t.bio}
                    </p>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <h5 className={`text-xl font-semibold ${dark ? 'text-white' : 'text-gray-900'}`}>{t.name}</h5>
                  <div className={`text-sm ${dark ? 'text-amber-400' : 'text-amber-600'} font-medium mb-3`}>{t.role}</div>
                  
                  {/* Social Media Links */}
                  <div className="flex items-center mt-4 space-x-3">
                    <a href={t.social.linkedin} target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${dark ? 'bg-gray-700 hover:bg-blue-700 text-gray-300' : 'bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                    </a>
                    <a href={t.social.twitter} target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${dark ? 'bg-gray-700 hover:bg-blue-500 text-gray-300' : 'bg-gray-100 hover:bg-blue-400 text-gray-600 hover:text-white'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </a>
                    <a href={t.social.instagram} target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${dark ? 'bg-gray-700 hover:bg-pink-600 text-gray-300' : 'bg-gray-100 hover:bg-gradient-to-tr from-purple-500 to-pink-500 text-gray-600 hover:text-white'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAREER */}
        <section id="career" className="mt-16">
          <div className="mb-12 text-center">
            <h4 className="mb-4 text-3xl font-bold">Join Our Team</h4>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              We're looking for passionate individuals to help us revolutionize the meal delivery industry. 
              Explore our open positions and be part of our growing team.
            </p>
          </div>

          {/* Job Category Tabs */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="inline-flex p-1 bg-gray-100 rounded-lg dark:bg-gray-800">
                {['Tech', 'Culinary'].map((category) => (
                  <button
                    key={category}
                    className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                      selectedJobCategory === category
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'text-gray-700 hover:text-amber-600 dark:text-gray-300 dark:hover:text-amber-400'
                    }`}
                    onClick={() => {
                      setSelectedJobCategory(category);
                      setSelectedDepartment('All');
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {selectedJobCategory === 'Tech' ? 
                ['All', 'Creative Team', 'Digital Marketing Team', 'Content & Copy', 'Analytics'].map((dept) => (
                  <button
                    key={dept}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedDepartment === dept
                        ? 'bg-amber-500 text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
                    }`}
                    onClick={() => setSelectedDepartment(dept)}
                    aria-label={`Filter by ${dept}`}
                  >
                    {dept}
                  </button>
                )) : 
                ['All', 'Chef', 'Helper', 'Delivery'].map((dept) => (
                  <button
                    key={dept}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedDepartment === dept
                        ? 'bg-amber-500 text-white'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
                    }`}
                    onClick={() => setSelectedDepartment(dept)}
                    aria-label={`Filter by ${dept}`}
                  >
                    {dept}
                  </button>
                ))
              }
            </div>
          </div>

          {/* Job Positions Grid */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {careerPositions
              .filter(position => selectedDepartment === 'All' || position.department === selectedDepartment)
              .map((position, idx) => (
                <motion.div
                  key={position.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`group relative p-6 rounded-2xl ${dark ? 'bg-gray-800/70' : 'bg-white/90'} backdrop-blur-md border ${dark ? 'border-gray-700' : 'border-white/30'} shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2`}
                >
                  {/* Department Badge */}
                  <div className="absolute -top-3 -right-3">
                    <span className={`px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${position.color}`}>
                      {position.department}
                    </span>
                  </div>

                  {/* Icon and Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${position.color} flex items-center justify-center text-2xl`}>
                      {position.icon}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-bold text-gray-900 transition-colors dark:text-white group-hover:text-amber-600">
                        {position.title}
                      </h5>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">{position.type}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{position.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {position.description}
                  </p>

                  {/* Experience */}
                  <div className="mb-4">
                    <span className="text-xs font-medium tracking-wide text-gray-500 uppercase">Experience</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{position.experience}</p>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <span className="block mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">Key Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {position.requirements.slice(0, 3).map((req, reqIdx) => (
                        <span
                          key={reqIdx}
                          className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded-md dark:bg-gray-700 dark:text-gray-300"
                        >
                          {req}
                        </span>
                      ))}
                      {position.requirements.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded-md dark:bg-gray-700 dark:text-gray-300">
                          +{position.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={() => {
                      setSelectedJob(position);
                      setJobApplicationData({
                        name: '',
                        email: '',
                        phone: '',
                        resume: null
                      });
                      setShowJobApplication(true);
                    }}
                    className={`w-full py-3 px-4 rounded-xl font-medium text-white bg-gradient-to-r ${position.color} hover:shadow-lg transform transition-all duration-200 hover:scale-105`}
                  >
                    Apply Now
                  </button>
                </motion.div>
              ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className={`p-8 rounded-2xl ${dark ? 'bg-gray-800/70' : 'bg-gradient-to-r from-amber-50 to-orange-50'} border ${dark ? 'border-gray-700' : 'border-amber-200'}`}>
              <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Don't see a position that fits?
              </h5>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <button
                onClick={() => {
                  setSelectedJob({
                    title: 'General Application',
                    department: 'Any Department'
                  });
                  setJobApplicationData({
                    name: '',
                    email: '',
                    phone: '',
                    resume: null
                  });
                  setShowJobApplication(true);
                }}
                className="px-6 py-3 font-medium text-white transition-all duration-200 transform bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl hover:shadow-lg hover:scale-105"
              >
                Send General Application
              </button>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-20">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-4xl font-bold">Contact Us</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">We'd love to hear from you! Reach out to us with any questions or feedback.</p>
          </div>
          
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Get In Touch */}
            <div className={`flex-1 p-8 rounded-xl shadow-lg ${dark ? 'bg-gray-800' : 'bg-white'} border ${dark ? 'border-gray-700' : 'border-amber-100'}`}>
              <h3 className="inline-block pb-2 mb-6 text-2xl font-bold border-b-2 border-amber-500">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${dark ? 'bg-gray-700' : 'bg-amber-100'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Address</h4>
                    <p className="text-gray-600 dark:text-gray-400">E2 Hostel, Kazipara, barasat -700125</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${dark ? 'bg-gray-700' : 'bg-amber-100'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-400">8900099783</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${dark ? 'bg-gray-700' : 'bg-amber-100'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-400">mealversityhelp@gmail.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="inline-block pb-2 mb-6 text-2xl font-bold border-b-2 border-amber-500">Social Media</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">Connect With Us</p>
                <div className="flex space-x-4">
                  <a href="#" className={`w-12 h-12 rounded-full flex items-center justify-center ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-amber-100 hover:bg-amber-200'} transition-colors duration-300`}>
                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className={`w-12 h-12 rounded-full flex items-center justify-center ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-amber-100 hover:bg-amber-200'} transition-colors duration-300`}>
                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </a>
                  <a href="#" className={`w-12 h-12 rounded-full flex items-center justify-center ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-amber-100 hover:bg-amber-200'} transition-colors duration-300`}>
                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Send Us a Message */}
            <div className={`flex-1 p-8 rounded-xl shadow-lg ${dark ? 'bg-gray-800' : 'bg-white'} border ${dark ? 'border-gray-700' : 'border-amber-100'}`}>
              <h3 className="inline-block pb-2 mb-6 text-2xl font-bold border-b-2 border-amber-500">Send Us a Message</h3>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message received — we will respond soon'); }}>
                <div>
                  <label className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Your full name" 
                    required
                    className={`w-full p-3 rounded-lg border ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500`} 
                  />
                </div>
                
                <div>
                  <label className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    required 
                    className={`w-full p-3 rounded-lg border ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500`} 
                  />
                </div>
                
                <div>
                  <label className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone
                  </label>
                  <input 
                    type="tel" 
                    placeholder="Your phone number" 
                    required
                    className={`w-full p-3 rounded-lg border ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500`} 
                  />
                </div>
                
                <div>
                  <label className="flex items-center mb-2 text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Message
                  </label>
                  <textarea 
                    placeholder="How can we help you?" 
                    required
                    rows={4} 
                    className={`w-full p-3 rounded-lg border ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-amber-500`}
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center"
                >
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* App Coming Soon Section */}
        <section className="px-4 py-16 mt-20">
          <div className={`max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-xl ${dark ? 'bg-gray-800' : 'bg-gradient-to-r from-amber-50 to-rose-50'}`}>
            <div className="flex flex-col items-center lg:flex-row">
              {/* Left Content */}
              <div className="w-full p-8 lg:w-1/2 lg:p-12">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">MealVersity App <span className="text-amber-500">Coming Soon</span></h2>
                <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                  Get ready for a seamless meal planning experience! Our mobile app is in the final stages of development.
                </p>
                <ul className="mb-8 space-y-4">
                  {["Easy meal tracking", "Personalized recommendations", "Exclusive app-only discounts", "Real-time delivery updates"].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${dark ? 'bg-amber-500' : 'bg-amber-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
                  <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    Get Notified
                  </button>
            
                </div>
              </div>
              
              {/* Right Content - App Preview */}
              <div className="flex justify-center w-full p-8 lg:w-1/2">
                <div className={`relative w-64 h-96 rounded-3xl overflow-hidden border-8 ${dark ? 'border-gray-700' : 'border-white'} shadow-2xl`}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-b from-amber-400 to-rose-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mb-2 text-xl font-bold">MealVersity App</h3>
                    <p className="mb-6 text-sm">Your meal planning companion</p>
                    <div className="flex items-center justify-center w-12 h-12 border-2 border-white rounded-full animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="mt-4 text-xs opacity-75">Coming 08 Oct, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`mt-20 py-12 ${dark ? 'bg-gray-800' : 'bg-amber-50'}`}>
          <div className="px-4 py-4 mx-auto max-w-8xl sm:px-6 sm:mx-4 md:mx-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {/* MealVersity Column */}
              <div>
                <h3 className="mb-4 text-xl font-bold">MealVersity</h3>
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  Fresh, healthy, and delicious meals delivered right to your doorstep. Your trusted partner for daily nutrition and convenience.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className={`w-8 h-8 rounded-full flex items-center justify-center ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'}`}>
                    <span className="sr-only">Facebook</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className={`w-8 h-8 rounded-full flex items-center justify-center ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'}`}>
                    <span className="sr-only">Twitter</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className={`w-8 h-8 rounded-full flex items-center justify-center ${dark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'}`}>
                    <span className="sr-only">Instagram</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Quick Links Column */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#home" className="text-sm hover:underline">Home</a></li>
                  <li><a href="#about" className="text-sm hover:underline">About</a></li>
                  <li><a href="#plans" className="text-sm hover:underline">Meal Plans</a></li>
                  <li><a href="#team" className="text-sm hover:underline">Team</a></li>
                  <li><a href="#career" className="text-sm hover:underline">Career</a></li>
                  <li><a href="#contact" className="text-sm hover:underline">Contact</a></li>
                </ul>
              </div>
              
              {/* Our Services Column */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Our Services</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Daily Meal Plans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Quality Assurance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Fast Delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Healthy Options</span>
                  </li>
                </ul>
              </div>
              
              {/* Stay Updated Column */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Stay Updated</h3>
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  Subscribe to get special offers, free giveaways, and updates on new menu items!
                </p>
                <form className="flex flex-col space-y-2" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-4 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
                  />
                  <button 
                    type="submit" 
                    className="px-4 py-2 font-medium text-white rounded-md bg-gradient-to-r from-amber-500 to-rose-500"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-between pt-8 mt-12 border-t border-gray-200 dark:border-gray-700 md:flex-row">
              <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} MealVersity. All rights reserved.</p>
              <div className="flex mt-4 space-x-6 md:mt-0">
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* QUICK ORDER MODAL */}
      {showQuickOrder && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 flex items-center justify-center p-6 z-60">
          <div onClick={() => setShowQuickOrder(false)} className="absolute inset-0 bg-black/40" />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.05 }} className={`relative z-10 max-w-md w-full p-6 rounded-3xl ${dark ? 'bg-gray-900/95' : 'bg-white/96'} backdrop-blur-md border ${dark ? 'border-gray-700' : 'border-white/40'} shadow-2xl`}>
            <div className="flex items-start justify-between">
              <div>
                <h5 className="text-lg font-semibold">{selectedPlan ? selectedPlan.title : 'Quick Order'}</h5>
                <div className="mt-1 text-xs text-gray-500">{selectedPlan ? selectedPlan.desc : 'Choose a plan and proceed.'}</div>
              </div>
              <button onClick={() => setShowQuickOrder(false)} aria-label="Close" className="text-gray-400">✕</button>
            </div>
            <form className="grid gap-3 mt-4" onSubmit={(e) => { e.preventDefault(); alert('Order placed — we will contact you'); setShowQuickOrder(false); }}>
              <input required placeholder="Your name" className="p-3 border border-gray-200 rounded-lg" />
              <input required placeholder="Phone or Email" className="p-3 border border-gray-200 rounded-lg" />
              <div className="flex gap-2">
                <input placeholder="Start date" className="flex-1 p-3 border border-gray-200 rounded-lg" />
                <select className="p-3 border border-gray-200 rounded-lg">
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
              <button type="submit" className="px-4 py-3 text-white rounded-full bg-gradient-to-r from-amber-500 to-rose-500">Place Order</button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
