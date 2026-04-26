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
  profileImage: './images/profile.jpg',
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
      'I am growing as an IT undergraduate with interest in frontend development, modern responsive websites, and application design that is both useful and presentable.',
  },
  {
    title: 'Core strengths',
    text:
      'I bring a mix of web fundamentals, programming exposure, creative design tools, and clear communication skills that help me work across both technical and presentation-focused tasks.',
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

export const education = [
  {
    title: 'Bachelor of Information Technology',
    subtitle: 'University of Moratuwa',
    text: 'Undergraduate level studies completed through first year diploma level and second year higher diploma level coursework.',
  },
  {
    title: 'G.C.E. A/L Examination 2022',
    subtitle: 'Prince College',
    text: 'Accounting, Business Studies, and Information and Communication Technology.',
  },
  {
    title: 'G.C.E. O/L Examination 2018',
    subtitle: 'Prince College',
    text: 'Completed a broad subject base including ICT, mathematics, science, history, Sinhala, English, art, and civic studies.',
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
    title: 'Personal Portfolio Website',
    stack: 'React, Vite, Frontend UI',
    description:
      'A personal portfolio built to showcase skills, achievements, and projects with a responsive layout and modern visual style.',
    liveUrl: 'https://12345akindu.github.io/akindu-portfolio/',
    primaryLinkLabel: 'Live portfolio',
    secondaryUrl: 'https://github.com/12345akindu/akindu-portfolio',
    secondaryLinkLabel: 'GitHub repository',
  },
  {
    title: 'Hospital Management System',
    stack: 'C#, MS SQL',
    description:
      'A management system for patient registration, appointment scheduling, and medical records, focused on clean workflows and practical database structure.',
    liveUrl: 'https://github.com/12345akindu/hospital_Management_System_C-',
    primaryLinkLabel: 'GitHub repository',
    secondaryUrl: 'https://drive.google.com/file/d/1Za2u6upxxo6r7JycLeYuEjog8EDa7Rm4/view?usp=sharing',
    secondaryLinkLabel: 'Demo video',
    previewImage: './images/projects/hospital-management-thumbnail.png',
    previewAlt: 'Thumbnail preview for the Hospital Management System demo video.',
  },
  {
    title: 'School Management System',
    stack: 'Laravel, PHP, MySQL',
    description:
      'A school management system built to track student attendance efficiently and help parents stay updated with their childrens daily attendance records through a structured digital workflow.',
    liveUrl: '#',
    primaryLinkLabel: 'Project details',
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
];

export const tabs = [
  { id: 'about', icon: User, command: './about.sh', label: 'About' },
  { id: 'education', icon: GraduationCap, command: './education.sh', label: 'Education' },
  { id: 'skills', icon: Code, command: './skills.sh', label: 'Skills' },
  { id: 'projects', icon: FolderGit2, command: './projects.sh', label: 'Projects' },
  { id: 'experience', icon: Briefcase, command: './experience.sh', label: 'Experience' },
  { id: 'contact', icon: Mail, command: './contact.sh', label: 'Contact' },
];
