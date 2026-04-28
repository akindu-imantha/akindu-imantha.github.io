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
  profileImage: './images/optimized/profile-hero-cutout-720.png',
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
    logo: './images/optimized/prince-college-logo-transparent-360.png',
    logoAlt: 'Prince College logo',
  },
  {
    title: 'G.C.E. O/L Examination 2018',
    subtitle: 'Prince College',
    text: 'Completed a broad subject base including ICT, mathematics, science, history, Sinhala, English, art, and civic studies.',
    logo: './images/optimized/prince-college-logo-transparent-360.png',
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
    href: 'https://github.com/12345akindu',
    label: 'github.com/12345akindu',
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
  education,
  certifications,
  projects,
  experience,
  contactLinks,
  tabs,
  sections: {
    about: {
      eyebrow: './about.sh',
      title: 'A broader profile beyond only frontend development.',
      text:
        'This section introduces my academic path, technical range, project mindset, and the wider experience I have built through both study and community work.',
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
    programmingTitle: 'Programming and web',
    toolsTitle: 'Tools and creative software',
    creativeProfile: 'Creative profile',
    additionalWork: 'Additional work',
    supportingBuilds: 'Supporting and private builds',
    supportingBuildsText:
      'Smaller or non-public projects stay grouped separately, so the main work gets a stronger first impression.',
  },
};

const sinhalaContent = {
  ...englishContent,
  heroData: {
    ...heroData,
    eyebrow: 'ෆුල් ස්ටැක් ඩිවලොපර් පෝර්ට්ෆෝලියෝ',
    intro:
      'ප්‍රායෝගික වෙබ් අතුරුමුහුණත්, backend presentation, සහ web/desktop application development පිළිබඳ අවධානයක් ඇති Information Technology undergraduate කෙනෙක්.',
    primaryAction: { ...heroData.primaryAction, label: 'විස්තර බලන්න' },
    secondaryAction: { ...heroData.secondaryAction, label: 'CV බාගන්න' },
    profileLabel: 'ප්‍රොෆයිල් සාරාංශය',
    profileTitle: 'Online presentation එකකට පැහැදිලි, polish කරපු වැඩ නිර්මාණය කිරීම',
    profileText:
      'මගේ පසුබිම academic IT study, graphic tools, web development foundations, සහ hands-on project work එකට එකතු වෙනවා.',
  },
  focusAreas: [
    'React portfolio interfaces',
    'Responsive web design',
    'C# desktop application development',
    'HTML, CSS, JavaScript, සහ PHP',
  ],
  aboutCards: [
    {
      title: 'වර්තමාන දිශාව',
      text:
        'IT undergraduate කෙනෙක් විදිහට practical software solutions, clear interfaces, සහ real user workflows විසඳන systems ගොඩනැගීමට මම අවධානය දෙමි.',
    },
    {
      title: 'තාක්ෂණික පරාසය',
      text:
        'Frontend development, desktop application work, database-backed systems, React, C#, PHP, Laravel, සහ MySQL මගේ experience එකට ඇතුළත් වේ.',
    },
    {
      title: 'Project approach',
      text:
        'මම structured, usable, සහ present කරන්න පහසු වැඩ ගොඩනගන අතර layout quality, clean workflows, practical implementation ගැන අවධානය දෙමි.',
    },
    {
      title: 'වෙනත් ශක්තීන්',
      text:
        'Coding වලට අමතරව graphic tools, documentation, සහ community project experience මගේ technical execution සහ communication එකට සහාය දක්වයි.',
    },
  ],
  creativeProfile: {
    ...creativeProfile,
    title: 'Graphic design presence',
    text:
      'Behance හරහා මම visual work publish කරන අතර layout-focused design pieces සහ creative presentation skills එහි දැකගත හැක.',
    highlights: ['Behance portfolio', 'Design-focused work', 'Visual presentation'],
    link: { ...creativeProfile.link, label: 'Behance profile බලන්න' },
  },
  education: [
    {
      ...education[0],
      text:
        'First year diploma level සහ second year higher diploma level coursework හරහා undergraduate level studies සම්පූර්ණ කර ඇත.',
    },
    {
      ...education[1],
      text: 'Accounting, Business Studies, සහ Information and Communication Technology.',
    },
    {
      ...education[2],
      text:
        'ICT, mathematics, science, history, Sinhala, English, art, සහ civic studies ඇතුළු පුළුල් subject base එකක් සම්පූර්ණ කර ඇත.',
    },
  ],
  projects: [
    {
      ...projects[0],
      category: 'ප්‍රධාන project',
      description:
        'E-waste collection, item tracking, සහ workflow management සඳහා operations-focused platform එකක්.',
      statusText: 'Development වෙමින්',
      actions: [
        { label: 'Case study soon', disabled: true, variant: 'primary' },
        { label: 'Private build', disabled: true, variant: 'secondary' },
      ],
    },
    {
      ...projects[1],
      category: 'ප්‍රධාන project',
      description:
        'Patient registration, appointments, සහ medical record handling සඳහා desktop system එකක්.',
      statusText: 'Demo තිබේ',
      actions: [
        { ...projects[1].actions[0], label: 'GitHub repository' },
        { ...projects[1].actions[1], label: 'Demo video' },
      ],
      previewLabel: 'Demo බලන්න',
    },
    {
      ...projects[2],
      category: 'ප්‍රධාන project',
      description:
        'Skills, project work, සහ experience පැහැදිලිව පෙන්වීමට responsive portfolio interface එකක්.',
      statusText: 'Live project',
      actions: [
        { ...projects[2].actions[0], label: 'Live portfolio' },
        { ...projects[2].actions[1], label: 'GitHub repository' },
      ],
    },
    {
      ...projects[3],
      category: 'Supporting project',
      description:
        'Parent updates සහ daily record tracking සඳහා attendance-focused school system එකක්.',
      statusText: 'Private project',
    },
  ],
  experience: [
    {
      ...experience[0],
      text:
        'Humanitarian cash transfer programme එකක් සඳහා community-based nutrition promotion, monitoring, සහ capacity development වලට සහාය විය.',
    },
    {
      ...experience[1],
      text:
        'Sustainable projects සඳහා knowledge, skills, සහ collaboration ගොඩනැගීමට British Council climate action programme එකට සහභාගී විය.',
    },
  ],
  tabs: [
    { ...tabs[0], label: 'මා ගැන' },
    { ...tabs[1], label: 'අධ්‍යාපනය' },
    { ...tabs[2], label: 'Skills' },
    { ...tabs[3], label: 'Projects' },
    { ...tabs[4], label: 'Experience' },
    { ...tabs[5], label: 'Contact' },
  ],
  sections: {
    about: {
      eyebrow: './about.sh',
      title: 'Frontend development වලට වඩා පුළුල් profile එකක්.',
      text:
        'මෙම කොටස මගේ academic path, technical range, project mindset, සහ study/community work හරහා ගොඩනැගූ experience පෙන්වයි.',
    },
    education: {
      eyebrow: './education.sh',
      title: 'අධ්‍යාපන පසුබිම',
      text:
        'School qualifications, undergraduate IT learning, සහ completed courses/certifications මගේ technical foundation එකට සහාය දක්වයි.',
    },
    skills: {
      eyebrow: './skills.sh',
      title: 'තාක්ෂණික හැකියාවන්',
      text:
        'Development සහ creative work සඳහා මම භාවිතා කරන technical skills, tools, සහ software මෙහි පෙන්වයි.',
    },
    projects: {
      eyebrow: './projects.sh',
      title: 'තෝරාගත් වැඩ',
      text:
        'ශක්තිමත් builds ඉහළින් පෙන්වා, private සහ supporting work වෙනම layout එකකින් පෙන්වා ඇත.',
    },
    experience: {
      eyebrow: './experience.sh',
      title: 'Leadership සහ community involvement',
      text:
        'Communication සහ coordination skills වර්ධනය කළ programme participation සහ field-based work මගේ පසුබිමට ඇතුළත් වේ.',
    },
    contact: {
      eyebrow: './contact.sh',
      title: 'සම්බන්ධ වන්න',
      text: 'Opportunities, collaboration, සහ portfolio discussions සඳහා සම්බන්ධ විය හැක.',
    },
  },
  ui: {
    ...englishContent.ui,
    terminal: 'ටර්මිනල්',
    languageToggleLabel: 'Switch to English',
    searchPlaceholder: "grep -i 'සොයන්න...'",
    searchLabel: 'Portfolio content සොයන්න',
    nowViewing: 'දැනට බලන්නේ',
    search: 'සෙවීම',
    searchResults: 'Search results',
    noResults: 'ප්‍රතිඵල නැත',
    noResultsText: 'මෙයට ගැලපෙන කිසිවක් හමු නොවීය',
    resultsFor: 'ප්‍රතිඵල',
    resultsText: 'ඔබේ search එකට ගැලපෙන සියලු කොටස් මෙහි දැක්වේ.',
    matchingSkills: 'ගැලපෙන Skills සහ Tools',
    matchingProjects: 'ගැලපෙන Projects',
    matchingExperience: 'ගැලපෙන Experience',
    matchingLinks: 'ගැලපෙන Links',
    more: 'තව',
    scrollHint: 'තව පහළට',
    coursesTitle: 'Courses සහ certifications',
    programmingTitle: 'Programming සහ web',
    toolsTitle: 'Tools සහ creative software',
    creativeProfile: 'Creative profile',
    additionalWork: 'අමතර වැඩ',
    supportingBuilds: 'Supporting සහ private builds',
    supportingBuildsText:
      'කුඩා හෝ non-public projects වෙනම group කර ඇති නිසා main work එකට පැහැදිලි first impression එකක් ලැබේ.',
  },
};

export const portfolioContent = {
  en: englishContent,
  si: sinhalaContent,
};
