import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Play, Download, BookOpen, Clock, CheckCircle, ArrowLeft, FileText, Video, Pizza as Quiz, Star, Users, Target } from 'lucide-react';

export const CoursePage: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2]);

  // Mock course data - in production, this would come from an API
  const course = {
    id: id,
    title: 'Mathematics',
    description: 'Master JAMB Mathematics with comprehensive tutorials, practice questions, and expert guidance.',
    instructor: 'Dr. Adebayo Ogundimu',
    duration: '12 hours',
    lessons: 24,
    students: 1247,
    rating: 4.8,
    progress: 35,
    thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  };

  const lessons = [
    { id: 1, title: 'Introduction to Algebra', type: 'video', duration: '15 min', completed: true },
    { id: 2, title: 'Linear Equations', type: 'video', duration: '20 min', completed: true },
    { id: 3, title: 'Quadratic Equations', type: 'video', duration: '25 min', completed: false },
    { id: 4, title: 'Practice Quiz: Algebra Basics', type: 'quiz', duration: '10 min', completed: false },
    { id: 5, title: 'Geometry Fundamentals', type: 'video', duration: '18 min', completed: false },
    { id: 6, title: 'Trigonometry Basics', type: 'video', duration: '22 min', completed: false },
    { id: 7, title: 'Statistics and Probability', type: 'video', duration: '20 min', completed: false },
    { id: 8, title: 'Final Assessment', type: 'quiz', duration: '30 min', completed: false }
  ];

  const materials = [
    { title: 'Mathematics Formula Sheet', type: 'pdf', size: '2.4 MB' },
    { title: 'Past JAMB Questions (2020-2024)', type: 'pdf', size: '5.1 MB' },
    { title: 'Practice Worksheets', type: 'pdf', size: '1.8 MB' },
    { title: 'Quick Reference Guide', type: 'pdf', size: '0.9 MB' }
  ];

  const toggleLessonComplete = (lessonId: number) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'lessons', label: 'Lessons' },
    { id: 'materials', label: 'Materials' },
    { id: 'discussion', label: 'Discussion' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link
            to="/student"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </motion.div>

        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-8 mb-8"
        >
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{course.lessons} lessons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{course.rating}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Course Progress</span>
                  <span className="text-sm text-gray-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                <strong>Instructor:</strong> {course.instructor}
              </p>
            </div>

            <div className="lg:col-span-1">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <button className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center">
                <Play className="h-5 w-5 mr-2" />
                Continue Learning
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Learn</h3>
                  <ul className="space-y-2">
                    {[
                      'Master fundamental algebraic concepts and equations',
                      'Solve complex quadratic and linear equations',
                      'Understand geometry principles and applications',
                      'Apply trigonometric functions and identities',
                      'Analyze statistical data and probability problems',
                      'Practice with real JAMB examination questions'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Requirements</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Basic understanding of arithmetic operations</li>
                    <li>• Access to calculator (scientific calculator recommended)</li>
                    <li>• Notebook for practice problems</li>
                    <li>• Commitment to regular practice</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Lessons Tab */}
            {activeTab === 'lessons' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Lessons</h3>
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleLessonComplete(lesson.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            completedLessons.includes(lesson.id)
                              ? 'bg-emerald-600 border-emerald-600'
                              : 'border-gray-300 hover:border-emerald-600'
                          }`}
                        >
                          {completedLessons.includes(lesson.id) && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </button>
                        <span className="text-sm text-gray-500">#{lesson.id}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {lesson.type === 'video' ? (
                          <Video className="h-5 w-5 text-blue-600" />
                        ) : (
                          <Target className="h-5 w-5 text-emerald-600" />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                          <p className="text-sm text-gray-600">{lesson.duration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {lesson.type === 'quiz' ? (
                        <Link
                          to={`/quiz/${lesson.id}`}
                          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                        >
                          Take Quiz
                        </Link>
                      ) : (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center">
                          <Play className="h-4 w-4 mr-2" />
                          Watch
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Materials Tab */}
            {activeTab === 'materials' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Downloadable Materials</h3>
                {materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-red-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{material.title}</h4>
                        <p className="text-sm text-gray-600">{material.type.toUpperCase()} • {material.size}</p>
                      </div>
                    </div>
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Discussion Tab */}
            {activeTab === 'discussion' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Discussion</h3>
                  <p className="text-gray-600 mb-6">
                    Connect with fellow students, ask questions, and share insights about this course.
                  </p>
                  <Link
                    to="/forum"
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Join Discussion Forum
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};