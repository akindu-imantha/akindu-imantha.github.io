import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Monitor, Code, Network, PenTool, Calculator, User, Briefcase, GraduationCap, FolderGit2, Mail, Search, ChevronRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const terminalScale = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const focusAreas = [
  'React portfolio interfaces',
  'Responsive web design',
  'C# desktop application development',
  'HTML, CSS, JavaScript, and PHP',
];

const technicalSkills = [
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

const tools = [
  'MS Office',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe Premiere Pro',
  'Visual Studio',
  'GitHub',
];

const education = [
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

const certifications = [
  { name: 'Diploma in Computer Application', icon: Monitor },
  { name: 'Diploma in Computer Science', icon: Code },
  { name: 'Cisco Networking Get Connected Course', icon: Network },
  { name: 'Information Technology Graphic Design Course', icon: PenTool },
  { name: 'AAT Level II Complete', icon: Calculator },
];

const projects = [
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
    secondaryUrl:
      'https://drive.google.com/file/d/1Za2u6upxxo6r7JycLeYuEjog8EDa7Rm4/view?usp=sharing',
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

const experience = [
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

const tabs = [
  { id: 'about', icon: User, command: './about.sh', label: 'About' },
  { id: 'education', icon: GraduationCap, command: './education.sh', label: 'Education' },
  { id: 'skills', icon: Code, command: './skills.sh', label: 'Skills' },
  { id: 'projects', icon: FolderGit2, command: './projects.sh', label: 'Projects' },
  { id: 'experience', icon: Briefcase, command: './experience.sh', label: 'Experience' },
  { id: 'contact', icon: Mail, command: './contact.sh', label: 'Contact' },
];




function SectionTitle({ eyebrow, title, text }) {
  return (
    <motion.div variants={fadeInUp} className="section-heading" style={{ marginBottom: '2rem' }}>
      <span style={{ color: 'var(--accent)', fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.8rem', textTransform: 'uppercase' }}>{eyebrow}</span>
      <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>{title}</h2>
      <p style={{ color: 'var(--text-muted)' }}>{text}</p>
    </motion.div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [searchQuery, setSearchQuery] = useState('');

  const renderSearchResults = () => {
    const query = searchQuery.toLowerCase();
    
    const matchedSkills = technicalSkills.filter(s => s.toLowerCase().includes(query));
    const matchedTools = tools.filter(t => t.toLowerCase().includes(query));
    const matchedCerts = certifications.filter(c => c.name.toLowerCase().includes(query));
    
    const matchedProjects = projects.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.stack.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query)
    );
    
    const matchedExperience = experience.filter(e => 
      e.title.toLowerCase().includes(query) || 
      e.text.toLowerCase().includes(query)
    );

    const hasResults = matchedSkills.length > 0 || matchedTools.length > 0 || matchedCerts.length > 0 || matchedProjects.length > 0 || matchedExperience.length > 0;

    if (!hasResults) {
      return (
        <motion.div
          key="no-results"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="console-section"
        >
          <SectionTitle eyebrow="Search" title="No results found" text={`Could not find anything matching "${searchQuery}".`} />
        </motion.div>
      );
    }

    return (
      <motion.div
        key="search"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="console-section"
      >
        <SectionTitle eyebrow="Search Results" title={`Results for "${searchQuery}"`} text="Here is everything matching your query across all sections." />
        
        {(matchedSkills.length > 0 || matchedTools.length > 0 || matchedCerts.length > 0) && (
          <motion.div variants={fadeInUp} className="skills-layout" style={{ marginBottom: '2rem' }}>
             {(matchedSkills.length > 0 || matchedTools.length > 0) && (
                <article className="about-card console-card">
                  <h3>Matching Skills & Tools</h3>
                  <div className="skill-list">
                    {matchedSkills.map(s => <span key={s} className="skill-pill">{s}</span>)}
                    {matchedTools.map(t => <span key={t} className="skill-pill">{t}</span>)}
                  </div>
                </article>
             )}
             {matchedCerts.length > 0 && (
                <div className="skill-list" style={{ marginTop: '1.25rem' }}>
                  {matchedCerts.map((item) => (
                    <span key={item.name} className="skill-pill">
                      <item.icon size={16} />
                      <span>{item.name}</span>
                    </span>
                  ))}
                </div>
             )}
          </motion.div>
        )}

        {matchedProjects.length > 0 && (
          <motion.div variants={fadeInUp} style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Matching Projects</h3>
            <div className="project-grid">
              {matchedProjects.map((project) => (
                <article key={project.title} className="project-card console-card">
                  <p className="project-stack">{project.stack}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.previewImage ? (
                    <a
                      className="project-preview"
                      href={project.secondaryUrl ?? project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} demo preview`}
                    >
                      <img src={project.previewImage} alt={project.previewAlt ?? `${project.title} preview`} loading="lazy" />
                      <span className="project-preview-badge">Watch Demo</span>
                    </a>
                  ) : null}
                  <div className="project-actions">
                    <a className="project-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                      {project.primaryLinkLabel}
                    </a>
                    {project.secondaryUrl ? (
                      <a className="project-link secondary" href={project.secondaryUrl} target="_blank" rel="noreferrer">
                        {project.secondaryLinkLabel}
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        )}

        {matchedExperience.length > 0 && (
          <motion.div variants={fadeInUp}>
            <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Matching Experience</h3>
            <div className="timeline">
              {matchedExperience.map((item) => (
                <article key={item.title} className="timeline-item console-card">
                  <span>{item.period}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {item.images ? (
                    <div className="experience-gallery">
                      {item.images.map((image) => (
                        <figure key={image.src} className="experience-media">
                          <img src={image.src} alt={image.alt} loading="lazy" />
                        </figure>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const renderContent = () => {
    if (searchQuery.trim() !== '') {
      return renderSearchResults();
    }

    switch (activeTab) {
      case 'about':
        return (
          <motion.div
            key="about"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="console-section"
          >
            <SectionTitle
              eyebrow="./about.sh"
              title="A practical portfolio built around real CV details."
              text="This site introduces my academic background, projects, technical skills, and the experience I have built through both study and community work."
            />
            <div className="about-grid">
              <motion.article variants={fadeInUp} className="about-card console-card">
                <h3>Current direction</h3>
                <p>
                  I am growing as an IT undergraduate with interest in frontend
                  development, modern responsive websites, and application design
                  that is both useful and presentable.
                </p>
              </motion.article>
              <motion.article variants={fadeInUp} className="about-card console-card">
                <h3>Core strengths</h3>
                <p>
                  I bring a mix of web fundamentals, programming exposure,
                  creative design tools, and clear communication skills that help
                  me work across both technical and presentation-focused tasks.
                </p>
              </motion.article>
            </div>
          </motion.div>
        );
      case 'education':
        return (
          <motion.div
            key="education"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="console-section"
          >
            <SectionTitle
              eyebrow="./education.sh"
              title="Academic background"
              text="My studies combine school qualifications with undergraduate IT learning and module-based practical training."
            />
            <div className="project-grid">
              {education.map((item) => (
                <motion.article variants={fadeInUp} key={item.title} className="project-card console-card">
                  <p className="project-stack">{item.subtitle}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        );
      case 'skills':
        return (
          <motion.div
            key="skills"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="console-section"
          >
            <SectionTitle
              eyebrow="./skills.sh"
              title="Technical capabilities"
              text="My CV shows a mixed skill base across programming, office productivity, design tools, and web development."
            />
            <div className="skills-layout">
              <motion.article variants={fadeInUp} className="about-card console-card">
                <h3>Programming and web</h3>
                <div className="skill-list">
                  {technicalSkills.map((skill) => (
                    <span key={skill} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
              <motion.article variants={fadeInUp} className="about-card console-card">
                <h3>Tools and creative software</h3>
                <div className="skill-list">
                  {tools.map((tool) => (
                    <span key={tool} className="skill-pill">
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.article>
            </div>
            <motion.div variants={fadeInUp} className="skill-list" style={{ marginTop: '1.25rem' }}>
              {certifications.map((item) => (
                <span key={item.name} className="skill-pill">
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>
        );
      case 'projects':
        return (
          <motion.div
            key="projects"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="console-section"
          >
            <SectionTitle
              eyebrow="./projects.sh"
              title="Selected work"
              text="These projects are taken directly from the experience and project section of the CV."
            />
            <div className="project-grid">
              {projects.map((project) => (
                <motion.article variants={fadeInUp} key={project.title} className="project-card console-card">
                  <p className="project-stack">{project.stack}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.previewImage ? (
                    <a
                      className="project-preview"
                      href={project.secondaryUrl ?? project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} demo preview`}
                    >
                      <img src={project.previewImage} alt={project.previewAlt ?? `${project.title} preview`} loading="lazy" />
                      <span className="project-preview-badge">Watch Demo</span>
                    </a>
                  ) : null}
                  <div className="project-actions">
                    <a className="project-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                      {project.primaryLinkLabel}
                    </a>
                    {project.secondaryUrl ? (
                      <a className="project-link secondary" href={project.secondaryUrl} target="_blank" rel="noreferrer">
                        {project.secondaryLinkLabel}
                      </a>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        );
      case 'experience':
        return (
          <motion.div
            key="experience"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="console-section"
          >
            <SectionTitle
              eyebrow="./experience.sh"
              title="Leadership and community involvement"
              text="My background also includes programme participation and field-based work that developed communication and coordination skills."
            />
            <div className="timeline">
              {experience.map((item) => (
                <motion.article variants={fadeInUp} key={item.title} className="timeline-item console-card">
                  <span>{item.period}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {item.images ? (
                    <div className="experience-gallery">
                      {item.images.map((image) => (
                        <figure key={image.src} className="experience-media">
                          <img src={image.src} alt={image.alt} loading="lazy" />
                        </figure>
                      ))}
                    </div>
                  ) : null}
                </motion.article>
              ))}
            </div>
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            key="contact"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="console-section"
          >
            <SectionTitle
              eyebrow="./contact.sh"
              title="Get in touch"
              text="Open for opportunities, collaboration, and portfolio discussions."
            />
            <motion.div variants={fadeInUp} className="contact-links console-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
              <a href="mailto:akindu666imantha@gmail.com" className="contact-link-item">
                <Mail size={20} /> akindu666imantha@gmail.com
              </a>
              <a href="https://github.com/12345akindu" target="_blank" rel="noreferrer" className="contact-link-item">
                <Code size={20} /> github.com/12345akindu
              </a>
              <a href="https://www.linkedin.com/in/akindu-rupasingha-96839a315" target="_blank" rel="noreferrer" className="contact-link-item">
                <Network size={20} /> linkedin.com/in/akindu-rupasingha-96839a315
              </a>
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-shell">
      <header className="hero">
        <motion.nav 
          className="topbar"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="brand">Akindu Imantha</div>
          <div className="nav-links">
            <a href="#console">Terminal</a>
          </div>
        </motion.nav>

        <motion.div 
          className="hero-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="hero-copy">
            <motion.p variants={fadeInUp} className="eyebrow">Frontend Developer Portfolio</motion.p>
            <motion.h1 variants={fadeInUp}>M.A. Akindu Imantha Rupasingha</motion.h1>
            <motion.p variants={fadeInUp} className="intro">
              Information Technology undergraduate focused on practical web
              interfaces, frontend presentation, and application building with
              both web and desktop development experience.
            </motion.p>

            <motion.div variants={fadeInUp} className="hero-meta">
              <span className="hero-meta-item">Rathnapura, Sri Lanka</span>
              <span className="hero-meta-item">(+94) 70 110 7126</span>
              <span className="hero-meta-item">akindu666imantha@gmail.com</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="hero-actions">
              <a href="#console" className="primary-button">
                View Details
              </a>
              <a href="./Akindu-Imantha-CV.pdf" className="secondary-button">
                Download CV
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeInUp} className="hero-card profile-card">
            <div className="profile-image-container">
              <img src="./images/profile.jpg" alt="Akindu Imantha" className="profile-image" />
              <div className="profile-glow"></div>
            </div>
            <div className="profile-card-content">
              <div className="card-label">Profile Snapshot</div>
              <h3>Building polished work that is easy to present online</h3>
              <p>
                My background combines academic IT study, graphic tools, web
                development foundations, and hands-on project work that can be
                presented clearly through a modern portfolio.
              </p>

              <ul>
                {focusAreas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </header>

      <main id="console" className="console-wrapper">
        <motion.div 
          className="interactive-console"
          variants={terminalScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="console-header">
            <div className="console-dots">
              <motion.span whileHover={{ scale: 1.2 }} className="dot red"></motion.span>
              <motion.span whileHover={{ scale: 1.2 }} className="dot yellow"></motion.span>
              <motion.span whileHover={{ scale: 1.2 }} className="dot green"></motion.span>
            </div>
            <div className="console-title">
              <span className="terminal-user">guest</span>@<span className="terminal-host">akindu-portfolio</span>: <span className="terminal-path">~</span>
            </div>
          </div>
          
          <div className="console-body">
            <div className="console-sidebar">
              <div className="search-bar-container">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  className="console-search" 
                  placeholder="grep -i 'search...'" 
                  aria-label="Search portfolio content"
                  inputMode="search"
                  enterKeyHint="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="cmd-list">
                {tabs.map((tab) => {
                  const Icon = tab.icon;

                  return (
                    <button
                      key={tab.id}
                      className={`cmd-btn ${activeTab === tab.id && !searchQuery ? 'active' : ''}`}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSearchQuery('');
                      }}
                    >
                      <Icon size={16} />
                      <span className="cmd-command">{tab.command}</span>
                      <span className="cmd-label">{tab.label}</span>
                      <ChevronRight size={14} className="cmd-arrow" />
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="console-content-area">
              <div className="scanlines"></div>
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
