import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Reply, 
  Search,
  Plus,
  Filter,
  Clock,
  User,
  BookOpen,
  Star,
  Pin,
  Eye
} from 'lucide-react';

interface ForumPost {
  id: number;
  title: string;
  content: string;
  author: string;
  avatar: string;
  subject: string;
  timestamp: string;
  likes: number;
  replies: number;
  views: number;
  isPinned?: boolean;
  isAnswered?: boolean;
}

interface Reply {
  id: number;
  content: string;
  author: string;
  avatar: string;
  timestamp: string;
  likes: number;
  isAnswer?: boolean;
}

export const ForumPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'English', 'Biology'];

  const forumPosts: ForumPost[] = [
    {
      id: 1,
      title: "How to solve quadratic equations quickly?",
      content: "I'm struggling with quadratic equations in the JAMB exam. Can someone explain the fastest method to solve them?",
      author: "Adaora Okafor",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      subject: "Mathematics",
      timestamp: "2 hours ago",
      likes: 15,
      replies: 8,
      views: 124,
      isPinned: true,
      isAnswered: true
    },
    {
      id: 2,
      title: "Physics: Understanding Newton's Laws",
      content: "Can someone help me understand the practical applications of Newton's three laws of motion?",
      author: "Chidi Nwankwo",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      subject: "Physics",
      timestamp: "5 hours ago",
      likes: 12,
      replies: 6,
      views: 89,
      isAnswered: true
    },
    {
      id: 3,
      title: "Chemistry bonding - Ionic vs Covalent",
      content: "What's the easiest way to remember the differences between ionic and covalent bonding?",
      author: "Funmi Adebayo",
      avatar: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      subject: "Chemistry",
      timestamp: "1 day ago",
      likes: 8,
      replies: 4,
      views: 67,
      isAnswered: false
    },
    {
      id: 4,
      title: "English: Common grammar mistakes to avoid",
      content: "What are the most common grammar mistakes Nigerian students make in JAMB English?",
      author: "Kemi Adebisi",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      subject: "English",
      timestamp: "2 days ago",
      likes: 20,
      replies: 12,
      views: 156,
      isAnswered: true
    }
  ];

  const replies: Reply[] = [
    {
      id: 1,
      content: "The quadratic formula is your best friend: x = (-b ± √(b²-4ac)) / 2a. But for JAMB, try factoring first as it's usually faster!",
      author: "Mathematics Tutor",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      timestamp: "1 hour ago",
      likes: 8,
      isAnswer: true
    },
    {
      id: 2,
      content: "I always complete the square when the equation doesn't factor easily. It's more reliable than guessing factors.",
      author: "Study Buddy",
      avatar: "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop",
      timestamp: "45 minutes ago",
      likes: 5
    }
  ];

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = activeTab === 'all' || post.subject.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesSubject;
  });

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      'Mathematics': 'blue',
      'Physics': 'purple',
      'Chemistry': 'green',
      'English': 'orange',
      'Biology': 'emerald'
    };
    return colors[subject] || 'gray';
  };

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forum</h1>
              <p className="text-gray-600">Connect with fellow students and get help with your studies</p>
            </div>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>New Post</span>
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject.toLowerCase()}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Forum Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {post.isPinned && (
                          <Pin className="h-4 w-4 text-emerald-600" />
                        )}
                        <h3 className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                          {post.title}
                        </h3>
                        {post.isAnswered && (
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                            Answered
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="font-medium text-gray-700">{post.author}</span>
                          <span className={`px-2 py-1 rounded-full text-xs bg-${getSubjectColor(post.subject)}-100 text-${getSubjectColor(post.subject)}-800`}>
                            {post.subject}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Popular Topics</h3>
              <div className="space-y-3">
                {[
                  { topic: 'Quadratic Equations', posts: 23, color: 'blue' },
                  { topic: 'Organic Chemistry', posts: 18, color: 'green' },
                  { topic: 'Physics Laws', posts: 15, color: 'purple' },
                  { topic: 'English Grammar', posts: 12, color: 'orange' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                      <span className="text-sm text-gray-700">{item.topic}</span>
                    </div>
                    <span className="text-xs text-gray-500">{item.posts} posts</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Contributors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Top Contributors</h3>
              <div className="space-y-3">
                {[
                  { name: 'Mathematics Tutor', points: 1250, avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop' },
                  { name: 'Physics Expert', points: 980, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop' },
                  { name: 'Chemistry Pro', points: 875, avatar: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop' }
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{contributor.name}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-500">{contributor.points} points</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Forum Rules */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 border border-blue-200"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Forum Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Be respectful and helpful</li>
                <li>• Search before posting</li>
                <li>• Use clear, descriptive titles</li>
                <li>• Stay on topic</li>
                <li>• Mark helpful answers</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Post Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">{selectedPost.title}</h2>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Original Post */}
                <div className="mb-8">
                  <div className="flex items-start space-x-4">
                    <img
                      src={selectedPost.avatar}
                      alt={selectedPost.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">{selectedPost.author}</span>
                        <span className={`px-2 py-1 rounded-full text-xs bg-${getSubjectColor(selectedPost.subject)}-100 text-${getSubjectColor(selectedPost.subject)}-800`}>
                          {selectedPost.subject}
                        </span>
                        <span className="text-sm text-gray-500">{selectedPost.timestamp}</span>
                      </div>
                      <p className="text-gray-700 mb-4">{selectedPost.content}</p>
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-emerald-600">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{selectedPost.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-emerald-600">
                          <Reply className="h-4 w-4" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Replies */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-gray-900">Replies ({replies.length})</h3>
                  {replies.map((reply) => (
                    <div key={reply.id} className={`border-l-4 pl-4 ${reply.isAnswer ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}>
                      <div className="flex items-start space-x-4">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900">{reply.author}</span>
                            {reply.isAnswer && (
                              <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                                Best Answer
                              </span>
                            )}
                            <span className="text-sm text-gray-500">{reply.timestamp}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{reply.content}</p>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-gray-500 hover:text-emerald-600">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{reply.likes}</span>
                            </button>
                            <button className="text-gray-500 hover:text-emerald-600 text-sm">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Form */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Add your reply</h4>
                  <textarea
                    rows={4}
                    placeholder="Share your knowledge and help fellow students..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  ></textarea>
                  <div className="flex justify-end mt-4">
                    <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                      Post Reply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};