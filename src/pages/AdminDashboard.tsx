import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { availableSubjects, mockCourses, mockTeachers, Course } from '../data/courses';
import { 
  Users, 
  DollarSign, 
  BookOpen, 
  TrendingUp,
  UserCheck,
  CreditCard,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Upload,
  Settings,
  Bell,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Award,
  Target,
  Clock,
  FileText,
  Video
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState(mockCourses);
  const [teachers, setTeachers] = useState(mockTeachers);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showAssignTeacherModal, setShowAssignTeacherModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    subject: '',
    description: '',
    level: 'beginner',
    duration: '',
    objectives: [''],
    prerequisites: [''],
    targetAudience: '',
    assessmentMethods: [''],
    resources: ['']
  });

  const stats = {
    totalStudents: 1247,
    totalAgents: 89,
    totalRevenue: 6235000,
    pendingWithdrawals: 15,
    activeUsers: 892,
    newSignups: 23,
    totalCourses: courses.length,
    activeCourses: courses.filter(c => c.isActive).length,
    totalTeachers: teachers.length,
    assignedTeachers: teachers.filter(t => t.assignedCourses.length > 0).length
  };

  const recentUsers = [
    { 
      id: 1,
      name: 'Adaora Okafor', 
      email: 'adaora@email.com', 
      role: 'student', 
      status: 'paid', 
      joinDate: '2 hours ago',
      phone: '+234 801 234 5678',
      location: 'Lagos, Nigeria',
      lastActive: '1 hour ago',
      coursesEnrolled: 3,
      totalSpent: 5000
    },
    { 
      id: 2,
      name: 'Michael Agent', 
      email: 'michael@email.com', 
      role: 'agent', 
      status: 'active', 
      joinDate: 'Yesterday',
      phone: '+234 802 345 6789',
      location: 'Abuja, Nigeria',
      lastActive: '30 minutes ago',
      referrals: 15,
      totalEarnings: 7500
    },
    { 
      id: 3,
      name: 'Chidi Student', 
      email: 'chidi@email.com', 
      role: 'student', 
      status: 'pending', 
      joinDate: '2 days ago',
      phone: '+234 803 456 7890',
      location: 'Port Harcourt, Nigeria',
      lastActive: '2 days ago',
      coursesEnrolled: 0,
      totalSpent: 0
    },
    { 
      id: 4,
      name: 'Sarah Agent', 
      email: 'sarah@email.com', 
      role: 'agent', 
      status: 'active', 
      joinDate: '3 days ago',
      phone: '+234 804 567 8901',
      location: 'Kano, Nigeria',
      lastActive: '1 day ago',
      referrals: 22,
      totalEarnings: 11000
    }
  ];

  const withdrawalRequests = [
    { agent: 'Michael Chen', amount: 15000, referrals: 30, date: '2 hours ago', status: 'pending' },
    { agent: 'Sarah Johnson', amount: 22500, referrals: 45, date: 'Yesterday', status: 'pending' },
    { agent: 'David Wilson', amount: 9500, referrals: 19, date: '2 days ago', status: 'approved' }
  ];

  const handleCreateCourse = () => {
    if (!newCourse.title || !newCourse.subject || !newCourse.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const course: Course = {
      id: Date.now().toString(),
      title: newCourse.title,
      subject: newCourse.subject,
      description: newCourse.description,
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      enrolledStudents: 0,
      materials: [],
      quizzes: []
    };

    setCourses([...courses, course]);
    setNewCourse({
      title: '',
      subject: '',
      description: '',
      level: 'beginner',
      duration: '',
      objectives: [''],
      prerequisites: [''],
      targetAudience: '',
      assessmentMethods: [''],
      resources: ['']
    });
    setShowCreateCourseModal(false);
    toast.success('Course created successfully!');
  };

  const handleAssignTeacher = (courseId: string, teacherId: string) => {
    const teacher = teachers.find(t => t.id === teacherId);
    if (!teacher) return;

    // Update course with assigned teacher
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { 
            ...course, 
            assignedTeacher: {
              id: teacher.id,
              name: teacher.name,
              email: teacher.email,
              qualification: teacher.qualification
            },
            isActive: true,
            updatedAt: new Date()
          }
        : course
    ));

    // Update teacher's assigned courses
    setTeachers(teachers.map(t => 
      t.id === teacherId 
        ? { ...t, assignedCourses: [...t.assignedCourses, courseId] }
        : t
    ));

    setShowAssignTeacherModal(false);
    setSelectedCourse(null);
    toast.success('Teacher assigned successfully!');
  };

  const handleToggleCourseStatus = (courseId: string) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, isActive: !course.isActive, updatedAt: new Date() }
        : course
    ));
    toast.success('Course status updated!');
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
    toast.success('Course deleted successfully!');
  };

  const handleWithdrawalAction = (index: number, action: 'approve' | 'deny') => {
    console.log(`${action} withdrawal for index ${index}`);
  };

  const addArrayField = (field: keyof typeof newCourse, value: string = '') => {
    const currentArray = newCourse[field] as string[];
    setNewCourse({
      ...newCourse,
      [field]: [...currentArray, value]
    });
  };

  const updateArrayField = (field: keyof typeof newCourse, index: number, value: string) => {
    const currentArray = newCourse[field] as string[];
    const updatedArray = [...currentArray];
    updatedArray[index] = value;
    setNewCourse({
      ...newCourse,
      [field]: updatedArray
    });
  };

  const removeArrayField = (field: keyof typeof newCourse, index: number) => {
    const currentArray = newCourse[field] as string[];
    setNewCourse({
      ...newCourse,
      [field]: currentArray.filter((_, i) => i !== index)
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'Course Management', icon: BookOpen },
    { id: 'teachers', label: 'Teacher Management', icon: UserCheck },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'withdrawals', label: 'Withdrawals', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard 🛠️
          </h1>
          <p className="text-gray-600">
            Manage courses, teachers, users, and platform operations
          </p>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-6 mb-8">
          {[
            { title: 'Total Students', value: stats.totalStudents.toLocaleString(), icon: Users, color: 'emerald', change: '+12%' },
            { title: 'Total Agents', value: stats.totalAgents, icon: UserCheck, color: 'blue', change: '+8%' },
            { title: 'Revenue', value: `₦${(stats.totalRevenue / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'green', change: '+15%' },
            { title: 'Pending Withdrawals', value: stats.pendingWithdrawals, icon: AlertCircle, color: 'orange', change: '+3' },
            { title: 'Total Courses', value: stats.totalCourses, icon: BookOpen, color: 'purple', change: '+2' },
            { title: 'Active Courses', value: stats.activeCourses, icon: CheckCircle, color: 'emerald', change: '+1' },
            { title: 'Total Teachers', value: stats.totalTeachers, icon: UserPlus, color: 'blue', change: '+1' },
            { title: 'Assigned Teachers', value: stats.assignedTeachers, icon: UserCheck, color: 'green', change: '+1' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
                <span className="text-xs text-emerald-600 font-medium">{stat.change}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
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
                      ? 'border-emerald-500 text-emerald-600'
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
            {/* Course Management Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Course Management</h3>
                  <button
                    onClick={() => setShowCreateCourseModal(true)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Course</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {courses.map((course) => (
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
                            {course.assignedTeacher ? course.assignedTeacher.name : 'Unassigned'}
                          </p>
                          <p className="text-sm text-gray-600">Teacher</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => {
                            setSelectedCourse(course);
                            setShowAssignTeacherModal(true);
                          }}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <UserPlus className="h-4 w-4" />
                          <span>{course.assignedTeacher ? 'Reassign' : 'Assign'} Teacher</span>
                        </button>
                        <button 
                          onClick={() => handleToggleCourseStatus(course.id)}
                          className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>{course.isActive ? 'Deactivate' : 'Activate'}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 text-sm">
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteCourse(course.id)}
                          className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teacher Management Tab */}
            {activeTab === 'teachers' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Teacher Management</h3>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search teachers..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {teachers.map((teacher) => (
                    <div key={teacher.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserCheck className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{teacher.name}</h4>
                            <p className="text-sm text-gray-600">{teacher.email}</p>
                            <p className="text-sm text-blue-600">{teacher.qualification}</p>
                            <p className="text-sm text-gray-500">Expertise: {teacher.expertise}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              teacher.isVerified 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {teacher.isVerified ? 'Verified' : 'Pending'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {teacher.assignedCourses.length} course(s) assigned
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">View Courses</button>
                            <button className="text-emerald-600 hover:text-emerald-700 text-sm">Assign Course</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                  <div className="flex space-x-3">
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                      Export Users
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Filter
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentUsers.map((user, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                                <Users className="h-4 w-4 text-emerald-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="capitalize text-sm text-gray-900">{user.role}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                              user.status === 'active' ? 'bg-blue-100 text-blue-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.joinDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => {
                                setSelectedUser(user);
                                setShowUserDetailsModal(true);
                              }}
                              className="text-emerald-600 hover:text-emerald-900 mr-3"
                            >
                              View Details
                            </button>
                            <button className="text-red-600 hover:text-red-900">Suspend</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Other existing tabs remain the same */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent Users */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Users</h3>
                    <div className="space-y-3">
                      {recentUsers.map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                              <Users className="h-4 w-4 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                              <p className="text-xs text-gray-600">{user.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                              user.status === 'active' ? 'bg-blue-100 text-blue-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {user.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">{user.joinDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { title: 'Create Course', icon: Plus, color: 'emerald', action: () => setShowCreateCourseModal(true) },
                        { title: 'View Reports', icon: Eye, color: 'blue' },
                        { title: 'Export Data', icon: Download, color: 'purple' },
                        { title: 'Send Notification', icon: Bell, color: 'orange' }
                      ].map((action, index) => (
                        <button
                          key={index}
                          onClick={action.action}
                          className={`p-4 bg-${action.color}-50 hover:bg-${action.color}-100 rounded-lg transition-colors text-center`}
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

            {/* Withdrawals Tab */}
            {activeTab === 'withdrawals' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Withdrawal Requests</h3>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {withdrawalRequests.filter(w => w.status === 'pending').length} Pending
                  </span>
                </div>

                <div className="space-y-4">
                  {withdrawalRequests.map((request, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{request.agent}</h4>
                            <p className="text-sm text-gray-600">{request.referrals} confirmed referrals</p>
                            <p className="text-xs text-gray-500">{request.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">₦{request.amount.toLocaleString()}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            {request.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => handleWithdrawalAction(index, 'approve')}
                                  className="bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700 transition-colors"
                                >
                                  <CheckCircle className="h-4 w-4 inline mr-1" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleWithdrawalAction(index, 'deny')}
                                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                >
                                  <XCircle className="h-4 w-4 inline mr-1" />
                                  Deny
                                </button>
                              </>
                            ) : (
                              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                                Approved
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Settings</h3>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Payment Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student Registration Fee
                        </label>
                        <input
                          type="number"
                          defaultValue="5000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Referral Commission
                        </label>
                        <input
                          type="number"
                          defaultValue="500"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Withdrawals Required
                        </label>
                        <input
                          type="number"
                          defaultValue="10"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">AI Assistant Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          AI Model
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                          <option>Gemini Pro</option>
                          <option>GPT-4</option>
                          <option>Claude</option>
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" defaultChecked />
                          <span className="text-sm text-gray-700">Enable voice input</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Create Course Modal */}
        {showCreateCourseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Create New Course</h3>
                <p className="text-gray-600 mt-1">Fill in the details to create a comprehensive course</p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
                    <input
                      type="text"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g., Advanced Mathematics for JAMB"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <select
                      value={newCourse.subject}
                      onChange={(e) => setNewCourse({ ...newCourse, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select Subject</option>
                      {availableSubjects.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Description *</label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Describe the course content and objectives..."
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                    <select
                      value={newCourse.level}
                      onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g., 8 weeks"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <input
                      type="text"
                      value={newCourse.targetAudience}
                      onChange={(e) => setNewCourse({ ...newCourse, targetAudience: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g., JAMB candidates"
                    />
                  </div>
                </div>

                {/* Learning Objectives */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
                  {newCourse.objectives.map((objective, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => updateArrayField('objectives', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter learning objective"
                      />
                      {newCourse.objectives.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('objectives', index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('objectives')}
                    className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Objective
                  </button>
                </div>

                {/* Prerequisites */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prerequisites</label>
                  {newCourse.prerequisites.map((prerequisite, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={prerequisite}
                        onChange={(e) => updateArrayField('prerequisites', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter prerequisite"
                      />
                      {newCourse.prerequisites.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('prerequisites', index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('prerequisites')}
                    className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Prerequisite
                  </button>
                </div>

                {/* Assessment Methods */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Methods</label>
                  {newCourse.assessmentMethods.map((method, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={method}
                        onChange={(e) => updateArrayField('assessmentMethods', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="e.g., Quizzes, Assignments, Final Exam"
                      />
                      {newCourse.assessmentMethods.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayField('assessmentMethods', index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayField('assessmentMethods')}
                    className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Assessment Method
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCreateCourseModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCourse}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Create Course
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* User Details Modal */}
        {showUserDetailsModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h4>
                    <p className="text-gray-600">{selectedUser.email}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                      selectedUser.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                      selectedUser.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{selectedUser.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Join Date</p>
                        <p className="font-medium">{selectedUser.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Last Active</p>
                        <p className="font-medium">{selectedUser.lastActive}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedUser.role === 'student' && (
                      <>
                        <div className="flex items-center space-x-3">
                          <BookOpen className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Courses Enrolled</p>
                            <p className="font-medium">{selectedUser.coursesEnrolled}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Total Spent</p>
                            <p className="font-medium">₦{selectedUser.totalSpent?.toLocaleString()}</p>
                          </div>
                        </div>
                      </>
                    )}
                    {selectedUser.role === 'agent' && (
                      <>
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Referrals</p>
                            <p className="font-medium">{selectedUser.referrals}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Award className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-600">Total Earnings</p>
                            <p className="font-medium">₦{selectedUser.totalEarnings?.toLocaleString()}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                      Send Message
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                      View Activity
                    </button>
                    <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                      Suspend
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowUserDetailsModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/*  Assign Teacher Modal remains the same */}
        {showAssignTeacherModal && selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Assign Teacher to {selectedCourse.title}
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {teachers.filter(t => t.isVerified).map((teacher) => (
                  <div
                    key={teacher.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleAssignTeacher(selectedCourse.id, teacher.id)}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{teacher.name}</p>
                      <p className="text-sm text-gray-600">{teacher.qualification}</p>
                      <p className="text-sm text-blue-600">Expertise: {teacher.expertise}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {teacher.assignedCourses.length} courses
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAssignTeacherModal(false);
                    setSelectedCourse(null);
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};