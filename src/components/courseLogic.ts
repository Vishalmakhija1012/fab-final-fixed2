export const COURSE_LOGIC = [
  {
    programName: 'YOUNG LEARNERS PROGRAM',
    targetAudience: 'Parents',
    courseType: 'Short Term',
    mainLine: 'Level based Program to improve English communication, and build confidence in young kids',
    bullets: [
      'Build foundational English skills',
      'Develop strong communication, self-expression',
      'Foster confident, engaging personality',
    ],
    originalPrice: 75000,
    offerPrice: 25000,
    live1on1: 12,
    liveBatch: 12,
    duration: 12,
    batchSize: 10,
  },
  {
    programName: 'ADVANCED ENGLISH',
    targetAudience: 'Parents',
    courseType: 'Long Term',
    mainLine: 'Comprehensive course structure focussing on holistic development, communication, and personality development',
    bullets: [
      'Master advanced verbal and written english communication skills. Public speaking',
      'Achieve fluent, confident communication .',
      'Develop critical thinking, analysis.',
    ],
    originalPrice: 300000,
    offerPrice: 150000,
    live1on1: 50,
    liveBatch: 50,
    duration: 50,
    batchSize: 5,
  },
  {
    programName: 'COMPETITIVE EDGE',
    targetAudience: 'Others',
    courseType: 'Short Term',
    mainLine: 'Program aimed to provide an extra edge. Build to give confidence in written and verbal commuincation',
    bullets: [
      "Master professional English to thrive in today's global landscape.",
      'Be a confident comminicator',
      'Enhance quick response abilities.',
    ],
    originalPrice: 80000,
    offerPrice: 25000,
    live1on1: 10,
    liveBatch: 10,
    duration: 10,
    batchSize: 10,
  },
  {
    programName: 'COMPETITIVE EDGE+',
    targetAudience: 'Others',
    courseType: 'Long Term',
    mainLine: 'Cultivate profound communication excellence & unwavering confidence in all interactions.',
    bullets: [
      'Lead globally with professional English mastery.',
      'Become influential, persuasive communicator.',
      'Develop rapid response skills for dynamic scenarios.',
    ],
    originalPrice: 300000,
    offerPrice: 150000,
    live1on1: 50,
    liveBatch: 50,
    duration: 50,
    batchSize: 5,
  },
  {
    programName: 'WRITTEN QUICK FIX',
    targetAudience: 'Any',
    courseType: 'Crash Course',
    mainLine: 'Rapidly enhance written communication for clear, impactful, and effective text creation.',
    bullets: [
      'Sharpen grammar, vocabulary',
      'Structure thoughts',
      'Write with clarity.',
    ],
    originalPrice: 22000,
    offerPrice: 14500,
    live1on1: 5,
    liveBatch: 5,
    duration: 5,
    batchSize: 10,
  },
  {
    programName: 'VERBAL QUICK FIX',
    targetAudience: 'Any',
    courseType: 'Crash Course',
    mainLine: 'Quickly enhance verbal communication skills for effective, clear, and confident spoken interactions.',
    bullets: [
      'Enhance spoken fluency',
      'Improve pronunciation, tone',
      'Engage listeners.',
    ],
    originalPrice: 22000,
    offerPrice: 14500,
    live1on1: 5,
    liveBatch: 5,
    duration: 5,
    batchSize: 10,
  },
  {
    programName: 'CONFIDENCE QUICK FIX',
    targetAudience: 'Any',
    courseType: 'Crash Course',
    mainLine: 'Gain instant confidence to speak clearly, without hesitation, boosting your communication power.',
    bullets: [
      'Overcome communication anxiety',
      'Project self-assurance',
      'Speak fearlessly.',
    ],
    originalPrice: 22000,
    offerPrice: 14500,
    live1on1: 5,
    liveBatch: 5,
    duration: 5,
    batchSize: 10,
  },
  {
    programName: 'STORYTELLING QUICK FIX',
    targetAudience: 'Any',
    courseType: 'Crash Course',
    mainLine: 'Learn impactful storytelling fast, to captivate and persuade any audience with ease.',
    bullets: [
      'Craft engaging narratives',
      'Deliver memorable messages',
      'Connect powerfully.',
    ],
    originalPrice: 22000,
    offerPrice: 14500,
    live1on1: 5,
    liveBatch: 5,
    duration: 5,
    batchSize: 10,
  },
];

// Lookup table for Crash Course goal to programName
export const CRASH_COURSE_LOOKUP: { [goal: string]: string } = {
  confidence: 'CONFIDENCE QUICK FIX',
  communication: 'VERBAL QUICK FIX',
  'public-comm.': 'STORYTELLING QUICK FIX',
  'exam-prep': 'WRITTEN QUICK FIX',
  'clear-interviews': 'VERBAL QUICK FIX',
  'speak-better': 'VERBAL QUICK FIX',
  networking: 'CONFIDENCE QUICK FIX',
  'self-expression': 'STORYTELLING QUICK FIX',
  all: 'Requires Multiple Courses',
};

// Example value for typeOfCourse and goal as used in the system:

// For a parent persona, with typeOfCourse "crash-course" and goal "speak-better":
// The lookup is: CRASH_COURSE_LOOKUP["speak-better"] => "VERBAL QUICK FIX"

// So, the value for typeOfCourse is:
// "crash-course"

// And the value for goal is:
// "speak-better"