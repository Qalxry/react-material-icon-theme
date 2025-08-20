import React from 'react';

export type FilterCategory = 'all' | 'files' | 'folders' | 'languages';

interface FilterTabsProps {
  activeCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
  counts: Record<FilterCategory, number>;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeCategory,
  onCategoryChange,
  counts
}) => {
  const tabs = [
    { id: 'all' as const, label: 'All Icons', icon: 'grid-3x3' },
    { id: 'files' as const, label: 'File Icons', icon: 'file' },
    { id: 'folders' as const, label: 'Folder Icons', icon: 'folder' },
    { id: 'languages' as const, label: 'Language Icons', icon: 'code' },
  ];

  return (
    <div className="filter-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onCategoryChange(tab.id)}
          className={`filter-tab ${activeCategory === tab.id ? 'active' : ''}`}
        >
          <img 
            src={`https://unpkg.com/lucide-static@0.540.0/icons/${tab.icon}.svg`}
            alt={tab.label}
            className="tab-icon"
          />
          <span className="tab-label">{tab.label}</span>
          <span className="tab-count">({counts[tab.id]})</span>
        </button>
      ))}
    </div>
  );
};
