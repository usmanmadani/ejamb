export interface Course {
  id: string;
  title: string;
  subject: string;
  description: string;
  assignedTeacher?: {
    id: string;
    name: string;
    email: string;
    qualification: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  enrolledStudents: number;
  materials: CourseMaterial[];
  quizzes: CourseQuiz[];
}

export interface CourseMaterial {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'document';
  url: string;
  description?: string;
  uploadedAt: Date;
  uploadedBy: string;
  size?: string;
}

export interface CourseQuiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  timeLimit: number; // in minutes
  createdAt: Date;
  createdBy: string;
  isActive: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export const availableSubjects = [
  'English Language',
  'Mathematics',
  'Biology',
  'Physics',
  'Chemistry',
  'Literature in English',
  'Government',
  'Economics',
  'Geography',
  'Christian Religious Studies',
  'Islamic Religious Studies',
  'History',
  'Commerce',
  'Agricultural Science',
  'Accounting / Principles of Accounting',
  'Computer Studies',
  'Yoruba',
  'Hausa',
  'Igbo',
  'French'
];

// Mock data for demonstration
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced Mathematics for JAMB',
    subject: 'Mathematics',
    description: 'Comprehensive mathematics course covering all JAMB topics including algebra, geometry, trigonometry, and calculus.',
    assignedTeacher: {
      id: 'teacher1',
      name: 'Dr. Adebayo Ogundimu',
      email: 'adebayo@ejamb.com',
      qualification: 'Ph.D in Mathematics'
    },
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    enrolledStudents: 156,
    materials: [
      {
        id: 'mat1',
        title: 'Algebra Fundamentals',
        type: 'video',
        url: 'https://example.com/video1',
        description: 'Introduction to algebraic concepts',
        uploadedAt: new Date('2024-01-16'),
        uploadedBy: 'teacher1'
      },
      {
        id: 'mat2',
        title: 'Mathematics Formula Sheet',
        type: 'pdf',
        url: 'https://example.com/pdf1',
        description: 'Complete formula reference',
        uploadedAt: new Date('2024-01-17'),
        uploadedBy: 'teacher1',
        size: '2.4 MB'
      }
    ],
    quizzes: [
      {
        id: 'quiz1',
        title: 'Algebra Basics Quiz',
        description: 'Test your understanding of basic algebra',
        questions: [],
        timeLimit: 30,
        createdAt: new Date('2024-01-18'),
        createdBy: 'teacher1',
        isActive: true
      }
    ]
  },
  {
    id: '2',
    title: 'English Language Mastery',
    subject: 'English Language',
    description: 'Master English language skills including grammar, comprehension, and essay writing for JAMB success.',
    assignedTeacher: {
      id: 'teacher2',
      name: 'Prof. Funmi Adebayo',
      email: 'funmi@ejamb.com',
      qualification: 'M.A in English Literature'
    },
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25'),
    enrolledStudents: 203,
    materials: [],
    quizzes: []
  },
  {
    id: '3',
    title: 'Physics Fundamentals',
    subject: 'Physics',
    description: 'Complete physics course covering mechanics, electricity, waves, and modern physics.',
    assignedTeacher: {
      id: 'teacher3',
      name: 'Dr. Sarah Johnson',
      email: 'sarah@ejamb.com',
      qualification: 'Ph.D in Physics'
    },
    isActive: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-22'),
    enrolledStudents: 134,
    materials: [],
    quizzes: []
  },
  {
    id: '4',
    title: 'Chemistry Essentials',
    subject: 'Chemistry',
    description: 'Comprehensive chemistry course covering organic, inorganic, and physical chemistry.',
    isActive: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    enrolledStudents: 0,
    materials: [],
    quizzes: []
  }
];

export const mockTeachers = [
  {
    id: 'teacher1',
    name: 'Dr. Adebayo Ogundimu',
    email: 'adebayo@ejamb.com',
    qualification: 'Ph.D in Mathematics',
    expertise: 'Mathematics',
    isVerified: true,
    assignedCourses: ['1']
  },
  {
    id: 'teacher2',
    name: 'Prof. Funmi Adebayo',
    email: 'funmi@ejamb.com',
    qualification: 'M.A in English Literature',
    expertise: 'English Language',
    isVerified: true,
    assignedCourses: ['2']
  },
  {
    id: 'teacher3',
    name: 'Dr. Sarah Johnson',
    email: 'sarah@ejamb.com',
    qualification: 'Ph.D in Physics',
    expertise: 'Physics',
    isVerified: true,
    assignedCourses: ['3']
  },
  {
    id: 'teacher4',
    name: 'Dr. Chidi Nwankwo',
    email: 'chidi@ejamb.com',
    qualification: 'Ph.D in Chemistry',
    expertise: 'Chemistry',
    isVerified: true,
    assignedCourses: []
  },
  {
    id: 'teacher5',
    name: 'Prof. Kemi Adebisi',
    email: 'kemi@ejamb.com',
    qualification: 'M.Sc in Biology',
    expertise: 'Biology',
    isVerified: true,
    assignedCourses: []
  }
];