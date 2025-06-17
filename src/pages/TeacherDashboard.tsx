import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses, Course, CourseMaterial, CourseQuiz } from '../data/courses';
import { 
  BookOpen, 
  Users, 
  DollarSign, 
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Award,
  Clock,
  FileText,
  Video,
  Target,
  Settings,
  BarChart3,
  Upload,
  Download,
  Play,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [assignedCourses, setAssignedCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'video' | 'pdf' | 'quiz'>('video');

  // Filter courses assigned to current teacher
  useEffect(() => {
    const teacherCourses = mockCourses.filter(course => 
      course.assignedTeacher?.email === user?.email
    );
    setAssignedCourses(teacherCourses);
  }, [user]);

  const stats = {
    totalCourses: assignedCourses.length,
    totalStudents: assignedCourses.reduce((sum, course) => sum + course.enrolledStudents, 0),
    totalMaterials: assignedCourses.reduce((sum, course) => sum + course.materials.length, 0),
    totalQuizzes: assignedCourses.reduce((sum, course) => sum + course.quizzes.length, 0),
    avgRating: 4.8
  };

  const enrolledStudents = [
    {
      name: 'Adaora Okafor',
      email: 'adaora@email.com',
      course: 'Advanced Mathematics for JAMB',
      progress: 85,
      lastActive: '2 hours ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      name: 'Chidi Nwankwo',
      email: 'chidi@email.com',
      course: 'Advanced Mathematics for JAMB',
      progress: 72,
      lastActive: 'Yesterday',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      name: 'Funmi Adebayo',
      email: 'funmi@email.com',
      course: 'Advanced Mathematics for JAMB',
      progress: 91,
      lastActive: '3 hours ago',
      avatar: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    }
  ];

  const recentActivity = [
    { action: 'New student enrolled', course: 'Advanced Mathematics for JAMB', time: '2 hours ago' },
    { action: 'Video uploaded', course: 'Advanced Mathematics for JAMB', time: '1 day ago' },
    { action: 'Quiz completed by student', course: 'Advanced Mathematics for JAMB', time: '2 days ago' },
    { action: 'PDF material uploaded', course: 'Advanced Mathematics for JAMB', time: '1 week ago' }
  ];

  const handleUploadMaterial = () => {
    if (!selectedCourse) {
      toast.error('Please select a course first');
      return;
    }

    // Simulate upload
    const newMaterial: CourseMaterial = {
      id: Date.now().toString(),
      title: `New ${uploadType} material`,
      type: uploadType === 'video' ? 'video' : 'pdf',
      url: 'https://example.com/material',
      description: `Uploaded ${uploadType} content`,
      uploadedAt: new Date(),
      uploadedBy: user?.id || 'teacher1',
      size: uploadType === 'pdf' ? '2.4 MB' : undefined
    };

    // Update the course materials
    setAssignedCourses(courses => 
      courses.map(course => 
        course.id === selectedCourse.id 
          ? { ...course, materials: [...course.materials, newMaterial] }
          : course
      )
    );

    setShowUploadModal(false);
    setSelectedCourse(null);
    toast.success(`${uploadType} uploaded successfully!`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'materials', label: 'Course Materials', icon: FileText },
    { id: 'profile', label: 'Profile', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}! 👨‍🏫
              </h1>
              <p className="text-gray-600">
                Manage your assigned courses and track student progress
              </p>
              {assignedCourses.length === 0 && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-orange-800 text-sm">
                    You don't have any assigned courses yet. Please contact the admin to get courses assigned to you.
                  </p>
                </div>
              )}
            </div>
            {assignedCourses.length > 0 && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Upload Content</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { title: 'Assigned Courses', value: stats.totalCourses, icon: BookOpen, color: 'blue', change: 'Active courses' },
            { title: 'Total Students', value: stats.totalStudents, icon: Users, color: 'emerald', change: 'Enrolled students' },
            { title: 'Course Materials', value: stats.totalMaterials, icon: FileText, color: 'purple', change: 'Uploaded content' },
            { title: 'Quizzes Created', value: stats.totalQuizzes, icon: Target, color: 'orange', change: 'Active quizzes' },
            { title: 'Avg Rating', value: stats.avgRating, icon: Award, color: 'yellow', change: '4.8/5.0' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-emerald-600">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-600">{activity.course}</p>
                          </div>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { title: 'Upload Video', icon: Video, color: 'blue', action: () => { setUploadType('video'); setShowUploadModal(true); } },
                        { title: 'Upload PDF', icon: FileText, color: 'emerald', action: () => { setUploadType('pdf'); setShowUploadModal(true); } },
                        { title: 'Create Quiz', icon: Target, color: 'purple', action: () => { setUploadType('quiz'); setShowUploadModal(true); } },
                        { title: 'View Analytics', icon: BarChart3, color: 'orange' }
                      ].map((action, index) => (
                        <button
                          key={index}
                          onClick={action.action}
                          disabled={assignedCourses.length === 0}
                          className={`p-4 bg-${action.color}-50 hover:bg-${action.color}-100 rounded-lg transition-colors text-center disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <action.icon className={`h-6 w-6 text-${action.color}-600 mx-auto mb-2`} />
                          <p className="text-sm font-medium text-gray-900">{action.title}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* My Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">My Assigned Courses</h3>
                  {assignedCourses.length > 0 && (
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Content</span>
                    </button>
                  )}
                </div>

                {assignedCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses Assigned</h3>
                    <p className="text-gray-600 mb-6">
                      You don't have any courses assigned yet. Please contact the admin to get courses assigned to you.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {assignedCourses.map((course) => (
                      <div key={course.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{course.title}</h4>
                            <p className="text-sm text-gray-600">{course.subject}</p>
                            <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              course.isActive 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {course.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{course.enrolledStudents}</p>
                            <p className="text-sm text-gray-600">Students</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{course.materials.length}</p>
                            <p className="text-sm text-gray-600">Materials</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{course.quizzes.length}</p>
                            <p className="text-sm text-gray-600">Quizzes</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-900">
                              {course.updatedAt.toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">Last Updated</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => {
                              setSelectedCourse(course);
                              setShowUploadModal(true);
                            }}
                            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <Upload className="h-4 w-4" />
                            <span>Upload Content</span>
                          </button>
                          <button className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm">
                            <Eye className="h-4 w-4" />
                            <span>View Course</span>
                          </button>
                          <button className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-sm">
                            <BarChart3 className="h-4 w-4" />
                            <span>Analytics</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Enrolled Students</h3>
                {assignedCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Students Yet</h3>
                    <p className="text-gray-600">
                      Once you have assigned courses, enrolled students will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledStudents.map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{student.name}</h4>
                            <p className="text-sm text-gray-600">{student.email}</p>
                            <p className="text-sm text-blue-600">{student.course}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-emerald-600 h-2 rounded-full"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{student.progress}%</span>
                          </div>
                          <p className="text-xs text-gray-500">{student.lastActive}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Course Materials Tab */}
            {activeTab === 'materials' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Course Materials</h3>
                  {assignedCourses.length > 0 && (
                    <button
                      onClick={() => setShowUploadModal(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Material</span>
                    </button>
                  )}
                </div>

                {assignedCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Materials Yet</h3>
                    <p className="text-gray-600">
                      Once you have assigned courses, you can upload materials here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {assignedCourses.map((course) => (
                      <div key={course.id} className="bg-gray-50 rounded-lg p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">{course.title}</h4>
                        
                        {course.materials.length === 0 ? (
                          <div className="text-center py-8">
                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600 mb-4">No materials uploaded yet</p>
                            <button
                              onClick={() => {
                                setSelectedCourse(course);
                                setShowUploadModal(true);
                              }}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Upload First Material
                            </button>
                          </div>
                        ) : (
                          <div className="grid md:grid-cols-2 gap-4">
                            {course.materials.map((material) => (
                              <div key={material.id} className="bg-white p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center space-x-3 mb-3">
                                  {material.type === 'video' ? (
                                    <Video className="h-8 w-8 text-blue-600" />
                                  ) : (
                                    <FileText className="h-8 w-8 text-red-600" />
                                  )}
                                  <div className="flex-1">
                                    <h5 className="font-medium text-gray-900">{material.title}</h5>
                                    <p className="text-sm text-gray-600">{material.description}</p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-500">
                                  <span>{material.uploadedAt.toLocaleDateString()}</span>
                                  {material.size && <span>{material.size}</span>}
                                </div>
                                <div className="flex items-center space-x-2 mt-3">
                                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                                    <Play className="h-4 w-4 inline mr-1" />
                                    {material.type === 'video' ? 'Play' : 'View'}
                                  </button>
                                  <button className="text-red-600 hover:text-red-700 text-sm">
                                    <Trash2 className="h-4 w-4 inline mr-1" />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
                <div className="max-w-2xl">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue={user?.name}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user?.email}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue={user?.phone}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                        <input
                          type="text"
                          defaultValue={user?.qualification}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Area of Expertise</label>
                        <input
                          type="text"
                          defaultValue={user?.expertise}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upload Content Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Course Content</h3>
              
              {assignedCourses.length > 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
                    <select
                      value={selectedCourse?.id || ''}
                      onChange={(e) => {
                        const course = assignedCourses.find(c => c.id === e.target.value);
                        setSelectedCourse(course || null);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a course</option>
                      {assignedCourses.map((course) => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { type: 'video', label: 'Video', icon: Video },
                        { type: 'pdf', label: 'PDF', icon: FileText },
                        { type: 'quiz', label: 'Quiz', icon: Target }
                      ].map((option) => (
                        <button
                          key={option.type}
                          onClick={() => setUploadType(option.type as any)}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            uploadType === option.type
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <option.icon className="h-6 w-6 mx-auto mb-1" />
                          <p className="text-sm font-medium">{option.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {uploadType === 'video' ? 'Video File' : uploadType === 'pdf' ? 'PDF File' : 'Quiz Title'}
                    </label>
                    {uploadType === 'quiz' ? (
                      <input
                        type="text"
                        placeholder="Enter quiz title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <input type="file" className="hidden" accept={uploadType === 'video' ? 'video/*' : '.pdf'} />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedCourse(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadMaterial}
                  disabled={!selectedCourse}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Upload
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};