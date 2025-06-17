import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Bell, BookOpen } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav 
      className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Logo className="h-8 w-8" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                eJAMB
              </span>
            </Link>
          </motion.div>

          <div className="flex items-center space-x-6">
            {!user && (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/courses" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Courses
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/subjects" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Subjects</span>
                  </Link>
                </motion.div>
              </>
            )}

            {user && (
              <div className="flex items-center space-x-4">
                <motion.button 
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="h-5 w-5" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring", stiffness: 500, damping: 10 }}
                  />
                </motion.button>
                
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <User className="h-5 w-5 text-gray-400" />
                    </motion.div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </motion.div>
                  
                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};