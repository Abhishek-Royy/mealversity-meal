import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FiSun, FiMoon } from 'react-icons/fi';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MealVersityLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showQuickOrder, setShowQuickOrder] = useState(false);
  const [dark, setDark] = useState(false);
  const [count, setCount] = useState(0);
  const heroControls = useAnimation();
  const countersRef = useRef(null);

  // Plan selection states
  const [selectedCategory, setSelectedCategory] = useState('Individual');
  const [selectedDuration, setSelectedDuration] = useState('Weekly Plan');
  const [selectedDietType, setSelectedDietType] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');
  const [showDietSelection, setShowDietSelection] = useState(false);
  const [showMealSelection, setShowMealSelection] = useState(false);
  const [showPlanCards, setShowPlanCards] = useState(true); // Always show plans on load
  
  // Career section states
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Stable dark mode toggle handler
  const toggleDarkMode = useCallback(() => {
    setDark(prevDark => !prevDark);
  }, []);

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

  // Plan categories
  const planCategories = [
    { id: 'Individual', name: 'Individual', icon: '👤' },
    { id: 'Family Pack', name: 'Family Pack', icon: '👨‍👩‍👧‍👦' },
    { id: 'Corporate Office', name: 'Corporate Office', icon: '🏢' },
    { id: 'Migrant Worker', name: 'Migrant Worker', icon: '👷‍♂️' },
    { id: 'Festival Specials', name: 'Festival Specials', icon: '🎁' },
  ];

  // Diet types
  const dietTypes = [
    { id: 'veg', name: 'Veg', icon: '🥬' },
    { id: 'non-veg', name: 'Non-Veg', icon: '🍖' },
    { id: 'veg-non-veg', name: 'Veg + Non-Veg', icon: '🍽️' },
  ];

  // Meal types
  const mealTypes = [
    { id: 'lunch', name: 'Lunch', icon: '🍽️' },
    { id: 'dinner', name: 'Dinner', icon: '🌙' },
    { id: 'lunch-dinner', name: 'Lunch + Dinner', icon: '🍽️🌙' },
  ];

  // Plan cards based on selections
  const getFilteredPlans = () => {
    const basePlans = [
      // Individual Plans
      { 
        id: 1, 
        title: 'Daily Meal Plan', 
        desc: 'Balanced breakfast, lunch & dinner — chef-curated.', 
        price: selectedDuration === 'Weekly Plan' ? '₹1,749' : '₹6,999', 
        tag: 'Most Popular', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Individual',
        dietType: 'veg',
        mealType: 'lunch-dinner',
        available: true
      },
      { 
        id: 2, 
        title: 'Premium Combo', 
        desc: 'Lunch + Dinner — chef specials.', 
        price: selectedDuration === 'Weekly Plan' ? '₹2,499' : '₹9,999', 
        tag: 'Popular', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Individual',
        dietType: 'non-veg',
        mealType: 'lunch-dinner',
        available: true
      },
      { 
        id: 3, 
        title: 'Custom Plan', 
        desc: 'Pick meals, schedule deliveries, swap anytime.', 
        price: 'Custom', 
        tag: 'Flexible', 
        meals: 'Flexible',
        category: 'Individual',
        dietType: 'veg-non-veg',
        mealType: 'lunch-dinner',
        available: true
      },
      { 
        id: 4, 
        title: 'Veg Delight', 
        desc: 'Pure vegetarian meals with fresh local ingredients.', 
        price: selectedDuration === 'Weekly Plan' ? '₹1,299' : '₹4,999', 
        tag: '', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Individual',
        dietType: 'veg',
        mealType: 'lunch',
        available: true
      },
      { 
        id: 5, 
        title: 'Non-Veg Special', 
        desc: 'Premium non-vegetarian meals with quality proteins.', 
        price: selectedDuration === 'Weekly Plan' ? '₹1,999' : '₹7,999', 
        tag: '', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Individual',
        dietType: 'non-veg',
        mealType: 'dinner',
        available: true
      },
      { 
        id: 6, 
        title: 'Mixed Cuisine', 
        desc: 'Best of both worlds - veg and non-veg options.', 
        price: selectedDuration === 'Weekly Plan' ? '₹1,599' : '₹5,999', 
        tag: '', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Individual',
        dietType: 'veg-non-veg',
        mealType: 'lunch',
        available: true
      },
      { 
        id: 7, 
        title: 'Evening Feast', 
        desc: 'Special dinner plans with gourmet options.', 
        price: selectedDuration === 'Weekly Plan' ? '₹1,399' : '₹5,499', 
        tag: '', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Individual',
        dietType: 'veg',
        mealType: 'dinner',
        available: true
      },
      { 
        id: 8, 
        title: 'Protein Power', 
        desc: 'High-protein non-veg meals for fitness enthusiasts.', 
        price: selectedDuration === 'Weekly Plan' ? '₹2,199' : '₹8,799', 
        tag: 'Coming Soon', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Individual',
        dietType: 'non-veg',
        mealType: 'lunch-dinner',
        available: false
      },

      // Family Pack Plans
      { 
        id: 9, 
        title: 'Family Veg Feast', 
        desc: 'Complete vegetarian meals for the whole family.', 
        price: selectedDuration === 'Weekly Plan' ? '₹4,999' : '₹19,999', 
        tag: 'Popular', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Family Pack',
        dietType: 'veg',
        mealType: 'lunch-dinner',
        available: true
      },
      { 
        id: 10, 
        title: 'Family Mixed', 
        desc: 'Variety of veg and non-veg meals for family preferences.', 
        price: selectedDuration === 'Weekly Plan' ? '₹5,999' : '₹23,999', 
        tag: '', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Family Pack',
        dietType: 'veg-non-veg',
        mealType: 'lunch-dinner',
        available: true
      },
      { 
        id: 11, 
        title: 'Family Lunch Special', 
        desc: 'Daily lunch plans for working families.', 
        price: selectedDuration === 'Weekly Plan' ? '₹3,499' : '₹13,999', 
        tag: '', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Family Pack',
        dietType: 'veg',
        mealType: 'lunch',
        available: true
      },
      { 
        id: 12, 
        title: 'Family Dinner Club', 
        desc: 'Evening meals for family bonding time.', 
        price: selectedDuration === 'Weekly Plan' ? '₹3,999' : '₹15,999', 
        tag: 'Coming Soon', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Family Pack',
        dietType: 'non-veg',
        mealType: 'dinner',
        available: false
      },

      // Corporate Office Plans
      { 
        id: 13, 
        title: 'Office Lunch Program', 
        desc: 'Bulk lunch delivery for corporate offices.', 
        price: selectedDuration === 'Weekly Plan' ? '₹2,999' : '₹11,999', 
        tag: 'Popular', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Corporate Office',
        dietType: 'veg-non-veg',
        mealType: 'lunch',
        available: true
      },
      { 
        id: 14, 
        title: 'Executive Dining', 
        desc: 'Premium meals for corporate executives.', 
        price: selectedDuration === 'Weekly Plan' ? '₹4,499' : '₹17,999', 
        tag: '', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Corporate Office',
        dietType: 'veg',
        mealType: 'lunch-dinner',
        available: true
      },
      { 
        id: 15, 
        title: 'Team Building Meals', 
        desc: 'Special group meals for team events.', 
        price: 'Custom', 
        tag: 'Coming Soon', 
        meals: 'Flexible',
        category: 'Corporate Office',
        dietType: 'veg-non-veg',
        mealType: 'lunch-dinner',
        available: false
      },

      // Migrant Worker Plans
      { 
        id: 16, 
        title: 'Worker Basic', 
        desc: 'Affordable nutritious meals for migrant workers.', 
        price: selectedDuration === 'Weekly Plan' ? '₹799' : '₹2,999', 
        tag: 'Budget', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Migrant Worker',
        dietType: 'veg',
        mealType: 'lunch-dinner',
        available: true
      },
      { 
        id: 17, 
        title: 'Worker Plus', 
        desc: 'Enhanced meals with better variety and nutrition.', 
        price: selectedDuration === 'Weekly Plan' ? '₹1,199' : '₹4,799', 
        tag: '', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Migrant Worker',
        dietType: 'veg-non-veg',
        mealType: 'lunch-dinner',
        available: true
      },
      { 
        id: 18, 
        title: 'Worker Dinner', 
        desc: 'Evening meals for hardworking migrants.', 
        price: selectedDuration === 'Weekly Plan' ? '₹599' : '₹2,399', 
        tag: 'Coming Soon', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Migrant Worker',
        dietType: 'veg',
        mealType: 'dinner',
        available: false
      },

      // Festival Specials
      { 
        id: 19, 
        title: 'Diwali Special', 
        desc: 'Traditional festive meals for Diwali celebration.', 
        price: selectedDuration === 'Weekly Plan' ? '₹2,999' : '₹11,999', 
        tag: 'Limited', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Festival Specials',
        dietType: 'veg',
        mealType: 'lunch-dinner',
        available: true
      },
      { 
        id: 20, 
        title: 'Eid Feast', 
        desc: 'Special non-veg meals for Eid celebrations.', 
        price: selectedDuration === 'Weekly Plan' ? '₹3,499' : '₹13,999', 
        tag: 'Limited', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Festival Specials',
        dietType: 'non-veg',
        mealType: 'lunch-dinner',
        available: true
      },
      { 
        id: 21, 
        title: 'Christmas Special', 
        desc: 'Festive meals for Christmas celebrations.', 
        price: selectedDuration === 'Weekly Plan' ? '₹2,799' : '₹11,199', 
        tag: 'Coming Soon', 
        meals: selectedDuration === 'Weekly Plan' ? '7 days' : '28 days',
        category: 'Festival Specials',
        dietType: 'veg-non-veg',
        mealType: 'lunch-dinner',
        available: false
      },
    ];

    const filteredPlans = basePlans.filter(plan => {
      if (selectedCategory && plan.category !== selectedCategory) return false;
      if (selectedDietType && plan.dietType !== selectedDietType) return false;
      if (selectedMealType && plan.mealType !== selectedMealType) return false;
      return true;
    });

    // If no specific filters are applied, show 3 default popular plans
    if (!selectedDietType && !selectedMealType) {
      const defaultPlans = basePlans.filter(plan => 
        plan.category === selectedCategory && 
        (plan.tag === 'Most Popular' || plan.tag === 'Popular' || plan.tag === 'Budget')
      );
      return defaultPlans.slice(0, 3);
    }

    // If filters are applied, return filtered results (up to 3)
    return filteredPlans.slice(0, 3);
  };

  const plans = getFilteredPlans();

  const team = [
    { id: 1, name: 'Tarik Anowar', role: 'CEO' },
    { id: 2, name: 'Afreen Sarkar', role: 'CMO' },
    { id: 3, name: 'Muklesur Rahaman', role: 'CFO' },
    { id: 4, name: 'Asif Ahmed', role: 'Head Chef' },
  ];

  // Career positions data
  const careerPositions = [
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

  function openPlan(plan) {
    setSelectedPlan(plan);
    setShowQuickOrder(true);
  }

  // Plan selection handlers
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDietSelection(true);
    setShowMealSelection(false);
    setShowPlanCards(false);
    setSelectedDietType('');
    setSelectedMealType('');
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
    setShowDietSelection(true);
    setShowMealSelection(false);
    setShowPlanCards(false);
    setSelectedDietType('');
    setSelectedMealType('');
  };

  const handleDietTypeSelect = (dietType) => {
    setSelectedDietType(dietType);
    setShowMealSelection(true);
    setShowPlanCards(false);
    setSelectedMealType('');
  };

  const handleMealTypeSelect = (mealType) => {
    setSelectedMealType(mealType);
    setShowPlanCards(true);
  };

  const resetSelection = () => {
    setSelectedCategory('Individual');
    setSelectedDuration('Weekly Plan');
    setSelectedDietType('');
    setSelectedMealType('');
    setShowDietSelection(false);
    setShowMealSelection(false);
    setShowPlanCards(false);
  };

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

      {/* Header/Navbar */}
      <header className="fixed top-0 z-50 w-full mx-auto">
        <nav className={`max-w-8xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between ${dark ? 'bg-gray-800/90 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'} rounded-lg mx-2 sm:mx-4 md:mx-6 mt-4 shadow-lg`}>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center justify-center w-10 h-10 font-bold text-white shadow-xl sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500">MV</div>
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
            <a className="px-4 py-2 text-white rounded-full bg-amber-600">Download App</a>
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
            className={`md:hidden mx-2 sm:mx-4 md:mx-6 mt-2 rounded-lg ${dark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md shadow-lg border ${dark ? 'border-gray-700' : 'border-gray-200'}`}
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
              <a href="#" className="px-4 py-3 mt-2 font-medium text-center text-white rounded-lg bg-gradient-to-r from-amber-500 to-rose-500">Download App</a>
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
              <button onClick={() => { setSelectedPlan(plans[0]); setShowQuickOrder(true); }} className="px-6 py-3 border border-gray-200 rounded-full">Download App</button>
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
                  className="w-full h-52"
                >
                  <div>
                    <img src="/hero1.jpeg" alt="meal 1" className="object-cover w-full h-52" loading="lazy" />
                  </div>
                  <div>
                    <img src="/hero2.jpeg" alt="meal 2" className="object-cover w-full h-52" loading="lazy" />
                  </div>
                  <div>
                    <img src="/react3.jpeg" alt="meal 3" className="object-cover w-full h-52" loading="lazy" />
                  </div>
                  <div>
                    <img src="/react4.jpeg" alt="meal 4" className="object-cover w-full h-52" loading="lazy" />
                  </div>
                  <div>
                    <img src="/react5.jpeg" alt="meal 5" className="object-cover w-full h-52" loading="lazy" />
                  </div>
                  <div>
                    <img src="/react6.jpeg" alt="meal 6" className="object-cover w-full h-52" loading="lazy" />
                  </div>
                </Slider>
                <div className="p-4 bg-gradient-to-b from-white/10 to-white/5">
                  <h3 className="font-semibold">Chef's Seasonal Veg Thali</h3>
                  <p className="mt-1 text-sm text-gray-600">Wholesome, balanced, and prepared fresh daily.</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-lg font-bold">₹99</div>
                    <button onClick={() => { setSelectedPlan(plans[0]); setShowQuickOrder(true); }} className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-amber-500 to-rose-500">Order</button>
                  </div>
                </div>
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
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-semibold">Our Meal Plans</h4>
              <p className="mt-1 text-gray-600">Flexible subscriptions — pause, swap, or cancel anytime.</p>
            </div>
            <button 
              onClick={resetSelection}
              className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Reset
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-6">
            <div className="flex items-center justify-center space-x-2 sm:space-x-4">
              <div className={`flex items-center space-x-2 ${selectedCategory ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  selectedCategory ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <span className="text-sm font-medium hidden sm:inline">Category</span>
              </div>
              <div className={`w-8 h-0.5 ${selectedDuration ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center space-x-2 ${selectedDuration ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  selectedDuration ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium hidden sm:inline">Duration</span>
              </div>
              <div className={`w-8 h-0.5 ${selectedDietType ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center space-x-2 ${selectedDietType ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  selectedDietType ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <span className="text-sm font-medium hidden sm:inline">Diet</span>
              </div>
              <div className={`w-8 h-0.5 ${selectedMealType ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center space-x-2 ${selectedMealType ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  selectedMealType ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  4
                </div>
                <span className="text-sm font-medium hidden sm:inline">Meal</span>
              </div>
            </div>
          </div>

          {/* Plan Categories */}
          <div className="mt-6">
            <h5 className="mb-4 text-lg font-medium">Choose Plan Category</h5>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {planCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-full border transition-all text-sm sm:text-base ${
                    selectedCategory === category.id
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
                  }`}
                >
                  <span className="text-base sm:text-lg">{category.icon}</span>
                  <span className="font-medium hidden sm:inline">{category.name}</span>
                  <span className="font-medium sm:hidden">{category.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selection */}
          <div className="mt-6">
            <h5 className="mb-4 text-lg font-medium">Select Duration</h5>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleDurationSelect('Weekly Plan')}
                className={`flex-1 px-4 sm:px-6 py-3 rounded-full border transition-all text-sm sm:text-base ${
                  selectedDuration === 'Weekly Plan'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
                }`}
              >
                Weekly Plan
              </button>
              <button
                onClick={() => handleDurationSelect('Monthly Plan')}
                className={`flex-1 px-4 sm:px-6 py-3 rounded-full border transition-all text-sm sm:text-base ${
                  selectedDuration === 'Monthly Plan'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
                }`}
              >
                Monthly Plan
              </button>
            </div>
          </div>

          {/* Diet Type Selection */}
          {showDietSelection && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <h5 className="mb-4 text-lg font-medium">Choose Diet Type</h5>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {dietTypes.map((diet) => (
                  <button
                    key={diet.id}
                    onClick={() => handleDietTypeSelect(diet.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-full border transition-all text-sm sm:text-base ${
                      selectedDietType === diet.id
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <span className="text-base sm:text-lg">{diet.icon}</span>
                    <span className="font-medium">{diet.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Meal Type Selection */}
          {showMealSelection && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <h5 className="mb-4 text-lg font-medium">Select Meal Type</h5>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {mealTypes.map((meal) => (
                  <button
                    key={meal.id}
                    onClick={() => handleMealTypeSelect(meal.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-full border transition-all text-sm sm:text-base ${
                      selectedMealType === meal.id
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <span className="text-base sm:text-lg">{meal.icon}</span>
                    <span className="font-medium">{meal.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Plan Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
              <h5 className="mb-6 text-lg font-medium text-center sm:text-left">
                {selectedCategory} Plans - {selectedDuration}
              </h5>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p, i) => (
                  <motion.article 
                    key={p.id} 
                    initial={{ y: 16, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1, transition: { delay: i * 0.08 } }} 
                    onMouseMove={cardMove} 
                    onMouseLeave={cardLeave} 
                    className={`p-4 sm:p-6 rounded-3xl ${dark ? 'bg-gray-800/70' : 'bg-white/90'} backdrop-blur-md border ${dark ? 'border-gray-700' : 'border-white/30'} shadow-lg hover:shadow-2xl transform transition hover:-translate-y-2 relative ${!p.available ? 'opacity-75' : ''}`}
                  >
                    {p.tag && (
                      <div className={`absolute -top-2 -right-2 text-white text-xs px-2 sm:px-3 py-1 rounded-full font-medium ${
                        p.tag === 'Most Popular' ? 'bg-red-500' :
                        p.tag === 'Popular' ? 'bg-blue-500' :
                        p.tag === 'Coming Soon' ? 'bg-orange-500' :
                        p.tag === 'Limited' ? 'bg-purple-500' :
                        p.tag === 'Budget' ? 'bg-green-500' :
                        p.tag === 'Flexible' ? 'bg-indigo-500' :
                        'bg-gray-500'
                      }`}>
                        {p.tag}
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <h5 className="text-base sm:text-lg font-semibold">{p.title}</h5>
                        <p className="mt-2 text-xs sm:text-sm text-gray-400">{p.desc}</p>
                    <div className="mt-3 text-xs text-gray-400">{p.meals}</div>
                  </div>
                      <div className="text-left sm:text-right">
                        <div className="text-lg sm:text-xl font-bold text-amber-400">{p.price}</div>
                        <div className="text-xs text-gray-400">
                          {p.price === 'Custom' ? '' : selectedDuration === 'Weekly Plan' ? '/week' : '/month'}
                        </div>
                  </div>
                </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-6">
                      {p.available ? (
                        <>
                          <button onClick={() => openPlan(p)} className="flex-1 px-4 py-2 text-white rounded-full shadow bg-gradient-to-r from-amber-500 to-rose-500 text-sm sm:text-base">
                            Subscribe
                          </button>
                          <button onClick={() => alert('Details coming soon')} className="px-4 py-2 border border-gray-200 rounded-full text-sm sm:text-base">
                            Details
                          </button>
                        </>
                      ) : (
                        <button disabled className="flex-1 px-4 py-2 text-gray-500 rounded-full border border-gray-300 text-sm sm:text-base cursor-not-allowed">
                          Coming Soon
                        </button>
                      )}
                </div>

                    <div className="mt-4 text-xs text-gray-400 text-center sm:text-left">
                      {p.available ? 'Free delivery above ₹299.' : 'Notify me when available'}
                    </div>
              </motion.article>
            ))}
          </div>
          </motion.div>
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
        <section id="team" className="mt-16">
          <h4 className="text-2xl font-semibold">Our Team</h4>
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-3">
            {team.map((t, idx) => (
              <motion.div key={t.id} initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: idx * 0.06 } }} className={`p-6 rounded-2xl ${dark ? 'bg-gray-800/70' : 'bg-white/90'} backdrop-blur-md border ${dark ? 'border-gray-700' : 'border-white/30'} shadow text-center transform transition hover:-translate-y-1`}>
                <div className="flex items-center justify-center w-20 h-20 mx-auto text-lg font-semibold rounded-full bg-gradient-to-tr from-amber-200 to-rose-200">{t.name.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
                <h5 className="mt-4 font-semibold">{t.name}</h5>
                <div className="text-sm text-gray-400">{t.role}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAREER */}
        <section id="career" className="mt-16">
          <div className="text-center mb-12">
            <h4 className="text-3xl font-bold mb-4">Join Our Team</h4>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're looking for passionate individuals to help us revolutionize the meal delivery industry. 
              Explore our open positions and be part of our growing team.
            </p>
          </div>

          {/* Department Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {['All', 'Creative Team', 'Digital Marketing Team', 'Content & Copy', 'Analytics'].map((dept) => (
                <button
                  key={dept}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedDepartment === dept
                      ? 'bg-amber-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600'
                  }`}
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Positions Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                      <h5 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
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
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {position.description}
                  </p>

                  {/* Experience */}
                  <div className="mb-4">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Experience</span>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{position.experience}</p>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Key Skills</span>
                    <div className="flex flex-wrap gap-1">
                      {position.requirements.slice(0, 3).map((req, reqIdx) => (
                        <span
                          key={reqIdx}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
                        >
                          {req}
                        </span>
                      ))}
                      {position.requirements.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md">
                          +{position.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    onClick={() => {
                      alert(`Application for ${position.title} - We'll contact you soon!`);
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
              <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Don't see a position that fits?
              </h5>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <button
                onClick={() => alert('General Application - We\'ll review your profile and contact you!')}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-xl font-medium hover:shadow-lg transform transition-all duration-200 hover:scale-105"
              >
                Send General Application
              </button>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="grid items-start grid-cols-1 gap-8 mt-16 md:grid-cols-2">
          <div className={`p-6 rounded-2xl ${dark ? 'bg-gray-800/70' : 'bg-white/90'} backdrop-blur-md border ${dark ? 'border-gray-700' : 'border-white/30'} shadow`}> 
            <h4 className="text-xl font-semibold">Contact Us</h4>
            <p className="mt-2 text-gray-500">Questions? Reach out — we reply within 24 hours.</p>
            <form className="grid gap-3 mt-4" onSubmit={(e) => { e.preventDefault(); alert('Message received — we will respond soon'); }}>
              <input placeholder="Your name" className="p-3 border border-gray-200 rounded-lg" />
              <input placeholder="Email or phone" className="p-3 border border-gray-200 rounded-lg" />
              <textarea placeholder="Message" className="p-3 border border-gray-200 rounded-lg" rows={4} />
              <button type="submit" className="px-4 py-3 text-white rounded-full bg-gradient-to-r from-amber-500 to-rose-500">Send</button>
            </form>
          </div>

          <div className={`p-6 rounded-2xl ${dark ? 'bg-gray-800/70' : 'bg-gradient-to-tr from-white/30 to-amber-50'} border ${dark ? 'border-gray-700' : 'border-white/20'} shadow flex flex-col justify-center items-center`}>
            <h4 className="text-xl font-semibold">Download App</h4>
            <p className="mt-2 text-gray-500">Manage your subscription, track deliveries, and access exclusive offers.</p>
            <div className="flex gap-3 mt-4">
              <div className="px-4 py-2 border border-gray-200 rounded-full">App Store</div>
              <div className="px-4 py-2 border border-gray-200 rounded-full">Google Play</div>
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
