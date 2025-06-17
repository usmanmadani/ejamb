import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { 
  Send, 
  Brain, 
  Mic, 
  MicOff, 
  BookOpen, 
  Calculator, 
  Lightbulb,
  Clock,
  User,
  Bot
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI study assistant. I can help you with JAMB questions, explain concepts, solve problems, and provide study guidance. What would you like to learn about today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "Explain quadratic equations",
    "Help with trigonometry",
    "Past JAMB questions on algebra",
    "Chemistry bonding concepts",
    "Physics motion problems",
    "English grammar rules"
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('quadratic')) {
      return "A quadratic equation is a polynomial equation of degree 2, typically written as ax² + bx + c = 0. To solve quadratic equations, you can use:\n\n1. **Factoring**: Find two numbers that multiply to 'ac' and add to 'b'\n2. **Quadratic Formula**: x = (-b ± √(b²-4ac)) / 2a\n3. **Completing the Square**: Rewrite in the form (x-h)² = k\n\nExample: x² - 5x + 6 = 0\nFactoring: (x-2)(x-3) = 0\nSolutions: x = 2 or x = 3\n\nWould you like me to solve a specific quadratic equation for you?";
    }
    
    if (lowerQuestion.includes('trigonometry') || lowerQuestion.includes('trig')) {
      return "Trigonometry deals with relationships between angles and sides in triangles. Key concepts:\n\n**Basic Ratios:**\n• sin θ = opposite/hypotenuse\n• cos θ = adjacent/hypotenuse\n• tan θ = opposite/adjacent\n\n**Important Identities:**\n• sin²θ + cos²θ = 1\n• tan θ = sin θ/cos θ\n\n**Special Angles:**\n• sin 30° = 1/2, cos 30° = √3/2\n• sin 45° = cos 45° = √2/2\n• sin 60° = √3/2, cos 60° = 1/2\n\nWhat specific trigonometry topic would you like to explore?";
    }
    
    if (lowerQuestion.includes('chemistry') || lowerQuestion.includes('bonding')) {
      return "Chemical bonding explains how atoms combine to form compounds:\n\n**Types of Bonds:**\n1. **Ionic Bonding**: Transfer of electrons (metal + non-metal)\n   - Example: NaCl (sodium chloride)\n\n2. **Covalent Bonding**: Sharing of electrons (non-metal + non-metal)\n   - Example: H₂O (water)\n\n3. **Metallic Bonding**: Sea of electrons (metal + metal)\n   - Example: Iron (Fe)\n\n**Key Points:**\n• Atoms bond to achieve stable electron configurations\n• Ionic compounds form crystals and conduct electricity when dissolved\n• Covalent compounds can be gases, liquids, or solids\n\nWhich type of bonding would you like to study in detail?";
    }
    
    if (lowerQuestion.includes('physics') || lowerQuestion.includes('motion')) {
      return "Motion in physics describes how objects move through space and time:\n\n**Key Equations:**\n• v = u + at (velocity-time)\n• s = ut + ½at² (displacement)\n• v² = u² + 2as (velocity-displacement)\n\n**Where:**\n• u = initial velocity\n• v = final velocity\n• a = acceleration\n• t = time\n• s = displacement\n\n**Types of Motion:**\n1. **Uniform Motion**: Constant velocity\n2. **Uniformly Accelerated Motion**: Constant acceleration\n3. **Projectile Motion**: Motion under gravity\n\nExample: A car accelerates from rest at 2 m/s² for 5 seconds.\nFinal velocity: v = 0 + (2)(5) = 10 m/s\n\nWhat motion problem would you like help with?";
    }
    
    // Default response
    return "I understand you're asking about " + question + ". Let me help you with that!\n\nAs your AI study assistant, I can:\n• Explain complex concepts in simple terms\n• Solve mathematical problems step-by-step\n• Provide examples and practice questions\n• Help with exam strategies\n• Answer questions across all JAMB subjects\n\nCould you be more specific about what you'd like to learn? For example:\n- Which subject area?\n- What specific topic or concept?\n- Do you have a particular problem to solve?\n\nI'm here to make your JAMB preparation easier and more effective!";
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
    if (!isListening) {
      // Start voice recognition
      setTimeout(() => {
        setIsListening(false);
        setInputText("How do I solve quadratic equations?");
      }, 3000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Study Assistant</h1>
              <p className="text-gray-600">Get instant help with your JAMB preparation</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm flex flex-col h-[600px]">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bot className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                      <p className="text-sm text-green-600">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5 text-gray-400" />
                    <BookOpen className="h-5 w-5 text-gray-400" />
                    <Lightbulb className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-emerald-600' 
                          : 'bg-blue-600'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="whitespace-pre-line">{message.text}</p>
                        <div className="flex items-center space-x-1 mt-2">
                          <Clock className="h-3 w-3 opacity-60" />
                          <span className="text-xs opacity-60">{formatTime(message.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask me anything about your studies..."
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={toggleVoiceInput}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                        isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isLoading}
                    className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Quick Questions</h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Study Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-900">Study Tips</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Ask specific questions for better answers</li>
                <li>• Request step-by-step solutions</li>
                <li>• Practice with similar problems</li>
                <li>• Ask for explanations of concepts</li>
                <li>• Use voice input for convenience</li>
              </ul>
            </motion.div>

            {/* AI Capabilities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">I can help with:</h3>
              <div className="space-y-3">
                {[
                  { subject: 'Mathematics', icon: Calculator, color: 'blue' },
                  { subject: 'Physics', icon: BookOpen, color: 'purple' },
                  { subject: 'Chemistry', icon: BookOpen, color: 'green' },
                  { subject: 'English', icon: BookOpen, color: 'orange' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-${item.color}-100`}>
                      <item.icon className={`h-4 w-4 text-${item.color}-600`} />
                    </div>
                    <span className="text-sm text-gray-700">{item.subject}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};