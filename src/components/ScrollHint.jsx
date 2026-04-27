import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ScrollHint() {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const updateHint = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const canScrollMore = scrollPosition < documentHeight - 16;

      setShowHint(canScrollMore);
    };

    updateHint();
    window.addEventListener('scroll', updateHint, { passive: true });
    window.addEventListener('resize', updateHint);

    return () => {
      window.removeEventListener('scroll', updateHint);
      window.removeEventListener('resize', updateHint);
    };
  }, []);

  return (
    <button
      type="button"
      className={`scroll-hint ${showHint ? '' : 'is-hidden'}`}
      onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
      aria-label="Scroll down"
    >
      <span>More below</span>
      <ChevronDown size={18} />
    </button>
  );
}
