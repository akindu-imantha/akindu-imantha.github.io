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
  name: 'M.A. Akindu Imantha Rupasingha',
  intro:
    'Information Technology undergraduate focused on practical web interfaces, backend presentation, and application building with both web and desktop development experience.',
  meta: ['Rathnapura, Sri Lanka', '(+94) 70 110 7126', 'akindu666imantha@gmail.com'],
  primaryAction: { href: '#console', label: 'View Details' },
  secondaryAction: { href: './Akindu-Imantha-CV.pdf', label: 'Download CV' },
  profileImage: './images/profile-hero.png',
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

export const education = [
  {
    title: 'Bachelor of Information Technology',
    subtitle: 'University of Moratuwa',
    text: 'Undergraduate level studies completed through first year diploma level and second year higher diploma level coursework.',
    logo: './images/education/university-of-moratuwa-logo.png',
    logoAlt: 'University of Moratuwa logo',
  },
  {
    title: 'G.C.E. A/L Examination 2022',
    subtitle: 'Prince College',
    text: 'Accounting, Business Studies, and Information and Communication Technology.',
    logo: './images/education/prince-college-logo-transparent.png',
    logoAlt: 'Prince College logo',
  },
  {
    title: 'G.C.E. O/L Examination 2018',
    subtitle: 'Prince College',
    text: 'Completed a broad subject base including ICT, mathematics, science, history, Sinhala, English, art, and civic studies.',
    logo: './images/education/prince-college-logo-transparent.png',
    logoAlt: 'Prince College logo',
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
    previewImage: './images/projects/hospital-management-thumbnail.png',
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
        src: './images/experience/unicef-cash-plus-poster.png',
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
        src: './images/experience/ylca-team.jpg',
        alt: 'Akindu Imantha with the Youth Leadership for Climate Action team.',
      },
      {
        src: './images/experience/ylca-poster.png',
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
    href: 'https://github.com/12345akindu',
    label: 'github.com/12345akindu',
    icon: Code,
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/akindu-rupasingha-96839a315',
    label: 'linkedin.com/in/akindu-rupasingha-96839a315',
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
