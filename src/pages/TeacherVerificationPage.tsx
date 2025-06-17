import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, CheckCircle, Clock, BookOpen } from 'lucide-react';

export const TeacherVerificationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2">
            <GraduationCap className="h-12 w-12 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">eJAMB</span>
          </Link>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-blue-600">Teacher Portal</span>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-lg text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verification Required
            </h2>
            <p className="text-gray-600">
              Thank you for registering as a teacher! We've sent a verification email to your registered email address.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 text-left">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Check your email inbox</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Click the verification link</span>
            </div>
            <div className="flex items-center space-x-3 text-left">
              <Clock className="h-5 w-5 text-orange-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">Wait for admin approval</span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Email verification (immediate)</li>
              <li>• Document review by admin</li>
              <li>• Account approval notification</li>
              <li>• Access to teacher dashboard</li>
            </ul>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Resend Verification Email
            </button>
            <Link
              to="/teacher-login"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Login
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Need help? Contact us at{' '}
              <a href="mailto:support@ejamb.com" className="text-blue-600 hover:text-blue-500">
                support@ejamb.com
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};