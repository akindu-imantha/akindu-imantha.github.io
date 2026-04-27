import {
  Atom,
  Blocks,
  Braces,
  Brush,
  Coffee,
  Code2,
  Database,
  FileCode2,
  FileImage,
  FileText,
  Film,
  GitBranch,
  Image,
  MonitorCog,
  Palette,
  PenTool,
  Server,
} from 'lucide-react';

const skillIconMap = {
  React: Atom,
  JavaScript: Braces,
  HTML: FileCode2,
  CSS: Palette,
  'C#': Code2,
  Java: Coffee,
  Python: Code2,
  'C++': Blocks,
  Laravel: Server,
  PHP: FileCode2,
  MySQL: Database,
  'MS Office': FileText,
  'Adobe Photoshop': Image,
  'Adobe Illustrator': PenTool,
  'Adobe Premiere Pro': Film,
  'Visual Studio': MonitorCog,
  GitHub: GitBranch,
  'Behance portfolio': Palette,
  'Design-focused work': Brush,
  'Visual presentation': FileImage,
};

const skillLevelMap = {
  React: 62,
  JavaScript: 72,
  HTML: 96,
  CSS: 72,
  'C#': 72,
  Java: 72,
  Python: 48,
  'C++': 24,
  Laravel: 54,
  PHP: 72,
  MySQL: 84,
  'MS Office': 86,
  'Adobe Photoshop': 96,
  'Adobe Illustrator': 78,
  'Adobe Premiere Pro': 56,
  'Visual Studio': 74,
  GitHub: 64,
};

export function SkillPill({ label }) {
  const Icon = skillIconMap[label];

  return (
    <span className="skill-pill">
      {Icon && <Icon size={16} aria-hidden="true" />}
      <span>{label}</span>
    </span>
  );
}

export function SkillMeter({ label, index = 0 }) {
  const Icon = skillIconMap[label];
  const level = skillLevelMap[label] ?? 50;

  return (
    <div
      className="skill-meter"
      style={{ '--skill-level': `${level}%`, '--skill-delay': `${index * 55}ms` }}
    >
      <div className="skill-meter-label">
        <span className="skill-meter-name">
          {Icon && <Icon size={16} aria-hidden="true" />}
          <span>{label}</span>
        </span>
        <span className="skill-meter-value">{level}%</span>
      </div>
      <div className="skill-meter-track" aria-hidden="true">
        <span className="skill-meter-fill"></span>
      </div>
    </div>
  );
}

export function SkillOrb({ label, index = 0 }) {
  const Icon = skillIconMap[label];
  const level = skillLevelMap[label] ?? 50;

  return (
    <div
      className="skill-orb"
      style={{ '--skill-level': `${level * 3.6}deg`, '--skill-delay': `${index * 70}ms` }}
    >
      <div className="skill-orb-ring">
        <div className="skill-orb-core">
          {Icon && <Icon size={20} aria-hidden="true" />}
          <strong>{level}%</strong>
        </div>
      </div>
      <span>{label}</span>
    </div>
  );
}
