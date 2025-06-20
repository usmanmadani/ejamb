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
  Sparkles,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
  topics: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  color: string;
  syllabus: {
    overview: string;
    objectives: string[];
    detailedTopics: {
      title: string;
      subtopics: string[];
    }[];
    examFormat: string;
    timeAllocation: string;
    markingScheme: string;
  };
}

export const SyllabusPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState<number[]>([]);
  const navigate = useNavigate();

  const subjects: Subject[] = [
    {
      id: 'english-language',
      name: 'English Language',
      category: 'compulsory',
      description: 'Comprehensive English language skills including grammar, comprehension, and essay writing.',
      topics: ['Grammar', 'Comprehension', 'Essay Writing', 'Oral English', 'Literature'],
      difficulty: 'Medium',
      color: 'red',
      syllabus: {
        overview: 'The English Language syllabus is designed to test candidates\' ability to communicate effectively in English, both in written and oral forms.',
        objectives: [
          'Communicate effectively, correctly and appropriately in written and oral English',
          'Use English to think and learn',
          'Acquire and develop listening, speaking, reading and writing skills',
          'Use English for aesthetic and creative expression'
        ],
        detailedTopics: [
          {
            title: 'Comprehension/Summary',
            subtopics: [
              'Comprehension of literary and non-literary passages',
              'Identification of main ideas and supporting details',
              'Summary writing techniques',
              'Inference and deduction skills'
            ]
          },
          {
            title: 'Lexis and Structure',
            subtopics: [
              'Synonyms and antonyms',
              'Word formation processes',
              'Sentence types and patterns',
              'Punctuation and spelling',
              'Figures of speech'
            ]
          },
          {
            title: 'Oral Forms',
            subtopics: [
              'Vowels and consonants',
              'Word stress and sentence stress',
              'Intonation patterns',
              'Rhyme and rhythm'
            ]
          },
          {
            title: 'Essay Writing',
            subtopics: [
              'Narrative essays',
              'Descriptive essays',
              'Expository essays',
              'Argumentative essays',
              'Letter writing (formal and informal)'
            ]
          }
        ],
        examFormat: 'The examination consists of objective and essay questions',
        timeAllocation: '3 hours (1 hour for objectives, 2 hours for essay)',
        markingScheme: 'Objective: 60 marks, Essay: 40 marks, Total: 100 marks'
      }
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      category: 'science',
      description: 'Advanced mathematics covering algebra, geometry, trigonometry, and calculus.',
      topics: ['Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Statistics'],
      difficulty: 'Hard',
      color: 'blue',
      syllabus: {
        overview: 'The Mathematics syllabus is designed to test candidates\' achievement of the course objectives which are to acquire mathematical concepts and principles.',
        objectives: [
          'Acquire computational and manipulative skills',
          'Develop precise, logical and formal reasoning',
          'Develop deductive reasoning from given premises',
          'Interpret, transform and make predictions from given data'
        ],
        detailedTopics: [
          {
            title: 'Number and Numeration',
            subtopics: [
              'Number bases',
              'Fractions, decimals and percentages',
              'Ratio, proportion and rate',
              'Indices and logarithms',
              'Sequence and series'
            ]
          },
          {
            title: 'Algebraic Processes',
            subtopics: [
              'Simple equations and inequalities',
              'Simultaneous equations',
              'Quadratic equations',
              'Variation',
              'Graphs of linear and quadratic functions'
            ]
          },
          {
            title: 'Geometry and Trigonometry',
            subtopics: [
              'Euclidean geometry',
              'Coordinate geometry',
              'Mensuration',
              'Trigonometric ratios',
              'Sine and cosine rules'
            ]
          },
          {
            title: 'Calculus',
            subtopics: [
              'Differentiation',
              'Application of differentiation',
              'Integration',
              'Application of integration'
            ]
          },
          {
            title: 'Statistics',
            subtopics: [
              'Representation of data',
              'Measures of central tendency',
              'Measures of dispersion',
              'Probability',
              'Permutation and combination'
            ]
          }
        ],
        examFormat: 'Objective questions only',
        timeAllocation: '2 hours',
        markingScheme: '50 questions, 2 marks each, Total: 100 marks'
      }
    },
    {
      id: 'physics',
      name: 'Physics',
      category: 'science',
      description: 'Fundamental physics concepts including mechanics, electricity, and modern physics.',
      topics: ['Mechanics', 'Heat', 'Light', 'Sound', 'Electricity', 'Modern Physics'],
      difficulty: 'Hard',
      color: 'purple',
      syllabus: {
        overview: 'The Physics syllabus is designed to test candidates\' achievement in physics concepts and their applications.',
        objectives: [
          'Show understanding of physical principles and concepts',
          'Apply physical principles to solve problems',
          'Demonstrate skills in handling apparatus and making measurements',
          'Demonstrate knowledge of technological applications of physics'
        ],
        detailedTopics: [
          {
            title: 'Mechanics',
            subtopics: [
              'Space and time',
              'Kinematics',
              'Dynamics',
              'Statics',
              'Circular motion',
              'Work, energy and power',
              'Impulse and momentum'
            ]
          },
          {
            title: 'Heat',
            subtopics: [
              'Temperature and its measurement',
              'Thermal expansion',
              'Heat capacity',
              'Latent heat',
              'Vapour pressure',
              'Humidity',
              'Heat transfer'
            ]
          },
          {
            title: 'Waves',
            subtopics: [
              'Wave motion',
              'Sound waves',
              'Light waves',
              'Electromagnetic spectrum',
              'Reflection and refraction',
              'Interference and diffraction'
            ]
          },
          {
            title: 'Electricity and Magnetism',
            subtopics: [
              'Electrostatics',
              'Current electricity',
              'Electrical measuring instruments',
              'Magnetic field',
              'Electromagnetic induction',
              'Alternating current'
            ]
          },
          {
            title: 'Modern Physics',
            subtopics: [
              'Atomic structure',
              'Radioactivity',
              'Nuclear reactions',
              'Quantum physics',
              'Electronics'
            ]
          }
        ],
        examFormat: 'Objective questions only',
        timeAllocation: '2 hours',
        markingScheme: '50 questions, 2 marks each, Total: 100 marks'
      }
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      category: 'science',
      description: 'Comprehensive chemistry covering organic, inorganic, and physical chemistry.',
      topics: ['Atomic Structure', 'Chemical Bonding', 'Acids and Bases', 'Organic Chemistry', 'Electrochemistry'],
      difficulty: 'Hard',
      color: 'green',
      syllabus: {
        overview: 'The Chemistry syllabus is designed to test candidates\' achievement of the course objectives in chemistry.',
        objectives: [
          'Show understanding of chemical principles and concepts',
          'Apply chemical principles to solve problems',
          'Demonstrate skills in chemical calculations',
          'Show understanding of the role of chemistry in industry and everyday life'
        ],
        detailedTopics: [
          {
            title: 'Atomic Structure and Bonding',
            subtopics: [
              'Atomic structure',
              'Electronic configuration',
              'Periodic table',
              'Chemical bonding',
              'Shapes of molecules'
            ]
          },
          {
            title: 'Chemical Reactions',
            subtopics: [
              'Types of chemical reactions',
              'Acids, bases and salts',
              'Oxidation and reduction',
              'Electrolysis',
              'Energy changes'
            ]
          },
          {
            title: 'Organic Chemistry',
            subtopics: [
              'Hydrocarbons',
              'Alcohols and ethers',
              'Organic acids',
              'Esters',
              'Proteins and carbohydrates'
            ]
          },
          {
            title: 'Chemical Equilibrium',
            subtopics: [
              'Reversible reactions',
              'Equilibrium constant',
              'Le Chatelier\'s principle',
              'Ionic equilibrium',
              'Solubility product'
            ]
          },
          {
            title: 'Reaction Kinetics',
            subtopics: [
              'Rate of reaction',
              'Factors affecting reaction rate',
              'Collision theory',
              'Catalysis',
              'Activation energy'
            ]
          }
        ],
        examFormat: 'Objective questions only',
        timeAllocation: '2 hours',
        markingScheme: '50 questions, 2 marks each, Total: 100 marks'
      }
    },
    {
      id: 'biology',
      name: 'Biology',
      category: 'science',
      description: 'Life sciences including botany, zoology, ecology, and human biology.',
      topics: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Human Biology'],
      difficulty: 'Medium',
      color: 'emerald',
      syllabus: {
        overview: 'The Biology syllabus is designed to test candidates\' achievement of the course objectives in biological sciences.',
        objectives: [
          'Show understanding of biological principles and concepts',
          'Apply biological principles to solve problems',
          'Demonstrate skills in biological techniques',
          'Show understanding of the role of biology in everyday life'
        ],
        detailedTopics: [
          {
            title: 'Cell Biology',
            subtopics: [
              'Cell structure and organization',
              'Cell division',
              'Cellular respiration',
              'Photosynthesis',
              'Transport across membranes'
            ]
          },
          {
            title: 'Genetics',
            subtopics: [
              'Heredity',
              'Chromosomes and genes',
              'Mendelian genetics',
              'Sex linkage',
              'Mutation and variation'
            ]
          },
          {
            title: 'Evolution',
            subtopics: [
              'Theories of evolution',
              'Evidence for evolution',
              'Natural selection',
              'Adaptation',
              'Speciation'
            ]
          },
          {
            title: 'Ecology',
            subtopics: [
              'Ecosystem',
              'Food chains and webs',
              'Population dynamics',
              'Environmental factors',
              'Conservation'
            ]
          },
          {
            title: 'Human Biology',
            subtopics: [
              'Nutrition',
              'Transport systems',
              'Respiratory system',
              'Excretory system',
              'Nervous system',
              'Reproductive system'
            ]
          }
        ],
        examFormat: 'Objective questions only',
        timeAllocation: '2 hours',
        markingScheme: '50 questions, 2 marks each, Total: 100 marks'
      }
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

  const handleLearnMore = (subject: Subject) => {
    setSelectedSubject(subject);
    setShowModal(true);
    setExpandedTopics([]);
  };

  const toggleTopic = (index: number) => {
    setExpandedTopics(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleDownload = (subject: Subject) => {
    toast.success(`Downloading ${subject.name} syllabus PDF...`);
    // Simulate download, or implement real download logic here
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
          <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
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
                className="text-2xl md:text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                JAMB Syllabus 📚
              </motion.h1>
              
              <motion.p 
                className="text-emerald-100 text-base md:text-lg"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {[
            { title: 'Total Subjects', value: subjects.length, icon: BookOpen, color: 'blue' },
            { title: 'Topics Covered', value: subjects.reduce((sum, s) => sum + s.topics.length, 0), icon: Target, color: 'emerald' },
            { title: 'Study Hours', value: '500+', icon: Clock, color: 'purple' },
            { title: 'Success Rate', value: '95%', icon: Award, color: 'orange' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 group"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">{stat.title}</p>
                  <motion.p 
                    className="text-xl md:text-2xl font-bold text-gray-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.6, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div 
                  className={`p-2 md:p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: 5 }}
                >
                  <stat.icon className="h-4 w-4 md:h-6 md:w-6" />
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
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6 mb-8 border border-white/20"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm text-sm md:text-base"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-xl px-3 md:px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-sm text-sm md:text-base"
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
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 md:gap-6"
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
              <div className="p-4 md:p-6">
                <div className="flex items-start justify-between mb-4">
                  <motion.div 
                    className={`p-2 md:p-3 rounded-xl bg-${subject.color}-100 text-${subject.color}-600 group-hover:scale-110 transition-transform`}
                    whileHover={{ rotate: 5 }}
                  >
                    <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
                  </motion.div>
                  <motion.span 
                    className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(subject.difficulty)}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {subject.difficulty}
                  </motion.span>
                </div>
                
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
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
                      <span>{subject.topics.length} topics</span>
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
                    className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-${subject.color}-100 text-${subject.color}-800`}
                    whileHover={{ scale: 1.05 }}
                  >
                    JAMB Syllabus
                  </motion.span>
                  
                  <div className="flex items-center space-x-2">
                    <motion.button
                      className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setShowModal(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      className="text-emerald-600 hover:text-emerald-700 p-2 rounded-lg hover:bg-emerald-50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(subject)}
                    >
                      <Download className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
                
                <motion.div 
                  className="mt-4 pt-4 border-t border-gray-200"
                  whileHover={{ x: 3 }}
                >
                  <button 
                    onClick={() => handleLearnMore(subject)}
                    className="w-full text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center space-x-2 py-2 rounded-lg hover:bg-blue-50 transition-colors group text-sm md:text-base"
                  >
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
          className="mt-12 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-4 md:p-6 border border-blue-200"
        >
          <div className="flex items-start space-x-4">
            <motion.div
              className="p-2 bg-blue-100 rounded-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
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

      {/* Subject Detail Modal */}
      {showModal && selectedSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">{selectedSubject.name}</h2>
                  <p className="text-gray-600 text-sm md:text-base">JAMB Syllabus Details</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-4 md:p-6">
              {/* Overview */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">{selectedSubject.syllabus.overview}</p>
              </div>

              {/* Objectives */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Course Objectives</h3>
                <ul className="space-y-2">
                  {selectedSubject.syllabus.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm md:text-base">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detailed Topics */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Detailed Topics</h3>
                <div className="space-y-3">
                  {selectedSubject.syllabus.detailedTopics.map((topic, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleTopic(index)}
                        className="w-full flex items-center justify-between p-3 md:p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <h4 className="font-medium text-gray-900 text-sm md:text-base">{topic.title}</h4>
                        {expandedTopics.includes(index) ? (
                          <ChevronUp className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedTopics.includes(index) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="px-3 md:px-4 pb-3 md:pb-4"
                        >
                          <ul className="space-y-1">
                            {topic.subtopics.map((subtopic, subIndex) => (
                              <li key={subIndex} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600 text-sm">{subtopic}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Exam Information */}
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2 text-sm md:text-base">Exam Format</h4>
                  <p className="text-blue-800 text-sm">{selectedSubject.syllabus.examFormat}</p>
                </div>
                <div className="bg-emerald-50 p-3 md:p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-900 mb-2 text-sm md:text-base">Time Allocation</h4>
                  <p className="text-emerald-800 text-sm">{selectedSubject.syllabus.timeAllocation}</p>
                </div>
                <div className="bg-purple-50 p-3 md:p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2 text-sm md:text-base">Marking Scheme</h4>
                  <p className="text-purple-800 text-sm">{selectedSubject.syllabus.markingScheme}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  onClick={() => toast.success(`Downloading ${selectedSubject.name} syllabus PDF...`)}
                >
                  <Download className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-sm md:text-base">Download PDF</span>
                </button>
                <button
                  className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                  onClick={() => navigate('/courses')}
                >
                  <BookOpen className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="text-sm md:text-base">Start Learning</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};