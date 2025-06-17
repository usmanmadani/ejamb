import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'agent' | 'admin' | 'teacher';
  referralCode?: string;
  isPaid?: boolean;
  referredBy?: string;
  phone?: string;
  qualification?: string;
  expertise?: string;
  isVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: string;
  referralCode?: string;
  phone?: string;
  qualification?: string;
  expertise?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: string) => {
    setIsLoading(true);
    try {
      // Mock authentication - in production, this would call your API
      let userRole: 'student' | 'agent' | 'admin' | 'teacher' = 'student';
      
      if (role === 'teacher' || email.includes('teacher')) {
        userRole = 'teacher';
      } else if (email.includes('admin')) {
        userRole = 'admin';
      } else if (email.includes('agent')) {
        userRole = 'agent';
      }

      const mockUser: User = {
        id: '1',
        email,
        name: userRole === 'teacher' ? 'Dr. Sarah Johnson' : 'John Doe',
        role: userRole,
        isPaid: true,
        referralCode: userRole === 'agent' ? 'REF123' : undefined,
        phone: userRole === 'teacher' ? '+234 801 234 5678' : undefined,
        qualification: userRole === 'teacher' ? 'Ph.D in Physics' : undefined,
        expertise: userRole === 'teacher' ? 'Physics' : undefined,
        isVerified: userRole === 'teacher' ? true : undefined,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Mock registration - in production, this would call your API
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role as 'student' | 'agent' | 'admin' | 'teacher',
        isPaid: userData.role === 'teacher' ? true : false,
        referredBy: userData.referralCode,
        referralCode: userData.role === 'agent' ? `REF${Date.now()}` : undefined,
        phone: userData.phone,
        qualification: userData.qualification,
        expertise: userData.expertise,
        isVerified: userData.role === 'teacher' ? false : undefined,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};