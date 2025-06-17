import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Award,
  Copy,
  Mail,
  CheckCircle,
  Clock,
  Target,
  Gift,
  CreditCard,
  UserPlus
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AgentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [withdrawalRequested, setWithdrawalRequested] = useState(false);

  const stats = {
    totalReferrals: 23,
    pendingReferrals: 3,
    totalEarnings: 11500,
    availableForWithdrawal: 10000,
    thisMonthReferrals: 8
  };

  const recentReferrals = [
    { name: 'Adaora Okafor', email: 'adaora@email.com', status: 'paid', date: '2 hours ago', earnings: 500 },
    { name: 'Chidi Nwankwo', email: 'chidi@email.com', status: 'pending', date: 'Yesterday', earnings: 500 },
    { name: 'Funmi Adebayo', email: 'funmi@email.com', status: 'paid', date: '2 days ago', earnings: 500 },
    { name: 'Kemi Adebisi', email: 'kemi@email.com', status: 'paid', date: '3 days ago', earnings: 500 }
  ];

  const topAgents = [
    { rank: 1, name: 'Sarah Johnson', referrals: 45, earnings: 22500 },
    { rank: 2, name: 'Michael Chen', referrals: 38, earnings: 19000 },
    { rank: 3, name: 'You', referrals: 23, earnings: 11500, current: true },
    { rank: 4, name: 'David Wilson', referrals: 19, earnings: 9500 }
  ];

  const copyReferralCode = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      toast.success('Referral code copied to clipboard!');
    }
  };

  const requestWithdrawal = () => {
    if (stats.totalReferrals >= 10) {
      setWithdrawalRequested(true);
      toast.success('Withdrawal request submitted for admin approval!');
    } else {
      toast.error(`You need ${10 - stats.totalReferrals} more confirmed referrals to withdraw.`);
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Agent Dashboard 💼
          </h1>
          <p className="text-gray-600">
            Track your referrals and earnings. Share your code to earn ₦500 per student!
          </p>
        </motion.div>

        {/* Referral Code Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl p-6 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Referral Code</h2>
              <div className="flex items-center space-x-3">
                <code className="bg-white/20 px-4 py-2 rounded-lg text-lg font-mono">
                  {user?.referralCode || 'REF123'}
                </code>
                <button
                  onClick={copyReferralCode}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Share this code</p>
              <p className="text-sm opacity-90">Earn ₦500 per referral</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { title: 'Total Referrals', value: stats.totalReferrals, icon: Users, color: 'emerald' },
            { title: 'This Month', value: stats.thisMonthReferrals, icon: TrendingUp, color: 'blue' },
            { title: 'Pending', value: stats.pendingReferrals, icon: Clock, color: 'orange' },
            { title: 'Total Earnings', value: `₦${stats.totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'green' },
            { title: 'Available', value: `₦${stats.availableForWithdrawal.toLocaleString()}`, icon: CreditCard, color: 'purple' }
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
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Withdrawal Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Earnings & Withdrawal</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Available for Withdrawal</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    ₦{stats.availableForWithdrawal.toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Minimum 10 confirmed referrals required for withdrawal
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Progress: {stats.totalReferrals}/10 confirmed referrals
                  </p>
                  <div className="w-64 bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((stats.totalReferrals / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  onClick={requestWithdrawal}
                  disabled={stats.totalReferrals < 10 || withdrawalRequested}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {withdrawalRequested ? 'Request Sent' : 'Request Withdrawal'}
                </button>
              </div>
            </motion.div>

            {/* Recent Referrals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Referrals</h2>
              <div className="space-y-4">
                {recentReferrals.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <UserPlus className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{referral.name}</p>
                        <p className="text-sm text-gray-600">{referral.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          referral.status === 'paid' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {referral.status}
                        </span>
                        {referral.status === 'paid' && (
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{referral.date}</p>
                      <p className="text-sm font-medium text-emerald-600">+₦{referral.earnings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Sharing Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Share Your Code</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
                  <Mail className="h-5 w-5" />
                  <span>Share via Email</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
                  <Gift className="h-5 w-5" />
                  <span>Share on WhatsApp</span>
                </button>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Sample message:</p>
                <p className="text-sm italic">
                  "Join eJAMB and save ₦500 on your registration! Use my referral code: {user?.referralCode || 'REF123'} 
                  Get access to AI tutoring, past questions, and more. Sign up at ejamb.com"
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Agents</h2>
              <div className="space-y-3">
                {topAgents.map((agent, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      agent.current ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-bold ${
                        agent.rank === 1 ? 'text-yellow-600' :
                        agent.rank === 2 ? 'text-gray-600' :
                        agent.rank === 3 ? 'text-orange-600' :
                        'text-gray-500'
                      }`}>
                        #{agent.rank}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${agent.current ? 'text-emerald-700' : 'text-gray-900'}`}>
                        {agent.name}
                      </p>
                      <p className="text-xs text-gray-600">{agent.referrals} referrals</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">₦{agent.earnings.toLocaleString()}</p>
                    </div>
                    {agent.rank <= 3 && (
                      <Award className={`h-4 w-4 ${
                        agent.rank === 1 ? 'text-yellow-600' :
                        agent.rank === 2 ? 'text-gray-600' :
                        'text-orange-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Special Promotion */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
            >
              <div className="text-center">
                <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">Special Bonus!</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Refer 100 students and earn an extra ₦20,000 bonus!
                </p>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-lg font-bold text-purple-600">
                    {stats.totalReferrals}/100
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(stats.totalReferrals / 100) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};