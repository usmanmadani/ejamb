import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
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
  BarChart3
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalStudents: 1247,
    totalAgents: 89,
    totalRevenue: 6235000,
    pendingWithdrawals: 15,
    activeUsers: 892,
    newSignups: 23
  };

  const recentUsers = [
    { name: 'Adaora Okafor', email: 'adaora@email.com', role: 'student', status: 'paid', joinDate: '2 hours ago' },
    { name: 'Michael Agent', email: 'michael@email.com', role: 'agent', status: 'active', joinDate: 'Yesterday' },
    { name: 'Chidi Student', email: 'chidi@email.com', role: 'student', status: 'pending', joinDate: '2 days ago' },
    { name: 'Sarah Agent', email: 'sarah@email.com', role: 'agent', status: 'active', joinDate: '3 days ago' }
  ];

  const withdrawalRequests = [
    { agent: 'Michael Chen', amount: 15000, referrals: 30, date: '2 hours ago', status: 'pending' },
    { agent: 'Sarah Johnson', amount: 22500, referrals: 45, date: 'Yesterday', status: 'pending' },
    { agent: 'David Wilson', amount: 9500, referrals: 19, date: '2 days ago', status: 'approved' }
  ];

  const handleWithdrawalAction = (index: number, action: 'approve' | 'deny') => {
    // Handle withdrawal approval/denial logic here
    console.log(`${action} withdrawal for index ${index}`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'withdrawals', label: 'Withdrawals', icon: CreditCard },
    { id: 'content', label: 'Content', icon: BookOpen },
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
            Manage users, content, and platform operations
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          {[
            { title: 'Total Students', value: stats.totalStudents.toLocaleString(), icon: Users, color: 'emerald', change: '+12%' },
            { title: 'Total Agents', value: stats.totalAgents, icon: UserCheck, color: 'blue', change: '+8%' },
            { title: 'Revenue', value: `₦${(stats.totalRevenue / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'green', change: '+15%' },
            { title: 'Pending Withdrawals', value: stats.pendingWithdrawals, icon: AlertCircle, color: 'orange', change: '+3' },
            { title: 'Active Users', value: stats.activeUsers, icon: TrendingUp, color: 'purple', change: '+5%' },
            { title: 'New Signups', value: stats.newSignups, icon: Bell, color: 'pink', change: 'Today' }
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
            {/* Overview Tab */}
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
                        { title: 'Upload Content', icon: Upload, color: 'emerald' },
                        { title: 'View Reports', icon: Eye, color: 'blue' },
                        { title: 'Export Data', icon: Download, color: 'purple' },
                        { title: 'Send Notification', icon: Bell, color: 'orange' }
                      ].map((action, index) => (
                        <button
                          key={index}
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

            {/* Users Tab */}
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
                            <button className="text-emerald-600 hover:text-emerald-900 mr-3">View</button>
                            <button className="text-red-600 hover:text-red-900">Suspend</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Content Management</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Upload New Content</h4>
                    <div className="space-y-4">
                      <button className="w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition-colors">
                        <Upload className="h-5 w-5 inline mr-2" />
                        Upload Video Tutorial
                      </button>
                      <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                        <Upload className="h-5 w-5 inline mr-2" />
                        Upload PDF Materials
                      </button>
                      <button className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors">
                        <Upload className="h-5 w-5 inline mr-2" />
                        Add Quiz Questions
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Content Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Videos</span>
                        <span className="font-semibold">247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">PDF Materials</span>
                        <span className="font-semibold">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quiz Questions</span>
                        <span className="font-semibold">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Past Questions</span>
                        <span className="font-semibold">10,000+</span>
                      </div>
                    </div>
                  </div>
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
      </div>
    </div>
  );
};