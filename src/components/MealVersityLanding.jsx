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

  const plans = [
    { id: 1, title: 'Daily Meal Plan', desc: 'Balanced breakfast, lunch & dinner — chef-curated.', price: '₹1,749', tag: 'Best value', meals: '28 days' },
    { id: 2, title: 'Premium Combo', desc: 'Lunch + Dinner — chef specials.', price: '₹3,499', tag: 'Popular', meals: 'Monthly' },
    { id: 3, title: 'Custom Plan', desc: 'Pick meals, schedule deliveries, swap anytime.', price: 'Custom', tag: 'Flexible', meals: 'Flexible' },
    { id: 4, title: 'Custom Plan', desc: 'Pick meals, schedule deliveries, swap anytime.', price: 'Custom', tag: 'Flexible', meals: 'Flexible' },
  ];

  const team = [
    { id: 1, name: 'Tarik Anowar', role: 'CEO' },
    { id: 2, name: 'Afreen Sarkar', role: 'CMO' },
    { id: 3, name: 'Muklesur Rahaman', role: 'CFO' },
    { id: 4, name: 'Asif Ahmed', role: 'Head Chef' },
  ];

  function openPlan(plan) {
    setSelectedPlan(plan);
    setShowQuickOrder(true);
  }

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
            <a href="#contact" className="hover:underline">Contact</a>
            <a href="#carrer" className="hover:underline">Carrer</a>
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
              <a href="#contact" onClick={() => setMenuOpen(false)} className="px-4 py-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Contact</a>
              <a href="#carrer" onClick={() => setMenuOpen(false)} className="px-4 py-3 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">Carrer</a>
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
              <h4 className="text-2xl font-semibold">Our Plans</h4>
              <p className="mt-1 text-gray-600">Flexible subscriptions — pause, swap, or cancel anytime.</p>
            </div>
            <div className="hidden gap-3 sm:flex">
              <button className="px-3 py-2 border border-gray-200 rounded-lg">All</button>
              <button className="px-3 py-2 border border-gray-200 rounded-lg">Popular</button>
              <button className="px-3 py-2 border border-gray-200 rounded-lg">Custom</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p, i) => (
              <motion.article key={p.id} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: i * 0.08 } }} onMouseMove={cardMove} onMouseLeave={cardLeave} className={`p-6 rounded-3xl ${dark ? 'bg-gray-800/70' : 'bg-white/90'} backdrop-blur-md border ${dark ? 'border-gray-700' : 'border-white/30'} shadow-lg hover:shadow-2xl transform transition hover:-translate-y-2`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h5 className="text-lg font-semibold">{p.title}</h5>
                    <p className="mt-2 text-sm text-gray-400">{p.desc}</p>
                    <div className="mt-3 text-xs text-gray-400">{p.meals}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-amber-400">{p.price}</div>
                    <div className="text-xs text-gray-400">/month</div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => openPlan(p)} className="flex-1 px-4 py-2 text-white rounded-full shadow bg-gradient-to-r from-amber-500 to-rose-500">Subscribe</button>
                  <button onClick={() => alert('Details coming soon')} className="px-4 py-2 border border-gray-200 rounded-full">Details</button>
                </div>

                <div className="mt-4 text-xs text-gray-400">Free delivery above ₹299.</div>
              </motion.article>
            ))}
          </div>
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
                  <li><a href="#contact" className="text-sm hover:underline">Contact</a></li>
                  <li><a href="#carrer" className="text-sm hover:underline">Career</a></li>
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
