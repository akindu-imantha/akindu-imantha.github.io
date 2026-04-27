import { ChevronRight, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ConsoleSidebar({
  activeTab,
  isHidden,
  onTabChange,
  onSearchChange,
  searchQuery,
  tabs,
}) {
  const listRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  useEffect(() => {
    const listElement = listRef.current;

    if (!listElement) {
      return undefined;
    }

    const updateScrollHint = () => {
      const hasOverflow = listElement.scrollWidth - listElement.clientWidth > 8;
      const canScrollMore =
        listElement.scrollLeft + listElement.clientWidth < listElement.scrollWidth - 8;

      setShowScrollHint(hasOverflow && canScrollMore);
    };

    updateScrollHint();
    listElement.addEventListener('scroll', updateScrollHint, { passive: true });
    window.addEventListener('resize', updateScrollHint);

    return () => {
      listElement.removeEventListener('scroll', updateScrollHint);
      window.removeEventListener('resize', updateScrollHint);
    };
  }, [tabs.length]);

  return (
    <div className={`console-sidebar ${isHidden ? 'is-hidden' : ''}`}>
      <div className="search-bar-container">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          id="console-search"
          name="search"
          className="console-search"
          placeholder="grep -i 'search...'"
          aria-label="Search portfolio content"
          inputMode="search"
          enterKeyHint="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <div className="mobile-console-meta">
        <span className="mobile-console-kicker">Now viewing</span>
        <strong>{searchQuery.trim() ? 'Search results' : activeTabData?.label ?? 'About'}</strong>
      </div>

      <div className="cmd-list-shell">
        <div ref={listRef} className="cmd-list">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                className={`cmd-btn ${activeTab === tab.id && !searchQuery ? 'active' : ''}`}
                onClick={() => onTabChange(tab.id)}
              >
                <Icon size={16} />
                <span className="cmd-command">{tab.command}</span>
                <span className="cmd-label">{tab.label}</span>
                <ChevronRight size={14} className="cmd-arrow" />
              </button>
            );
          })}
        </div>

        <div
          className={`cmd-scroll-hint ${showScrollHint ? '' : 'is-hidden'}`}
          aria-hidden="true"
        >
          <span>More</span>
          <ChevronRight size={14} />
        </div>
      </div>
    </div>
  );
}
