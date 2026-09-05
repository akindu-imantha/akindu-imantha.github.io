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


/*
 * Legacy Sinhala copy retained temporarily for source-history reference only.
 * It contains irreversible replacement characters and must never be compiled
 * or used as translation data. The active Sinhala content is defined below.
const cleanSinhalaContent = {
  ...englishContent,
  heroData: {
    ...heroData,
    eyebrow: 'Full Stack Developer Portfolio',
    intro:
      'ප�`‍රායෝ�S��a web interfaces, backend presentation, ි� web/desktop application development �Sැන �&වධානය ද�"න Information Technology undergraduate �a�"න�"�a�`.',
    primaryAction: { ...heroData.primaryAction, label: 'ව�ි�`තර බලන�`න' },
    secondaryAction: { ...heroData.secondaryAction, label: 'CV බා�Sන�`න' },
    tertiaryAction: { ...heroData.tertiaryAction, label: 'GitHub' },
    profileLabel: 'Profile ිාරා�ශය',
    profileTitle: 'Online presentation ��a�aට පැ�ැද�ල�, polish �a�& වැඩ න�ර�`මාණය �a�ර�ම',
    profileText:
      'ම�S�a පි�බ�ම academic IT study, graphic tools, web development foundations, ි� hands-on project work ��aට ��aත� ව�"නවා.',
  },
  focusAreas: [
    'React portfolio interfaces',
    'Responsive web design',
    'C# desktop application development',
    'HTML, CSS, JavaScript, ි� PHP',
  ],
  aboutCards: [
    {
      title: 'වර�`තමාන ද�ශාව',
      text:
        'IT undergraduate �a�"න�"�a�` ව�ද��ට practical software solutions, clear interfaces, ි� real user workflows ව�ිඳන systems �S�Sඩනැ�S�ම �Sැන �&වධානය ද�"ම�.',
    },
    {
      title: 'තා�a�`�ණ��a පරාිය',
      text:
        'Frontend development, desktop application work, database-backed systems, React, C#, PHP, Laravel, ි� MySQL ම�S�a experience ��aට �!ත��&ත�` ව�a.',
    },
    {
      title: 'Project approach',
      text:
        'මම structured, usable, ි� present �aරන�`න ප�ි� වැඩ �S�Sඩන�Sන �&තර layout quality, clean workflows, ි� practical implementation �Sැන �&වධානය ද�"ම�.',
    },
    {
      title: 'ව�"නත�` ශ�a�`ත�න�`',
      text:
        'Coding වලට �&මතරව graphic tools, documentation, ි� community project experience ම�S�a technical execution ි� communication ��aට ි�ාය ද�a�`වය�.',
    },
  ],
  creativeProfile: {
    ...creativeProfile,
    title: 'Graphic design presence',
    text:
      'Behance �ර�ා මම visual work publish �aරන �&තර layout-focused design pieces ි� creative presentation skills ��� දැ�a�Sත �ැ�a.',
    link: { ...creativeProfile.link, label: 'Behance profile බලන�`න' },
  },
  education: [
    {
      ...education[0],
      text:
        'First year diploma level ි� second year higher diploma level coursework �ර�ා undergraduate level studies ිම�`ප�ර�`ණ �aර �!ත.',
      gradeButtonLabel: 'Moratuwa grades බලන�`න',
    },
    {
      ...education[1],
      text:
        'Secure systems, networking, ි� practical information security foundations �Sැන �&වධානය ද�"න cyber security degree studies �aරම�න�` ි�ට�.',
      gradeButtonLabel: 'SLTC grades බලන�`න',
    },
    {
      ...education[2],
      text: [
        'A/L 2022: Accounting, Business Studies, ි� ICT.',
        'O/L 2018: ICT, Mathematics, Science, English, Sinhala, History, Art, ි� Civic Studies.',
      ],
    },
  ],
  academicGrades: [
    {
      ...academicGrades[0],
      summary:
        'නිල ප්‍රතිඵල අනුව සම්පූර්ණ කළ විෂයයන් සහ ශ්‍රේණි මෙහි පෙන්විය හැක.',
    },
    {
      ...academicGrades[1],
      summary:
        'වත්මන් උපාධි මොඩියුල ක්‍රියාත්මක වෙමින් පවතින ලෙස පෙන්වා, ප්‍රතිඵල නිකුත් වූ පසු ශ්‍රේණි යාවත්කාලීන කරන්න.',
    },
    {
      ...academicGrades[2],
      summary:
        'A/L subjects business knowledge ි� ICT background ��a ප�"න�`ව�මට useful ව�a.',
    },
    {
      ...academicGrades[3],
      summary:
        'Main portfolio ��a clean තබා�S�"න O/L subjects detailed page ��a�a ප�"න�`ව�ය �ැ�a.',
    },
  ],
  projects: [
    {
      ...projects[0],
      category: 'ප�`‍රධාන project',
      description:
        'E-waste collection, item tracking, ි� workflow management ිඳ�ා operations-focused platform ��a�a�`.',
      statusText: 'Development ව�"ම�න�`',
    },
    {
      ...projects[1],
      category: 'ප�`‍රධාන project',
      description:
        'Patient registration, appointments, ි� medical record handling ිඳ�ා desktop system ��a�a�`.',
      statusText: 'Demo ත�බ�a',
      previewLabel: 'Demo බලන�`න',
    },
    {
      ...projects[2],
      category: 'ප�`‍රධාන project',
      description:
        'Skills, project work, ි� experience පැ�ැද�ල�ව ප�"න�`ව�මට responsive portfolio interface ��a�a�`.',
    },
    {
      ...projects[3],
      category: 'Supporting project',
      description:
        'Parent updates ි� daily record tracking ිඳ�ා attendance-focused school system ��a�a�`.',
    },
  ],
  experience: [
    {
      ...experience[0],
      text:
        'Humanitarian cash transfer programme ��a�a�` ිඳ�ා community-based nutrition promotion, monitoring, ි� capacity development වලට ි�ාය ව�ය.',
    },
    {
      ...experience[1],
      text:
        'Sustainable projects ිඳ�ා knowledge, skills, ි� collaboration �S�Sඩනැ�S�මට British Council climate action programme ��aට ි�භා�S� ව�ය.',
    },
  ],
  tabs: [
    { ...tabs[0], label: 'මා �Sැන' },
    { ...tabs[1], label: '�&ධ�`‍යාපනය' },
    { ...tabs[2], label: '�a�ිලතා' },
    { ...tabs[3], label: 'ව�`‍යාප��ත�' },
    { ...tabs[4], label: '�&ත�`දැ�a�ම�`' },
    { ...tabs[5], label: 'ිම�`බන�`ධ වන�`න' },
  ],
  sections: {
    about: {
      eyebrow: './about.sh',
      title: 'Practical ි� user-focused IT undergraduate �a�"න�"�a�`.',
      text:
        'Practical software development, creative design, ි� security-minded thinking ��aට ��a�`�aරලා digital experiences �S�Sඩන�Sනවා.',
    },
    education: {
      eyebrow: './education.sh',
      title: '�&ධ�`‍යාපන පි�බ�ම',
      text:
        'School qualifications, undergraduate IT learning, ි� completed courses/certifications ම�S�a technical foundation ��aට ි�ාය ද�a�`වය�.',
    },
    skills: {
      eyebrow: './skills.sh',
      title: 'තා�a�`�ණ��a �ැ�a�යාවන�`',
      text:
        'Development ි� creative work ිඳ�ා මම භාව�තා �aරන technical skills, tools, ි� software ම�"�� ප�"න�`වය�.',
    },
    projects: {
      eyebrow: './projects.sh',
      title: 'තෝරා�Sත�` වැඩ',
      text:
        'ශ�a�`ත�මත�` builds �0��&�න�` ප�"න�`වා, private ි� supporting work ව�"නම layout ��a�a�න�` ප�"න�`වා �!ත.',
    },
    experience: {
      eyebrow: './experience.sh',
      title: 'Leadership ි� community involvement',
      text:
        'Communication ි� coordination skills වර�`ධනය �a�& programme participation ි� field-based work ම�S�a පි�බ�මට �!ත��&ත�` ව�a.',
    },
    contact: {
      eyebrow: './contact.sh',
      title: 'ිම�`බන�`ධ වන�`න',
      text: 'Opportunities, collaboration, ි� portfolio discussions ිඳ�ා ිම�`බන�`ධ ව�ය �ැ�a.',
    },
  },
  ui: {
    ...englishContent.ui,
    terminal: 'ටර�`ම�නල�`',
    languageToggleLabel: 'Switch to English',
    searchPlaceholder: "grep -i 'ි�Sයන�`න...'",
    searchLabel: 'Portfolio content ි�Sයන�`න',
    nowViewing: 'දැනට බලන�`න�a',
    search: 'ි�"ව�ම',
    searchResults: 'ි�"ව�ම�` ප�`‍රත�ඵල',
    noResults: 'ප�`‍රත�ඵල නැත',
    noResultsText: 'ම�"යට �Sැලප�"න �a�ි�ව�a�` �ම� න�Sව�ය',
    resultsFor: 'ප�`‍රත�ඵල',
    resultsText: '�බ�a search ��aට �Sැලප�"න ි�යල� �a�Sටි�` ම�"�� දැ�a�`ව�a.',
    matchingSkills: '�Sැලප�"න �a�ිලතා ි� ම�"වලම�`',
    matchingProjects: '�Sැලප�"න ව�`‍යාප��ත�',
    matchingExperience: '�Sැලප�"න �&ත�`දැ�a�ම�`',
    matchingLinks: '�Sැලප�"න ිබැඳ�',
    more: 'තව',
    scrollHint: 'තව ප��&ට',
    coursesTitle: 'Courses ි� certifications',
    gradesButton: 'Subjects ි� grades බලන�`න',
    gradesBack: 'Portfolio ��aට � පි�',
    gradesEyebrow: './grades.sh',
    gradesTitle: 'Subjects ි� grades',
    gradesText:
      'Main education section ��a crowd න�S�aර, visitors ලට completed subjects ි� results බලන�`න ව�"නම academic view ��a�a�`.',
    programmingTitle: 'Programming ි� web',
    toolsTitle: 'Tools ි� creative software',
    creativeProfile: 'Creative profile',
    githubEyebrow: 'github activity',
    githubProfileLink: 'GitHub බලන�`න',
    githubLoading: 'Latest GitHub activity load ව�"ම�න�`...',
    githubUnavailable:
      'Live GitHub contributions ප�"න�`ව�මට backend GitHub API settings configure �a�& ය�ත�ය�.',
    additionalWork: '�&මතර වැඩ',
    supportingBuilds: 'Supporting ි� private builds',
    supportingBuildsText:
      '�a�ඩා �ෝ non-public projects ව�"නම group �aර �!ත� න�ිා main work ��aට පැ�ැද�ල� first impression ��a�a�` ලැබ�a.',
  },
};

*/

// The Sinhala copy is stored as proper Unicode text.
const windows1252Byte = (character) => {
  const code = character.codePointAt(0);
  const specialBytes = {
    0x20ac: 0x80,
    0x201a: 0x82,
    0x192: 0x83,
    0x201e: 0x84,
    0x2026: 0x85,
    0x2020: 0x86,
    0x2021: 0x87,
    0x2c6: 0x88,
    0x2030: 0x89,
    0x160: 0x8a,
    0x2039: 0x8b,
    0x152: 0x8c,
    0x17d: 0x8e,
    0x2018: 0x91,
    0x2019: 0x92,
    0x201c: 0x93,
    0x201d: 0x94,
    0x2022: 0x95,
    0x2013: 0x96,
    0x2014: 0x97,
    0x2dc: 0x98,
    0x2122: 0x99,
    0x161: 0x9a,
    0x203a: 0x9b,
    0x153: 0x9c,
    0x17e: 0x9e,
    0x178: 0x9f,
  };

  return specialBytes[code] ?? code;
};

const decodeMojibake = (value) => {
  if (typeof value === 'string') {
    if (!/[\u0080-\u00ff\u0152\u0153\u0160\u0161\u0178\u017d\u017e\u0192\u02c6\u02dc\u2013-\u2022\u2030\u2039\u203a]/.test(value)) {
      return value;
    }

    return new TextDecoder('utf-8').decode(Uint8Array.from(value, windows1252Byte));
  }

  if (Array.isArray(value)) return value.map(decodeMojibake);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, decodeMojibake(item)]));
  }

  return value;
};

// Keep translated copy as UTF-8 source text. Do not attempt to repair text at
// runtime: replacement characters (�) mean the original characters are lost.
const sinhalaContent = {
  ...englishContent,
  heroData: {
    ...heroData,
    eyebrow: 'සම්පූර්ණ-ස්ටැක් සංවර්ධක කළඹ',
    name: 'ආයුබෝවන්, මම අකින්දු ඉමාන්ත',
    intro: 'ප්‍රායෝගික වෙබ් අතුරුමුහුණත්, බැක්එන්ඩ් ඉදිරිපත් කිරීම සහ වෙබ් හා ඩෙස්ක්ටොප් යෙදුම් සංවර්ධනය කෙරෙහි අවධානය යොමු කරන තොරතුරු තාක්ෂණ උපාධි අපේක්ෂකයෙකි.',
    primaryAction: { ...heroData.primaryAction, label: 'විස්තර බලන්න' },
    secondaryAction: { ...heroData.secondaryAction, label: 'CV බාගන්න' },
    profileLabel: 'පැතිකඩ සාරාංශය',
    profileTitle: 'අන්තර්ජාලයේ පැහැදිලිව ඉදිරිපත් කළ හැකි, නිමාව ඇති වැඩ නිර්මාණය කිරීම',
    profileText: 'මගේ පසුබිම අධ්‍යයන IT ඉගෙනීම, ග්‍රැෆික් මෙවලම්, වෙබ් සංවර්ධන පදනම් සහ ප්‍රායෝගික ව්‍යාපෘති අත්දැකීම් එක් කරයි.',
  },
  focusAreas: ['React කළඹ අතුරුමුහුණත්', 'ප්‍රතිචාරාත්මක වෙබ් නිර්මාණය', 'C# ඩෙස්ක්ටොප් යෙදුම් සංවර්ධනය', 'HTML, CSS, JavaScript සහ PHP'],
  aboutCards: [
    { title: 'වත්මන් දිශාව', text: 'ප්‍රායෝගික මෘදුකාංග විසඳුම්, පැහැදිලි අතුරුමුහුණත් සහ සැබෑ පරිශීලක අවශ්‍යතා විසඳන පද්ධති ගොඩනැගීමට අවධානය යොමු කරමි.' },
    { title: 'තාක්ෂණික පරාසය', text: 'මගේ අත්දැකීම් ඉදිරිපස සංවර්ධනය, ඩෙස්ක්ටොප් යෙදුම්, දත්ත සමුදා පද්ධති, React, C#, PHP, Laravel සහ MySQL ආවරණය කරයි.' },
    { title: 'ව්‍යාපෘති ප්‍රවේශය', text: 'මම ව්‍යුහගත, භාවිතයට පහසු සහ ඉදිරිපත් කිරීමට සරල වැඩ ගොඩනඟමි.' },
    { title: 'පුළුල් ශක්තීන්', text: 'කේතනයට අමතරව, ග්‍රැෆික් මෙවලම්, ලේඛනකරණය සහ ප්‍රජා ව්‍යාපෘති අත්දැකීම් මගේ සන්නිවේදනය ශක්තිමත් කරයි.' },
  ],
  creativeProfile: { ...creativeProfile, title: 'ග්‍රැෆික් නිර්මාණ පැවැත්ම', text: 'මම Behance හරහා පිරිසැලසුම්-කේන්ද්‍රිත නිර්මාණ සහ දෘශ්‍ය ඉදිරිපත් කිරීමේ හැකියාවන් පෙන්වන වැඩ ප්‍රකාශයට පත් කරමි.', link: { ...creativeProfile.link, label: 'Behance පැතිකඩ බලන්න' } },
  tabs: [
    { ...tabs[0], label: 'මා ගැන' }, { ...tabs[1], label: 'අධ්‍යාපනය' },
    { ...tabs[2], label: 'කුසලතා' }, { ...tabs[3], label: 'ව්‍යාපෘති' },
    { ...tabs[4], label: 'අත්දැකීම්' }, { ...tabs[5], label: 'සම්බන්ධ වන්න' },
  ],
  sections: {
    about: { eyebrow: './about.sh', title: 'ප්‍රායෝගික, පරිශීලක-කේන්ද්‍රිත IT උපාධි අපේක්ෂකයෙක්.', text: 'මම ප්‍රායෝගික මෘදුකාංග සංවර්ධනය, නිර්මාණාත්මක සැලසුම සහ ආරක්ෂාව පිළිබඳ සිතුවිලි එකතු කරන ඩිජිටල් අත්දැකීම් ගොඩනඟමි.' },
    education: { eyebrow: './education.sh', title: 'අධ්‍යාපන පසුබිම', text: 'මගේ අධ්‍යයන පාසල් සුදුසුකම්, උපාධි මට්ටමේ IT ඉගෙනීම සහ තාක්ෂණික පදනමට සහය වන පාඨමාලා එක් කරයි.' },
    skills: { eyebrow: './skills.sh', title: 'තාක්ෂණික හැකියාවන්', text: 'සංවර්ධන සහ නිර්මාණාත්මක වැඩ සඳහා භාවිත කරන කුසලතා, මෙවලම් සහ මෘදුකාංග.' },
    projects: { eyebrow: './projects.sh', title: 'තෝරාගත් වැඩ', text: 'ප්‍රධාන ව්‍යාපෘති මුලින්ම ඉදිරිපත් කරන අතර, සහායක සහ පෞද්ගලික වැඩ වෙනම පෙන්වයි.' },
    experience: { eyebrow: './experience.sh', title: 'නායකත්වය සහ ප්‍රජා සහභාගිත්වය', text: 'සන්නිවේදන සහ සම්බන්ධීකරණ කුසලතා වර්ධනය කළ වැඩසටහන් සහ ක්ෂේත්‍ර අත්දැකීම්.' },
    contact: { eyebrow: './contact.sh', title: 'සම්බන්ධ වන්න', text: 'අවස්ථා, සහයෝගීතා සහ කළඹ සාකච්ඡා සඳහා සම්බන්ධ වන්න.' },
  },
  ui: {
    ...englishContent.ui,
    terminal: 'ටර්මිනලය', languageToggleLabel: 'ඉංග්‍රීසි වෙත මාරු වන්න', searchPlaceholder: "grep -i 'සොයන්න...'", searchLabel: 'කළඹ අන්තර්ගතය සොයන්න', nowViewing: 'දැනට බලමින්', search: 'සොයන්න', searchResults: 'සෙවුම් ප්‍රතිඵල', noResults: 'ප්‍රතිඵල හමු නොවීය', noResultsText: 'මෙයට ගැළපෙන අන්තර්ගතයක් හමු නොවීය', resultsFor: 'සඳහා ප්‍රතිඵල', resultsText: 'ඔබගේ සෙවුමට ගැළපෙන සියල්ල මෙහි දැක්වේ.', matchingSkills: 'ගැළපෙන කුසලතා සහ මෙවලම්', matchingProjects: 'ගැළපෙන ව්‍යාපෘති', matchingExperience: 'ගැළපෙන අත්දැකීම්', matchingLinks: 'ගැළපෙන සබැඳි', more: 'තවත්', scrollHint: 'තවත් පහළින්', coursesTitle: 'පාඨමාලා සහ සහතික', gradesButton: 'විෂයයන් සහ ප්‍රතිඵල බලන්න', gradesBack: 'කළඹ වෙත ආපසු', gradesTitle: 'විෂයයන් සහ ප්‍රතිඵල', gradesText: 'ප්‍රධාන අධ්‍යාපන අංශය පිරී නොයන ලෙස විෂයයන් සහ ප්‍රතිඵල සඳහා වෙනම දසුනක්.', programmingTitle: 'ක්‍රමලේඛනය සහ වෙබ්', toolsTitle: 'මෙවලම් සහ නිර්මාණාත්මක මෘදුකාංග', creativeProfile: 'නිර්මාණාත්මක පැතිකඩ', githubProfileLink: 'GitHub බලන්න', githubLoading: 'නවතම GitHub ක්‍රියාකාරකම් පූරණය වෙමින්...', additionalWork: 'අමතර වැඩ', supportingBuilds: 'සහායක සහ පෞද්ගලික ව්‍යාපෘති', supportingBuildsText: 'කුඩා හෝ ප්‍රසිද්ධ නොවන ව්‍යාපෘති වෙනම කාණ්ඩගත කර ඇත.',
  },
};

export const portfolioContent = {
  en: englishContent,
  si: sinhalaContent,
};


