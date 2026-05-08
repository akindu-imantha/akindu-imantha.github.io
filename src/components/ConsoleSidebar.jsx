import { ChevronRight, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ConsoleSidebar({
  activeTab,
  onTabChange,
  onSearchChange,
  searchQuery,
  tabs,
  ui = {},
}) {
  const listRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [showMobileTabbar, setShowMobileTabbar] = useState(false);
  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  const scrollConsoleIntoView = () => {
    const consoleElement = document.getElementById('console');

    if (!consoleElement) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    consoleElement.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const handleMobileTabChange = (tabId) => {
    onTabChange(tabId);
    requestAnimationFrame(scrollConsoleIntoView);
  };

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

  useEffect(() => {
    const consoleElement = document.getElementById('console');

    if (!consoleElement || !('IntersectionObserver' in window)) {
      setShowMobileTabbar(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMobileTabbar(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px 0px -35% 0px',
        threshold: 0,
      },
    );

    observer.observe(consoleElement);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="console-sidebar">
        <div className="search-bar-container">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            id="console-search"
            name="search"
            className="console-search"
            placeholder={ui.searchPlaceholder ?? "grep -i 'search...'"}
            aria-label={ui.searchLabel ?? 'Search portfolio content'}
            inputMode="search"
            enterKeyHint="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className="mobile-console-meta">
          <span className="mobile-console-kicker">{ui.nowViewing ?? 'Now viewing'}</span>
          <strong>{searchQuery.trim() ? ui.searchResults ?? 'Search results' : activeTabData?.label ?? 'About'}</strong>
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
            <span>{ui.more ?? 'More'}</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>

      <nav
        className={`mobile-tabbar ${showMobileTabbar ? 'is-visible' : ''}`}
        aria-label={ui.mobileNavigationLabel ?? 'Portfolio sections'}
        aria-hidden={!showMobileTabbar}
      >
        <div className="mobile-tabbar-list">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                className={`mobile-tabbar-btn ${activeTab === tab.id && !searchQuery ? 'active' : ''}`}
                onClick={() => handleMobileTabChange(tab.id)}
                aria-label={tab.label}
                aria-current={activeTab === tab.id && !searchQuery ? 'page' : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
