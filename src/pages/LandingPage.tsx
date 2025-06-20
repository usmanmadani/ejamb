import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Logo } from '../components/Logo';
import { 
  BookOpen, 
  Brain, 
  Users, 
  Award, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Play,
  UserCheck,
  Video,
  MessageCircle,
  Target,
  Trophy,
  Send,
  Mic,
  Sparkles,
  Zap
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-blue-300 opacity-20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-emerald-300 opacity-20 rounded-full"
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

// Scroll-triggered animation hook
const useScrollAnimation = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return [ref, inView];
};

export const LandingPage: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  
  const [heroRef, heroInView] = useScrollAnimation();
  const [featuresRef, featuresInView] = useScrollAnimation();
  const [interactiveRef, interactiveInView] = useScrollAnimation();
  const [statsRef, statsInView] = useScrollAnimation();

  const features = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Comprehensive Study Materials",
      description: "Access thousands of past questions, tutorial videos, and downloadable PDFs"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Assistant",
      description: "Get instant answers to your academic questions with our smart AI tutor"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Learning",
      description: "Join forums, compete with peers, and learn from top-performing students"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Mock Exams & Scoring",
      description: "Practice with real-time scoring and detailed performance analytics"
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Expert Teachers",
      description: "Learn from qualified teachers with specialized courses and guidance"
    }
  ];

  const stats = [
    { number: "50+", label: "Students Enrolled" },
    { number: "95%", label: "Success Rate" },
    { number: "10,000+", label: "Past Questions" },
    { number: "20+", label: "Tutorial Videos" },
    { number: "20+", label: "Expert Teachers" }
  ];

  const interactiveFeatures = [
    {
      icon: <Video className="h-12 w-12" />,
      title: "Virtual Lectures",
      description: "Join Virtual Lectures that bring classroom feel to your home with interactive sessions.",
      color: "blue",
      link: "/courses"
    },
    {
      icon: <MessageCircle className="h-12 w-12" />,
      title: "Live Chatroom",
      description: "Connect instantly in our Live Chatroom to discuss questions and gain insights with peers.",
      color: "emerald",
      link: "/forum"
    },
    {
      icon: <Target className="h-12 w-12" />,
      title: "Interactive Quizzes",
      description: "Practice makes perfect with fun, dynamic interactive quizzes.",
      color: "purple",
      link: "/quiz/1"
    },
    {
      icon: <Trophy className="h-12 w-12" />,
      title: "Leaderboard Challenge",
      description: "Compete and climb ranks with our dynamic leaderboard.",
      color: "orange",
      link: "/student"
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Interactive Forums",
      description: "Empower learning through interactive forum discussions.",
      color: "gradient-to-r from-indigo-500 to-purple-600",
      link: "/forum"
    },
    {
      icon: <Send className="h-12 w-12" />,
      title: "Easy Messaging",
      description: "Start conversations effortlessly with instant messaging.",
      color: "gradient-to-r from-pink-500 to-rose-600",
      link: "/ai-assistant"
    }
  ];

  const testimonials = [
    {
      name: "Adaora Okafor",
      score: "342",
      text: "eJAMB helped me score 342 in JAMB! The AI assistant was incredibly helpful for understanding difficult concepts.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=150&h=150&facepad=2"
    },
    {
      name: "Chidi Nwankwo",
      score: "298",
      text: "The mock exams prepared me well. I knew exactly what to expect on the actual exam day.",
      image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=150&h=150&facepad=2"
    },
    {
      name: "Funmi Adebayo",
      score: "315",
      text: "The teacher courses were amazing! Dr. Sarah's physics course made complex topics so easy to understand.",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=150&h=150&facepad=2"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-white/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Logo className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">eJAMB</span>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/courses" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Courses
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/syllabus" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Syllabus
                  </Link>
                </motion.div>
              </div>
              <div className="relative group">
                <motion.button 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  Login
                </motion.button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                  <div className="py-2">
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-2">
                      Student Login
                    </Link>
                    <Link to="/teacher-login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-2">
                      Teacher Login
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <motion.button 
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-xl hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                  <div className="py-2">
                    <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-2">
                      Join as Student
                    </Link>
                    <Link to="/teacher-register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg mx-2">
                      Teach on eJAMB
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.button 
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Menu
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden" ref={heroRef}>
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-emerald-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">AI-Powered Learning Platform</span>
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Ace Your <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">JAMB</span> Exam with AI-Powered Learning
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Join thousands of Nigerian students who have successfully passed their JAMB exams using our comprehensive learning platform with expert teachers and AI assistance.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/register"
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    Start Learning Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/courses"
                    className="border-2 border-gray-300 text-gray-700 px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Browse Courses
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.img
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white shadow-md"
                      src={[
                        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=40&h=40&facepad=2",
                        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=40&h=40&facepad=2",
                        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=40&h=40&facepad=2",
                        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=40&h=40&facepad=2"
                      ][i-1]}
                      alt="African school student"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                      >
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Trusted by 50+ students</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              variants={slideInRight}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              style={{ y: y1 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                animate={floatingAnimation}
              >
                <img
                  src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
                  alt="African students studying together with technology"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <motion.div 
                  className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">95% Success Rate</p>
                      <p className="text-sm text-gray-600">Students pass JAMB</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -top-2 md:-top-4 -right-2 md:-right-4 bg-blue-600 text-white p-3 rounded-xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={pulseAnimation}
                >
                  <Zap className="h-6 w-6" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2"
                  initial={{ scale: 0 }}
                  animate={statsInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm md:text-base text-gray-600 group-hover:text-gray-800 transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Empower Your JAMB Journey Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden" ref={interactiveRef}>
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 bg-emerald-400 rounded-full opacity-10 blur-xl"
            animate={{
              scale: [1, 1.5, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full opacity-10 blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 md:mb-16"
            variants={fadeInUp}
            initial="hidden"
            animate={interactiveInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={interactiveInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Empower Your <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">JAMB Journey</span> with E-Jamb
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={interactiveInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover how interactive tools and real-time support enhance exam preparation.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={interactiveInView ? "visible" : "hidden"}
          >
            {interactiveFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border border-white/20"
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <motion.div 
                  className={`inline-flex p-4 rounded-2xl ${
                    feature.color.includes('gradient') 
                      ? `bg-${feature.color}` 
                      : `bg-gradient-to-r from-${feature.color}-400 to-${feature.color}-600`
                  } text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  whileHover={{ rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors text-sm md:text-base">
                  {feature.description}
                </p>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link
                    to={feature.link}
                    className={`inline-flex items-center ${
                      feature.color.includes('gradient')
                        ? 'text-indigo-600 hover:text-indigo-700'
                        : `text-${feature.color}-600 hover:text-${feature.color}-700`
                    } font-semibold transition-colors group text-sm md:text-base`}
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-white" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            variants={fadeInUp}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to excel in your JAMB examination.
            </p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div 
                    className="bg-emerald-100 p-3 rounded-lg text-emerald-600 group-hover:bg-emerald-200 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors text-sm md:text-base">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Teacher Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 to-emerald-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Learn from Expert Teachers
              </motion.h2>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Access specialized courses created by qualified teachers with years of experience in JAMB preparation.
              </motion.p>
              <motion.ul 
                className="space-y-4 mb-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  "Qualified teachers with proven track records",
                  "Subject-specific courses and materials",
                  "Interactive lessons and personalized feedback",
                  "Direct communication with instructors"
                ].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start space-x-3"
                    variants={fadeInUp}
                  >
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm md:text-base">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/courses"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-center block"
                  >
                    Browse Courses
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/teacher-register"
                    className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors text-center block"
                  >
                    Become a Teacher
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              style={{ y: y2 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80"
                alt="African teacher with students in classroom"
                className="rounded-2xl shadow-xl w-full h-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                animate={floatingAnimation}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Our Students
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              See how eJAMB has helped students achieve their dreams
            </p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 md:p-8 rounded-xl group hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <div className="flex items-center mb-4">
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-4 border-2 border-emerald-200"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-emerald-600 font-medium">JAMB Score: {testimonial.score}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic group-hover:text-gray-700 transition-colors text-sm md:text-base">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple, Affordable Pricing
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Get full access to all features for just ₦5,000
            </p>
          </motion.div>

          <div className="max-w-md mx-auto">
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-emerald-600 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <motion.div
                className="absolute top-0 right-0 bg-emerald-600 text-white px-4 py-2 rounded-bl-lg"
                initial={{ opacity: 0, x: 20, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-medium">Most Popular</span>
              </motion.div>
              
              <div className="text-center mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Full Access Pass</h3>
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">₦5,000</div>
                <p className="text-gray-600">One-time payment</p>
              </div>

              <motion.ul 
                className="space-y-4 mb-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  "Unlimited access to all courses",
                  "10,000+ past JAMB questions",
                  "AI-powered study assistant",
                  "Mock exams with real-time scoring",
                  "Downloadable study materials",
                  "Community forum access",
                  "Expert teacher courses",
                  "24/7 support"
                ].map((feature, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center"
                    variants={fadeInUp}
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 text-center block shadow-lg hover:shadow-xl"
                >
                  Start Learning Now
                </Link>
              </motion.div>

              <p className="text-center text-sm text-gray-600 mt-4">
                Use a referral code and save ₦500!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center space-x-2 mb-4">
                <Logo className="h-8 w-8" />
                <span className="text-xl font-bold">eJAMB</span>
              </div>
              <p className="text-gray-400 text-sm md:text-base">
                Empowering Nigerian students to achieve their JAMB goals through innovative learning technology.
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold mb-4">For Students</h4>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><Link to="/courses" className="hover:text-white transition-colors">Browse Courses</Link></li>
                <li><Link to="/syllabus" className="hover:text-white transition-colors">JAMB Syllabus</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Student Login</Link></li>
              </ul>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold mb-4">For Teachers</h4>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li><Link to="/teacher-register" className="hover:text-white transition-colors">Become a Teacher</Link></li>
                <li><Link to="/teacher-login" className="hover:text-white transition-colors">Teacher Login</Link></li>
                <li>Create Courses</li>
                <li>Manage Students</li>
              </ul>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Community Forum</li>
                <li>Referral Program</li>
              </ul>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2024 eJAMB. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};