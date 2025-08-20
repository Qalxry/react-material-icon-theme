import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = "Search icons..."
}) => {
  return (
    <div className="search-bar">
      <div className="search-input-container">
        <img 
          src="https://unpkg.com/lucide-static@0.540.0/icons/search.svg" 
          alt="Search"
          className="search-icon"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {value && (
          <button
            onClick={onClear}
            className="clear-button"
            aria-label="Clear search"
          >
            <img 
              src="https://unpkg.com/lucide-static@0.540.0/icons/x.svg" 
              alt="Clear"
            />
          </button>
        )}
      </div>
    </div>
  );
};
