import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { jambSubjects, subjectCategories, getSubjectsByCategory } from '../data/subjects';
import { 
  BookOpen, 
  Search, 
  Filter,
  GraduationCap,
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target
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

export const SubjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubjects = jambSubjects.filter(subject => {
    const matchesCategory = selectedCategory === 'all' || subject.category === selectedCategory;
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subject.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const categoryInfo = subjectCategories.find(cat => cat.id === category);
    return categoryInfo?.color || 'gray';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compulsory': return AlertCircle;
      case 'science': return Target;
      case 'arts': return Sparkles;
      case 'social-science': return Users;
      case 'languages': return BookOpen;
      case 'vocational': return GraduationCap;
      default: return BookOpen;
    }
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
                <BookOpen className="h-6 w-6" />
                <span className="text-emerald-100">Complete Subject Guide</span>
              </motion.div>
              
              <motion.h1 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                JAMB Subjects 📚
              </motion.h1>
              
              <motion.p 
                className="text-emerald-100 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Explore all {jambSubjects.length} subjects available for JAMB examination
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {[
            { title: 'Total Subjects', value: jambSubjects.length, icon: BookOpen, color: 'blue' },
            { title: 'Compulsory', value: jambSubjects.filter(s => s.isCompulsory).length, icon: AlertCircle, color: 'red' },
            { title: 'Science Subjects', value: getSubjectsByCategory('science').length, icon: Target, color: 'emerald' },
            { title: 'Categories', value: subjectCategories.length, icon: Users, color: 'purple' }
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
                  className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 group-hover:scale-110 transition-transform`}
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
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm"
                >
                  <option value="all">All Categories</option>
                  {subjectCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Overview */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Subject Categories</h2>
          <motion.div 
            className="grid md:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {subjectCategories.map((category, index) => {
              const Icon = getCategoryIcon(category.id);
              const count = getSubjectsByCategory(category.id).length;
              
              return (
                <motion.button
                  key={category.id}
                  variants={scaleIn}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl text-center transition-all duration-300 border-2 ${
                    selectedCategory === category.id
                      ? `border-${category.color}-500 bg-${category.color}-50`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-${category.color}-100 flex items-center justify-center`}
                    whileHover={{ rotate: 5 }}
                  >
                    <Icon className={`h-6 w-6 text-${category.color}-600`} />
                  </motion.div>
                  <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
                  <p className="text-xs text-gray-600">{count} subjects</p>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Subjects Grid */}
        <motion.div 
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredSubjects.map((subject, index) => {
            const categoryColor = getCategoryColor(subject.category);
            const CategoryIcon = getCategoryIcon(subject.category);
            
            return (
              <motion.div
                key={subject.id}
                variants={scaleIn}
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 group"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div 
                      className={`p-3 rounded-xl bg-${categoryColor}-100 text-${categoryColor}-600 group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: 5 }}
                    >
                      <CategoryIcon className="h-6 w-6" />
                    </motion.div>
                    {subject.isCompulsory && (
                      <motion.span 
                        className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        Compulsory
                      </motion.span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {subject.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {subject.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <motion.span 
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-${categoryColor}-100 text-${categoryColor}-800`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {subjectCategories.find(cat => cat.id === subject.category)?.name}
                    </motion.span>
                    
                    <motion.button
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                      whileHover={{ x: 3 }}
                    >
                      <span>Learn More</span>
                      <Star className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredSubjects.length === 0 && (
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No subjects found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}

        {/* Important Note */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mt-12 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-200"
        >
          <div className="flex items-start space-x-4">
            <motion.div
              className="p-2 bg-blue-100 rounded-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Important Note</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>English Language is compulsory</strong> for all JAMB candidates. You must select 3 additional subjects 
                relevant to your desired course of study. Check with your preferred institution for specific subject requirements.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};