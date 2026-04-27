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

export function SkillPill({ label }) {
  const Icon = skillIconMap[label];

  return (
    <span className="skill-pill">
      {Icon && <Icon size={16} aria-hidden="true" />}
      <span>{label}</span>
    </span>
  );
}
