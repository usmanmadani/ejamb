import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
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
  BarChart3
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalCourses: 8,
    totalStudents: 156,
    totalEarnings: 78000,
    avgRating: 4.8
  };

  const myCourses = [
    {
      id: 1,
      title: 'Advanced Physics for JAMB',
      subject: 'Physics',
      students: 45,
      rating: 4.9,
      earnings: 22500,
      status: 'active',
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'Mechanics and Motion',
      subject: 'Physics',
      students: 32,
      rating: 4.7,
      earnings: 16000,
      status: 'active',
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      title: 'Electricity and Magnetism',
      subject: 'Physics',
      students: 28,
      rating: 4.8,
      earnings: 14000,
      status: 'draft',
      lastUpdated: '3 days ago'
    }
  ];

  const enrolledStudents = [
    {
      name: 'Adaora Okafor',
      email: 'adaora@email.com',
      course: 'Advanced Physics for JAMB',
      progress: 85,
      lastActive: '2 hours ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      name: 'Chidi Nwankwo',
      email: 'chidi@email.com',
      course: 'Mechanics and Motion',
      progress: 72,
      lastActive: 'Yesterday',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    },
    {
      name: 'Funmi Adebayo',
      email: 'funmi@email.com',
      course: 'Advanced Physics for JAMB',
      progress: 91,
      lastActive: '3 hours ago',
      avatar: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'
    }
  ];

  const recentActivity = [
    { action: 'New student enrolled', course: 'Advanced Physics for JAMB', time: '2 hours ago' },
    { action: 'Course material updated', course: 'Mechanics and Motion', time: '1 day ago' },
    { action: 'Quiz completed by student', course: 'Advanced Physics for JAMB', time: '2 days ago' },
    { action: 'New course published', course: 'Electricity and Magnetism', time: '1 week ago' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
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
                Manage your courses and track student progress
              </p>
            </div>
            <Link
              to="/create-course"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Course</span>
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Courses', value: stats.totalCourses, icon: BookOpen, color: 'blue', change: '+2 this month' },
            { title: 'Total Students', value: stats.totalStudents, icon: Users, color: 'emerald', change: '+23 this week' },
            { title: 'Total Earnings', value: `₦${stats.totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'green', change: '+15% this month' },
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
                        { title: 'Create Course', icon: Plus, color: 'blue', href: '/create-course' },
                        { title: 'View Students', icon: Users, color: 'emerald' },
                        { title: 'Upload Content', icon: FileText, color: 'purple' },
                        { title: 'Analytics', icon: BarChart3, color: 'orange' }
                      ].map((action, index) => (
                        <Link
                          key={index}
                          to={action.href || '#'}
                          className={`p-4 bg-${action.color}-50 hover:bg-${action.color}-100 rounded-lg transition-colors text-center`}
                        >
                          <action.icon className={`h-6 w-6 text-${action.color}-600 mx-auto mb-2`} />
                          <p className="text-sm font-medium text-gray-900">{action.title}</p>
                        </Link>
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
                  <h3 className="text-lg font-semibold text-gray-900">My Courses</h3>
                  <Link
                    to="/create-course"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Course</span>
                  </Link>
                </div>

                <div className="grid gap-6">
                  {myCourses.map((course) => (
                    <div key={course.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{course.title}</h4>
                          <p className="text-sm text-gray-600">{course.subject}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.status === 'active' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {course.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{course.students}</p>
                          <p className="text-sm text-gray-600">Students</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{course.rating}</p>
                          <p className="text-sm text-gray-600">Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">₦{course.earnings.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">Earnings</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-900">{course.lastUpdated}</p>
                          <p className="text-sm text-gray-600">Last Updated</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm">
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        <button className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm">
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Enrolled Students</h3>
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
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings Overview</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl p-6 text-white">
                    <h4 className="text-lg font-semibold mb-2">Total Earnings</h4>
                    <p className="text-3xl font-bold mb-2">₦{stats.totalEarnings.toLocaleString()}</p>
                    <p className="text-emerald-100">+15% from last month</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Earnings by Course</h4>
                    <div className="space-y-3">
                      {myCourses.map((course) => (
                        <div key={course.id} className="flex justify-between">
                          <span className="text-gray-600">{course.title}</span>
                          <span className="font-medium">₦{course.earnings.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
      </div>
    </div>
  );
};