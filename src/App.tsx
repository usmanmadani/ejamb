import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { AgentDashboard } from './pages/AgentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { TeacherLoginPage } from './pages/TeacherLoginPage';
import { TeacherRegisterPage } from './pages/TeacherRegisterPage';
import { TeacherVerificationPage } from './pages/TeacherVerificationPage';
import { CoursePage } from './pages/CoursePage';
import { QuizPage } from './pages/QuizPage';
import { AIAssistant } from './pages/AIAssistant';
import { ForumPage } from './pages/ForumPage';
import { PaymentPage } from './pages/PaymentPage';
import { CoursesPage } from './pages/CoursesPage';
import { CreateCoursePage } from './pages/CreateCoursePage';
import { SubjectsPage } from './pages/SubjectsPage';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/teacher-login" element={<TeacherLoginPage />} />
            <Route path="/teacher-register" element={<TeacherRegisterPage />} />
            <Route path="/teacher-verification" element={<TeacherVerificationPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            
            <Route path="/student" element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/agent" element={
              <ProtectedRoute role="agent">
                <AgentDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/teacher" element={
              <ProtectedRoute role="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/create-course" element={
              <ProtectedRoute role="teacher">
                <CreateCoursePage />
              </ProtectedRoute>
            } />
            
            <Route path="/course/:id" element={
              <ProtectedRoute role="student">
                <CoursePage />
              </ProtectedRoute>
            } />
            
            <Route path="/quiz/:id" element={
              <ProtectedRoute role="student">
                <QuizPage />
              </ProtectedRoute>
            } />
            
            <Route path="/ai-assistant" element={
              <ProtectedRoute role="student">
                <AIAssistant />
              </ProtectedRoute>
            } />
            
            <Route path="/forum" element={
              <ProtectedRoute role="student">
                <ForumPage />
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}