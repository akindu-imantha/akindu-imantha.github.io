import { ChevronRight, Search } from 'lucide-react';

export default function ConsoleSidebar({
  activeTab,
  onTabChange,
  onSearchChange,
  searchQuery,
  tabs,
}) {
  return (
    <div className="console-sidebar">
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

      <div className="cmd-list">
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
    </div>
  );
}
