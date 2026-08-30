import {
  Briefcase,
  Calculator,
  Code,
  FolderGit2,
  GraduationCap,
  Mail,
  Monitor,
  Network,
  PenTool,
  User,
} from 'lucide-react';

export const heroData = {
  eyebrow: 'Full Stack Developer Portfolio',
  name: "Hi, I'm Akindu Imantha",
  intro:
    'Information Technology undergraduate focused on practical web interfaces, backend presentation, and application building with both web and desktop development experience.',
  meta: ['Rathnapura, Sri Lanka', '(+94) 70 110 7126', 'akindu666imantha@gmail.com'],
  primaryAction: { href: '#console', label: 'View Details' },
  secondaryAction: { href: './Akindu-Imantha-CV.pdf', label: 'Download CV' },
  tertiaryAction: { href: 'https://github.com/akindu-imantha', label: 'GitHub' },
  profileImage: './images/profile-hero-cutout.png',
  profileImageAlt: 'Akindu Imantha',
  profileLabel: 'Profile Snapshot',
  profileTitle: 'Building polished work that is easy to present online',
  profileText:
    'My background combines academic IT study, graphic tools, web development foundations, and hands-on project work that can be presented clearly through a modern portfolio.',
};

export const focusAreas = [
  'React portfolio interfaces',
  'Responsive web design',
  'C# desktop application development',
  'HTML, CSS, JavaScript, and PHP',
];

export const aboutCards = [
  {
    title: 'Current direction',
    text:
      'I am building as an IT undergraduate with interest in practical software solutions, clear interfaces, and systems that solve real user and workflow needs.',
  },
  {
    title: 'Technical range',
    text:
      'My experience covers frontend development, desktop application work, database-backed systems, and web technologies including React, C#, PHP, Laravel, and MySQL.',
  },
  {
    title: 'Project approach',
    text:
      'I focus on building work that is structured, usable, and easy to present, with attention to layout quality, clean workflows, and practical implementation.',
  },
  {
    title: 'Broader strengths',
    text:
      'Alongside coding, I bring graphic tool familiarity, documentation ability, and community project experience that support both technical execution and communication.',
  },
];

export const technicalSkills = [
  'React',
  'JavaScript',
  'HTML',
  'CSS',
  'C#',
  'Java',
  'Python',
  'C++',
  'Laravel',
  'PHP',
  'MySQL',
];

export const tools = [
  'MS Office',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe Premiere Pro',
  'Visual Studio',
  'GitHub',
];

export const creativeProfile = {
  title: 'Graphic design presence',
  text:
    'I also publish visual work through Behance, including layout-focused design pieces and creative work that supports my broader presentation skills.',
  highlights: ['Behance portfolio', 'Design-focused work', 'Visual presentation'],
  link: {
    href: 'https://www.behance.net/akinduimantha',
    label: 'View Behance profile',
  },
};

export const githubActivity = {
  username: 'akindu-imantha',
  title: 'GitHub contribution activity',
};

export const imageBar = {
  title: 'Portfolio moments',
  text: 'Academic, community, project, and design highlights in one quick visual strip.',
  items: [
    {
      src: './images/highlights/moratuwa-awards-2025.png',
      alt: 'Akindu Imantha receiving a Diploma in Information Technology at the University of Moratuwa Awards Ceremony 2025.',
      label: 'Moratuwa award',
      href: '#console',
      gallery: [
        { src: './images/highlights/moratuwa-awards-2025.png', alt: 'University of Moratuwa award moment.' },
      ],
    },
    {
      src: './images/highlights/ylca-climate-action.png',
      alt: 'British Council Youth Leadership for Climate Action programme certificate, team project, and participation portrait.',
      label: 'Climate leadership',
      href: '#console',
      gallery: [
        { src: './images/highlights/ylca-climate-action.png', alt: 'Climate leadership moment.' },
      ],
    },
    {
      src: './images/highlights/e-waste-management-platform.png',
      alt: 'E-Waste Management in Sri Lanka platform preview on laptop and mobile screens.',
      label: 'E-waste platform',
      href: '#console',
      gallery: [
        { src: './images/highlights/e-waste-management-platform.png', alt: 'E-waste platform moment.' },
      ],
    },
    {
      src: './images/highlights/art-cafe-graphic-design.png',
      alt: 'Art Cafe graphic design agency promotional poster created by Akindu Imantha.',
      label: 'Graphic design',
      href: 'https://www.behance.net/akinduimantha',
      external: true,
      gallery: [
        { src: './images/highlights/art-cafe-graphic-design.png', alt: 'Graphic design moment.' },
      ],
    },
  ],
};

export const education = [
  {
    title: 'Bachelor of Information Technology',
    subtitle: 'University of Moratuwa',
    text: 'Undergraduate level studies completed through first year diploma level and second year higher diploma level coursework.',
    logo: './images/education/university-of-moratuwa-logo.png',
    logoAlt: 'University of Moratuwa logo',
    gradeLink: '#grades-uom',
    gradeButtonLabel: 'View Moratuwa grades',
  },
  {
    title: 'Bachelor of Science Honours in Cyber Security',
    subtitle: 'Sri Lanka Technology Campus',
    text: 'Currently pursuing cyber security degree studies with focus on secure systems, networking, and practical information security foundations. Level 1 Semester 1 results are published in the grades section.',
    logo: './images/education/sltc-crest.png',
    logoAlt: 'SLTC logo',
    gradeLink: '#grades-sltc',
    gradeButtonLabel: 'View SLTC grades',
  },
  {
    title: 'School qualifications',
    subtitle: 'Prince College',
    text: [
      'A/L 2022: Accounting, Business Studies, and ICT.',
      'O/L 2018: ICT, Mathematics, Science, English, Sinhala, History, Art, and Civic Studies.',
    ],
    logo: './images/optimized/prince-college-logo-transparent-360.png',
    logoAlt: 'Prince College logo',
  },
];

export const academicGrades = [
  {
    id: 'uom',
    program: 'Bachelor of Information Technology',
    institution: 'University of Moratuwa',
    status: 'Completed coursework',
    summary:
      'Official University of Moratuwa BIT results are grouped by semester. CGPA is calculated from completed semesters only.',
    gpaSummary: 'CGPA: 3.07',
    creditSummary: 'Completed GPA credits: 78',
    subjects: [
      { name: 'Visual Application Programming', code: 'ITE1112', grade: 'B-', credits: 4, semester: 'Semester 1' },
      { name: 'Web Design', code: 'ITE1712', grade: 'A-', credits: 4, semester: 'Semester 1' },
      { name: 'Mathematics for IT', code: 'ITE1812', grade: 'C+', credits: 4, semester: 'Semester 1' },
      { name: 'Communication Skills Development', code: 'ITE1912', grade: 'A-', credits: 2, semester: 'Semester 1' },
      { name: 'ICT Applications', code: 'ITE1922', grade: 'B', credits: 2, semester: 'Semester 1' },
      { name: 'Fundamentals of Programming', code: 'ITE1122', grade: 'B', credits: 4, semester: 'Semester 2' },
      { name: 'Computer Systems', code: 'ITE1212', grade: 'A-', credits: 2, semester: 'Semester 2' },
      { name: 'System Analysis & Design', code: 'ITE1222', grade: 'B', credits: 2, semester: 'Semester 2' },
      { name: 'Information Management', code: 'ITE1412', grade: 'C', credits: 2, semester: 'Semester 2' },
      { name: 'Technical Writing', code: 'ITE1932', grade: 'C', credits: 2, semester: 'Semester 2' },
      { name: 'ICT Project', code: 'ITE1942', grade: 'A+', credits: 2, semester: 'Semester 2' },
      { name: 'Object Oriented Programming', code: 'ITE2132', grade: 'B+', credits: 4, semester: 'Semester 3' },
      { name: 'Data Structures and Algorithms', code: 'ITE2142', grade: 'C', credits: 2, semester: 'Semester 3' },
      { name: 'Computer Networks & Operating Systems', code: 'ITE2232', grade: 'B-', credits: 4, semester: 'Semester 3' },
      { name: 'Database Management Systems', code: 'ITE2422', grade: 'A-', credits: 4, semester: 'Semester 3' },
      { name: 'Web Programming', code: 'ITE2722', grade: 'B+', credits: 4, semester: 'Semester 3' },
      { name: 'Mobile Application Development', code: 'ITE2152', grade: 'B', credits: 2, semester: 'Semester 4' },
      { name: 'Software Engineering', code: 'ITE2162', grade: 'C+', credits: 4, semester: 'Semester 4' },
      { name: 'IT Quality Assurance', code: 'ITE2312', grade: 'B+', credits: 2, semester: 'Semester 4' },
      { name: 'IT Project Management', code: 'ITE2612', grade: 'C+', credits: 2, semester: 'Semester 4' },
      { name: 'Multimedia Development', code: 'ITE2732', grade: 'B', credits: 2, semester: 'Semester 4' },
      { name: 'Programming Group Project', code: 'ITE2952', grade: 'A+', credits: 4, semester: 'Semester 4' },
      { name: 'Information Security', code: 'ITE3242', grade: 'C+', credits: 2, semester: 'Semester 5' },
      { name: 'Professional Practice', code: 'ITE3322', grade: 'C+', credits: 2, semester: 'Semester 5' },
      { name: 'Fundamentals of Artificial Intelligence', code: 'ITE3512', grade: 'A-', credits: 3, semester: 'Semester 5' },
      { name: 'Human Computer Interaction', code: 'ITE3752', grade: 'A', credits: 3, semester: 'Semester 5' },
      { name: 'Discrete Mathematics', code: 'ITE3822', grade: 'B', credits: 4, semester: 'Semester 5' },
      { name: 'Quality Assurance in Practice', code: 'ITE3332', grade: 'Pending', credits: 3, semester: 'Semester 6' },
      { name: 'Marketing', code: 'ITE3642', grade: 'Pending', credits: 3, semester: 'Semester 6' },
      { name: 'Organizational Behavior', code: 'ITE3652', grade: 'Pending', credits: 3, semester: 'Semester 6' },
      { name: 'Web Services', code: 'ITE3742', grade: 'Pending', credits: 3, semester: 'Semester 6' },
      { name: 'Project', code: 'ITE3962', grade: 'Pending', credits: 10, semester: 'Semester 6' },
    ],
    semesters: [
      {
        title: '22S2 - Semester 1',
        sgpa: '3.01',
        subjects: [
          { code: 'ITE1112', name: 'Visual Application Programming', grade: 'B-', credits: 4 },
          { code: 'ITE1712', name: 'Web Design', grade: 'A-', credits: 4 },
          { code: 'ITE1812', name: 'Mathematics for IT', grade: 'C+', credits: 4 },
          { code: 'ITE1912', name: 'Communication Skills Development', grade: 'A-', credits: 2 },
          { code: 'ITE1922', name: 'ICT Applications', grade: 'B', credits: 2 },
        ],
      },
      {
        title: '22S2 - Semester 2',
        sgpa: '2.99',
        subjects: [
          { code: 'ITE1122', name: 'Fundamentals of Programming', grade: 'B', credits: 4 },
          { code: 'ITE1212', name: 'Computer Systems', grade: 'A-', credits: 2 },
          { code: 'ITE1222', name: 'System Analysis & Design', grade: 'B', credits: 2 },
          { code: 'ITE1412', name: 'Information Management', grade: 'C', credits: 2 },
          { code: 'ITE1932', name: 'Technical Writing', grade: 'C', credits: 2 },
          { code: 'ITE1942', name: 'ICT Project', grade: 'A+', credits: 2 },
        ],
      },
      {
        title: '22S2 - Semester 3',
        sgpa: '3.11',
        subjects: [
          { code: 'ITE2132', name: 'Object Oriented Programming', grade: 'B+', credits: 4 },
          { code: 'ITE2142', name: 'Data Structures and Algorithms', grade: 'C', credits: 2 },
          { code: 'ITE2232', name: 'Computer Networks & Operating Systems', grade: 'B-', credits: 4 },
          { code: 'ITE2422', name: 'Database Management Systems', grade: 'A-', credits: 4 },
          { code: 'ITE2722', name: 'Web Programming', grade: 'B+', credits: 4 },
        ],
      },
      {
        title: '22S2 - Semester 4',
        sgpa: '3.08',
        subjects: [
          { code: 'ITE2152', name: 'Mobile Application Development', grade: 'B', credits: 2 },
          { code: 'ITE2162', name: 'Software Engineering', grade: 'C+', credits: 4 },
          { code: 'ITE2312', name: 'IT Quality Assurance', grade: 'B+', credits: 2 },
          { code: 'ITE2612', name: 'IT Project Management', grade: 'C+', credits: 2 },
          { code: 'ITE2732', name: 'Multimedia Development', grade: 'B', credits: 2 },
          { code: 'ITE2952', name: 'Programming Group Project', grade: 'A+', credits: 4 },
        ],
      },
      {
        title: '22S2 - Semester 5',
        sgpa: '3.16',
        subjects: [
          { code: 'ITE3242', name: 'Information Security', grade: 'C+', credits: 2 },
          { code: 'ITE3322', name: 'Professional Practice', grade: 'C+', credits: 2 },
          { code: 'ITE3512', name: 'Fundamentals of Artificial Intelligence', grade: 'A-', credits: 3 },
          { code: 'ITE3752', name: 'Human Computer Interaction', grade: 'A', credits: 3 },
          { code: 'ITE3822', name: 'Discrete Mathematics', grade: 'B', credits: 4 },
        ],
      },
      {
        title: '22S2 - Semester 6',
        sgpa: 'Pending',
        subjects: [
          { code: 'ITE3332', name: 'Quality Assurance in Practice', grade: 'Pending', credits: 3 },
          { code: 'ITE3642', name: 'Marketing', grade: 'Pending', credits: 3 },
          { code: 'ITE3652', name: 'Organizational Behavior', grade: 'Pending', credits: 3 },
          { code: 'ITE3742', name: 'Web Services', grade: 'Pending', credits: 3 },
          { code: 'ITE3962', name: 'Project', grade: 'Pending', credits: 10 },
        ],
      },
    ],
  },
  {
    id: 'sltc',
    program: 'Bachelor of Science Honours in Cyber Security',
    institution: 'Sri Lanka Technology Campus',
    status: 'Currently studying',
    summary:
      'SLTC cyber security modules are grouped by level and semester. GPA updates automatically from completed module grades.',
    subjects: [],
    semesters: [
      {
        title: 'Level 1 Semester 1',
        subjects: [
          { code: 'CCS1300', name: 'Programming Concepts', grade: 'A', credits: 3 },
          { code: 'CCS1301', name: 'Computer Systems', grade: 'A+', credits: 3 },
          { code: 'CCS1302', name: 'Internet Technologies', grade: 'A', credits: 3 },
          { code: 'CCS1311', name: 'Mathematics for Computing (with Programming)', grade: 'A-', credits: 4 },
          { code: 'SMA0302', name: 'Introductory Calculus', grade: 'A', credits: 3 },
        ],
      },
      {
        title: 'Level 1 Semester 2',
        subjects: [
          { code: 'CCS1303', name: 'Object Oriented Programming', grade: 'A', credits: 3 },
          { code: 'CCS1304', name: 'Data Technologies', grade: 'B', credits: 3 },
          { code: 'CCS1307', name: 'Entrepreneurship & Start-up Culture', grade: 'Pending', credits: 3 },
          { code: 'CCS1310', name: 'Professional Practice', grade: 'Pending', credits: 3 },
          { code: 'CCS2301', name: 'Business Analysis and Software Design', grade: 'B-', credits: 3 },
        ],
      },
      {
        title: 'Level 2 Semester 1',
        subjects: [
          { code: 'CCS1305', name: 'Communication Protocols and Models', grade: 'Pending', credits: 3 },
          { code: 'CCS2300', name: 'Data Structures and Algorithms', grade: 'Pending', credits: 3 },
          { code: 'CCS2303', name: 'Operating Systems and Platforms', grade: 'Pending', credits: 3 },
          { code: 'CCS2310', name: 'Programming with Vectors and Matrices', grade: 'Pending', credits: 3 },
          { code: 'CSD2301', name: 'Effective Communication', grade: 'Pending', credits: 3 },
        ],
      },
      {
        title: 'Level 2 Semester 2',
        subjects: [
          { code: 'CCS1306', name: 'Information Security', grade: 'Pending', credits: 3 },
          { code: 'CCS2302', name: 'Cloud Computing Fundamentals', grade: 'Pending', credits: 3 },
          { code: 'CCS2311', name: 'Human Factors in Computer Systems', grade: 'Pending', credits: 3 },
          { code: 'CCS2313', name: 'Project Management', grade: 'Pending', credits: 3 },
          { code: 'SMA2306', name: 'Probability & Statistics', grade: 'Pending', credits: 3 },
        ],
      },
      {
        title: 'Level 3 Semester 1',
        subjects: [
          { code: 'CCS2360', name: 'Technology Challenge Competition', grade: 'Pending', credits: 3 },
          { code: 'CCS3304', name: 'Cyber Security Domains and Tools', grade: 'Pending', credits: 3 },
          { code: 'CCS3305', name: 'Cyber Law, Regulations and Policies', grade: 'Pending', credits: 3 },
          { code: 'CCS4330', name: 'Network Security', grade: 'Pending', credits: 3 },
          { code: 'CCS3300', name: 'Software Architecture', grade: 'Pending', credits: 3 },
          { code: 'CCS3307', name: 'Data Warehousing', grade: 'Pending', credits: 3 },
          { code: 'CCS3308', name: 'Virtualization and Containers', grade: 'Pending', credits: 3 },
          { code: 'CCS3310', name: 'Software Engineering Methods', grade: 'Pending', credits: 3 },
          { code: 'CCS3311', name: 'Software Quality Assurance', grade: 'Pending', credits: 3 },
          { code: 'CCS3356', name: 'Natural Language Processing', grade: 'Pending', credits: 3 },
          { code: 'CCS4322', name: 'Cloud Security and Privacy', grade: 'Pending', credits: 3 },
        ],
      },
      {
        title: 'Level 3 Semester 2',
        subjects: [
          { code: 'CCS3302', name: 'Introduction to Research Methods', grade: 'Pending', credits: 3 },
          { code: 'CCS3317', name: 'Advanced Cryptography', grade: 'Pending', credits: 3 },
          { code: 'SMA2307', name: 'Discrete Mathematics', grade: 'Pending', credits: 3 },
          { code: 'CCS3309', name: 'Big Data', grade: 'Pending', credits: 3 },
          { code: 'CCS3312', name: 'Cloud Application Development', grade: 'Pending', credits: 3 },
          { code: 'CCS3313', name: 'Advanced Software Design', grade: 'Pending', credits: 3 },
          { code: 'CCS3316', name: 'Cloud Infrastructure Design', grade: 'Pending', credits: 3 },
          { code: 'CCS3318', name: 'Digital Forensics', grade: 'Pending', credits: 3 },
          { code: 'CCS3342', name: 'Business Intelligence (Business Analytics)', grade: 'Pending', credits: 3 },
          { code: 'CCS3351', name: 'Mobile Application Development', grade: 'Pending', credits: 3 },
          { code: 'CCS4340', name: 'Machine Learning', grade: 'Pending', credits: 3 },
          { code: 'SMA1301', name: 'Intermediate Elective', grade: 'Pending', credits: 3 },
          { code: 'SMA2202', name: 'Linear Algebra', grade: 'Pending', credits: 3 },
        ],
      },
    ],
  },
  {
    id: 'al',
    program: 'Advanced Level - 2022',
    institution: 'Prince College',
    status: 'School qualification',
    summary:
      'A/L subjects are useful to show because they connect business knowledge with ICT.',
    subjects: [
      { name: 'Accounting', grade: 'Add grade' },
      { name: 'Business Studies', grade: 'Add grade' },
      { name: 'ICT', grade: 'Add grade' },
    ],
  },
  {
    id: 'ol',
    program: 'Ordinary Level - 2018',
    institution: 'Prince College',
    status: 'School qualification',
    summary:
      'O/L subjects can stay on the detailed page so the main portfolio remains clean.',
    subjects: [
      { name: 'ICT', grade: 'Add grade' },
      { name: 'Mathematics', grade: 'Add grade' },
      { name: 'Science', grade: 'Add grade' },
      { name: 'English', grade: 'Add grade' },
      { name: 'Sinhala', grade: 'Add grade' },
      { name: 'History', grade: 'Add grade' },
      { name: 'Art', grade: 'Add grade' },
      { name: 'Civic Studies', grade: 'Add grade' },
    ],
  },
];

export const certifications = [
  { name: 'Diploma in Computer Application', icon: Monitor },
  { name: 'Diploma in Computer Science', icon: Code },
  { name: 'Cisco Networking Get Connected Course', icon: Network },
  { name: 'Information Technology Graphic Design Course', icon: PenTool },
  { name: 'AAT Level II Complete', icon: Calculator },
];

export const projects = [
  {
    title: 'E-Waste Management Platform',
    stack: 'React, Node.js',
    category: 'Featured project',
    featured: true,
    featuredRank: 1,
    description:
      'Operations-focused platform for e-waste collection, item tracking, and workflow management.',
    statusText: 'In development',
    statusTone: 'development',
    actions: [
      { label: 'Case study soon', disabled: true, variant: 'primary' },
      { label: 'Private build', disabled: true, variant: 'secondary' },
    ],
  },
  {
    title: 'Hospital Management System',
    stack: 'C#, MS SQL',
    category: 'Featured project',
    featured: true,
    featuredRank: 2,
    description:
      'Desktop system for patient registration, appointments, and medical record handling.',
    statusText: 'Demo available',
    statusTone: 'live',
    previewUrl: 'https://drive.google.com/file/d/1Za2u6upxxo6r7JycLeYuEjog8EDa7Rm4/view?usp=sharing',
    actions: [
      {
        label: 'GitHub repository',
        href: 'https://github.com/12345akindu/hospital_Management_System_C-',
        variant: 'primary',
      },
      {
        label: 'Demo video',
        href: 'https://drive.google.com/file/d/1Za2u6upxxo6r7JycLeYuEjog8EDa7Rm4/view?usp=sharing',
        variant: 'secondary',
      },
    ],
    previewImage: './images/optimized/hospital-management-thumbnail-900.jpg',
    previewAlt: 'Thumbnail preview for the Hospital Management System demo video.',
  },
  {
    title: 'Personal Portfolio Website',
    stack: 'React, Vite, Frontend UI',
    category: 'Featured project',
    featured: true,
    featuredRank: 3,
    description:
      'Responsive portfolio interface for presenting skills, project work, and experience clearly.',
    statusText: 'Live project',
    statusTone: 'live',
    actions: [
      {
        label: 'Live portfolio',
        href: 'https://12345akindu.github.io/akindu-portfolio/',
        variant: 'primary',
      },
      {
        label: 'GitHub repository',
        href: 'https://github.com/12345akindu/akindu-portfolio',
        variant: 'secondary',
      },
    ],
  },
  {
    title: 'School Management System',
    stack: 'Laravel, PHP, MySQL',
    category: 'Supporting project',
    description:
      'Attendance-focused school system built for parent updates and daily record tracking.',
    statusText: 'Private project',
    statusTone: 'private',
    actions: [
      { label: 'Private build', disabled: true, variant: 'primary' },
      { label: 'Details on request', disabled: true, variant: 'secondary' },
    ],
  },
];

export const experience = [
  {
    period: '2023 Jun - 2024 May',
    title: 'Animator | UNICEF Cash Plus Project at Sarvodaya Rathnapura',
    text: 'Supported community-based nutrition promotion, monitoring, and capacity development for a humanitarian cash transfer programme.',
    images: [
      {
        src: './images/experience/sarvodaya-animator.jpg',
        alt: 'Akindu Imantha as Animator at Sarvodaya Rathnapura.',
      },
      {
        src: './images/optimized/unicef-cash-plus-poster-900.jpg',
        alt: 'UNICEF Cash Plus Project poster for Rathnapura Division.',
      },
    ],
  },
  {
    period: '2023 Aug - 2024 Jun',
    title: 'Youth Leadership for Climate Action Programme',
    text: 'Took part in the British Council climate action programme to build knowledge, skills, and collaboration for sustainable projects.',
    images: [
      {
        src: './images/optimized/ylca-team-1200.jpg',
        alt: 'Akindu Imantha with the Youth Leadership for Climate Action team.',
      },
      {
        src: './images/optimized/ylca-poster-900.jpg',
        alt: 'Youth Leadership for Climate Action project poster about enhancing waste recycling for a cleaner city.',
      },
    ],
  },
];

export const contactLinks = [
  {
    href: 'mailto:akindu666imantha@gmail.com',
    label: 'akindu666imantha@gmail.com',
    icon: Mail,
  },
  {
    href: 'https://github.com/akindu-imantha',
    label: 'github.com/akindu-imantha',
    icon: Code,
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/akindu-rupasingha',
    label: 'linkedin.com/in/akindu-rupasingha',
    icon: Network,
    external: true,
  },
  {
    href: 'https://www.behance.net/akinduimantha',
    label: 'behance.net/akinduimantha',
    icon: PenTool,
    external: true,
  },
];

export const tabs = [
  { id: 'about', icon: User, command: './about.sh', label: 'About' },
  { id: 'education', icon: GraduationCap, command: './education.sh', label: 'Education' },
  { id: 'skills', icon: Code, command: './skills.sh', label: 'Skills' },
  { id: 'projects', icon: FolderGit2, command: './projects.sh', label: 'Projects' },
  { id: 'experience', icon: Briefcase, command: './experience.sh', label: 'Experience' },
  { id: 'contact', icon: Mail, command: './contact.sh', label: 'Contact' },
];

const englishContent = {
  heroData,
  focusAreas,
  aboutCards,
  technicalSkills,
  tools,
  creativeProfile,
  githubActivity,
  imageBar,
  education,
  academicGrades,
  certifications,
  projects,
  experience,
  contactLinks,
  tabs,
  sections: {
    about: {
      eyebrow: './about.sh',
      title: 'A practical, user-focused IT undergraduate.',
      text:
        'I build digital experiences that combine practical software development, creative design, and security-minded thinking.',
    },
    education: {
      eyebrow: './education.sh',
      title: 'Academic background',
      text:
        'My studies combine school qualifications, undergraduate IT learning, and completed courses or certifications that support my technical foundation.',
    },
    skills: {
      eyebrow: './skills.sh',
      title: 'Technical capabilities',
      text:
        'This section focuses on the technical skills, tools, and software I use across development and creative work.',
    },
    projects: {
      eyebrow: './projects.sh',
      title: 'Selected work',
      text:
        'The strongest builds are highlighted first, while private and supporting work stays visible in a cleaner secondary layout.',
    },
    experience: {
      eyebrow: './experience.sh',
      title: 'Leadership and community involvement',
      text:
        'My background also includes programme participation and field-based work that developed communication and coordination skills.',
    },
    contact: {
      eyebrow: './contact.sh',
      title: 'Get in touch',
      text: 'Open for opportunities, collaboration, and portfolio discussions.',
    },
  },
  ui: {
    terminal: 'Terminal',
    languageToggleLabel: 'Switch to Sinhala',
    themeToggleLabel: 'Toggle light and dark mode',
    searchPlaceholder: "grep -i 'search...'",
    searchLabel: 'Search portfolio content',
    nowViewing: 'Now viewing',
    search: 'Search',
    searchResults: 'Search results',
    noResults: 'No results found',
    noResultsText: 'Could not find anything matching',
    resultsFor: 'Results for',
    resultsText: 'Here is everything matching your query across all sections.',
    matchingSkills: 'Matching Skills & Tools',
    matchingProjects: 'Matching Projects',
    matchingExperience: 'Matching Experience',
    matchingLinks: 'Matching Links',
    more: 'More',
    scrollHint: 'More below',
    coursesTitle: 'Courses and certifications',
    gradesButton: 'View subjects and grades',
    gradesBack: 'Back to portfolio',
    gradesEyebrow: './grades.sh',
    gradesTitle: 'Subjects and grades',
    gradesText:
      'A detailed academic view for visitors who want to check completed subjects and results without crowding the main education section.',
    programmingTitle: 'Programming and web',
    toolsTitle: 'Tools and creative software',
    creativeProfile: 'Creative profile',
    githubEyebrow: 'github activity',
    githubProfileLink: 'View GitHub',
    githubLoading: 'Loading latest GitHub activity...',
    githubUnavailable:
      'Live GitHub contributions need the backend GitHub API settings to be configured.',
    additionalWork: 'Additional work',
    supportingBuilds: 'Supporting and private builds',
    supportingBuildsText:
      'Smaller or non-public projects stay grouped separately, so the main work gets a stronger first impression.',
  },
};


const cleanSinhalaContent = {
  ...englishContent,
  heroData: {
    ...heroData,
    eyebrow: 'Full Stack Developer Portfolio',
    intro:
      'à¶´à·Šâ€à¶»à·à¶ºà·à¶œà·’à¶š web interfaces, backend presentation, à·ƒà·„ web/desktop application development à¶œà·à¶± à¶…à·€à¶°à·à¶±à¶º à¶¯à·™à¶± Information Technology undergraduate à¶šà·™à¶±à·™à¶šà·Š.',
    primaryAction: { ...heroData.primaryAction, label: 'à·€à·’à·ƒà·Šà¶­à¶» à¶¶à¶½à¶±à·Šà¶±' },
    secondaryAction: { ...heroData.secondaryAction, label: 'CV à¶¶à·à¶œà¶±à·Šà¶±' },
    tertiaryAction: { ...heroData.tertiaryAction, label: 'GitHub' },
    profileLabel: 'Profile à·ƒà·à¶»à·à¶‚à·à¶º',
    profileTitle: 'Online presentation à¶‘à¶šà¶šà¶§ à¶´à·à·„à·à¶¯à·’à¶½à·’, polish à¶šà·… à·€à·à¶© à¶±à·’à¶»à·Šà¶¸à·à¶«à¶º à¶šà·’à¶»à·“à¶¸',
    profileText:
      'à¶¸à¶œà·š à¶´à·ƒà·”à¶¶à·’à¶¸ academic IT study, graphic tools, web development foundations, à·ƒà·„ hands-on project work à¶‘à¶šà¶§ à¶‘à¶šà¶­à·” à·€à·™à¶±à·€à·.',
  },
  focusAreas: [
    'React portfolio interfaces',
    'Responsive web design',
    'C# desktop application development',
    'HTML, CSS, JavaScript, à·ƒà·„ PHP',
  ],
  aboutCards: [
    {
      title: 'à·€à¶»à·Šà¶­à¶¸à·à¶± à¶¯à·’à·à·à·€',
      text:
        'IT undergraduate à¶šà·™à¶±à·™à¶šà·Š à·€à·’à¶¯à·’à·„à¶§ practical software solutions, clear interfaces, à·ƒà·„ real user workflows à·€à·’à·ƒà¶³à¶± systems à¶œà·œà¶©à¶±à·à¶œà·“à¶¸ à¶œà·à¶± à¶…à·€à¶°à·à¶±à¶º à¶¯à·™à¶¸à·’.',
    },
    {
      title: 'à¶­à·à¶šà·Šà·‚à¶«à·’à¶š à¶´à¶»à·à·ƒà¶º',
      text:
        'Frontend development, desktop application work, database-backed systems, React, C#, PHP, Laravel, à·ƒà·„ MySQL à¶¸à¶œà·š experience à¶‘à¶šà¶§ à¶‡à¶­à·”à·…à¶­à·Š à·€à·š.',
    },
    {
      title: 'Project approach',
      text:
        'à¶¸à¶¸ structured, usable, à·ƒà·„ present à¶šà¶»à¶±à·Šà¶± à¶´à·„à·ƒà·” à·€à·à¶© à¶œà·œà¶©à¶±à¶œà¶± à¶…à¶­à¶» layout quality, clean workflows, à·ƒà·„ practical implementation à¶œà·à¶± à¶…à·€à¶°à·à¶±à¶º à¶¯à·™à¶¸à·’.',
    },
    {
      title: 'à·€à·™à¶±à¶­à·Š à·à¶šà·Šà¶­à·“à¶±à·Š',
      text:
        'Coding à·€à¶½à¶§ à¶…à¶¸à¶­à¶»à·€ graphic tools, documentation, à·ƒà·„ community project experience à¶¸à¶œà·š technical execution à·ƒà·„ communication à¶‘à¶šà¶§ à·ƒà·„à·à¶º à¶¯à¶šà·Šà·€à¶ºà·’.',
    },
  ],
  creativeProfile: {
    ...creativeProfile,
    title: 'Graphic design presence',
    text:
      'Behance à·„à¶»à·„à· à¶¸à¶¸ visual work publish à¶šà¶»à¶± à¶…à¶­à¶» layout-focused design pieces à·ƒà·„ creative presentation skills à¶‘à·„à·’ à¶¯à·à¶šà¶œà¶­ à·„à·à¶š.',
    link: { ...creativeProfile.link, label: 'Behance profile à¶¶à¶½à¶±à·Šà¶±' },
  },
  education: [
    {
      ...education[0],
      text:
        'First year diploma level à·ƒà·„ second year higher diploma level coursework à·„à¶»à·„à· undergraduate level studies à·ƒà¶¸à·Šà¶´à·–à¶»à·Šà¶« à¶šà¶» à¶‡à¶­.',
      gradeButtonLabel: 'Moratuwa grades à¶¶à¶½à¶±à·Šà¶±',
    },
    {
      ...education[1],
      text:
        'Secure systems, networking, à·ƒà·„ practical information security foundations à¶œà·à¶± à¶…à·€à¶°à·à¶±à¶º à¶¯à·™à¶± cyber security degree studies à¶šà¶»à¶¸à·’à¶±à·Š à·ƒà·’à¶§à·“.',
      gradeButtonLabel: 'SLTC grades à¶¶à¶½à¶±à·Šà¶±',
    },
    {
      ...education[2],
      text: [
        'A/L 2022: Accounting, Business Studies, à·ƒà·„ ICT.',
        'O/L 2018: ICT, Mathematics, Science, English, Sinhala, History, Art, à·ƒà·„ Civic Studies.',
      ],
    },
  ],
  academicGrades: [
    {
      ...academicGrades[0],
      summary:
        'Official results confirm à¶šà·…à·à¶¸ subjects à·ƒà·„ grades à¶¸à·™à·„à·’ à¶´à·™à¶±à·Šà·€à·’à¶º à·„à·à¶š.',
    },
    {
      ...academicGrades[1],
      summary:
        'Current degree modules in-progress à¶½à·™à·ƒ à¶´à·™à¶±à·Šà·€à·, results release à·€à·– à¶´à·ƒà·” grades update à¶šà¶»à¶±à·Šà¶±.',
    },
    {
      ...academicGrades[2],
      summary:
        'A/L subjects business knowledge à·ƒà·„ ICT background à¶‘à¶š à¶´à·™à¶±à·Šà·€à·“à¶¸à¶§ useful à·€à·š.',
    },
    {
      ...academicGrades[3],
      summary:
        'Main portfolio à¶‘à¶š clean à¶­à¶¶à·à¶œà·™à¶± O/L subjects detailed page à¶‘à¶šà·š à¶´à·™à¶±à·Šà·€à·’à¶º à·„à·à¶š.',
    },
  ],
  projects: [
    {
      ...projects[0],
      category: 'à¶´à·Šâ€à¶»à¶°à·à¶± project',
      description:
        'E-waste collection, item tracking, à·ƒà·„ workflow management à·ƒà¶³à·„à· operations-focused platform à¶‘à¶šà¶šà·Š.',
      statusText: 'Development à·€à·™à¶¸à·’à¶±à·Š',
    },
    {
      ...projects[1],
      category: 'à¶´à·Šâ€à¶»à¶°à·à¶± project',
      description:
        'Patient registration, appointments, à·ƒà·„ medical record handling à·ƒà¶³à·„à· desktop system à¶‘à¶šà¶šà·Š.',
      statusText: 'Demo à¶­à·’à¶¶à·š',
      previewLabel: 'Demo à¶¶à¶½à¶±à·Šà¶±',
    },
    {
      ...projects[2],
      category: 'à¶´à·Šâ€à¶»à¶°à·à¶± project',
      description:
        'Skills, project work, à·ƒà·„ experience à¶´à·à·„à·à¶¯à·’à¶½à·’à·€ à¶´à·™à¶±à·Šà·€à·“à¶¸à¶§ responsive portfolio interface à¶‘à¶šà¶šà·Š.',
    },
    {
      ...projects[3],
      category: 'Supporting project',
      description:
        'Parent updates à·ƒà·„ daily record tracking à·ƒà¶³à·„à· attendance-focused school system à¶‘à¶šà¶šà·Š.',
    },
  ],
  experience: [
    {
      ...experience[0],
      text:
        'Humanitarian cash transfer programme à¶‘à¶šà¶šà·Š à·ƒà¶³à·„à· community-based nutrition promotion, monitoring, à·ƒà·„ capacity development à·€à¶½à¶§ à·ƒà·„à·à¶º à·€à·’à¶º.',
    },
    {
      ...experience[1],
      text:
        'Sustainable projects à·ƒà¶³à·„à· knowledge, skills, à·ƒà·„ collaboration à¶œà·œà¶©à¶±à·à¶œà·“à¶¸à¶§ British Council climate action programme à¶‘à¶šà¶§ à·ƒà·„à¶·à·à¶œà·“ à·€à·’à¶º.',
    },
  ],
  tabs: [
    { ...tabs[0], label: 'à¶¸à· à¶œà·à¶±' },
    { ...tabs[1], label: 'à¶…à¶°à·Šâ€à¶ºà·à¶´à¶±à¶º' },
    { ...tabs[2], label: 'à¶šà·”à·ƒà¶½à¶­à·' },
    { ...tabs[3], label: 'à·€à·Šâ€à¶ºà·à¶´à·˜à¶­à·’' },
    { ...tabs[4], label: 'à¶…à¶­à·Šà¶¯à·à¶šà·“à¶¸à·Š' },
    { ...tabs[5], label: 'à·ƒà¶¸à·Šà¶¶à¶±à·Šà¶° à·€à¶±à·Šà¶±' },
  ],
  sections: {
    about: {
      eyebrow: './about.sh',
      title: 'Practical à·ƒà·„ user-focused IT undergraduate à¶šà·™à¶±à·™à¶šà·Š.',
      text:
        'Practical software development, creative design, à·ƒà·„ security-minded thinking à¶‘à¶šà¶§ à¶‘à¶šà·Šà¶šà¶»à¶½à· digital experiences à¶œà·œà¶©à¶±à¶œà¶±à·€à·.',
    },
    education: {
      eyebrow: './education.sh',
      title: 'à¶…à¶°à·Šâ€à¶ºà·à¶´à¶± à¶´à·ƒà·”à¶¶à·’à¶¸',
      text:
        'School qualifications, undergraduate IT learning, à·ƒà·„ completed courses/certifications à¶¸à¶œà·š technical foundation à¶‘à¶šà¶§ à·ƒà·„à·à¶º à¶¯à¶šà·Šà·€à¶ºà·’.',
    },
    skills: {
      eyebrow: './skills.sh',
      title: 'à¶­à·à¶šà·Šà·‚à¶«à·’à¶š à·„à·à¶šà·’à¶ºà·à·€à¶±à·Š',
      text:
        'Development à·ƒà·„ creative work à·ƒà¶³à·„à· à¶¸à¶¸ à¶·à·à·€à·’à¶­à· à¶šà¶»à¶± technical skills, tools, à·ƒà·„ software à¶¸à·™à·„à·’ à¶´à·™à¶±à·Šà·€à¶ºà·’.',
    },
    projects: {
      eyebrow: './projects.sh',
      title: 'à¶­à·à¶»à·à¶œà¶­à·Š à·€à·à¶©',
      text:
        'à·à¶šà·Šà¶­à·’à¶¸à¶­à·Š builds à¶‰à·„à·…à·’à¶±à·Š à¶´à·™à¶±à·Šà·€à·, private à·ƒà·„ supporting work à·€à·™à¶±à¶¸ layout à¶‘à¶šà¶šà·’à¶±à·Š à¶´à·™à¶±à·Šà·€à· à¶‡à¶­.',
    },
    experience: {
      eyebrow: './experience.sh',
      title: 'Leadership à·ƒà·„ community involvement',
      text:
        'Communication à·ƒà·„ coordination skills à·€à¶»à·Šà¶°à¶±à¶º à¶šà·… programme participation à·ƒà·„ field-based work à¶¸à¶œà·š à¶´à·ƒà·”à¶¶à·’à¶¸à¶§ à¶‡à¶­à·”à·…à¶­à·Š à·€à·š.',
    },
    contact: {
      eyebrow: './contact.sh',
      title: 'à·ƒà¶¸à·Šà¶¶à¶±à·Šà¶° à·€à¶±à·Šà¶±',
      text: 'Opportunities, collaboration, à·ƒà·„ portfolio discussions à·ƒà¶³à·„à· à·ƒà¶¸à·Šà¶¶à¶±à·Šà¶° à·€à·’à¶º à·„à·à¶š.',
    },
  },
  ui: {
    ...englishContent.ui,
    terminal: 'à¶§à¶»à·Šà¶¸à·’à¶±à¶½à·Š',
    languageToggleLabel: 'Switch to English',
    searchPlaceholder: "grep -i 'à·ƒà·œà¶ºà¶±à·Šà¶±...'",
    searchLabel: 'Portfolio content à·ƒà·œà¶ºà¶±à·Šà¶±',
    nowViewing: 'à¶¯à·à¶±à¶§ à¶¶à¶½à¶±à·Šà¶±à·š',
    search: 'à·ƒà·™à·€à·“à¶¸',
    searchResults: 'à·ƒà·™à·€à·“à¶¸à·Š à¶´à·Šâ€à¶»à¶­à·’à¶µà¶½',
    noResults: 'à¶´à·Šâ€à¶»à¶­à·’à¶µà¶½ à¶±à·à¶­',
    noResultsText: 'à¶¸à·™à¶ºà¶§ à¶œà·à¶½à¶´à·™à¶± à¶šà·’à·ƒà·’à·€à¶šà·Š à·„à¶¸à·” à¶±à·œà·€à·“à¶º',
    resultsFor: 'à¶´à·Šâ€à¶»à¶­à·’à¶µà¶½',
    resultsText: 'à¶”à¶¶à·š search à¶‘à¶šà¶§ à¶œà·à¶½à¶´à·™à¶± à·ƒà·’à¶ºà¶½à·” à¶šà·œà¶§à·ƒà·Š à¶¸à·™à·„à·’ à¶¯à·à¶šà·Šà·€à·š.',
    matchingSkills: 'à¶œà·à¶½à¶´à·™à¶± à¶šà·”à·ƒà¶½à¶­à· à·ƒà·„ à¶¸à·™à·€à¶½à¶¸à·Š',
    matchingProjects: 'à¶œà·à¶½à¶´à·™à¶± à·€à·Šâ€à¶ºà·à¶´à·˜à¶­à·’',
    matchingExperience: 'à¶œà·à¶½à¶´à·™à¶± à¶…à¶­à·Šà¶¯à·à¶šà·“à¶¸à·Š',
    matchingLinks: 'à¶œà·à¶½à¶´à·™à¶± à·ƒà¶¶à·à¶³à·’',
    more: 'à¶­à·€',
    scrollHint: 'à¶­à·€ à¶´à·„à·…à¶§',
    coursesTitle: 'Courses à·ƒà·„ certifications',
    gradesButton: 'Subjects à·ƒà·„ grades à¶¶à¶½à¶±à·Šà¶±',
    gradesBack: 'Portfolio à¶‘à¶šà¶§ à¶†à¶´à·ƒà·”',
    gradesEyebrow: './grades.sh',
    gradesTitle: 'Subjects à·ƒà·„ grades',
    gradesText:
      'Main education section à¶‘à¶š crowd à¶±à·œà¶šà¶», visitors à¶½à¶§ completed subjects à·ƒà·„ results à¶¶à¶½à¶±à·Šà¶± à·€à·™à¶±à¶¸ academic view à¶‘à¶šà¶šà·Š.',
    programmingTitle: 'Programming à·ƒà·„ web',
    toolsTitle: 'Tools à·ƒà·„ creative software',
    creativeProfile: 'Creative profile',
    githubEyebrow: 'github activity',
    githubProfileLink: 'GitHub à¶¶à¶½à¶±à·Šà¶±',
    githubLoading: 'Latest GitHub activity load à·€à·™à¶¸à·’à¶±à·Š...',
    githubUnavailable:
      'Live GitHub contributions à¶´à·™à¶±à·Šà·€à·“à¶¸à¶§ backend GitHub API settings configure à¶šà·… à¶ºà·”à¶­à·”à¶ºà·’.',
    additionalWork: 'à¶…à¶¸à¶­à¶» à·€à·à¶©',
    supportingBuilds: 'Supporting à·ƒà·„ private builds',
    supportingBuildsText:
      'à¶šà·”à¶©à· à·„à· non-public projects à·€à·™à¶±à¶¸ group à¶šà¶» à¶‡à¶­à·’ à¶±à·’à·ƒà· main work à¶‘à¶šà¶§ à¶´à·à·„à·à¶¯à·’à¶½à·’ first impression à¶‘à¶šà¶šà·Š à¶½à·à¶¶à·š.',
  },
};

export const portfolioContent = {
  en: englishContent,
  si: cleanSinhalaContent,
};


