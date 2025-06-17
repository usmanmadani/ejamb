import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { mockCourses } from '../data/courses';
import { 
  BookOpen, 
  Users, 
  Star, 
  Clock, 
  Filter,
  Search,
  Play,
  Award,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const CoursesPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique subjects from courses
  const subjects = ['All Subjects', ...Array.from(new Set(mockCourses.map(course => course.subject)))];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSubject = selectedSubject === 'all' || course.subject === selectedSubject;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (course.assignedTeacher?.name.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    return matchesSubject && matchesSearch && course.isActive;
  });

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      'Mathematics': 'blue',
      'Physics': 'purple',
      'Chemistry': 'green',
      'English Language': 'orange',
      'Biology': 'emerald',
      'Literature in English': 'pink',
      'Government': 'indigo',
      'Economics': 'yellow'
    };
    return colors[subject] || 'gray';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative z-10">
              <motion.div
                className="flex items-center space-x-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <Sparkles className="h-6 w-6" />
                <span className="text-emerald-100">Expert-Led Learning</span>
              </motion.div>
              
              <motion.h1 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Explore Courses 📚
              </motion.h1>
              
              <motion.p 
                className="text-emerald-100 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Learn from expert teachers and boost your JAMB preparation
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {[
            { title: 'Available Courses', value: filteredCourses.length, icon: BookOpen, color: 'blue', bgGradient: 'from-blue-400 to-blue-600' },
            { title: 'Expert Teachers', value: new Set(mockCourses.filter(c => c.assignedTeacher).map(c => c.assignedTeacher?.id)).size, icon: Users, color: 'emerald', bgGradient: 'from-emerald-400 to-emerald-600' },
            { title: 'Students Enrolled', value: mockCourses.reduce((sum, course) => sum + course.enrolledStudents, 0).toLocaleString(), icon: TrendingUp, color: 'purple', bgGradient: 'from-purple-400 to-purple-600' },
            { title: 'Avg Rating', value: '4.8', icon: Star, color: 'yellow', bgGradient: 'from-yellow-400 to-yellow-600' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <motion.p 
                    className="text-2xl font-bold text-gray-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.6, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div 
                  className={`p-3 rounded-xl bg-gradient-to-r ${stat.bgGradient} text-white shadow-lg group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 5 }}
                >
                  <stat.icon className="h-6 w-6" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-white/20"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses, teachers, or subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject === 'All Subjects' ? 'all' : subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              variants={scaleIn}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="relative overflow-hidden h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-emerald-500/20" />
                <div className="absolute top-4 left-4">
                  <motion.span 
                    className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-${getSubjectColor(course.subject)}-400 to-${getSubjectColor(course.subject)}-600 text-white shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {course.subject}
                  </motion.span>
                </div>
                <div className="absolute top-4 right-4">
                  <motion.span 
                    className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    Active
                  </motion.span>
                </div>
                <motion.div 
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="bg-white rounded-full p-4 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play className="h-8 w-8 text-blue-600" />
                  </motion.div>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-6">
                {course.assignedTeacher && (
                  <motion.div 
                    className="flex items-center space-x-2 mb-3"
                    whileHover={{ x: 3 }}
                  >
                    <motion.div
                      className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Users className="h-4 w-4 text-blue-600" />
                    </motion.div>
                    <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">{course.assignedTeacher.name}</span>
                  </motion.div>
                )}
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <motion.div 
                      className="flex items-center space-x-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Users className="h-4 w-4" />
                      <span>{course.enrolledStudents}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>{course.materials.length} materials</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>{course.quizzes.length} quizzes</span>
                    </motion.div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">Free</span>
                    <span className="text-sm text-gray-500">with registration</span>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={`/course/${course.id}`}
                      className="px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                    >
                      View Course
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};