import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { 
  BookOpen, 
  Search, 
  Filter,
  Download,
  Eye,
  Star,
  CheckCircle,
  ArrowRight,
  FileText,
  Target,
  Award,
  Users,
  Clock,
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

interface Subject {
  id: string;
  name: string;
  category: string;
  description: string;
  topics: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  color: string;
}

export const SyllabusPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const subjects: Subject[] = [
    {
      id: 'english-language',
      name: 'English Language',
      category: 'compulsory',
      description: 'Comprehensive English language skills including grammar, comprehension, and essay writing.',
      topics: 15,
      difficulty: 'Medium',
      color: 'red'
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      category: 'science',
      description: 'Advanced mathematics covering algebra, geometry, trigonometry, and calculus.',
      topics: 20,
      difficulty: 'Hard',
      color: 'blue'
    },
    {
      id: 'physics',
      name: 'Physics',
      category: 'science',
      description: 'Fundamental physics concepts including mechanics, electricity, and modern physics.',
      topics: 18,
      difficulty: 'Hard',
      color: 'purple'
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      category: 'science',
      description: 'Comprehensive chemistry covering organic, inorganic, and physical chemistry.',
      topics: 16,
      difficulty: 'Hard',
      color: 'green'
    },
    {
      id: 'biology',
      name: 'Biology',
      category: 'science',
      description: 'Life sciences including botany, zoology, ecology, and human biology.',
      topics: 22,
      difficulty: 'Medium',
      color: 'emerald'
    },
    {
      id: 'agricultural-science',
      name: 'Agricultural Science',
      category: 'vocational',
      description: 'Farming techniques, crop production, and animal husbandry.',
      topics: 14,
      difficulty: 'Medium',
      color: 'yellow'
    },
    {
      id: 'government',
      name: 'Government',
      category: 'social-science',
      description: 'Political systems, governance, and civic responsibilities.',
      topics: 12,
      difficulty: 'Medium',
      color: 'indigo'
    },
    {
      id: 'geography',
      name: 'Geography',
      category: 'social-science',
      description: 'Physical and human geography, climate, and environmental studies.',
      topics: 16,
      difficulty: 'Medium',
      color: 'teal'
    },
    {
      id: 'literature-in-english',
      name: 'Literature in English',
      category: 'arts',
      description: 'Literary analysis, poetry, prose, and drama studies.',
      topics: 10,
      difficulty: 'Medium',
      color: 'pink'
    },
    {
      id: 'history',
      name: 'History',
      category: 'social-science',
      description: 'World history, African history, and historical analysis.',
      topics: 14,
      difficulty: 'Medium',
      color: 'orange'
    },
    {
      id: 'islamic-studies',
      name: 'Islamic Studies',
      category: 'religious',
      description: 'Islamic theology, Quranic studies, and Islamic history.',
      topics: 12,
      difficulty: 'Medium',
      color: 'cyan'
    },
    {
      id: 'arabic',
      name: 'Arabic',
      category: 'languages',
      description: 'Arabic language skills and Islamic literature.',
      topics: 10,
      difficulty: 'Hard',
      color: 'amber'
    },
    {
      id: 'economics',
      name: 'Economics',
      category: 'social-science',
      description: 'Economic principles, market systems, and financial literacy.',
      topics: 15,
      difficulty: 'Medium',
      color: 'lime'
    },
    {
      id: 'home-economics',
      name: 'Home Economics',
      category: 'vocational',
      description: 'Household management, nutrition, and family studies.',
      topics: 12,
      difficulty: 'Easy',
      color: 'rose'
    },
    {
      id: 'commerce',
      name: 'Commerce',
      category: 'social-science',
      description: 'Business studies, trade, and commercial activities.',
      topics: 13,
      difficulty: 'Medium',
      color: 'violet'
    },
    {
      id: 'christian-religious-studies',
      name: 'Christian Religious Studies',
      category: 'religious',
      description: 'Christian theology, biblical studies, and church history.',
      topics: 11,
      difficulty: 'Medium',
      color: 'sky'
    },
    {
      id: 'hausa',
      name: 'Hausa',
      category: 'languages',
      description: 'Hausa language and cultural studies.',
      topics: 8,
      difficulty: 'Medium',
      color: 'stone'
    },
    {
      id: 'igbo',
      name: 'Igbo',
      category: 'languages',
      description: 'Igbo language and cultural heritage.',
      topics: 8,
      difficulty: 'Medium',
      color: 'zinc'
    },
    {
      id: 'yoruba',
      name: 'Yoruba',
      category: 'languages',
      description: 'Yoruba language and cultural traditions.',
      topics: 8,
      difficulty: 'Medium',
      color: 'neutral'
    },
    {
      id: 'french',
      name: 'French',
      category: 'languages',
      description: 'French language and francophone culture.',
      topics: 10,
      difficulty: 'Hard',
      color: 'slate'
    },
    {
      id: 'principles-of-account',
      name: 'Principles of Account',
      category: 'social-science',
      description: 'Basic accounting principles and financial management.',
      topics: 14,
      difficulty: 'Medium',
      color: 'gray'
    },
    {
      id: 'fine-arts',
      name: 'Fine Arts',
      category: 'arts',
      description: 'Visual arts, drawing, painting, and art history.',
      topics: 9,
      difficulty: 'Medium',
      color: 'fuchsia'
    },
    {
      id: 'music',
      name: 'Music',
      category: 'arts',
      description: 'Music theory, composition, and performance studies.',
      topics: 8,
      difficulty: 'Medium',
      color: 'emerald'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Subjects', count: subjects.length },
    { id: 'compulsory', name: 'Compulsory', count: subjects.filter(s => s.category === 'compulsory').length },
    { id: 'science', name: 'Sciences', count: subjects.filter(s => s.category === 'science').length },
    { id: 'social-science', name: 'Social Sciences', count: subjects.filter(s => s.category === 'social-science').length },
    { id: 'arts', name: 'Arts', count: subjects.filter(s => s.category === 'arts').length },
    { id: 'languages', name: 'Languages', count: subjects.filter(s => s.category === 'languages').length },
    { id: 'vocational', name: 'Vocational', count: subjects.filter(s => s.category === 'vocational').length },
    { id: 'religious', name: 'Religious Studies', count: subjects.filter(s => s.category === 'religious').length }
  ];

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subject.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || subject.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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
                <Sparkles className="h-6 w-6" />
                <span className="text-emerald-100">Discover JAMB Syllabus For Free</span>
              </motion.div>
              
              <motion.h1 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                JAMB Syllabus 📚
              </motion.h1>
              
              <motion.p 
                className="text-emerald-100 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Elevate your learning with dynamic classes and interactive tools made just for JAMB candidates.
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
            { title: 'Total Subjects', value: subjects.length, icon: BookOpen, color: 'blue' },
            { title: 'Topics Covered', value: subjects.reduce((sum, s) => sum + s.topics, 0), icon: Target, color: 'emerald' },
            { title: 'Study Hours', value: '500+', icon: Clock, color: 'purple' },
            { title: 'Success Rate', value: '95%', icon: Award, color: 'orange' }
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
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subjects Grid */}
        <motion.div 
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredSubjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              variants={scaleIn}
              className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <motion.div 
                    className={`p-3 rounded-xl bg-${subject.color}-100 text-${subject.color}-600 group-hover:scale-110 transition-transform`}
                    whileHover={{ rotate: 5 }}
                  >
                    <BookOpen className="h-6 w-6" />
                  </motion.div>
                  <motion.span 
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subject.difficulty)}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {subject.difficulty}
                  </motion.span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {subject.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {subject.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <motion.div 
                      className="flex items-center space-x-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Target className="h-4 w-4" />
                      <span>{subject.topics} topics</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FileText className="h-4 w-4" />
                      <span>PDF</span>
                    </motion.div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <motion.span 
                    className={`px-3 py-1 rounded-full text-xs font-medium bg-${subject.color}-100 text-${subject.color}-800`}
                    whileHover={{ scale: 1.05 }}
                  >
                    JAMB Syllabus for {subject.name}
                  </motion.span>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      className="text-emerald-600 hover:text-emerald-700 p-2 rounded-lg hover:bg-emerald-50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
                
                <motion.div 
                  className="mt-4 pt-4 border-t border-gray-200"
                  whileHover={{ x: 3 }}
                >
                  <button className="w-full text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center space-x-2 py-2 rounded-lg hover:bg-blue-50 transition-colors group">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
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
                relevant to your desired course of study. Download the complete syllabus for each subject to understand 
                the topics and prepare effectively for your JAMB examination.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};