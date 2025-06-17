import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export const PaymentPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const originalPrice = 5000;
  const discount = user?.referredBy ? 500 : 0;
  const finalPrice = originalPrice - discount;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Update user's payment status
      const updatedUser = { ...user!, isPaid: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Payment successful! Welcome to eJAMB!');
      navigate('/student');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { id: 'card', name: 'Debit/Credit Card', icon: CreditCard },
    { id: 'bank', name: 'Bank Transfer', icon: Shield },
    { id: 'ussd', name: 'USSD', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-gray-900">
            Complete Your Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            One payment for lifetime access to all features
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          {/* Price Summary */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">eJAMB Full Access</span>
                <span className="text-gray-900">₦{originalPrice.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Referral Discount</span>
                  <span>-₦{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₦{finalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <label key={method.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    defaultChecked={method.id === 'card'}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                  />
                  <method.icon className="h-5 w-5 text-gray-400 ml-3 mr-3" />
                  <span className="text-gray-900">{method.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="text-sm text-gray-700">
                Secured by Paystack. Your payment information is encrypted and secure.
              </span>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing Payment...
              </div>
            ) : (
              `Pay ₦${finalPrice.toLocaleString()}`
            )}
          </button>

          {/* Features List */}
          <div className="mt-8">
            <h4 className="font-semibold text-gray-900 mb-3">What you'll get:</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {[
                "Unlimited access to all courses",
                "10,000+ past JAMB questions",
                "AI-powered study assistant",
                "Mock exams with real-time scoring",
                "Downloadable study materials",
                "Community forum access",
                "24/7 support"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};