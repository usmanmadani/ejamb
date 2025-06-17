import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Clock, 
  Users, 
  PlayCircle,
  FileText,
  Target,
  TrendingUp,
  Calendar,
  Award,
  MessageCircle,
  UserCheck,
  Star,
  Zap,
  Sparkles
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

export const StudentDashboard: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = [
    'Mathematics',
    'English Language',
    'Physics',
    'Chemistry',
    'Biology',
    'Literature',
    'Government',
    'Economics'
  ];

  const recentActivities = [
    { subject: 'Mathematics', activity: 'Completed Practice Quiz', score: '85%', time: '2 hours ago' },
    { subject: 'Physics', activity: 'Watched Tutorial Video', time: 'Yesterday' },
    { subject: 'Chemistry', activity: 'Downloaded Study Notes', time: '2 days ago' },
    { subject: 'English', activity: 'Completed Mock Exam', score: '78%', time: '3 days ago' }
  ];

  const upcomingEvents = [
    { title: 'Live Physics Session', date: 'Today, 6:00 PM', type: 'live' },
    { title: 'Mathematics Mock Exam', date: 'Tomorrow, 10:00 AM', type: 'exam' },
    { title: 'Chemistry Q&A Session', date: 'Dec 28, 4:00 PM', type: 'qa' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Adaora Okafor', score: 342, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
    { rank: 2, name: 'Chidi Nwankwo', score: 298, avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
    { rank: 3, name: 'Funmi Adebayo', score: 315, avatar: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop' },
    { rank: 4, name: 'You', score: 285, avatar: '', current: true }
  ];

  const teacherCourses = [
    {
      id: 1,
      title: 'Advanced Physics for JAMB',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.9,
      students: 245,
      thumbnail: 'https://images.pexels.com/photos/8471888/pexels-photo-8471888.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      isEnrolled: false
    },
    {
      id: 2,
      title: 'Mathematics Fundamentals',
      instructor: 'Prof. Michael Chen',
      rating: 4.8,
      students: 189,
      thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      isEnrolled: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
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
                <span className="text-emerald-100">Welcome back!</span>
              </motion.div>
              
              <motion.h1 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Hello, John! 👋
              </motion.h1>
              
              <motion.p 
                className="text-emerald-100 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Ready to continue your JAMB preparation journey?
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {[
            { title: 'Study Hours', value: '47.5', change: '+12%', icon: Clock, color: 'emerald', bgGradient: 'from-emerald-400 to-emerald-600' },
            { title: 'Quiz Score', value: '82%', change: '+5%', icon: Target, color: 'blue', bgGradient: 'from-blue-400 to-blue-600' },
            { title: 'Completed', value: '23/40', change: '+3', icon: BookOpen, color: 'purple', bgGradient: 'from-purple-400 to-purple-600' },
            { title: 'Rank', value: '#4', change: '+2', icon: Trophy, color: 'orange', bgGradient: 'from-orange-400 to-orange-600' }
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
                  <p className="text-sm text-emerald-600 font-medium">{stat.change} this week</p>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="h-5 w-5 text-emerald-600 mr-2" />
                Quick Actions
              </h2>
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  { title: 'Take Quiz', icon: Target, href: '/quiz/math-basics', color: 'emerald', bgGradient: 'from-emerald-400 to-emerald-600' },
                  { title: 'AI Assistant', icon: Brain, href: '/ai-assistant', color: 'blue', bgGradient: 'from-blue-400 to-blue-600' },
                  { title: 'Browse Courses', icon: UserCheck, href: '/courses', color: 'purple', bgGradient: 'from-purple-400 to-purple-600' },
                  { title: 'Join Forum', icon: MessageCircle, href: '/forum', color: 'orange', bgGradient: 'from-orange-400 to-orange-600' }
                ].map((action, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={action.href}
                      className="block p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 transition-all duration-300 text-center group shadow-md hover:shadow-lg border border-gray-100"
                    >
                      <motion.div
                        className={`h-12 w-12 bg-gradient-to-r ${action.bgGradient} text-white rounded-xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                        whileHover={{ rotate: 5 }}
                      >
                        <action.icon className="h-6 w-6" />
                      </motion.div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-gray-800">{action.title}</p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Teacher Courses */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <UserCheck className="h-5 w-5 text-blue-600 mr-2" />
                  Featured Teacher Courses
                </h2>
                <Link to="/courses" className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline">
                  View All
                </Link>
              </div>
              <motion.div 
                className="grid md:grid-cols-2 gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {teacherCourses.map((course, index) => (
                  <motion.div 
                    key={course.id} 
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white group"
                    variants={scaleIn}
                    whileHover={{ scale: 1.02, y: -3 }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm group-hover:text-blue-600 transition-colors">{course.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                        <span>{course.students} students</span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to={course.isEnrolled ? `/course/${course.id}` : '/courses'}
                          className={`block w-full text-center py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 ${
                            course.isEnrolled
                              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg'
                              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg'
                          }`}
                        >
                          {course.isEnrolled ? 'Continue' : 'Enroll Now'}
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Subject Progress */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <BookOpen className="h-5 w-5 text-purple-600 mr-2" />
                  Subject Progress
                </h2>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <motion.div 
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {subjects.slice(0, 4).map((subject, index) => {
                  const progress = Math.floor(Math.random() * 40) + 60;
                  return (
                    <motion.div 
                      key={subject} 
                      className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      variants={fadeInUp}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform"
                        whileHover={{ rotate: 5 }}
                      >
                        <BookOpen className="h-6 w-6" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">{subject}</h3>
                          <span className="text-sm text-gray-600 font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={`/course/${subject.toLowerCase().replace(' ', '-')}`}
                          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
                        >
                          Continue
                        </Link>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                Recent Activities
              </h2>
              <motion.div 
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {recentActivities.map((activity, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    variants={fadeInUp}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform"
                      whileHover={{ rotate: 5 }}
                    >
                      <TrendingUp className="h-5 w-5" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{activity.activity}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{activity.subject}</span>
                        {activity.score && (
                          <>
                            <span>•</span>
                            <span className="text-emerald-600 font-medium">{activity.score}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
                Upcoming Events
              </h2>
              <motion.div 
                className="space-y-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {upcomingEvents.map((event, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    variants={fadeInUp}
                    whileHover={{ x: 3 }}
                  >
                    <motion.div 
                      className="w-2 h-2 bg-emerald-600 rounded-full mt-2 group-hover:scale-125 transition-transform"
                      whileHover={{ scale: 1.5 }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm group-hover:text-emerald-600 transition-colors">{event.title}</p>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Trophy className="h-5 w-5 text-yellow-600 mr-2" />
                Leaderboard
              </h2>
              <motion.div 
                className="space-y-3"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {leaderboard.map((student, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      student.current ? 'bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 shadow-md' : 'hover:bg-gray-50'
                    }`}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, x: 3 }}
                  >
                    <div className="flex items-center space-x-2">
                      <motion.span 
                        className={`text-sm font-bold ${
                          student.rank === 1 ? 'text-yellow-600' :
                          student.rank === 2 ? 'text-gray-600' :
                          student.rank === 3 ? 'text-orange-600' :
                          'text-gray-500'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        #{student.rank}
                      </motion.span>
                      {student.avatar ? (
                        <motion.img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                          whileHover={{ scale: 1.1 }}
                        />
                      ) : (
                        <motion.div 
                          className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <span className="text-white text-xs font-bold">You</span>
                        </motion.div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${student.current ? 'text-emerald-700' : 'text-gray-900'}`}>
                        {student.name}
                      </p>
                      <p className="text-xs text-gray-600">{student.score} points</p>
                    </div>
                    {student.rank <= 3 && (
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <Award className={`h-4 w-4 ${
                          student.rank === 1 ? 'text-yellow-600' :
                          student.rank === 2 ? 'text-gray-600' :
                          'text-orange-600'
                        }`} />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* AI Assistant Preview */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-200 relative overflow-hidden"
            >
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full -mr-10 -mt-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Brain className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                    <p className="text-sm text-gray-600">Ask me anything!</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Get instant help with your studies. I can explain concepts, solve problems, and answer questions.
                </p>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/ai-assistant"
                    className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl"
                  >
                    Start Chatting
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};