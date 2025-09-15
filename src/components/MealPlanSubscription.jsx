import React, { useState, useEffect } from 'react';

const MealPlanSubscription = ({ dark = false }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userSelections, setUserSelections] = useState({
    frequency: '',
    diet: '',
    meal: ''
  });
  const [currentStep, setCurrentStep] = useState('frequency');
  const [allStepsCompleted, setAllStepsCompleted] = useState(false);
  
  const slides = [
    {
      title: "Individual Plans",
      subtitle: "Perfect for individuals with flexible options",
      type: "individual"
    },
    {
      title: "Family Pack",
      subtitle: "Meal plans designed for the whole family",
      type: "family"
    },
    {
      title: "Corporate Office Plans",
      subtitle: "Meal solutions for your workplace",
      type: "corporate"
    },
    {
      title: "Migrant Worker Plans",
      subtitle: "Specialized meals for migrant workers",
      type: "migrant"
    },
    {
      title: "Festival Specials",
      subtitle: "Celebrate with our special festival meals",
      type: "festival"
    }
  ];

  // Update selection summary
  const updateSelectionSummary = () => {
    let summaryHTML = '';
    
    if (userSelections.frequency) {
      summaryHTML += `<p><strong>Plan:</strong> ${userSelections.frequency.charAt(0).toUpperCase() + userSelections.frequency.slice(1)}</p>`;
    }
    
    if (userSelections.diet) {
      let dietText = '';
      switch(userSelections.diet) {
        case 'pure-veg':
          dietText = 'Pure Vegetarian';
          break;
        case 'veg-nonveg':
          dietText = 'Vegetarian + Non-Vegetarian';
          break;
        case 'nonveg':
          dietText = 'Non-Vegetarian Only';
          break;
      }
      summaryHTML += `<p><strong>Diet:</strong> ${dietText}</p>`;
    }
    
    if (userSelections.meal) {
      let mealText = '';
      switch(userSelections.meal) {
        case 'lunch':
          mealText = 'Lunch Only';
          break;
        case 'dinner':
          mealText = 'Dinner Only';
          break;
        case 'lunch-dinner':
          mealText = 'Lunch + Dinner';
          break;
      }
      summaryHTML += `<p><strong>Meals:</strong> ${mealText}</p>`;
    }
    
    return summaryHTML;
  };

  // Handle option selection
  const handleOptionSelect = (group, value) => {
    const newSelections = {...userSelections, [group]: value};
    setUserSelections(newSelections);
    
    if (currentSlide === 0) {
      if (group === 'frequency') {
        setCurrentStep('diet');
      } else if (group === 'diet') {
        setCurrentStep('meal');
      } else if (group === 'meal') {
        // Check if all steps are completed
        if (newSelections.frequency && newSelections.diet && newSelections.meal) {
          setAllStepsCompleted(true);
        }
      }
    }
  };

  // Handle back button
  const handleBackButton = () => {
    if (currentStep === 'meal') {
      setCurrentStep('diet');
      setUserSelections({...userSelections, meal: ''});
    } else if (currentStep === 'diet') {
      setCurrentStep('frequency');
      setUserSelections({...userSelections, diet: ''});
    }
  };

  // Reset individual options when switching to individual slide
  useEffect(() => {
    if (currentSlide !== 0) {
      setCurrentStep('frequency');
      setUserSelections({
        frequency: '',
        diet: '',
        meal: ''
      });
      setAllStepsCompleted(false);
    }
  }, [currentSlide]);

  return (
    <div className={`w-full py-10 px-3 sm:px-5 ${dark ? 'bg-gray-900' : 'bg-transparent'}`}>
      <div className="max-w-6xl w-full mx-auto">
        <header className="text-center mb-10 animate-fadeIn">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>Our Meal Plans</h1>
          <p className={`max-w-2xl mx-auto leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            Flexible subscriptions — pause, swap, or cancel anytime.
          </p>
        </header>
        
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {slides.map((slide, index) => (
            <button
              key={index}
              className={`flex items-center px-4 py-3 rounded-full font-semibold transition-all ${
                currentSlide === index 
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white scale-105 shadow-lg' 
                  : dark 
                    ? 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-amber-400 hover:-translate-y-0.5 shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300 hover:-translate-y-0.5 shadow-md'
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <i className={`mr-2 ${
                index === 0 ? 'fas fa-user' :
                index === 1 ? 'fas fa-users' :
                index === 2 ? 'fas fa-building' :
                index === 3 ? 'fas fa-passport' : 'fas fa-gift'
              }`}></i>
              {slide.type === "individual" ? "Individual" :
               slide.type === "family" ? "Family Pack" :
               slide.type === "corporate" ? "Corporate Office" :
               slide.type === "migrant" ? "Migrant Worker" : "Festival Specials"}
            </button>
          ))}
        </div>
        
        <div className={`relative overflow-hidden rounded-xl  h-auto mb-10 ${dark ? 'bg-gray-800' : 'bg-white'}`}>
          <div 
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Individual Plans Slide */}
            <div className={`min-w-full p-6 flex flex-col overflow-y-auto ${dark ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="text-center mb-6 relative">
                <button 
                  className={`absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 ${
                    currentStep === 'frequency' ? 'hidden' : 'flex'
                  } ${
                    dark 
                      ? 'bg-gradient-to-r from-amber-600 to-amber-800 border-2 border-amber-500 text-white hover:from-amber-500 hover:to-amber-700' 
                      : 'bg-gradient-to-r from-amber-400 to-amber-500 border-2 border-amber-300 text-white hover:from-amber-300 hover:to-amber-400'
                  }`}
                  onClick={handleBackButton}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <h2 className={`text-2xl font-semibold mb-2 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
                  {currentStep === 'frequency' ? 'Individual Plans' :
                   currentStep === 'diet' ? 'Select Diet Type' : 'Select Meal Type'}
                </h2>
                <p className={dark ? 'text-gray-400' : 'text-gray-600'}>
                  {currentStep === 'frequency' ? 'Perfect for individuals with flexible options' :
                   currentStep === 'diet' ? 'Choose your dietary preferences' : 'Choose which meals you want'}
                </p>
              </div>
              
              {updateSelectionSummary() && (
                <div className={`p-4 rounded-lg mb-4 text-center animate-fadeIn ${
                  dark ? 'bg-amber-900/30 border border-amber-700' : 'bg-amber-50'
                }`}>
                  <div dangerouslySetInnerHTML={{ __html: updateSelectionSummary() }} />
                </div>
              )}
              
              {/* Frequency Selection */}
              <div className={`flex justify-center gap-4 my-4 flex-wrap ${
                currentStep !== 'frequency' ? 'hidden' : 'flex'
              }`}>
                <button 
                  className={`px-5 py-3 rounded-full font-semibold border-2 transition-all ${
                    userSelections.frequency === 'weekly'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-transparent scale-105 shadow-lg'
                      : dark
                        ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-amber-400 hover:-translate-y-0.5 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:-translate-y-0.5 shadow-md'
                  }`}
                  onClick={() => handleOptionSelect('frequency', 'weekly')}
                >
                  Weekly Plan
                </button>
                <button 
                  className={`px-5 py-3 rounded-full font-semibold border-2 transition-all ${
                    userSelections.frequency === 'monthly'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-transparent scale-105 shadow-lg'
                      : dark
                        ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-amber-400 hover:-translate-y-0.5 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:-translate-y-0.5 shadow-md'
                  }`}
                  onClick={() => handleOptionSelect('frequency', 'monthly')}
                >
                  Monthly Plan
                </button>
              </div>
              
              {/* Diet Type Selection */}
              <div className={`flex justify-center gap-4 my-4 flex-wrap ${
                currentStep !== 'diet' ? 'hidden' : 'flex'
              }`}>
                <button 
                  className={`px-5 py-3 rounded-full font-semibold border-2 transition-all ${
                    userSelections.diet === 'pure-veg'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-transparent scale-105 shadow-lg'
                      : dark
                        ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-amber-400 hover:-translate-y-0.5 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:-translate-y-0.5 shadow-md'
                  }`}
                  onClick={() => handleOptionSelect('diet', 'pure-veg')}
                >
                  Pure Veg
                </button>
                <button 
                  className={`px-5 py-3 rounded-full font-semibold border-2 transition-all ${
                    userSelections.diet === 'veg-nonveg'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-transparent scale-105 shadow-lg'
                      : dark
                        ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-amber-400 hover:-translate-y-0.5 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:-translate-y-0.5 shadow-md'
                  }`}
                  onClick={() => handleOptionSelect('diet', 'veg-nonveg')}
                >
                  Veg + Non Veg
                </button>
                <button 
                  className={`px-5 py-3 rounded-full font-semibold border-2 transition-all ${
                    userSelections.diet === 'nonveg'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-transparent scale-105 shadow-lg'
                      : dark
                        ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-amber-400 hover:-translate-y-0.5 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:-translate-y-0.5 shadow-md'
                  }`}
                  onClick={() => handleOptionSelect('diet', 'nonveg')}
                >
                  Special Non Veg
                </button>
              </div>
              
              {/* Meal Type Selection */}
              <div className={`flex justify-center gap-4 my-4 flex-wrap ${
                currentStep !== 'meal' ? 'hidden' : 'flex'
              }`}>
                <button 
                  className={`px-5 py-3 rounded-full font-semibold border-2 transition-all ${
                    userSelections.meal === 'lunch'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-transparent scale-105 shadow-lg'
                      : dark
                        ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-amber-400 hover:-translate-y-0.5 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:-translate-y-0.5 shadow-md'
                  }`}
                  onClick={() => handleOptionSelect('meal', 'lunch')}
                >
                  Lunch
                </button>
                <button 
                  className={`px-5 py-3 rounded-full font-semibold border-2 transition-all ${
                    userSelections.meal === 'dinner'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-transparent scale-105 shadow-lg'
                      : dark
                        ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-amber-400 hover:-translate-y-0.5 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:-translate-y-0.5 shadow-md'
                  }`}
                  onClick={() => handleOptionSelect('meal', 'dinner')}
                >
                  Dinner
                </button>
                <button 
                  className={`px-5 py-3 rounded-full font-semibold border-2 transition-all ${
                    userSelections.meal === 'lunch-dinner'
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white border-transparent scale-105 shadow-lg'
                      : dark
                        ? 'bg-gray-800 text-gray-300 border-gray-700 hover:border-amber-400 hover:-translate-y-0.5 shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:-translate-y-0.5 shadow-md'
                  }`}
                  onClick={() => handleOptionSelect('meal', 'lunch-dinner')}
                >
                  Lunch + Dinner
                </button>
              </div>
              
              {allStepsCompleted && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 animate-fadeIn">
                  <div className={`rounded-xl overflow-hidden shadow-lg flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl relative scale-105 ${
                    dark 
                      ? 'bg-gray-800 border-2 border-amber-700' 
                      : 'bg-white border-2 border-amber-200'
                  }`}>
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                      Most Popular
                    </div>
                    <div className="bg-gradient-to-r from-amber-500 to-rose-500 text-white p-4 text-center">
                      <h3 className="text-xl font-semibold">Daily Meal Plan</h3>
                    </div>
                    <div className="p-5 flex-grow">
                      <ul className="my-4">
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Balanced breakfast, lunch & dinner</span>
                        </li>
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Chef-curated meals</span>
                        </li>
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>28-day program</span>
                        </li>
                        <li className="py-2 flex items-center">
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Nutritionist approved</span>
                        </li>
                      </ul>
                    </div>
                    <div className={`p-4 text-center ${dark ? 'bg-amber-900/30' : 'bg-amber-50'}`}>
                      <p className={`font-semibold ${dark ? 'text-amber-300' : 'text-amber-800'}`}>
                        <i className="fas fa-truck mr-2"></i>
                        Free delivery above ₹299
                      </p>
                    </div>
                  </div>
                  
                  <div className={`rounded-xl overflow-hidden shadow-lg flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl ${
                    dark ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="bg-gradient-to-r from-amber-500 to-rose-500 text-white p-4 text-center">
                      <h3 className="text-xl font-semibold">Custom Plan</h3>
                    </div>
                    <div className="p-5 flex-grow">
                      <ul className="my-4">
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Pick meals, schedule deliveries</span>
                        </li>
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Swap anytime</span>
                        </li>
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Flexible scheduling</span>
                        </li>
                        <li className="py-2 flex items-center">
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Personal preferences</span>
                        </li>
                      </ul>
                    </div>
                    <div className={`p-4 text-center ${dark ? 'bg-amber-900/30' : 'bg-amber-50'}`}>
                      <p className={`font-semibold ${dark ? 'text-amber-300' : 'text-amber-800'}`}>
                        <i className="fas fa-truck mr-2"></i>
                        Free delivery above ₹299
                      </p>
                    </div>
                  </div>
                  
                  <div className={`rounded-xl overflow-hidden shadow-lg flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl ${
                    dark ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="bg-gradient-to-r from-amber-500 to-rose-500 text-white p-4 text-center">
                      <h3 className="text-xl font-semibold">Premium Combo</h3>
                    </div>
                    <div className="p-5 flex-grow">
                      <ul className="my-4">
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Lunch + Dinner specials</span>
                        </li>
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Chef's special recipes</span>
                        </li>
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Premium ingredients</span>
                        </li>
                        <li className="py-2 flex items-center">
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Monthly themed menus</span>
                        </li>
                      </ul>
                    </div>
                    <div className={`p-4 text-center ${dark ? 'bg-amber-900/30' : 'bg-amber-50'}`}>
                      <p className={`font-semibold ${dark ? 'text-amber-300' : 'text-amber-800'}`}>
                        <i className="fas fa-truck mr-2"></i>
                        Free delivery above ₹299
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Other Slides (Coming Soon) */}
            {slides.slice(1).map((slide, index) => (
              <div key={index+1} className={`min-w-full p-6 flex flex-col overflow-y-auto ${dark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-center mb-6">
                  <h2 className={`text-2xl font-semibold mb-2 ${dark ? 'text-gray-100' : 'text-gray-900'}`}>{slide.title}</h2>
                  <p className={dark ? 'text-gray-400' : 'text-gray-600'}>{slide.subtitle}</p>
                </div>
                
                <div className={`flex justify-center items-center h-48 rounded-xl shadow-md my-5 ${
                  dark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className={`text-center ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <i className="fas fa-clock text-5xl mb-4"></i>
                    <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                    <p>
                      {slide.type === "family" ? "We're creating special family meal plans" :
                       slide.type === "corporate" ? "Corporate meal plans are in development" :
                       slide.type === "migrant" ? "Specialized migrant worker meals coming soon" :
                       "Festival special meals will be available soon"}
                    </p>
                  </div>
                </div>
                
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <div className={`rounded-xl overflow-hidden shadow-lg flex flex-col ${
                    dark ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="bg-gradient-to-r from-amber-500 to-rose-500 text-white p-4 text-center">
                      <h3 className="text-xl font-semibold">Standard Plan</h3>
                    </div>
                    <div className="p-5 flex-grow">
                      <ul className="my-4">
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Balanced meals</span>
                        </li>
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Chef-curated options</span>
                        </li>
                        <li className="py-2 flex items-center">
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Flexible scheduling</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className={`rounded-xl overflow-hidden shadow-lg flex flex-col ${
                    dark ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <div className="bg-gradient-to-r from-amber-500 to-rose-500 text-white p-4 text-center">
                      <h3 className="text-xl font-semibold">Premium Plan</h3>
                    </div>
                    <div className="p-5 flex-grow">
                      <ul className="my-4">
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Premium ingredients</span>
                        </li>
                        <li className={`py-2 border-b border-dashed flex items-center ${dark ? 'border-gray-600' : 'border-gray-200'}`}>
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Special recipes</span>
                        </li>
                        <li className="py-2 flex items-center">
                          <i className="fas fa-check-circle text-amber-500 mr-3"></i>
                          <span className={dark ? 'text-gray-300' : 'text-gray-700'}>Priority delivery</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <button className="bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all hover:from-amber-600 hover:to-rose-600 hover:-translate-y-0.5 hover:shadow-xl">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanSubscription;