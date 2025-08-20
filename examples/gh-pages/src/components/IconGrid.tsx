import { useMemo } from 'react';
import { IconCard, type IconInfo } from './IconCard';

interface IconGridProps {
  icons: IconInfo[];
  searchQuery: string;
  onIconClick?: (icon: IconInfo) => void;
  loading?: boolean;
}

export function IconGrid({
  icons,
  searchQuery,
  onIconClick,
  loading = false
}: IconGridProps) {
  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) {
      return icons;
    }

    const query = searchQuery.toLowerCase();
    return icons.filter(icon => {
      return (
        icon.name.toLowerCase().includes(query) ||
        icon.matchedTerms.some(term => term.toLowerCase().includes(query)) ||
        (icon.description && icon.description.toLowerCase().includes(query))
      );
    });
  }, [icons, searchQuery]);

  if (loading) {
    return (
      <div className="icon-grid-loading">
        <div className="loading-spinner">
          <img 
            src="icons/loader-2.svg"
            alt="Loading"
            className="spinner"
          />
        </div>
        <p>Loading icons...</p>
      </div>
    );
  }

  if (filteredIcons.length === 0) {
    return (
      <div className="icon-grid-empty">
        <img 
          src="icons/search-x.svg"
          alt="No results"
          className="empty-icon"
        />
        <h3>No icons found</h3>
        <p>
          {searchQuery 
            ? `No icons match "${searchQuery}". Try a different search term.`
            : 'No icons available in this category.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="icon-grid-container">
      <div className="icon-grid-header">
        <span className="result-count">
          {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
      </div>
      
      <div className="icon-grid">
        {filteredIcons.map((icon) => (
          <IconCard
            key={icon.name}
            icon={icon}
            onClick={onIconClick}
          />
        ))}
      </div>
    </div>
  );
}
