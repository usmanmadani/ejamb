export interface JAMBSubject {
  id: string;
  name: string;
  category: 'compulsory' | 'science' | 'arts' | 'social-science' | 'languages' | 'vocational';
  description: string;
  isCompulsory?: boolean;
}

export const jambSubjects: JAMBSubject[] = [
  // Compulsory Subject
  {
    id: 'english-language',
    name: 'English Language',
    category: 'compulsory',
    description: 'Compulsory for all JAMB candidates',
    isCompulsory: true
  },

  // Core Sciences
  {
    id: 'mathematics',
    name: 'Mathematics',
    category: 'science',
    description: 'Essential for science and engineering courses'
  },
  {
    id: 'physics',
    name: 'Physics',
    category: 'science',
    description: 'Study of matter, energy, and their interactions'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    category: 'science',
    description: 'Study of substances and their properties'
  },
  {
    id: 'biology',
    name: 'Biology',
    category: 'science',
    description: 'Study of living organisms and life processes'
  },
  {
    id: 'further-mathematics',
    name: 'Further Mathematics',
    category: 'science',
    description: 'Advanced mathematics for specialized programs'
  },

  // Social Sciences
  {
    id: 'economics',
    name: 'Economics',
    category: 'social-science',
    description: 'Study of production, distribution, and consumption'
  },
  {
    id: 'government',
    name: 'Government',
    category: 'social-science',
    description: 'Study of political systems and governance'
  },
  {
    id: 'geography',
    name: 'Geography',
    category: 'social-science',
    description: 'Study of Earth\'s features and human activities'
  },
  {
    id: 'history',
    name: 'History',
    category: 'social-science',
    description: 'Study of past events and civilizations'
  },
  {
    id: 'civic-education',
    name: 'Civic Education',
    category: 'social-science',
    description: 'Study of citizenship and civic responsibilities'
  },

  // Arts and Literature
  {
    id: 'literature-in-english',
    name: 'Literature in English',
    category: 'arts',
    description: 'Study of English literary works and criticism'
  },
  {
    id: 'fine-art',
    name: 'Fine Art',
    category: 'arts',
    description: 'Visual arts including drawing, painting, and sculpture'
  },
  {
    id: 'music',
    name: 'Music',
    category: 'arts',
    description: 'Study of musical theory, composition, and performance'
  },

  // Languages
  {
    id: 'yoruba',
    name: 'Yoruba',
    category: 'languages',
    description: 'West African language and cultural studies'
  },
  {
    id: 'igbo',
    name: 'Igbo',
    category: 'languages',
    description: 'Nigerian language and cultural studies'
  },
  {
    id: 'hausa',
    name: 'Hausa',
    category: 'languages',
    description: 'West African language and cultural studies'
  },
  {
    id: 'arabic',
    name: 'Arabic',
    category: 'languages',
    description: 'Arabic language and Islamic studies'
  },
  {
    id: 'french',
    name: 'French',
    category: 'languages',
    description: 'French language and francophone culture'
  },

  // Religious Studies
  {
    id: 'christian-religious-studies',
    name: 'Christian Religious Studies (CRS)',
    category: 'arts',
    description: 'Study of Christian theology and biblical texts'
  },
  {
    id: 'islamic-religious-studies',
    name: 'Islamic Religious Studies (IRS)',
    category: 'arts',
    description: 'Study of Islamic theology and Quranic texts'
  },

  // Commercial/Business Studies
  {
    id: 'commerce',
    name: 'Commerce',
    category: 'social-science',
    description: 'Study of trade, business, and commercial activities'
  },
  {
    id: 'principles-of-accounts',
    name: 'Principles of Accounts',
    category: 'social-science',
    description: 'Basic accounting principles and financial management'
  },

  // Vocational/Technical
  {
    id: 'agricultural-science',
    name: 'Agricultural Science',
    category: 'vocational',
    description: 'Study of farming, crop production, and animal husbandry'
  },
  {
    id: 'computer-studies',
    name: 'Computer Studies',
    category: 'vocational',
    description: 'Basic computer literacy and information technology'
  },
  {
    id: 'physical-and-health-education',
    name: 'Physical and Health Education',
    category: 'vocational',
    description: 'Study of physical fitness, sports, and health'
  },
  {
    id: 'home-economics',
    name: 'Home Economics',
    category: 'vocational',
    description: 'Study of household management and family life'
  }
];

export const subjectCategories = [
  { id: 'compulsory', name: 'Compulsory', color: 'red' },
  { id: 'science', name: 'Sciences', color: 'blue' },
  { id: 'arts', name: 'Arts & Literature', color: 'purple' },
  { id: 'social-science', name: 'Social Sciences', color: 'green' },
  { id: 'languages', name: 'Languages', color: 'orange' },
  { id: 'vocational', name: 'Vocational', color: 'indigo' }
];

export const getSubjectsByCategory = (category: string) => {
  return jambSubjects.filter(subject => subject.category === category);
};

export const getSubjectById = (id: string) => {
  return jambSubjects.find(subject => subject.id === id);
};

export const getSubjectNames = () => {
  return jambSubjects.map(subject => subject.name);
};